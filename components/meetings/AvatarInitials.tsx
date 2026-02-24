'use client';

import { getInitials } from '@/lib/meetings/meetingUtils';

interface AvatarInitialsProps {
  firstName: string;
  lastName: string;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export function AvatarInitials({
  firstName,
  lastName,
  size = 'md',
  className = '',
}: AvatarInitialsProps) {
  const initials = getInitials(firstName, lastName);
  
  const sizeClasses = {
    sm: 'w-8 h-8 text-xs',
    md: 'w-10 h-10 text-sm',
    lg: 'w-12 h-12 text-base',
  };

  const colors = [
    'bg-blue-100 text-blue-700',
    'bg-indigo-100 text-indigo-700',
    'bg-purple-100 text-purple-700',
    'bg-pink-100 text-pink-700',
    'bg-green-100 text-green-700',
    'bg-teal-100 text-teal-700',
  ];

  // Deterministic color based on initials
  const colorIndex = initials.charCodeAt(0) % colors.length;
  const color = colors[colorIndex];

  return (
    <div
      className={`flex items-center justify-center rounded-full font-bold ${sizeClasses[size]} ${color} ${className}`}
      title={`${firstName} ${lastName}`}
    >
      {initials}
    </div>
  );
}
