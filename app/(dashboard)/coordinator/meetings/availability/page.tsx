'use client';

import { useState, useEffect } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

interface AvailabilityBlock {
  dayOfWeek: number;
  startTime: string;
  endTime: string;
  isActive: boolean;
}

const DAYS = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

export default function CoordinatorAvailabilityPage() {
  const [availability, setAvailability] = useState<AvailabilityBlock[]>([
    { dayOfWeek: 0, startTime: '09:00', endTime: '17:00', isActive: false }, // Sunday
    { dayOfWeek: 1, startTime: '09:00', endTime: '17:00', isActive: true },  // Monday
    { dayOfWeek: 2, startTime: '09:00', endTime: '17:00', isActive: true },  // Tuesday
    { dayOfWeek: 3, startTime: '09:00', endTime: '17:00', isActive: true },  // Wednesday
    { dayOfWeek: 4, startTime: '09:00', endTime: '17:00', isActive: true },  // Thursday
    { dayOfWeek: 5, startTime: '09:00', endTime: '17:00', isActive: true },  // Friday
    { dayOfWeek: 6, startTime: '09:00', endTime: '17:00', isActive: false }, // Saturday
  ]);

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState('');

  useEffect(() => {
    fetchAvailability();
  }, []);

  const fetchAvailability = async () => {
    try {
      setLoading(true);
      // 'me' is a special keyword that the API understands to mean current user
      // But currently our API expects coordinatorId param. 
      // The API route currently checks: const coordinatorId = request.nextUrl.searchParams.get('coordinatorId');
      // And then fetches: where: { coordinatorId, isActive: true }
      // The API implementation actually doesn't handle 'me' specially for GET, but relies on caller providing ID.
      // However, for PATCH it uses session.user.id.
      // Let's check how to get the current user ID here.
      // Since this is a client component, we might not have session immediately available without useSession.
      // Or we can update the GET API to handle 'me' or default to session user if no ID provided.
      // Let's assume for now we need to fetch 'me' support or fetch session first.
      // For simplicity in this fix, I'll update the API to support 'me' or default to current user in GET as well.
      // But wait, the API implementation I wrote:
      // const coordinatorId = request.nextUrl.searchParams.get('coordinatorId');
      // if (!coordinatorId) return error.
      
      // Let's update the API route to handle 'me' or fetch current user if coordinatorId is missing but session exists.
      // Actually, standard practice: Client calls /api/auth/session or we update GET endpoint.
      // Let's update the GET endpoint to handle 'me' or fallback to session user.
      
      const response = await fetch(`/api/coordinator/availability?coordinatorId=me`);
      if (response.ok) {
        const data = await response.json();
        if (Array.isArray(data) && data.length > 0) {
          // Merge fetched data with default structure to ensure all days exist
          setAvailability(prev => 
            prev.map(day => {
              const fetched = data.find((d: any) => d.dayOfWeek === day.dayOfWeek);
              return fetched ? { ...day, ...fetched } : day;
            })
          );
        }
      }
    } catch (error) {
      console.error('Failed to fetch availability:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleToggleDay = (dayOfWeek: number) => {
    setAvailability((prev) =>
      prev.map((day) =>
        day.dayOfWeek === dayOfWeek ? { ...day, isActive: !day.isActive } : day
      )
    );
  };

  const handleTimeChange = (dayOfWeek: number, field: 'startTime' | 'endTime', value: string) => {
    setAvailability((prev) =>
      prev.map((day) => (day.dayOfWeek === dayOfWeek ? { ...day, [field]: value } : day))
    );
  };

  const handleSave = async () => {
    try {
      setSaving(true);
      setMessage('');
      const response = await fetch('/api/coordinator/availability', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ availability }),
      });

      if (response.ok) {
        setMessage('Availability updated successfully!');
        setTimeout(() => setMessage(''), 3000);
      } else {
        setMessage('Failed to save availability');
      }
    } catch (error) {
      console.error('Failed to save:', error);
      setMessage('Error saving availability');
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return <div className="text-center py-8">Loading availability settings...</div>;
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Set Your Availability</h1>
        <p className="text-gray-600 mt-1">Define your working hours for student meetings</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Weekly Schedule</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {availability.map((day) => (
            <div key={day.dayOfWeek} className="p-4 border rounded-lg flex items-center gap-4">
              <input
                type="checkbox"
                checked={day.isActive}
                onChange={() => handleToggleDay(day.dayOfWeek)}
                className="w-5 h-5"
              />
              <div className="flex-1">
                <label className="font-medium text-gray-900">{DAYS[day.dayOfWeek]}</label>
              </div>
              {day.isActive && (
                <div className="flex items-center gap-2">
                  <input
                    type="time"
                    value={day.startTime}
                    onChange={(e) => handleTimeChange(day.dayOfWeek, 'startTime', e.target.value)}
                    className="px-2 py-1 border rounded"
                  />
                  <span className="text-gray-500">to</span>
                  <input
                    type="time"
                    value={day.endTime}
                    onChange={(e) => handleTimeChange(day.dayOfWeek, 'endTime', e.target.value)}
                    className="px-2 py-1 border rounded"
                  />
                </div>
              )}
            </div>
          ))}
        </CardContent>
      </Card>

      {message && (
        <div className={`p-4 rounded-lg ${
          message.includes('successfully') ? 'bg-green-50 text-green-800' : 'bg-red-50 text-red-800'
        }`}>
          {message}
        </div>
      )}

      <Button onClick={handleSave} disabled={saving} className="w-full">
        {saving ? 'Saving...' : 'Save Availability'}
      </Button>
    </div>
  );
}
