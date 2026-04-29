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

    const { searchParams } = new URL(req.url);
    const dataSourceId = searchParams.get('dataSourceId');
    const includeHistory = searchParams.get('history') === 'true';

    const filter: any = {};
    if (dataSourceId) {
      filter.dataSourceId = dataSourceId;
    }
    if (!includeHistory) {
      filter.isActive = true;
    }

    const prompts = await prisma.dataSourcePrompt.findMany({
      where: filter,
      include: {
        dataSource: true
      },
      orderBy: [
        { dataSourceId: 'asc' }
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
    const { dataSourceId, promptText } = body;

    // Validate the source exists in DB
    const dataSource = await prisma.dataSource.findUnique({
      where: { id: dataSourceId }
    });

    if (!dataSource) {
      return NextResponse.json({ error: `Invalid Data Source: ${dataSourceId}` }, { status: 400 });
    }

    // Find current max version for this source
    const currentLatest = await prisma.dataSourcePrompt.findFirst({
      where: { dataSourceId: dataSource.id },
      orderBy: { version: 'desc' }
    });

    const nextVersion = currentLatest ? currentLatest.version + 1 : 1;

    // Deactivate old versions for this source
    await prisma.dataSourcePrompt.updateMany({
      where: { dataSourceId: dataSource.id, isActive: true },
      data: { isActive: false }
    });

    const newPrompt = await prisma.dataSourcePrompt.create({
      data: {
        dataSourceId: dataSource.id,
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
