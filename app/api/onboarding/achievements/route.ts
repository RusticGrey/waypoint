import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import { achievementSchema } from '@/lib/validations/activity';
import { z } from 'zod';
import { calculateProfileCompletion } from '@/lib/utils/profile-completion';
import { updateStudentProfileCompletion } from '@/lib/api-helpers/profile';

const achievementsArraySchema = z.object({
  achievements: z.array(achievementSchema),
});

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await req.json();
    const { achievements } = achievementsArraySchema.parse(body);

    await prisma.achievement.deleteMany({
      where: { studentId: session.user.id },
    });

    const createdAchievements = await prisma.achievement.createMany({
      data: achievements.map((achievement) => ({
        ...achievement,
        // Convert empty string dates to null, convert valid dates to Date objects
        dateAchieved: achievement.dateAchieved && achievement.dateAchieved.trim() !== '' 
          ? new Date(achievement.dateAchieved) 
          : null,
        description: achievement.description,
        recognitionLevel: achievement.recognitionLevel,
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

    return NextResponse.json({ data: createdAchievements, completionPercentage });
  } catch (error) {
    console.error('Achievements error:', error);
    return NextResponse.json(
      { error: 'Failed to save achievements' },
      { status: 500 }
    );
  }
}
