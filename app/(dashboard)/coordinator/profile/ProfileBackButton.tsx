'use client';

import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';

export function ProfileBackButton() {
  const router = useRouter();

  return (
    <Button variant="outline" onClick={() => router.back()} className="text-black border-gray-300">
      ← Back
    </Button>
  );
}
