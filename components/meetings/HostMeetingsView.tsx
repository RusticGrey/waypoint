'use client';

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
        fetch('/api/meetings/requests?status=Pending'),
        fetch('/api/meetings/scheduled')
      ]);
      const reqData = await reqRes.json();
      const meetData = await meetRes.json();
      
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
    const interval = setInterval(refreshData, 30000);
    return () => clearInterval(interval);
  }, [userId, role]);

  const filtered = filterMeetingsAndRequests(meetings, requests);
  const totalStats = {
    pending: filtered.pendingRequests.length,
    upcoming: filtered.upcomingMeetings.length,
    past: filtered.pastMeetings.length,
  };

  return (
    <MeetingGate role={role}>
      <div className="p-8 space-y-8 max-w-7xl mx-auto">
        <div className="space-y-4">
          <div className="flex justify-between items-start gap-4">
            <div className="space-y-2">
              <h1 className="text-4xl font-bold text-gray-900">
                {role === 'counselor' ? 'Meetings Admin' : 'Manage Meetings'}
              </h1>
              <p className="text-gray-600">Oversee and coordinate all meeting activities</p>
            </div>
            <Link href={`/${role}/profile`}>
              <Button variant="outline" className="text-gray-900 border-gray-300 hover:bg-gray-50">
                ⚙️ Set Availability
              </Button>
            </Link>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-3 gap-4">
            <Card className="bg-gradient-to-br from-yellow-50 to-yellow-100 border-yellow-200">
              <CardContent className="p-4">
                <p className="text-xs text-yellow-700 font-semibold uppercase">Pending Requests</p>
                <p className="text-3xl font-bold text-yellow-900 mt-1">{totalStats.pending}</p>
              </CardContent>
            </Card>
            <Card className="bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200">
              <CardContent className="p-4">
                <p className="text-xs text-blue-700 font-semibold uppercase">Upcoming Meetings</p>
                <p className="text-3xl font-bold text-blue-900 mt-1">{totalStats.upcoming}</p>
              </CardContent>
            </Card>
            <Card className="bg-gradient-to-br from-gray-50 to-gray-100 border-gray-200">
              <CardContent className="p-4">
                <p className="text-xs text-gray-700 font-semibold uppercase">Past Meetings</p>
                <p className="text-3xl font-bold text-gray-900 mt-1">{totalStats.past}</p>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* View Toggle */}
        <div className="flex bg-gray-100 p-1 rounded-lg w-fit">
          <button
            onClick={() => setViewMode('calendar')}
            className={`px-4 py-2 text-sm font-medium rounded-md transition-colors ${
              currentView === 'calendar' ? 'bg-white shadow-sm text-gray-900' : 'text-gray-500 hover:text-gray-900'
            }`}
          >
            📅 Calendar View
          </button>
          <button
            onClick={() => setViewMode('list')}
            className={`px-4 py-2 text-sm font-medium rounded-md transition-colors ${
              currentView === 'list' ? 'bg-white shadow-sm text-gray-900' : 'text-gray-500 hover:text-gray-900'
            }`}
          >
            📋 List View
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8">
            {currentView === 'calendar' ? (
              <section className="space-y-4">
                <h2 className="text-2xl font-semibold text-gray-900">Your Schedule</h2>
                <CalendarView hostId={userId} isHostView={true} refreshKey={refreshKey} />
              </section>
            ) : (
              <div className="space-y-8">
                {/* Upcoming Meetings */}
                <section className="space-y-4">
                  <h2 className="text-2xl font-semibold text-gray-900">📅 Upcoming Meetings</h2>
                  <div className="space-y-4">
                    {filtered.upcomingMeetings.length > 0 ? (
                      filtered.upcomingMeetings.map((meeting: any) => (
                        <MeetingCard key={meeting.id} meeting={meeting} />
                      ))
                    ) : (
                      <Card className="bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200">
                        <CardContent className="p-6 text-center">
                          <p className="text-blue-700 font-medium">No upcoming meetings scheduled.</p>
                          <p className="text-sm text-blue-600 mt-1">You're all caught up!</p>
                        </CardContent>
                      </Card>
                    )}
                  </div>
                </section>

                {/* Past & Cancelled */}
                {filtered.pastMeetings.length > 0 && (
                  <section className="space-y-4">
                    <h2 className="text-2xl font-semibold text-gray-900">📚 Past & Cancelled</h2>
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

          {/* Requests Sidebar */}
          <div className="space-y-6">
            <div className="space-y-3">
              <h2 className="text-2xl font-semibold text-gray-900">🤝 Pending Requests</h2>
              <p className="text-sm text-gray-600">Accept or decline meeting requests</p>
            </div>
            <MeetingRequest requests={filtered.pendingRequests} onUpdate={refreshData} />
          </div>
        </div>
      </div>
    </MeetingGate>
  );
}
