'use client';

import { getStatusBadgeStyle } from '@/lib/meetings/meetingUtils';

interface StatusBadgeProps {
  status: string;
  className?: string;
}

export function StatusBadge({ status, className = '' }: StatusBadgeProps) {
  const { bgColor, textColor } = getStatusBadgeStyle(status);
  
  return (
    <span className={`px-2 py-1 text-[10px] uppercase rounded-full font-bold ${bgColor} ${textColor} ${className}`}>
      {status}
    </span>
  );
}
