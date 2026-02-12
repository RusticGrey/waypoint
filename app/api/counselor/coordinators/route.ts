import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/prisma';

export async function GET(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session?.user?.id || session.user.role !== 'counselor') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    
    const coordinators = await prisma.User.findMany({
      where: {
        organizationId: session.user.organizationId,
        role: 'coordinator',
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
    
    return NextResponse.json({ coordinators });
  } catch (error) {
    console.error('Coordinators fetch error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch coordinators' },
      { status: 500 }
    );
  }
}