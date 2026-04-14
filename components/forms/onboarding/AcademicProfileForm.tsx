'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { academicProfileSchema, AcademicProfileInput } from '@/lib/validations/student';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useState } from 'react';
import { cn } from '@/lib/utils';

interface Props {
  onNext: (data: AcademicProfileInput, completionPercentage?: number) => void;
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

  const curriculumType = watch('curriculumType');

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
      const responseData = await response.json();
      onNext(data, responseData.completionPercentage);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
      <div className="space-y-1.5">
        <label className="block text-xs uppercase tracking-wider font-bold text-slate-500">
          What curriculum do you follow? <span className="text-red-500">*</span>
        </label>
        <select
          {...register('curriculumType')}
          onChange={(e) => setSelectedCurriculum(e.target.value)}
          className="w-full h-10 px-3 py-2 bg-slate-50 border border-slate-200 rounded-md text-sm text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
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
          <p className="mt-1 text-xs text-red-500 font-bold">{errors.curriculumType.message}</p>
        )}
      </div>

      {selectedCurriculum && (
        <div className="space-y-1.5 animate-in fade-in slide-in-from-top-1 duration-200">
          <label className="block text-xs uppercase tracking-wider font-bold text-slate-500">
            How are your grades recorded? <span className="text-red-500">*</span>
          </label>
          <select
            {...register('gradingSystemType')}
            className="w-full h-10 px-3 py-2 bg-slate-50 border border-slate-200 rounded-md text-sm text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
          >
            <option value="">Select grading system</option>
            <option value="Marks_Out_Of_100">Marks out of 100 (e.g., 95/100)</option>
            <option value="Percentage">Percentage (e.g., 95%)</option>
            <option value="IB_Scale">IB Scale (1-7)</option>
            <option value="Letter_Grade">Letter Grades (A, B, C, etc.)</option>
            <option value="Other">Other</option>
          </select>
          {errors.gradingSystemType && (
            <p className="mt-1 text-xs text-red-500 font-bold">{errors.gradingSystemType.message}</p>
          )}
          
          <p className="mt-2 text-[10px] uppercase font-bold text-blue-600 tracking-wider">
            Suggested: {getSuggestedGradingSystem(selectedCurriculum).replace(/_/g, ' ')}
          </p>
        </div>
      )}

      <div className="space-y-1.5">
        <label className="block text-xs uppercase tracking-wider font-bold text-slate-500">
          Current GPA/CGPA <span className="text-slate-400 font-normal">(optional)</span>
        </label>
        <Input
          placeholder="e.g., 3.8/4.0 or 9.5/10"
          {...register('currentGpa')}
          className="bg-slate-50 border-slate-200 focus:bg-white transition-colors"
        />
        {errors.currentGpa && <p className="text-xs text-red-500 font-bold">{errors.currentGpa.message}</p>}
      </div>
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
