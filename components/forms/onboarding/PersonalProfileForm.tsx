'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';

const personalProfileWithGradeSchema = z.object({
  preferredName: z.string().optional(),
  phone: z.string().optional(),
  currentSchool: z.string().min(1, 'School name is required'),
  schoolLocation: z.string().min(1, 'School location is required'),
  parentName: z.string().min(1, 'Parent name is required'),
  parentEmail: z.string().email('Invalid email'),
  parentPhone: z.string().min(1, 'Parent phone is required'),
  currentGrade: z.enum(['ninth', 'tenth', 'eleventh', 'twelfth']),
});

type PersonalProfileWithGradeInput = z.infer<typeof personalProfileWithGradeSchema>;

interface Props {
  onNext: (data: PersonalProfileWithGradeInput, completionPercentage?: number) => void;
  initialData?: Partial<PersonalProfileWithGradeInput>;
}

export default function PersonalProfileForm({ onNext, initialData }: Props) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<PersonalProfileWithGradeInput>({
    resolver: zodResolver(personalProfileWithGradeSchema),
    defaultValues: initialData,
  });

  const onSubmit = async (data: PersonalProfileWithGradeInput) => {
    // Save to API (including current_grade which will update Student table)
    const response = await fetch('/api/onboarding/personal', {
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
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-1.5">
          <label className="block text-xs uppercase tracking-wider font-bold text-slate-500">
            Preferred Name <span className="text-slate-400 font-normal">(optional)</span>
          </label>
          <Input
            {...register('preferredName')}
            className="bg-slate-50 border-slate-200 focus:bg-white transition-colors"
          />
          {errors.preferredName && <p className="text-xs text-red-500 font-bold">{errors.preferredName.message}</p>}
        </div>

        <div className="space-y-1.5">
          <label className="block text-xs uppercase tracking-wider font-bold text-slate-500">
            Phone <span className="text-slate-400 font-normal">(optional)</span>
          </label>
          <Input
            type="tel"
            {...register('phone')}
            className="bg-slate-50 border-slate-200 focus:bg-white transition-colors"
          />
          {errors.phone && <p className="text-xs text-red-500 font-bold">{errors.phone.message}</p>}
        </div>
      </div>

      <div className="space-y-1.5">
        <label className="block text-xs uppercase tracking-wider font-bold text-slate-500">
          Current School <span className="text-red-500">*</span>
        </label>
        <Input
          {...register('currentSchool')}
          className="bg-slate-50 border-slate-200 focus:bg-white transition-colors"
        />
        {errors.currentSchool && <p className="text-xs text-red-500 font-bold">{errors.currentSchool.message}</p>}
      </div>

      <div className="space-y-1.5">
        <label className="block text-xs uppercase tracking-wider font-bold text-slate-500">
          School Location <span className="text-red-500 font-normal text-[10px]">(City, State, Country) *</span>
        </label>
        <Input
          placeholder="e.g., Bangalore, Karnataka, India"
          {...register('schoolLocation')}
          className="bg-slate-50 border-slate-200 focus:bg-white transition-colors"
        />
        {errors.schoolLocation && <p className="text-xs text-red-500 font-bold">{errors.schoolLocation.message}</p>}
      </div>

      <div className="space-y-1.5">
        <label className="block text-xs uppercase tracking-wider font-bold text-slate-500">
          Current Grade <span className="text-red-500">*</span>
        </label>
        <select
          {...register('currentGrade')}
          className="w-full h-10 px-3 py-2 bg-slate-50 border border-slate-200 rounded-md text-sm text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
        >
          <option value="">Select your current grade</option>
          <option value="ninth">9th Grade</option>
          <option value="tenth">10th Grade</option>
          <option value="eleventh">11th Grade</option>
          <option value="twelfth">12th Grade</option>
        </select>
        {errors.currentGrade && (
          <p className="mt-1 text-xs text-red-500 font-bold">{errors.currentGrade.message}</p>
        )}
      </div>

      <div className="border-t border-slate-100 pt-8">
        <h3 className="text-sm font-black text-slate-900 uppercase tracking-tight mb-6">Parent/Guardian Information</h3>
        
        <div className="space-y-6">
          <div className="space-y-1.5">
            <label className="block text-xs uppercase tracking-wider font-bold text-slate-500">
              Parent/Guardian Name <span className="text-red-500">*</span>
            </label>
            <Input
              {...register('parentName')}
              className="bg-slate-50 border-slate-200 focus:bg-white transition-colors"
            />
            {errors.parentName && <p className="text-xs text-red-500 font-bold">{errors.parentName.message}</p>}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="block text-xs uppercase tracking-wider font-bold text-slate-500">
                Parent Email <span className="text-red-500">*</span>
              </label>
              <Input
                type="email"
                {...register('parentEmail')}
                className="bg-slate-50 border-slate-200 focus:bg-white transition-colors"
              />
              {errors.parentEmail && <p className="text-xs text-red-500 font-bold">{errors.parentEmail.message}</p>}
            </div>

            <div className="space-y-1.5">
              <label className="block text-xs uppercase tracking-wider font-bold text-slate-500">
                Parent Phone <span className="text-red-500">*</span>
              </label>
              <Input
                type="tel"
                {...register('parentPhone')}
                className="bg-slate-50 border-slate-200 focus:bg-white transition-colors"
              />
              {errors.parentPhone && <p className="text-xs text-red-500 font-bold">{errors.parentPhone.message}</p>}
            </div>
          </div>
        </div>
      </div>

      <div className="flex justify-end">
        <Button type="submit">
          Next →
        </Button>
      </div>
    </form>
  );
}
