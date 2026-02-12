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
    
    const meeting = await prisma.meeting.create({
      data: {
        student_id: body.student_id,
        coordinator_id: session.user.id,
        meeting_date: new Date(body.meeting_date),
        duration_minutes: body.duration_minutes,
        meeting_type: body.meeting_type,
        topics_discussed: body.topics_discussed,
        notes: body.notes,
        action_items: body.action_items,
        next_meeting_date: body.next_meeting_date ? new Date(body.next_meeting_date) : null,
        student_mood: body.student_mood,
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
