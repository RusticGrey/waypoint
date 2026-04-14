'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';

export default function EditPublicEventPage({ params }: { params: { eventId: string } }) {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    location: '',
    headerText: '',
    subheaderText: '',
    isActive: true,
  });

  useEffect(() => {
    fetchEvent();
  }, []);

  const fetchEvent = async () => {
    try {
      const res = await fetch(`/api/counselor/events/events/${params.eventId}`);
      if (!res.ok) throw new Error('Failed to fetch event');
      const data = await res.json();
      setFormData({
        title: data.title,
        description: data.description || '',
        location: data.location,
        headerText: data.headerText || '',
        subheaderText: data.subheaderText || '',
        isActive: data.isActive,
      });
    } catch (error) {
      console.error('Error fetching event:', error);
      alert('Failed to load event data');
      router.push('/counselor/events');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    try {
      const res = await fetch(`/api/counselor/events/events/${params.eventId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        alert('Event updated successfully');
        router.push('/counselor/events');
      } else {
        const error = await res.json();
        alert(error.error || 'Failed to update event');
      }
    } catch (error) {
      console.error('Error updating event:', error);
      alert('An unexpected error occurred');
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <div className="p-8 text-center">Loading event data...</div>;

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="mb-8">
        <button 
          onClick={() => router.back()}
          className="text-blue-600 hover:text-blue-700 font-bold mb-4 flex items-center gap-2 hover:underline"
        >
          ← Back
        </button>
        <h1 className="text-3xl font-bold text-slate-900 tracking-tight">Edit Event</h1>
        <p className="text-slate-600 font-medium">Update event details and branding.</p>
      </div>

      <form onSubmit={handleSubmit}>
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Basic Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-5">
            <div className="space-y-2">
              <label className="text-[10px] font-black text-slate-700 uppercase tracking-widest">Event Title *</label>
              <Input 
                required
                className="bg-white text-slate-900 border-slate-200 font-medium focus:ring-blue-500"
                value={formData.title}
                onChange={e => setFormData({...formData, title: e.target.value})}
                placeholder="e.g. Mumbai Matunga Fair"
              />
            </div>
            <div className="space-y-2">
              <label className="text-[10px] font-black text-slate-700 uppercase tracking-widest">Description</label>
              <Textarea 
                className="bg-white text-slate-900 border-slate-200 font-medium focus:ring-blue-500"
                value={formData.description}
                onChange={e => setFormData({...formData, description: e.target.value})}
                placeholder="Additional details for internal use..."
              />
            </div>
            <div className="space-y-2">
              <label className="text-[10px] font-black text-slate-700 uppercase tracking-widest">Location *</label>
              <Input 
                required
                className="bg-white text-slate-900 border-slate-200 font-medium focus:ring-blue-500"
                value={formData.location}
                onChange={e => setFormData({...formData, location: e.target.value})}
                placeholder="e.g. Taj Hotel, Powai"
              />
            </div>
            <div className="flex items-center gap-2 pt-2">
              <input 
                type="checkbox"
                id="isActive"
                checked={formData.isActive}
                onChange={e => setFormData({...formData, isActive: e.target.checked})}
                className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
              />
              <label htmlFor="isActive" className="text-sm font-bold text-slate-700">Event is active and open for bookings</label>
            </div>
          </CardContent>
        </Card>

        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Public Page Branding (Engage 1-Pager)</CardTitle>
          </CardHeader>
          <CardContent className="space-y-5">
            <div className="space-y-2">
              <label className="text-[10px] font-black text-slate-700 uppercase tracking-widest">Header Text (Main Headline)</label>
              <Input 
                className="bg-white text-slate-900 border-slate-200 font-medium focus:ring-blue-500"
                value={formData.headerText}
                onChange={e => setFormData({...formData, headerText: e.target.value})}
                placeholder="e.g. YOUR GLOBAL FUTURE STARTS HERE"
              />
            </div>
            <div className="space-y-2">
              <label className="text-[10px] font-black text-slate-700 uppercase tracking-widest">Subheader Text (Tagline)</label>
              <Input 
                className="bg-white text-slate-900 border-slate-200 font-medium focus:ring-blue-500"
                value={formData.subheaderText}
                onChange={e => setFormData({...formData, subheaderText: e.target.value})}
                placeholder="e.g. Schedule your FREE 30-minute consultation"
              />
            </div>
          </CardContent>
        </Card>

        <div className="flex justify-end gap-4">
          <Button 
            type="button" 
            variant="outline"
            onClick={() => router.push('/counselor/events')}
          >
            Cancel
          </Button>
          <Button disabled={saving} type="submit">
            {saving ? 'Saving...' : 'Save Changes'}
          </Button>
        </div>
      </form>
    </div>
  );
}
