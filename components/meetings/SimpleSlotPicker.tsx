'use client';

import { useState, useEffect } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ux } from '@/lib/ux';
import { cn } from '@/lib/utils';

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
  const [userTimezone, setUserTimezone] = useState('UTC');
  const [hostTimezone, setHostTimezone] = useState('UTC');
  
  const [days, setDays] = useState<Date[]>([]);

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
    if (!selectedDate) setSelectedDate(d[0]);
  }, []);

  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      try {
        // Fetch zones
        const prefRes = await fetch('/api/user/settings/preferences');
        if (prefRes.ok) {
          const prefData = await prefRes.json();
          setUserTimezone(prefData.timezone || 'UTC');
        }

        const hostRes = await fetch(`/api/counselor/users?id=${hostId}`);
        if (hostRes.ok) {
          const hostData = await hostRes.json();
          // The API might return an array or single user
          const host = Array.isArray(hostData.users) ? hostData.users[0] : hostData;
          if (host?.timezone) setHostTimezone(host.timezone);
        }

        const availRes = await fetch(`/api/counselor/availability?counselorId=${hostId}`);
        const availData = await availRes.json();
        setAvailability(Array.isArray(availData) ? availData : []);

        const now = new Date();
        const futureDate = new Date();
        futureDate.setDate(now.getDate() + 14);

        const occupiedRes = await fetch(`/api/meetings/occupied-slots?hostId=${hostId}&days=14`);
        const occupiedData = await occupiedRes.json();
        const appOccupied = Array.isArray(occupiedData) ? occupiedData : [];

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

      const isOccupied = occupiedSlots.some((occupied) => {
        const occStart = new Date(occupied.startTime);
        const occEnd = new Date(occupied.endTime);
        return !(slotEnd <= occStart || slotStart >= occEnd);
      });

      if (!isOccupied && slotStart > new Date()) {
        slots.push({
          start: new Date(slotStart),
          end: new Date(slotEnd),
          label: slotStart.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', timeZone: userTimezone })
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

  if (loading) return <div className="p-8 text-center text-slate-400 italic animate-pulse">Checking availability...</div>;

  if (availability.length === 0) {
    return (
      <Card variant="base" className="bg-amber-50 border-amber-200">
        <CardContent className="p-6 text-center text-amber-800 text-sm font-medium">
          Counselor has not set availability hours yet.
        </CardContent>
      </Card>
    );
  }

  const currentSlots = selectedDate ? getSlotsForDate(selectedDate) : [];

  return (
    <div className="space-y-6">
      {/* Date Selector */}
      <div>
        <div className="flex justify-between items-end mb-3">
          <label className={ux.form.label + " mb-0"}>Select Date</label>
          <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Next 14 Days</span>
        </div>
        <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
          {days.map((date) => {
            const isSelected = selectedDate?.toDateString() === date.toDateString();
            return (
              <button
                key={date.toISOString()}
                onClick={() => handleDateSelect(date)}
                className={cn(
                  "flex flex-col items-center justify-center min-w-[72px] h-20 rounded-2xl border-2 transition-all",
                  isSelected
                    ? "bg-brand-600 text-white border-brand-600 shadow-lg shadow-brand-100 scale-105"
                    : "bg-white text-slate-600 border-slate-100 hover:border-brand-200 hover:bg-brand-50/30"
                )}
              >
                <span className={cn("text-[10px] font-black uppercase tracking-tighter mb-1", isSelected ? "text-brand-100" : "text-slate-400")}>
                  {date.toLocaleDateString('en-US', { weekday: 'short' })}
                </span>
                <span className="text-xl font-black">{date.getDate()}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Time Selector */}
      <div className="pt-2">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 mb-4">
          <label className={ux.form.label + " mb-0"}>Available Times</label>
          <div className="flex items-center gap-2 px-3 py-1 bg-surface-muted rounded-full border border-slate-200">
            <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse"></span>
            <span className="text-[10px] font-black text-slate-600 uppercase tracking-widest">
              Showing in {userTimezone}
            </span>
          </div>
        </div>
        
        {selectedDate ? (
          currentSlots.length > 0 ? (
            <div className="grid grid-cols-3 sm:grid-cols-4 gap-2 max-h-[320px] overflow-y-auto p-1">
              {currentSlots.map((slot, idx) => {
                const isSelected = selectedTimeSlot?.start.getTime() === slot.start.getTime();
                return (
                  <button
                    key={idx}
                    onClick={() => handleTimeSelect(slot)}
                    className={cn(
                      "py-3 px-2 text-xs font-bold rounded-xl border transition-all",
                      isSelected
                        ? "bg-brand-50 text-brand-700 border-brand-600 shadow-sm"
                        : "bg-white text-slate-600 border-slate-200 hover:border-brand-300 hover:text-brand-600"
                    )}
                  >
                    {slot.label}
                  </button>
                );
              })}
            </div>
          ) : (
            <div className="py-12 text-center bg-surface-soft rounded-2xl text-slate-400 border-2 border-dashed border-slate-200 italic text-sm">
              No available slots on this date.
            </div>
          )
        ) : (
          <div className="py-8 text-center text-slate-400 italic text-sm">Please select a date above.</div>
        )}
      </div>

      <Button 
        className="w-full h-12 text-base shadow-xl shadow-brand-100" 
        disabled={!selectedTimeSlot}
        onClick={handleConfirm}
      >
        {selectedTimeSlot ? 'Confirm & Book' : 'Choose a Time Slot'}
      </Button>
      
      <p className="text-[10px] text-center text-slate-400 font-medium px-4">
        Counselor's working hours are set in their local timezone ({hostTimezone}). We've automatically converted them to your timezone ({userTimezone}).
      </p>
    </div>
  );
}
