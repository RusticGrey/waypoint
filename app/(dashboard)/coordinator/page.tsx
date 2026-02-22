import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import { Card, CardContent } from '@/components/ui/card';
import Link from 'next/link';

export default async function CoordinatorDashboard() {
  const session = await getServerSession(authOptions);
  if (!session) return null;

  const showMeetings = process.env.NEXT_PUBLIC_ENABLE_MEETINGS === 'true';
  let requestCount = 0;
  let upcomingMeetings: any[] = [];

  if (showMeetings) {
    [requestCount, upcomingMeetings] = await Promise.all([
      prisma.meetingRequest.count({
        where: { hostId: session.user.id, status: 'Pending' }
      }),
    prisma.scheduledMeeting.findMany({
      where: { 
        hostId: session.user.id, 
        status: 'Upcoming',
        startTime: { gte: new Date() }
      },
      include: { student: { include: { user: true } } },
      orderBy: { startTime: 'asc' },
      take: 3
    })
    ]);
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      <h1 className="text-3xl font-bold text-gray-900">Coordinator Dashboard</h1>

      {showMeetings && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card className="hover:shadow-md transition-shadow">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600 uppercase tracking-wider">Pending Requests</p>
                  <p className="text-3xl font-bold text-blue-600 mt-1">{requestCount}</p>
                </div>
                <div className="p-3 bg-blue-100 rounded-full text-blue-600">
                  📩
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="hover:shadow-md transition-shadow">
            <CardContent className="pt-6">
              <div className="space-y-4">
                <p className="text-sm font-medium text-gray-600 uppercase tracking-wider">Next Meetings</p>
                {upcomingMeetings.length === 0 ? (
                  <p className="text-sm text-gray-500 italic">No upcoming meetings</p>
                ) : (
                  <div className="space-y-3">
                    {upcomingMeetings.map((meeting) => (
                      <div key={meeting.id} className="text-sm border-b pb-2 last:border-0 last:pb-0">
                        <span className="font-semibold text-gray-900">{meeting.student.user.firstName} {meeting.student.user.lastName}</span>
                        <span className="text-gray-500 block text-xs mt-0.5">
                          {new Date(meeting.startTime).toLocaleString([], { dateStyle: 'medium', timeStyle: 'short' })}
                        </span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      <section>
        <h2 className="text-xl font-bold mb-4 text-gray-900">Quick Links</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {showMeetings && (
            <Link href="/coordinator/meetings" className="group p-4 bg-white rounded-lg border border-gray-200 hover:border-blue-500 hover:shadow-md transition-all flex items-center gap-3">
              <span className="text-2xl group-hover:scale-110 transition-transform">🗓️</span>
              <span className="font-medium text-gray-700 group-hover:text-blue-700">Manage Meetings</span>
            </Link>
          )}
          <Link href="/coordinator/students" className="group p-4 bg-white rounded-lg border border-gray-200 hover:border-blue-500 hover:shadow-md transition-all flex items-center gap-3">
            <span className="text-2xl group-hover:scale-110 transition-transform">👥</span>
            <span className="font-medium text-gray-700 group-hover:text-blue-700">My Students</span>
          </Link>
          <Link href="/coordinator/profile" className="group p-4 bg-white rounded-lg border border-gray-200 hover:border-blue-500 hover:shadow-md transition-all flex items-center gap-3">
            <span className="text-2xl group-hover:scale-110 transition-transform">⚙️</span>
            <span className="font-medium text-gray-700 group-hover:text-blue-700">Setup & Profile</span>
          </Link>
        </div>
      </section>
    </div>
  );
}
