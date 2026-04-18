'use client';

import { useState, useEffect, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import { BookingModal } from './BookingModal';
import { ux } from '@/lib/ux';
import { cn } from '@/lib/utils';

interface CalendarViewProps {
  hostId: string;
  isHostView?: boolean;
  refreshKey?: number;
  onSlotSelected?: (start: Date, end: Date) => void;
}

export function CalendarView({ hostId, isHostView = false, refreshKey = 0, onSlotSelected }: CalendarViewProps) {
  const [busy, setBusy] = useState<any[]>([]);
  const [meetings, setMeetings] = useState<any[]>([]);
  const [pendingRequests, setPendingRequests] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentWeek, setCurrentWeek] = useState(new Date());
  const [selectedSlot, setSelectedSlot] = useState<{ start: Date; end: Date } | null>(null);
  const [userTimezone, setUserTimezone] = useState('UTC');
  const router = useRouter();

  const startOfWeek = useMemo(() => {
    const date = new Date(currentWeek);
    date.setHours(0, 0, 0, 0);
    const day = date.getDay();
    const diff = date.getDate() - day;
    return new Date(date.setDate(diff));
  }, [currentWeek]);

  const endOfWeek = useMemo(() => {
    const date = new Date(startOfWeek);
    date.setDate(startOfWeek.getDate() + 7);
    return date;
  }, [startOfWeek]);

  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      try {
        const prefRes = await fetch('/api/user/settings/preferences');
        if (prefRes.ok) {
          const prefData = await prefRes.json();
          if (prefData.timezone) setUserTimezone(prefData.timezone);
        }

        const fbRes = await fetch(
          `/api/integrations/calendar/freebusy?hostId=${hostId}&timeMin=${startOfWeek.toISOString()}&timeMax=${endOfWeek.toISOString()}`
        );
        const fbData = await fbRes.json();
        setBusy(fbData.busy || []);

        const meetRes = await fetch(`/api/meetings/scheduled?status=Upcoming`);
        const meetData = await meetRes.json();
        const appMeetings = Array.isArray(meetData) ? meetData.filter((m: any) => String(m.hostId) === String(hostId)) : [];
        setMeetings(appMeetings);

        if (isHostView) {
          const reqRes = await fetch(`/api/meetings/requests?status=Pending`);
          const reqData = await reqRes.json();
          const appRequests = Array.isArray(reqData) ? reqData.filter((r: any) => String(r.hostId) === String(hostId)) : [];
          setPendingRequests(appRequests);
        }
      } catch (error) {
        console.error('Failed to fetch calendar data:', error);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, [hostId, currentWeek, isHostView, startOfWeek, endOfWeek, refreshKey]);

  const nextWeek = () => {
    const next = new Date(currentWeek);
    next.setDate(currentWeek.getDate() + 7);
    setCurrentWeek(next);
  };

  const prevWeek = () => {
    const prev = new Date(currentWeek);
    prev.setDate(currentWeek.getDate() - 7);
    setCurrentWeek(prev);
  };

  const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  // Extended range: 6 AM to 11 PM
  const intervals = Array.from({ length: 34 }, (_, i) => ({
    hour: Math.floor(i / 2) + 6,
    minute: (i % 2) * 30
  }));

  const getSlotContent = (date: Date) => {
    const time = date.getTime();
    
    const meeting = meetings.find((m: any) => {
      const mStart = new Date(m.startTime).getTime();
      const mEnd = new Date(m.endTime).getTime();
      return time >= mStart && time < mEnd;
    });

    if (meeting) return { type: 'meeting', data: meeting };

    if (isHostView) {
      const request = pendingRequests.find((r: any) => {
        const rStart = new Date(r.requestedStart).getTime();
        const rEnd = new Date(r.requestedEnd).getTime();
        return time >= rStart && time < rEnd;
      });
      if (request) return { type: 'request', data: request };
    }

    const isBusy = busy.some((b: any) => {
      const bStart = new Date(b.start).getTime();
      const bEnd = new Date(b.end).getTime();
      return time >= bStart && time < bEnd;
    });

    if (isBusy) return { type: 'busy' };

    return null;
  };

  const handleSlotClick = (dayIndex: number, hour: number, minute: number) => {
    const start = new Date(startOfWeek);
    start.setDate(startOfWeek.getDate() + dayIndex);
    start.setHours(hour, minute, 0, 0);
    
    const end = new Date(start);
    end.setMinutes(start.getMinutes() + 30);

    const content = getSlotContent(start);

    if (isHostView) {
      if (content?.type === 'meeting') {
        router.push(`./meetings/${content.data.id}`);
        return;
      }
      if (onSlotSelected && !content) {
        onSlotSelected(start, end);
        return;
      }
      return;
    }

    if (!content) {
      setSelectedSlot({ start, end });
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden w-full">
      <div className="flex flex-col sm:flex-row items-center justify-between p-4 border-b border-slate-100 bg-surface-soft/50 gap-4">
        <div className="flex flex-col">
          <h2 className={cn(ux.text.subheading, "text-base leading-none")}>
            {startOfWeek.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })} - {endOfWeek.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
          </h2>
          <span className="text-[9px] font-black text-brand-600 uppercase tracking-widest mt-1">Showing in {userTimezone}</span>
        </div>
        <div className="flex items-center gap-4">
           <div className="hidden lg:flex gap-3 text-[8px] font-black uppercase tracking-widest text-slate-400">
              <div className="flex items-center gap-1"><span className="w-2 h-2 bg-brand-500 rounded-full"></span> Confirmed</div>
              <div className="flex items-center gap-1"><span className="w-2 h-2 bg-amber-400 rounded-full"></span> Requests</div>
              <div className="flex items-center gap-1"><span className="w-2 h-2 bg-slate-200 rounded-full"></span> Blocked</div>
           </div>
          <div className="flex bg-white border border-slate-200 rounded-lg overflow-hidden shadow-sm">
            <button onClick={prevWeek} className="px-3 py-1.5 hover:bg-surface-soft border-r border-slate-100 transition-colors font-bold text-slate-600 text-xs">←</button>
            <button onClick={nextWeek} className="px-3 py-1.5 hover:bg-surface-soft transition-colors font-bold text-slate-600 text-xs">→</button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-8 border-b border-slate-100 bg-surface-soft/30">
        <div className="p-2 border-r border-slate-100"></div>
        {days.map((day, i) => {
          const date = new Date(startOfWeek);
          date.setDate(startOfWeek.getDate() + i);
          const isToday = new Date().toDateString() === date.toDateString();
          return (
            <div key={day} className={cn("p-2 text-center border-r border-slate-100 last:border-r-0", isToday && "bg-brand-50/50")}>
              <div className={cn("text-[9px] font-black uppercase tracking-tighter", isToday ? "text-brand-600" : "text-slate-400")}>{day}</div>
              <div className={cn("text-sm font-black", isToday ? "text-brand-700" : "text-slate-900")}>{date.getDate()}</div>
            </div>
          );
        })}
      </div>

      <div className="max-h-[500px] overflow-y-auto relative no-scrollbar bg-white">
        {loading && (
          <div className="absolute inset-0 bg-white/60 backdrop-blur-[1px] z-10 flex items-center justify-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-brand-600"></div>
          </div>
        )}
        <div className="relative">
          {intervals.map(({ hour, minute }) => (
            <div key={`${hour}-${minute}`} className="grid grid-cols-8 border-b border-slate-50 last:border-b-0">
              {/* Ultra Compact Height: 28px */}
              <div className="px-1 h-[28px] text-right text-[8px] font-black text-slate-300 border-r border-slate-100 bg-surface-soft/10 flex items-center justify-end">
                {minute === 0 ? (hour > 12 ? `${hour - 12} PM` : hour === 12 ? '12 PM' : `${hour} AM`) : ''}
              </div>
              {days.map((_, i) => {
                const slotDate = new Date(startOfWeek);
                slotDate.setDate(startOfWeek.getDate() + i);
                slotDate.setHours(hour, minute, 0, 0);
                const content = getSlotContent(slotDate);

                return (
                  <div
                    key={i}
                    onClick={() => handleSlotClick(i, hour, minute)}
                    className={cn(
                      "h-[28px] border-r border-slate-50 last:border-r-0 transition-all relative",
                      (!content && !isHostView) || (isHostView && content?.type === 'meeting') ? 'hover:bg-brand-50/30 cursor-pointer group' : 'bg-transparent'
                    )}
                  >
                    {content?.type === 'meeting' && (
                      <div className="absolute inset-0.5 bg-brand-600 text-white rounded p-0.5 shadow-sm text-[8px] overflow-hidden leading-tight font-bold border border-brand-700 z-1 flex items-center justify-center">
                        <div className="truncate">{content.data.student.user.firstName}</div>
                      </div>
                    )}
                    {content?.type === 'request' && (
                      <div className="absolute inset-0.5 bg-amber-100 text-amber-900 rounded p-0.5 shadow-sm text-[8px] overflow-hidden leading-tight font-bold border border-amber-300 z-1 flex items-center justify-center">
                        <div className="truncate">{content.data.student.user.firstName}</div>
                      </div>
                    )}
                    {content?.type === 'busy' && (
                      <div className="absolute inset-0.5 bg-slate-50 rounded flex items-center justify-center border border-slate-100">
                        <div className="w-1 h-1 bg-slate-200 rounded-full"></div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          ))}
        </div>
      </div>

      {selectedSlot && (
        <BookingModal
          hostId={hostId}
          startTime={selectedSlot.start}
          endTime={selectedSlot.end}
          onClose={() => setSelectedSlot(null)}
          onSuccess={() => {
            setSelectedSlot(null);
            alert('Meeting request sent!');
            setLoading(true);
          }}
        />
      )}
    </div>
  );
}
