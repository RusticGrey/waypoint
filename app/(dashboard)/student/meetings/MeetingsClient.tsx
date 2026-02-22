'use client';

import { useState } from 'react';
import { HostSelector } from '@/components/meetings/HostSelector';
import { SimpleSlotPicker } from '@/components/meetings/SimpleSlotPicker';
import { BookingModal } from '@/components/meetings/BookingModal';
import { StudentMeetingList } from '@/components/meetings/StudentMeetingList';

interface StudentMeetingsClientProps {
  studentId: string;
}

export default function StudentMeetingsClient({ studentId }: StudentMeetingsClientProps) {
  const [selectedHostId, setSelectedHostId] = useState<string | null>(null);
  const [selectedSlot, setSelectedSlot] = useState<{ start: Date; end: Date } | null>(null);

  const handleSlotSelected = (start: Date, end: Date) => {
    setSelectedSlot({ start, end });
  };

  return (
    <div className="p-8 space-y-12 max-w-7xl mx-auto">
      <section>
        <h1 className="text-3xl font-bold mb-8 text-gray-900">Meetings & Progress</h1>
        
        <HostSelector onSelect={setSelectedHostId} />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-8">
          <div className="lg:col-span-2">
            <h2 className="text-xl font-semibold mb-4">Book a Session</h2>
            {selectedHostId ? (
              <SimpleSlotPicker hostId={selectedHostId} onSlotSelected={handleSlotSelected} />
            ) : (
              <div className="p-12 text-center border-2 border-dashed rounded-xl text-gray-400">
                Please select a counselor above to see their availability.
              </div>
            )}
          </div>
          <div className="space-y-6">
            <h2 className="text-xl font-semibold mb-4">My Dashboard</h2>
            <StudentMeetingList studentId={studentId} />
          </div>
        </div>
      </section>

      {selectedSlot && selectedHostId && (
        <BookingModal
          hostId={selectedHostId}
          startTime={selectedSlot.start}
          endTime={selectedSlot.end}
          onClose={() => setSelectedSlot(null)}
          onSuccess={() => {
            setSelectedSlot(null);
            alert('Meeting request sent! It will appear on your dashboard once accepted.');
            // Trigger refresh logic if needed, e.g. reload window or update context
             window.location.reload(); 
          }}
        />
      )}
    </div>
  );
}
