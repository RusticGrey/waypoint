'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { achievementSchema, AchievementInput } from '@/lib/validations/activity';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useState } from 'react';

interface Props {
  onNext: (data: any[]) => void;
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

export default function AchievementForm({ onNext, onBack, initialData = [] }: Props) {
  const [achievements, setAchievements] = useState<any[]>(initialData);
  const [showForm, setShowForm] = useState(false);
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

  const achievementType = watch('achievement_type');

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

  const onSubmitAchievement = (data: AchievementInput) => {
    // Combine month and year into date string if both selected
    let dateAchieved = null;
    if (selectedMonth && selectedYear) {
      dateAchieved = `${selectedYear}-${selectedMonth}`;
    }

    const achievementWithDate = {
      ...data,
      date_achieved: dateAchieved,
    };

    setAchievements([...achievements, achievementWithDate]);
    reset();
    setSelectedMonth('');
    setSelectedYear('');
    setShowForm(false);
  };

  const removeAchievement = (index: number) => {
    setAchievements(achievements.filter((_, i) => i !== index));
  };

  const handleNext = async () => {
    const response = await fetch('/api/onboarding/achievements', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ achievements }),
    });

    if (response.ok) {
      onNext(achievements);
    }
  };

  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: 10 }, (_, i) => currentYear - i);

  return (
    <div className="space-y-6">
      <div>
        <p className="text-sm text-gray-600 mb-4">
          Showcase your awards, competition results, leadership roles, and social impact. Add at least 2 achievements.
        </p>

        {/* List of added achievements */}
        {achievements.length > 0 && (
          <div className="mb-6 space-y-2">
            <h3 className="font-medium text-gray-900">Added Achievements ({achievements.length})</h3>
            {achievements.map((achievement, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded border">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded">
                      {achievement.achievementType.replace('_', ' ')}
                    </span>
                    <p className="font-medium text-gray-900">{achievement.title}</p>
                  </div>
                  <p className="text-sm text-gray-600 mt-1">
                    {achievement.organization && `${achievement.organization} • `}
                    {achievement.gradeLevel}
                    {achievement.dateAchieved && ` • ${new Date(achievement.dateAchieved).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })}`}
                    {achievement.recognitionLevel && ` • ${achievement.recognitionLevel}`}
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => removeAchievement(index)}
                  className="text-red-600 hover:text-red-800 text-sm"
                >
                  Remove
                </button>
              </div>
            ))}
          </div>
        )}

        {/* Add achievement button */}
        {!showForm && (
          <Button
            type="button"
            onClick={() => setShowForm(true)}
            variant="outline"
            className="w-full"
          >
            + Add Achievement
          </Button>
        )}

        {/* Add achievement form */}
        {showForm && (
          <form onSubmit={handleSubmit(onSubmitAchievement)} className="space-y-4 p-4 border rounded-lg bg-gray-50">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Achievement Type *
              </label>
              <select
                {...register('achievement_type')}
                className="w-full px-3 py-2 border border-gray-300 rounded-md text-gray-900"
              >
                <option value="">Select type</option>
                <option value="Award_Honor">Award / Honor</option>
                <option value="Competition">Competition</option>
                <option value="Leadership">Leadership</option>
                <option value="Social_Impact">Social Impact</option>
                <option value="Extracurricular">Extracurricular</option>
              </select>
              {errors.achievementType && (
                <p className="mt-1 text-sm text-red-600">{errors.achievementType.message}</p>
              )}
              {achievementType && (
                <p className="mt-1 text-xs text-gray-500">{getTypeDescription(achievementType)}</p>
              )}
            </div>

            <Input
              label="Achievement Title *"
              placeholder="e.g., National Merit Scholar, State Science Fair 1st Place"
              {...register('title')}
              error={errors.title?.message}
            />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Input
                label="Organization (optional)"
                placeholder="e.g., National Merit Corporation"
                {...register('organization')}
                error={errors.organization?.message}
              />

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Grade Level *
                </label>
                <select
                  {...register('grade_level')}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md text-gray-900"
                >
                  <option value="">Select grade</option>
                  <option value="ninth">9th Grade</option>
                  <option value="tenth">10th Grade</option>
                  <option value="eleventh">11th Grade</option>
                  <option value="twelfth">12th Grade</option>
                </select>
                {errors.gradeLevel && (
                  <p className="mt-1 text-sm text-red-600">{errors.gradeLevel.message}</p>
                )}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Month Achieved (optional)
                </label>
                <select
                  value={selectedMonth}
                  onChange={(e) => setSelectedMonth(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md text-gray-900"
                >
                  <option value="">Select month</option>
                  {MONTHS.map((month) => (
                    <option key={month.value} value={month.value}>
                      {month.label}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Year Achieved (optional)
                </label>
                <select
                  value={selectedYear}
                  onChange={(e) => setSelectedYear(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md text-gray-900"
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

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Recognition Level (optional)
              </label>
              <select
                {...register('recognition_level')}
                className="w-full px-3 py-2 border border-gray-300 rounded-md text-gray-900"
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
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Description *
              </label>
              <textarea
                {...register('description')}
                rows={3}
                placeholder="Describe the achievement and your role..."
                className="w-full px-3 py-2 border border-gray-300 rounded-md text-gray-900"
              />
              {errors.description && (
                <p className="mt-1 text-sm text-red-600">{errors.description.message}</p>
              )}
            </div>

            {achievementType === 'Social_Impact' && (
              <Input
                label="Measurable Impact (optional)"
                placeholder="e.g., 500 families served, ₹50,000 raised"
                {...register('metrics')}
                error={errors.metrics?.message}
              />
            )}

            <Input
              label="Verification Link (optional)"
              placeholder="https://..."
              {...register('verifiable_link')}
              error={errors.verifiableLink?.message}
            />

            <div className="flex gap-2">
              <Button type="submit" className="flex-1">
                Add Achievement
              </Button>
              <Button
                type="button"
                onClick={() => {
                  setShowForm(false);
                  reset();
                  setSelectedMonth('');
                  setSelectedYear('');
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
          disabled={achievements.length < 2}
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
