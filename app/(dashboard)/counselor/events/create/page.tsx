'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';

export default function CreateEventPage() {
  const router = useRouter();
  const [counselors, setCounselors] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    location: '',
    startDate: '',
    endDate: '',
    dailyStartTime: '09:00',
    dailyEndTime: '17:00',
    slotDuration: 30,
    counselorIds: [] as string[],
  });

  useEffect(() => {
    fetchCounselors();
  }, []);

  const fetchCounselors = async () => {
    const res = await fetch('/api/counselor/events/counselors');
    const data = await res.json();
    setCounselors(data);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch('/api/counselor/events/events', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          startDate: new Date(formData.startDate).toISOString(),
          endDate: new Date(formData.endDate).toISOString(),
        }),
      });

      if (res.ok) {
        router.push('/counselor/events');
      } else {
        const error = await res.json();
        alert(JSON.stringify(error));
      }
    } catch (error) {
      console.error('Error creating event:', error);
    } finally {
      setLoading(false);
    }
  };

  const toggleCounselor = (id: string) => {
    setFormData(prev => ({
      ...prev,
      counselorIds: prev.counselorIds.includes(id)
        ? prev.counselorIds.filter(cid => cid !== id)
        : [...prev.counselorIds, id]
    }));
  };

  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-slate-900 mb-8">Create Event</h1>
      
      <form onSubmit={handleSubmit} className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Event Details</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <label className="block text-sm font-black text-slate-700 uppercase tracking-widest text-[10px] mb-2">Title</label>
              <Input 
                required
                className="bg-white text-slate-900 border-slate-200 focus:ring-blue-500 font-medium"
                value={formData.title}
                onChange={(e) => setFormData({...formData, title: e.target.value})}
                placeholder="e.g. Mumbai School Fair 2026"
              />
            </div>
            <div>
              <label className="block text-sm font-black text-slate-700 uppercase tracking-widest text-[10px] mb-2">Description (Optional)</label>
              <Textarea 
                className="bg-white text-slate-900 border-slate-200 focus:ring-blue-500 font-medium"
                value={formData.description}
                onChange={(e) => setFormData({...formData, description: e.target.value})}
                placeholder="Details about the event..."
              />
            </div>
            <div>
              <label className="block text-sm font-black text-slate-700 uppercase tracking-widest text-[10px] mb-2">Location</label>
              <Input 
                required
                className="bg-white text-slate-900 border-slate-200 focus:ring-blue-500 font-medium"
                value={formData.location}
                onChange={(e) => setFormData({...formData, location: e.target.value})}
                placeholder="e.g. Taj Hotel, Powai"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-black text-slate-700 uppercase tracking-widest text-[10px] mb-2">Start Date</label>
                <Input 
                  required
                  type="date"
                  className="bg-white text-slate-900 border-slate-200 focus:ring-blue-500 font-medium"
                  value={formData.startDate}
                  onChange={(e) => setFormData({...formData, startDate: e.target.value})}
                />
              </div>
              <div>
                <label className="block text-sm font-black text-slate-700 uppercase tracking-widest text-[10px] mb-2">End Date</label>
                <Input 
                  required
                  type="date"
                  className="bg-white text-slate-900 border-slate-200 focus:ring-blue-500 font-medium"
                  value={formData.endDate}
                  onChange={(e) => setFormData({...formData, endDate: e.target.value})}
                />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Counselors & Capacity</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-2">
              {counselors.map(c => (
                <button
                  key={c.id}
                  type="button"
                  onClick={() => toggleCounselor(c.id)}
                  className={`p-3 text-left border rounded-md transition-colors ${
                    formData.counselorIds.includes(c.id) 
                      ? 'border-blue-600 bg-blue-50 text-blue-700 font-bold shadow-sm' 
                      : 'border-slate-200 hover:bg-slate-50 text-slate-700 font-medium'
                  }`}
                >
                  {c.name}
                </button>
              ))}
            </div>
            <p className="mt-2 text-xs text-slate-500 font-medium">
              Capacity per slot will be equal to the number of counselors selected.
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Timeslot Settings</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-black text-slate-700 uppercase tracking-widest text-[10px] mb-2">Daily Start Time</label>
                <Input 
                  type="time"
                  className="bg-white text-slate-900 border-slate-200 focus:ring-blue-500 font-medium"
                  value={formData.dailyStartTime}
                  onChange={(e) => setFormData({...formData, dailyStartTime: e.target.value})}
                />
              </div>
              <div>
                <label className="block text-sm font-black text-slate-700 uppercase tracking-widest text-[10px] mb-2">Daily End Time</label>
                <Input 
                  type="time"
                  className="bg-white text-slate-900 border-slate-200 focus:ring-blue-500 font-medium"
                  value={formData.dailyEndTime}
                  onChange={(e) => setFormData({...formData, dailyEndTime: e.target.value})}
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Base Slot Duration (minutes)</label>
              <select 
                className="w-full h-10 px-3 bg-slate-50 text-slate-900 border border-slate-200 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={formData.slotDuration}
                onChange={(e) => setFormData({...formData, slotDuration: parseInt(e.target.value)})}
              >
                <option value={15}>15 minutes</option>
                <option value={30}>30 minutes</option>
                <option value={60}>60 minutes</option>
              </select>
            </div>
          </CardContent>
        </Card>

        <div className="flex gap-4">
          <Button type="submit" className="flex-1" disabled={loading || formData.counselorIds.length === 0}>
            {loading ? 'Creating Event...' : 'Generate Slots & Create Event'}
          </Button>
          <Button type="button" variant="outline" onClick={() => router.back()}>
            Cancel
          </Button>
        </div>
      </form>
    </div>
  );
}
