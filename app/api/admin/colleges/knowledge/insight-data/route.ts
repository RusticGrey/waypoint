import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function PUT(req: NextRequest) {
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
        { error: "Only counselors can update insight data" },
        { status: 403 }
      );
    }

    const body = await req.json();
    const { insightId, data } = body;

    if (!insightId || !data) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    const updatedInsight = await prisma.collegeInsight.update({
      where: { id: insightId },
      data: {
        data: data,
        status: "approved",
        approvedAt: new Date(),
        approvedByUserId: user.id
      }
    });

    return NextResponse.json({
      success: true,
      insight: updatedInsight
    });

  } catch (error: any) {
    console.error("Update-insight-data API error:", error);
    return NextResponse.json({ error: error.message || "Internal server error" }, { status: 500 });
  }
}
