'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useSession } from 'next-auth/react';
import { Card, CardContent } from '@/components/ui/card';
import { StatusBadge } from '@/components/meetings/StatusBadge';
import { AvatarInitials } from '@/components/meetings/AvatarInitials';
import { MeetingCard } from '@/components/meetings/MeetingCard';
import {
  filterMeetingsAndRequests,
  formatDate,
  formatTimeRange,
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
                    Meeting with {request.host.user.firstName} {request.host.user.lastName}
                  </div>
                </div>
              </div>
              <div className="space-y-1 pl-11">
                <div className="text-sm font-medium text-yellow-700">⏳ Awaiting Response</div>
                <div className="text-xs text-gray-600 font-medium">
                  📅 {formatDate(request.requestedStart)} • ⏰ {formatTimeRange(request.requestedStart, request.requestedEnd)}
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

function ResolvedRequestCard({ request, onDelete }: { request: any, onDelete: () => void }) {
  const { data: session } = useSession();
  const [isDeleting, setIsDeleting] = useState(false);
  
  const handleDelete = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (!confirm('Remove this request from your view?')) return;
    
    setIsDeleting(true);
    try {
      const res = await fetch(`/api/meetings/requests/${request.id}`, { method: 'DELETE' });
      if (res.ok) onDelete();
      else alert('Failed to delete request');
    } catch (err) {
      alert('Error deleting request');
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <Link key={request.id} href={`/student/meetings/requests/${request.id}`} className={`block opacity-70 hover:opacity-100 transition-opacity ${isDeleting ? 'pointer-events-none' : ''}`}>
      <Card className="border-l-4 border-l-gray-300 bg-gray-50 shadow-sm">
        <CardContent className="p-3">
          <div className="flex justify-between items-start gap-3">
            <div className="flex-1 min-w-0">
              <div className="font-bold text-sm text-gray-700 truncate">{request.meetingType}</div>
              <div className="text-xs text-gray-600 truncate">
                Meeting with {request.host.user.firstName} {request.host.user.lastName}
              </div>
              <div className="text-[10px] text-gray-500 mt-1">
                 📅 {formatDate(request.requestedStart)} • {formatTimeRange(request.requestedStart, request.requestedEnd)}
              </div>
            </div>
            <div className="flex items-center gap-2">
              <button 
                onClick={handleDelete}
                className="p-1 text-gray-400 hover:text-red-500 transition-colors rounded-full hover:bg-red-50"
                title="Remove from view"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                </svg>
              </button>
              <StatusBadge status={request.status} />
            </div>
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
      // Use no-cache to ensure we get fresh data after a delete
      const [meetRes, reqRes] = await Promise.all([
        fetch('/api/meetings/scheduled', { cache: 'no-store' }),
        fetch('/api/meetings/requests', { cache: 'no-store' }),
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

  const handleRefresh = () => {
    fetchData();
  };

  return (
    <div className="space-y-6">
      <MeetingSection
        title="Pending Requests"
        color="text-yellow-600"
        items={filtered.pendingRequests}
        renderItem={(req) => <PendingRequestCard key={req.id} request={req} />}
      />

      <MeetingSection
        title="Upcoming & Ongoing Meetings"
        color="text-blue-600"
        items={filtered.upcomingMeetings}
        renderItem={(meeting) => <MeetingCard key={meeting.id} meeting={meeting} onDelete={handleRefresh} />}
      />

      {filtered.resolvedRequests.length > 0 && (
        <MeetingSection
          title="Closed Requests"
          color="text-gray-400"
          items={filtered.resolvedRequests.slice(0, 3)}
          renderItem={(req) => <ResolvedRequestCard key={req.id} request={req} onDelete={handleRefresh} />}
        />
      )}

      {filtered.pastMeetings.length > 0 && (
        <MeetingSection
          title="Past & Cancelled Sessions"
          color="text-gray-500"
          items={filtered.pastMeetings.slice(0, 10)}
          renderItem={(meeting) => <MeetingCard key={meeting.id} meeting={meeting} onDelete={handleRefresh} />}
        />
      )}
    </div>
  );
}
