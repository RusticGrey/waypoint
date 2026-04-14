import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/prisma';

export async function GET(
  req: Request,
  { params }: { params: { eventId: string } }
) {
  const session = await getServerSession(authOptions);

  if (!session?.user?.id || session.user.role !== 'counselor') {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const { eventId } = params;

    const event = await prisma.publicEvent.findUnique({
      where: { id: eventId },
      include: {
        slots: {
          orderBy: { startTime: 'asc' },
          include: {
            signups: {
              orderBy: { createdAt: 'desc' },
              include: {
                completedByCounselor: {
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
    });

    if (!event) {
      return NextResponse.json({ error: 'Event not found' }, { status: 404 });
    }

    return NextResponse.json(event);
  } catch (error) {
    console.error('Fetch Public Event Detail Error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

export async function PATCH(
  req: Request,
  { params }: { params: { eventId: string } }
) {
  const session = await getServerSession(authOptions);

  if (!session?.user?.id || session.user.role !== 'counselor') {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const { eventId } = params;
    const body = await req.json();

    const event = await prisma.publicEvent.findUnique({
      where: { id: eventId },
    });

    if (!event) {
      return NextResponse.json({ error: 'Event not found' }, { status: 404 });
    }

    let organizationId = session.user.organizationId;
    if (!organizationId) {
      const user = await prisma.user.findUnique({
        where: { id: session.user.id },
        select: { organizationId: true },
      });
      organizationId = user?.organizationId || '';
    }

    if (event.organizationId !== organizationId) {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
    }

    const updatedEvent = await prisma.publicEvent.update({
      where: { id: eventId },
      data: {
        title: body.title,
        description: body.description,
        location: body.location,
        headerText: body.headerText,
        subheaderText: body.subheaderText,
        isActive: body.isActive,
      },
    });

    return NextResponse.json(updatedEvent);
  } catch (error) {
    console.error('Update Public Event Error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
