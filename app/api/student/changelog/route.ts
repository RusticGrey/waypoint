import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/prisma';

export async function GET(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    
    const { searchParams } = new URL(req.url);
    const limit = parseInt(searchParams.get('limit') || '50');
    const change_type = searchParams.get('type');
    
    const where: any = {
      studentId: session.user.id,
    };
    
    if (change_type) {
      where.changeType = change_type;
    }
    
    const changes = await prisma.ChangeLog.findMany({
      where,
      orderBy: {
        createdAt: 'desc',
      },
      take: limit,
    });
    
    return NextResponse.json({ changes });
  } catch (error) {
    console.error('Change log fetch error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch change log' },
      { status: 500 }
    );
  }
}
