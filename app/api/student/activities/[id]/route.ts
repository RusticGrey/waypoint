import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import { z } from 'zod';
import { logChange } from '@/lib/api-helpers/change-log';

const activitySchema = z.object({
  activityName: z.string().min(1).optional(),
  category: z.enum(['Academic', 'Arts_Music', 'Athletics', 'Community_Service', 'Cultural', 'Leadership', 'Other']).optional(),
  role: z.string().optional(),
  gradeLevel: z.enum(['ninth', 'tenth', 'eleventh', 'twelfth']).optional(),
  hoursPerWeek: z.number().min(0).max(168).optional(),
  weeksPerYear: z.number().min(0).max(52).optional(),
  description: z.string().min(10).optional(),
});

export async function PATCH(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    
    const body = await req.json();
    const validated = activitySchema.parse(body);
    
    const activity = await prisma.activity.update({
      where: {
        id: params.id,
        studentId: session.user.id,
      },
      data: validated,
    });
    
    await logChange({
      studentId: session.user.id,
      changeType: 'Profile_Update',
      entityType: 'Activity',
      entityId: activity.id,
      action: 'Updated',
      description: `Updated activity: ${validated.activityName || activity.activityName}`,
    });
    
    return NextResponse.json(activity);
  } catch (error) {
    console.error('Activity update error:', error);
    return NextResponse.json({ error: 'Failed to update activity' }, { status: 500 });
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    
    const activity = await prisma.activity.findUnique({
      where: { id: params.id },
    });
    
    if (activity) {
      await logChange({
        studentId: session.user.id,
        changeType: 'Profile_Update',
        entityType: 'Activity',
        entityId: activity.id,
        action: 'Deleted',
        description: `Removed activity: ${activity.activityName}`,
      });
    }
    
    await prisma.activity.delete({
      where: {
        id: params.id,
        studentId: session.user.id,
      },
    });
    
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Activity delete error:', error);
    return NextResponse.json({ error: 'Failed to delete activity' }, { status: 500 });
  }
}
