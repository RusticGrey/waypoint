import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import { academicProfileSchema } from '@/lib/validations/student';
import { calculateProfileCompletion } from '@/lib/utils/profile-completion';
import { updateStudentProfileCompletion } from '@/lib/api-helpers/profile';

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await req.json();
    const validatedData = academicProfileSchema.parse(body);

    // Create or update academic profile
    const profile = await prisma.academicProfile.upsert({
      where: { studentId: session.user.id },
      update: {
        curriculumType: validatedData.curriculumType,
        gradingSystemType: validatedData.gradingSystemType,
        currentGpa: validatedData.currentGpa,
      },
      create: {
        studentId: session.user.id,
        curriculumType: validatedData.curriculumType,
        gradingSystemType: validatedData.gradingSystemType,
        currentGpa: validatedData.currentGpa,
      },
    });

    // Update profile completion percentage
    const student = await prisma.student.findUnique({
      where: { userId: session.user.id },
      include: {
        personalProfile: true,
        academicProfile: true,
        transcripts: true,
        activities: true,
        achievements: true,
        projectExperiences: true,
        testScores: true,
      },
    });

    let completionPercentage = 0;
    if (student) {
      const { percentage } = calculateProfileCompletion(student);
      completionPercentage = percentage;
      await updateStudentProfileCompletion(session.user.id, percentage);
    }

    return NextResponse.json({ ...profile, completionPercentage });
  } catch (error) {
    console.error('Academic profile error:', error);
    return NextResponse.json(
      { error: 'Failed to save academic profile' },
      { status: 500 }
    );
  }
}
