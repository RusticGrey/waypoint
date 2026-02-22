'use client';

import { useState, useEffect } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Select } from '@/components/ui/select';

interface SimpleSlotPickerProps {
  hostId: string;
  onSlotSelected: (startTime: Date, endTime: Date) => void;
  onSuccess?: () => void;
}

export function SimpleSlotPicker({ hostId, onSlotSelected }: SimpleSlotPickerProps) {
  const [availability, setAvailability] = useState<any[]>([]);
  const [occupiedSlots, setOccupiedSlots] = useState<any[]>([]);
  const [availableSlots, setAvailableSlots] = useState<{ time: string; start: Date; end: Date }[]>([]);
  const [selectedSlot, setSelectedSlot] = useState<{ time: string; start: Date; end: Date } | null>(null);
  const [loading, setLoading] = useState(true);
  const [nextDays, setNextDays] = useState(7); // Show next 7 days by default

  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      try {
        // Fetch coordinator's availability hours
        const availRes = await fetch(`/api/coordinator/availability?coordinatorId=${hostId}`);
        const availData = await availRes.json();
        setAvailability(Array.isArray(availData) ? availData : []);

        // Fetch occupied slots (scheduled meetings + pending requests)
        const occupiedRes = await fetch(`/api/meetings/occupied-slots?hostId=${hostId}&days=${nextDays}`);
        const occupiedData = await occupiedRes.json();
        setOccupiedSlots(Array.isArray(occupiedData) ? occupiedData : []);
      } catch (error) {
        console.error('Failed to fetch availability:', error);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, [hostId, nextDays]);

  // Calculate available 30-minute slots
  useEffect(() => {
    if (!availability.length) return;

    const slots: { time: string; start: Date; end: Date }[] = [];
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    // Generate slots for next N days
    for (let dayOffset = 0; dayOffset < nextDays; dayOffset++) {
      const currentDate = new Date(today);
      currentDate.setDate(today.getDate() + dayOffset);
      const dayOfWeek = currentDate.getDay();

      // Find availability for this day
      const dayAvail = availability.find((a) => a.dayOfWeek === dayOfWeek && a.isActive);
      if (!dayAvail) continue;

      // Parse time strings (HH:MM format)
      const [startHour, startMin] = dayAvail.startTime.split(':').map(Number);
      const [endHour, endMin] = dayAvail.endTime.split(':').map(Number);

      let slotStart = new Date(currentDate);
      slotStart.setHours(startHour, startMin, 0, 0);

      let slotEnd = new Date(slotStart);
      slotEnd.setMinutes(slotEnd.getMinutes() + 30);

      const dayEnd = new Date(currentDate);
      dayEnd.setHours(endHour, endMin, 0, 0);

      // Generate 30-min slots
      while (slotEnd <= dayEnd) {
        // Check if this slot is occupied
        const isOccupied = occupiedSlots.some((occupied) => {
          const occStart = new Date(occupied.startTime);
          const occEnd = new Date(occupied.endTime);
          return !(slotEnd <= occStart || slotStart >= occEnd); // Overlaps
        });

        if (!isOccupied && slotStart > new Date()) {
          // Only show future slots
          const timeStr = slotStart.toLocaleString('en-US', {
            month: 'short',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
          });
          slots.push({ time: timeStr, start: new Date(slotStart), end: new Date(slotEnd) });
        }

        slotStart = new Date(slotEnd);
        slotEnd = new Date(slotStart);
        slotEnd.setMinutes(slotEnd.getMinutes() + 30);
      }
    }

    setAvailableSlots(slots);
  }, [availability, occupiedSlots, nextDays]);

  const handleSelectSlot = () => {
    if (selectedSlot) {
      onSlotSelected(selectedSlot.start, selectedSlot.end);
    }
  };

  if (loading) {
    return <div className="text-center py-8 text-gray-500">Loading availability...</div>;
  }

  if (!availability.length) {
    return (
      <Card className="border-amber-200 bg-amber-50">
        <CardContent className="p-6 text-center">
          <p className="text-amber-800 font-medium">Coordinator hasn't set availability yet</p>
          <p className="text-sm text-amber-700 mt-2">Ask your coordinator to set their working hours</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Select a Meeting Slot</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <label className="text-xs font-bold text-gray-500 uppercase mb-2 block">Available Times (30 min)</label>
          {availableSlots.length === 0 ? (
            <div className="p-4 text-center text-gray-500 bg-gray-50 rounded">
              No available slots in the next {nextDays} days
            </div>
          ) : (
            <Select
              value={selectedSlot?.time || ''}
              onChange={(e) => {
                const slot = availableSlots.find((s) => s.time === e.target.value);
                setSelectedSlot(slot || null);
              }}
            >
              <option value="">-- Choose a time --</option>
              {availableSlots.map((slot, idx) => (
                <option key={idx} value={slot.time}>
                  {slot.time}
                </option>
              ))}
            </Select>
          )}
        </div>

        {selectedSlot && (
          <div className="p-3 bg-blue-50 rounded border border-blue-200">
            <p className="text-sm font-medium text-blue-900">Selected: {selectedSlot.time}</p>
          </div>
        )}

        <div className="flex gap-2">
          <Button className="flex-1" onClick={handleSelectSlot} disabled={!selectedSlot}>
            Book This Slot
          </Button>
          <Button
            variant="outline"
            onClick={() => setNextDays(Math.min(nextDays + 7, 60))}
            disabled={nextDays >= 60}
          >
            Load More Dates
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
