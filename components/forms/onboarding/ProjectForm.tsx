'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { projectSchema, ProjectInput } from '@/lib/validations/activity';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { cn } from '@/lib/utils';
import { ux } from '@/lib/ux';

interface Props {
  onNext: (data: any[], completionPercentage?: number) => void;
  onSave?: (data: any[], completionPercentage?: number) => void;
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

export default function ProjectForm({ onNext, onSave, onBack, initialData = [] }: Props) {
  const router = useRouter();
  
  // Sanitize initialData to ensure dates are strings (handling potential Date objects from server props)
  const sanitizedInitialData = initialData.map(item => {
    // If startDate/endDate are Date objects, convert to string (YYYY-MM or similar expected format)
    // The form expects YYYY-MM if we want to repopulate dropdowns, but for list display we just need string.
    // Let's assume standard ISO or YYYY-MM-DD for now, or just toISOString to be safe for rendering.
    // Better yet, try to keep the format if it's already string, otherwise convert.
    
    const startDate = item.startDate instanceof Date 
      ? item.startDate.toISOString().split('T')[0].substring(0, 7) // YYYY-MM
      : item.startDate;
      
    const endDate = item.endDate instanceof Date 
      ? item.endDate.toISOString().split('T')[0].substring(0, 7) // YYYY-MM
      : item.endDate;

    const { createdAt, updatedAt, ...rest } = item;
    return { ...rest, startDate, endDate };
  });

  const [projects, setProjects] = useState<any[]>(sanitizedInitialData);
  const [showForm, setShowForm] = useState(false);
  const [editIndex, setEditIndex] = useState<number | null>(null);
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
  } = useForm<any>({
    resolver: zodResolver(projectSchema),
    defaultValues: {
      isOngoing: false,
    },
  });

  const experienceType = watch('experienceType');
  const isOngoing = watch('isOngoing');

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

