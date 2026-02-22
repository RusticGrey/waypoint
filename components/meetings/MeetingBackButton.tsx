'use client';

import { useRouter } from 'next/navigation';

export function MeetingBackButton() {
  const router = useRouter();

  return (
    <button 
      onClick={() => router.back()} 
      className="text-sm text-blue-600 hover:underline flex items-center gap-2"
    >
       ← Back
    </button>
  );
}
