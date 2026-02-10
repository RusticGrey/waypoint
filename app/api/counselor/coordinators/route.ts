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
    
    const coordinators = await prisma.user.findMany({
      where: {
        organization_id: session.user.organizationId,
        role: 'coordinator',
      },
      select: {
        id: true,
        first_name: true,
        last_name: true,
        email: true,
      },
      orderBy: {
        last_name: 'asc',
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
