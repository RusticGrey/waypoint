import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import { ExtractionEngine } from '@/lib/extraction/extractionEngine';

export async function POST(request: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { documentIds, customPrompt } = await request.json();

    if (!Array.isArray(documentIds) || documentIds.length === 0) {
      return NextResponse.json({ error: 'No document IDs provided' }, { status: 400 });
    }

    const documents = await prisma.collegeDocument.findMany({
      where: {
        id: { in: documentIds },
      },
      include: {
        college: true,
        dataSource: {
          include: {
            prompts: {
              where: { isActive: true },
              orderBy: { version: 'desc' },
              take: 1
            }
          }
        }
      }
    });

    if (documents.length === 0) {
      return NextResponse.json({ message: 'No documents found to process.' });
    }

    const collegeId = documents[0].collegeId;
    const dataSourceId = documents[0].dataSourceId;
    const academicYear = documents[0].academicYear;
    const dataSource = documents[0].dataSource;

    if (!dataSource || dataSource.prompts.length === 0) {
      return NextResponse.json({ error: `No active prompt configured for source ${dataSource?.name}.` }, { status: 400 });
    }

    const promptToUse = customPrompt || dataSource.prompts[0].promptText;
    const documentContents = documents.map(d => d.content);
    const targetModel = process.env.LLM_MODEL_EXTRACTION || 'gemini-1.5-pro';
    
    const extractor = new ExtractionEngine(process.env.GOOGLE_AI_API_KEY!);
    const extractedResult = await (extractor as any).extractWithTemplate(
      documentContents.join("\n\n---\n\n"),
      promptToUse,
      { documentType: 'html', mimeType: documents[0].contentType },
      targetModel
    );

    const extractedData = extractedResult.data || extractedResult;

    const savedInsight = await prisma.collegeInsight.upsert({
      where: {
        collegeId_dataSourceId_academicYear: {
          collegeId,
          dataSourceId,
          academicYear
        }
      },
      update: {
        data: extractedData,
        status: "pending",
        llmModelUsed: targetModel,
        extractedAt: new Date(),
      },
      create: {
        collegeId,
        dataSourceId,
        academicYear,
        data: extractedData,
        status: "pending",
        extractionMethod: "LLM",
        llmModelUsed: targetModel,
      }
    });

    return NextResponse.json({ 
       message: "Extraction complete", 
       insightId: savedInsight.id,
       extractedData 
    });
  } catch (error: any) {
    console.error('Extraction error:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to process extraction' },
      { status: 500 }
    );
  }
}
