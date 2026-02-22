'use client';

import { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
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
  const [viewMode, setViewMode] = useState<'calendar' | 'list'>('calendar');

  const refreshData = async () => {
    try {
      const [reqRes, meetRes] = await Promise.all([
        fetch('/api/meetings/requests?status=Pending'),
        fetch('/api/meetings/scheduled?status=Upcoming')
      ]);
      const reqData = await reqRes.json();
      const meetData = await meetRes.json();
      
      // Counselors see everything globally, Coordinators only see their own
      if (role === 'counselor') {
        setRequests(reqData);
        setMeetings(meetData);
      } else {
        setRequests(reqData.filter((r: any) => r.hostId === userId));
        setMeetings(meetData.filter((m: any) => m.hostId === userId));
      }
    } catch (error) {
      console.error('Refresh error:', error);
    }
  };

  return (
    <MeetingGate role={role}>
      <div className="p-8 space-y-8 max-w-7xl mx-auto">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold text-gray-900">
            {role === 'counselor' ? 'Global Meetings Admin' : 'Meetings Management'}
          </h1>
          <div className="flex bg-gray-100 p-1 rounded-lg">
            <button
              onClick={() => setViewMode('calendar')}
              className={`px-4 py-2 text-sm font-medium rounded-md transition-colors ${
                viewMode === 'calendar' ? 'bg-white shadow-sm text-gray-900' : 'text-gray-500 hover:text-gray-900'
              }`}
            >
              Calendar View
            </button>
            <button
              onClick={() => setViewMode('list')}
              className={`px-4 py-2 text-sm font-medium rounded-md transition-colors ${
                viewMode === 'list' ? 'bg-white shadow-sm text-gray-900' : 'text-gray-500 hover:text-gray-900'
              }`}
            >
              List View
            </button>
          </div>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8">
            {viewMode === 'calendar' ? (
              <section>
                <h2 className="text-xl font-semibold mb-4">Schedule & Availability</h2>
                <CalendarView hostId={userId} isHostView={true} />
              </section>
            ) : (
              <section>
                <h2 className="text-xl font-semibold mb-4">Upcoming Meetings List</h2>
                <div className="space-y-4">
                  {meetings.map((meeting: any) => (
                    <ScheduledMeetingCard key={meeting.id} meeting={meeting} />
                  ))}
                  {meetings.length === 0 && (
                    <div className="text-center py-12 bg-white rounded-xl border border-dashed border-gray-300">
                      <p className="text-gray-500">No upcoming meetings scheduled.</p>
                    </div>
                  )}
                </div>
              </section>
            )}
            
            {viewMode === 'calendar' && (
               <section>
                <h2 className="text-xl font-semibold mb-4">Upcoming Meetings</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {meetings.map((meeting: any) => (
                    <ScheduledMeetingCard key={meeting.id} meeting={meeting} />
                  ))}
                  {meetings.length === 0 && (
                    <p className="text-sm text-gray-500 italic">No upcoming meetings scheduled.</p>
                  )}
                </div>
              </section>
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
