import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/prisma';

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session?.user?.id || session.user.role !== 'counselor') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    
    const body = await req.json();
    
    // Refactored to create a MeetingNote (Past log)
    // We create the Note and link it to the counselor
    const meetingNote = await prisma.meetingNote.create({
      data: {
        studentId: body.studentId,
        counselorId: session.user.id,
        meetingDate: new Date(body.meetingDate),
        durationMinutes: body.durationMinutes,
        meetingType: body.meetingType,
        topicsDiscussed: body.topicsDiscussed,
        notes: body.notes,
        actionItems: body.actionItems,
        nextMeetingDate: body.nextMeetingDate ? new Date(body.nextMeetingDate) : null,
        studentMood: body.studentMood,
        // If there was a specific Meeting (Scheduled Event), link it
        meetingId: body.meetingId || null,
      },
    });
    
    return NextResponse.json(meetingNote);
    
    return NextResponse.json(meeting);
  } catch (error) {
    console.error('Meeting create error:', error);
    return NextResponse.json(
      { error: 'Failed to create meeting' },
      { status: 500 }
    );
  }
}
