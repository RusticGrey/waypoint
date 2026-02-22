import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/prisma';

// GET /api/meetings/occupied-slots?hostId={id}&days={n}
export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const hostId = request.nextUrl.searchParams.get('hostId');
    const daysParam = request.nextUrl.searchParams.get('days') || '7';
    const days = Math.min(parseInt(daysParam), 60); // Cap at 60 days

    if (!hostId) {
      return NextResponse.json({ error: 'hostId required' }, { status: 400 });
    }

    const now = new Date();
    const futureDate = new Date();
    futureDate.setDate(now.getDate() + days);

    // Fetch scheduled meetings within the time range
    const scheduledMeetings = await prisma.scheduledMeeting.findMany({
      where: {
        hostId,
        status: 'Upcoming',
        startTime: { gte: now, lte: futureDate },
      },
      select: {
        id: true,
        startTime: true,
        endTime: true,
        status: true,
      },
    });

    // Fetch pending meeting requests within the time range
    const pendingRequests = await prisma.meetingRequest.findMany({
      where: {
        hostId,
        status: 'Pending',
        requestedStart: { gte: now, lte: futureDate },
      },
      select: {
        id: true,
        requestedStart: true,
        requestedEnd: true,
        status: true,
      },
    });

    // Combine and return as occupied slots
    const occupiedSlots = [
      ...scheduledMeetings.map((m) => ({
        id: m.id,
        startTime: m.startTime,
        endTime: m.endTime,
        type: 'scheduled',
      })),
      ...pendingRequests.map((r) => ({
        id: r.id,
        startTime: r.requestedStart,
        endTime: r.requestedEnd,
        type: 'pending',
      })),
    ];

    return NextResponse.json(occupiedSlots);
  } catch (error) {
    console.error('Failed to fetch occupied slots:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
