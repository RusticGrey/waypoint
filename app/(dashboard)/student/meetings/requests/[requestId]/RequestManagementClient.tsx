'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { SimpleSlotPicker } from '@/components/meetings/SimpleSlotPicker';
import { ux } from '@/lib/ux';
import { cn } from '@/lib/utils';

interface RequestManagementClientProps {
  request: any;
}

export function RequestManagementClient({ request }: RequestManagementClientProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [isRescheduling, setIsRescheduling] = useState(false);
  const [studentNote, setStudentNote] = useState(request.studentNote || '');
  const [loading, setLoading] = useState(false);
  const [userTimezone, setUserTimezone] = useState('UTC');
  const router = useRouter();

  useEffect(() => {
    async function fetchPreferences() {
      try {
        const res = await fetch('/api/user/settings/preferences');
        if (res.ok) {
          const data = await res.json();
          if (data.timezone) setUserTimezone(data.timezone);
        }
      } catch (err) {
        console.error('Failed to fetch timezone', err);
      }
    }
    fetchPreferences();
  }, []);

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

  const formatLocalTime = (dateStr: string) => {
    return new Date(dateStr).toLocaleString([], { 
      dateStyle: 'medium', 
      timeStyle: 'short', 
      timeZone: userTimezone 
    });
  };

  const isClosed = request.status === 'Declined' || request.status === 'Cancelled';

  return (
    <div className="space-y-10 pt-4">
      {/* Reschedule Section */}
      <section className="space-y-6">
        <div className="flex justify-between items-center">
          <h2 className={ux.text.accent}>Time & Schedule</h2>
          {!isRescheduling && !isClosed && (
            <button onClick={() => setIsRescheduling(true)} className="text-xs text-brand-600 font-black uppercase tracking-widest hover:underline">
              Propose New Time
            </button>
          )}
        </div>

        {isRescheduling ? (
          <div className="space-y-6 animate-in fade-in slide-in-from-top-2 duration-300">
             <div className="bg-brand-50 p-5 rounded-2xl border border-brand-100 mb-4">
               <p className="text-sm font-bold text-brand-900">Choose a different slot below.</p>
               <p className="text-xs text-brand-700 mt-1">This will update your pending request for the counselor to review.</p>
             </div>
             <SimpleSlotPicker hostId={request.hostId} onSlotSelected={handleReschedule} />
             <Button variant="outline" onClick={() => setIsRescheduling(false)} className="w-full">
                Cancel Changes
             </Button>
          </div>
        ) : (
          <div className="flex items-center gap-4 bg-surface-soft px-5 py-4 rounded-2xl border border-slate-100">
            <span className="text-2xl">⏰</span>
            <div className="flex flex-col">
              <span className={ux.text.accent + " mb-1 opacity-50"}>Requested Time ({userTimezone})</span>
              <span className="text-sm font-bold text-slate-900">{formatLocalTime(request.requestedStart)}</span>
            </div>
          </div>
        )}
      </section>

      <section className="space-y-6">
        <div className="flex justify-between items-center">
          <h2 className={ux.text.accent}>Student Note</h2>
          {!isEditing && !isClosed && (
            <button onClick={() => setIsEditing(true)} className="text-xs text-brand-600 font-black uppercase tracking-widest hover:underline">
              Edit Note
            </button>
          )}
        </div>

        {isEditing ? (
          <div className="space-y-4">
            <textarea
              className={cn(ux.form.input, "min-h-[160px] resize-none")}
              value={studentNote}
              onChange={(e) => setStudentNote(e.target.value)}
              placeholder="What would you like to discuss?"
            />
            <div className="flex gap-3">
              <Button disabled={loading} onClick={handleUpdateNote} className="flex-1">
                Save Note
              </Button>
              <Button disabled={loading} variant="outline" onClick={() => setIsEditing(false)} className="flex-1">
                Discard
              </Button>
            </div>
          </div>
        ) : (
          <div className="text-sm text-slate-700 bg-surface-soft p-6 rounded-2xl italic border border-slate-100 leading-relaxed">
            "{request.studentNote || "No note was added to this request."}"
          </div>
        )}
      </section>

      {!isClosed && (
        <div className="pt-10 border-t border-slate-100">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 p-6 bg-red-50 rounded-2xl border border-red-100">
            <div className="max-w-md">
              <p className="text-sm font-black text-red-900 uppercase tracking-tight mb-1">Withdraw Request</p>
              <p className="text-xs text-red-700 font-medium leading-relaxed">Changed your mind or made a mistake? You can cancel this request entirely before it's accepted.</p>
            </div>
            <Button 
              disabled={loading} 
              variant="outline" 
              onClick={handleCancel}
              className="text-red-600 border-red-200 hover:bg-red-600 hover:text-white bg-white sm:whitespace-nowrap"
            >
              Cancel Request
            </Button>
          </div>
        </div>
      )}

      {isClosed && (
        <div className="bg-surface-muted border border-slate-200 p-6 rounded-2xl italic text-slate-400 text-sm text-center">
           This request has been processed and can no longer be modified.
        </div>
      )}
    </div>
  );
}
