import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import { NextResponse } from 'next/server';
import { z } from 'zod';

const phaseSchema = z.object({
  phase: z.enum(['Onboarding', 'Profile_Building', 'College_Applications']),
});

export async function PATCH(
  request: Request,
  { params }: { params: { studentId: string } }
) {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user?.id || (session.user.role !== 'counselor' && session.user.role !== 'coordinator')) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await request.json();
    const result = phaseSchema.safeParse(body);

    if (!result.success) {
      return NextResponse.json(
        { error: 'Invalid phase value' },
        { status: 400 }
      );
    }

    const student = await prisma.student.update({
      where: { userId: params.studentId },
      data: { phase: result.data.phase },
    });

    return NextResponse.json(student);
  } catch (error) {
    console.error('Error updating student phase:', error);
    return NextResponse.json(
      { error: 'Failed to update student phase' },
      { status: 500 }
    );
  }
}
