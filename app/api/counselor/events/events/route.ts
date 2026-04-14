import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import { z } from 'zod';

const createEventSchema = z.object({
  title: z.string().min(1),
  description: z.string().optional(),
  location: z.string().min(1),
  startDate: z.string().datetime(),
  endDate: z.string().datetime(),
  counselorIds: z.array(z.string()),
  slotDuration: z.number().default(30),
  dailyStartTime: z.string().regex(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/),
  dailyEndTime: z.string().regex(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/),
});

export async function POST(req: Request) {
  const session = await getServerSession(authOptions);

  if (!session?.user?.id || session.user.role !== 'counselor') {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  let organizationId = session.user.organizationId;

  if (!organizationId) {
    // Fallback: Fetch from database if session is stale
    const user = await prisma.user.findUnique({
      where: { id: session.user.id },
      select: { organizationId: true },
    });
    organizationId = user?.organizationId || '';
  }

  if (!organizationId) {
    return NextResponse.json({ error: 'Organization ID not found' }, { status: 400 });
  }

  try {
    const body = await req.json();
    const validated = createEventSchema.parse(body);

    const result = await prisma.$transaction(async (tx) => {
      // 1. Create the event
      const event = await tx.publicEvent.create({
        data: {
          organization: { connect: { id: organizationId } },
          title: validated.title,
          description: validated.description,
          location: validated.location,
          startDate: new Date(validated.startDate),
          endDate: new Date(validated.endDate),
          isActive: true,
          slotDuration: validated.slotDuration,
          assignments: {
            create: validated.counselorIds.map((id) => ({
              counselorId: id,
            })),
          },
        },
      });

      // 2. Generate timeslots
      const start = new Date(validated.startDate);
      const end = new Date(validated.endDate);
      const timeslots = [];
      const capacity = validated.counselorIds.length;

      let currentDay = new Date(start);
      while (currentDay <= end) {
        const [startH, startM] = validated.dailyStartTime.split(':').map(Number);
        const [endH, endM] = validated.dailyEndTime.split(':').map(Number);

        let currentTime = new Date(currentDay);
        currentTime.setHours(startH, startM, 0, 0);

        const dayEndTime = new Date(currentDay);
        dayEndTime.setHours(endH, endM, 0, 0);

        while (currentTime < dayEndTime) {
          const slotEndTime = new Date(currentTime.getTime() + validated.slotDuration * 60 * 1000);
          if (slotEndTime <= dayEndTime) {
            timeslots.push({
              eventId: event.id,
              startTime: new Date(currentTime),
              duration: validated.slotDuration,
              capacity: capacity,
            });
          }
          currentTime = slotEndTime;
        }
        currentDay.setDate(currentDay.getDate() + 1);
      }

      await tx.eventSlot.createMany({
        data: timeslots,
      });

      return event;
    });

    return NextResponse.json(result, { status: 201 });
  } catch (error) {
    console.error('Create Public Event Error:', error);
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: error.issues }, { status: 400 });
    }
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

export async function GET() {
  const session = await getServerSession(authOptions);

  if (!session?.user?.id || session.user.role !== 'counselor') {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const organizationId = session.user.organizationId;

  try {
    const events = await prisma.publicEvent.findMany({
      where: {
        organizationId: organizationId,
      },
      include: {
        _count: {
          select: {
            slots: true,
          },
        },
        assignments: {
          include: {
            counselor: {
              include: {
                user: {
                  select: {
                    firstName: true,
                    lastName: true,
                  },
                },
              },
            },
          },
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
    });

    return NextResponse.json(events);
  } catch (error) {
    console.error('Fetch Public Events Error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
