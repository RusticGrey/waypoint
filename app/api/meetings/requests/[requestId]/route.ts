import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import { createConferenceMeeting } from '@/lib/meetings/conferenceFactory';
import { sendMeetingConfirmation, sendRequestUpdate } from '@/lib/meetings/notifications';
import { deleteEvent } from '@/lib/meetings/googleCalendar';
import { z, ZodError } from 'zod';
import { BRAND_NAME } from '@/lib/branding';

const patchSchema = z.object({
  status: z.enum(['Accepted', 'Declined', 'ChangeSuggested', 'Cancelled']),
  hostNote: z.string().optional(),
  suggestedStart: z.string().datetime().optional(),
  suggestedEnd: z.string().datetime().optional(),
});

export async function PATCH(
  req: Request,
  { params }: { params: { requestId: string } }
) {
  const session = await getServerSession(authOptions);
  const { requestId } = params;

  if (!session?.user?.id) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const body = await req.json();
    const validated = patchSchema.parse(body);

    const request = await prisma.meetingRequest.findUnique({
      where: { id: requestId },
      include: {
        student: {
          include: {
            user: true,
          },
        },
        host: {
          include: {
            user: true,
          },
        },
      },
    }) as any;

    if (!request) {
      return NextResponse.json({ error: 'Request not found' }, { status: 404 });
    }

    // Role checks
    if (validated.status === 'Cancelled') {
      if (session.user.id !== request.studentId && session.user.id !== request.hostId && session.user.role !== 'counselor') {
        return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
      }
    } else {
      // Accepted, Declined, ChangeSuggested are host-only
      if (session.user.id !== request.hostId && session.user.role !== 'counselor') {
        return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
      }
    }

    if (validated.status === 'Accepted') {
      // 1. Delete tentative GCal event if exists (to be replaced by official one)
      if (request.googleCalendarEventId) {
        try {
          await deleteEvent(request.hostId, request.googleCalendarEventId);
        } catch (e) {
          console.error('Failed to delete tentative event during acceptance:', e);
        }
      }

      // 2. Calculate meeting duration in minutes
      const durationMinutes = Math.round(
        (request.requestedEnd.getTime() - request.requestedStart.getTime()) / 60000
      );

      // 3. Create Conference Meeting
      const conference = await createConferenceMeeting(request.hostId, {
        title: `${request.meetingType} with ${request.student.user.firstName}`,
        description: `Scheduled meeting on ${BRAND_NAME} platform.`,
        startTime: request.requestedStart.toISOString(),
        endTime: request.requestedEnd.toISOString(),
        timeZone: request.student.user.timezone,
        studentEmail: request.student.user.email,
        durationMinutes,
        agenda: request.studentNote || undefined,
      });

      // 4. Create Scheduled Meeting
      const meeting = await prisma.meeting.create({
        data: {
          studentId: request.studentId,
          hostId: request.hostId,
          meetingType: request.meetingType,
          startTime: request.requestedStart,
          endTime: request.requestedEnd,
          conferencePlatform: conference.platform,
          conferenceId: conference.conferenceId,
          conferenceJoinUrl: conference.conferenceJoinUrl,
          conferenceHostUrl: conference.conferenceHostUrl,
          googleCalendarEventId: conference.googleCalendarEventId,
          status: 'Upcoming',
        },
      });

      // 5. Update Request
      const updatedRequest = await prisma.meetingRequest.update({
        where: { id: requestId },
        data: {
          status: 'Accepted',
          meeting: { connect: { id: meeting.id } },
        },
      });

      const meetingWithDetails = await prisma.meeting.findUnique({
        where: { id: meeting.id },
        include: {
          student: { include: { user: true } },
          host: { include: { user: true } },
        },
      });

      await sendMeetingConfirmation(meetingWithDetails);

      return NextResponse.json(meeting);
    } else {
      // Declined, ChangeSuggested, Cancelled
      
      // Delete tentative GCal event if exists (free up the slot)
      if (request.googleCalendarEventId && (validated.status === 'Declined' || validated.status === 'Cancelled' || validated.status === 'ChangeSuggested')) {
        try {
          console.log('Attempting to delete tentative GCal event:', request.googleCalendarEventId);
          await deleteEvent(request.hostId, request.googleCalendarEventId);
          console.log('Tentative GCal event deleted successfully');
        } catch (e) {
          console.error('Failed to delete tentative event:', e);
        }
      }

      const updatedRequest = await prisma.meetingRequest.update({
        where: { id: requestId },
        data: {
          status: validated.status,
          hostNote: validated.hostNote || null,
          suggestedStart: validated.suggestedStart ? new Date(validated.suggestedStart) : null,
          suggestedEnd: validated.suggestedEnd ? new Date(validated.suggestedEnd) : null,
        },
        include: {
          student: { include: { user: true } },
          host: { include: { user: true } },
        },
      });

      await sendRequestUpdate(updatedRequest);

      return NextResponse.json(updatedRequest);
    }
  } catch (error: any) {
    if (error instanceof ZodError) {
      return NextResponse.json({ error: error.issues }, { status: 400 });
    }
    console.error('Update Meeting Request Error:', error);
    return NextResponse.json({ 
      error: 'Failed to update request', 
      details: error.message 
    }, { status: 500 });
  }
}

export async function GET(
  req: Request,
  { params }: { params: { requestId: string } }
) {
  const session = await getServerSession(authOptions);
  const { requestId } = params;

  if (!session?.user?.id) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const request = await prisma.meetingRequest.findUnique({
      where: { id: requestId },
      include: {
        student: {
          include: {
            user: true,
            personalProfile: true,
          },
        },
        host: true,
        meeting: true,
      },
    });

    if (!request) {
      return NextResponse.json({ error: 'Request not found' }, { status: 404 });
    }

    if (
      session.user.role !== 'counselor' &&
      session.user.id !== request.studentId &&
      session.user.id !== request.hostId
    ) {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
    }

    return NextResponse.json(request);
  } catch (error) {
    console.error('Fetch Meeting Request Detail Error:', error);
    return NextResponse.json({ error: 'Failed to fetch request' }, { status: 500 });
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: { requestId: string } }
) {
  const session = await getServerSession(authOptions);
  const { requestId } = params;

  if (!session?.user?.id) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const request = await prisma.meetingRequest.findUnique({
      where: { id: requestId },
    });

    if (!request) {
      return NextResponse.json({ error: 'Request not found' }, { status: 404 });
    }

    // Permission check: Counselor can delete anything, Student can only delete their own declined/cancelled requests
    const isHost = session.user.id === request.hostId;
    const isStudent = session.user.id === request.studentId;
    const isCounselorRole = session.user.role === 'counselor';

    if (!isCounselorRole && !isHost && !isStudent) {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
    }

    // Students can only delete if it's already Declined or Cancelled
    if (isStudent && !isCounselorRole && request.status !== 'Declined' && request.status !== 'Cancelled') {
      return NextResponse.json({ error: 'Students can only delete declined or cancelled requests from their view.' }, { status: 400 });
    }

    // Cleanup tentative GCal event if deleting an active request (for counselors)
    if (request.status === 'Pending' || request.status === 'ChangeSuggested') {
      if (request.googleCalendarEventId) {
        try { await deleteEvent(request.hostId, request.googleCalendarEventId); } catch (e) {}
      }
    }

    await prisma.meetingRequest.delete({
      where: { id: requestId },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Delete Meeting Request Error:', error);
    return NextResponse.json({ error: 'Failed to delete request' }, { status: 500 });
  }
}
