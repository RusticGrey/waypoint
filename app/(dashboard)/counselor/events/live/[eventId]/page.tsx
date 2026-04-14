'use client';

import { useState, useEffect } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { ux } from '@/lib/ux';
import { cn } from '@/lib/utils';

export default function LiveScheduleDashboard({ params }: { params: { eventId: string } }) {
  const [schedule, setSchedule] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedBooking, setSelectedBooking] = useState<any>(null);
  const [notes, setNotes] = useState('');
  const [attending, setAttending] = useState(true);

  useEffect(() => {
    fetchSchedule();
    const interval = setInterval(fetchSchedule, 30000); // Refresh every 30s
    return () => clearInterval(interval);
  }, []);

  const fetchSchedule = async () => {
    try {
      const res = await fetch(`/api/counselor/events/events/${params.eventId}`);
      const data = await res.json();
      // Flatten timeslots into a linear schedule
      const flat = data.slots?.map((slot: any) => ({
        ...slot,
        currentSignup: slot.signups?.find((s: any) => s.status === 'Confirmed') || 
                        slot.signups?.find((s: any) => ['Completed', 'NoShow'].includes(s.status))
      })) || [];
      setSchedule(flat);
    } catch (error) {
      console.error('Error fetching schedule:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleComplete = async () => {
    if (!selectedBooking) return;
    
    try {
      const res = await fetch(`/api/counselor/events/bookings/${selectedBooking.id}/complete`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          didAttend: attending,
          counselorNotes: notes,
          openNextSlot: true
        })
      });

      if (res.ok) {
        setSelectedBooking(null);
        setNotes('');
        fetchSchedule();
      }
    } catch (error) {
      console.error('Error completing booking:', error);
    }
  };

  if (loading) return <p className="p-4 text-center">Loading live schedule...</p>;

  return (
    <div className="max-w-md mx-auto px-4 pb-20 min-h-screen">
      <div className="flex items-center gap-4 py-4 sticky top-0 bg-white/95 backdrop-blur-sm z-10 border-b mb-6">
        <button onClick={() => window.location.href = '/counselor/events'} className="text-blue-600 font-black uppercase text-[10px] tracking-widest hover:underline">
          ← Back
        </button>
        <h1 className={ux.text.heading + " text-2xl uppercase"}>Live Schedule</h1>
      </div>
      
      <div className="space-y-4">
        {schedule.map((slot: any) => (
          <Card key={slot.id} className={cn(
            ux.card.base, ux.card.pop, 
            slot.currentSignup?.status === 'Confirmed' ? ux.card.highlight + " shadow-md border-blue-100 bg-blue-50/30" : "bg-white shadow-sm"
          )}>
            <CardContent className="p-5 relative z-10">
              <div className="flex justify-between items-start mb-2">
                <span className={ux.text.heading + " text-xl"}>
                  {new Date(slot.startTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </span>
                {slot.currentSignup ? (
                  <Badge variant={slot.currentSignup.status === 'Confirmed' ? 'default' : 'outline'} className="font-bold uppercase tracking-wider text-[10px]">
                    {slot.currentSignup.status}
                  </Badge>
                ) : (
                  <Badge variant="outline" className="text-slate-400 font-bold uppercase tracking-wider text-[10px]">Available</Badge>
                )}
              </div>

              {slot.currentSignup && (
                <div className="space-y-2 pt-3 border-t border-slate-100 mt-3">
                  <p className={ux.text.subheading + " text-lg"}>{slot.currentSignup.prospectName}</p>
                  <p className={ux.text.body + " text-sm"}>{slot.currentSignup.prospectEmail}</p>
                  {slot.currentSignup.status === 'Confirmed' && (
                    <Button 
                      className="w-full mt-2" 
                      onClick={() => setSelectedBooking(slot.currentSignup)}
                    >
                      Mark Complete
                    </Button>
                  )}
                </div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Completion Modal/Overlay */}
      {selectedBooking && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-end sm:items-center justify-center p-4">
          <Card className="w-full max-w-lg">
            <CardHeader>
              <CardTitle>Complete Consultation</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="font-medium">{selectedBooking.prospectName}</p>
              
              <div>
                <label className="block text-sm font-medium mb-2">Attendance</label>
                <div className="flex gap-4">
                  <Button 
                    variant={attending ? 'primary' : 'outline'} 
                    onClick={() => setAttending(true)}
                    className="flex-1"
                  >
                    Attended
                  </Button>
                  <Button 
                    variant={!attending ? 'secondary' : 'outline'} 
                    onClick={() => setAttending(false)}
                    className="flex-1"
                  >
                    No Show
                  </Button>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Notes</label>
                <Textarea 
                  className="bg-slate-50 text-slate-900 border-slate-200"
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="Quick summary of the meeting..."
                  rows={3}
                />
              </div>

              <div className="flex gap-2 pt-4">
                <Button className="flex-1" onClick={handleComplete}>Save & Close</Button>
                <Button variant="outline" onClick={() => setSelectedBooking(null)}>Cancel</Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
}
