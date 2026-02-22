'use client';

import { useState, useEffect } from 'react';
import { BookingModal } from './BookingModal';

interface CalendarViewProps {
  hostId: string;
  isHostView?: boolean;
}

export function CalendarView({ hostId, isHostView = false }: CalendarViewProps) {
  const [busy, setBusy] = useState<any[]>([]);
  const [scheduledMeetings, setScheduledMeetings] = useState<any[]>([]);
  const [pendingRequests, setPendingRequests] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentWeek, setCurrentWeek] = useState(new Date());
  const [selectedSlot, setSelectedSlot] = useState<{ start: Date; end: Date } | null>(null);

  // Helper function to consistently calculate week start
  const getStartOfWeek = (d: Date) => {
    const date = new Date(d);
    date.setHours(0, 0, 0, 0);
    const day = date.getDay();
    const diff = date.getDate() - day;
    return new Date(date.setDate(diff));
  };

  const startOfWeek = getStartOfWeek(currentWeek);
  const endOfWeek = new Date(startOfWeek);
  endOfWeek.setDate(startOfWeek.getDate() + 7);

  useEffect(() => {
    async function fetchData() {
      setLoading(true);

      try {
        // 1. Fetch Google Calendar FreeBusy for the host
        const fbRes = await fetch(
          `/api/integrations/calendar/freebusy?hostId=${hostId}&timeMin=${startOfWeek.toISOString()}&timeMax=${endOfWeek.toISOString()}`
        );
        const fbData = await fbRes.json();
        setBusy(fbData.busy || []);

        // 2. Fetch Waypoint Scheduled Meetings for the host
        const meetRes = await fetch(`/api/meetings/scheduled?status=Upcoming`);
        const meetData = await meetRes.json();
        setScheduledMeetings(meetData.filter((m: any) => m.hostId === hostId));

        // 3. Fetch Pending Requests for the host (to show as tentative)
        // Only if isHostView is true, or if we want students to see "Tentative" blocks as busy (which GCal handles, but visual distinction is nice)
        if (isHostView) {
          const reqRes = await fetch(`/api/meetings/requests?status=Pending`);
          const reqData = await reqRes.json();
          setPendingRequests(reqData.filter((r: any) => r.hostId === hostId));
        }

      } catch (error) {
        console.error('Failed to fetch calendar data:', error);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, [hostId, currentWeek, isHostView, startOfWeek, endOfWeek]);

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
  const hours = Array.from({ length: 12 }, (_, i) => i + 8); // 8 AM to 8 PM

  const getSlotContent = (date: Date) => {
    const time = date.getTime();
    
    // 1. Check Confirmed Meetings
    const meeting = scheduledMeetings.find((m: any) => {
      const mStart = new Date(m.startTime).getTime();
      const mEnd = new Date(m.endTime).getTime();
      return time >= mStart && time < mEnd;
    });

    if (meeting) {
      return { type: 'meeting', data: meeting };
    }

    // 2. Check Pending Requests (Host View Only)
    // Note: Pending requests are already on GCal as "Busy", so we check this BEFORE GCal busy check
    // to give it a specific "Request" style instead of generic "Busy"
    if (isHostView) {
      const request = pendingRequests.find((r: any) => {
        const rStart = new Date(r.requestedStart).getTime();
        const rEnd = new Date(r.requestedEnd).getTime();
        return time >= rStart && time < rEnd;
      });
      if (request) {
        return { type: 'request', data: request };
      }
    }

    // 3. Check Google Busy
    const isBusy = busy.some((b: any) => {
      const bStart = new Date(b.start).getTime();
      const bEnd = new Date(b.end).getTime();
      return time >= bStart && time < bEnd;
    });

    if (isBusy) {
      return { type: 'busy' };
    }

    return null;
  };

  const handleSlotClick = (dayIndex: number, hour: number) => {
    if (isHostView) return; // Hosts don't book via this modal

    const start = new Date(startOfWeek);
    start.setDate(startOfWeek.getDate() + dayIndex);
    start.setHours(hour, 0, 0, 0);
    
    const end = new Date(start);
    end.setHours(hour + 1);

    const content = getSlotContent(start);
    if (!content) {
      setSelectedSlot({ start, end });
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
      <div className="flex flex-col sm:flex-row items-center justify-between p-4 border-b border-gray-200 bg-gray-50 gap-4">
        <h2 className="font-bold text-gray-900 text-lg">
          {startOfWeek.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
        </h2>
        <div className="flex items-center gap-4">
           <div className="hidden md:flex gap-3 text-[10px] mr-4 font-bold uppercase tracking-tight">
              <div className="flex items-center gap-1"><span className="w-3 h-3 bg-blue-500 rounded"></span> Confirmed</div>
              {isHostView && <div className="flex items-center gap-1"><span className="w-3 h-3 bg-yellow-400 rounded"></span> Requested</div>}
              <div className="flex items-center gap-1"><span className="w-3 h-3 bg-gray-300 rounded"></span> Busy</div>
           </div>
          <div className="flex border rounded shadow-sm overflow-hidden">
            <button onClick={prevWeek} className="p-2 hover:bg-gray-100 bg-white border-r transition-all active:bg-gray-200">←</button>
            <button onClick={nextWeek} className="p-2 hover:bg-gray-100 bg-white transition-all active:bg-gray-200">→</button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-8 border-b border-gray-200">
        <div className="p-2 border-r border-gray-200 bg-gray-50/50"></div>
        {days.map((day, i) => {
          const date = new Date(startOfWeek);
          date.setDate(startOfWeek.getDate() + i);
          const isToday = new Date().toDateString() === date.toDateString();
          return (
            <div key={day} className={`p-2 text-center border-r border-gray-200 last:border-r-0 ${isToday ? 'bg-blue-50/50' : 'bg-gray-50/30'}`}>
              <div className={`text-[10px] font-bold uppercase ${isToday ? 'text-blue-600' : 'text-gray-400'}`}>{day}</div>
              <div className={`text-sm font-bold ${isToday ? 'text-blue-700' : 'text-gray-900'}`}>{date.getDate()}</div>
            </div>
          );
        })}
      </div>

      <div className="max-h-[600px] overflow-y-auto relative bg-gray-50/10">
        {loading && (
          <div className="absolute inset-0 bg-white/50 backdrop-blur-[1px] z-10 flex items-center justify-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
          </div>
        )}
        {hours.map((hour) => (
          <div key={hour} className="grid grid-cols-8 border-b border-gray-100 last:border-b-0">
            <div className="p-2 text-right text-[10px] font-bold text-gray-400 border-r border-gray-200 bg-gray-50/50 flex flex-col justify-center">
              {hour > 12 ? `${hour - 12} PM` : hour === 12 ? '12 PM' : `${hour} AM`}
            </div>
            {days.map((_, i) => {
              const slotDate = new Date(startOfWeek);
              slotDate.setDate(startOfWeek.getDate() + i);
              slotDate.setHours(hour, 0, 0, 0);
              const content = getSlotContent(slotDate);

              return (
                <div
                  key={i}
                  onClick={() => handleSlotClick(i, hour)}
                  className={`p-1 border-r border-gray-100 last:border-r-0 min-h-[80px] transition-all relative ${
                    !content && !isHostView ? 'hover:bg-blue-50/50 cursor-pointer group' : 'bg-transparent'
                  }`}
                >
                  {content?.type === 'meeting' && (
                    <div className="absolute inset-1 bg-blue-500 text-white rounded p-1.5 shadow-sm text-[10px] overflow-hidden leading-tight font-medium border border-blue-600 animate-in fade-in zoom-in duration-200">
                      <div className="font-bold truncate">{content.data.meetingType}</div>
                      <div className="truncate opacity-90">
                        {isHostView ? `Student: ${content.data.student.user.firstName}` : `Confirmed`}
                      </div>
                    </div>
                  )}
                  {content?.type === 'request' && (
                    <div className="absolute inset-1 bg-yellow-100 text-yellow-800 rounded p-1.5 shadow-sm text-[10px] overflow-hidden leading-tight font-medium border border-yellow-300 animate-pulse">
                      <div className="font-bold truncate">REQUEST</div>
                      <div className="truncate opacity-90">{content.data.student.user.firstName}</div>
                    </div>
                  )}
                  {content?.type === 'busy' && (
                    <div className="absolute inset-1 bg-gray-200/80 rounded flex items-center justify-center border border-gray-300">
                      <span className="text-[10px] text-gray-500 font-bold italic tracking-tighter uppercase">Blocked</span>
                    </div>
                  )}
                  {!content && !isHostView && (
                    <div className="hidden group-hover:flex absolute inset-1 bg-blue-50 border-2 border-blue-300 border-dashed rounded items-center justify-center text-[10px] text-blue-600 font-bold uppercase transition-all">
                      Available
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        ))}
      </div>

      {selectedSlot && (
        <BookingModal
          hostId={hostId}
          startTime={selectedSlot.start}
          endTime={selectedSlot.end}
          onClose={() => setSelectedSlot(null)}
          onSuccess={() => {
            setSelectedSlot(null);
            alert('Meeting request sent! It will appear on the calendar once your counselor accepts it.');
            // Trigger a refresh by re-fetching data
            setLoading(true);
          }}
        />
      )}
    </div>
  );
}
