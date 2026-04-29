import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function GET(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { searchParams } = new URL(req.url);
    const dataSourceId = searchParams.get("dataSourceId");
    const academicYearFilter = searchParams.get("academicYear");

    if (!dataSourceId) {
      return NextResponse.json({ error: "dataSourceId is required" }, { status: 400 });
    }

    // Get active prompt for this data source to compare timestamps
    const activePrompt = await prisma.dataSourcePrompt.findFirst({
      where: { dataSourceId, isActive: true },
      orderBy: { version: 'desc' }
    });

    // Find all colleges that have at least one document for this data source / year
    const collegeFilter: any = {
      documents: {
        some: { dataSourceId }
      }
    };

    if (academicYearFilter) {
      collegeFilter.documents.some.academicYear = academicYearFilter;
    }

    const collegesWithDocs = await prisma.college.findMany({
      where: collegeFilter,
      select: {
        id: true,
        name: true,
        documents: {
          where: { dataSourceId },
          select: { id: true, academicYear: true }
        },
        insights: {
          where: { dataSourceId },
          select: {
            id: true,
            extractedAt: true,
            status: true,
            academicYear: true,
            llmModelUsed: true
          },
          orderBy: { extractedAt: 'desc' }
        }
      }
    });

    const statusData = collegesWithDocs.map(college => {
      let academicYears = Array.from(new Set(college.documents.map(d => d.academicYear)));
      
      if (academicYearFilter) {
        academicYears = academicYears.filter(y => y === academicYearFilter);
      }
      
      return academicYears.map(year => {
        const insight = college.insights.find(i => i.academicYear === year);
        const docCount = college.documents.filter(d => d.academicYear === year).length;
        
        const isStale = insight && activePrompt 
          ? new Date(insight.extractedAt) < new Date(activePrompt.createdAt)
          : !insight;

        return {
          collegeId: college.id,
          collegeName: college.name,
          academicYear: year,
          docCount,
          lastExtracted: insight?.extractedAt || null,
          status: insight?.status || 'missing',
          isStale,
          insightId: insight?.id || null,
          modelUsed: insight?.llmModelUsed || null
        };
      });
    }).flat();

    return NextResponse.json(statusData);

  } catch (error: any) {
    console.error("Extraction-status API error:", error);
    return NextResponse.json({ error: error.message || "Internal server error" }, { status: 500 });
  }
}
