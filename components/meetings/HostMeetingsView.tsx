'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { MeetingGate } from '@/components/meetings/MeetingGate';
import { MeetingRequestQueue } from '@/components/meetings/MeetingRequestQueue';
import { ScheduledMeetingCard } from '@/components/meetings/ScheduledMeetingCard';
import { CalendarView } from '@/components/meetings/CalendarView';

interface HostMeetingsViewProps {
  initialRequests: any[];
  initialMeetings: any[];
  userId: string;
  role: 'coordinator' | 'counselor';
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
  
  // Use URL search param for view mode, default to 'calendar'
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
        fetch('/api/meetings/requests?status=Pending'),
        fetch('/api/meetings/scheduled')
      ]);
      const reqData = await reqRes.json();
      const meetData = await meetRes.json();
      
      // Counselors see everything globally, Coordinators only see their own
      if (role === 'counselor') {
        setRequests(reqData);
        setMeetings(meetData);
      } else {
        setRequests(reqData.filter((r: any) => String(r.hostId) === String(userId)));
        setMeetings(meetData.filter((m: any) => String(m.hostId) === String(userId)));
      }
      setRefreshKey(prev => prev + 1);
    } catch (error) {
      console.error('Refresh error:', error);
    }
  };

  useEffect(() => {
    const interval = setInterval(refreshData, 30000); // Poll every 30 seconds
    return () => clearInterval(interval);
  }, [userId, role]);

  return (
    <MeetingGate role={role}>
      <div className="p-8 space-y-8 max-w-7xl mx-auto">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold text-black">
            {role === 'counselor' ? 'Global Meetings Admin' : 'Meetings Management'}
          </h1>
          <div className="flex gap-4 items-center">
            <Link href={`/${role}/profile`}>
              <Button variant="outline" className="text-black border-gray-300">Set Availability</Button>
            </Link>
            <div className="flex bg-gray-100 p-1 rounded-lg">
            <button
              onClick={() => setViewMode('calendar')}
              className={`px-4 py-2 text-sm font-medium rounded-md transition-colors ${
                currentView === 'calendar' ? 'bg-white shadow-sm text-gray-900' : 'text-gray-500 hover:text-gray-900'
              }`}
            >
              Calendar View
            </button>
            <button
              onClick={() => setViewMode('list')}
              className={`px-4 py-2 text-sm font-medium rounded-md transition-colors ${
                currentView === 'list' ? 'bg-white shadow-sm text-gray-900' : 'text-gray-500 hover:text-gray-900'
              }`}
            >
              List View
            </button>
          </div>
          </div>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8">
            {currentView === 'calendar' ? (
              <section>
                <h2 className="text-xl font-semibold mb-4 text-black">Schedule & Availability</h2>
                <CalendarView hostId={userId} isHostView={true} refreshKey={refreshKey} />
              </section>
            ) : (
              <div className="space-y-8">
                <section>
                  <h2 className="text-xl font-semibold mb-4 text-black">Upcoming Meetings</h2>
                  <div className="space-y-4">
                    {meetings.filter((m: any) => new Date(m.startTime) > new Date() && m.status !== 'Cancelled').map((meeting: any) => (
                      <ScheduledMeetingCard key={meeting.id} meeting={meeting} />
                    ))}
                    {meetings.filter((m: any) => new Date(m.startTime) > new Date() && m.status !== 'Cancelled').length === 0 && (
                      <p className="text-gray-500 italic py-4 bg-white rounded-lg border border-dashed text-center">No upcoming meetings scheduled.</p>
                    )}
                  </div>
                </section>

                <section>
                  <h2 className="text-xl font-semibold mb-4 text-gray-700">Past & Cancelled Meetings</h2>
                  <div className="space-y-4">
                    {meetings.filter((m: any) => new Date(m.startTime) <= new Date() || m.status === 'Cancelled').map((meeting: any) => (
                      <ScheduledMeetingCard key={meeting.id} meeting={meeting} />
                    ))}
                  </div>
                </section>
              </div>
            )}
            
          </div>

          <div className="space-y-8">
            <section>
              <MeetingRequestQueue requests={requests} onUpdate={refreshData} />
            </section>
          </div>
        </div>
      </div>
    </MeetingGate>
  );
}
