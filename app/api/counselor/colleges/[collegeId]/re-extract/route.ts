import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import { ExtractionEngine } from '@/lib/extraction/extractionEngine';

export async function POST(
  req: NextRequest,
  { params }: { params: { collegeId: string } }
) {
  try {
    const session = await getServerSession(authOptions);

    if (!session || session.user.role !== 'counselor') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { collegeId } = params;
    const body = await req.json();
    const { sourceType, section, promptOverride } = body;

    // 1. Get all documents for this college and source/section
    const documents = await (prisma as any).collegeDocument.findMany({
      where: { 
        collegeId,
        sourceType: sourceType || undefined,
        section: section || undefined
      },
      include: {
        extractionTemplate: true
      }
    });

    if (documents.length === 0) {
      return NextResponse.json({ error: 'No documents found for re-extraction' }, { status: 404 });
    }

    // 2. Use the provided prompt or the latest template prompt
    let promptToUse = promptOverride;
    
    if (!promptToUse) {
      const template = await (prisma as any).extractionTemplate.findFirst({
        where: { 
          sourceType: sourceType || 'all', 
          section: section || 'generic',
          isActive: true 
        },
        orderBy: { version: 'desc' }
      });
      promptToUse = template?.promptTemplate;
    }

    if (!promptToUse) {
      return NextResponse.json({ error: 'No prompt or template found' }, { status: 400 });
    }

    // 3. Initialize extractor
    const apiKey = process.env.GOOGLE_AI_API_KEY;
    if (!apiKey) throw new Error('GOOGLE_AI_API_KEY not configured');
    const extractor = new ExtractionEngine(apiKey);

    const results = [];

    // 4. Run extraction on each document and merge
    for (const doc of documents) {
      try {
        const newData = await extractor.extractWithTemplate(doc.rawHtmlContent, promptToUse);
        
        if (newData && Object.keys(newData).length > 0) {
          // Merge with existing data (upsert logic)
          const mergedData = {
            ...(doc.extractedData as object || {}),
            ...newData
          };

          const updatedDoc = await (prisma as any).collegeDocument.update({
            where: { id: doc.id },
            data: {
              extractedData: mergedData,
              extractionStatus: 'pending', // PER FEEDBACK: RESULTS STAY PENDING UNTIL APPROVED
              extractedAt: new Date()
            }
          });
          results.push({ id: doc.id, status: 'success', data: newData });
        }
      } catch (err: any) {
        console.error(`Re-extraction failed for doc ${doc.id}:`, err);
        results.push({ id: doc.id, status: 'failed', error: err.message });
      }
    }

    return NextResponse.json({ 
      message: `Processed ${results.length} documents`,
      results 
    });

  } catch (error: any) {
    console.error('Error in re-extraction:', error);
    return NextResponse.json({ error: error.message || 'Internal Server Error' }, { status: 500 });
  }
}
