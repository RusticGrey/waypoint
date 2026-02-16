'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { achievementSchema, AchievementInput } from '@/lib/validations/activity';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useState } from 'react';

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
                <div className="flex gap-2">
                  <button
                    type="button"
                    onClick={() => editAchievement(index)}
                    className="text-blue-600 hover:text-blue-800 text-sm"
                  >
                    Edit
                  </button>
                  <button
                    type="button"
                    onClick={() => removeAchievement(index)}
                    className="text-red-600 hover:text-red-800 text-sm"
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
            className="w-full"
          >
            + Add Achievement
          </Button>
        )}

        {/* Add achievement form */}
        {showForm && (
          <form 
            onSubmit={handleSubmit(onSubmitAchievement, (errors) => console.error("Form errors:", errors))} 
            className="space-y-4 p-4 border rounded-lg bg-gray-50"
          >
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Achievement Type *
              </label>
              <select
                {...register('achievementType')}
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
                  {...register('gradeLevel')}
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
                Recognition Level *
              </label>
              <select
                {...register('recognitionLevel')}
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
              
              {errors.recognitionLevel && (
                <p className="mt-1 text-sm text-red-600">{errors.recognitionLevel.message}</p>
              )}
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
              {...register('verifiableLink')}
              error={errors.verifiableLink?.message}
            />

            <div className="flex gap-2">
              <Button type="submit" className="flex-1">
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
