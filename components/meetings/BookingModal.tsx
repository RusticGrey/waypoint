'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Select } from '@/components/ui/select';

interface BookingModalProps {
  hostId: string;
  startTime: Date;
  endTime: Date;
  onClose: () => void;
  onSuccess: () => void;
}

export function BookingModal({ hostId, startTime, endTime, onClose, onSuccess }: BookingModalProps) {
  const [meetingType, setMeetingType] = useState('Regular');
  const [studentNote, setStudentNote] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

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

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>Request Meeting</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="text-sm text-gray-600">
            <p><strong>Time:</strong> {startTime.toLocaleString()} - {endTime.toLocaleTimeString()}</p>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Meeting Type</label>
            <Select value={meetingType} onChange={(e) => setMeetingType(e.target.value)}>
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
            <label className="text-sm font-medium">Note to Counselor (optional)</label>
            <textarea
              className="w-full min-h-[100px] p-2 border rounded-md text-sm"
              placeholder="What would you like to discuss?"
              value={studentNote}
              onChange={(e) => setStudentNote(e.target.value)}
              maxLength={500}
            />
          </div>

          {error && <p className="text-sm text-red-600 bg-red-50 p-2 rounded">{error}</p>}

          <div className="flex gap-3 pt-2">
            <Button variant="outline" className="flex-1" onClick={onClose} disabled={loading}>
              Cancel
            </Button>
            <Button className="flex-1" onClick={handleSubmit} disabled={loading}>
              {loading ? 'Submitting...' : 'Send Request'}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
