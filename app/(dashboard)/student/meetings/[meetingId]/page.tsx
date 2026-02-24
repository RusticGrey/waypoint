import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import { notFound } from 'next/navigation';
import { MeetingBackButton } from '@/components/meetings/MeetingBackButton';
import { Button } from '@/components/ui/button';
import { MeetingManagementClient } from './MeetingManagementClient';

export default async function StudentMeetingDetailPage({ params }: { params: { meetingId: string } }) {
  const session = await getServerSession(authOptions);
  if (!session) return null;

  const meeting = await prisma.meeting.findUnique({
    where: { id: params.meetingId },
    include: {
      student: {
        include: {
          user: true,
        },
      },
      host: {
        include: {
          user: true,
        },
      },
    },
  });

  if (!meeting) return notFound();
  if (meeting.studentId !== session.user.id && session.user.role !== 'counselor') return notFound();

  return (
    <div className="p-8 space-y-8 max-w-5xl mx-auto">
      <div className="flex justify-start">
        <MeetingBackButton label="Back to Meetings" variant="outline" />
      </div>

      <div className="bg-white p-8 rounded-xl border border-gray-200 shadow-sm space-y-8">
        <div className="space-y-4 border-b pb-8">
          <h1 className="text-4xl font-bold text-gray-900">{meeting.meetingType} Session</h1>
          <p className="text-lg text-gray-600">
            With <span className="font-semibold text-gray-900">{meeting.host.user.firstName} {meeting.host.user.lastName}</span>
          </p>
          
          <div className="flex flex-wrap items-center gap-3 mt-4">
            <div className="flex items-center gap-2 text-sm text-gray-700 bg-gradient-to-br from-blue-50 to-white px-4 py-2 rounded-lg border border-blue-200">
              <span className="text-lg">📅</span>
              <span>{new Date(meeting.startTime).toLocaleDateString(undefined, { dateStyle: 'long' })}</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-gray-700 bg-gradient-to-br from-amber-50 to-white px-4 py-2 rounded-lg border border-amber-200">
              <span className="text-lg">⏰</span>
              <span>{new Date(meeting.startTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })} - {new Date(meeting.endTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
            </div>
            <span className={`ml-auto px-4 py-2 rounded-full text-sm font-bold uppercase tracking-wide ${
              meeting.status === 'Completed' ? 'bg-green-100 text-green-700' : 'bg-blue-100 text-blue-700'
            }`}>
              {meeting.status === 'Upcoming' ? '✅ Confirmed' : meeting.status}
            </span>
          </div>
        </div>

        <div className="space-y-4">
           <h2 className="text-lg font-bold text-black">Meeting Details</h2>
           <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-3">
                {meeting.conferenceJoinUrl && meeting.status === 'Upcoming' && (
                  <div>
                    <p className="text-xs font-bold text-gray-500 uppercase">Meeting Link</p>
                    <a href={meeting.conferenceJoinUrl} target="_blank" rel="noopener noreferrer" className="text-sm text-blue-600 hover:underline break-all">
                      {meeting.conferenceJoinUrl}
                    </a>
                  </div>
                )}
                <div>
                   <p className="text-xs font-bold text-gray-500 uppercase">Agenda / Topic</p>
                   <p className="text-sm text-gray-700 mt-1">{meeting.agenda || 'No agenda provided.'}</p>
                </div>
              </div>
           </div>
        </div>

        <MeetingManagementClient meeting={JSON.parse(JSON.stringify(meeting))} />

        <div className="pt-8 border-t">
           <div className="bg-blue-50 border border-blue-100 p-4 rounded-lg">
              <p className="text-sm text-blue-800">
                💡 Intelligence and automated notes for this session will be available in Phase 2.
              </p>
           </div>
        </div>
      </div>
    </div>
  );
}
