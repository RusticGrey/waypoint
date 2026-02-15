import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/prisma';

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session?.user?.id || session.user.role !== 'counselor') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    
    const body = await req.json();
    const { studentId, coordinatorId } = body;
    
    await prisma.student.update({
      where: {
        userId: studentId,
      },
      data: {
        coordinatorId: coordinatorId || null,
      },
    });
    
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Assign coordinator error:', error);
    return NextResponse.json(
      { error: 'Failed to assign coordinator' },
      { status: 500 }
    );
  }
}
