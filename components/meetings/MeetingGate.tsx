'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

export function MeetingGate({ children, role }: { children: React.ReactNode, role: 'coordinator' | 'counselor' }) {
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    async function checkStatus() {
      try {
        const res = await fetch('/api/integrations/status');
        const data = await res.json();

        if (!data.googleConnected) {
          // Redirect to setup page for integration configuration (Google is mandatory)
          // Zoom is optional but recommended
          router.replace(`/${role}/meetings/setup?reason=setup_required`);
        } else {
          setLoading(false);
        }
      } catch (error) {
        console.error('Integration status check failed:', error);
        setLoading(false);
      }
    }

    checkStatus();
  }, [router, role]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return <>{children}</>;
}
