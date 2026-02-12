import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import { z } from 'zod';
import { logChange } from '@/lib/utils/change-log';

const activitySchema = z.object({
  activityName: z.string().min(1),
  category: z.string().min(1),
  role: z.string().optional(),
  gradeLevel: z.string().min(1),
  hoursPerWeek: z.number().min(0).max(168),
  weeksPerYear: z.number().min(0).max(52),
  description: z.string().min(10),
});

export async function GET(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    
    const activities = await prisma.Activity.findMany({
      where: { studentId: session.user.id },
      orderBy: { activityName: 'asc' },
    });
    
    return NextResponse.json({ activities });
  } catch (error) {
    console.error('Activities fetch error:', error);
    return NextResponse.json({ error: 'Failed to fetch activities' }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    
    const body = await req.json();
    const validated = activitySchema.parse(body);
    
    const activity = await prisma.Activity.create({
      data: {
        studentId: session.user.id,
        ...validated,
      },
    });
    
    await logChange({
      studentId: session.user.id,
      changeType: 'New_Addition',
      entityType: 'Activity',
      entityId: activity.id,
      action: 'Created',
      description: `Added new activity: ${validated.activityName}`,
    });
    
    return NextResponse.json(activity);
  } catch (error) {
    console.error('Activity create error:', error);
    return NextResponse.json({ error: 'Failed to create activity' }, { status: 500 });
  }
}
