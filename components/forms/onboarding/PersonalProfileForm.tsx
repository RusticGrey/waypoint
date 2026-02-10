'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

const personalProfileWithGradeSchema = z.object({
  preferred_name: z.string().optional(),
  phone: z.string().optional(),
  current_school: z.string().min(1, 'School name is required'),
  school_location: z.string().min(1, 'School location is required'),
  parent_name: z.string().min(1, 'Parent name is required'),
  parent_email: z.string().email('Invalid email'),
  parent_phone: z.string().min(1, 'Parent phone is required'),
  current_grade: z.enum(['ninth', 'tenth', 'eleventh', 'twelfth']),
});

type PersonalProfileWithGradeInput = z.infer<typeof personalProfileWithGradeSchema>;

interface Props {
  onNext: (data: PersonalProfileWithGradeInput) => void;
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
      onNext(data);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Input
          label="Preferred Name (optional)"
          {...register('preferred_name')}
          error={errors.preferred_name?.message}
        />

        <Input
          label="Phone (optional)"
          type="tel"
          {...register('phone')}
          error={errors.phone?.message}
        />
      </div>

      <Input
        label="Current School *"
        {...register('current_school')}
        error={errors.current_school?.message}
      />

      <Input
        label="School Location (City, State, Country) *"
        placeholder="e.g., Bangalore, Karnataka, India"
        {...register('school_location')}
        error={errors.school_location?.message}
      />

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Current Grade *
        </label>
        <select
          {...register('current_grade')}
          className="w-full px-3 py-2 border border-gray-300 rounded-md text-gray-900"
        >
          <option value="">Select your current grade</option>
          <option value="ninth">9th Grade</option>
          <option value="tenth">10th Grade</option>
          <option value="eleventh">11th Grade</option>
          <option value="twelfth">12th Grade</option>
        </select>
        {errors.current_grade && (
          <p className="mt-1 text-sm text-red-600">{errors.current_grade.message}</p>
        )}
      </div>

      <div className="border-t border-gray-200 pt-6">
        <h3 className="text-lg font-medium text-gray-900 mb-4">Parent/Guardian Information</h3>
        
        <div className="space-y-4">
          <Input
            label="Parent/Guardian Name *"
            {...register('parent_name')}
            error={errors.parent_name?.message}
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input
              label="Parent Email *"
              type="email"
              {...register('parent_email')}
              error={errors.parent_email?.message}
            />

            <Input
              label="Parent Phone *"
              type="tel"
              {...register('parent_phone')}
              error={errors.parent_phone?.message}
            />
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
