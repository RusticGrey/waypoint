'use client';

import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

interface ScheduledMeetingCardProps {
  meeting: any;
}

export function ScheduledMeetingCard({ meeting }: ScheduledMeetingCardProps) {
  const isUpcoming = meeting.status === 'Upcoming';
  
  return (
    <Card className={`overflow-hidden ${meeting.status === 'Cancelled' ? 'opacity-60' : ''}`}>
      <CardContent className="p-0">
        <div className="flex">
          <div className={`w-2 ${isUpcoming ? 'bg-blue-500' : 'bg-gray-300'}`}></div>
          <div className="flex-1 p-4">
            <div className="flex justify-between items-start">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase ${
                    meeting.conferencePlatform === 'Zoom' ? 'bg-blue-100 text-blue-700' : 'bg-green-100 text-green-700'
                  }`}>
                    {meeting.conferencePlatform}
                  </span>
                  <span className="text-xs text-gray-500">
                    {new Date(meeting.startTime).toLocaleDateString()}
                  </span>
                </div>
                <h3 className="font-bold text-gray-900">{meeting.meetingType}</h3>
                <p className="text-sm text-gray-600">
                  {new Date(meeting.startTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })} - {new Date(meeting.endTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </p>
                <p className="text-xs text-gray-500 mt-1">
                  With {meeting.student.user.firstName} {meeting.student.user.lastName}
                </p>
              </div>
              <div className="text-right">
                <div className={`text-xs font-bold mb-2 ${isUpcoming ? 'text-blue-600' : 'text-gray-500'}`}>
                  {meeting.status}
                </div>
                {isUpcoming && meeting.conferenceJoinUrl && (
                  <Button className="h-8 text-xs px-3" onClick={() => window.open(meeting.conferenceJoinUrl, '_blank')}>
                    Join
                  </Button>
                )}
              </div>
            </div>
            <div className="mt-4 flex justify-end border-t pt-2">
              <Link 
                href={`./meetings/${meeting.id}`}
                className="text-xs text-blue-600 hover:underline font-medium"
              >
                View Details & AI Notes →
              </Link>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