  const saveProjects = async (newProjects: any[]) => {
    try {
      const response = await fetch('/api/onboarding/projects', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ projects: newProjects }),
      });

      if (!response.ok) {
        throw new Error('Failed to save projects');
      }
      
      const responseData = await response.json();
      if (onSave) {
        onSave(newProjects, responseData.completionPercentage);
      }
      return responseData;
    } catch (error) {
      console.error('Error saving projects:', error);
      throw error;
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
    
    if (!data.isOngoing && endMonth && endYear) {
      end_date = `${endYear}-${endMonth}`;
    }

    const projectWithDates = {
      ...data,
      startDate: start_date, // Matching component state / schema (schema uses camelCase for form fields usually, but Prisma uses snake_case sometimes. Let's use what matches the form input if possible or mapped)
      endDate: end_date,
      // Note: Component uses startDate/endDate in the list display logic below, so we should use those keys.
    };

    let updatedProjects;
    if (editIndex !== null) {
      updatedProjects = [...projects];
      updatedProjects[editIndex] = projectWithDates;
      setEditIndex(null);
    } else {
      updatedProjects = [...projects, projectWithDates];
    }
    
    setProjects(updatedProjects);
    saveProjects(updatedProjects);
    
    reset();
    setStartMonth('');
    setStartYear('');
    setEndMonth('');
    setEndYear('');
    setShowForm(false);
  };

  const editProject = (index: number) => {
    const project = projects[index];
    
    // Sanitize data: Convert nulls to empty strings/undefined
    // And exclude dates (handled via state)
    const { startDate, endDate, ...rest } = project;
    
    const sanitizedData = Object.entries(rest).reduce((acc, [key, value]) => {
      acc[key] = value === null ? '' : value;
      return acc;
    }, {} as any);

    reset(sanitizedData);
    
    // Parse dates
    if (project.startDate) {
      const parts = project.startDate.split('-'); // Assuming YYYY-MM string from local state
      if (parts.length >= 2) {
        setStartYear(parts[0]);
        setStartMonth(parts[1]);
      } else if (project.startDate instanceof Date) {
         // handle if it comes back as Date object from initialData
         const d = new Date(project.startDate);
         setStartYear(d.getFullYear().toString());
         setStartMonth((d.getMonth() + 1).toString().padStart(2, '0'));
      }
    } else {
        setStartMonth('');
        setStartYear('');
    }

    if (project.endDate) {
      const parts = project.endDate.split('-');
      if (parts.length >= 2) {
        setEndYear(parts[0]);
        setEndMonth(parts[1]);
      } else if (project.endDate instanceof Date) {
         const d = new Date(project.endDate);
         setEndYear(d.getFullYear().toString());
         setEndMonth((d.getMonth() + 1).toString().padStart(2, '0'));
      }
    } else {
        setEndMonth('');
        setEndYear('');
    }

    setEditIndex(index);
    setShowForm(true);
  };

  const removeProject = (index: number) => {
    const updatedProjects = projects.filter((_, i) => i !== index);
    setProjects(updatedProjects);
    saveProjects(updatedProjects);

    if (editIndex === index) {
      setEditIndex(null);
      setShowForm(false);
      reset();
      setStartMonth('');
      setStartYear('');
      setEndMonth('');
      setEndYear('');
    }
  };

  const handleFinish = async () => {
    setIsSubmitting(true);
    
    try {
      console.log('Saving projects:', projects);
      
      // Save projects first (this ensures consistency)
      const responseData = await saveProjects(projects);
      console.log('Projects API response:', responseData);

      // Update parent with projects and percentage
      onNext(projects, responseData.completionPercentage);

      console.log('Marking onboarding complete...');
      const completeResponse = await fetch('/api/onboarding/complete', {
        method: 'POST',
      });

      const completeData = await completeResponse.json();
      console.log('Complete API response:', completeData);

      if (!completeResponse.ok) {
        const errorMsg = completeData.details?.length > 0
          ? `Onboarding incomplete:\n${completeData.details.join('\n')}`
          : completeData.error || 'Failed to mark onboarding as complete';
        throw new Error(errorMsg);
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
        <p className={ux.text.body}>
          Add projects, research, internships, and summer programs. These are optional but highly recommended.
        </p>

        {projects.length > 0 && (
          <div className="mb-8 mt-6 space-y-3">
            <h3 className={cn(ux.text.accent, "text-sm")}>Added Projects & Experiences ({projects.length})</h3>
            {projects.map((project, index) => (
              <div key={index} className="flex items-center justify-between p-4 bg-surface-soft rounded-xl border border-surface-muted shadow-sm">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="bg-purple-50 text-purple-700 border border-purple-200 font-bold uppercase tracking-wider text-[10px] rounded-full px-2.5 py-0.5">
                      {project.experienceType.replace('_', ' ')}
                    </span>
                    <p className="font-bold text-slate-900">{project.title}</p>
                  </div>
                  <p className="text-xs text-slate-500 mt-2 font-medium">
                    {project.organization && `${project.organization} • `}
                    {project.startDate}
                    {project.isOngoing ? ' - Present' : project.endDate ? ` - ${project.endDate}` : ''}
                  </p>
                </div>
                <div className="flex gap-4">
                  <button
                    type="button"
                    onClick={() => editProject(index)}
                    className="text-brand-600 hover:text-brand-700 font-bold text-xs uppercase tracking-tight"
                  >
                    Edit
                  </button>
                  <button
                    type="button"
                    onClick={() => removeProject(index)}
                    className="text-red-500 hover:text-red-600 font-bold text-xs uppercase tracking-tight"
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {!showForm && (
          <Button
            type="button"
            onClick={() => {
              setShowForm(true);
              setEditIndex(null);
              reset({
                experienceType: undefined,
                title: '',
                organization: '',
                location: '',
                roleTitle: '',
                description: '',
                outcomes: '',
                skillsLearned: '',
                projectLink: '',
                mentorName: '',
                mentorEmail: '',
                isOngoing: false,
              });
              setStartMonth('');
              setStartYear('');
              setEndMonth('');
              setEndYear('');
            }}
            variant="outline"
            className={cn(ux.button.outline, "w-full border-dashed border-2 py-8 hover:bg-brand-50 transition-colors border-brand-200 text-brand-600 font-bold")}
          >
            + Add Project / Experience
          </Button>
        )}

        {showForm && (
          <form 
            onSubmit={handleSubmit(onSubmitProject, (errors) => console.error("Project form errors:", errors))} 
            className="space-y-6 p-6 border-2 border-dashed border-brand-200 rounded-xl bg-brand-50/30 animate-in fade-in zoom-in-95 duration-200"
          >
            <div className="space-y-2">
              <label className={ux.form.label}>
                Experience Type <span className="text-red-500">*</span>
              </label>
              <select
                {...register('experienceType')}
                className={ux.form.input}
              >
                <option value="">Select type</option>
                <option value="Academic_Project">Academic Project</option>
                <option value="Independent_Project">Independent Project</option>
                <option value="Research">Research</option>
                <option value="Internship">Internship</option>
                <option value="Summer_Program">Summer Program</option>
                <option value="Work_Experience">Work Experience</option>
              </select>
              {errors.experienceType && (
                <p className={ux.form.error}>{(errors.experienceType as any).message}</p>
              )}
              {experienceType && (
                <p className={cn(ux.text.accent, "mt-2 bg-brand-50 inline-block px-2 py-1 rounded")}>{getTypeDescription(experienceType)}</p>
              )}
            </div>

            <div className="space-y-2">
              <label className={ux.form.label}>
                Project / Experience Title <span className="text-red-500">*</span>
              </label>
              <Input
                placeholder="e.g., Machine Learning Internship, IB Extended Essay"
                {...register('title')}
                className={ux.form.input}
              />
              {errors.title && <p className={ux.form.error}>{(errors.title as any).message}</p>}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className={ux.form.label}>
                  Organization <span className="text-slate-400 font-normal">(optional)</span>
                </label>
                <Input
                  placeholder="e.g., XYZ Company, IIT Delhi"
                  {...register('organization')}
                  className={ux.form.input}
                />
                {errors.organization && <p className={ux.form.error}>{(errors.organization as any).message}</p>}
              </div>

              <div className="space-y-2">
                <label className={ux.form.label}>
                  Location <span className="text-slate-400 font-normal">(optional)</span>
                </label>
                <Input
                  placeholder="e.g., Bangalore, India or Remote"
                  {...register('location')}
                  className={ux.form.input}
                />
                {errors.location && <p className={ux.form.error}>{(errors.location as any).message}</p>}
              </div>
            </div>

            <div>
              <label className={ux.form.label}>
                Start Date <span className="text-red-500">*</span>
              </label>
              <div className="grid grid-cols-2 gap-4">
                <select
                  value={startMonth}
                  onChange={(e) => setStartMonth(e.target.value)}
                  className={ux.form.input}
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
                  className={ux.form.input}
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
              <label className="flex items-center space-x-2 mb-4 p-3 rounded-xl border border-surface-muted bg-white w-fit cursor-pointer shadow-sm">
                <input
                  type="checkbox"
                  id="isOngoing"
                  {...register('isOngoing')}
                  className="h-4 w-4 text-brand-600 border-slate-300 rounded focus:ring-brand-500"
                />
                <label htmlFor="isOngoing" className="text-xs uppercase font-black text-slate-500 tracking-wide cursor-pointer">Currently ongoing</label>
              </label>

              {!isOngoing && (
                <div className="animate-in fade-in slide-in-from-top-1 duration-200 space-y-2">
                  <label className={ux.form.label}>
                    End Date <span className="text-slate-400 font-normal">(optional)</span>
                  </label>
                  <div className="grid grid-cols-2 gap-4">
                    <select
                      value={endMonth}
                      onChange={(e) => setEndMonth(e.target.value)}
                      className={ux.form.input}
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
                      className={ux.form.input}
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
              <div className="space-y-2 animate-in fade-in slide-in-from-top-1 duration-200">
                <label className={ux.form.label}>
                  Your Role / Title <span className="text-slate-400 font-normal">(optional)</span>
                </label>
                <Input
                  placeholder="e.g., Software Development Intern"
                  {...register('roleTitle')}
                  className={ux.form.input}
                />
                {errors.roleTitle && <p className={ux.form.error}>{(errors.roleTitle as any).message}</p>}
              </div>
            )}

            <div className="space-y-2">
              <label className={ux.form.label}>
                Description <span className="text-red-500">*</span>
              </label>
              <textarea
                {...register('description')}
                rows={4}
                placeholder="What did you do? What did you learn? What were your responsibilities?"
                className={cn(ux.form.input, "min-h-[120px]")}
              />
              {errors.description && (
                <p className={ux.form.error}>{(errors.description as any).message}</p>
              )}
            </div>

            <div className="space-y-2">
              <label className={ux.form.label}>
                Outcomes / Achievements <span className="text-slate-400 font-normal">(optional)</span>
              </label>
              <textarea
                {...register('outcomes')}
                rows={2}
                placeholder="What did you produce or achieve?"
                className={cn(ux.form.input, "min-h-[80px]")}
              />
            </div>

            <div className="space-y-2">
              <label className={ux.form.label}>
                Skills Learned <span className="text-slate-400 font-normal">(optional)</span>
              </label>
              <Input
                placeholder="e.g., Python, Leadership, Research Methods"
                {...register('skillsLearned')}
                className={ux.form.input}
              />
              {errors.skillsLearned && <p className={ux.form.error}>{(errors.skillsLearned as any).message}</p>}
            </div>

            <div className="space-y-2">
              <label className={ux.form.label}>
                Project Link <span className="text-slate-400 font-normal">(optional)</span>
              </label>
              <Input
                placeholder="https://..."
                {...register('projectLink')}
                className={ux.form.input}
              />
              {errors.projectLink && <p className={ux.form.error}>{(errors.projectLink as any).message}</p>}
            </div>

            {(experienceType === 'Research' || experienceType === 'Internship') && (
              <div className="border-t border-surface-muted pt-6 animate-in fade-in slide-in-from-top-1 duration-200">
                <h4 className={cn(ux.text.accent, "mb-4")}>Mentor Information (optional)</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className={ux.form.label}>Mentor Name</label>
                    <Input
                      placeholder="e.g., Dr. Anjali Sharma"
                      {...register('mentorName')}
                      className={ux.form.input}
                    />
                    {errors.mentorName && <p className={ux.form.error}>{(errors.mentorName as any).message}</p>}
                  </div>

                  <div className="space-y-2">
                    <label className={ux.form.label}>Mentor Email</label>
                    <Input
                      placeholder="for potential recommendation letters"
                      {...register('mentorEmail')}
                      className={ux.form.input}
                    />
                    {errors.mentorEmail && <p className={ux.form.error}>{(errors.mentorEmail as any).message}</p>}
                  </div>
                </div>
              </div>
            )}

            <div className="flex gap-4">
              <Button type="submit" className={cn(ux.button.primary, "flex-1")}>
                {editIndex !== null ? 'Update Project' : 'Add Project'}
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
                  setEditIndex(null);
                }}
                variant="outline"
                className={ux.button.outline}
              >
                Cancel
              </Button>
            </div>
          </form>
        )}
      </div>

      <div className="flex justify-between pt-6 border-t border-surface-muted">
        <Button type="button" onClick={onBack} variant="outline" className={ux.button.outline}>
          ← Back
        </Button>
        <Button
          type="button"
          onClick={handleFinish}
          disabled={isSubmitting}
          className={ux.button.primary}
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
