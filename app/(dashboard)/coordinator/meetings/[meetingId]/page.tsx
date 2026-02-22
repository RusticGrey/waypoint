import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import { notFound } from 'next/navigation';
import { MeetingGate } from '@/components/meetings/MeetingGate';
import { MeetingBackButton } from '@/components/meetings/MeetingBackButton';
import { HostMeetingManagement } from '@/components/meetings/HostMeetingManagement';

export default async function CoordinatorMeetingDetailPage({ params }: { params: { meetingId: string } }) {
  const session = await getServerSession(authOptions);
  if (!session) return null;

  const meeting = await prisma.scheduledMeeting.findUnique({
    where: { id: params.meetingId },
    include: {
      student: {
        include: {
          user: true,
          personalProfile: true,
        },
      },
      host: true,
    },
  });

  if (!meeting) return notFound();
  if (meeting.hostId !== session.user.id && session.user.role !== 'counselor') return notFound();

  return (
    <MeetingGate role="coordinator">
      <div className="p-8 space-y-8 max-w-4xl mx-auto">
        <div className="flex justify-start">
          <MeetingBackButton />
        </div>
        <div className="bg-white p-8 rounded-xl border border-gray-200 shadow-sm space-y-6">
          <HostMeetingManagement meeting={JSON.parse(JSON.stringify(meeting))} />
          <div className="flex justify-between items-start border-b pb-6">
            <div>
              <h1 className="text-3xl font-bold text-black">{meeting.meetingType} Session</h1>
              <p className="text-gray-600 mt-2">
                With <span className="font-semibold text-black">{meeting.student.user.firstName} {meeting.student.user.lastName}</span>
              </p>
              <div className="flex items-center gap-4 mt-4">
                <div className="flex items-center gap-2 text-sm text-gray-700 bg-gray-50 px-3 py-1.5 rounded-md border border-gray-200">
                  <span className="text-lg">📅</span>
                  {new Date(meeting.startTime).toLocaleDateString(undefined, { dateStyle: 'long' })}
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-700 bg-gray-50 px-3 py-1.5 rounded-md border border-gray-200">
                  <span className="text-lg">⏰</span>
                  {new Date(meeting.startTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })} - {new Date(meeting.endTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </div>
              </div>
            </div>
            <div className="text-right space-y-3">
              <span className={`inline-block px-3 py-1 rounded-full text-xs font-bold uppercase ${
                meeting.status === 'Completed' ? 'bg-green-100 text-green-700' : 'bg-blue-100 text-blue-700'
              }`}>
                {meeting.status}
              </span>
              <div className="text-xs font-bold text-gray-400 uppercase tracking-widest">
                Platform: {meeting.conferencePlatform || 'N/A'}
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-4">
            <div className="space-y-4">
              <h2 className="text-lg font-bold text-black border-l-4 border-blue-500 pl-3">Meeting Details</h2>
              <div className="space-y-3">
                {meeting.conferenceJoinUrl && (
                   <div>
                     <p className="text-xs font-bold text-gray-500 uppercase">Meeting Link</p>
                     <a href={meeting.conferenceJoinUrl} target="_blank" rel="noopener noreferrer" className="text-sm text-blue-600 hover:underline break-all">
                       {meeting.conferenceJoinUrl}
                     </a>
                   </div>
                )}
                <div>
                   <p className="text-xs font-bold text-gray-500 uppercase">Agenda / Notes</p>
                   <p className="text-sm text-gray-700 mt-1">{meeting.agenda || 'No agenda provided.'}</p>
                </div>
              </div>
            </div>
            
            <div className="space-y-4">
              <h2 className="text-lg font-bold text-black border-l-4 border-gray-300 pl-3">Participant Info</h2>
              <div className="space-y-2">
                 <p className="text-sm text-gray-700"><span className="font-medium">Student:</span> {meeting.student.user.firstName} {meeting.student.user.lastName}</p>
                 <p className="text-sm text-gray-700"><span className="font-medium">Host:</span> {meeting.host.firstName} {meeting.host.lastName}</p>
              </div>
            </div>
          </div>

          <div className="pt-8 border-t">
             <div className="bg-blue-50 border border-blue-100 p-4 rounded-lg">
                <p className="text-sm text-blue-800 flex items-center gap-2">
                   <span className="text-lg">💡</span> 
                   Intelligence and automated notes will be available in Phase 2.
                </p>
             </div>
          </div>
        </div>
      </div>
    </MeetingGate>
  );
}
