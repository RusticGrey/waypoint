import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/prisma';

// GET /api/coordinator/availability?coordinatorId={id}
export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    let coordinatorId = request.nextUrl.searchParams.get('coordinatorId');
    
    // Allow 'me' alias for current user, or default to current user if not specified
    if (coordinatorId === 'me' || !coordinatorId) {
      coordinatorId = session.user.id;
    }

    // Fetch all availability for this coordinator
    // For the availability settings page, we want ALL records including inactive ones
    // For slot picker (public view), we might only want active ones.
    // Let's decide based on whether we are viewing our own availability or someone else's.
    // But for simplicity and consistent API, let's just return all and let frontend filter if needed, 
    // OR support an 'activeOnly' param.
    // The slot picker expects active blocks to generate slots.
    // The settings page needs all blocks to show the UI state correctly (though it uses a default structure).
    
    const activeOnly = request.nextUrl.searchParams.get('activeOnly') === 'true';
    const whereClause: any = { coordinatorId };
    if (activeOnly) {
      whereClause.isActive = true;
    }

    const availability = await prisma.coordinatorAvailability.findMany({
      where: whereClause,
      orderBy: { dayOfWeek: 'asc' },
    });

    return NextResponse.json(availability);
  } catch (error) {
    console.error('Failed to fetch availability:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

// PATCH /api/coordinator/availability
export async function PATCH(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session || (session.user.role !== 'coordinator' && session.user.role !== 'counselor')) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await request.json();
    const { availability } = body; // Array of {dayOfWeek, startTime, endTime, isActive}

    if (!Array.isArray(availability)) {
      return NextResponse.json({ error: 'availability must be an array' }, { status: 400 });
    }

    const coordinatorId = session.user.id;

    // Delete existing availability for this coordinator
    await prisma.coordinatorAvailability.deleteMany({ where: { coordinatorId } });

    // Create new availability blocks
    const created = await prisma.coordinatorAvailability.createMany({
      data: availability.map((item: any) => ({
        coordinatorId,
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
