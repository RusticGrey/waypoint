'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { SimpleSlotPicker } from '@/components/meetings/SimpleSlotPicker';

interface RequestManagementClientProps {
  request: any;
}

export function RequestManagementClient({ request }: RequestManagementClientProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [isRescheduling, setIsRescheduling] = useState(false);
  const [studentNote, setStudentNote] = useState(request.studentNote || '');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleUpdateNote = async () => {
    setLoading(true);
    try {
      const res = await fetch(`/api/meetings/requests/${request.id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ studentNote }),
      });
      if (res.ok) {
        setIsEditing(false);
        router.refresh();
      }
    } catch (error) {
      console.error('Update note error:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleReschedule = async (start: Date, end: Date) => {
    setLoading(true);
    try {
      const res = await fetch(`/api/meetings/requests/${request.id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          requestedStart: start.toISOString(),
          requestedEnd: end.toISOString()
        }),
      });
      if (res.ok) {
        setIsRescheduling(false);
        router.refresh();
      }
    } catch (error) {
      console.error('Reschedule error:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = async () => {
    if (!confirm('Are you sure you want to cancel this meeting request?')) return;
    setLoading(true);
    try {
      const res = await fetch(`/api/meetings/requests/${request.id}`, {
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

  const isClosed = request.status === 'Declined' || request.status === 'Cancelled';

  return (
    <div className="space-y-6 pt-4">
      {/* Reschedule Section */}
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <h2 className="text-lg font-bold text-black border-l-4 border-blue-500 pl-3 uppercase tracking-tight">Time & Schedule</h2>
          {!isRescheduling && !isClosed && (
            <button onClick={() => setIsRescheduling(true)} className="text-xs text-blue-600 font-bold hover:underline uppercase">
              Propose New Time
            </button>
          )}
        </div>

        {isRescheduling ? (
          <div className="space-y-4 animate-in fade-in slide-in-from-top-1 duration-200">
             <div className="bg-blue-50 p-4 rounded-lg border border-blue-100 mb-4">
               <p className="text-sm text-blue-800">Select a new slot below to propose a change to your counselor.</p>
             </div>
             <SimpleSlotPicker hostId={request.hostId} onSlotSelected={handleReschedule} />
             <Button variant="outline" onClick={() => setIsRescheduling(false)} className="w-full">
                Cancel Rescheduling
             </Button>
          </div>
        ) : (
          <div className="flex items-center gap-4 text-sm text-gray-700 bg-gray-50 px-4 py-3 rounded-lg border border-gray-200">
            <span className="text-lg">⏰</span>
            <span className="font-medium">Currently Requested:</span>
            <span>{new Date(request.requestedStart).toLocaleString()}</span>
          </div>
        )}
      </div>

      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <h2 className="text-lg font-bold text-black border-l-4 border-yellow-400 pl-3">Your Note to Counselor</h2>
          {!isEditing && !isClosed && (
            <button onClick={() => setIsEditing(true)} className="text-xs text-blue-600 font-bold hover:underline uppercase">
              Edit Note
            </button>
          )}
        </div>

        {isEditing ? (
          <div className="space-y-3">
            <textarea
              className="w-full text-sm p-4 border rounded-lg text-black focus:ring-2 focus:ring-blue-500 outline-none min-h-[150px]"
              value={studentNote}
              onChange={(e) => setStudentNote(e.target.value)}
              placeholder="What would you like to discuss?"
            />
            <div className="flex gap-3">
              <Button disabled={loading} onClick={handleUpdateNote} className="flex-1">
                Save Changes
              </Button>
              <Button disabled={loading} variant="outline" onClick={() => setIsEditing(false)} className="flex-1">
                Discard
              </Button>
            </div>
          </div>
        ) : (
          <div className="text-sm text-gray-700 bg-gray-50 p-4 rounded-lg italic border border-gray-200">
            {request.studentNote || "No note was added."}
          </div>
        )}
      </div>

      {!isClosed && (
        <div className="pt-8 border-t">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 bg-red-50 rounded-lg border border-red-100">
            <div>
              <p className="text-sm font-bold text-red-900">Cancel Request</p>
              <p className="text-xs text-red-700">Changed your mind? You can cancel this request before the counselor accepts it.</p>
            </div>
            <Button 
              disabled={loading} 
              variant="outline" 
              onClick={handleCancel}
              className="text-red-600 border-red-200 hover:bg-red-100 bg-white"
            >
              Cancel Meeting Request
            </Button>
          </div>
        </div>
      )}

      {isClosed && (
        <div className="bg-gray-50 border border-gray-200 p-4 rounded-lg italic text-gray-500 text-sm">
           This request is closed and cannot be modified.
        </div>
      )}
    </div>
  );
}
