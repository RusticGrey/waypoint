'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Select } from '@/components/ui/select';
import { useSession } from 'next-auth/react';
import { ux } from '@/lib/ux';
import { cn } from '@/lib/utils';

interface BookingModalProps {
  hostId: string;
  startTime: Date;
  endTime: Date;
  onClose: () => void;
  onSuccess: () => void;
}

export function BookingModal({ hostId, startTime, endTime, onClose, onSuccess }: BookingModalProps) {
  const { data: session } = useSession();
  const [meetingType, setMeetingType] = useState('Regular');
  const [studentNote, setStudentNote] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [studentTimezone, setStudentTimezone] = useState('UTC');

  useEffect(() => {
    async function fetchPreferences() {
      try {
        const res = await fetch('/api/user/settings/preferences');
        if (res.ok) {
          const data = await res.json();
          if (data.timezone) setStudentTimezone(data.timezone);
        }
      } catch (err) {
        console.error('Failed to fetch timezone', err);
      }
    }
    fetchPreferences();
  }, []);

  const handleSubmit = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch('/api/meetings/requests', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          hostId,
          requestedStart: startTime.toISOString(),
          requestedEnd: endTime.toISOString(),
          meetingType,
          studentNote,
        }),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || 'Failed to submit request');
      }

      onSuccess();
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const formatInTimezone = (date: Date) => {
    return new Intl.DateTimeFormat('en-US', {
      dateStyle: 'medium',
      timeStyle: 'short',
      timeZone: studentTimezone
    }).format(date);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-sm p-4">
      <Card variant="base" className="w-full max-w-md shadow-2xl border-brand-100">
        <CardHeader className="border-b border-slate-100 pb-4 mb-6">
          <CardTitle>Request Meeting</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="bg-brand-50 p-4 rounded-xl border border-brand-100">
            <p className={ux.text.accent + " mb-1 opacity-70"}>Selected Slot ({studentTimezone})</p>
            <p className="text-sm font-bold text-brand-900">
              {formatInTimezone(startTime)} - {new Intl.DateTimeFormat('en-US', { timeStyle: 'short', timeZone: studentTimezone }).format(endTime)}
            </p>
          </div>

          <div className="space-y-2">
            <label className={ux.form.label}>Meeting Type</label>
            <Select value={meetingType} onChange={(e) => setMeetingType(e.target.value)} className={ux.form.input}>
              <option value="Initial">Initial Consultation</option>
              <option value="Regular">Regular Check-in</option>
              <option value="Check_In">Check-in</option>
              <option value="Goal_Review">Goal Review</option>
              <option value="Application_Review">Application Review</option>
              <option value="Crisis">Urgent Help</option>
              <option value="Final">Final Session</option>
            </Select>
          </div>

          <div className="space-y-2">
            <label className={ux.form.label}>Note to Counselor</label>
            <textarea
              className={cn(ux.form.input, "min-h-[120px] resize-none")}
              placeholder="What would you like to discuss?"
              value={studentNote}
              onChange={(e) => setStudentNote(e.target.value)}
              maxLength={500}
            />
          </div>

          {error && <p className={ux.form.error}>{error}</p>}

          <div className="flex flex-col sm:flex-row gap-3 pt-4 border-t border-slate-100">
            <Button className="flex-1 order-1 sm:order-2" onClick={handleSubmit} disabled={loading}>
              {loading ? 'Sending...' : 'Send Request'}
            </Button>
            <Button variant="outline" className="flex-1 order-2 sm:order-1" onClick={onClose} disabled={loading}>
              Cancel
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
