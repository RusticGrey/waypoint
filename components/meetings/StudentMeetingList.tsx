'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Card, CardContent } from '@/components/ui/card';

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
        fetch('/api/meetings/scheduled'),
        fetch('/api/meetings/requests')
      ]);
      
      const meetData = await meetRes.json();
      const reqData = await reqRes.json();
      
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

  const now = new Date();
  const upcomingMeetings = meetings.filter(m => new Date(m.startTime) > now && m.status !== 'Cancelled');
  const pastMeetingsList = meetings.filter(m => new Date(m.startTime) <= now || m.status === 'Cancelled');

  const pendingRequests = requests.filter(r => r.status === 'Pending');
  const resolvedRequests = requests.filter(r => r.status === 'Declined' || r.status === 'Cancelled');

  return (
    <div className="space-y-6">
      {/* Pending Requests */}
      {pendingRequests.length > 0 && (
        <div className="space-y-3">
          <h3 className="text-sm font-bold uppercase text-yellow-600 tracking-wider">Pending Requests</h3>
          {pendingRequests.map((req) => (
            <Link key={req.id} href={`/student/meetings/requests/${req.id}`} className="block transition-transform active:scale-95">
              <Card className="border-l-4 border-l-yellow-400 bg-white shadow-sm hover:shadow-md transition-shadow">
                <CardContent className="p-4">
                  <div className="flex justify-between items-start text-black">
                    <div>
                      <div className="font-bold text-lg">{req.meetingType}</div>
                      <div className="text-sm text-gray-600">
                        With {req.host.firstName} {req.host.lastName}
                      </div>
                      <div className="text-xs text-gray-500 font-medium mt-1">
                        Proposed: {new Date(req.requestedStart).toLocaleString()}
                      </div>
                    </div>
                    <span className="px-2 py-1 bg-yellow-100 text-yellow-800 text-[10px] uppercase rounded-full font-bold">
                      Pending
                    </span>
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      )}

      {/* Confirmed Meetings */}
      {upcomingMeetings.length > 0 && (
        <div className="space-y-3">
          <h3 className="text-sm font-bold uppercase text-blue-600 tracking-wider">Upcoming Meetings</h3>
          {upcomingMeetings.map((meeting) => {
            const meetingStart = new Date(meeting.startTime);
            const isJoinable = now.getTime() >= (meetingStart.getTime() - 10 * 60000) && now.getTime() <= new Date(meeting.endTime).getTime();
            
            return (
              <Link key={meeting.id} href={`/student/meetings/${meeting.id}`} className="block transition-transform active:scale-95">
                <Card className="border-l-4 border-l-blue-500 bg-white shadow-sm hover:shadow-md transition-shadow">
                  <CardContent className="p-4">
                    <div className="flex justify-between items-start text-black">
                      <div>
                        <div className="font-bold">{meeting.meetingType}</div>
                        <div className="text-sm text-gray-600 mt-1">
                          With {meeting.host.firstName} {meeting.host.lastName}
                        </div>
                        <div className="text-sm font-medium text-blue-600 mt-2">
                          {meetingStart.toLocaleString()}
                        </div>
                      </div>
                      <div className="flex flex-col items-end gap-2">
                        <span className="px-2 py-1 bg-green-100 text-green-800 text-[10px] uppercase rounded-full font-bold">
                          Confirmed
                        </span>
                        {meeting.conferenceJoinUrl && isJoinable && (
                          <span className="text-[10px] font-bold text-blue-600 animate-pulse">Join Available</span>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            );
          })}
        </div>
      )}

      {/* Resolved Requests (Declined/Cancelled) */}
      {resolvedRequests.length > 0 && (
        <div className="space-y-3">
          <h3 className="text-sm font-bold uppercase text-gray-400 tracking-wider">Closed Requests</h3>
          {resolvedRequests.slice(0, 3).map((req) => (
            <Link key={req.id} href={`/student/meetings/requests/${req.id}`} className="block opacity-70 hover:opacity-100">
              <Card className="border-l-4 border-l-gray-300 bg-gray-50 shadow-sm">
                <CardContent className="p-3">
                  <div className="flex justify-between items-center text-gray-600">
                    <div>
                      <div className="font-bold text-sm">{req.meetingType}</div>
                      <div className="text-[10px] uppercase font-medium">
                        {req.status} with {req.host.firstName}
                      </div>
                    </div>
                    <span className={`px-2 py-0.5 ${req.status === 'Declined' ? 'bg-red-50 text-red-700' : 'bg-gray-100 text-gray-600'} text-[9px] uppercase rounded-full font-bold`}>
                      {req.status}
                    </span>
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      )}

      {/* Past & Cancelled Meetings */}
      {pastMeetingsList.length > 0 && (
        <div className="space-y-3">
          <h3 className="text-sm font-bold uppercase text-gray-500 tracking-wider">Past & Cancelled Sessions</h3>
          {pastMeetingsList.slice(0, 10).map((meeting) => {
            const isCancelled = meeting.status === 'Cancelled';
            return (
              <Link key={meeting.id} href={`/student/meetings/${meeting.id}`} className="block">
                <Card className={`bg-gray-50 border-l-4 ${isCancelled ? 'border-l-red-300' : 'border-l-gray-300'} opacity-80 hover:opacity-100 transition-opacity`}>
                  <CardContent className="p-4">
                    <div className="flex justify-between items-start text-gray-600">
                      <div>
                        <div className="font-medium">{meeting.meetingType}</div>
                        <div className="text-xs mt-1">
                          {new Date(meeting.startTime).toLocaleDateString()}
                        </div>
                      </div>
                      <span className={`px-2 py-0.5 rounded-full text-[9px] font-bold uppercase ${
                        isCancelled ? 'bg-red-50 text-red-600' : 'bg-gray-100 text-gray-500'
                      }`}>
                        {meeting.status}
                      </span>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            );
          })}
        </div>
      )}
    </div>
  );
}
