import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import { logChange } from '@/lib/utils/change-log';

export async function GET(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    
    const achievements = await prisma.achievement.findMany({
      where: { student_id: session.user.id },
      orderBy: { date_achieved: 'desc' }, // Fixed: date_achieved not date_received
    });
    
    return NextResponse.json({ achievements });
  } catch (error) {
    console.error('Achievements fetch error:', error);
    return NextResponse.json({ error: 'Failed to fetch achievements' }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    
    const body = await req.json();
    
    // Map form fields to database schema
    const achievement = await prisma.achievement.create({
      data: {
        student_id: session.user.id,
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
      change_type: 'New_Addition',
      entity_type: 'Achievement',
      entity_id: achievement.id,
      action: 'Created',
      description: `Added new achievement: ${body.title}`,
    });
    
    return NextResponse.json(achievement);
  } catch (error) {
    console.error('Achievement create error:', error);
    return NextResponse.json({ error: 'Failed to create achievement' }, { status: 500 });
  }
}
