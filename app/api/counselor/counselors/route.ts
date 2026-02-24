import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/prisma';

export const dynamic = 'force-dynamic';

export async function GET(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session?.user?.id || session.user.role !== 'counselor') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    
    const counselors = await prisma.user.findMany({
      where: {
        organizationId: session.user.organizationId,
        role: 'counselor',
      },
      select: {
        id: true,
        firstName: true,
        lastName: true,
        email: true,
      },
      orderBy: {
        lastName: 'asc',
      },
    });
    
    return NextResponse.json({ counselors });
  } catch (error) {
    console.error('Counselors fetch error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch counselors' },
      { status: 500 }
    );
  }
}
