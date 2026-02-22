'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { SimpleSlotPicker } from '@/components/meetings/SimpleSlotPicker';

interface MeetingManagementClientProps {
  meeting: any;
}

export function MeetingManagementClient({ meeting }: MeetingManagementClientProps) {
  const [isRescheduling, setIsRescheduling] = useState(false);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleReschedule = async (start: Date, end: Date) => {
    if (!confirm('Rescheduling will cancel this confirmed meeting and send a new request to your counselor. Continue?')) return;
    setLoading(true);
    try {
      // Step 1: Create new request with new time
      const res = await fetch('/api/meetings/requests', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          hostId: meeting.hostId,
          requestedStart: start.toISOString(),
          requestedEnd: end.toISOString(),
          meetingType: meeting.meetingType,
          studentNote: `Rescheduled from meeting on ${new Date(meeting.startTime).toLocaleDateString()}`
        }),
      });

      if (res.ok) {
        // Step 2: Cancel old meeting
        await fetch(`/api/meetings/scheduled/${meeting.id}`, {
          method: 'PATCH',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ status: 'Cancelled' }),
        });
        
        router.push('/student/meetings');
        router.refresh();
      }
    } catch (error) {
      console.error('Reschedule error:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = async () => {
    if (!confirm('Are you sure you want to cancel this confirmed meeting?')) return;
    setLoading(true);
    try {
      const res = await fetch(`/api/meetings/scheduled/${meeting.id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: 'Cancelled' }),
      });
      if (res.ok) {
        router.push('/student/meetings');
        router.refresh();
      }
    } catch (error) {
      console.error('Cancel error:', error);
    } finally {
      setLoading(false);
    }
  };

  const isPast = new Date(meeting.startTime) < new Date();

  if (isPast || meeting.status === 'Cancelled') {
    return (
       <div className="bg-gray-50 border border-gray-200 p-4 rounded-lg italic text-gray-500 text-sm">
         Note: Management features are only available for upcoming, active sessions.
       </div>
    );
  }

  return (
    <div className="space-y-6 pt-4">
      {/* Reschedule Section */}
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <h2 className="text-lg font-bold text-black border-l-4 border-blue-500 pl-3 uppercase tracking-tight">Change Schedule</h2>
          {!isRescheduling && (
            <button onClick={() => setIsRescheduling(true)} className="text-xs text-blue-600 font-bold hover:underline uppercase">
              Reschedule
            </button>
          )}
        </div>

        {isRescheduling ? (
          <div className="space-y-4 animate-in fade-in slide-in-from-top-1 duration-200">
             <div className="bg-blue-50 p-4 rounded-lg border border-blue-100 mb-4">
               <p className="text-sm text-blue-800">Choose a new time. Note: This will cancel your current confirmed slot and require counselor re-approval.</p>
             </div>
             <SimpleSlotPicker hostId={meeting.hostId} onSlotSelected={handleReschedule} />
             <Button variant="outline" onClick={() => setIsRescheduling(false)} className="w-full">
                Back to Details
             </Button>
          </div>
        ) : (
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 bg-red-50 rounded-lg border border-red-100">
             <div>
               <p className="text-sm font-bold text-red-900">Cancel Meeting</p>
               <p className="text-xs text-red-700">If you can no longer attend, please cancel as early as possible.</p>
             </div>
             <Button 
              disabled={loading} 
              variant="outline" 
              onClick={handleCancel}
              className="text-red-600 border-red-200 hover:bg-red-100 bg-white"
             >
               Cancel Meeting
             </Button>
          </div>
        )}
      </div>
    </div>
  );
}
