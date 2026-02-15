'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { activitySchema, ActivityInput } from '@/lib/validations/activity';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useState, useMemo } from 'react';
import { useEnums } from '@/lib/hooks/useEnums';

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
        <p className="text-sm text-gray-600 mb-4">
          Add your extracurricular activities, sports, clubs, and other commitments. Add at least 3 activities.
        </p>

        {/* List of added activities */}
        {activities.length > 0 && (
          <div className="mb-6 space-y-2">
            <h3 className="font-medium text-gray-900">Added Activities ({activities.length})</h3>
            {activities.map((activity, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded border">
                <div>
                  <p className="font-medium text-gray-900">{activity.activityName}</p>
                  <p className="text-sm text-gray-600">
                    {formatEnumValue(activity.category)} • {activity.role || 'Member'} • {activity.gradeLevels.length} grade(s)
                  </p>
                  <p className="text-xs text-gray-500">
                    {activity.hoursPerWeek}h/week × {activity.weeksPerYear} weeks = {activity.hoursPerWeek * activity.weeksPerYear} total hours
                  </p>
                </div>
                <div className="flex gap-2">
                  <button
                    type="button"
                    onClick={() => editActivity(index)}
                    className="text-blue-600 hover:text-blue-800 text-sm"
                  >
                    Edit
                  </button>
                  <button
                    type="button"
                    onClick={() => removeActivity(index)}
                    className="text-red-600 hover:text-red-800 text-sm"
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
            className="w-full"
          >
            + Add Activity
          </Button>
        )}

        {/* Add activity form */}
        {showForm && (
          <form onSubmit={handleSubmit(onSubmitActivity)} className="space-y-4 p-4 border rounded-lg bg-gray-50">
            <Input
              label="Activity Name *"
              placeholder="e.g., Varsity Basketball, Robotics Club"
              {...register('activityName')}
              error={errors.activityName?.message}
            />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Category *
                </label>
                <select
                  {...register('category')}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md text-gray-900"
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
                  <p className="mt-1 text-sm text-red-600">{errors.category.message}</p>
                )}
              </div>

              <Input
                label="Your Role (optional)"
                placeholder="e.g., Team Captain, President"
                {...register('role')}
                error={errors.role?.message}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Grade Levels Participated *
              </label>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {['ninth', 'tenth', 'eleventh', 'twelfth'].map((grade) => (
                  <label key={grade} className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      value={grade}
                      {...register('gradeLevels')}
                      className="h-4 w-4 text-blue-600 rounded"
                    />
                    <span className="text-sm text-gray-700 capitalize">{grade} Grade</span>
                  </label>
                ))}
              </div>
              {errors.gradeLevels && (
                <p className="mt-1 text-sm text-red-600">{errors.gradeLevels.message}</p>
              )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Input
                label="Hours per Week *"
                type="number"
                placeholder="e.g., 5"
                {...register('hoursPerWeek', { valueAsNumber: true })}
                error={errors.hoursPerWeek?.message}
              />

              <Input
                label="Weeks per Year *"
                type="number"
                placeholder="e.g., 30"
                {...register('weeksPerYear', { valueAsNumber: true })}
                error={errors.weeksPerYear?.message}
              />
            </div>

            {totalHours > 0 && (
              <p className="text-sm text-gray-600">
                Total time commitment: <strong>{totalHours} hours</strong>
              </p>
            )}

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Description *
              </label>
              <textarea
                {...register('description')}
                rows={3}
                placeholder="Describe your involvement, responsibilities, and achievements..."
                className="w-full px-3 py-2 border border-gray-300 rounded-md text-gray-900"
              />
              {errors.description && (
                <p className="mt-1 text-sm text-red-600">{errors.description.message}</p>
              )}
            </div>

            <div className="flex gap-2">
              <Button type="submit" className="flex-1">
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
              >
                Cancel
              </Button>
            </div>
          </form>
        )}
      </div>

      {/* Navigation */}
      <div className="flex justify-between pt-6 border-t">
        <Button type="button" onClick={onBack} variant="outline">
          ← Back
        </Button>
        <Button
          type="button"
          onClick={handleNext}
          disabled={activities.length < 3}
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
