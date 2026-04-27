import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { z } from "zod";

const approvalRequestSchema = z.object({
  action: z.enum(["approve", "reject", "modify"]),
  dataId: z.string(),
  approvalNotes: z.string().optional(),
  correctedJson: z.record(z.any()).optional().nullable(),
});

export async function POST(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const user = await prisma.user.findUnique({
      where: { id: session.user.id },
      select: { id: true, role: true },
    });

    if (!user || user.role !== "counselor") {
      return NextResponse.json(
        { error: "Only counselors can approve documents" },
        { status: 403 }
      );
    }

    const body = await req.json();
    console.log("[Approval API] Request body:", body);
    const { action, dataId, approvalNotes, correctedJson } =
      approvalRequestSchema.parse(body);

    const rankingData = await prisma.collegeRankingData.findUnique({
      where: { id: dataId },
      include: {
        college: { select: { id: true, name: true } },
        rankingSource: { select: { id: true, displayName: true } },
      },
    });

    if (!rankingData) {
      return NextResponse.json(
        { error: "Ranking data not found" },
        { status: 404 }
      );
    }

    let newStatus = "pending";

    if (action === "approve") {
      newStatus = "approved";
    } else if (action === "reject") {
      newStatus = "rejected";
    } else if (action === "modify") {
      newStatus = "pending";
    }

    console.log(`[Approval API] Transitioning ${dataId} to ${newStatus}. Action: ${action}`);
    
    const updated = await prisma.collegeRankingData.update({
      where: { id: dataId },
      data: {
        rankings: (correctedJson as any) || rankingData.rankings,
        approvedByUserId: action === "approve" ? user.id : null,
        approvedAt: action === "approve" ? new Date() : null,
      },
      include: {
        college: { select: { name: true } },
        rankingSource: { select: { displayName: true } },
      },
    });

    // We don't have sourceDocumentIds in the TRUE schema for CollegeRankingData!
    // It seems the relation is one-way or handled differently.
    // However, the previous manual upload API didn't store a link either.
    // In TRUE schema, CollegeDocument has a promptId but no direct link to CollegeRankingData.
    
    return NextResponse.json(
      {
        success: true,
        message: `Data ${action === "modify" ? "updated for review" : action === "approve" ? "approved" : "rejected"} successfully`,
        dataId,
        newStatus,
        college: updated.college.name,
        rankingSource: updated.rankingSource.displayName,
        approvalNotes,
        approvedAt: updated.approvedAt?.toISOString(),
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Approval API error:", error);

    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: "Invalid request format", details: (error as any).errors },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { error: "Failed to process approval" },
      { status: 500 }
    );
  }
}
