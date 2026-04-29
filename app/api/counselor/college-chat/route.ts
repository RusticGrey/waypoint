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

    // 1. Fetch relevant insights for this college
    const insights = await prisma.collegeInsight.findMany({
      where: { 
        collegeId,
        status: 'approved'
      },
      include: {
        dataSource: { select: { displayName: true } }
      }
    });

    if (insights.length === 0) {
      return NextResponse.json({ 
        answer: "I don't have any detailed insights for this college yet. Please upload and process documents first." 
      });
    }

    // 2. Build context from approved insights
    const context = insights
      .map((insight: any) => `SOURCE: ${insight.dataSource.displayName} (${insight.academicYear})\nDATA: ${JSON.stringify(insight.data)}`)
      .join('\n\n---\n\n');

    // 3. Generate answer using LLM
    const apiKey = process.env.GOOGLE_AI_API_KEY;
    if (!apiKey) {
      throw new Error('GOOGLE_AI_API_KEY not configured');
    }

    const extractor = new GeminiExtractor(apiKey);
    const answer = await extractor.generateAnswer(context, query);

    return NextResponse.json({ answer });

  } catch (error: any) {
    console.error('Error in college chat:', error);
    return NextResponse.json({ error: error.message || 'Internal Server Error' }, { status: 500 });
  }
}
