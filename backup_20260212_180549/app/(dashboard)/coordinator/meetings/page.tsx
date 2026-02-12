import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import { redirect } from 'next/navigation';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import Link from 'next/link';

export default async function MeetingsPage() {
  const session = await getServerSession(authOptions);

  if (!session?.user?.id) {
    redirect('/login');
  }

  if (session.user.role !== 'coordinator') {
    redirect('/student');
  }

  const meetings = await prisma.meeting.findMany({
    where: {
      coordinator_id: session.user.id,
    },
    include: {
      Student: {  // lowercase 'student'
        include: {
          User: true,  // lowercase 'user'
        },
      },
    },
    orderBy: {
      meeting_date: 'desc',
    },
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="mb-6 flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Meetings</h1>
          <p className="text-gray-600 mt-1">View all student meetings</p>
        </div>
        <Link
          href="/coordinator/meetings/new"
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
        >
          + Log New Meeting
        </Link>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Meeting History ({meetings.length})</CardTitle>
        </CardHeader>
        <CardContent>
          {meetings.length > 0 ? (
            <div className="space-y-4">
              {meetings.map((meeting) => (
                <div key={meeting.id} className="p-4 border rounded-lg">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-semibold text-gray-900">
                        {meeting.student.User.first_name} {meeting.student.User.last_name}
                      </h3>
                      <p className="text-sm text-gray-600">
                        {new Date(meeting.meeting_date).toLocaleDateString()} -{' '}
                        {meeting.meeting_type.replace(/_/g, ' ')}
                      </p>
                    </div>
                    <span className="text-xs text-gray-500">
                      {meeting.duration_minutes} minutes
                    </span>
                  </div>
                  {meeting.notes && (
                    <p className="mt-2 text-sm text-gray-700">{meeting.notes}</p>
                  )}
                  {meeting.action_items && (
                    <div className="mt-2">
                      <p className="text-xs font-medium text-gray-600">Action Items:</p>
                      <p className="text-sm text-gray-700">{meeting.action_items}</p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-500 text-center py-8">No meetings logged yet</p>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
