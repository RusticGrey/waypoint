'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { transcriptSchema } from '@/lib/validations/student';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useState, useMemo, useEffect } from 'react';
import { cn } from '@/lib/utils';
import { getEnumValues } from '@/lib/utils/enums';
import { ux } from '@/lib/ux';

interface Props {
  onNext: (data: any[], completionPercentage?: number) => void;
  onSave?: (data: any[], completionPercentage?: number) => void;
  onBack: () => void;
  initialData?: any[];
  currentGrade?: string;
}

const gradeOrder = ['ninth', 'tenth', 'eleventh', 'twelfth'];
const gradeLabels: Record<string, string> = {
  ninth: '9th Grade',
  tenth: '10th Grade',
  eleventh: '11th Grade',
  twelfth: '12th Grade',
};

export default function TranscriptForm({ onNext, onSave, onBack, initialData = [], currentGrade }: Props) {
  const enums = getEnumValues();
  const [transcripts, setTranscripts] = useState<any[]>(initialData);
  const [gradeSettings, setGradeSettings] = useState<Record<string, { curriculum: string; grading: string; otherName?: string }>>({});
  const [showAddForm, setShowAddForm] = useState<string | null>(null);
  const [availableCourses, setAvailableCourses] = useState<Record<string, any[]>>({});
  const [useCustomCourse, setUseCustomCourse] = useState(false);

  // Sync available courses if a grade has a curriculum but courses are not loaded
  useEffect(() => {
    Object.entries(gradeSettings).forEach(([grade, settings]) => {
      if (settings.curriculum && settings.curriculum !== 'Other' && !availableCourses[grade]) {
        fetchCourses(grade, settings.curriculum);
      }
    });
  }, [gradeSettings, availableCourses]);

  useEffect(() => {
    const settings: Record<string, { curriculum: string; grading: string; otherName?: string }> = {};
    initialData.forEach(t => {
      if (!settings[t.gradeLevel]) {
        settings[t.gradeLevel] = {
          curriculum: t.curriculumType || '',
          grading: t.gradingSystemType || '',
          otherName: t.otherCurriculumName || ''
        };
      }
    });
    setGradeSettings(settings);
  }, []);

  const availableGrades = useMemo(() => {
    const currentIndex = gradeOrder.indexOf(currentGrade || 'twelfth');
    return gradeOrder.slice(0, currentIndex + 1);
  }, [currentGrade]);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    watch,
    setValue,
    trigger,
    getValues
  } = useForm<any>({
    resolver: zodResolver(transcriptSchema),
    mode: 'all',
    defaultValues: {
      courseName: '',
      gradeValue: '',
      honorsLevel: 'Standard',
      isBoardExam: false,
      semester: 'Full_Year',
    },
  });

  const fetchCourses = async (grade: string, curriculum: string) => {
    if (!curriculum || curriculum === 'Other') return;
    try {
      const res = await fetch(`/api/subjects?curriculum=${curriculum}`);
      const data = await res.json();
      setAvailableCourses(prev => ({ ...prev, [grade]: data.subjects || [] }));
    } catch (err) {
      console.error('Failed to fetch courses:', err);
    }
  };

  const handleGradeSettingChange = (grade: string, field: string, value: string) => {
    const newSettings = {
      ...gradeSettings,
      [grade]: {
        ...(gradeSettings[grade] || { curriculum: '', grading: '' }),
        [field]: value
      }
    };
    setGradeSettings(newSettings);
    
    if (field === 'curriculum') {
      fetchCourses(grade, value);
    }

    const updatedTranscripts = transcripts.map(t => {
      if (t.gradeLevel === grade) {
        return {
          ...t,
          curriculumType: field === 'curriculum' ? value : t.curriculumType,
          gradingSystemType: field === 'grading' ? value : t.gradingSystemType,
          otherCurriculumName: field === 'otherName' ? value : t.otherCurriculumName,
        };
      }
      return t;
    });
    
    setTranscripts(updatedTranscripts);
    saveTranscripts(updatedTranscripts);
  };

  const saveTranscripts = async (newTranscripts: any[]) => {
    try {
      const response = await fetch('/api/onboarding/transcripts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ transcripts: newTranscripts }),
      });

      if (response.ok) {
        const responseData = await response.json();
        if (onSave) {
          onSave(newTranscripts, responseData.completionPercentage);
        }
      }
    } catch (error) {
      console.error('Error saving transcripts:', error);
    }
  };

  const onSubmitCourse = (data: any) => {
    const grade = showAddForm!;
    const settings = gradeSettings[grade] || { curriculum: '', grading: '' };

    // DUPLICATE CHECK
    const isDuplicate = transcripts.some(t => 
      t.gradeLevel === grade && 
      t.courseName.toLowerCase() === data.courseName.toLowerCase() &&
      t.semester === data.semester
    );

    if (isDuplicate) {
      alert(`The course "${data.courseName}" for ${data.semester.replace('_', ' ')} is already in your transcript for this grade.`);
      return;
    }
    
    const newCourse = {
      ...data,
      id: Math.random().toString(36).substr(2, 9),
      gradeLevel: grade,
      curriculumType: settings.curriculum || null,
      gradingSystemType: settings.grading || null,
      otherCurriculumName: settings.otherName || null,
    };

    const updatedTranscripts = [...transcripts, newCourse];
    setTranscripts(updatedTranscripts);
    saveTranscripts(updatedTranscripts);
    
    reset({
        courseName: '',
        gradeValue: '',
        honorsLevel: 'Standard',
        isBoardExam: false,
        semester: 'Full_Year',
    });
    setShowAddForm(null);
    setUseCustomCourse(false);
  };

  const removeCourse = (id: string) => {
    const updatedTranscripts = transcripts.filter(t => t.id !== id);
    setTranscripts(updatedTranscripts);
    saveTranscripts(updatedTranscripts);
  };

  const handleFinish = async () => {
    const response = await fetch('/api/onboarding/transcripts', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ transcripts }),
    });

    if (response.ok) {
      const responseData = await response.json();
      onNext(transcripts, responseData.completionPercentage);
    }
  };

  return (
    <div className="space-y-10">
      <div className="space-y-1">
        <h3 className={ux.text.subheading}>Academic Transcripts</h3>
        <p className={ux.text.body}>Enter your courses and grades for each year of high school.</p>
      </div>

      {availableGrades.map((grade) => {
        const settings = gradeSettings[grade] || { curriculum: '', grading: '' };
        const gradeTranscripts = transcripts.filter(t => t.gradeLevel === grade);
        
        return (
          <div key={grade} className={cn(ux.card.base, "p-6 space-y-6")}>
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-surface-muted pb-4">
              <h4 className={cn(ux.text.accent, "text-base")}>{gradeLabels[grade]}</h4>
              
              <div className="flex flex-wrap gap-3">
                <select
                  value={settings.curriculum}
                  onChange={(e) => handleGradeSettingChange(grade, 'curriculum', e.target.value)}
                  className="h-9 px-3 py-1 bg-surface-soft border border-slate-200 rounded-lg text-xs font-bold text-slate-700 outline-none focus:ring-2 focus:ring-brand-500/20 transition-all"
                >
                  <option value="">Select Curriculum</option>
                  {enums.curriculumTypes.map(c => <option key={c} value={c}>{c}</option>)}
                </select>

                <select
                  value={settings.grading}
                  onChange={(e) => handleGradeSettingChange(grade, 'grading', e.target.value)}
                  className="h-9 px-3 py-1 bg-surface-soft border border-slate-200 rounded-lg text-xs font-bold text-slate-700 outline-none focus:ring-2 focus:ring-brand-500/20 transition-all"
                >
                  <option value="">Select Grading Scale</option>
                  {enums.gradingSystemTypes.map(g => <option key={g} value={g}>{g.replace(/_/g, ' ')}</option>)}
                </select>
              </div>
            </div>

            {settings.curriculum === 'Other' && (
              <Input
                placeholder="Name of other curriculum"
                value={settings.otherName || ''}
                onChange={(e) => handleGradeSettingChange(grade, 'otherName', e.target.value)}
                className="max-w-xs"
              />
            )}

            {settings.curriculum && settings.grading ? (
              <div className="space-y-4">
                {gradeTranscripts.length > 0 && (
                  <div className="overflow-x-auto rounded-xl border border-surface-muted">
                    <table className="min-w-full divide-y divide-surface-muted">
                      <thead className="bg-surface-soft">
                        <tr>
                          <th className={ux.text.accent}>Course</th>
                          <th className={ux.text.accent}>Semester</th>
                          <th className={ux.text.accent}>Grade</th>
                          <th className={cn(ux.text.accent, "text-right")}>Action</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-surface-muted">
                        {gradeTranscripts.map((t) => (
                          <tr key={t.id}>
                            <td className="px-4 py-3 text-sm font-bold text-slate-900">{t.courseName}</td>
                            <td className="px-4 py-3 text-xs text-slate-600 font-medium">{t.semester.replace('_', ' ')}</td>
                            <td className="px-4 py-3 text-sm font-black text-brand-600">{t.gradeValue}</td>
                            <td className="px-4 py-3 text-right text-xs">
                              <button 
                                type="button"
                                onClick={() => removeCourse(t.id)} 
                                className="text-red-500 hover:text-red-700 font-bold uppercase tracking-tight text-[10px]"
                              >
                                Remove
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}

                {showAddForm === grade ? (
                  <div className="p-6 border-2 border-dashed border-brand-200 rounded-xl bg-brand-50/30 space-y-4 animate-in fade-in zoom-in-95">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <label className={ux.form.label}>Subject Name</label>
                        {!useCustomCourse ? (
                          <select
                            {...register('courseName', { required: 'Course name is required' })}
                            onChange={(e) => {
                                if (e.target.value === '___custom___') { 
                                  setUseCustomCourse(true); 
                                  setValue('courseName', ''); 
                                } else {
                                  setValue('courseName', e.target.value);
                                }
                            }}
                            className={ux.form.input}
                          >
                            <option value="">Select Subject</option>
                            {(availableCourses[grade] || []).map(c => <option key={c.subjectName} value={c.subjectName}>{c.subjectName}</option>)}
                            <option value="___custom___">+ Add custom name...</option>
                          </select>
                        ) : (
                          <Input {...register('courseName', { required: 'Course name is required' })} placeholder="Enter subject name" className={ux.form.input} />
                        )}
                        {errors.courseName && <p className={ux.form.error}>{errors.courseName.message as string}</p>}
                      </div>
                      
                      <div className="space-y-2">
                        <label className={ux.form.label}>Grade / Score</label>
                        <Input {...register('gradeValue', { required: 'Grade is required' })} placeholder="e.g. 95 or A" className={ux.form.input} />
                        {errors.gradeValue && <p className={ux.form.error}>{errors.gradeValue.message as string}</p>}
                      </div>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                        <div className="space-y-2">
                            <label className={ux.form.label}>Semester</label>
                            <select {...register('semester')} className={ux.form.input}>
                                <option value="Full_Year">Full Year</option>
                                <option value="Fall">Fall</option>
                                <option value="Spring">Spring</option>
                            </select>
                        </div>
                        <div className="space-y-2">
                            <label className={ux.form.label}>Level</label>
                            <select {...register('honorsLevel')} className={ux.form.input}>
                                {enums.honorsLevels.map(l => <option key={l} value={l}>{l}</option>)}
                            </select>
                        </div>
                        <div className="flex items-end pb-1">
                            <Button 
                              type="button"
                              onClick={async () => {
                                const isValid = await trigger(['courseName', 'gradeValue']);
                                if (isValid) {
                                  onSubmitCourse(getValues());
                                }
                              }}
                              className={cn(ux.button.primary, "w-full")}
                            >
                              Save Course
                            </Button>
                        </div>
                    </div>
                  </div>
                ) : (
                  <Button
                    variant="outline"
                    onClick={() => { setShowAddForm(grade); setUseCustomCourse(false); reset(); }}
                    className="w-full border-dashed border-2 py-8 hover:bg-brand-50 transition-colors border-brand-200 text-brand-600 font-bold"
                  >
                    + Add {gradeLabels[grade]} Course
                  </Button>
                )}
              </div>
            ) : (
              <p className="text-sm text-slate-400 italic text-center py-4">Please select a curriculum and grading scale for this grade above.</p>
            )}
          </div>
        );
      })}

      <div className="flex justify-between pt-6 border-t border-surface-muted">
        <Button type="button" onClick={onBack} variant="outline" className={ux.button.outline}>← Back</Button>
        <Button
          type="button"
          onClick={handleFinish}
          disabled={transcripts.length < 5}
          className={ux.button.primary}
        >
          Next →
        </Button>
      </div>
    </div>
  );
}
