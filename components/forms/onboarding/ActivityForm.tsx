'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { activitySchema, ActivityInput } from '@/lib/validations/activity';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useState } from 'react';

interface Props {
  onNext: (data: any[]) => void;
  onBack: () => void;
  initialData?: any[];
}

const ACTIVITY_CATEGORIES = [
  'Academic Competitions',
  'Sports & Athletics',
  'Arts & Performance',
  'Community Service',
  'Leadership',
  'Work Experience',
  'Personal Projects',
];

export default function ActivityForm({ onNext, onBack, initialData = [] }: Props) {
  const [activities, setActivities] = useState<any[]>(initialData);
  const [showForm, setShowForm] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    watch,
  } = useForm<ActivityInput>({
    resolver: zodResolver(activitySchema),
    defaultValues: {
      grade_levels: [],
      hours_per_week: 0,
      weeks_per_year: 0,
    },
  });

  const hoursPerWeek = watch('hours_per_week');
  const weeksPerYear = watch('weeks_per_year');
  const totalHours = (hoursPerWeek || 0) * (weeksPerYear || 0);

  const onSubmitActivity = (data: ActivityInput) => {
    setActivities([...activities, data]);
    reset();
    setShowForm(false);
  };

  const removeActivity = (index: number) => {
    setActivities(activities.filter((_, i) => i !== index));
  };

  const handleNext = async () => {
    // Save activities to API
    const response = await fetch('/api/onboarding/activities', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ activities }),
    });

    if (response.ok) {
      onNext(activities);
    }
  };

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
                  <p className="font-medium text-gray-900">{activity.activity_name}</p>
                  <p className="text-sm text-gray-600">
                    {activity.category} • {activity.role || 'Member'} • {activity.grade_levels.length} grade(s)
                  </p>
                  <p className="text-xs text-gray-500">
                    {activity.hours_per_week}h/week × {activity.weeks_per_year} weeks = {activity.hours_per_week * activity.weeks_per_year} total hours
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => removeActivity(index)}
                  className="text-red-600 hover:text-red-800 text-sm"
                >
                  Remove
                </button>
              </div>
            ))}
          </div>
        )}

        {/* Add activity button */}
        {!showForm && (
          <Button
            type="button"
            onClick={() => setShowForm(true)}
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
              {...register('activity_name')}
              error={errors.activity_name?.message}
            />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Category *
                </label>
                <select
                  {...register('category')}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md text-gray-900"
                >
                  <option value="">Select category</option>
                  {ACTIVITY_CATEGORIES.map((cat) => (
                    <option key={cat} value={cat}>{cat}</option>
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
                      {...register('grade_levels')}
                      className="h-4 w-4 text-blue-600 rounded"
                    />
                    <span className="text-sm text-gray-700 capitalize">{grade} Grade</span>
                  </label>
                ))}
              </div>
              {errors.grade_levels && (
                <p className="mt-1 text-sm text-red-600">{errors.grade_levels.message}</p>
              )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Input
                label="Hours per Week *"
                type="number"
                placeholder="e.g., 5"
                {...register('hours_per_week', { valueAsNumber: true })}
                error={errors.hours_per_week?.message}
              />

              <Input
                label="Weeks per Year *"
                type="number"
                placeholder="e.g., 30"
                {...register('weeks_per_year', { valueAsNumber: true })}
                error={errors.weeks_per_year?.message}
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
                Add Activity
              </Button>
              <Button
                type="button"
                onClick={() => {
                  setShowForm(false);
                  reset();
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
