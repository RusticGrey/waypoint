import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { z } from "zod";
import { extractDataFromDocument, GeminiExtractor } from "@/lib/scraping/llm/geminiExtractor";

const extractBatchRequestSchema = z.object({
  batchSize: z.number().int().min(1).max(100).optional().default(10),
  documentIds: z.array(z.string()).optional(),
  customPrompt: z.string().optional(),
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
        { error: "Only counselors can extract documents" },
        { status: 403 }
      );
    }

    const body = await req.json();
    const { batchSize, documentIds, customPrompt, dryRun } = body;

    const filter: any = {};
    if (documentIds && documentIds.length > 0) {
      filter.id = { in: documentIds };
    } else {
      filter.extractionStatus = { in: ["pending", "processed"] };
    }

    // DRY RUN: Group documents by College/Source/Year for efficient single-call extraction
    if (dryRun) {
      const docs = await prisma.collegeDocument.findMany({
        where: filter,
        select: { id: true, collegeId: true, sourceType: true, metadata: true, college: { select: { name: true } } },
        take: batchSize || 50,
      });

      const groups: Record<string, any> = {};
      for (const d of docs) {
        const academicYear = (d.metadata as any)?.academicYear || "2025-2026";
        const sourceKey = d.sourceType || "uncategorized";
        const key = `${d.collegeId}-${sourceKey}-${academicYear}`;
        if (!groups[key]) {
          groups[key] = {
            key: `${d.college.name} - ${sourceKey} (${academicYear})`,
            documentIds: [],
            collegeName: d.college.name,
            sourceType: d.sourceType
          };
        }
        groups[key].documentIds.push(d.id);
      }

      return NextResponse.json({
        success: true,
        groups: Object.values(groups),
        totalDocuments: docs.length
      });
    }

    const pendingDocuments = await prisma.collegeDocument.findMany({
      where: filter,
      include: {
        college: { select: { id: true, name: true } },
      },
      take: batchSize,
    });

    if (pendingDocuments.length === 0) {
      return NextResponse.json(
        {
          success: true,
          message: "No pending documents to extract",
          draftId: null,
          processed: 0,
          samples: [],
        },
        { status: 200 }
      );
    }

    // Group documents by (collegeId, sourceType, academicYear)
    const groupedByKey: Record<string, typeof pendingDocuments> = {};

    for (const doc of pendingDocuments) {
      const academicYear = (doc.metadata as any)?.academicYear || "2025-2026";
      const sourceKey = doc.sourceType || "uncategorized";
      const key = `${doc.collegeId}-${sourceKey}-${academicYear}`;
      if (!groupedByKey[key]) {
        groupedByKey[key] = [];
      }
      groupedByKey[key].push(doc);
    }

    const extractedDataSamples = [];
    let processedCount = 0;

    for (const [key, docs] of Object.entries(groupedByKey)) {
      console.log(`Processing extraction group: ${key}`);
      const [rawCollegeId, sourceIdentifier, academicYear] = key.split("-");
      
      // Use the ACTUAL college ID from the document record to avoid mismatch
      const collegeId = docs[0].collegeId;

      // Determine if we are dealing with scanned/image content
      const isScanned = docs.some(d => d.documentType === 'image_pdf' || d.documentType === 'image');
      const mimeType = docs[0].metadata && (docs[0].metadata as any).mimeType ? (docs[0].metadata as any).mimeType : (isScanned ? 'application/pdf' : 'text/html');

      // Robust source lookup:
      // 1. Try metadata ID
      // 2. Try exact name/displayName
      // 3. Try fuzzy/case-insensitive match
      const metaSourceId = (docs[0].metadata as any)?.rankingSourceId;
      
      const rankingSource = await prisma.rankingSource.findFirst({
        where: { 
          OR: [
            { id: metaSourceId || "non-existent" },
            { name: { equals: sourceIdentifier, mode: 'insensitive' } },
            { displayName: { equals: sourceIdentifier, mode: 'insensitive' } },
            { name: { contains: sourceIdentifier, mode: 'insensitive' } }
          ]
        },
        include: {
          prompts: {
            where: { isActive: true },
            orderBy: { version: 'desc' },
            take: 1
          }
        }
      });

      if (!rankingSource) {
        console.warn(`No ranking source found for identifier: ${sourceIdentifier}`);
        continue;
      }

      const promptToUse = customPrompt || rankingSource.prompts[0]?.promptText || "Extract college ranking and admissions data as JSON.";
      
      // Multi-block content (array of contents)
      const documentContents = docs.map(d => d.rawHtmlContent);

      // MODEL SELECTION: Default to configured extraction model (Pro)
      const targetModel = process.env.LLM_MODEL_EXTRACTION || 'gemini-1.5-pro';

      let extractedResult;
      try {
        // Consolidated Extraction Strategy: Use a single, high-fidelity multimodal call
        if (isScanned) {
          console.log(`[API] Using Consolidated Multimodal Vision strategy for ${sourceIdentifier} (Model: ${targetModel})`);
          
          const extractor = new GeminiExtractor(process.env.GOOGLE_AI_API_KEY!);
          extractedResult = await (extractor as any).extractWithTemplate(
            documentContents as any, 
            `You are the Master Data Architect for Waypoint. PERFORM FORCED TRANSCRIPTION of all data points for ${docs[0].college.name}.
             
             REQUIRED SCHEMA:
             {
               "institutional_identity": { "name": "", "location": { "city": "", "state": "" }, "type": "", "setting": "" },
               "rankings_comprehensive": { "overall_national": 0, "subject_and_specialty_rankings": [] },
               "admissions_engine": { "acceptance_rate": 0, "middle_50_percentile_stats": { "sat_math": { "p25": 0, "p75": 0 }, "sat_reading": { "p25": 0, "p75": 0 } } },
               "financial_profile": { "sticker_price_total": 0 }
             }

             INSTRUCTIONS:
             1. Scan ALL document parts for every sub-specialty ranking in CS, Engineering, and Business.
             2. Capture SAT/ACT ranges exactly from any tables found.
             3. If a value is missing, return null for that field.
             
             ${promptToUse}`,
            { documentType: 'image_pdf', mimeType },
            targetModel // Force higher tier if needed
          );
          
          console.log(`[API] Successfully extracted consolidated multimodal results.`);
        } else {
          console.log(`[API] Using standard HTML extraction. (Model: ${targetModel})`);
          const extractor = new GeminiExtractor(process.env.GOOGLE_AI_API_KEY!);
          extractedResult = await (extractor as any).extractWithTemplate(
            documentContents.join("\n\n---\n\n"),
            promptToUse,
            { documentType: 'html', mimeType },
            targetModel
          );
        }

        const extractedData = extractedResult.data || extractedResult;

        // SAVE IMMEDIATELY (One group at a time)
        const fieldsFound = Object.keys(extractedData);
        
        const savedData = await prisma.collegeRankingData.upsert({
          where: {
            collegeId_rankingSourceId_academicYear: {
              collegeId: collegeId,
              rankingSourceId: rankingSource.id,
              academicYear: academicYear,
            },
          },
          create: {
            collegeId: collegeId,
            rankingSourceId: rankingSource.id,
            academicYear: academicYear,
            rankings: extractedData,
            extractionMethod: "LLM",
            llmModelUsed: targetModel,
            fieldsPresent: fieldsFound,
          },
          update: {
            rankings: extractedData,
            fieldsPresent: fieldsFound,
            llmModelUsed: targetModel,
            scraped_at: new Date(),
          },
        });

        // Update document statuses for this group
        await prisma.collegeDocument.updateMany({
          where: { id: { in: docs.map(d => d.id) } },
          data: { extractionStatus: "extracted" },
        });

        processedCount += docs.length;

        extractedDataSamples.push({
          id: savedData.id,
          collegeId,
          collegeName: docs[0].college.name,
          rankingSourceId: rankingSource.id,
          rankingSourceName: rankingSource.displayName,
          academicYear,
          rankingDataJSON: extractedData,
          extractedData: extractedData,
          rawLlmResponse: extractedResult.rawResponse || JSON.stringify(extractedData, null, 2),
        });

      } catch (err: any) {
        if (err?.message?.includes('DOCUMENT_EMPTY_OR_INVALID') || err?.message?.includes('no pages')) {
          console.error(`Skipping ${rankingSource.name} due to empty/invalid document: ${err.message}`);
          await prisma.collegeDocument.updateMany({
            where: { id: { in: docs.map(d => d.id) } },
            data: { extractionStatus: "failed" },
          });
        } else {
          console.error(`LLM Error for ${rankingSource.name}:`, err);
          // Don't mark as failed if it's a transient LLM error, let it retry next batch
          // or mark as failed if you prefer strictness
        }
        continue;
      }
    }

    const batchId = `batch_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;

    return NextResponse.json(
      {
        success: true,
        draftId: batchId,
        message: `Extracted ${extractedDataSamples.length} document batch(es)`,
        processedCount: pendingDocuments.length,
        processedDocs: pendingDocuments.map(d => ({ id: d.id, name: (d.metadata as any)?.fileName || d.id })),
        samples: extractedDataSamples,
        modelUsed: process.env.LLM_MODEL_EXTRACTION || "gemini-1.5-pro",
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Extract-batch API error:", error);

    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: "Invalid request format", details: (error as any).errors },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { error: "Failed to extract documents" },
      { status: 500 }
    );
  }
}
