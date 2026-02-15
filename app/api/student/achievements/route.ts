import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import { logChange } from '@/lib/api-helpers/change-log';

export async function GET(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    
    const achievements = await prisma.Achievement.findMany({
      where: { studentId: session.user.id },
      orderBy: { dateAchieved: 'desc' }, // Fixed: date_achieved not date_received
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
        studentId: session.user.id,
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
      changeType: 'New_Addition',
      entityType: 'Achievement',
      entityId: achievement.id,
      action: 'Created',
      description: `Added new achievement: ${body.title}`,
    });
    
    return NextResponse.json(achievement);
  } catch (error) {
    console.error('Achievement create error:', error);
    return NextResponse.json({ error: 'Failed to create achievement' }, { status: 500 });
  }
}
