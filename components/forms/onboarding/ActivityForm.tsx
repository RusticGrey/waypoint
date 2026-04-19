'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { activitySchema, ActivityInput } from '@/lib/validations/activity';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useState, useMemo } from 'react';
import { useEnums } from '@/lib/hooks/useEnums';
import { cn } from '@/lib/utils';
import { ux } from '@/lib/ux';

interface Props {
  onNext: (data: any[], completionPercentage?: number) => void;
  onSave?: (data: any[], completionPercentage?: number) => void;
  onBack: () => void;
  initialData?: any[];
}

// Helper to format enum values for display
const formatEnumValue = (value: string) => {
  return value.replace(/_/g, ' ');
};

export default function ActivityForm({ onNext, onSave, onBack, initialData = [] }: Props) {
  const [activities, setActivities] = useState<any[]>(
    initialData.map((a) => ({
      ...a,
      gradeLevels: a.gradeLevels || (a.gradeLevel ? [a.gradeLevel] : []),
    }))
  );
  const [showForm, setShowForm] = useState(false);
  const [editIndex, setEditIndex] = useState<number | null>(null);
  const { enums, loading: enumsLoading } = useEnums();

  const activityCategories = useMemo(() => {
    return enums?.activityCategories || [];
  }, [enums]);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    watch,
  } = useForm<ActivityInput>({
    resolver: zodResolver(activitySchema),
    defaultValues: {
      gradeLevels: [],
      hoursPerWeek: 0,
      weeksPerYear: 0,
    },
  });

  const hoursPerWeek = watch('hoursPerWeek');
  const weeksPerYear = watch('weeksPerYear');
  const totalHours = (hoursPerWeek || 0) * (weeksPerYear || 0);

  const saveActivities = async (newActivities: any[]) => {
    try {
      const response = await fetch('/api/onboarding/activities', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ activities: newActivities }),
      });

      if (response.ok) {
        const responseData = await response.json();
        if (onSave) {
          onSave(newActivities, responseData.completionPercentage);
        }
      } else {
        console.error('Failed to save activities');
      }
    } catch (error) {
      console.error('Error saving activities:', error);
    }
  };

  const onSubmitActivity = (data: ActivityInput) => {
    let updatedActivities;
    if (editIndex !== null) {
      updatedActivities = [...activities];
      updatedActivities[editIndex] = data;
      setEditIndex(null);
    } else {
      updatedActivities = [...activities, data];
    }
    
    setActivities(updatedActivities);
    saveActivities(updatedActivities);
    
    reset();
    setShowForm(false);
  };

  const editActivity = (index: number) => {
    const activity = activities[index];
    reset(activity);
    setEditIndex(index);
    setShowForm(true);
  };

  const removeActivity = (index: number) => {
    const updatedActivities = activities.filter((_, i) => i !== index);
    setActivities(updatedActivities);
    saveActivities(updatedActivities);

    if (editIndex === index) {
      setEditIndex(null);
      setShowForm(false);
      reset();
    }
  };

  const handleNext = async () => {
    // Save activities to API
    const response = await fetch('/api/onboarding/activities', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ activities }),
    });

    if (response.ok) {
      const responseData = await response.json();
      onNext(activities, responseData.completionPercentage);
    } else {
      // Handle error - maybe show a toast
      console.error('Failed to save activities');
    }
  };

  if (enumsLoading) {
    return <p>Loading activity options...</p>;
  }

  return (
    <div className="space-y-6">
      <div>
        <p className={ux.text.body}>
          Add your extracurricular activities, sports, clubs, and other commitments. Add at least 3 activities.
        </p>

        {/* List of added activities */}
        {activities.length > 0 && (
          <div className="mb-8 mt-6 space-y-3">
            <h3 className={cn(ux.text.accent, "text-sm")}>Added Activities ({activities.length})</h3>
            {activities.map((activity, index) => (
              <div key={index} className="flex items-center justify-between p-4 bg-surface-soft rounded-xl border border-surface-muted shadow-sm">
                <div>
                  <p className="font-bold text-slate-900">{activity.activityName}</p>
                  <p className="text-xs text-slate-500 font-medium">
                    {formatEnumValue(activity.category)} • {activity.role || 'Member'} • {activity.gradeLevels.length} grade(s)
                  </p>
                  <p className="text-xs text-brand-600 font-black mt-1 uppercase tracking-tight">
                    {activity.hoursPerWeek}h/wk × {activity.weeksPerYear}wks/yr = {activity.hoursPerWeek * activity.weeksPerYear} total hours
                  </p>
                </div>
                <div className="flex gap-4">
                  <button
                    type="button"
                    onClick={() => editActivity(index)}
                    className="text-brand-600 hover:text-brand-700 font-bold text-xs uppercase tracking-tight"
                  >
                    Edit
                  </button>
                  <button
                    type="button"
                    onClick={() => removeActivity(index)}
                    className="text-red-500 hover:text-red-600 font-bold text-xs uppercase tracking-tight"
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Add activity button */}
        {!showForm && (
          <Button
            type="button"
            onClick={() => {
              setShowForm(true);
              setEditIndex(null);
              reset({
                gradeLevels: [],
                hoursPerWeek: 0,
                weeksPerYear: 0,
                activityName: '',
                category: undefined,
                description: '',
              });
            }}
            variant="outline"
            className={cn(ux.button.outline, "w-full border-dashed border-2 py-8 hover:bg-brand-50 transition-colors border-brand-200 text-brand-600 font-bold")}
          >
            + Add Activity
          </Button>
        )}

        {/* Add activity form */}
        {showForm && (
          <form onSubmit={handleSubmit(onSubmitActivity)} className="space-y-6 p-6 border-2 border-dashed border-brand-200 rounded-xl bg-brand-50/30 animate-in fade-in zoom-in-95 duration-200">
            <div className="space-y-2">
              <label className={ux.form.label}>
                Activity Name <span className="text-red-500">*</span>
              </label>
              <Input
                placeholder="e.g., Varsity Basketball, Robotics Club"
                {...register('activityName')}
                className={ux.form.input}
              />
              {errors.activityName && <p className={ux.form.error}>{(errors.activityName as any).message}</p>}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className={ux.form.label}>
                  Category <span className="text-red-500">*</span>
                </label>
                <select
                  {...register('category')}
                  className={ux.form.input}
                  disabled={enumsLoading}
                >
                  <option value="">Select category</option>
                  {activityCategories.map((cat) => (
                    <option key={cat} value={cat}>
                      {formatEnumValue(cat)}
                    </option>
                  ))}
                </select>
                {errors.category && (
                  <p className={ux.form.error}>{(errors.category as any).message}</p>
                )}
              </div>

              <div className="space-y-2">
                <label className={ux.form.label}>
                  Your Role <span className="text-slate-400 font-normal">(optional)</span>
                </label>
                <Input
                  placeholder="e.g., Team Captain, President"
                  {...register('role')}
                  className={ux.form.input}
                />
                {errors.role && <p className={ux.form.error}>{(errors.role as any).message}</p>}
              </div>
            </div>

            <div>
              <label className={cn(ux.form.label, "mb-3")}>
                Grade Levels Participated <span className="text-red-500">*</span>
              </label>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {['ninth', 'tenth', 'eleventh', 'twelfth'].map((grade) => (
                  <label key={grade} className="flex items-center space-x-2 p-3 rounded-xl border border-surface-muted bg-white hover:border-brand-200 transition-colors cursor-pointer shadow-sm">
                    <input
                      type="checkbox"
                      value={grade}
                      {...register('gradeLevels')}
                      className="h-4 w-4 text-brand-600 border-slate-300 rounded focus:ring-brand-500"
                    />
                    <span className="text-xs uppercase font-black text-slate-500 tracking-wide capitalize">{grade}</span>
                  </label>
                ))}
              </div>
              {errors.gradeLevels && (
                <p className={ux.form.error}>{(errors.gradeLevels as any).message}</p>
              )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className={ux.form.label}>
                  Hours per Week <span className="text-red-500">*</span>
                </label>
                <Input
                  type="number"
                  placeholder="e.g., 5"
                  {...register('hoursPerWeek', { valueAsNumber: true })}
                  className={ux.form.input}
                />
                {errors.hoursPerWeek && <p className={ux.form.error}>{(errors.hoursPerWeek as any).message}</p>}
              </div>

              <div className="space-y-2">
                <label className={ux.form.label}>
                  Weeks per Year <span className="text-red-500">*</span>
                </label>
                <Input
                  type="number"
                  placeholder="e.g., 30"
                  {...register('weeksPerYear', { valueAsNumber: true })}
                  className={ux.form.input}
                />
                {errors.weeksPerYear && <p className={ux.form.error}>{(errors.weeksPerYear as any).message}</p>}
              </div>
            </div>

            {totalHours > 0 && (
              <p className={cn(ux.text.accent, "bg-brand-50 inline-block px-3 py-1 rounded-full")}>
                Total time commitment: {totalHours} hours
              </p>
            )}

            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <label className={ux.form.label}>
                  Description <span className="text-red-500">*</span>
                </label>
                <span className={cn(
                  "text-[10px] font-bold",
                  (watch('description')?.length || 0) > 150 ? "text-red-500" : "text-slate-400"
                )}>
                  {watch('description')?.length || 0}/150
                </span>
              </div>
              <textarea
                {...register('description')}
                rows={3}
                maxLength={150}
                placeholder="Describe your involvement, responsibilities, and achievements..."
                className={cn(ux.form.input, "min-h-[100px]")}
              />
              {errors.description && (
                <p className={ux.form.error}>{(errors.description as any).message}</p>
              )}
            </div>

            <div className="flex gap-4">
              <Button type="submit" className={cn(ux.button.primary, "flex-1")}>
                {editIndex !== null ? 'Update Activity' : 'Add Activity'}
              </Button>
              <Button
                type="button"
                onClick={() => {
                  setShowForm(false);
                  reset();
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
          disabled={activities.length < 3}
          className={ux.button.primary}
        >
          Next →
        </Button>
      </div>

      {activities.length < 3 && (
        <p className="text-sm text-gray-500 text-center">
          Add at least 3 activities to continue
        </p>
      )}
    </div>
  );
}
