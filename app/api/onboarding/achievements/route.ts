import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import { achievementSchema } from '@/lib/validations/activity';
import { z } from 'zod';

const achievementsArraySchema = z.object({
  Achievement: z.array(achievementSchema),
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

    const createdAchievements = await prisma.Achievement.createMany({
      data: achievements.map((achievement) => ({
        ...achievement,
        // Convert empty string dates to null, convert valid dates to Date objects
        dateAchieved: achievement.dateAchieved && achievement.dateAchieved.trim() !== '' 
          ? new Date(achievement.dateAchieved) 
          : null,
        studentId: session.user.id,
      })),
    });

    return NextResponse.json(createdAchievements);
  } catch (error) {
    console.error('Achievements error:', error);
    return NextResponse.json(
      { error: 'Failed to save achievements' },
      { status: 500 }
    );
  }
}
