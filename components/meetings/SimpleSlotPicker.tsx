'use client';

import { useState, useEffect } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

interface SimpleSlotPickerProps {
  hostId: string;
  onSlotSelected: (startTime: Date, endTime: Date) => void;
}

export function SimpleSlotPicker({ hostId, onSlotSelected }: SimpleSlotPickerProps) {
  const [availability, setAvailability] = useState<any[]>([]);
  const [occupiedSlots, setOccupiedSlots] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedTimeSlot, setSelectedTimeSlot] = useState<{ start: Date; end: Date } | null>(null);
  
  // Days to show (e.g., next 14 days)
  const [days, setDays] = useState<Date[]>([]);

  // Initialize days
  useEffect(() => {
    const d = [];
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    for (let i = 0; i < 14; i++) {
      const next = new Date(today);
      next.setDate(today.getDate() + i);
      d.push(next);
    }
    setDays(d);
    // Select today by default if not set
    if (!selectedDate) setSelectedDate(d[0]);
  }, []);

  // Fetch data
  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      try {
        const availRes = await fetch(`/api/coordinator/availability?coordinatorId=${hostId}`);
        const availData = await availRes.json();
        setAvailability(Array.isArray(availData) ? availData : []);

        const now = new Date();
        const futureDate = new Date();
        futureDate.setDate(now.getDate() + 14);

        // Fetch Waypoint occupied
        const occupiedRes = await fetch(`/api/meetings/occupied-slots?hostId=${hostId}&days=14`);
        const occupiedData = await occupiedRes.json();
        const appOccupied = Array.isArray(occupiedData) ? occupiedData : [];

        // Fetch GCal busy
        const freeBusyRes = await fetch(`/api/integrations/calendar/freebusy?hostId=${hostId}&timeMin=${now.toISOString()}&timeMax=${futureDate.toISOString()}`);
        const freeBusyData = await freeBusyRes.json();
        const gcalBusy = Array.isArray(freeBusyData.busy) ? freeBusyData.busy.map((b: any) => ({
          startTime: b.start,
          endTime: b.end,
          type: 'google-busy'
        })) : [];

        setOccupiedSlots([...appOccupied, ...gcalBusy]);
      } catch (error) {
        console.error('Failed to fetch availability:', error);
      } finally {
        setLoading(false);
      }
    }

    if (hostId) fetchData();
  }, [hostId]);

  // Calculate slots for the selected date
  const getSlotsForDate = (date: Date) => {
    if (!availability.length) return [];

    const dayOfWeek = date.getDay();
    const dayAvail = availability.find((a) => a.dayOfWeek === dayOfWeek && a.isActive);
    
    if (!dayAvail) return [];

    const [startHour, startMin] = dayAvail.startTime.split(':').map(Number);
    const [endHour, endMin] = dayAvail.endTime.split(':').map(Number);

    let slotStart = new Date(date);
    slotStart.setHours(startHour, startMin, 0, 0);

    const dayEnd = new Date(date);
    dayEnd.setHours(endHour, endMin, 0, 0);

    const slots = [];
    
    while (slotStart < dayEnd) {
      let slotEnd = new Date(slotStart);
      slotEnd.setMinutes(slotEnd.getMinutes() + 30);

      if (slotEnd > dayEnd) break;

      // Check overlap
      const isOccupied = occupiedSlots.some((occupied) => {
        const occStart = new Date(occupied.startTime);
        const occEnd = new Date(occupied.endTime);
        return !(slotEnd <= occStart || slotStart >= occEnd);
      });

      // Check if slot is in the past
      if (!isOccupied && slotStart > new Date()) {
        slots.push({
          start: new Date(slotStart),
          end: new Date(slotEnd),
          label: slotStart.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        });
      }

      slotStart = new Date(slotEnd);
    }

    return slots;
  };

  const handleDateSelect = (date: Date) => {
    setSelectedDate(date);
    setSelectedTimeSlot(null);
  };

  const handleTimeSelect = (slot: { start: Date; end: Date }) => {
    setSelectedTimeSlot(slot);
  };

  const handleConfirm = () => {
    if (selectedTimeSlot) {
      onSlotSelected(selectedTimeSlot.start, selectedTimeSlot.end);
    }
  };

  if (loading) return <div className="p-8 text-center text-gray-500">Loading availability...</div>;

  if (availability.length === 0) {
    return (
      <Card className="bg-amber-50 border-amber-200">
        <CardContent className="p-6 text-center text-amber-800">
          Coordinator has not set availability hours yet.
        </CardContent>
      </Card>
    );
  }

  const currentSlots = selectedDate ? getSlotsForDate(selectedDate) : [];

  return (
    <Card>
      <CardHeader>
        <CardTitle>Select a Date & Time</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Date Selector */}
        <div>
          <label className="text-xs font-bold text-gray-500 uppercase mb-2 block">Date</label>
          <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
            {days.map((date) => {
              const isSelected = selectedDate?.toDateString() === date.toDateString();
              return (
                <button
                  key={date.toISOString()}
                  onClick={() => handleDateSelect(date)}
                  className={`flex flex-col items-center justify-center min-w-[70px] p-2 rounded-lg border transition-all ${
                    isSelected
                      ? 'bg-blue-600 text-white border-blue-600 shadow-md'
                      : 'bg-white text-gray-700 border-gray-200 hover:border-blue-300 hover:bg-blue-50'
                  }`}
                >
                  <span className="text-xs font-medium uppercase">{date.toLocaleDateString('en-US', { weekday: 'short' })}</span>
                  <span className="text-lg font-bold">{date.getDate()}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Time Selector */}
        <div>
          <label className="text-xs font-bold text-gray-500 uppercase mb-2 block">
            Available Times {selectedDate && `for ${selectedDate.toLocaleDateString()}`}
          </label>
          {selectedDate ? (
            currentSlots.length > 0 ? (
              <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-2 max-h-[300px] overflow-y-auto">
                {currentSlots.map((slot, idx) => {
                  const isSelected = selectedTimeSlot?.start.getTime() === slot.start.getTime();
                  return (
                    <button
                      key={idx}
                      onClick={() => handleTimeSelect(slot)}
                      className={`py-2 px-1 text-sm rounded border transition-all ${
                        isSelected
                          ? 'bg-blue-600 text-white border-blue-600'
                          : 'bg-white text-gray-700 border-gray-200 hover:border-blue-400 hover:text-blue-600'
                      }`}
                    >
                      {slot.label}
                    </button>
                  );
                })}
              </div>
            ) : (
              <div className="p-8 text-center bg-gray-50 rounded-lg text-gray-500 border border-dashed border-gray-200">
                No available slots on this date.
              </div>
            )
          ) : (
            <div className="p-4 text-gray-500">Please select a date above.</div>
          )}
        </div>

        <Button 
          className="w-full" 
          disabled={!selectedTimeSlot}
          onClick={handleConfirm}
        >
          {selectedTimeSlot ? 'Book Meeting' : 'Select a Time'}
        </Button>
      </CardContent>
    </Card>
  );
}
