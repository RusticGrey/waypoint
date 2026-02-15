import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import { z } from 'zod';
import { calculateProfileCompletion } from '@/lib/utils/profile-completion';
import { updateStudentProfileCompletion } from '@/lib/api-helpers/profile';

const personalProfileSchema = z.object({
  preferredName: z.string().optional(),
  phone: z.string().optional(),
  currentSchool: z.string().min(1),
  schoolLocation: z.string().min(1),
  currentGrade: z.enum(['ninth', 'tenth', 'eleventh', 'twelfth']),
  parentName: z.string().min(1),
  parentEmail: z.string().email(),
  parentPhone: z.string().min(1),
});

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await req.json();
    const validatedData = personalProfileSchema.parse(body);

    // Extract current_grade to update Student table
    const { currentGrade, ...personalData } = validatedData;

    // Update student's current_grade
    await prisma.student.update({
      where: { userId: session.user.id },
      data: { currentGrade },
    });

    // Create or update personal profile
    const profile = await prisma.personalProfile.upsert({
      where: { studentId: session.user.id },
      update: personalData,
      create: {
        studentId: session.user.id,
        ...personalData,
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

    // console.log("PERSONAL PROFILE - "+JSON.stringify(profile));
    return NextResponse.json({ ...profile, completionPercentage });
  } catch (error) {
    console.error('Personal profile error:', error);
    return NextResponse.json(
      { error: 'Failed to save personal profile' },
      { status: 500 }
    );
  }
}
