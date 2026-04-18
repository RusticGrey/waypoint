'use client';

import { useState, useEffect } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { ux } from '@/lib/ux';
import { cn } from '@/lib/utils';
import { Badge } from '@/components/ui/badge';

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
    <div className={ux.layout.page}>
      <div className={cn(ux.layout.header, "flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4")}>
        <div>
          <h1 className={ux.text.heading}>Event Management</h1>
          <p className={ux.text.body}>Manage public booking events and prospective consultations.</p>
        </div>
        <Link href="/counselor/events/create">
          <Button>Create New Event</Button>
        </Link>
      </div>

      {loading ? (
        <div className="py-24 text-center">
          <p className={ux.text.body}>Loading events...</p>
        </div>
      ) : events.length === 0 ? (
        <Card variant="base" className="bg-surface-soft border-dashed border-2 py-24 text-center">
          <CardContent>
            <p className={ux.text.body + " mb-6"}>No events found in your organization.</p>
            <Link href="/counselor/events/create">
              <Button variant="outline">Create your first event</Button>
            </Link>
          </CardContent>
        </Card>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {events.map((event) => (
            <Card key={event.id} variant="pop" className={cn(ux.card.highlight, ux.card.ribbon, "h-full flex flex-col")}>
              <CardHeader className="pb-3 relative z-10">
                <div className="flex justify-between items-start gap-4">
                  <CardTitle className={cn(ux.text.subheading, "text-xl leading-tight line-clamp-2")}>
                    {event.title}
                  </CardTitle>
                  <Badge variant={event.isActive ? 'success' : 'neutral'} className="flex-shrink-0">
                    {event.isActive ? 'ACTIVE' : 'INACTIVE'}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="flex-1 flex flex-col pt-2">
                <div className="space-y-3 text-sm text-slate-600 mb-8 font-medium flex-1">
                  <p className="flex items-center gap-3"><span className="text-lg">📍</span> {event.location}</p>
                  <p className="flex items-center gap-3"><span className="text-lg">📅</span> {new Date(event.startDate).toLocaleDateString()} - {new Date(event.endDate).toLocaleDateString()}</p>
                  <p className="flex items-center gap-3"><span className="text-lg">👥</span> {event.assignments?.length || 0} Staff Assigned</p>
                  <p className="flex items-center gap-3"><span className="text-lg">⏱️</span> {event._count?.slots || 0} Total Slots</p>
                </div>
                <div className="grid grid-cols-1 gap-3">
                  <Link href={`/counselor/events/${event.id}`} className="w-full">
                    <Button variant="secondary" className="w-full">Manage Bookings</Button>
                  </Link>
                  <div className="grid grid-cols-2 gap-3">
                    <Link href={`/counselor/events/${event.id}/edit`}>
                      <Button variant="outline" className="w-full px-2">Edit</Button>
                    </Link>
                    <Button 
                      variant="outline" 
                      className="w-full px-2"
                      onClick={() => copyToClipboard(event.id)}
                    >
                      Link
                    </Button>
                  </div>
                  <Link href={`/counselor/events/live/${event.id}`} className="w-full">
                    <Button variant="ghost" className="w-full text-xs">View Live Dashboard</Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
