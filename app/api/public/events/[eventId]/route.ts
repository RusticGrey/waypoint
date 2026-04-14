import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { z } from 'zod';

const signupSchema = z.object({
  timeslotId: z.string().uuid(),
  duration: z.number().refine((d) => [15, 30, 60].includes(d), 'Duration must be 15, 30 or 60 minutes'),
  prospectName: z.string().min(1, 'Name is required'),
  prospectEmail: z.string().email('Invalid email address').optional().or(z.literal('')),
  prospectPhone: z.string().min(1, 'Phone is required'),
  studentGrade: z.string().optional(),
});

export async function GET(
  req: Request,
  { params }: { params: { eventId: string } }
) {
  const { eventId } = params;

  try {
    const event = await prisma.publicEvent.findUnique({
      where: { id: eventId },
      select: {
        id: true,
        title: true,
        description: true,
        location: true,
        headerText: true,
        subheaderText: true,
        slotDuration: true,
        slots: {
          where: { isActive: true },
          orderBy: { startTime: 'asc' },
          select: {
            id: true,
            startTime: true,
            duration: true,
            capacity: true,
            bookedCount: true,
          },
        },
      },
    });

    if (!event) {
      return NextResponse.json({ error: 'Event not found' }, { status: 404 });
    }

    return NextResponse.json(event);
  } catch (error) {
    console.error('Fetch Public Event Error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

export async function POST(
  req: Request,
  { params }: { params: { eventId: string } }
) {
  const { eventId } = params;

  try {
    const body = await req.json();
    const validated = signupSchema.parse(body);

    const result = await prisma.$transaction(async (tx) => {
      // 1. Check availability of base slot
      const baseSlot = await tx.eventSlot.findUnique({
        where: { id: validated.timeslotId },
      });

      if (!baseSlot || !baseSlot.isActive || baseSlot.eventId !== eventId) {
        throw new Error('Timeslot not found');
      }

      if (baseSlot.bookedCount >= baseSlot.capacity) {
        throw new Error('Timeslot is full');
      }

      const slotsToBlock = [baseSlot.id];

      // 2. Increment booked count for all affected slots
      await tx.eventSlot.updateMany({
        where: { id: { in: slotsToBlock } },
        data: { bookedCount: { increment: 1 } },
      });

      // 3. Create the signup
      const signup = await tx.eventSignup.create({
        data: {
          slotId: validated.timeslotId,
          duration: validated.duration,
          prospectName: validated.prospectName,
          prospectEmail: validated.prospectEmail,
          prospectPhone: validated.prospectPhone,
          studentGrade: validated.studentGrade,
          status: 'Confirmed',
        },
      });

      return signup;
    });

    return NextResponse.json(result, { status: 201 });
  } catch (error: any) {
    console.error('Public Event Signup Error:', error);
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: error.issues }, { status: 400 });
    }
    return NextResponse.json({ error: error.message || 'Internal Server Error' }, { status: 500 });
  }
}
