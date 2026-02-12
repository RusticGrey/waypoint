import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import { logChange } from '@/lib/utils/change-log';

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
    
    // Map form fields to database schema
    const achievement = await prisma.Achievement.update({
      where: {
        id: params.id,
        studentId: session.user.id,
      },
      data: {
        title: body.title,
        achievementType: body.achievementType,
        organization: body.organization || null,
        recognitionLevel: body.recognitionLevel || null,
        gradeLevel: body.gradeLevel || null,
        dateAchieved: body.dateReceived ? new Date(body.dateReceived) : null, // Map date_received to date_achieved
        description: body.description || null,
      },
    });
    
    await logChange({
      studentId: session.user.id,
      changeType: 'Profile_Update',
      entityType: 'Achievement',
      entityId: achievement.id,
      action: 'Updated',
      description: `Updated achievement: ${body.title}`,
    });
    
    return NextResponse.json(achievement);
  } catch (error) {
    console.error('Achievement update error:', error);
    return NextResponse.json({ error: 'Failed to update achievement' }, { status: 500 });
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
    
    const achievement = await prisma.achievement.findUnique({
      where: { id: params.id },
    });
    
    if (achievement) {
      await logChange({
        studentId: session.user.id,
        changeType: 'Profile_Update',
        entityType: 'Achievement',
        entityId: achievement.id,
        action: 'Deleted',
        description: `Removed achievement: ${achievement.title}`,
      });
    }
    
    await prisma.achievement.delete({
      where: {
        id: params.id,
        studentId: session.user.id,
      },
    });
    
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Achievement delete error:', error);
    return NextResponse.json({ error: 'Failed to delete achievement' }, { status: 500 });
  }
}
