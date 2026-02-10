'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { projectSchema, ProjectInput } from '@/lib/validations/activity';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

interface Props {
  onNext: (data: any[]) => void;
  onBack: () => void;
  initialData?: any[];
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

export default function ProjectForm({ onNext, onBack, initialData = [] }: Props) {
  const router = useRouter();
  const [projects, setProjects] = useState<any[]>(initialData);
  const [showForm, setShowForm] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [startMonth, setStartMonth] = useState('');
  const [startYear, setStartYear] = useState('');
  const [endMonth, setEndMonth] = useState('');
  const [endYear, setEndYear] = useState('');

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    watch,
  } = useForm<ProjectInput>({
    resolver: zodResolver(projectSchema),
    defaultValues: {
      is_ongoing: false,
      status: 'Completed',
    },
  });

  const experienceType = watch('experience_type');
  const isOngoing = watch('is_ongoing');

  const getTypeDescription = (type: string) => {
    switch (type) {
      case 'Academic_Project':
        return 'School projects, capstone, IB Extended Essay';
      case 'Independent_Project':
        return 'Personal coding projects, art portfolios, writing';
      case 'Research':
        return 'Lab research, science fair, independent studies';
      case 'Internship':
        return 'Company internships (paid or unpaid)';
      case 'Summer_Program':
        return 'Residential programs, online courses';
      case 'Work_Experience':
        return 'Part-time jobs, freelancing';
      default:
        return '';
    }
  };

  const onSubmitProject = (data: any) => {
    // Validate dates are selected
    if (!startMonth || !startYear) {
      alert('Please select start month and year');
      return;
    }

    const start_date = `${startYear}-${startMonth}`;
    let end_date = null;
    
    if (!data.is_ongoing && endMonth && endYear) {
      end_date = `${endYear}-${endMonth}`;
    }

    const projectWithDates = {
      ...data,
      start_date,
      end_date,
    };

    console.log('Adding project:', projectWithDates);
    setProjects([...projects, projectWithDates]);
    reset();
    setStartMonth('');
    setStartYear('');
    setEndMonth('');
    setEndYear('');
    setShowForm(false);
  };

  const removeProject = (index: number) => {
    setProjects(projects.filter((_, i) => i !== index));
  };

