'use client';

import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { AvatarInitials } from '@/components/meetings/AvatarInitials';
import { StatusBadge } from '@/components/meetings/StatusBadge';
import { isJoinableNow, formatTimeRange, formatDate } from '@/lib/meetings/meetingUtils';

interface MeetingCardProps {
  meeting: any;
}

export function MeetingCard({ meeting }: MeetingCardProps) {
  const isUpcoming = meeting.status === 'Upcoming';
  const isJoinable = isUpcoming && meeting.conferenceJoinUrl && isJoinableNow(meeting.startTime, meeting.endTime);
  const platformColor = meeting.conferencePlatform === 'Zoom' 
    ? 'bg-blue-100 text-blue-700' 
    : 'bg-green-100 text-green-700';
  
  return (
    <Link href={`./meetings/${meeting.id}`} className="block group">
      <Card className={`overflow-hidden transition-all hover:shadow-lg cursor-pointer group-hover:scale-[1.01] ${meeting.status === 'Cancelled' ? 'opacity-50 hover:opacity-60' : ''}`}>
        <CardContent className="p-0">
          <div className="flex">
            <div className={`w-1.5 ${isUpcoming ? 'bg-blue-500' : meeting.status === 'Cancelled' ? 'bg-red-300' : 'bg-gray-300'}`}></div>
            <div className="flex-1 p-4">
              <div className="flex justify-between items-start gap-4">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-2">
                    <AvatarInitials
                      firstName={meeting.student.user.firstName}
                      lastName={meeting.student.user.lastName}
                      size="sm"
                    />
                    <div className="flex-1 min-w-0">
                      <h3 className="font-bold text-sm text-gray-900 truncate group-hover:text-blue-600 transition-colors">{meeting.meetingType}</h3>
                      <p className="text-xs text-gray-600 truncate">
                        {meeting.student.user.firstName} {meeting.student.user.lastName}
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
                  <StatusBadge status={meeting.status} />
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
              {/* <div className="mt-3 flex justify-end text-xs text-blue-600 font-medium group-hover:underline transition-colors">
                View Details & Notes →
              </div> */}
            </div>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}
