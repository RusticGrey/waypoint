import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/prisma';

export async function GET(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);

    if (!session || session.user.role !== 'counselor') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const prompts = await (prisma as any).rankingSourcePrompt.findMany({
      where: { isActive: true }, // Only show latest active ones by default
      include: {
        rankingSource: true // Include ranking source name mapping
      },
      orderBy: [
        { rankingSourceId: 'asc' }
      ]
    });

    return NextResponse.json(prompts);

  } catch (error: any) {
    console.error('Error fetching source prompts:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);

    if (!session || session.user.role !== 'counselor') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await req.json();
    const { sourceType, promptText } = body;

    // Validate the source exists in DB
    const rankingSource = await (prisma as any).rankingSource.findFirst({
      where: { name: sourceType }
    });

    if (!rankingSource) {
      return NextResponse.json({ error: `Invalid Source Type: ${sourceType}` }, { status: 400 });
    }

    // Find current max version for this source
    const currentLatest = await (prisma as any).rankingSourcePrompt.findFirst({
      where: { rankingSourceId: rankingSource.id },
      orderBy: { version: 'desc' }
    });

    const nextVersion = currentLatest ? currentLatest.version + 1 : 1;

    // Deactivate old versions for this source
    await (prisma as any).rankingSourcePrompt.updateMany({
      where: { rankingSourceId: rankingSource.id, isActive: true },
      data: { isActive: false }
    });

    const newPrompt = await (prisma as any).rankingSourcePrompt.create({
      data: {
        rankingSourceId: rankingSource.id,
        promptText: promptText,
        version: nextVersion,
        isActive: true
      }
    });

    return NextResponse.json(newPrompt);

  } catch (error: any) {
    console.error('Error creating source prompt:', error);
    return NextResponse.json({ error: `Internal Server Error: ${error.message || 'Unknown error'}` }, { status: 500 });
  }
}
