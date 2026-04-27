import { prisma } from '@/lib/prisma';
import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';

export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session || session.user.role !== 'counselor') {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const { collegeId, sourceName, profileUrl } = await req.json();

    // 1. Get ranking source ID
    const source = await prisma.rankingSource.findUnique({
      where: { name: sourceName }
    });
    if (!source) throw new Error(`Source ${sourceName} not found`);

    // 2. Create or update mapping
    const mapping = await prisma.rankingSourceCollege.upsert({
      where: {
        rankingSourceId_collegeId: {
          rankingSourceId: source.id,
          collegeId,
        },
      },
      create: {
        rankingSourceId: source.id,
        collegeId,
        sourceProfileUrl: profileUrl,
        sections: {}, // Default empty for LLM to figure out or to be expanded
      },
      update: {
        sourceProfileUrl: profileUrl,
      },
    });

    return NextResponse.json(mapping);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
