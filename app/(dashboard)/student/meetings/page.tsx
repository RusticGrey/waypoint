import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import StudentMeetingsClient from './MeetingsClient';

export default async function StudentMeetingsPage() {
  const session = await getServerSession(authOptions);
  if (!session) return null;

  return <StudentMeetingsClient studentId={session.user.id} />;
}
