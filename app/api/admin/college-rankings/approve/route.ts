import { prisma } from '@/lib/prisma';
import { NextRequest, NextResponse } from 'next/server';
import { MultiSourceOrchestrator } from '@/lib/scraping/multiSourceOrchestrator';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';

const orchestrator = new MultiSourceOrchestrator(process.env.GOOGLE_AI_API_KEY || '');

export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session || session.user.role !== 'counselor') {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const body = await req.json();
    const { insightId, manualData } = body;

    if (!insightId) {
      return NextResponse.json({ error: 'Insight ID is required' }, { status: 400 });
    }

    const savedData = await orchestrator.approveData(insightId, session.user.id, manualData);

    return NextResponse.json(savedData);
  } catch (error: any) {
    console.error('Approval error:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
