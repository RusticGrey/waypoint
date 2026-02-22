import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import CounselorMeetingsClient from './MeetingsClient';

export default async function CounselorMeetingsPage() {
  const session = await getServerSession(authOptions);
  if (!session) return null;

  // Global view for counselor
  const requests = await prisma.meetingRequest.findMany({
    where: { status: 'Pending' },
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

  const upcomingMeetings = await prisma.scheduledMeeting.findMany({
    where: { status: 'Upcoming' },
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
    take: 20,
  });

  return (
    <CounselorMeetingsClient 
      initialRequests={JSON.parse(JSON.stringify(requests))} 
      initialMeetings={JSON.parse(JSON.stringify(upcomingMeetings))} 
      userId={session.user.id} 
    />
  );
}
