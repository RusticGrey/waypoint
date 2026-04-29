import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { z } from "zod";
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
        { error: "Only counselors can extract documents" },
        { status: 403 }
      );
    }

    const body = await req.json();
    const { batchSize, documentIds, customPrompt, dryRun } = body;

    const filter: any = {};
    if (documentIds && documentIds.length > 0) {
      filter.id = { in: documentIds };
    }

    // Fetch documents
    const docs = await prisma.collegeDocument.findMany({
      where: filter,
      include: {
        college: { select: { id: true, name: true } },
        dataSource: { select: { id: true, name: true, displayName: true } }
      },
      orderBy: { uploadedAt: 'desc' },
      take: batchSize || 50
    });

    if (docs.length === 0) {
      return NextResponse.json({ success: true, message: "No documents to process", processed: 0 });
    }

    // Group documents by (collegeId, dataSourceId, academicYear)
    const groupedByKey: Record<string, any> = {};

    for (const doc of docs) {
      const key = `${doc.collegeId}-${doc.dataSourceId}-${doc.academicYear}`;
      if (!groupedByKey[key]) {
        groupedByKey[key] = {
          collegeId: doc.collegeId,
          collegeName: doc.college.name,
          dataSourceId: doc.dataSourceId,
          dataSourceName: doc.dataSource.name,
          dataSourceDisplayName: doc.dataSource.displayName,
          academicYear: doc.academicYear,
          documents: []
        };
      }
      groupedByKey[key].documents.push(doc);
    }

    const groupsToProcess = Object.values(groupedByKey);

    if (dryRun) {
      return NextResponse.json({
        success: true,
        groups: groupsToProcess.map((g: any) => ({
          key: `${g.collegeName} - ${g.dataSourceDisplayName} (${g.academicYear})`,
          documentCount: g.documents.length,
          documentIds: g.documents.map((d: any) => d.id)
        })),
        totalDocuments: docs.length
      });
    }

    const extractedDataSamples = [];
    const targetModel = process.env.LLM_MODEL_EXTRACTION || 'gemini-1.5-pro';
    const extractor = new GeminiExtractor(process.env.GOOGLE_AI_API_KEY!);

    for (const group of groupsToProcess) {
      console.log(`Processing extraction group: ${group.collegeName} - ${group.dataSourceDisplayName}`);
      
      const isScanned = group.documents.some((d: any) => d.contentType.includes('pdf') || d.contentType.includes('image'));
      const mimeType = group.documents[0].contentType;

      const dataSource = await prisma.dataSource.findUnique({
        where: { id: group.dataSourceId },
        include: {
          prompts: {
            where: { isActive: true },
            orderBy: { version: 'desc' },
            take: 1
          }
        }
      });

      if (!dataSource || dataSource.prompts.length === 0) {
        console.warn(`No active prompt found for Data Source: ${group.dataSourceName}. Skipping.`);
        continue;
      }

      const promptToUse = customPrompt || dataSource.prompts[0].promptText;
      const documentContents = group.documents.map((d: any) => d.content);

      let extractedResult;
      try {
        if (isScanned) {
          extractedResult = await (extractor as any).extractWithTemplate(
            documentContents, 
            `You are the Master Data Architect for Waypoint. PERFORM FORCED TRANSCRIPTION of all data points for ${group.collegeName}.
             
             REQUIRED SCHEMA:
             {
               "institutional_identity": { "name": "", "location": { "city": "", "state": "" }, "type": "", "setting": "" },
               "rankings_comprehensive": { "overall_national": 0, "subject_and_specialty_rankings": [] },
               "admissions_engine": { "acceptance_rate": 0, "middle_50_percentile_stats": { "sat_math": { "p25": 0, "p75": 0 }, "sat_reading": { "p25": 0, "p75": 0 } } },
               "financial_profile": { "sticker_price_total": 0 },
               "supplementary_admissions_insights": { "campus_life": "", "student_activities": [], "clubs_and_organizations": [] }
             }
             
             ${promptToUse}`,
            { documentType: 'image_pdf', mimeType },
            targetModel
          );
        } else {
          extractedResult = await (extractor as any).extractWithTemplate(
            documentContents.join("\n\n---\n\n"),
            promptToUse,
            { documentType: 'html', mimeType },
            targetModel
          );
        }

        const extractedData = extractedResult.data || extractedResult;

        const savedInsight = await prisma.collegeInsight.upsert({
          where: {
            collegeId_dataSourceId_academicYear: {
              collegeId: group.collegeId,
              dataSourceId: group.dataSourceId,
              academicYear: group.academicYear,
            },
          },
          create: {
            collegeId: group.collegeId,
            dataSourceId: group.dataSourceId,
            academicYear: group.academicYear,
            data: extractedData,
            status: "pending",
            extractionMethod: "LLM",
            llmModelUsed: targetModel,
          },
          update: {
            data: extractedData,
            status: "pending",
            llmModelUsed: targetModel,
            extractedAt: new Date(),
          },
        });

        extractedDataSamples.push({
          id: savedInsight.id,
          collegeId: group.collegeId,
          collegeName: group.collegeName,
          dataSourceId: group.dataSourceId,
          dataSourceName: group.dataSourceDisplayName,
          academicYear: group.academicYear,
          extractedData: extractedData,
        });

      } catch (err: any) {
        console.error(`LLM Error for ${group.dataSourceName}:`, err);
        continue;
      }
    }

    return NextResponse.json({
      success: true,
      message: `Processed ${groupsToProcess.length} group(s)`,
      processedDocuments: docs.length,
      samples: extractedDataSamples,
      modelUsed: targetModel
    });

  } catch (error: any) {
    console.error("Extract-batch API error:", error);
    return NextResponse.json({ error: error.message || "Failed to extract documents" }, { status: 500 });
  }
}
