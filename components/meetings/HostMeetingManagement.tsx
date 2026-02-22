'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { CalendarView } from '@/components/meetings/CalendarView';

interface HostMeetingManagementProps {
  meeting: any;
}

export function HostMeetingManagement({ meeting }: HostMeetingManagementProps) {
  const [isRescheduling, setIsRescheduling] = useState(false);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleReschedule = async (start: Date, end: Date) => {
    if (!confirm('This will cancel the current meeting and create a new confirmed meeting at the selected time. Continue?')) return;
    setLoading(true);
    try {
      // Let's implement a 'reschedule' via API.
      const rescheduleRes = await fetch(`/api/meetings/scheduled/${meeting.id}/reschedule`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ startTime: start.toISOString(), endTime: end.toISOString() }),
      });

      if (rescheduleRes.ok) {
        setIsRescheduling(false);
        router.refresh();
      } else {
        const data = await rescheduleRes.json();
        alert(`Reschedule failed: ${data.error || 'Unknown error'}`);
      }
    } catch (error) {
      console.error('Reschedule error:', error);
      alert('An error occurred during rescheduling.');
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = async () => {
    if (!confirm('Are you sure you want to cancel this meeting?')) return;
    setLoading(true);
    try {
      const res = await fetch(`/api/meetings/scheduled/${meeting.id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: 'Cancelled' }),
      });
      if (res.ok) {
        router.refresh();
      } else {
        const data = await res.json();
        alert(`Cancel failed: ${data.error || 'Unknown error'}`);
      }
    } catch (error) {
      console.error('Cancel error:', error);
      alert('An error occurred while cancelling.');
    } finally {
      setLoading(false);
    }
  };

  const isPast = new Date(meeting.startTime) < new Date();
  if (isPast || meeting.status === 'Cancelled') return null;

  return (
    <div className="space-y-6 pt-4">
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <h2 className="text-lg font-bold text-black border-l-4 border-blue-500 pl-3 uppercase tracking-tight">Host Management</h2>
          {!isRescheduling && (
            <button onClick={() => setIsRescheduling(true)} className="text-xs text-blue-600 font-bold hover:underline uppercase">
              Reschedule Meeting
            </button>
          )}
        </div>

        {isRescheduling ? (
          <div className="space-y-4 animate-in fade-in slide-in-from-top-1 duration-200">
             <div className="bg-blue-50 p-4 rounded-lg border border-blue-100">
               <p className="text-sm text-blue-800 font-medium">Select a new slot on your calendar to reschedule this meeting.</p>
             </div>
             <CalendarView 
               hostId={meeting.hostId} 
               isHostView={true} 
               onSlotSelected={handleReschedule} 
             /> 
             <p className="text-xs text-gray-500 italic text-center">Click an available (unblocked) slot in the calendar above to move the meeting.</p>
             <Button variant="outline" onClick={() => setIsRescheduling(false)} className="w-full">
                Cancel
             </Button>
          </div>
        ) : (
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 bg-red-50 rounded-lg border border-red-100">
             <div>
               <p className="text-sm font-bold text-red-900">Cancel Session</p>
               <p className="text-xs text-red-700">This will notify the student and remove the event from all calendars.</p>
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
