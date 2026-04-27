import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import { GeminiExtractor } from '@/lib/scraping/llm/geminiExtractor';

export async function POST(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);

    if (!session || session.user.role !== 'counselor') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { collegeId, query } = await req.json();

    if (!collegeId || !query) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    // 1. Fetch relevant documents for this college
    const documents = await prisma.collegeDocument.findMany({
      where: { 
        collegeId,
        extractionStatus: 'extracted'
      },
      select: {
        id: true,
        section: true,
        extractedData: true
      }
    });

    if (documents.length === 0) {
      return NextResponse.json({ 
        answer: "I don't have any detailed documents for this college yet. Please upload some US News HTML pages first." 
      });
    }

    // 2. Build context from extracted data
    const context = documents
      .map((doc: { section: string; extractedData: any }) => `SECTION: ${doc.section}\nDATA: ${JSON.stringify(doc.extractedData)}`)
      .join('\n\n---\n\n');

    // 3. Generate answer using LLM
    const apiKey = process.env.GOOGLE_AI_API_KEY;
    if (!apiKey) {
      throw new Error('GOOGLE_AI_API_KEY not configured');
    }

    const extractor = new GeminiExtractor(apiKey);
    const answer = await extractor.generateAnswer(context, query);

    // 4. Log the query
    await (prisma as any).collegeDataQuery.create({
      data: {
        collegeId,
        queryType: 'counselor_chat',
        queryText: query,
        results: { answer },
        documentsUsed: documents.map((d: { id: string }) => d.id),
        createdBy: session.user.id
      }
    });

    return NextResponse.json({ answer });

  } catch (error: any) {
    console.error('Error in college chat:', error);
    return NextResponse.json({ error: error.message || 'Internal Server Error' }, { status: 500 });
  }
}
