import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import { achievementSchema } from '@/lib/validations/activity';
import { z } from 'zod';

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
      where: { student_id: session.user.id },
    });

    const createdAchievements = await prisma.achievement.createMany({
      data: achievements.map((achievement) => ({
        ...achievement,
        // Convert empty string dates to null, convert valid dates to Date objects
        date_achieved: achievement.date_achieved && achievement.date_achieved.trim() !== '' 
          ? new Date(achievement.date_achieved) 
          : null,
        student_id: session.user.id,
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
