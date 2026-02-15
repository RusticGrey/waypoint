import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import { testScoreSchema } from '@/lib/validations/student';
import { z } from 'zod';
import { calculateProfileCompletion } from '@/lib/utils/profile-completion';
import { updateStudentProfileCompletion } from '@/lib/api-helpers/profile';

const testScoresArraySchema = z.object({
  testScores: z.array(testScoreSchema),
});

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await req.json();
    const { testScores } = testScoresArraySchema.parse(body);

    // Delete existing test scores and create new ones
    await prisma.testScore.deleteMany({
      where: { studentId: session.user.id },
    });

    // Create new scores
    const createdScores = await prisma.testScore.createMany({
      data: testScores.map((score) => ({
        testType: score.testType,
        testDate: new Date(score.testDate),
        compositeScore: score.compositeScore,
        mathScore: score.mathScore,
        englishScore: score.englishScore,
        scienceScore: score.scienceScore,
        readingWritingScore: score.readingWritingScore,
        studentId: session.user.id,
      })),
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

    return NextResponse.json({ data: createdScores, completionPercentage });
  } catch (error) {
    console.error('Test scores error:', error);
    return NextResponse.json(
      { error: 'Failed to save test scores' },
      { status: 500 }
    );
  }
}
