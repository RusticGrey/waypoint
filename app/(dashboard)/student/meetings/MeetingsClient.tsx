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
    <div className="p-8 space-y-8 max-w-7xl mx-auto">
      <section className="space-y-6">
        <div className="space-y-2">
          <h1 className="text-4xl font-bold text-gray-900">Meetings & Schedule</h1>
          <p className="text-gray-600">View your sessions, manage bookings, and connect with counselors</p>
        </div>

        {/* Main Content: Meetings on Left, Booking on Right */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
          {/* Meetings List - Takes up more space */}
          <div className="lg:col-span-3 space-y-6">
            <div className="space-y-3">
              <h2 className="text-2xl font-semibold text-gray-900 flex items-center gap-2">
                📋 My Meetings
              </h2>
              <p className="text-sm text-gray-600">Your upcoming and past sessions</p>
            </div>
            <StudentMeetingList studentId={studentId} />
          </div>

          {/* Booking Section - Compact on right */}
          <div className="lg:col-span-2 space-y-4">
            <h2 className="text-xl font-semibold text-gray-900 flex items-center gap-2">
              ➕ New Booking
            </h2>

            {/* Consolidated Booking Card */}
            <div className="bg-white border border-gray-200 rounded-lg p-4 space-y-4">
              <div className="space-y-2">
                <label className="text-xs font-bold text-gray-600 uppercase block">Available Counselors</label>
                <HostSelector onSelect={setSelectedHostId} />
              </div>

              {selectedHostId ? (
                <div className="space-y-2 border-t pt-4">
                  <label className="text-xs font-bold text-gray-600 uppercase block">Available Times</label>
                  <SimpleSlotPicker hostId={selectedHostId} onSlotSelected={handleSlotSelected} />
                </div>
              ) : (
                <p className="text-xs text-gray-500 text-center py-4">Choose a counselor above</p>
              )}
            </div>
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
