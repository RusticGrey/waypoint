'use client';

import { useState, useEffect } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function EditPersonalPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    phone: '',
    date_of_birth: '',
    current_school: '',
    school_location: '',
  });

  useEffect(() => {
    fetchPersonalInfo();
  }, []);

  const fetchPersonalInfo = async () => {
    const res = await fetch('/api/student/personal');
    const data = await res.json();
    if (data.PersonalProfile) {
      setFormData({
        phone: data.PersonalProfile.phone || '',
        date_of_birth: data.PersonalProfile.date_of_birth?.split('T')[0] || '',
        current_school: data.PersonalProfile.current_school || '',
        school_location: data.PersonalProfile.school_location || '',
      });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    await fetch('/api/student/personal', {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData),
    });

    router.push('/student/profile');
    router.refresh();
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="mb-6 flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Edit Personal Information</h1>
          <p className="text-gray-600 mt-1">Update your personal details</p>
        </div>
        <Link href="/student/profile" className="text-blue-600 hover:text-blue-700">
          ← Back to Profile
        </Link>
      </div>

      <Card>
        <CardContent className="pt-6">
          <form onSubmit={handleSubmit} className="space-y-4">
            <Input
              label="Phone Number"
              type="tel"
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
            />

            <Input
              label="Date of Birth"
              type="date"
              value={formData.date_of_birth}
              onChange={(e) => setFormData({ ...formData, date_of_birth: e.target.value })}
            />

            <Input
              label="Current School *"
              value={formData.current_school}
              onChange={(e) => setFormData({ ...formData, current_school: e.target.value })}
              required
            />

            <Input
              label="School Location *"
              placeholder="City, State/Country"
              value={formData.school_location}
              onChange={(e) => setFormData({ ...formData, school_location: e.target.value })}
              required
            />

            <div className="flex gap-2 pt-4">
              <Button type="submit" className="flex-1">
                Save Changes
              </Button>
              <Button
                type="button"
                onClick={() => router.push('/student/profile')}
                variant="outline"
              >
                Cancel
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
