import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import { notFound } from 'next/navigation';
import { IntelligencePanel } from '@/components/meetings/IntelligencePanel';
import { ActionItemList } from '@/components/meetings/ActionItemList';
import { RecordingStatusBadge } from '@/components/meetings/RecordingStatusBadge';
import { ProgressReportViewer } from '@/components/meetings/ProgressReportViewer';

export default async function StudentMeetingDetailPage({ params }: { params: { meetingId: string } }) {
  const session = await getServerSession(authOptions);
  if (!session) return null;

  const meeting = await prisma.scheduledMeeting.findUnique({
    where: { id: params.meetingId },
    include: {
      student: {
        include: {
          user: true,
        },
      },
      host: true,
      intelligence: true,
    },
  });

  if (!meeting) return notFound();
  if (meeting.studentId !== session.user.id && session.user.role !== 'counselor') return notFound();

  return (
    <div className="p-8 space-y-8 max-w-7xl mx-auto">
      <div className="flex justify-between items-start bg-white p-6 rounded-xl border shadow-sm">
        <div>
          <div className="flex items-center gap-3 mb-2">
            <h1 className="text-2xl font-bold text-gray-900">{meeting.meetingType}</h1>
            <RecordingStatusBadge 
              status={meeting.intelligence?.generationStatus} 
              platform={meeting.conferencePlatform as any}
              hasTranscript={!!meeting.intelligence?.detailedNotes}
            />
          </div>
          <p className="text-gray-600">
            Counselor: <span className="font-semibold text-gray-900">{meeting.host.firstName} {meeting.host.lastName}</span>
          </p>
          <p className="text-sm text-gray-500 mt-1">
            {new Date(meeting.startTime).toLocaleString()}
          </p>
        </div>
        <div className="text-right">
          <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase ${
            meeting.status === 'Completed' ? 'bg-green-100 text-green-700' : 'bg-blue-100 text-blue-700'
          }`}>
            {meeting.status}
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          <IntelligencePanel 
            meetingId={meeting.id} 
            hostId={meeting.hostId} 
            conferencePlatform={meeting.conferencePlatform as any}
          />
          <section>
            <h2 className="text-xl font-bold mb-4">Your Progress Report</h2>
            <ProgressReportViewer studentId={meeting.studentId} isHost={false} />
          </section>
        </div>
        <div>
          <ActionItemList 
            meetingId={meeting.id} 
            studentId={meeting.studentId} 
            isHost={false}
          />
        </div>
      </div>
    </div>
  );
}
