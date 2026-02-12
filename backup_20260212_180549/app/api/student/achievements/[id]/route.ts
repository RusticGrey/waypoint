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
    const achievement = await prisma.achievement.update({
      where: {
        id: params.id,
        student_id: session.user.id,
      },
      data: {
        title: body.title,
        achievement_type: body.achievement_type,
        organization: body.organization || null,
        recognition_level: body.recognition_level || null,
        grade_level: body.grade_level || null,
        date_achieved: body.date_received ? new Date(body.date_received) : null, // Map date_received to date_achieved
        description: body.description || null,
      },
    });
    
    await logChange({
      student_id: session.user.id,
      change_type: 'Profile_Update',
      entity_type: 'Achievement',
      entity_id: achievement.id,
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
        student_id: session.user.id,
        change_type: 'Profile_Update',
        entity_type: 'Achievement',
        entity_id: achievement.id,
        action: 'Deleted',
        description: `Removed achievement: ${achievement.title}`,
      });
    }
    
    await prisma.achievement.delete({
      where: {
        id: params.id,
        student_id: session.user.id,
      },
    });
    
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Achievement delete error:', error);
    return NextResponse.json({ error: 'Failed to delete achievement' }, { status: 500 });
  }
}
