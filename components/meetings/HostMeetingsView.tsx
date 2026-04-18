
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { MeetingGate } from '@/components/meetings/MeetingGate';
import { MeetingRequest } from '@/components/meetings/MeetingRequest';
import { MeetingCard } from '@/components/meetings/MeetingCard';
import { CalendarView } from '@/components/meetings/CalendarView';
import { filterMeetingsAndRequests } from '@/lib/meetings/meetingUtils';
import { ux } from '@/lib/ux';
import { cn } from '@/lib/utils';

interface HostMeetingsViewProps {
  initialRequests: any[];
  initialMeetings: any[];
  userId: string;
  role: 'counselor' | 'counselor';
}

export function HostMeetingsView({
  initialRequests,
  initialMeetings,
  userId,
  role
}: HostMeetingsViewProps) {
  const [requests, setRequests] = useState(initialRequests);
  const [meetings, setMeetings] = useState(initialMeetings);
  const router = useRouter();
  const searchParams = useSearchParams();
  
  const currentView = searchParams.get('view') === 'list' ? 'list' : 'calendar';
  const [refreshKey, setRefreshKey] = useState(0);

  const setViewMode = (mode: 'calendar' | 'list') => {
    const params = new URLSearchParams(searchParams.toString());
    params.set('view', mode);
    router.replace(`?${params.toString()}`);
  };

  const refreshData = async () => {
    try {
      const [reqRes, meetRes] = await Promise.all([
        fetch('/api/meetings/requests?status=Pending', { cache: 'no-store' }),
        fetch('/api/meetings/scheduled', { cache: 'no-store' })
      ]);
      
      if (!reqRes.ok || !meetRes.ok) {
        throw new Error('Failed to fetch data');
      }

      const reqData = await reqRes.json();
      const meetData = await meetRes.json();
      
      if (Array.isArray(reqData) && Array.isArray(meetData)) {
        setRequests(reqData);
        setMeetings(meetData);
        setRefreshKey(prev => prev + 1);
      }
    } catch (error) {
      console.error('Refresh error:', error);
    }
  };

  useEffect(() => {
    let interval: NodeJS.Timeout;

    const handleVisibilityChange = () => {
      if (document.hidden) {
        clearInterval(interval);
      } else {
        refreshData();
        interval = setInterval(refreshData, 60000);
      }
    };

    interval = setInterval(refreshData, 60000);
    document.addEventListener('visibilitychange', handleVisibilityChange);

    return () => {
      clearInterval(interval);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, [userId, role]);

  const filtered = filterMeetingsAndRequests(meetings, requests);
  const totalStats = {
    pending: filtered.pendingRequests.length,
    upcoming: filtered.upcomingMeetings.length,
    past: filtered.pastMeetings.length,
  };

  return (
    <MeetingGate role={role}>
      <div className={ux.layout.page}>
        <div className={cn(ux.layout.header, "flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4")}>
          <div>
            <h1 className={ux.text.heading}>Meetings Manager</h1>
            <p className={ux.text.body}>Oversee and coordinate all counseling sessions.</p>
          </div>
          <Link href="/settings">
            <Button variant="outline">
              ⚙️ Settings
            </Button>
          </Link>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <Card variant="pop">
            <CardContent className="pt-6">
              <p className={ux.text.accent}>Pending Requests</p>
              <p className="text-3xl font-black text-slate-900 mt-1">{totalStats.pending}</p>
            </CardContent>
          </Card>
          <Card variant="pop" className={ux.card.highlight}>
            <CardContent className="pt-6">
              <p className={ux.text.accent}>Upcoming Sessions</p>
              <p className="text-3xl font-black text-brand-600 mt-1">{totalStats.upcoming}</p>
            </CardContent>
          </Card>
          <Card variant="pop">
            <CardContent className="pt-6">
              <p className={ux.text.accent}>Completed</p>
              <p className="text-3xl font-black text-slate-900 mt-1">{totalStats.past}</p>
            </CardContent>
          </Card>
        </div>

        {/* View Toggle */}
        <div className="flex bg-surface-muted p-1.5 rounded-xl w-fit mb-8">
          <button
            onClick={() => setViewMode('calendar')}
            className={cn(
              "px-6 py-2 text-xs font-black uppercase tracking-widest rounded-lg transition-all",
              currentView === 'calendar' ? "bg-white shadow-sm text-brand-600" : "text-slate-400 hover:text-slate-600"
            )}
          >
            Calendar
          </button>
          <button
            onClick={() => setViewMode('list')}
            className={cn(
              "px-6 py-2 text-xs font-black uppercase tracking-widest rounded-lg transition-all",
              currentView === 'list' ? "bg-white shadow-sm text-brand-600" : "text-slate-400 hover:text-slate-600"
            )}
          >
            Timeline
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          <div className="lg:col-span-2 space-y-12">
            {currentView === 'calendar' ? (
              <section className="space-y-6">
                <h2 className={ux.text.accent}>Your Schedule</h2>
                <div className={ux.layout.section}>
                  <CalendarView hostId={userId} isHostView={true} refreshKey={refreshKey} />
                </div>
              </section>
            ) : (
              <div className="space-y-12">
                <section className="space-y-6">
                  <h2 className={ux.text.accent}>Upcoming & Ongoing</h2>
                  <div className="space-y-4">
                    {filtered.upcomingMeetings.length > 0 ? (
                      filtered.upcomingMeetings.map((meeting: any) => (
                        <MeetingCard key={meeting.id} meeting={meeting} />
                      ))
                    ) : (
                      <Card variant="base" className="bg-surface-soft border-dashed border-2 py-12 text-center">
                        <p className={ux.text.body}>No upcoming meetings scheduled.</p>
                      </Card>
                    )}
                  </div>
                </section>

                {filtered.pastMeetings.length > 0 && (
                  <section className="space-y-6">
                    <h2 className={ux.text.accent}>History</h2>
                    <div className="space-y-4">
                      {filtered.pastMeetings.map((meeting: any) => (
                        <MeetingCard key={meeting.id} meeting={meeting} />
                      ))}
                    </div>
                  </section>
                )}
              </div>
            )}
          </div>

          <aside className="space-y-6">
            <h2 className={ux.text.accent}>Action Needed</h2>
            <MeetingRequest requests={filtered.pendingRequests} onUpdate={refreshData} />
          </aside>
        </div>
      </div>
    </MeetingGate>
  );
}
