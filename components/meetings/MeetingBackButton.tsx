'use client';

import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';

interface MeetingBackButtonProps {
  label?: string;
  variant?: 'primary' | 'secondary' | 'outline';
}

export function MeetingBackButton({ label = 'Back to Meetings', variant = 'outline' }: MeetingBackButtonProps) {
  const router = useRouter();

  return (
    <Button
      onClick={() => router.back()}
      variant={variant}
      className="gap-2 text-gray-700 border-gray-300 hover:bg-gray-50"
    >
      ← {label}
    </Button>
  );
}
