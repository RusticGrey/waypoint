'use client';

import { useState, useEffect } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ux } from '@/lib/ux';
import { cn } from '@/lib/utils';

const CURRICULUMS = ['CBSE', 'ICSE', 'IB', 'CAIE', 'State_Board', 'US_High_School', 'Other'];

export default function SubjectsManagementPage() {
  const [selectedCurriculum, setSelectedCurriculum] = useState('CBSE');
  const [subjects, setSubjects] = useState<any[]>([]);
  const [newSubjectName, setNewSubjectName] = useState('');
  const [editingId, setEditingId] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchSubjects();
  }, [selectedCurriculum]);

  const fetchSubjects = async () => {
    const res = await fetch(`/api/subjects?curriculum=${selectedCurriculum}`);
    const data = await res.json();
    setSubjects(data.subjects || []);
  };

  const handleAddOrUpdateSubject = async () => {
    if (!newSubjectName.trim()) return;

    setLoading(true);
    try {
      const url = '/api/subjects';
      const method = editingId ? 'PUT' : 'POST';
      const body = editingId 
        ? { id: editingId, subjectName: newSubjectName }
        : { subjectName: newSubjectName, curriculumType: selectedCurriculum };

      await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });

      setNewSubjectName('');
      setEditingId(null);
      fetchSubjects();
    } catch (error) {
      alert(`Failed to ${editingId ? 'update' : 'add'} subject`);
    } finally {
      setLoading(false);
    }
  };

  const startEditing = (subject: any) => {
    setEditingId(subject.id);
    setNewSubjectName(subject.subjectName);
  };

  const cancelEditing = () => {
    setEditingId(null);
    setNewSubjectName('');
  };

  const deleteSubject = async (id: string) => {
    if (!confirm('Are you sure you want to delete this course?')) return;
    
    try {
      await fetch(`/api/subjects?id=${id}`, {
        method: 'DELETE',
      });
      fetchSubjects();
    } catch (error) {
      alert('Failed to delete subject');
    }
  };

  return (
    <div className={ux.layout.page}>
      <div className={ux.layout.header}>
        <h1 className={ux.text.heading}>Manage Course List</h1>
        <p className={ux.text.body}>Configure the available subjects for each student curriculum type.</p>
      </div>

      <Card variant="base">
        <CardHeader>
          <CardTitle className={ux.text.subheading}>Courses by Curriculum</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-8">
            {/* Curriculum Selector */}
            <div className="space-y-2">
              <label className={ux.form.label}>
                Select Curriculum
              </label>
              <select
                value={selectedCurriculum}
                onChange={(e) => {
                    setSelectedCurriculum(e.target.value);
                    cancelEditing(); 
                }}
                className={cn(ux.form.input, "max-w-xs h-12 bg-white")}
              >
                {CURRICULUMS.map((curr) => (
                  <option key={curr} value={curr}>{curr.replace(/_/g, ' ')}</option>
                ))}
              </select>
            </div>

            {/* Add New Subject */}
            <div className="space-y-2">
              <label className={ux.form.label}>
                {editingId ? "Update Course Name" : "Add New Course"}
              </label>
              <div className="flex flex-col sm:flex-row gap-3">
                <Input
                  placeholder={editingId ? "Update course name" : "Enter course name (e.g. Physics HL)"}
                  value={newSubjectName}
                  onChange={(e) => setNewSubjectName(e.target.value)}
                  className={cn(ux.form.input, "flex-1 max-w-md")}
                />
                <div className="flex gap-3">
                  {editingId && (
                    <Button variant="outline" onClick={cancelEditing} disabled={loading}>
                      Cancel
                    </Button>
                  )}
                  <Button onClick={handleAddOrUpdateSubject} disabled={loading || !newSubjectName.trim()}>
                    {editingId ? 'Update Course' : 'Add Course'}
                  </Button>
                </div>
              </div>
            </div>

            {/* Subject List */}
            <div className="pt-4">
              <h3 className={ux.text.accent}>
                Available Courses for {selectedCurriculum.replace(/_/g, ' ')} ({subjects.length})
              </h3>
              <div className="mt-4 border border-slate-200 rounded-2xl divide-y divide-slate-100 overflow-hidden shadow-sm">
                <div className="max-h-[500px] overflow-y-auto">
                  {subjects.map((subject) => (
                    <div key={subject.id} className="px-6 py-4 flex justify-between items-center hover:bg-surface-soft transition-colors">
                      <span className="text-sm font-bold text-slate-900">{subject.subjectName}</span>
                      <div className="flex gap-4">
                          <button 
                              onClick={() => startEditing(subject)}
                              className="text-brand-600 hover:text-brand-800 font-bold text-xs uppercase tracking-tight"
                          >
                              Edit
                          </button>
                          <button 
                              onClick={() => deleteSubject(subject.id)}
                              className="text-red-600 hover:text-red-800 font-bold text-xs uppercase tracking-tight"
                          >
                              Remove
                          </button>
                      </div>
                    </div>
                  ))}
                  {subjects.length === 0 && (
                    <div className="px-6 py-12 text-center text-slate-400 italic">
                      No courses added for this curriculum yet.
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
