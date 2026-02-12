import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import { activitySchema } from '@/lib/validations/activity';
import { z } from 'zod';

const activitiesArraySchema = z.object({
  Activity: z.array(activitySchema),
});

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await req.json();
    const { activities } = activitiesArraySchema.parse(body);

    // Delete existing activities and create new ones
    await prisma.activity.deleteMany({
      where: { student_id: session.user.id },
    });

    const createdActivities = await prisma.activity.createMany({
      data: activities.map((activity) => ({
        ...activity,
        student_id: session.user.id,
      })),
    });

    return NextResponse.json(createdActivities);
  } catch (error) {
    console.error('Activities error:', error);
    return NextResponse.json(
      { error: 'Failed to save activities' },
      { status: 500 }
    );
  }
}
