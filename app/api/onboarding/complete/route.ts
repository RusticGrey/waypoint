import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/prisma';

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Calculate profile completion
    const student = await prisma.student.findUnique({
      where: { user_id: session.user.id },
      include: {
        PersonalProfile: true,
        AcademicProfile: true,
        Transcript: true,
        Activity: true,
        Achievement: true,
        ProjectExperience: true,
      },
    });

    if (!student) {
      return NextResponse.json({ error: 'Student not found' }, { status: 404 });
    }

    // Simple completion calculation
    let completion = 0;
    if (student.PersonalProfile) completion += 15;
    if (student.AcademicProfile) completion += 15;
    if (student.Transcript.length > 0) completion += 25;
    if (student.Activity && student.Activity.length >= 3) completion += 20;
    if (student.Achievement && student.Achievement.length >= 2) completion += 15;
    if (student.ProjectExperience && student.ProjectExperience.length > 0) completion += 10;

    // Update student profile completion
    await prisma.student.update({
      where: { user_id: session.user.id },
      data: {
        profile_completion_pct: completion,
      },
    });

    return NextResponse.json({ success: true, completion });
  } catch (error) {
    console.error('Complete onboarding error:', error);
    return NextResponse.json(
      { error: 'Failed to complete onboarding' },
      { status: 500 }
    );
  }
}
