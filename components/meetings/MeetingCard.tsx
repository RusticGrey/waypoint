'use client';

import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { useSession } from 'next-auth/react';
import { useState } from 'react';
import { AvatarInitials } from '@/components/meetings/AvatarInitials';
import { StatusBadge } from '@/components/meetings/StatusBadge';
import { isJoinableNow, formatTimeRange, formatDate } from '@/lib/meetings/meetingUtils';

interface MeetingCardProps {
  meeting: any;
  onDelete?: () => void;
}

export function MeetingCard({ meeting, onDelete }: MeetingCardProps) {
  const { data: session } = useSession();
  const [isDeleting, setIsDeleting] = useState(false);
  const now = new Date();
  const startTime = new Date(meeting.startTime);
  const endTime = new Date(meeting.endTime);
  
  const isCancelled = meeting.status === 'Cancelled';
  const isCompleted = meeting.status === 'Completed';
  const isPast = endTime < now;
  const isOngoing = startTime <= now && endTime >= now && !isCancelled && !isCompleted;
  const isUpcoming = startTime > now && meeting.status === 'Upcoming';

  const isJoinable = (isUpcoming || isOngoing) && meeting.conferenceJoinUrl && isJoinableNow(meeting.startTime, meeting.endTime);
  
  const platformColor = meeting.conferencePlatform === 'Zoom' 
    ? 'bg-blue-100 text-blue-700' 
    : 'bg-green-100 text-green-700';
  
  const statusLabel = isCancelled ? 'Cancelled' : 
                     isCompleted ? 'Completed' : 
                     isOngoing ? 'Ongoing' : 
                     isPast ? 'Past' : 'Upcoming';

  const bannerColor = isCancelled ? 'bg-red-500' :
                     isCompleted ? 'bg-green-500' :
                     isOngoing ? 'bg-amber-500' :
                     isUpcoming ? 'bg-blue-500' : 'bg-gray-400';

  // Determine who the "other party" is
  const isCurrentUserStudent = session?.user?.role === 'student';
  const otherParty = isCurrentUserStudent ? meeting.host : meeting.student;
  const otherPartyUser = otherParty?.user || otherParty; 

  const handleDelete = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (!confirm('Are you sure you want to remove this meeting from your view?')) return;
    
    setIsDeleting(true);
    try {
      const res = await fetch(`/api/meetings/scheduled/${meeting.id}`, {
        method: 'DELETE',
      });
      if (res.ok) {
        onDelete?.();
      } else {
        const error = await res.json();
        alert(error.error || 'Failed to delete meeting');
      }
    } catch (err) {
      console.error('Delete error:', err);
      alert('An error occurred while deleting');
    } finally {
      setIsDeleting(false);
    }
  };

  // Only allow deletion for explicitly CANCELLED meetings by students
  const canDelete = isCurrentUserStudent && isCancelled;

  return (
    <Link href={`./meetings/${meeting.id}`} className={`block group ${isDeleting ? 'opacity-50 pointer-events-none' : ''}`}>
      <Card className={`overflow-hidden transition-all hover:shadow-lg cursor-pointer group-hover:scale-[1.01] ${isCancelled ? 'opacity-50 hover:opacity-60' : ''}`}>
        <CardContent className="p-0">
          <div className="flex">
            <div className={`w-1.5 ${bannerColor}`}></div>
            <div className="flex-1 p-4">
              <div className="flex justify-between items-start gap-4">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-2">
                    <AvatarInitials
                      firstName={otherPartyUser?.firstName || '?'}
                      lastName={otherPartyUser?.lastName || '?'}
                      size="sm"
                    />
                    <div className="flex-1 min-w-0">
                      <h3 className="font-bold text-sm text-gray-900 truncate group-hover:text-blue-600 transition-colors">{meeting.meetingType}</h3>
                      <p className="text-xs text-gray-600 truncate">
                        Meeting with {otherPartyUser?.firstName} {otherPartyUser?.lastName}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 mt-2">
                    <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase ${platformColor}`}>
                      {meeting.conferencePlatform}
                    </span>
                    <span className="text-xs text-gray-500">
                      {formatDate(meeting.startTime)}
                    </span>
                  </div>
                  <p className="text-sm text-gray-700 mt-2">
                    {formatTimeRange(meeting.startTime, meeting.endTime)}
                  </p>
                </div>
                <div className="flex flex-col items-end gap-2">
                  <div className="flex items-center gap-2">
                    {canDelete && (
                      <button 
                        onClick={handleDelete}
                        className="p-1 text-gray-400 hover:text-red-500 transition-colors rounded-full hover:bg-red-50"
                        title="Remove from view"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                      </button>
                    )}
                    <StatusBadge status={statusLabel} />
                  </div>
                  {isJoinable && (
                    <Button 
                      className="h-8 text-xs px-3 bg-green-600 hover:bg-green-700 text-white" 
                      onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        window.open(meeting.conferenceJoinUrl, '_blank');
                      }}
                    >
                      Join Now
                    </Button>
                  )}
                  {isUpcoming && meeting.conferenceJoinUrl && !isJoinable && (
                    <span className="text-[10px] text-gray-500 font-medium">
                      Join in {Math.ceil((new Date(meeting.startTime).getTime() - new Date().getTime()) / 60000)} min
                    </span>
                  )}
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}
