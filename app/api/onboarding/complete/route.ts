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

    // Validate minimum onboarding requirements
    const errors = [];
    if (!student.personalProfile) errors.push('Personal profile incomplete');
    if (!student.academicProfile) errors.push('Academic profile incomplete');
    if ((student.transcripts?.length ?? 0) < 1) errors.push('At least 1 transcript required');
    if ((student.activities?.length ?? 0) < 3) errors.push('At least 3 activities required');
    if ((student.achievements?.length ?? 0) < 2) errors.push('At least 2 achievements required');

    if (errors.length > 0) {
      return NextResponse.json(
        { error: 'Onboarding incomplete', details: errors },
        { status: 400 }
      );
    }

    // Calculate profile completion
    let completion = 0;
    if (student.personalProfile) completion += 15;
    if (student.academicProfile) completion += 15;
    if (student.transcripts.length > 0) completion += 25;
    if (student.activities && student.activities.length >= 3) completion += 20;
    if (student.achievements && student.achievements.length >= 2) completion += 15;
    if (student.projectExperiences && student.projectExperiences.length > 0) completion += 10;

    // Set to 100% when all minimum requirements are met
    if (completion >= 85) {
      completion = 100;
    }

    // Update student profile completion
    await prisma.student.update({
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
