'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

interface StudentMeetingListProps {
  studentId: string;
}

export function StudentMeetingList({ studentId }: StudentMeetingListProps) {
  const [meetings, setMeetings] = useState<any[]>([]);
  const [requests, setRequests] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    try {
      const [meetRes, reqRes] = await Promise.all([
        fetch('/api/meetings/scheduled?status=Upcoming'),
        fetch('/api/meetings/requests?status=Pending')
      ]);
      
      const meetData = await meetRes.json();
      const reqData = await reqRes.json();
      
      // Guard against non-array responses
      setMeetings(Array.isArray(meetData) ? meetData : []);
      setRequests(Array.isArray(reqData) ? reqData : []);
    } catch (error) {
      console.error('Failed to fetch meetings:', error);
      setMeetings([]);
      setRequests([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
    // Poll every 30 seconds for updates
    const interval = setInterval(fetchData, 30000);
    return () => clearInterval(interval);
  }, [studentId]);

  if (loading) return <div className="text-sm text-gray-500">Loading meetings...</div>;

  if (meetings.length === 0 && requests.length === 0) {
    return (
      <div className="bg-white p-6 rounded-xl border border-dashed text-center">
        <p className="text-gray-500">No upcoming meetings or pending requests.</p>
        <p className="text-sm text-gray-400 mt-1">Select a counselor above to book a slot.</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Pending Requests */}
      {requests.length > 0 && (
        <div className="space-y-3">
          <h3 className="text-sm font-bold uppercase text-yellow-600 tracking-wider">Pending Requests</h3>
          {requests.map((req) => (
            <Card key={req.id} className="border-l-4 border-l-yellow-400">
              <CardContent className="p-4">
                <div className="flex justify-between items-start">
                  <div>
                    <div className="font-semibold text-gray-900">{req.meetingType}</div>
                    <div className="text-sm text-gray-600 mt-1">
                      Request with {req.host.firstName} {req.host.lastName}
                    </div>
                    <div className="text-xs text-gray-500 mt-1">
                      Proposed: {new Date(req.requestedStart).toLocaleString()}
                    </div>
                  </div>
                  <span className="px-2 py-1 bg-yellow-100 text-yellow-800 text-xs rounded-full font-medium">
                    Requested
                  </span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {/* Confirmed Meetings */}
      {meetings.length > 0 && (
        <div className="space-y-3">
          <h3 className="text-sm font-bold uppercase text-blue-600 tracking-wider">Upcoming Confirmed</h3>
          {meetings.map((meeting) => (
            <Card key={meeting.id} className="border-l-4 border-l-blue-500">
              <CardContent className="p-4">
                <div className="flex justify-between items-start">
                  <div>
                    <div className="font-bold text-gray-900">{meeting.meetingType}</div>
                    <div className="text-sm text-gray-600 mt-1">
                      With {meeting.host.firstName} {meeting.host.lastName}
                    </div>
                    <div className="text-sm font-medium text-blue-600 mt-2">
                      {new Date(meeting.startTime).toLocaleString()}
                    </div>
                  </div>
                  <div className="flex flex-col items-end gap-2">
                    <span className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full font-medium">
                      Confirmed
                    </span>
                    {meeting.conferenceJoinUrl && (
                      <Button className="h-7 text-xs px-3" onClick={() => window.open(meeting.conferenceJoinUrl, '_blank')}>
                        Join Meeting
                      </Button>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
