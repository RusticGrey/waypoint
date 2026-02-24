'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Card, CardContent } from '@/components/ui/card';
import { StatusBadge } from '@/components/meetings/StatusBadge';
import { AvatarInitials } from '@/components/meetings/AvatarInitials';
import {
  filterMeetingsAndRequests,
  formatDate,
  isJoinableNow,
} from '@/lib/meetings/meetingUtils';

interface StudentMeetingListProps {
  studentId: string;
}

interface MeetingData {
  meetings: any[];
  requests: any[];
  loading: boolean;
}

interface SectionProps {
  title: string;
  color: string;
  items: any[];
  renderItem: (item: any) => React.ReactNode;
}

function MeetingSection({ title, color, items, renderItem }: SectionProps) {
  if (items.length === 0) return null;

  return (
    <div className="space-y-3">
      <h3 className={`text-sm font-bold uppercase tracking-wider ${color}`}>
        {title}
      </h3>
      {items.map((item) => renderItem(item))}
    </div>
  );
}

function PendingRequestCard({ request }: { request: any }) {
  return (
    <Link key={request.id} href={`/student/meetings/requests/${request.id}`} className="block group">
      <Card className="border-l-4 border-l-yellow-400 bg-white shadow-sm hover:shadow-lg transition-all hover:border-l-yellow-500 group-hover:scale-[1.01]">
        <CardContent className="p-4">
          <div className="flex justify-between items-start gap-3">
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-3 mb-3">
                <AvatarInitials
                  firstName={request.host.user.firstName}
                  lastName={request.host.user.lastName}
                  size="sm"
                />
                <div className="flex-1 min-w-0">
                  <div className="font-bold text-sm text-gray-900 truncate">
                    {request.meetingType}
                  </div>
                  <div className="text-xs text-gray-600 truncate">
                    {request.host.user.firstName} {request.host.user.lastName}
                  </div>
                </div>
              </div>
              <div className="space-y-1 pl-11">
                <div className="text-sm font-medium text-yellow-700">⏳ Awaiting Response</div>
                <div className="text-xs text-gray-600">
                  📅 {formatDate(request.requestedStart)} • {new Date(request.requestedStart).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </div>
              </div>
            </div>
            <StatusBadge status="Pending" />
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}

function UpcomingMeetingCard({ meeting }: { meeting: any }) {
  const isJoinable = isJoinableNow(meeting.startTime, meeting.endTime);

  return (
    <Link key={meeting.id} href={`/student/meetings/${meeting.id}`} className="block group">
      <Card className="border-l-4 border-l-blue-500 bg-gradient-to-br from-blue-50 to-white hover:from-blue-100 shadow-sm hover:shadow-lg transition-all hover:border-l-blue-600 group-hover:scale-[1.01]">
        <CardContent className="p-4">
          <div className="flex justify-between items-start gap-3">
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-3 mb-3">
                <AvatarInitials
                  firstName={meeting.host.user.firstName}
                  lastName={meeting.host.user.lastName}
                  size="sm"
                />
                <div className="flex-1 min-w-0">
                  <div className="font-bold text-sm text-gray-900 truncate">
                    {meeting.meetingType}
                  </div>
                  <div className="text-xs text-gray-600 truncate">
                    {meeting.host.user.firstName} {meeting.host.user.lastName}
                  </div>
                </div>
              </div>
              <div className="space-y-1 pl-11">
                <div className="text-xs text-gray-600 font-medium">
                  📅 {formatDate(meeting.startTime)} • ⏰ {new Date(meeting.startTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </div>
                {meeting.conferenceJoinUrl && (
                  <div className="text-xs">
                    <span className="inline-block px-2 py-1 rounded bg-blue-100 text-blue-700 font-medium">
                      {meeting.conferencePlatform === 'Zoom' ? '🎥 Zoom' : '📹 Google Meet'}
                    </span>
                  </div>
                )}
              </div>
            </div>
            <div className="flex flex-col items-end gap-2">
              <StatusBadge status="Confirmed" />
              {isJoinable && meeting.conferenceJoinUrl && (
                <button 
                  onClick={(e) => {
                    e.preventDefault();
                    window.open(meeting.conferenceJoinUrl, '_blank');
                  }}
                  className="text-[10px] font-bold text-white bg-green-600 hover:bg-green-700 animate-pulse px-2 py-1 rounded"
                >
                  🎥 Join Now
                </button>
              )}
            </div>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}

function ResolvedRequestCard({ request }: { request: any }) {
  return (
    <Link key={request.id} href={`/student/meetings/requests/${request.id}`} className="block opacity-70 hover:opacity-100 transition-opacity">
      <Card className="border-l-4 border-l-gray-300 bg-gray-50 shadow-sm">
        <CardContent className="p-3">
          <div className="flex justify-between items-center gap-3">
            <div className="flex-1 min-w-0">
              <div className="font-bold text-sm text-gray-700 truncate">{request.meetingType}</div>
              <div className="text-xs text-gray-600 truncate">
                {request.host.user.firstName} {request.host.user.lastName}
              </div>
            </div>
            <StatusBadge status={request.status} />
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}

function PastMeetingCard({ meeting }: { meeting: any }) {
  const isCancelled = meeting.status === 'Cancelled';

  return (
    <Link key={meeting.id} href={`/student/meetings/${meeting.id}`} className="block">
      <Card className={`bg-gray-50 border-l-4 transition-all hover:shadow-md ${
        isCancelled ? 'border-l-red-300' : 'border-l-gray-300'
      } opacity-80 hover:opacity-100`}>
        <CardContent className="p-4">
          <div className="flex justify-between items-start gap-3">
            <div className="flex-1 min-w-0">
              <div className="font-medium text-sm text-gray-700 truncate">{meeting.meetingType}</div>
              <div className="text-xs text-gray-600 truncate">
                {meeting.host.user.firstName} {meeting.host.user.lastName}
              </div>
              <div className="text-xs text-gray-500 mt-1">
                {formatDate(meeting.startTime)}
              </div>
            </div>
            <StatusBadge status={meeting.status} />
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}

export function StudentMeetingList({ studentId }: StudentMeetingListProps) {
  const [data, setData] = useState<MeetingData>({
    meetings: [],
    requests: [],
    loading: true,
  });

  const fetchData = async () => {
    try {
      const [meetRes, reqRes] = await Promise.all([
        fetch('/api/meetings/scheduled'),
        fetch('/api/meetings/requests'),
      ]);

      const meetData = await meetRes.json();
      const reqData = await reqRes.json();

      setData({
        meetings: Array.isArray(meetData) ? meetData : [],
        requests: Array.isArray(reqData) ? reqData : [],
        loading: false,
      });
    } catch (error) {
      console.error('Failed to fetch meetings:', error);
      setData((prev) => ({ ...prev, loading: false }));
    }
  };

  useEffect(() => {
    fetchData();
    const interval = setInterval(fetchData, 30000);
    return () => clearInterval(interval);
  }, [studentId]);

  if (data.loading) {
    return (
      <div className="text-sm text-gray-500 animate-pulse">
        Loading meetings...
      </div>
    );
  }

  const filtered = filterMeetingsAndRequests(data.meetings, data.requests);

  if (filtered.pendingRequests.length === 0 && filtered.upcomingMeetings.length === 0 &&
      filtered.resolvedRequests.length === 0 && filtered.pastMeetings.length === 0) {
    return (
      <div className="bg-gradient-to-br from-gray-50 to-gray-100 p-6 rounded-lg border border-gray-200 text-center">
        <p className="text-gray-600 font-medium">No upcoming meetings or requests.</p>
        <p className="text-xs text-gray-400 mt-2">Select a counselor above to book a slot.</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <MeetingSection
        title="Pending Requests"
        color="text-yellow-600"
        items={filtered.pendingRequests}
        renderItem={(req) => <PendingRequestCard key={req.id} request={req} />}
      />

      <MeetingSection
        title="Upcoming Meetings"
        color="text-blue-600"
        items={filtered.upcomingMeetings}
        renderItem={(meeting) => <UpcomingMeetingCard key={meeting.id} meeting={meeting} />}
      />

      {filtered.resolvedRequests.length > 0 && (
        <MeetingSection
          title="Closed Requests"
          color="text-gray-400"
          items={filtered.resolvedRequests.slice(0, 3)}
          renderItem={(req) => <ResolvedRequestCard key={req.id} request={req} />}
        />
      )}

      {filtered.pastMeetings.length > 0 && (
        <MeetingSection
          title="Past & Cancelled Sessions"
          color="text-gray-500"
          items={filtered.pastMeetings.slice(0, 10)}
          renderItem={(meeting) => <PastMeetingCard key={meeting.id} meeting={meeting} />}
        />
      )}
    </div>
  );
}
