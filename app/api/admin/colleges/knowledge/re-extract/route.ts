import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { GeminiExtractor } from "@/lib/scraping/llm/geminiExtractor";

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
        { error: "Only counselors can perform re-extraction" },
        { status: 403 }
      );
    }

    const body = await req.json();
    const { collegeId, dataSourceId, academicYear } = body;

    if (!collegeId || !dataSourceId || !academicYear) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    // Fetch documents for this college/source/year
    const docs = await prisma.collegeDocument.findMany({
      where: {
        collegeId,
        dataSourceId,
        academicYear,
      },
      include: {
        college: { select: { name: true } },
        dataSource: true
      }
    });

    if (docs.length === 0) {
      return NextResponse.json({ error: "No documents found for this college and data source" }, { status: 404 });
    }

    const collegeName = docs[0].college.name;
    const dataSourceDisplayName = docs[0].dataSource.displayName;

    // Get the active prompt
    const activePrompt = await prisma.dataSourcePrompt.findFirst({
      where: { dataSourceId, isActive: true },
      orderBy: { version: 'desc' }
    });

    if (!activePrompt) {
      return NextResponse.json({ error: "No active prompt found for this data source" }, { status: 400 });
    }

    const targetModel = process.env.LLM_MODEL_EXTRACTION || 'gemini-1.5-pro';
    const extractor = new GeminiExtractor(process.env.GOOGLE_AI_API_KEY!);

    const isScanned = docs.some((d: any) => d.contentType.includes('pdf') || d.contentType.includes('image'));
    const mimeType = docs[0].contentType;
    const documentContents = docs.map((d: any) => d.content);

    let extractedResult;
    try {
      if (isScanned) {
        extractedResult = await (extractor as any).extractWithTemplate(
          documentContents,
          `You are the Master Data Architect for Waypoint. PERFORM FORCED TRANSCRIPTION of all data points for ${collegeName}.

           REQUIRED SCHEMA MUST BE ADHERED TO.
           
           ${activePrompt.promptText}`,
          { documentType: 'image_pdf', mimeType },
          targetModel
        );
      } else {
        extractedResult = await (extractor as any).extractWithTemplate(
          documentContents.join("\n\n---\n\n"),
          activePrompt.promptText,
          { documentType: 'html', mimeType },
          targetModel
        );
      }

      const extractedData = extractedResult.data || extractedResult;

      // Upsert into CollegeInsight and set status to approved
      const savedInsight = await prisma.collegeInsight.upsert({
        where: {
          collegeId_dataSourceId_academicYear: {
            collegeId,
            dataSourceId,
            academicYear,
          },
        },
        create: {
          collegeId,
          dataSourceId,
          academicYear,
          data: extractedData,
          status: "approved",
          extractionMethod: "LLM",
          llmModelUsed: targetModel,
          extractedAt: new Date(),
          approvedAt: new Date(),
          approvedByUserId: user.id
        },
        update: {
          data: extractedData,
          status: "approved",
          llmModelUsed: targetModel,
          extractedAt: new Date(),
          approvedAt: new Date(),
          approvedByUserId: user.id
        },
      });

      return NextResponse.json({
        success: true,
        insight: savedInsight
      });

    } catch (err: any) {
      console.error(`LLM Error during re-extraction for ${collegeName}:`, err);
      return NextResponse.json({ error: `LLM Error: ${err.message}` }, { status: 500 });
    }

  } catch (error: any) {
    console.error("Re-extract API error:", error);
    return NextResponse.json({ error: error.message || "Internal server error" }, { status: 500 });
  }
}
