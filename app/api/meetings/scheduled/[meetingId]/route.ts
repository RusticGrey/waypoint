import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import { deleteZoomMeeting } from '@/lib/meetings/zoom';
import { deleteEvent } from '@/lib/meetings/googleCalendar';
import { z, ZodError } from 'zod';

const patchSchema = z.object({
  status: z.enum(['Upcoming', 'InProgress', 'Completed', 'Cancelled', 'NoShow']).optional(),
  agenda: z.string().optional(),
});

export async function GET(
  req: Request,
  { params }: { params: { meetingId: string } }
) {
  const session = await getServerSession(authOptions);
  const { meetingId } = params;

  if (!session?.user?.id) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const meeting = await prisma.scheduledMeeting.findUnique({
      where: { id: meetingId },
      include: {
        student: {
          include: {
            user: true,
            personalProfile: true,
          },
        },
        host: true,
      },
    });

    if (!meeting) {
      return NextResponse.json({ error: 'Meeting not found' }, { status: 404 });
    }

    if (
      session.user.role !== 'counselor' &&
      session.user.id !== meeting.studentId &&
      session.user.id !== meeting.hostId
    ) {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
    }

    return NextResponse.json(meeting);
  } catch (error) {
    console.error('Fetch Scheduled Meeting Error:', error);
    return NextResponse.json({ error: 'Failed to fetch meeting' }, { status: 500 });
  }
}

export async function PATCH(
  req: Request,
  { params }: { params: { meetingId: string } }
) {
  const session = await getServerSession(authOptions);
  const { meetingId } = params;

  if (!session?.user?.id) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const meeting = await prisma.scheduledMeeting.findUnique({
      where: { id: meetingId },
    });

    if (!meeting) {
      return NextResponse.json({ error: 'Meeting not found' }, { status: 404 });
    }

    if (session.user.id !== meeting.hostId && session.user.id !== meeting.studentId && session.user.role !== 'counselor') {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
    }

    const body = await req.json();
    const validated = patchSchema.parse(body);

    const updatedMeeting = await prisma.scheduledMeeting.update({
      where: { id: meetingId },
      data: validated,
    });

    if (validated.status === 'Cancelled') {
      if (updatedMeeting.conferencePlatform === 'Zoom' && updatedMeeting.conferenceId) {
        try {
          await deleteZoomMeeting(meeting.hostId, meeting.conferenceId);
        } catch (e) {
          console.error('Failed to delete Zoom meeting:', e);
        }
      }
      if (updatedMeeting.googleCalendarEventId) {
        try {
          console.log('Attempting to delete GCal event:', updatedMeeting.googleCalendarEventId);
          await deleteEvent(updatedMeeting.hostId, updatedMeeting.googleCalendarEventId!);
          console.log('GCal event deleted successfully');
        } catch (e) {
          console.error('Failed to delete Google Calendar event:', e);
        }
      }
    }

    return NextResponse.json(updatedMeeting);
  } catch (error) {
    if (error instanceof ZodError) {
      return NextResponse.json({ error: error.issues }, { status: 400 });
    }
    console.error('Update Scheduled Meeting Error:', error);
    return NextResponse.json({ error: 'Failed to update meeting' }, { status: 500 });
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: { meetingId: string } }
) {
  const session = await getServerSession(authOptions);
  const { meetingId } = params;

  if (!session?.user?.id || session.user.role !== 'counselor') {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const meeting = await prisma.scheduledMeeting.findUnique({
      where: { id: meetingId },
    });

    if (!meeting) {
      return NextResponse.json({ error: 'Meeting not found' }, { status: 404 });
    }

    // Attempt cleanup if not already cancelled
    if (meeting.status !== 'Cancelled') {
      if (meeting.conferencePlatform === 'Zoom' && meeting.conferenceId) {
        try { await deleteZoomMeeting(meeting.hostId, meeting.conferenceId); } catch (e) {}
      }
      if (meeting.googleCalendarEventId) {
        try { await deleteEvent(meeting.hostId, meeting.googleCalendarEventId); } catch (e) {}
      }
    }

    await prisma.scheduledMeeting.delete({
      where: { id: meetingId },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Delete Scheduled Meeting Error:', error);
    return NextResponse.json({ error: 'Failed to delete meeting' }, { status: 500 });
  }
}
