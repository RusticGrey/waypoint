'use client';

import { useState, useEffect } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import Link from 'next/link';
import { ux } from '@/lib/ux';
import { cn } from '@/lib/utils';

export default function EventsPage() {
  const [events, setEvents] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    try {
      const res = await fetch('/api/counselor/events/events');
      const data = await res.json();
      setEvents(data);
    } catch (error) {
      console.error('Error fetching events:', error);
    } finally {
      setLoading(false);
    }
  };

  const copyToClipboard = (id: string) => {
    const url = `${window.location.origin}/book/${id}`;
    navigator.clipboard.writeText(url);
    alert('Public booking link copied to clipboard!');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="flex justify-between items-center mb-8 border-b pb-6">
        <div>
          <h1 className="text-3xl font-black text-slate-900 uppercase tracking-tight">Event Management</h1>
          <p className="text-slate-500 font-medium mt-1">Manage public booking events and prospective consultations.</p>
        </div>
        <Link href="/counselor/events/create">
          <Button>Create New Event</Button>
        </Link>
      </div>

      {loading ? (
        <p>Loading events...</p>
      ) : events.length === 0 ? (
        <Card>
          <CardContent className="py-12 text-center">
            <p className="text-gray-500 mb-4">No events found.</p>
            <Link href="/counselor/events/create">
              <Button variant="outline">Create your first event</Button>
            </Link>
          </CardContent>
        </Card>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {events.map((event) => (
            <Card key={event.id} className={cn(ux.card.base, ux.card.interactive, ux.card.pop, ux.card.highlight, ux.card.ribbon)}>
              <CardHeader className="pb-3 relative z-10">
                <CardTitle className={cn(ux.text.heading, "flex justify-between items-start text-xl leading-tight")}>
                  <span>{event.title}</span>
                  <span className={cn(
                    "px-2 py-1 rounded-full border",
                    event.isActive ? ux.badge.success : ux.badge.neutral
                  )}>
                    {event.isActive ? 'ACTIVE' : 'INACTIVE'}
                  </span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2.5 text-sm text-slate-600 mb-6 font-medium">
                  <p className="flex items-center gap-2"><span className="text-slate-400">📍</span> {event.location}</p>
                  <p className="flex items-center gap-2"><span className="text-slate-400">📅</span> {new Date(event.startDate).toLocaleDateString()} - {new Date(event.endDate).toLocaleDateString()}</p>
                  <p className="flex items-center gap-2"><span className="text-slate-400">👥</span> {event.assignments?.length || 0} Counselors Assigned</p>
                  <p className="flex items-center gap-2"><span className="text-slate-400">⏱️</span> {event._count?.slots || 0} Total Slots</p>
                </div>
                <div className="flex flex-col gap-2">
                  <Link href={`/counselor/events/${event.id}`}>
                    <Button variant="outline" className="w-full font-bold border-slate-200 text-slate-700 hover:bg-slate-50">Manage Bookings</Button>
                  </Link>
                  <Link href={`/counselor/events/${event.id}/edit`}>
                    <Button variant="outline" className="w-full">Edit Event</Button>
                  </Link>
                  <Link href={`/counselor/events/live/${event.id}`}>
                    <Button variant="outline" className="w-full">Live Dashboard (Mobile)</Button>
                  </Link>
                  <Button 
                    variant="secondary" 
                    className="w-full"
                    onClick={() => copyToClipboard(event.id)}
                  >
                    Copy Public Link
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
