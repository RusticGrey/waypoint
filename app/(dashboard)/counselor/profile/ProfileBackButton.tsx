'use client';

import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';

export function ProfileBackButton() {
  const router = useRouter();

  return (
    <Button 
      variant="outline" 
      onClick={() => router.push('/counselor')}
    >
      ← Back to Dashboard
    </Button>
  );
}
