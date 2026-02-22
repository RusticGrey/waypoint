import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import CoordinatorMeetingsClient from './MeetingsClient';

export default async function CoordinatorMeetingsPage() {
  const session = await getServerSession(authOptions);
  if (!session) return null;

  // We fetch basic initial data, the rest can be client-side
  const requests = await prisma.meetingRequest.findMany({
    where: { hostId: session.user.id, status: 'Pending' },
    include: {
      student: {
        include: {
          user: true,
          personalProfile: true,
        },
      },
    },
    orderBy: { createdAt: 'desc' },
  });

  const upcomingMeetings = await prisma.scheduledMeeting.findMany({
    where: { hostId: session.user.id, status: 'Upcoming' },
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
    take: 10,
  });

  return (
    <CoordinatorMeetingsClient 
      initialRequests={JSON.parse(JSON.stringify(requests || []))} 
      initialMeetings={JSON.parse(JSON.stringify(upcomingMeetings || []))} 
      userId={session.user.id} 
    />
  );
}
