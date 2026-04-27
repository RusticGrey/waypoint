import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import { extractDataFromDocument } from '@/lib/scraping/llm/geminiExtractor';
const pdf = require('pdf-parse');

export async function POST(request: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { documentIds } = await request.json();

    if (!Array.isArray(documentIds) || documentIds.length === 0) {
      return NextResponse.json({ error: 'No document IDs provided' }, { status: 400 });
    }

    const documents = await (prisma as any).collegeDocument.findMany({
      where: {
        id: { in: documentIds },
        extractionStatus: 'pending',
      },
    });

    if (documents.length === 0) {
      return NextResponse.json({ message: 'No pending documents found to process.' });
    }

    // --- AGGREGATED EXTRACTION LOGIC (1:Many) ---
    // We assume all selected documents are for the same college and source.
    const collegeId = documents[0].collegeId;
    const sourceType = documents[0].sourceType;

    // Find the RankingSource explicitly
    const rankingSource = await (prisma as any).rankingSource.findFirst({
      where: { name: sourceType }
    });

    if (!rankingSource) {
      return NextResponse.json({ error: `Invalid Data Source: '${sourceType}' is not a registered RankingSource.` }, { status: 400 });
    }

    // 1. Find the active prompt for this source
    const activePrompt = await (prisma as any).rankingSourcePrompt.findFirst({
      where: {
        rankingSourceId: rankingSource.id,
        isActive: true,
      },
      orderBy: { version: 'desc' },
    });

    if (!activePrompt) {
      return NextResponse.json({ error: `No active prompt configured for source ${sourceType}. Please configure one in Template Management first.` }, { status: 400 });
    }

    // 2. Prepare all document contents as an array of parts
    const documentsContent = [];

    for (const doc of documents) {
      let contentForLLM = doc.rawHtmlContent;
      let mimeType = 'text/html';

      if (doc.documentType === 'true_pdf') {
        try {
          const buffer = Buffer.from(doc.rawHtmlContent, 'base64');
          const pdfData = await pdf(buffer);
          contentForLLM = pdfData.text;
          if (!contentForLLM || contentForLLM.trim() === '') {
            throw new Error("PDF parser returned empty text.");
          }
          documentsContent.push({ type: 'text', content: contentForLLM });
        } catch (pdfErr: any) {
          console.error(`PDF Parsing failed for doc ${doc.id}:`, pdfErr);
        }
      } 
      else if (doc.documentType === 'image_pdf' || doc.documentType === 'image') {
        mimeType = doc.documentType === 'image_pdf' ? 'application/pdf' : ((doc.metadata as any)?.contentType || 'image/jpeg');
        documentsContent.push({ type: 'inlineData', content: contentForLLM, mimeType });
      } else {
        documentsContent.push({ type: 'text', content: contentForLLM });
      }
    }

    // 3. Send Aggregated Parts to Gemini
    // We need a specialized extractor function that handles an array of mixed parts
    const { GeminiExtractor } = await import('@/lib/scraping/llm/geminiExtractor');
    const extractor = new GeminiExtractor(process.env.GOOGLE_AI_API_KEY!);
    
    let parts: any[] = [{ text: activePrompt.promptText }];
    
    documentsContent.forEach((doc, index) => {
      parts.push({ text: `\n\n--- Document ${index + 1} ---\n\n` });
      if (doc.type === 'inlineData') {
        parts.push({
          inlineData: {
            data: doc.content,
            mimeType: doc.mimeType
          }
        });
      } else {
        parts.push({ text: doc.content });
      }
    });

    // 4. Run the model
    let extractedJson;
    try {
      extractedJson = await (extractor as any).extractWithPrompt(parts);
    } catch (err: any) {
       console.error("Gemini Aggregated Extraction Failed:", err);
       return NextResponse.json({ error: "Gemini Aggregated Extraction Failed: " + err.message }, { status: 500 });
    }

    // 5. Create a Draft Proposal in CollegeRankingData (or update an existing draft)
    // We use a draft status so the UI can pull it up for review
    const academicYear = new Date().getFullYear().toString();
    
    const draftData = await (prisma as any).collegeRankingData.upsert({
      where: {
        collegeId_rankingSourceId_academicYear: {
          collegeId,
          rankingSourceId: rankingSource.id,
          academicYear
        }
      },
      update: {
        rankings: extractedJson,
        extractionMethod: "LLM_Aggregated_Draft",
        llmModelUsed: "Gemini Flash / Vision"
      },
      create: {
        collegeId,
        rankingSourceId: rankingSource.id,
        academicYear,
        rankings: extractedJson,
        extractionMethod: "LLM_Aggregated_Draft",
        llmModelUsed: "Gemini Flash / Vision",
        fieldsPresent: []
      }
    });

    // 6. Mark the source documents as processed and tie them to the prompt used
    await (prisma as any).collegeDocument.updateMany({
      where: { id: { in: documentIds } },
      data: {
        extractionStatus: 'processed_in_batch',
        extractedAt: new Date(),
        promptId: activePrompt.id
      }
    });

    return NextResponse.json({ 
       message: "Aggregated extraction complete", 
       draftId: draftData.id,
       extractedJson 
    });
  } catch (error: any) {
    console.error('Batch extraction error:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to process batch extraction' },
      { status: 500 }
    );
  }
}
