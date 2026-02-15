'use client';

import { useState, useEffect } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useRouter, useSearchParams } from 'next/navigation';

interface Student {
  userId: string;
  user: {
    firstName: string;
    lastName: string;
  };
}

export default function NewMeetingPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const preselectedStudent = searchParams.get('student');

  const [students, setStudents] = useState<Student[]>([]);
  const [formData, setFormData] = useState({
    studentId: preselectedStudent || '',
    meetingDate: '',
    // meetingTime: '',
    durationMinutes: 60,
    meetingType: 'Regular',
    topicsDiscussed: '',
    notes: '',
    actionItems: '',
    nextMeetingDate: '',
    studentMood: '',
  });

  useEffect(() => {
    fetchStudents();
  }, []);

  const fetchStudents = async () => {
    const res = await fetch('/api/coordinator/students');
    const data = await res.json();
    setStudents(data.students || []);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const meetingDateTime = `${formData.meetingDate}`;//'T${formData.meetingTime}`;
    
    const payload = {
      studentId: formData.studentId,
      meetingDate: new Date(meetingDateTime).toISOString(),
      durationMinutes: formData.durationMinutes,
      meetingType: formData.meetingType,
      topicsDiscussed: formData.topicsDiscussed.split(',').map(t => t.trim()).filter(Boolean),
      notes: formData.notes,
      actionItems: formData.actionItems.split('\n').filter(Boolean),
      nextMeetingDate: formData.nextMeetingDate ? new Date(formData.nextMeetingDate).toISOString() : null,
      studentMood: formData.studentMood || null,
    };

    const res = await fetch('/api/coordinator/meetings', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });

    if (res.ok) {
      router.push('/coordinator/meetings');
      router.refresh();
    } else {
      alert('Failed to log meeting');
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900">Log New Meeting</h1>
        <p className="text-gray-600 mt-1">Record meeting details and action items</p>
      </div>

      <Card>
        <CardContent className="pt-6">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-900 mb-1">
                Student *
              </label>
              <select
                value={formData.studentId}
                onChange={(e) => setFormData({ ...formData, studentId: e.target.value })}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md text-gray-900"
              >
                <option value="">Select student</option>
                {students.map((student) => (
                  <option key={student.userId} value={student.userId}>
                    {student.user.firstName} {student.user.lastName}
                  </option>
                ))}
              </select>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Input
                label="Meeting Date *"
                type="date"
                value={formData.meetingDate}
                onChange={(e) => setFormData({ ...formData, meetingDate: e.target.value })}
                required
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-900 mb-1">
                  Duration (minutes)
                </label>
                <input
                  type="number"
                  value={formData.durationMinutes}
                  onChange={(e) => setFormData({ ...formData, durationMinutes: parseInt(e.target.value) })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md text-gray-900"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-900 mb-1">
                  Meeting Type
                </label>
                <select
                  value={formData.meetingType}
                  onChange={(e) => setFormData({ ...formData, meetingType: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md text-gray-900"
                >
                  <option value="Initial">Initial</option>
                  <option value="Regular">Regular</option>
                  <option value="Check_In">Check-In</option>
                  <option value="Goal_Review">Goal Review</option>
                  <option value="Application_Review">Application Review</option>
                  <option value="Crisis">Crisis</option>
                  <option value="Final">Final</option>
                </select>
              </div>
            </div>

            <Input
              label="Topics Discussed (comma-separated)"
              placeholder="e.g., College list, Test prep, Activities"
              value={formData.topicsDiscussed}
              onChange={(e) => setFormData({ ...formData, topicsDiscussed: e.target.value })}
            />

            <div>
              <label className="block text-sm font-medium text-gray-900 mb-1">
                Meeting Notes
              </label>
              <textarea
                value={formData.notes}
                onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                rows={5}
                placeholder="What was discussed? Any concerns? Progress updates?"
                className="w-full px-3 py-2 border border-gray-300 rounded-md text-gray-900"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-900 mb-1">
                Action Items (one per line)
              </label>
              <textarea
                value={formData.actionItems}
                onChange={(e) => setFormData({ ...formData, actionItems: e.target.value })}
                rows={4}
                placeholder="Research 3 colleges&#10;Complete SAT practice test&#10;Draft personal statement"
                className="w-full px-3 py-2 border border-gray-300 rounded-md text-gray-900"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Input
                label="Student Mood (optional)"
                placeholder="e.g., Confident, Stressed, Motivated"
                value={formData.studentMood}
                onChange={(e) => setFormData({ ...formData, studentMood: e.target.value })}
              />

              <Input
                label="Next Meeting Date (optional)"
                type="date"
                value={formData.nextMeetingDate}
                onChange={(e) => setFormData({ ...formData, nextMeetingDate: e.target.value })}
              />
            </div>

            <div className="flex gap-2 pt-4">
              <Button type="submit" className="flex-1">
                Log Meeting
              </Button>
              <Button
                type="button"
                onClick={() => router.back()}
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


