import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import { sendMeetingRequest } from '@/lib/meetings/notifications';
import { createEvent } from '@/lib/meetings/googleCalendar';
import { z, ZodError } from 'zod';

const createSchema = z.object({
  hostId: z.string(),
  requestedStart: z.string().datetime(),
  requestedEnd: z.string().datetime(),
  meetingType: z.string(), // MeetingType enum string
  studentNote: z.string().max(500).optional(),
});

export async function POST(req: Request) {
  const session = await getServerSession(authOptions);

  if (!session?.user?.id || session.user.role !== 'student') {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const body = await req.json();
    const validated = createSchema.parse(body);

    // Create the request first
    let request = await prisma.meetingRequest.create({
      data: {
        studentId: session.user.id,
        hostId: validated.hostId,
        requestedStart: new Date(validated.requestedStart),
        requestedEnd: new Date(validated.requestedEnd),
        meetingType: validated.meetingType as any,
        studentNote: validated.studentNote,
      },
      include: {
        student: {
          include: {
            user: true,
          },
        },
        host: true,
      },
    });

    // Create tentative event in Google Calendar (blocks slot)
    try {
      if (request.hostId && request.student.user.email) {
        const { eventId } = await createEvent(request.hostId, {
          title: `Tentative: ${request.meetingType} with ${request.student.user.firstName} ${request.student.user.lastName}`,
          description: `Meeting Request from Waypoint.\n\nNote: ${request.studentNote || 'None'}\n\nThis slot is blocked tentatively until confirmed.`,
          startTime: request.requestedStart.toISOString(),
          endTime: request.requestedEnd.toISOString(),
          studentEmail: request.student.user.email,
          requestMeetLink: false, // Don't generate link yet
          transparency: 'opaque' // Mark as busy
        });

        // Update request with event ID
        request = await prisma.meetingRequest.update({
          where: { id: request.id },
          data: { googleCalendarEventId: eventId },
          include: {
            student: { include: { user: true } },
            host: true
          }
        });
      }
    } catch (gcalError) {
      console.error('Failed to create tentative GCal event:', gcalError);
      // Don't fail the request, just log it. The slot won't be blocked on GCal but request exists.
    }

    await sendMeetingRequest(request);

    return NextResponse.json(request, { status: 201 });
  } catch (error) {
    if (error instanceof ZodError) {
      return NextResponse.json({ error: error.issues }, { status: 400 });
    }
    console.error('Create Meeting Request Error:', error);
    return NextResponse.json({ error: 'Failed to create request' }, { status: 500 });
  }
}

export async function GET(req: Request) {
  const session = await getServerSession(authOptions);

  if (!session?.user?.id) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const { searchParams } = new URL(req.url);
  const statusFilter = searchParams.get('status');

  const where: any = {};
  if (session.user.role === 'student') {
    where.studentId = session.user.id;
  } else if (session.user.role === 'coordinator') {
    where.hostId = session.user.id;
  } else if (session.user.role === 'counselor') {
    const hostId = searchParams.get('hostId');
    if (hostId) {
      where.hostId = hostId;
    }
    // Else: show all (global view)
  }

  if (statusFilter) {
    where.status = statusFilter;
  }

  try {
    const requests = await prisma.meetingRequest.findMany({
      where,
      include: {
        student: {
          include: {
            user: true,
            personalProfile: true,
          },
        },
        host: true,
      },
      orderBy: { createdAt: 'desc' },
    });

    return NextResponse.json(requests);
  } catch (error) {
    console.error('Fetch Meeting Requests Error:', error);
    return NextResponse.json({ error: 'Failed to fetch requests' }, { status: 500 });
  }
}
