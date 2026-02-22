import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import { createConferenceMeeting } from '@/lib/meetings/conferenceFactory';
import { sendMeetingConfirmation, sendRequestUpdate } from '@/lib/meetings/notifications';
import { deleteEvent } from '@/lib/meetings/googleCalendar';
import { z, ZodError } from 'zod';

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
        host: true,
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
        description: `Scheduled meeting on Waypoint platform.`,
        startTime: request.requestedStart.toISOString(),
        endTime: request.requestedEnd.toISOString(),
        studentEmail: request.student.user.email,
        durationMinutes,
        agenda: request.studentNote || undefined,
      });

      // 4. Create Scheduled Meeting
      const scheduledMeeting = await prisma.scheduledMeeting.create({
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
          scheduledMeeting: { connect: { id: scheduledMeeting.id } },
        },
      });

      const meetingWithDetails = await prisma.scheduledMeeting.findUnique({
        where: { id: scheduledMeeting.id },
        include: {
          student: { include: { user: true } },
          host: true,
        },
      });

      await sendMeetingConfirmation(meetingWithDetails);

      return NextResponse.json(scheduledMeeting);
    } else {
      // Declined, ChangeSuggested, Cancelled
      
      // Delete tentative GCal event if exists (free up the slot)
      // Only for Declined or Cancelled. ChangeSuggested keeps it tentative?
      // Spec says: "When a student has requested a slot, until its accepted or denied, others cannot book that slot."
      // If ChangeSuggested, the original slot might still be blocked? 
      // Usually ChangeSuggested implies the original time is not good. So we should probably clear it.
      // Or maybe update it? For simplicity, let's delete it. The student will have to accept the new time or re-book.
      // Actually, if status is 'ChangeSuggested', the request is still active but with new proposed time.
      // But the original slot should be freed.
      
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
          host: true,
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
        scheduledMeeting: true,
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
