'use client';

import { HostMeetingsView } from '@/components/meetings/HostMeetingsView';

interface CounselorMeetingsClientProps {
  initialRequests: any[];
  initialMeetings: any[];
  userId: string;
}

export default function CounselorMeetingsClient({ 
  initialRequests, 
  initialMeetings, 
  userId 
}: CounselorMeetingsClientProps) {
  return (
    <HostMeetingsView 
      initialRequests={initialRequests}
      initialMeetings={initialMeetings}
      userId={userId}
      role="counselor"
    />
  );
}
