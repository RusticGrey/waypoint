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
        personal_profile: true,
        academic_profile: true,
        transcripts: true,
        activities: true,
        achievements: true,
        project_experiences: true,
      },
    });

    if (!student) {
      return NextResponse.json({ error: 'Student not found' }, { status: 404 });
    }

    // Simple completion calculation
    let completion = 0;
    if (student.personal_profile) completion += 15;
    if (student.academic_profile) completion += 15;
    if (student.transcripts.length > 0) completion += 25;
    if (student.activities && student.activities.length >= 3) completion += 20;
    if (student.achievements && student.achievements.length >= 2) completion += 15;
    if (student.project_experiences && student.project_experiences.length > 0) completion += 10;

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
