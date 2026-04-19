'use client';

import { useState, useEffect } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { ux } from '@/lib/ux';

export default function EditPersonalPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    phone: '',
    dateOfBirth: '',
    currentSchool: '',
    schoolLocation: '',
    residency: '',
    citizenship: '',
    currentGrade: '',
    graduationYear: '',
  });

  useEffect(() => {
    fetchPersonalInfo();
  }, []);

  const fetchPersonalInfo = async () => {
    const res = await fetch('/api/student/personal');
    const data = await res.json();
    
    if (data.personalProfile) {
      setFormData({
        phone: data.personalProfile.phone || '',
        dateOfBirth: data.personalProfile.dateOfBirth?.split('T')[0] || '',
        currentSchool: data.personalProfile.currentSchool || '',
        schoolLocation: data.personalProfile.schoolLocation || '',
        residency: data.personalProfile.residency || '',
        citizenship: data.personalProfile.citizenship || '',
        currentGrade: data.currentGrade || '',
        graduationYear: data.graduationYear?.toString() || '',
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
    <div className={ux.layout.page}>
      <div className={ux.layout.header}>
        <div className="flex justify-between items-center">
          <div>
            <h1 className={ux.text.heading}>Edit Personal Information</h1>
            <p className={ux.text.body}>Update your personal details</p>
          </div>
          <Link href="/student/profile" className="text-blue-600 hover:text-blue-700 font-medium">
            ← Back to Profile
          </Link>
        </div>
      </div>

      <Card>
        <CardContent className="pt-6">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">Phone Number</label>
              <Input
                type="tel"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">Date of Birth</label>
              <Input
                type="date"
                value={formData.dateOfBirth}
                onChange={(e) => setFormData({ ...formData, dateOfBirth: e.target.value })}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">Current Grade *</label>
                <select
                  value={formData.currentGrade}
                  onChange={(e) => setFormData({ ...formData, currentGrade: e.target.value })}
                  className="w-full h-10 px-3 py-2 bg-white border border-slate-200 rounded-md text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
                  required
                >
                  <option value="">Select your current grade</option>
                  <option value="ninth">9th Grade</option>
                  <option value="tenth">10th Grade</option>
                  <option value="eleventh">11th Grade</option>
                  <option value="twelfth">12th Grade</option>
                </select>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">Graduation Year *</label>
                <Input
                  type="number"
                  placeholder="e.g., 2026"
                  value={formData.graduationYear}
                  onChange={(e) => setFormData({ ...formData, graduationYear: e.target.value })}
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">Current School *</label>
              <Input
                value={formData.currentSchool}
                onChange={(e) => setFormData({ ...formData, currentSchool: e.target.value })}
                required
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">School Location *</label>
              <Input
                placeholder="City, State/Country"
                value={formData.schoolLocation}
                onChange={(e) => setFormData({ ...formData, schoolLocation: e.target.value })}
                required
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">Residency</label>
              <Input
                placeholder="e.g., California, USA"
                value={formData.residency}
                onChange={(e) => setFormData({ ...formData, residency: e.target.value })}
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">Citizenship</label>
              <Input
                placeholder="e.g., USA"
                value={formData.citizenship}
                onChange={(e) => setFormData({ ...formData, citizenship: e.target.value })}
              />
            </div>

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
