import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { sendMeetingReminder } from '@/lib/meetings/notifications';

export async function GET(req: Request) {
  const authHeader = req.headers.get('Authorization');
  const cronSecret = process.env.CRON_SECRET;

  // Basic check for cron secret
  if (cronSecret && authHeader !== `Bearer ${cronSecret}`) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const now = new Date();
  const tomorrow = new Date(now.getTime() + 24 * 60 * 60 * 1000);

  try {
    const meetings = await prisma.scheduledMeeting.findMany({
      where: {
        status: 'Upcoming',
        startTime: {
          gte: now,
          lte: tomorrow,
        },
      },
      include: {
        student: { include: { user: true } },
        host: true,
      },
    });

    let sent = 0;
    let failed = 0;

    const results = await Promise.allSettled(
      meetings.map((meeting) => sendMeetingReminder(meeting))
    );

    results.forEach((res) => {
      if (res.status === 'fulfilled') sent++;
      else failed++;
    });

    return NextResponse.json({ sent, failed });
  } catch (error) {
    console.error('Meeting Reminder Cron Error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
