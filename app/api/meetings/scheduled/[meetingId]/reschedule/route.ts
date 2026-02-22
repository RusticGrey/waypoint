import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import { createConferenceMeeting } from '@/lib/meetings/conferenceFactory';
import { deleteZoomMeeting } from '@/lib/meetings/zoom';
import { deleteEvent } from '@/lib/meetings/googleCalendar';
import { sendMeetingConfirmation } from '@/lib/meetings/notifications';

export async function POST(
  req: Request,
  { params }: { params: { meetingId: string } }
) {
  const session = await getServerSession(authOptions);
  const { meetingId } = params;

  if (!session?.user?.id || (session.user.role !== 'coordinator' && session.user.role !== 'counselor')) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const { startTime, endTime } = await req.json();

    const meeting = await prisma.scheduledMeeting.findUnique({
      where: { id: meetingId },
      include: {
        student: { include: { user: true } },
      },
    });

    if (!meeting) {
      return NextResponse.json({ error: 'Meeting not found' }, { status: 404 });
    }

    if (session.user.id !== meeting.hostId && session.user.role !== 'counselor') {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
    }

    // 1. Cleanup old integrations
    if (meeting.conferencePlatform === 'Zoom' && meeting.conferenceId) {
      try { await deleteZoomMeeting(meeting.hostId, meeting.conferenceId); } catch (e) {}
    }
    if (meeting.googleCalendarEventId) {
      try { await deleteEvent(meeting.hostId, meeting.googleCalendarEventId); } catch (e) {}
    }

    // 2. Create new integrations
    const durationMinutes = Math.round(
      (new Date(endTime).getTime() - new Date(startTime).getTime()) / 60000
    );

    const conference = await createConferenceMeeting(meeting.hostId, {
      title: `${meeting.meetingType} with ${meeting.student.user.firstName} (Rescheduled)`,
      description: `Rescheduled meeting on Waypoint platform.`,
      startTime,
      endTime,
      studentEmail: meeting.student.user.email!,
      durationMinutes,
      agenda: meeting.agenda || undefined,
    });

    // 3. Update the meeting record
    const updatedMeeting = await prisma.scheduledMeeting.update({
      where: { id: meetingId },
      data: {
        startTime: new Date(startTime),
        endTime: new Date(endTime),
        conferencePlatform: conference.platform,
        conferenceId: conference.conferenceId,
        conferenceJoinUrl: conference.conferenceJoinUrl,
        conferenceHostUrl: conference.conferenceHostUrl,
        googleCalendarEventId: conference.googleCalendarEventId,
        status: 'Upcoming',
      },
      include: {
        student: { include: { user: true } },
        host: true,
      }
    });

    await sendMeetingConfirmation(updatedMeeting);

    return NextResponse.json(updatedMeeting);
  } catch (error: any) {
    console.error('Reschedule API Error:', error);
    return NextResponse.json({ error: 'Failed to reschedule', details: error.message }, { status: 500 });
  }
}
