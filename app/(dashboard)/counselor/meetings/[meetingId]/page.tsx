import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import { notFound } from 'next/navigation';
import { MeetingBackButton } from '@/components/meetings/MeetingBackButton';
import { HostMeetingManagement } from '@/components/meetings/HostMeetingManagement';
import CounselorMeetingDetailClient from './CounselorMeetingDetailClient';
import { Card, CardContent } from '@/components/ui/card';
import { ux } from '@/lib/ux';
import { cn } from '@/lib/utils';
import { Badge } from '@/components/ui/badge';

export default async function CounselorMeetingDetailPage({ params }: { params: { meetingId: string } }) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) return null;

  const meeting = await prisma.meeting.findUnique({
    where: { id: params.meetingId },
    include: {
      student: {
        include: {
          user: true,
          personalProfile: true,
        },
      },
      host: {
        include: {
          user: true,
        },
      },
      note: true,
    },
  }) as any;

  if (!meeting) return notFound();

  const userTimezone = (meeting.host.user as any).timezone || 'UTC';

  return (
    <div className={ux.layout.page}>
      <div className="mb-6">
        <MeetingBackButton />
      </div>
      
      <div className={ux.layout.section}>
        <HostMeetingManagement meeting={JSON.parse(JSON.stringify(meeting))} />
        
        <div className="flex flex-col md:flex-row justify-between items-start border-b border-slate-100 pb-8 mb-8 mt-8">
          <div>
            <h1 className={ux.text.heading}>{meeting.meetingType} Session</h1>
            <p className={cn(ux.text.body, "text-lg mt-1")}>
              With <span className="font-bold text-slate-900">{meeting.student.user.firstName} {meeting.student.user.lastName}</span>
            </p>
            
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

          <div className="flex flex-col items-end gap-4 mt-4 md:mt-0">
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

            <div className="flex items-center gap-2 px-3 py-1.5 bg-surface-muted rounded-lg border border-slate-200">
              <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Platform:</span>
              <span className="text-xs font-bold text-slate-700">{meeting.conferencePlatform || 'N/A'}</span>
            </div>
          </div>
        </div>

        <CounselorMeetingDetailClient initialMeeting={JSON.parse(JSON.stringify(meeting))} />

        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-12 pt-8 border-t border-slate-100">
          <section className="space-y-6">
            <h2 className={ux.text.accent}>Meeting Details</h2>
            <div className="space-y-4">
              {meeting.conferenceJoinUrl && (
                 <div>
                   <label className={ux.form.label}>Host URL / Link</label>
                   <a href={meeting.conferenceHostUrl || meeting.conferenceJoinUrl} target="_blank" rel="noopener noreferrer" className="text-sm font-bold text-brand-600 hover:text-brand-800 break-all underline decoration-brand-200 underline-offset-4">
                     {meeting.conferenceHostUrl || meeting.conferenceJoinUrl}
                   </a>
                 </div>
              )}
              <div>
                 <label className={ux.form.label}>Agenda / Topic</label>
                 <p className="text-sm text-slate-700 leading-relaxed font-medium bg-surface-soft p-4 rounded-xl border border-slate-100">
                   {meeting.agenda || 'No agenda provided.'}
                 </p>
              </div>
            </div>
          </section>
          
          <section className="space-y-6">
            <h2 className={ux.text.accent}>Participant Contact</h2>
            <Card variant="base" className="bg-surface-soft/30 border-slate-100">
              <CardContent className="space-y-4 pt-6">
                 <div className="flex justify-between items-center">
                    <span className="text-xs font-bold text-slate-500 uppercase">Student</span>
                    <span className="text-sm font-bold text-slate-900">{meeting.student.user.firstName} {meeting.student.user.lastName}</span>
                 </div>
                 <div className="flex justify-between items-center">
                    <span className="text-xs font-bold text-slate-500 uppercase">Email</span>
                    <span className="text-sm font-medium text-brand-600">{meeting.student.user.email}</span>
                 </div>
                 <div className="pt-4 border-t border-slate-100 flex justify-between items-center">
                    <span className="text-xs font-bold text-slate-500 uppercase">Organization Host</span>
                    <span className="text-sm font-bold text-slate-900">{meeting.host.user.firstName} {meeting.host.user.lastName}</span>
                 </div>
              </CardContent>
            </Card>
          </section>
        </div>

      </div>
    </div>
  );
}
