'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

interface AvailabilityBlock {
  dayOfWeek: number;
  startTime: string;
  endTime: string;
  isActive: boolean;
}

const DAYS = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

export function HostAvailabilityView() {
  const [availability, setAvailability] = useState<AvailabilityBlock[]>([
    { dayOfWeek: 0, startTime: '09:00', endTime: '17:00', isActive: false },
    { dayOfWeek: 1, startTime: '09:00', endTime: '17:00', isActive: true },
    { dayOfWeek: 2, startTime: '09:00', endTime: '17:00', isActive: true },
    { dayOfWeek: 3, startTime: '09:00', endTime: '17:00', isActive: true },
    { dayOfWeek: 4, startTime: '09:00', endTime: '17:00', isActive: true },
    { dayOfWeek: 5, startTime: '09:00', endTime: '17:00', isActive: true },
    { dayOfWeek: 6, startTime: '09:00', endTime: '17:00', isActive: false },
  ]);

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState('');
  const router = useRouter();

  useEffect(() => {
    fetchAvailability();
  }, []);

  const fetchAvailability = async () => {
    try {
      setLoading(true);
      const response = await fetch(`/api/coordinator/availability?coordinatorId=me`);
      if (response.ok) {
        const data = await response.json();
        if (Array.isArray(data) && data.length > 0) {
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

  if (loading) return <div className="text-center py-8">Loading availability settings...</div>;

  return (
    <div className="max-w-4xl mx-auto p-8 space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-black">Set Your Availability</h1>
          <p className="text-gray-600 mt-1">Define your working hours for student meetings</p>
        </div>
        <Button variant="outline" onClick={() => router.back()} className="text-black border-gray-300">
          Back
        </Button>
      </div>

      <Card className="bg-white">
        <CardHeader>
          <CardTitle className="text-black">Weekly Schedule</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {availability.map((day) => (
            <div key={day.dayOfWeek} className="p-4 border rounded-lg flex items-center gap-4 hover:bg-gray-50 transition-colors">
              <input
                type="checkbox"
                checked={day.isActive}
                onChange={() => handleToggleDay(day.dayOfWeek)}
                className="w-5 h-5 cursor-pointer accent-blue-600"
              />
              <div className="flex-1">
                <label className="font-medium text-black cursor-pointer" onClick={() => handleToggleDay(day.dayOfWeek)}>
                  {DAYS[day.dayOfWeek]}
                </label>
              </div>
              {day.isActive ? (
                <div className="flex items-center gap-2">
                  <input
                    type="time"
                    value={day.startTime}
                    onChange={(e) => handleTimeChange(day.dayOfWeek, 'startTime', e.target.value)}
                    className="px-3 py-2 border rounded-md text-black focus:ring-2 focus:ring-blue-500 outline-none"
                  />
                  <span className="text-gray-500">to</span>
                  <input
                    type="time"
                    value={day.endTime}
                    onChange={(e) => handleTimeChange(day.dayOfWeek, 'endTime', e.target.value)}
                    className="px-3 py-2 border rounded-md text-black focus:ring-2 focus:ring-blue-500 outline-none"
                  />
                </div>
              ) : (
                <span className="text-sm text-gray-400 italic text-black">Unavailable</span>
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

      <div className="flex justify-end gap-4">
        <Button variant="outline" onClick={() => router.back()} className="text-black border-gray-300">
          Cancel
        </Button>
        <Button onClick={handleSave} disabled={saving} className="min-w-[150px]">
          {saving ? 'Saving...' : 'Save Availability'}
        </Button>
      </div>
    </div>
  );
}