  const handleFinish = async () => {
    setIsSubmitting(true);
    
    try {
      console.log('Saving projects:', projects);
      
      const response = await fetch('/api/onboarding/projects', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ projects }),
      });

      const responseData = await response.json();
      console.log('Projects API response:', responseData);

      if (!response.ok) {
        throw new Error(responseData.error || 'Failed to save projects');
      }

      console.log('Marking onboarding complete...');
      const completeResponse = await fetch('/api/onboarding/complete', {
        method: 'POST',
      });

      const completeData = await completeResponse.json();
      console.log('Complete API response:', completeData);

      if (!completeResponse.ok) {
        throw new Error(completeData.error || 'Failed to mark onboarding as complete');
      }

      console.log('Redirecting to dashboard...');
      router.push('/student');
      router.refresh();
    } catch (error) {
      console.error('Error completing onboarding:', error);
      alert(`Error: ${error instanceof Error ? error.message : 'Unknown error'}`);
      setIsSubmitting(false);
    }
  };

  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: 10 }, (_, i) => currentYear - i);

  return (
    <div className="space-y-6">
      <div>
        <p className="text-sm text-gray-600 mb-4">
          Add projects, research, internships, and summer programs. These are optional but highly recommended.
        </p>

        {projects.length > 0 && (
          <div className="mb-6 space-y-2">
            <h3 className="font-medium text-gray-900">Added Projects & Experiences ({projects.length})</h3>
            {projects.map((project, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded border">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="px-2 py-1 bg-purple-100 text-purple-800 text-xs rounded">
                      {project.experience_type.replace('_', ' ')}
                    </span>
                    <p className="font-medium text-gray-900">{project.title}</p>
                  </div>
                  <p className="text-sm text-gray-600 mt-1">
                    {project.organization && `${project.organization} • `}
                    {project.start_date}
                    {project.is_ongoing ? ' - Present' : project.end_date ? ` - ${project.end_date}` : ''}
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => removeProject(index)}
                  className="text-red-600 hover:text-red-800 text-sm"
                >
                  Remove
                </button>
              </div>
            ))}
          </div>
        )}

        {!showForm && (
          <Button
            type="button"
            onClick={() => setShowForm(true)}
            variant="outline"
            className="w-full"
          >
            + Add Project / Experience
          </Button>
        )}

        {showForm && (
          <form onSubmit={handleSubmit(onSubmitProject)} className="space-y-4 p-4 border rounded-lg bg-gray-50">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Experience Type *
              </label>
              <select
                {...register('experience_type')}
                className="w-full px-3 py-2 border border-gray-300 rounded-md text-gray-900"
              >
                <option value="">Select type</option>
                <option value="Academic_Project">Academic Project</option>
                <option value="Independent_Project">Independent Project</option>
                <option value="Research">Research</option>
                <option value="Internship">Internship</option>
                <option value="Summer_Program">Summer Program</option>
                <option value="Work_Experience">Work Experience</option>
              </select>
              {errors.experience_type && (
                <p className="mt-1 text-sm text-red-600">{errors.experience_type.message}</p>
              )}
              {experienceType && (
                <p className="mt-1 text-xs text-gray-500">{getTypeDescription(experienceType)}</p>
              )}
            </div>

            <Input
              label="Project / Experience Title *"
              placeholder="e.g., Machine Learning Internship, IB Extended Essay"
              {...register('title')}
              error={errors.title?.message}
            />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Input
                label="Organization (optional)"
                placeholder="e.g., XYZ Company, IIT Delhi"
                {...register('organization')}
                error={errors.organization?.message}
              />

              <Input
                label="Location (optional)"
                placeholder="e.g., Bangalore, India or Remote"
                {...register('location')}
                error={errors.location?.message}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Start Date *
              </label>
              <div className="grid grid-cols-2 gap-4">
                <select
                  value={startMonth}
                  onChange={(e) => setStartMonth(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md text-gray-900"
                >
                  <option value="">Month</option>
                  {MONTHS.map((month) => (
                    <option key={month.value} value={month.value}>
                      {month.label}
                    </option>
                  ))}
                </select>
                <select
                  value={startYear}
                  onChange={(e) => setStartYear(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md text-gray-900"
                >
                  <option value="">Year</option>
                  {years.map((year) => (
                    <option key={year} value={year}>
                      {year}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div>
              <label className="flex items-center mb-2">
                <input
                  type="checkbox"
                  {...register('is_ongoing')}
                  className="h-4 w-4 text-blue-600 rounded"
                />
                <span className="ml-2 text-sm font-medium text-gray-700">Currently ongoing</span>
              </label>

              {!isOngoing && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    End Date (optional)
                  </label>
                  <div className="grid grid-cols-2 gap-4">
                    <select
                      value={endMonth}
                      onChange={(e) => setEndMonth(e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md text-gray-900"
                    >
                      <option value="">Month</option>
                      {MONTHS.map((month) => (
                        <option key={month.value} value={month.value}>
                          {month.label}
                        </option>
                      ))}
                    </select>
                    <select
                      value={endYear}
                      onChange={(e) => setEndYear(e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md text-gray-900"
                    >
                      <option value="">Year</option>
                      {years.map((year) => (
                        <option key={year} value={year}>
                          {year}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              )}
            </div>

            {(experienceType === 'Internship' || experienceType === 'Work_Experience') && (
              <Input
                label="Your Role / Title (optional)"
                placeholder="e.g., Software Development Intern"
                {...register('role_title')}
                error={errors.role_title?.message}
              />
            )}

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Description *
              </label>
              <textarea
                {...register('description')}
                rows={4}
                placeholder="What did you do? What did you learn? What were your responsibilities?"
                className="w-full px-3 py-2 border border-gray-300 rounded-md text-gray-900"
              />
              {errors.description && (
                <p className="mt-1 text-sm text-red-600">{errors.description.message}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Outcomes / Achievements (optional)
              </label>
              <textarea
                {...register('outcomes')}
                rows={2}
                placeholder="What did you produce or achieve?"
                className="w-full px-3 py-2 border border-gray-300 rounded-md text-gray-900"
              />
            </div>

            <Input
              label="Skills Learned (optional)"
              placeholder="e.g., Python, Leadership, Research Methods"
              {...register('skills_learned')}
              error={errors.skills_learned?.message}
            />

            <Input
              label="Project Link (optional)"
              placeholder="https://..."
              {...register('project_link')}
              error={errors.project_link?.message}
            />

            {(experienceType === 'Research' || experienceType === 'Internship') && (
              <div className="border-t pt-4">
                <h4 className="text-sm font-medium text-gray-700 mb-3">Mentor Information (optional)</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Input
                    label="Mentor Name"
                    placeholder="e.g., Dr. Anjali Sharma"
                    {...register('mentor_name')}
                    error={errors.mentor_name?.message}
                  />

                  <Input
                    label="Mentor Email"
                    placeholder="for potential recommendation letters"
                    {...register('mentor_email')}
                    error={errors.mentor_email?.message}
                  />
                </div>
              </div>
            )}

            <div className="flex gap-2">
              <Button type="submit" className="flex-1">
                Add Project
              </Button>
              <Button
                type="button"
                onClick={() => {
                  setShowForm(false);
                  reset();
                  setStartMonth('');
                  setStartYear('');
                  setEndMonth('');
                  setEndYear('');
                }}
                variant="outline"
              >
                Cancel
              </Button>
            </div>
          </form>
        )}
      </div>

      <div className="flex justify-between pt-6 border-t">
        <Button type="button" onClick={onBack} variant="outline">
          ← Back
        </Button>
        <Button
          type="button"
          onClick={handleFinish}
          disabled={isSubmitting}
        >
          {isSubmitting ? 'Completing...' : 'Complete Onboarding →'}
        </Button>
      </div>

      <p className="text-sm text-gray-500 text-center">
        Projects are optional. You can skip this step and add them later.
      </p>
    </div>
  );
}
