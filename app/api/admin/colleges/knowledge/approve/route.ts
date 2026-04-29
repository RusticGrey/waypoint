import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { z } from "zod";

const approvalRequestSchema = z.object({
  action: z.enum(["approve", "reject", "modify"]),
  dataId: z.string(),
  approvalNotes: z.string().optional(),
  correctedJson: z.any().optional().nullable(),
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

    const insight = await prisma.collegeInsight.findUnique({
      where: { id: dataId },
      include: {
        college: true,
        dataSource: { select: { id: true, displayName: true } },
      },
    });

    if (!insight) {
      return NextResponse.json(
        { error: "Insight data not found" },
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
    
    const finalData = (correctedJson as any) || insight.data;

    const updated = await prisma.collegeInsight.update({
      where: { id: dataId },
      data: {
        data: finalData,
        status: newStatus,
        approvedByUserId: action === "approve" ? user.id : null,
        approvedAt: action === "approve" ? new Date() : null,
      },
      include: {
        college: { select: { id: true, name: true, country: true, acceptanceRate: true, avgGpa: true, avgSat: true, avgAct: true } },
        dataSource: { select: { displayName: true } },
      },
    });

    // Sync to College if approved
    if (action === "approve") {
      const metrics = finalData.admissions_engine || finalData.admissions || {};
      const identity = finalData.institutional_identity || {};

      await prisma.college.update({
        where: { id: updated.college.id },
        data: {
          name: identity.name || updated.college.name,
          country: identity.country || updated.college.country,
          acceptanceRate: metrics.acceptance_rate || metrics.acceptanceRate || updated.college.acceptanceRate,
          avgGpa: metrics.avg_gpa || metrics.avgGpa || updated.college.avgGpa,
          avgSat: metrics.middle_50_percentile_stats?.sat_math?.p75 ? 
                  (metrics.middle_50_percentile_stats.sat_math.p75 + (metrics.middle_50_percentile_stats.sat_reading?.p75 || 0)) : 
                  (metrics.avgSat || updated.college.avgSat),
          avgAct: metrics.middle_50_percentile_stats?.act_composite?.p75 || metrics.avgAct || updated.college.avgAct
        }
      });
    }

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
        rankingSource: updated.dataSource.displayName,
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
