'use client';

import { useState, useEffect } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import Link from 'next/link';
import { ux } from '@/lib/ux';
import { cn } from '@/lib/utils';

export default function EventDetailPage({ params }: { params: { eventId: string } }) {
  const [event, setEvent] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchEvent();
  }, []);

  const fetchEvent = async () => {
    try {
      const res = await fetch(`/api/counselor/events/events/${params.eventId}`);
      const data = await res.json();
      setEvent(data);
    } catch (error) {
      console.error('Error fetching event:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <p className="p-8">Loading event details...</p>;
  if (!event) return <p className="p-8">Event not found.</p>;

  const allBookings = event.slots?.flatMap((slot: any) => 
    slot.signups?.map((s: any) => ({ ...s, slotTime: slot.startTime }))
  ) || [];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-6">
        <Link href="/counselor/events" className="text-blue-600 font-black uppercase text-[10px] tracking-widest hover:underline flex items-center gap-1 mb-4">
          ← Back to Events
        </Link>
      </div>

      <div className="mb-8 flex justify-between items-start border-b border-slate-100 pb-6">
        <div>
          <h1 className={ux.text.heading + " text-3xl uppercase"}>{event.title}</h1>
          <p className={ux.text.body + " mt-1 font-bold"}>📍 {event.location} | 📅 {new Date(event.startDate).toLocaleDateString()} - {new Date(event.endDate).toLocaleDateString()}</p>
        </div>
        <div className="flex gap-2">
           <Button variant="outline" onClick={() => window.open(`/book/${event.id}`, '_blank')}>
              View Public Page
           </Button>
           <Button onClick={() => window.location.href = `/counselor/events/live/${event.id}`}>
              Launch Live View
           </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          <Card className={cn(ux.card.base, ux.card.pop, ux.card.highlight)}>
            <CardHeader className="border-b bg-slate-50/30 py-4 relative z-10">
              <CardTitle className={ux.text.subheading}>All Signups ({allBookings.length})</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-slate-100">
                  <thead className="bg-slate-50/50">
                    <tr>
                      <th className="px-4 py-4 text-left text-[10px] font-black text-slate-400 uppercase tracking-widest border-b">Time</th>
                      <th className="px-4 py-4 text-left text-[10px] font-black text-slate-400 uppercase tracking-widest border-b">Prospect</th>
                      <th className="px-4 py-4 text-left text-[10px] font-black text-slate-400 uppercase tracking-widest border-b">Contact</th>
                      <th className="px-4 py-4 text-left text-[10px] font-black text-slate-400 uppercase tracking-widest border-b">Counselor</th>
                      <th className="px-4 py-4 text-left text-[10px] font-black text-slate-400 uppercase tracking-widest border-b">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 bg-white">
                    {allBookings.map((booking: any) => (
                      <tr key={booking.id}>
                        <td className="px-4 py-5 text-sm whitespace-nowrap">
                          <span className="font-black text-slate-900">{new Date(booking.slotTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                          <br />
                          <span className="text-[10px] font-black text-blue-600 uppercase tracking-tight">{booking.duration} min</span>
                        </td>
                        <td className="px-4 py-5 text-sm">
                           <p className="font-black text-slate-900 uppercase tracking-tight leading-none">{booking.prospectName}</p>
                           {booking.studentGrade && <p className="mt-1.5 text-[10px] font-black text-slate-400 uppercase tracking-widest">Grade {booking.studentGrade}</p>}
                        </td>
                        <td className="px-4 py-5 text-sm">
                          <p className="text-slate-600 font-bold leading-none">{booking.prospectEmail}</p>
                          {booking.prospectPhone && <p className="mt-1.5 text-[10px] font-black text-slate-400 uppercase tracking-widest">{booking.prospectPhone}</p>}
                        </td>
                        <td className="px-4 py-5 text-sm">
                          {booking.completedByCounselor ? (
                            <div className="flex items-center gap-2">
                              <div className="w-6 h-6 rounded-full bg-green-50 border border-green-100 flex items-center justify-center text-[10px] font-black text-green-600">
                                {booking.completedByCounselor.user.firstName[0]}{booking.completedByCounselor.user.lastName[0]}
                              </div>
                              <span className="text-xs font-bold text-slate-900">{booking.completedByCounselor.user.firstName}</span>
                            </div>
                          ) : (
                            <div className="flex -space-x-2">
                              {event.assignments?.map((a: any) => (
                                <div key={a.counselorId} title={a.counselor.user.firstName} className="w-6 h-6 rounded-full bg-slate-50 border border-slate-200 flex items-center justify-center text-[8px] font-black text-slate-400 ring-2 ring-white">
                                  {a.counselor.user.firstName[0]}{a.counselor.user.lastName[0]}
                                </div>
                              ))}
                              {(!event.assignments || event.assignments.length === 0) && (
                                <span className="text-xs text-slate-400">None</span>
                              )}
                            </div>
                          )}
                        </td>
                        <td className="px-4 py-3 text-sm">
                          <Badge variant={booking.status === 'Completed' ? 'default' : booking.status === 'NoShow' ? 'destructive' : 'secondary'}>
                            {booking.status}
                          </Badge>
                        </td>
                      </tr>
                    ))}
                    {allBookings.length === 0 && (
                      <tr>
                        <td colSpan={4} className="px-4 py-8 text-center text-slate-500 font-medium">No bookings yet.</td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Counselors</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3">
                {event.assignments?.map((a: any) => (
                  <li key={a.counselorId} className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-blue-50 border border-blue-100 flex items-center justify-center text-blue-700 text-xs font-black shadow-sm">
                      {a.counselor.user.firstName[0]}{a.counselor.user.lastName[0]}
                    </div>
                    <span className="font-black text-slate-900 uppercase text-xs tracking-tight">{a.counselor.user.firstName} {a.counselor.user.lastName}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>

          <Card className={cn(ux.card.base, "shadow-sm border-slate-100")}>
            <CardHeader className="pb-2">
              <CardTitle className={ux.text.subheading + " text-sm uppercase"}>Public Link</CardTitle>
            </CardHeader>
            <CardContent>
              <Input readOnly value={`${window.location.origin}/book/${event.id}`} className="mb-3 bg-white border-slate-200 text-slate-900 font-medium" />
              <Button 
                variant="outline" 
                className="w-full"
                onClick={() => {
                  navigator.clipboard.writeText(`${window.location.origin}/book/${event.id}`);
                  alert('Copied!');
                }}
              >
                Copy Link
              </Button>
              <div className="mt-4 p-4 bg-slate-50 rounded-lg flex flex-col items-center">
                 <p className="text-xs font-bold text-slate-400 uppercase mb-2">QR Code for Brochure</p>
                 <div className="w-32 h-32 bg-white border border-slate-200 flex items-center justify-center text-[10px] text-slate-400">
                    QR Generator Placeholder
                 </div>
                 <p className="mt-2 text-[10px] text-slate-400 text-center">In production, this will show a downloadable high-res QR code.</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
