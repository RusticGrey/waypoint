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
export function isJoinableNow(startTime: Date, endTime: Date): boolean {
  const now = new Date();
  const start = new Date(startTime);
  const end = new Date(endTime);
  const tenMinutesBeforeStart = start.getTime() - 10 * 60000;
  
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

  return {
    pendingRequests: requests.filter(r => r.status === 'Pending'),
    upcomingMeetings: meetings.filter(
      m => new Date(m.startTime) > now && m.status !== 'Cancelled'
    ),
    resolvedRequests: requests.filter(
      r => r.status === 'Declined' || r.status === 'Cancelled'
    ),
    pastMeetings: meetings.filter(
      m => new Date(m.startTime) <= now || m.status === 'Cancelled'
    ),
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
