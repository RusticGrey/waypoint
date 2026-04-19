import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/prisma';

export const dynamic = 'force-dynamic';

export async function GET(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session?.user?.id || (session.user.role !== 'counselor' && session.user.role !== 'counselor')) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const isCounselor = session.user.role === 'counselor';
    const organizationId = session.user.organizationId;

    const where: any = {
      user: { organizationId }
    };

    if (isCounselor) {
      where.counselorId = session.user.id;
    }
    
    const students = await prisma.student.findMany({
      where,
      include: {
        user: {
          select: {
            firstName: true,
            lastName: true,
            email: true,
          },
        },
        personalProfile: true,
      },
      orderBy: {
        user: {
          lastName: 'asc',
        },
      },
    });
    
    return NextResponse.json({ students });
  } catch (error) {
    console.error('Students fetch error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch students' },
      { status: 500 }
    );
  }
}
