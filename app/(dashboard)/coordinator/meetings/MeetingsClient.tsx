'use client';

import { HostMeetingsView } from '@/components/meetings/HostMeetingsView';

interface CoordinatorMeetingsClientProps {
  initialRequests: any[];
  initialMeetings: any[];
  userId: string;
}

export default function CoordinatorMeetingsClient({
  initialRequests,
  initialMeetings,
  userId
}: CoordinatorMeetingsClientProps) {
  return (
    <HostMeetingsView 
      initialRequests={initialRequests}
      initialMeetings={initialMeetings}
      userId={userId}
      role="coordinator"
    />
  );
}
