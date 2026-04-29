import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";

export const dynamic = 'force-dynamic';
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { z } from "zod";

const queryParamsSchema = z.object({
  collegeId: z.string(),
  academicYear: z.string(),
  dataSourceId: z.string().optional(),
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
    const dataSourceId = searchParams.get("dataSourceId") || searchParams.get("rankingSourceId");

    if (!collegeId || !academicYear) {
      return NextResponse.json(
        { error: "collegeId and academicYear are required query parameters" },
        { status: 400 }
      );
    }

    const params = queryParamsSchema.parse({
      collegeId,
      academicYear,
      dataSourceId: dataSourceId || undefined,
    });

    const college = await prisma.college.findUnique({
      where: { id: params.collegeId },
      select: { id: true, name: true },
    });

    if (!college) {
      return NextResponse.json({ error: "College not found" }, { status: 404 });
    }

    const { searchParams: rawParams } = new URL(req.url);
    const requestedStatus = rawParams.get("status") || "approved";

    const filter: any = {
      collegeId: params.collegeId,
      status: requestedStatus,
    };

    if (params.dataSourceId) {
      filter.dataSourceId = params.dataSourceId;
    }

    let insights = await prisma.collegeInsight.findMany({
      where: {
        ...filter,
        academicYear: params.academicYear,
      },
      include: {
        dataSource: { select: { id: true, displayName: true } },
      },
    });

    let fallbackYear = null;

    if (insights.length === 0) {
      const mostRecentInsight = await prisma.collegeInsight.findFirst({
        where: filter,
        orderBy: { academicYear: "desc" },
        include: {
          dataSource: { select: { id: true, displayName: true } },
        },
      });

      if (mostRecentInsight) {
        insights = [mostRecentInsight];
        fallbackYear = mostRecentInsight.academicYear;
      }
    }

    return NextResponse.json(
      {
        collegeId: params.collegeId,
        collegeName: college.name,
        requestedAcademicYear: params.academicYear,
        actualAcademicYear: insights.length > 0 ? insights[0].academicYear : null,
        fallbackYear,
        rankings: insights.map((insight: any) => ({
          id: insight.id,
          collegeId: insight.collegeId,
          dataSourceId: insight.dataSourceId,
          dataSourceName: insight.dataSource.displayName,
          academicYear: insight.academicYear,
          rankingDataJSON: insight.data,
          status: insight.status,
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
