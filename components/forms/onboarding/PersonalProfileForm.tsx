'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';
import { ux } from '@/lib/ux';

const personalProfileWithGradeSchema = z.object({
  preferredName: z.string().optional(),
  phone: z.string().optional(),
  currentSchool: z.string().min(1, 'School name is required'),
  schoolLocation: z.string().min(1, 'School location is required'),
  parentName: z.string().min(1, 'Parent name is required'),
  parentEmail: z.string().email('Invalid email'),
  parentPhone: z.string().min(1, 'Parent phone is required'),
  currentGrade: z.enum(['ninth', 'tenth', 'eleventh', 'twelfth']),
  residency: z.string().optional(),
  citizenship: z.string().optional(),
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
          <label className={ux.form.label}>
            Preferred Name <span className="text-slate-400 font-normal">(optional)</span>
          </label>
          <Input
            {...register('preferredName')}
            className={ux.form.input}
          />
          {errors.preferredName && <p className={ux.form.error}>{errors.preferredName.message}</p>}
        </div>

        <div className="space-y-1.5">
          <label className={ux.form.label}>
            Phone <span className="text-slate-400 font-normal">(optional)</span>
          </label>
          <Input
            type="tel"
            {...register('phone')}
            className={ux.form.input}
          />
          {errors.phone && <p className={ux.form.error}>{errors.phone.message}</p>}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-1.5">
          <label className={ux.form.label}>
            Residency <span className="text-slate-400 font-normal">(optional)</span>
          </label>
          <Input
            {...register('residency')}
            placeholder="e.g., California, USA"
            className={ux.form.input}
          />
          {errors.residency && <p className={ux.form.error}>{errors.residency.message}</p>}
        </div>

        <div className="space-y-1.5">
          <label className={ux.form.label}>
            Citizenship <span className="text-slate-400 font-normal">(optional)</span>
          </label>
          <Input
            {...register('citizenship')}
            placeholder="e.g., USA"
            className={ux.form.input}
          />
          {errors.citizenship && <p className={ux.form.error}>{errors.citizenship.message}</p>}
        </div>
      </div>

      <div className="space-y-1.5">
        <label className={ux.form.label}>
          Current School <span className="text-red-500">*</span>
        </label>
        <Input
          {...register('currentSchool')}
          className={ux.form.input}
        />
        {errors.currentSchool && <p className={ux.form.error}>{errors.currentSchool.message}</p>}
      </div>

      <div className="space-y-1.5">
        <label className={ux.form.label}>
          School Location <span className="text-red-500 font-normal text-[10px]">(City, State, Country) *</span>
        </label>
        <Input
          placeholder="e.g., Bangalore, Karnataka, India"
          {...register('schoolLocation')}
          className={ux.form.input}
        />
        {errors.schoolLocation && <p className={ux.form.error}>{errors.schoolLocation.message}</p>}
      </div>

      <div className="space-y-1.5">
        <label className={ux.form.label}>
          Current Grade <span className="text-red-500">*</span>
        </label>
        <select
          {...register('currentGrade')}
          className={ux.form.input}
        >
          <option value="">Select your current grade</option>
          <option value="ninth">9th Grade</option>
          <option value="tenth">10th Grade</option>
          <option value="eleventh">11th Grade</option>
          <option value="twelfth">12th Grade</option>
        </select>
        {errors.currentGrade && (
          <p className={ux.form.error}>{errors.currentGrade.message}</p>
        )}
      </div>

      <div className="border-t border-surface-muted pt-8">
        <h3 className={cn(ux.text.accent, "text-sm mb-6")}>Parent/Guardian Information</h3>
        
        <div className="space-y-6">
          <div className="space-y-1.5">
            <label className={ux.form.label}>
              Parent/Guardian Name <span className="text-red-500">*</span>
            </label>
            <Input
              {...register('parentName')}
              className={ux.form.input}
            />
            {errors.parentName && <p className={ux.form.error}>{errors.parentName.message}</p>}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className={ux.form.label}>
                Parent Email <span className="text-red-500">*</span>
              </label>
              <Input
                type="email"
                {...register('parentEmail')}
                className={ux.form.input}
              />
              {errors.parentEmail && <p className={ux.form.error}>{errors.parentEmail.message}</p>}
            </div>

            <div className="space-y-1.5">
              <label className={ux.form.label}>
                Parent Phone <span className="text-red-500">*</span>
              </label>
              <Input
                type="tel"
                {...register('parentPhone')}
                className={ux.form.input}
              />
              {errors.parentPhone && <p className={ux.form.error}>{errors.parentPhone.message}</p>}
            </div>
          </div>
        </div>
      </div>

      <div className="flex justify-end">
        <Button type="submit" className={ux.button.primary}>
          Next →
        </Button>
      </div>
    </form>
  );
}
