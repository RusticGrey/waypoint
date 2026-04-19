'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { achievementSchema, AchievementInput } from '@/lib/validations/activity';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useState } from 'react';
import { cn } from '@/lib/utils';
import { ux } from '@/lib/ux';

interface Props {
  onNext: (data: any[], completionPercentage?: number) => void;
  onSave?: (data: any[], completionPercentage?: number) => void;
  onBack: () => void;
  initialData?: any[];
  currentGrade?: string;
}

const MONTHS = [
  { value: '01', label: 'January' },
  { value: '02', label: 'February' },
  { value: '03', label: 'March' },
  { value: '04', label: 'April' },
  { value: '05', label: 'May' },
  { value: '06', label: 'June' },
  { value: '07', label: 'July' },
  { value: '08', label: 'August' },
  { value: '09', label: 'September' },
  { value: '10', label: 'October' },
  { value: '11', label: 'November' },
  { value: '12', label: 'December' },
];

export default function AchievementForm({ onNext, onSave, onBack, initialData = [] }: Props) {
  // Sanitize initialData to ensure dates are strings and remove incompatible objects
  const sanitizedInitialData = initialData.map(item => {
    const { createdAt, updatedAt, dateAchieved, ...rest } = item;
    return {
      ...rest,
      dateAchieved: dateAchieved ? new Date(dateAchieved).toISOString() : null,
    };
  });

  const [achievements, setAchievements] = useState<any[]>(sanitizedInitialData);
  const [showForm, setShowForm] = useState(false);
  const [editIndex, setEditIndex] = useState<number | null>(null);
  const [selectedMonth, setSelectedMonth] = useState('');
  const [selectedYear, setSelectedYear] = useState('');

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    watch,
    setValue,
  } = useForm<AchievementInput>({
    resolver: zodResolver(achievementSchema),
  });

  const achievementType = watch('achievementType');

  const getTypeDescription = (type: string) => {
    switch (type) {
      case 'Award_Honor':
        return 'Traditional awards and honors you received';
      case 'Competition':
        return 'Competitions, olympiads, tournaments you participated in';
      case 'Leadership':
        return 'Leadership positions and roles you held';
      case 'Social_Impact':
        return 'Community service with measurable impact';
      case 'Extracurricular':
        return 'Significant achievements in clubs, sports, arts, etc.';
      default:
        return '';
    }
  };

  const saveAchievements = async (newAchievements: any[]) => {
    try {
      const response = await fetch('/api/onboarding/achievements', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ achievements: newAchievements }),
      });

      if (response.ok) {
        const responseData = await response.json();
        if (onSave) {
          onSave(newAchievements, responseData.completionPercentage);
        }
      } else {
        console.error('Failed to save achievements');
      }
    } catch (error) {
      console.error('Error saving achievements:', error);
    }
  };

  const onSubmitAchievement = (data: AchievementInput) => {
    // Combine month and year into date string if both selected
    let dateAchieved = null;
    if (selectedMonth && selectedYear) {
      dateAchieved = `${selectedYear}-${selectedMonth}`;
    }

    const achievementWithDate = {
      ...data,
      dateAchieved: dateAchieved, // Note: camelCase to match form data structure usually, though API might map it.
      // Keeping consistent with component state structure
    };

    let updatedAchievements;
    if (editIndex !== null) {
      updatedAchievements = [...achievements];
      updatedAchievements[editIndex] = achievementWithDate;
      setEditIndex(null);
    } else {
      updatedAchievements = [...achievements, achievementWithDate];
    }
    
    setAchievements(updatedAchievements);
    saveAchievements(updatedAchievements);
    
    reset();
    setSelectedMonth('');
    setSelectedYear('');
    setShowForm(false);
  };

  const editAchievement = (index: number) => {
    const achievement = achievements[index];
    
    // Sanitize data: Convert nulls to empty strings/undefined for form
    // And exclude dateAchieved (handled via state)
    const { dateAchieved, ...rest } = achievement;
    
    const sanitizedData = Object.entries(rest).reduce((acc, [key, value]) => {
      // If value is null, use empty string (or undefined if preferred, but inputs usually like strings)
      acc[key] = value === null ? '' : value;
      return acc;
    }, {} as any);

    reset(sanitizedData);
    
    // Parse dateAchieved to set month/year
    if (achievement.dateAchieved) {
      const date = new Date(achievement.dateAchieved);
      // Handle "YYYY-MM" string or Date object
      if (isNaN(date.getTime()) && typeof achievement.dateAchieved === 'string') {
         // Try parsing manual string format if it was saved that way locally
         const parts = achievement.dateAchieved.split('-');
         if (parts.length === 2) {
           setSelectedYear(parts[0]);
           setSelectedMonth(parts[1]);
         }
      } else if (!isNaN(date.getTime())) {
        const month = (date.getMonth() + 1).toString().padStart(2, '0');
        const year = date.getFullYear().toString();
        setSelectedMonth(month);
        setSelectedYear(year);
      }
    } else {
      setSelectedMonth('');
      setSelectedYear('');
    }

    setEditIndex(index);
    setShowForm(true);
  };

  const removeAchievement = (index: number) => {
    const updatedAchievements = achievements.filter((_, i) => i !== index);
    setAchievements(updatedAchievements);
    saveAchievements(updatedAchievements);

    if (editIndex === index) {
      setEditIndex(null);
      setShowForm(false);
      reset();
      setSelectedMonth('');
      setSelectedYear('');
    }
  };

  const handleNext = async () => {
    const response = await fetch('/api/onboarding/achievements', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ achievements }),
    });

    if (response.ok) {
      const responseData = await response.json();
      onNext(achievements, responseData.completionPercentage);
    }
  };

  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: 10 }, (_, i) => currentYear - i);

  return (
    <div className="space-y-6">
      <div>
        <p className={ux.text.body}>
          Showcase your awards, competition results, leadership roles, and social impact. Add at least 2 achievements.
        </p>

        {/* List of added achievements */}
        {achievements.length > 0 && (
          <div className="mb-8 mt-6 space-y-3">
            <h3 className={cn(ux.text.accent, "text-sm")}>Added Achievements ({achievements.length})</h3>
            {achievements.map((achievement, index) => (
              <div key={index} className="flex items-center justify-between p-4 bg-surface-soft rounded-xl border border-surface-muted shadow-sm">
                <div>
                  <div className="flex items-center gap-2">
                    <span className={ux.badge.brand}>
                      {achievement.achievementType.replace('_', ' ')}
                    </span>
                    <p className="font-bold text-slate-900">{achievement.title}</p>
                  </div>
                  <p className="text-xs text-slate-500 mt-2 font-medium">
                    {achievement.organization && `${achievement.organization} • `}
                    <span className="capitalize">{achievement.gradeLevel} Grade</span>
                    {achievement.dateAchieved && ` • ${new Date(achievement.dateAchieved).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })}`}
                    {achievement.recognitionLevel && ` • ${achievement.recognitionLevel} Level`}
                  </p>
                </div>
                <div className="flex gap-4">
                  <button
                    type="button"
                    onClick={() => editAchievement(index)}
                    className="text-brand-600 hover:text-brand-700 font-bold text-xs uppercase tracking-tight"
                  >
                    Edit
                  </button>
                  <button
                    type="button"
                    onClick={() => removeAchievement(index)}
                    className="text-red-500 hover:text-red-600 font-bold text-xs uppercase tracking-tight"
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Add achievement button */}
        {!showForm && (
          <Button
            type="button"
            onClick={() => {
              setShowForm(true);
              setEditIndex(null);
              reset({
                achievementType: undefined,
                title: '',
                organization: '',
                gradeLevel: undefined,
                description: '',
                metrics: '',
                verifiableLink: '',
              });
              setSelectedMonth('');
              setSelectedYear('');
            }}
            variant="outline"
            className={cn(ux.button.outline, "w-full border-dashed border-2 py-8 hover:bg-brand-50 transition-colors border-brand-200 text-brand-600 font-bold")}
          >
            + Add Achievement
          </Button>
        )}

        {/* Add achievement form */}
        {showForm && (
          <form 
            onSubmit={handleSubmit(onSubmitAchievement, (errors) => console.error("Form errors:", errors))} 
            className="space-y-6 p-6 border-2 border-dashed border-brand-200 rounded-xl bg-brand-50/30 animate-in fade-in zoom-in-95 duration-200"
          >
            <div className="space-y-2">
              <label className={ux.form.label}>
                Achievement Type <span className="text-red-500">*</span>
              </label>
              <select
                {...register('achievementType')}
                className={ux.form.input}
              >
                <option value="">Select type</option>
                <option value="Award_Honor">Award / Honor</option>
                <option value="Competition">Competition</option>
                <option value="Leadership">Leadership</option>
                <option value="Social_Impact">Social Impact</option>
                <option value="Extracurricular">Extracurricular</option>
              </select>
              {errors.achievementType && (
                <p className={ux.form.error}>{(errors.achievementType as any).message}</p>
              )}
              {achievementType && (
                <p className={cn(ux.text.accent, "mt-2 bg-brand-50 inline-block px-2 py-1 rounded")}>{getTypeDescription(achievementType)}</p>
              )}
            </div>

            <div className="space-y-2">
              <label className={ux.form.label}>
                Achievement Title <span className="text-red-500">*</span>
              </label>
              <Input
                placeholder="e.g., National Merit Scholar, State Science Fair 1st Place"
                {...register('title')}
                className={ux.form.input}
              />
              {errors.title && <p className={ux.form.error}>{(errors.title as any).message}</p>}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className={ux.form.label}>
                  Organization <span className="text-slate-400 font-normal">(optional)</span>
                </label>
                <Input
                  placeholder="e.g., National Merit Corporation"
                  {...register('organization')}
                  className={ux.form.input}
                />
                {errors.organization && <p className={ux.form.error}>{(errors.organization as any).message}</p>}
              </div>

              <div className="space-y-2">
                <label className={ux.form.label}>
                  Grade Level <span className="text-red-500">*</span>
                </label>
                <select
                  {...register('gradeLevel')}
                  className={ux.form.input}
                >
                  <option value="">Select grade</option>
                  <option value="ninth">9th Grade</option>
                  <option value="tenth">10th Grade</option>
                  <option value="eleventh">11th Grade</option>
                  <option value="twelfth">12th Grade</option>
                </select>
                {errors.gradeLevel && (
                  <p className={ux.form.error}>{(errors.gradeLevel as any).message}</p>
                )}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className={ux.form.label}>
                  Month Achieved <span className="text-slate-400 font-normal">(optional)</span>
                </label>
                <select
                  value={selectedMonth}
                  onChange={(e) => setSelectedMonth(e.target.value)}
                  className={ux.form.input}
                >
                  <option value="">Select month</option>
                  {MONTHS.map((month) => (
                    <option key={month.value} value={month.value}>
                      {month.label}
                    </option>
                  ))}
                </select>
              </div>

              <div className="space-y-2">
                <label className={ux.form.label}>
                  Year Achieved <span className="text-slate-400 font-normal">(optional)</span>
                </label>
                <select
                  value={selectedYear}
                  onChange={(e) => setSelectedYear(e.target.value)}
                  className={ux.form.input}
                >
                  <option value="">Select year</option>
                  {years.map((year) => (
                    <option key={year} value={year}>
                      {year}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="space-y-2">
              <label className={ux.form.label}>
                Recognition Level <span className="text-red-500">*</span>
              </label>
              <select
                {...register('recognitionLevel')}
                className={ux.form.input}
              >
                <option value="">Select level</option>
                <option value="School">School</option>
                <option value="Inter_School">Inter-School</option>
                <option value="District">District</option>
                <option value="City">City</option>
                <option value="State">State</option>
                <option value="National">National</option>
                <option value="International">International</option>
              </select>
              
              {errors.recognitionLevel && (
                <p className={ux.form.error}>{(errors.recognitionLevel as any).message}</p>
              )}
            </div>

            <div className="space-y-2">
              <label className={ux.form.label}>
                Description <span className="text-red-500">*</span>
              </label>
              <textarea
                {...register('description')}
                rows={3}
                placeholder="Describe the achievement and your role..."
                className={cn(ux.form.input, "min-h-[100px]")}
              />
              {errors.description && (
                <p className={ux.form.error}>{(errors.description as any).message}</p>
              )}
            </div>

            {achievementType === 'Social_Impact' && (
              <div className="space-y-2">
                <label className={ux.form.label}>
                  Measurable Impact <span className="text-slate-400 font-normal">(optional)</span>
                </label>
                <Input
                  placeholder="e.g., 500 families served, ₹50,000 raised"
                  {...register('metrics')}
                  className={ux.form.input}
                />
                {errors.metrics && <p className={ux.form.error}>{(errors.metrics as any).message}</p>}
              </div>
            )}

            <div className="space-y-2">
              <label className={ux.form.label}>
                Verification Link <span className="text-slate-400 font-normal">(optional)</span>
              </label>
              <Input
                placeholder="https://..."
                {...register('verifiableLink')}
                className={ux.form.input}
              />
              {errors.verifiableLink && <p className={ux.form.error}>{(errors.verifiableLink as any).message}</p>}
            </div>

            <div className="flex gap-4">
              <Button type="submit" className={cn(ux.button.primary, "flex-1")}>
                {editIndex !== null ? 'Update Achievement' : 'Add Achievement'}
              </Button>
              <Button
                type="button"
                onClick={() => {
                  setShowForm(false);
                  reset();
                  setSelectedMonth('');
                  setSelectedYear('');
                  setEditIndex(null);
                }}
                variant="outline"
                className={ux.button.outline}
              >
                Cancel
              </Button>
            </div>
          </form>
        )}
      </div>

      {/* Navigation */}
      <div className="flex justify-between pt-6 border-t border-surface-muted">
        <Button type="button" onClick={onBack} variant="outline" className={ux.button.outline}>
          ← Back
        </Button>
        <Button
          type="button"
          onClick={handleNext}
          disabled={achievements.length < 2}
          className={ux.button.primary}
        >
          Next →
        </Button>
      </div>

      {achievements.length < 2 && (
        <p className="text-sm text-gray-500 text-center">
          Add at least 2 achievements to continue
        </p>
      )}
    </div>
  );
}
