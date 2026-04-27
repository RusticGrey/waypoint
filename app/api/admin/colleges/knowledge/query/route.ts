import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { z } from "zod";

const queryParamsSchema = z.object({
  collegeId: z.string(),
  academicYear: z.string(),
  rankingSourceId: z.string().optional(),
});

export async function GET(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { searchParams } = new URL(req.url);
    const collegeId = searchParams.get("collegeId");
    const academicYear = searchParams.get("academicYear");
    const rankingSourceId = searchParams.get("rankingSourceId");

    if (!collegeId || !academicYear) {
      return NextResponse.json(
        { error: "collegeId and academicYear are required query parameters" },
        { status: 400 }
      );
    }

    const params = queryParamsSchema.parse({
      collegeId,
      academicYear,
      rankingSourceId: rankingSourceId || undefined,
    });

    const college = await prisma.college.findUnique({
      where: { id: params.collegeId },
      select: { id: true, name: true },
    });

    if (!college) {
      return NextResponse.json({ error: "College not found" }, { status: 404 });
    }

    const filter: any = {
      collegeId: params.collegeId,
      approvalStatus: "approved",
    };

    if (params.rankingSourceId) {
      filter.rankingSourceId = params.rankingSourceId;
    }

    let rankings = await (prisma as any).collegeRankingData.findMany({
      where: {
        ...filter,
        academicYear: params.academicYear,
      },
      include: {
        rankingSource: { select: { id: true, displayName: true } },
      },
    });

    let fallbackYear = null;

    if (rankings.length === 0) {
      const mostRecentRanking = await (prisma as any).collegeRankingData.findFirst({
        where: filter,
        orderBy: { academicYear: "desc" },
        include: {
          rankingSource: { select: { id: true, displayName: true } },
        },
      });

      if (mostRecentRanking) {
        rankings = [mostRecentRanking];
        fallbackYear = (mostRecentRanking as any).academicYear;
      }
    }

    return NextResponse.json(
      {
        collegeId: params.collegeId,
        collegeName: college.name,
        requestedAcademicYear: params.academicYear,
        actualAcademicYear: rankings.length > 0 ? (rankings[0] as any).academicYear : null,
        fallbackYear,
        rankings: rankings.map((ranking: any) => ({
          rankingSourceId: ranking.rankingSourceId,
          rankingSourceName: ranking.rankingSource.displayName,
          academicYear: ranking.academicYear,
          rankingDataJSON: ranking.rankings, // Matching schema field name 'rankings'
          approvalStatus: ranking.approvalStatus,
        })),
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Query API error:", error);

    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: "Invalid query parameters", details: (error as any).errors },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { error: "Failed to fetch ranking data" },
      { status: 500 }
    );
  }
}
