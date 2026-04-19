'use client';

import { useState, useEffect, useMemo } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import Link from 'next/link';
import { useEnums } from '@/lib/hooks/useEnums';
import { ux } from '@/lib/ux';

interface Transcript {
  id: string;
  courseName: string;
  gradeLevel: string;
  semester: string;
  gradeValue: string;
  honorsLevel: string;
  curriculumType?: string;
  gradingSystemType?: string;
  otherCurriculumName?: string;
}

const gradeLabels: Record<string, string> = {
  ninth: '9th Grade',
  tenth: '10th Grade',
  eleventh: '11th Grade',
  twelfth: '12th Grade',
};

export default function EditTranscriptsPage() {
  const { enums, loading: enumsLoading } = useEnums();
  const [transcripts, setTranscripts] = useState<Transcript[]>([]);
  const [gradeSettings, setGradeSettings] = useState<Record<string, { curriculum: string; grading: string; otherName?: string }>>({});
  const [showAddForm, setShowAddForm] = useState<string | null>(null);
  const [availableCourses, setAvailableCourses] = useState<Record<string, any[]>>({});
  const [useCustomCourse, setUseCustomCourse] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const [formData, setFormData] = useState({
    courseName: '',
    semester: 'Full_Year',
    gradeValue: '',
    honorsLevel: 'Standard',
  });

  useEffect(() => {
    fetchTranscripts();
  }, []);

  const fetchTranscripts = async () => {
    try {
      const res = await fetch('/api/student/transcripts');
      if (!res.ok) throw new Error('Failed to fetch transcripts');
      const data = await res.json();
      const fetchedTranscripts = data.transcripts || [];
      setTranscripts(fetchedTranscripts);

      // Initialize grade settings from transcripts
      const settings: Record<string, { curriculum: string; grading: string; otherName?: string }> = {};
      fetchedTranscripts.forEach((t: Transcript) => {
        if (!settings[t.gradeLevel] && t.curriculumType) {
          settings[t.gradeLevel] = {
            curriculum: t.curriculumType,
            grading: t.gradingSystemType || '',
            otherName: t.otherCurriculumName || ''
          };
          fetchCoursesForGrade(t.gradeLevel, t.curriculumType);
        }
      });
      setGradeSettings(settings);
    } catch (err) {
      console.error('Fetch error:', err);
      setError('Failed to load transcripts');
    }
  };

  const fetchCoursesForGrade = async (grade: string, curriculum: string) => {
    if (!curriculum || curriculum === 'Other') return;
    try {
      const res = await fetch(`/api/subjects?curriculum=${curriculum}`);
      const data = await res.json();
      setAvailableCourses(prev => ({ ...prev, [grade]: data.subjects || [] }));
    } catch (err) {
      console.error('Failed to fetch courses:', err);
    }
  };

  const handleGradeSettingChange = async (grade: string, field: string, value: string) => {
    const newSettings = {
      ...gradeSettings,
      [grade]: {
        ...(gradeSettings[grade] || { curriculum: '', grading: '' }),
        [field]: value
      }
    };
    setGradeSettings(newSettings);
    
    if (field === 'curriculum') {
      fetchCoursesForGrade(grade, value);
    }

    // Optional: Bulk update existing transcripts for this grade
    const gradeTranscripts = transcripts.filter(t => t.gradeLevel === grade);
    if (gradeTranscripts.length > 0) {
        // In a real app, we might want to send a bulk update API call here
        console.log(`Need to update ${gradeTranscripts.length} transcripts for ${grade} to new ${field}`);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const grade = showAddForm!;
    const settings = gradeSettings[grade];

    if (!settings?.curriculum || !settings?.grading) {
        alert('Please set curriculum and grading scale first');
        return;
    }

    setLoading(true);
    try {
      const res = await fetch('/api/student/transcripts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          gradeLevel: grade,
          curriculumType: settings.curriculum,
          gradingSystemType: settings.grading,
          otherCurriculumName: settings.otherName,
        }),
      });

      if (!res.ok) throw new Error('Failed to save');

      setFormData({ courseName: '', semester: 'Full_Year', gradeValue: '', honorsLevel: 'Standard' });
      setShowAddForm(null);
      setUseCustomCourse(false);
      await fetchTranscripts();
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Delete this course?')) return;
    try {
      await fetch(`/api/student/transcripts/${id}`, { method: 'DELETE' });
      await fetchTranscripts();
    } catch (err) {
      setError('Failed to delete');
    }
  };

  if (enumsLoading) return <div className={ux.layout.page}>Loading...</div>;

  return (
    <div className={ux.layout.page}>
      <div className={ux.layout.header}>
        <div className="flex justify-between items-center">
          <div>
            <h1 className={ux.text.heading}>Edit Transcripts</h1>
            <p className={ux.text.body}>Manage your courses and grades by academic year</p>
          </div>
          <Link href="/student/profile" className={ux.button.outline}>
            ← Back to Profile
          </Link>
        </div>
      </div>

      {error && <div className="mb-6 p-4 bg-red-50 text-red-800 rounded-xl border border-red-100">{error}</div>}

      <div className="space-y-8">
        {['ninth', 'tenth', 'eleventh', 'twelfth'].map((grade) => {
          const settings = gradeSettings[grade] || { curriculum: '', grading: '' };
          const gradeTranscripts = transcripts.filter(t => t.gradeLevel === grade);

          return (
            <Card key={grade} variant="base">
              <CardHeader className="border-b border-slate-100 bg-slate-50/30">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <CardTitle className="text-xl font-black text-slate-800 uppercase tracking-tight">
                    {gradeLabels[grade]}
                  </CardTitle>
                  
                  <div className="flex flex-wrap gap-3">
                    <select
                      value={settings.curriculum}
                      onChange={(e) => handleGradeSettingChange(grade, 'curriculum', e.target.value)}
                      className="h-9 px-3 bg-white border border-slate-200 rounded-lg text-xs font-bold"
                    >
                      <option value="">Select Curriculum</option>
                      {enums?.curriculumTypes.map(c => <option key={c} value={c}>{c}</option>)}
                    </select>

                    <select
                      value={settings.grading}
                      onChange={(e) => handleGradeSettingChange(grade, 'grading', e.target.value)}
                      className="h-9 px-3 bg-white border border-slate-200 rounded-lg text-xs font-bold"
                    >
                      <option value="">Select Scale</option>
                      {enums?.gradingSystemTypes.map(g => <option key={g} value={g}>{g.replace(/_/g, ' ')}</option>)}
                    </select>
                  </div>
                </div>
                {settings.curriculum === 'Other' && (
                  <div className="mt-3">
                    <Input
                        placeholder="Curriculum Name"
                        value={settings.otherName || ''}
                        onChange={(e) => handleGradeSettingChange(grade, 'otherName', e.target.value)}
                        className="max-w-xs h-8 text-xs"
                    />
                  </div>
                )}
              </CardHeader>
              <CardContent className="pt-6">
                {gradeTranscripts.length > 0 ? (
                  <div className="overflow-x-auto mb-6 rounded-xl border border-slate-100">
                    <table className="min-w-full divide-y divide-slate-100">
                      <thead className="bg-slate-50/50">
                        <tr>
                          <th className="px-4 py-2 text-left text-[10px] font-black text-slate-500 uppercase">Course</th>
                          <th className="px-4 py-2 text-left text-[10px] font-black text-slate-500 uppercase">Semester</th>
                          <th className="px-4 py-2 text-left text-[10px] font-black text-slate-500 uppercase">Grade</th>
                          <th className="px-4 py-2 text-right text-[10px] font-black text-slate-500 uppercase">Action</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-100">
                        {gradeTranscripts.map((t) => (
                          <tr key={t.id} className="hover:bg-slate-50/30">
                            <td className="px-4 py-3 text-sm font-bold text-slate-900">{t.courseName}</td>
                            <td className="px-4 py-3 text-xs text-slate-600">{t.semester}</td>
                            <td className="px-4 py-3 text-sm font-black text-brand-600">{t.gradeValue}</td>
                            <td className="px-4 py-3 text-right text-xs">
                              <button onClick={() => handleDelete(t.id)} className="text-red-500 hover:text-red-700 font-bold uppercase">Remove</button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                ) : (
                  <p className="text-sm text-slate-400 italic text-center py-4">No courses added for this year.</p>
                )}

                {showAddForm === grade ? (
                  <form onSubmit={handleSubmit} className="p-6 border-2 border-dashed border-slate-200 rounded-2xl bg-slate-50/50 space-y-6 animate-in fade-in zoom-in-95">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <label className={ux.form.label}>Subject Name</label>
                        {!useCustomCourse ? (
                          <select
                            value={formData.courseName}
                            onChange={(e) => {
                                if (e.target.value === '___custom___') { setUseCustomCourse(true); setFormData({...formData, courseName: ''}); }
                                else setFormData({...formData, courseName: e.target.value});
                            }}
                            className={ux.form.input}
                            required
                          >
                            <option value="">Select Subject</option>
                            {(availableCourses[grade] || []).map(c => <option key={c.subjectName} value={c.subjectName}>{c.subjectName}</option>)}
                            <option value="___custom___">+ Add custom name...</option>
                          </select>
                        ) : (
                          <Input value={formData.courseName} onChange={(e) => setFormData({...formData, courseName: e.target.value})} placeholder="Enter subject name" required />
                        )}
                      </div>
                      
                      <div className="space-y-2">
                        <label className={ux.form.label}>Grade / Score</label>
                        <Input value={formData.gradeValue} onChange={(e) => setFormData({...formData, gradeValue: e.target.value})} placeholder="e.g. 95 or A" required />
                      </div>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
                        <div className="space-y-2">
                            <label className={ux.form.label}>Semester</label>
                            <select value={formData.semester} onChange={(e) => setFormData({...formData, semester: e.target.value})} className={ux.form.input}>
                                <option value="Full_Year">Full Year</option>
                                <option value="Fall">Fall</option>
                                <option value="Spring">Spring</option>
                            </select>
                        </div>
                        <div className="space-y-2">
                            <label className={ux.form.label}>Level</label>
                            <select value={formData.honorsLevel} onChange={(e) => setFormData({...formData, honorsLevel: e.target.value})} className={ux.form.input}>
                                {enums?.honorsLevels.map(l => <option key={l} value={l}>{l}</option>)}
                            </select>
                        </div>
                        <div className="flex gap-2 items-end pb-1">
                            <Button type="submit" disabled={loading} className="flex-1">Save</Button>
                            <Button type="button" variant="outline" onClick={() => setShowAddForm(null)}>Cancel</Button>
                        </div>
                    </div>
                  </form>
                ) : (
                  <Button
                    variant="outline"
                    onClick={() => { setShowAddForm(grade); setUseCustomCourse(false); }}
                    className="w-full border-dashed border-2 py-8 hover:bg-slate-50 transition-all rounded-2xl"
                    disabled={!settings.curriculum || !settings.grading}
                  >
                    {!settings.curriculum || !settings.grading ? "Set curriculum above to add courses" : `+ Add ${gradeLabels[grade]} Course`}
                  </Button>
                )}
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
