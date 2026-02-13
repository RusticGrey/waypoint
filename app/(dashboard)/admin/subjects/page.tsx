'use client';

import { useState, useEffect } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

const CURRICULUMS = ['CBSE', 'ICSE', 'IB', 'CAIE', 'State_Board', 'US_High_School', 'Other'];

export default function SubjectsManagementPage() {
  const [selectedCurriculum, setSelectedCurriculum] = useState('CBSE');
  const [subjects, setSubjects] = useState<any[]>([]);
  const [newSubjectName, setNewSubjectName] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchSubjects();
  }, [selectedCurriculum]);

  const fetchSubjects = async () => {
    const res = await fetch(`/api/subjects?curriculum=${selectedCurriculum}`);
    const data = await res.json();
    setSubjects(data.subjects || []);
  };

  const addSubject = async () => {
    if (!newSubjectName.trim()) return;

    setLoading(true);
    try {
      await fetch('/api/subjects', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          subjectName: newSubjectName,
          curriculumType: selectedCurriculum,
        }),
      });
      setNewSubjectName('');
      fetchSubjects();
    } catch (error) {
      alert('Failed to add subject');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-6">Manage Course List</h1>

      <Card>
        <CardHeader>
          <CardTitle>Courses by Curriculum</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {/* Curriculum Selector */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Select Curriculum
              </label>
              <select
                value={selectedCurriculum}
                onChange={(e) => setSelectedCurriculum(e.target.value)}
                className="w-full max-w-xs px-3 py-2 border border-gray-300 rounded-md text-gray-900"
              >
                {CURRICULUMS.map((curr) => (
                  <option key={curr} value={curr}>{curr}</option>
                ))}
              </select>
            </div>

            {/* Add New Subject */}
            <div className="flex gap-2">
              <Input
                placeholder="Enter new course name"
                value={newSubjectName}
                onChange={(e) => setNewSubjectName(e.target.value)}
                className="flex-1 max-w-md"
              />
              <Button onClick={addSubject} disabled={loading || !newSubjectName.trim()}>
                Add Course
              </Button>
            </div>

            {/* Subject List */}
            <div>
              <h3 className="text-sm font-medium text-gray-700 mb-2">
                Available Courses for {selectedCurriculum} ({subjects.length})
              </h3>
              <div className="border rounded-md divide-y max-h-96 overflow-y-auto">
                {subjects.map((subject) => (
                  <div key={subject.id} className="px-4 py-3 flex justify-between items-center hover:bg-gray-50">
                    <span className="text-grey-900">{subject.subjectName}</span>
                  </div>
                ))}
                {subjects.length === 0 && (
                  <div className="px-4 py-8 text-center text-gray-500">
                    No courses added yet
                  </div>
                )}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
