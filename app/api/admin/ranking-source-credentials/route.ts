import { prisma } from '@/lib/prisma';
import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';

export async function GET(req: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session || session.user.role !== 'counselor') {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const credentials = await prisma.rankingSourceCredential.findMany({
      where: { organizationId: session.user.organizationId },
      include: { rankingSource: true },
    });
    
    // Don't return passwords/keys, just metadata
    return NextResponse.json(credentials.map(c => ({
      sourceName: c.rankingSource.name,
      displayName: c.rankingSource.displayName,
      hasEmail: !!c.encryptedEmail,
      hasPassword: !!c.encryptedPassword,
      hasApiKey: !!c.encryptedApiKey,
      lastTestedAt: c.lastTestedAt,
    })));
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session || session.user.role !== 'counselor') {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const { sourceName, email, password, apiKey } = await req.json();

    const source = await prisma.rankingSource.findUnique({
      where: { name: sourceName }
    });
    if (!source) throw new Error(`Source ${sourceName} not found`);

    // In a real app, use encryption here
    const credential = await prisma.rankingSourceCredential.upsert({
      where: {
        rankingSourceId_organizationId: {
          rankingSourceId: source.id,
          organizationId: session.user.organizationId,
        },
      },
      create: {
        rankingSourceId: source.id,
        organizationId: session.user.organizationId,
        encryptedEmail: email,
        encryptedPassword: password,
        encryptedApiKey: apiKey,
      },
      update: {
        encryptedEmail: email,
        encryptedPassword: password,
        encryptedApiKey: apiKey,
      },
    });

    return NextResponse.json({ success: true });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
