import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/prisma';

// GET /api/counselor/availability?counselorId={id}
export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    let counselorId = request.nextUrl.searchParams.get('counselorId');
    
    // Allow 'me' alias for current user, or default to current user if not specified
    if (counselorId === 'me' || !counselorId) {
      counselorId = session.user.id;
    }

    const activeOnly = request.nextUrl.searchParams.get('activeOnly') === 'true';
    const whereClause: any = { counselorId };
    if (activeOnly) {
      whereClause.isActive = true;
    }

    const availability = await prisma.counselorAvailability.findMany({
      where: whereClause,
      orderBy: { dayOfWeek: 'asc' },
    });

    return NextResponse.json(availability);
  } catch (error) {
    console.error('Failed to fetch availability:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

// PATCH /api/counselor/availability
export async function PATCH(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session || session.user.role !== 'counselor') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await request.json();
    const { availability } = body; // Array of {dayOfWeek, startTime, endTime, isActive}

    if (!Array.isArray(availability)) {
      return NextResponse.json({ error: 'availability must be an array' }, { status: 400 });
    }

    const counselorId = session.user.id;

    // Delete existing availability for this counselor
    await prisma.counselorAvailability.deleteMany({ where: { counselorId } });

    // Create new availability blocks
    const created = await prisma.counselorAvailability.createMany({
      data: availability.map((item: any) => ({
        counselorId,
        dayOfWeek: item.dayOfWeek,
        startTime: item.startTime, // "09:00"
        endTime: item.endTime, // "17:00"
        isActive: item.isActive ?? true,
      })),
    });

    return NextResponse.json({ success: true, created: created.count });
  } catch (error) {
    console.error('Failed to save availability:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
