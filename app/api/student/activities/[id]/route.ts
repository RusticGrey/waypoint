import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import { z } from 'zod';
import { logChange } from '@/lib/utils/change-log';

const activitySchema = z.object({
  activity_name: z.string().min(1),
  category: z.string().min(1),
  role: z.string().optional(),
  grade_levels: z.array(z.enum(['ninth', 'tenth', 'eleventh', 'twelfth'])),
  hours_per_week: z.number().min(0).max(168),
  weeks_per_year: z.number().min(0).max(52),
  description: z.string().min(10),
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
      change_type: 'Profile_Update',
      entity_type: 'Activity',
      entity_id: activity.id,
      action: 'Updated',
      description: `Updated activity: ${validated.activityName}`,
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
        change_type: 'Profile_Update',
        entity_type: 'Activity',
        entity_id: activity.id,
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
