import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/prisma';

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session?.user?.id || (session.user.role !== 'coordinator' && session.user.role !== 'counselor')) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    
    const body = await req.json();
    
    const meeting = await prisma.Meeting.create({
      data: {
        studentId: body.studentId,
        coordinatorId: session.user.id,
        meetingDate: new Date(body.meetingDate),
        durationMinutes: body.durationMinutes,
        meetingType: body.meetingType,
        topicsDiscussed: body.topicsDiscussed,
        notes: body.notes,
        actionItems: body.actionItems,
        nextMeetingDate: body.nextMeetingDate ? new Date(body.nextMeetingDate) : null,
        studentMood: body.studentMood,
      },
    });
    
    return NextResponse.json(meeting);
  } catch (error) {
    console.error('Meeting create error:', error);
    return NextResponse.json(
      { error: 'Failed to create meeting' },
      { status: 500 }
    );
  }
}
