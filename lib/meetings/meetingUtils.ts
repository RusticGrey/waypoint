/**
 * Utility functions for meeting logic and filtering
 */

export interface FilteredMeetings {
  pendingRequests: any[];
  upcomingMeetings: any[];
  resolvedRequests: any[];
  pastMeetings: any[];
}

/**
 * Check if a meeting time slot is currently joinable (within 10 min before to end time)
 */
export function isJoinableNow(startTime: Date | string, endTime: Date | string): boolean {
  const now = new Date();
  const start = new Date(startTime);
  const end = new Date(endTime);
  const tenMinutesBeforeStart = start.getTime() - 10 * 60000;
  
  // Meeting is joinable 10 mins before start until it ends
  return now.getTime() >= tenMinutesBeforeStart && now.getTime() <= end.getTime();
}

/**
 * Filter meetings and requests into categorized lists
 */
export function filterMeetingsAndRequests(
  meetings: any[],
  requests: any[]
): FilteredMeetings {
  const now = new Date();

  const pendingRequests = requests
    .filter(r => r.status === 'Pending')
    .sort((a, b) => new Date(a.requestedStart).getTime() - new Date(b.requestedStart).getTime());

  const upcomingMeetings = meetings
    .filter(m => {
      const endTime = new Date(m.endTime);
      return endTime.getTime() >= now.getTime() && m.status === 'Upcoming';
    })
    .sort((a, b) => new Date(a.startTime).getTime() - new Date(b.startTime).getTime());

  const resolvedRequests = requests
    .filter(r => r.status === 'Declined' || r.status === 'Cancelled')
    .sort((a, b) => new Date(b.requestedStart).getTime() - new Date(a.requestedStart).getTime());

  const pastMeetings = meetings
    .filter(m => {
      const endTime = new Date(m.endTime);
      return endTime.getTime() < now.getTime() || m.status === 'Cancelled' || m.status === 'Completed';
    })
    .sort((a, b) => new Date(b.startTime).getTime() - new Date(a.startTime).getTime());

  return {
    pendingRequests,
    upcomingMeetings,
    resolvedRequests,
    pastMeetings,
  };
}

/**
 * Get formatted time range string
 */
export function formatTimeRange(startTime: Date | string, endTime: Date | string): string {
  const start = new Date(startTime);
  const end = new Date(endTime);
  
  return `${start.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })} - ${end.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`;
}

/**
 * Get status badge styling (color & classes)
 */
export function getStatusBadgeStyle(status: string): {
  bgColor: string;
  textColor: string;
  label: string;
} {
  const statusMap: Record<string, any> = {
    'Pending': { bgColor: 'bg-yellow-100', textColor: 'text-yellow-800', label: 'Pending' },
    'Confirmed': { bgColor: 'bg-green-100', textColor: 'text-green-800', label: 'Confirmed' },
    'Declined': { bgColor: 'bg-red-100', textColor: 'text-red-700', label: 'Declined' },
    'Cancelled': { bgColor: 'bg-red-50', textColor: 'text-red-600', label: 'Cancelled' },
    'Upcoming': { bgColor: 'bg-blue-100', textColor: 'text-blue-800', label: 'Upcoming' },
  };
  
  return statusMap[status] || { bgColor: 'bg-gray-100', textColor: 'text-gray-600', label: status };
}

/**
 * Get initials from name for avatar
 */
export function getInitials(firstName: string, lastName: string): string {
  return `${firstName?.[0] || ''}${lastName?.[0] || ''}`.toUpperCase();
}

/**
 * Format date for display
 */
export function formatDate(date: Date | string): string {
  return new Date(date).toLocaleDateString([], {
    weekday: 'short',
    month: 'short',
    day: 'numeric',
  });
}
