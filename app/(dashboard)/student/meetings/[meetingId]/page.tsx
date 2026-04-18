import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import { notFound } from 'next/navigation';
import { MeetingBackButton } from '@/components/meetings/MeetingBackButton';
import StudentMeetingDetailClient from './StudentMeetingDetailClient';
import { ux } from '@/lib/ux';
import { cn } from '@/lib/utils';
import { Badge } from '@/components/ui/badge';

export default async function StudentMeetingDetailPage({ params }: { params: { meetingId: string } }) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) return null;

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
      note: true,
    },
  });

  if (!meeting) return notFound();
  if (meeting.studentId !== session.user.id && session.user.role !== 'counselor') return notFound();

  const userTimezone = (meeting.student.user as any).timezone || 'UTC';

  return (
    <div className={ux.layout.page}>
      <div className="mb-6">
        <MeetingBackButton label="Back to Meetings" variant="outline" />
      </div>

      <div className={ux.layout.section}>
        <div className="space-y-4 border-b border-slate-100 pb-8 mb-8">
          <div className="flex justify-between items-start gap-4">
            <div>
              <h1 className={ux.text.heading}>{meeting.meetingType} Session</h1>
              <p className={cn(ux.text.body, "text-lg mt-1")}>
                With <span className="font-bold text-slate-900">{meeting.host.user.firstName} {meeting.host.user.lastName}</span>
              </p>
            </div>
            {(() => {
                const now = new Date();
                const start = new Date(meeting.startTime);
                const end = new Date(meeting.endTime);
                const isCancelled = meeting.status === 'Cancelled';
                const isCompleted = meeting.status === 'Completed';
                const isOngoing = start <= now && end >= now && !isCancelled && !isCompleted;
                const isPast = end < now;
                
                if (isCancelled) return <Badge variant="error">Cancelled</Badge>;
                if (isCompleted) return <Badge variant="success">Completed</Badge>;
                if (isOngoing) return <Badge variant="warning">Ongoing</Badge>;
                if (isPast) return <Badge variant="neutral">Past</Badge>;
                return <Badge variant="brand">Confirmed</Badge>;
              })()}
          </div>
          
          <div className="flex flex-wrap items-center gap-4 mt-6">
            <div className="bg-brand-50 border border-brand-100 px-5 py-3 rounded-2xl flex items-center gap-3">
              <span className="text-2xl">📅</span>
              <div className="flex flex-col">
                <span className="text-[10px] font-black text-brand-600 uppercase tracking-widest leading-none mb-1">Date</span>
                <span className="text-sm font-bold text-brand-900">
                  {new Date(meeting.startTime).toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric', timeZone: userTimezone })}
                </span>
              </div>
            </div>

            <div className="bg-amber-50 border border-amber-100 px-5 py-3 rounded-2xl flex items-center gap-3">
              <span className="text-2xl">⏰</span>
              <div className="flex flex-col">
                <span className="text-[10px] font-black text-amber-600 uppercase tracking-widest leading-none mb-1">Time ({userTimezone})</span>
                <span className="text-sm font-bold text-amber-900">
                  {new Date(meeting.startTime).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', timeZone: userTimezone })} - {new Date(meeting.endTime).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', timeZone: userTimezone })}
                </span>
              </div>
            </div>
          </div>
        </div>

        <StudentMeetingDetailClient initialMeeting={JSON.parse(JSON.stringify(meeting))} />

        <div className="mt-12 pt-8 border-t border-slate-100 space-y-6">
           <h2 className={ux.text.accent}>Technical Details</h2>
           <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-4">
                {meeting.conferenceJoinUrl && (meeting.status === 'Upcoming' || (new Date(meeting.startTime) <= new Date() && new Date(meeting.endTime) >= new Date())) && (
                  <div>
                    <label className={ux.form.label}>Conference Link</label>
                    <a href={meeting.conferenceJoinUrl} target="_blank" rel="noopener noreferrer" className="text-sm font-bold text-brand-600 hover:text-brand-800 break-all underline decoration-brand-200 underline-offset-4">
                      {meeting.conferenceJoinUrl}
                    </a>
                  </div>
                )}
                <div>
                   <label className={ux.form.label}>Agenda / Topic</label>
                   <p className="text-sm text-slate-700 leading-relaxed font-medium bg-surface-soft p-4 rounded-xl border border-slate-100">
                     {meeting.agenda || 'No specific agenda provided for this session.'}
                   </p>
                </div>
              </div>
           </div>
        </div>
      </div>
    </div>
  );
}
