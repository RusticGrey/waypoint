import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/prisma';

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
  }

  if (statusFilter) {
    where.status = statusFilter;
  }

  try {
    const meetings = await prisma.scheduledMeeting.findMany({
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
      orderBy: { startTime: 'asc' },
    });

    return NextResponse.json(meetings);
  } catch (error) {
    console.error('Fetch Scheduled Meetings Error:', error);
    return NextResponse.json({ error: 'Failed to fetch meetings' }, { status: 500 });
  }
}
