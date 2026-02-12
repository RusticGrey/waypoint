'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { academicProfileSchema, AcademicProfileInput } from '@/lib/validations/student';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useState } from 'react';

interface Props {
  onNext: (data: AcademicProfileInput) => void;
  onBack: () => void;
  initialData?: Partial<AcademicProfileInput>;
}

export default function AcademicProfileForm({ onNext, onBack, initialData }: Props) {
  const [selectedCurriculum, setSelectedCurriculum] = useState(initialData?.curriculumType || '');
  
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<AcademicProfileInput>({
    resolver: zodResolver(academicProfileSchema),
    defaultValues: initialData,
  });

  const curriculumType = watch('curriculum_type');

  const getSuggestedGradingSystem = (curriculum: string) => {
    switch (curriculum) {
      case 'CBSE':
      case 'ICSE':
      case 'State_Board':
        return 'Marks_Out_Of_100';
      case 'IB':
        return 'IB_Scale';
      case 'US_High_School':
        return 'Letter_Grade';
      default:
        return '';
    }
  };

  const onSubmit = async (data: AcademicProfileInput) => {
    const response = await fetch('/api/onboarding/academic', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });

    if (response.ok) {
      onNext(data);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          What curriculum do you follow? *
        </label>
        <select
          {...register('curriculumType')}
          onChange={(e) => setSelectedCurriculum(e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm text-gray-900 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
        >
          <option value="">Select curriculum</option>
          <option value="CBSE">CBSE (Central Board of Secondary Education)</option>
          <option value="ICSE">ICSE (Indian Certificate of Secondary Education)</option>
          <option value="IB">IB (International Baccalaureate)</option>
          <option value="CAIE">CAIE (Cambridge Assessment International Education)</option>
          <option value="State_Board">State Board</option>
          <option value="US_High_School">US High School</option>
          <option value="Other">Other</option>
        </select>
        {errors.curriculumType && (
          <p className="mt-1 text-sm text-red-600">{errors.curriculumType.message}</p>
        )}
      </div>

      {selectedCurriculum && (
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            How are your grades recorded? *
          </label>
          <select
            {...register('grading_system_type')}
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm text-gray-900 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="">Select grading system</option>
            <option value="Marks_Out_Of_100">Marks out of 100 (e.g., 95/100)</option>
            <option value="Percentage">Percentage (e.g., 95%)</option>
            <option value="IB_Scale">IB Scale (1-7)</option>
            <option value="Letter_Grade">Letter Grades (A, B, C, etc.)</option>
            <option value="Other">Other</option>
          </select>
          {errors.gradingSystemType && (
            <p className="mt-1 text-sm text-red-600">{errors.gradingSystemType.message}</p>
          )}
          
          <p className="mt-2 text-sm text-gray-500">
            Suggested: {getSuggestedGradingSystem(selectedCurriculum)}
          </p>
        </div>
      )}

      <Input
        label="Current GPA/CGPA (optional)"
        placeholder="e.g., 3.8/4.0 or 9.5/10"
        {...register('current_gpa')}
        error={errors.currentGpa?.message}
      />
      <p className="text-sm text-gray-500">
        If your school provides a GPA or CGPA, enter it here. Otherwise, leave blank.
      </p>

      <div className="flex justify-between">
        <Button type="button" onClick={onBack} variant="outline">
          ← Back
        </Button>
        <Button type="submit">
          Next →
        </Button>
      </div>
    </form>
  );
}
