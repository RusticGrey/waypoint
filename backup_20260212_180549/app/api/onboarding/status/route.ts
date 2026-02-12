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

    // Only for students
    if (session.user.role !== 'student') {
      return NextResponse.json({ isComplete: true });
    }

    // Check if student has completed onboarding
    const student = await prisma.student.findUnique({
      where: { user_id: session.user.id },
      include: {
        PersonalProfile: true,
        AcademicProfile: true,
      },
    });

    // Onboarding is complete if both profiles exist
    const isComplete = !!(student?.PersonalProfile && student?.AcademicProfile);

    return NextResponse.json({ isComplete });
  } catch (error) {
    console.error('Onboarding status check error:', error);
    return NextResponse.json(
      { error: 'Failed to check onboarding status' },
      { status: 500 }
    );
  }
}
