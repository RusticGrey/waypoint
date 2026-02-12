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
    const student = await prisma.Student.findUnique({
      where: { userId: session.user.id },
      include: {
        personalProfile: true,
        academicProfile: true,
        transcripts: true,
        activities: true,
        achievements: true,
        projectExperiences: true,
      },
    });

    if (!student) {
      return NextResponse.json({ error: 'Student not found' }, { status: 404 });
    }

    // Simple completion calculation
    let completion = 0;
    if (student.personalProfile) completion += 15;
    if (student.academicProfile) completion += 15;
    if (student.transcripts.length > 0) completion += 25;
    if (student.activities && student.activities.length >= 3) completion += 20;
    if (student.achievements && student.achievements.length >= 2) completion += 15;
    if (student.projectExperiences && student.projectExperiences.length > 0) completion += 10;

    // Update student profile completion
    await prisma.Student.update({
      where: { userId: session.user.id },
      data: {
        profileCompletionPct: completion,
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
