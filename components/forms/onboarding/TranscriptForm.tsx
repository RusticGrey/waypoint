'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { transcriptSchema, TranscriptInput } from '@/lib/validations/student';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useState, useMemo, useEffect } from 'react';

interface Props {
  onNext: (data: any[]) => void;
  onBack: () => void;
  initialData?: any[];
  curriculum?: string;
  currentGrade?: string;
}

export default function TranscriptForm({ onNext, onBack, initialData = [], curriculum, currentGrade }: Props) {
  const [transcripts, setTranscripts] = useState<any[]>(initialData);
  const [showForm, setShowForm] = useState(false);
  const [availableCourses, setAvailableCourses] = useState<Array<{ id: string; subject_name: string }>>([]);
  const [useCustomCourse, setUseCustomCourse] = useState(false);

  // Fetch courses for curriculum
  useEffect(() => {
    if (curriculum) {
      fetch(`/api/subjects?curriculum=${curriculum}`)
        .then(res => res.json())
        .then(data => setAvailableCourses(data.subjects || []))
        .catch(err => console.error('Failed to fetch courses:', err));
    }
  }, [curriculum]);

  const availableGrades = useMemo(() => {
    const gradeOrder = ['ninth', 'tenth', 'eleventh', 'twelfth'];
    const currentIndex = gradeOrder.indexOf(currentGrade || 'twelfth');
    return gradeOrder.slice(0, currentIndex + 1);
  }, [currentGrade]);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    watch,
    setValue,
  } = useForm<TranscriptInput>({
    resolver: zodResolver(transcriptSchema),
    defaultValues: {
      honors_level: 'Standard',
      is_board_exam: false,
      semester: 'Full_Year',
    },
  });

  const selectedCourse = watch('course_name');

  const onSubmitCourse = (data: TranscriptInput) => {
    setTranscripts([...transcripts, data]);
    reset();
    setShowForm(false);
    setUseCustomCourse(false);
  };

  const removeCourse = (index: number) => {
    setTranscripts(transcripts.filter((_, i) => i !== index));
  };

  const handleNext = async () => {
    const response = await fetch('/api/onboarding/transcripts', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ transcripts }),
    });

    if (response.ok) {
      onNext(transcripts);
    }
  };

  const getGradeLabel = () => {
    switch (curriculum) {
      case 'CBSE':
      case 'ICSE':
      case 'State_Board':
        return 'Marks (e.g., 95/100 or just 95)';
      case 'IB':
        return 'IB Score (1-7)';
      case 'US_High_School':
        return 'Letter Grade (e.g., A, B+, C)';
      default:
        return 'Grade';
    }
  };

  const gradeLabels: Record<string, string> = {
    ninth: '9th Grade',
    tenth: '10th Grade',
    eleventh: '11th Grade',
    twelfth: '12th Grade',
  };

  return (
    <div className="space-y-6">
      <div>
        <p className="text-sm text-gray-600 mb-4">
          Add courses you've completed in grades up to {gradeLabels[currentGrade || 'twelfth']}.
        </p>

        {transcripts.length > 0 && (
          <div className="mb-6 space-y-2">
            <h3 className="font-medium text-gray-900">Added Courses ({transcripts.length})</h3>
            {transcripts.map((transcript, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded border">
                <div>
                  <p className="font-medium text-gray-900">{transcript.course_name}</p>
                  <p className="text-sm text-gray-600">
                    Grade: {transcript.grade_value} | {gradeLabels[transcript.grade_level]} | {transcript.semester}
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => removeCourse(index)}
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
            + Add Course
          </Button>
        )}

        {showForm && (
          <form onSubmit={handleSubmit(onSubmitCourse)} className="space-y-4 p-4 border rounded-lg bg-gray-50">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Course Name *
              </label>
              {!useCustomCourse ? (
                <div>
                  <select
                    {...register('course_name')}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md text-gray-900"
                  >
                    <option value="">Select a course</option>
                    {availableCourses.map((course) => (
                      <option key={course.id} value={course.subject_name}>
                        {course.subject_name}
                      </option>
                    ))}
                  </select>
                  <button
                    type="button"
                    onClick={() => {
                      setUseCustomCourse(true);
                      setValue('course_name', '');
                    }}
                    className="mt-2 text-sm text-blue-600 hover:text-blue-700"
                  >
                    + Add custom course name
                  </button>
                </div>
              ) : (
                <div>
                  <Input
                    placeholder="Enter course name"
                    {...register('course_name')}
                    error={errors.course_name?.message}
                  />
                  <button
                    type="button"
                    onClick={() => {
                      setUseCustomCourse(false);
                      setValue('course_name', '');
                    }}
                    className="mt-2 text-sm text-blue-600 hover:text-blue-700"
                  >
                    ← Choose from standard courses
                  </button>
                </div>
              )}
              {errors.course_name && (
                <p className="mt-1 text-sm text-red-600">{errors.course_name.message}</p>
              )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Grade Level *
                </label>
                <select
                  {...register('grade_level')}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md text-gray-900"
                >
                  <option value="">Select grade</option>
                  {availableGrades.map((grade) => (
                    <option key={grade} value={grade}>{gradeLabels[grade]}</option>
                  ))}
                </select>
                {errors.grade_level && (
                  <p className="mt-1 text-sm text-red-600">{errors.grade_level.message}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Semester *
                </label>
                <select
                  {...register('semester')}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md text-gray-900"
                >
                  <option value="Full_Year">Full Year</option>
                  <option value="Fall">Fall Semester</option>
                  <option value="Spring">Spring Semester</option>
                </select>
              </div>
            </div>

            <Input
              label={getGradeLabel() + ' *'}
              placeholder={curriculum === 'CBSE' ? 'e.g., 95' : 'Your grade'}
              {...register('grade_value')}
              error={errors.grade_value?.message}
            />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Honors Level
                </label>
                <select
                  {...register('honors_level')}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md text-gray-900"
                >
                  <option value="Standard">Standard</option>
                  <option value="Honors">Honors</option>
                  <option value="AP">AP</option>
                  <option value="IB_HL">IB Higher Level</option>
                  <option value="IB_SL">IB Standard Level</option>
                </select>
              </div>

              {(curriculum === 'CBSE' || curriculum === 'ICSE') && (
                <div className="flex items-center pt-6">
                  <input
                    type="checkbox"
                    {...register('is_board_exam')}
                    className="h-4 w-4 text-blue-600 rounded"
                  />
                  <label className="ml-2 text-sm text-gray-700">
                    Board Exam (10th/12th)
                  </label>
                </div>
              )}
            </div>

            <div className="flex gap-2">
              <Button type="submit" className="flex-1">
                Add Course
              </Button>
              <Button
                type="button"
                onClick={() => {
                  setShowForm(false);
                  reset();
                  setUseCustomCourse(false);
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
          onClick={handleNext}
          disabled={transcripts.length === 0}
        >
          Next →
        </Button>
      </div>

      {transcripts.length === 0 && (
        <p className="text-sm text-gray-500 text-center">
          Add at least one course to continue
        </p>
      )}
    </div>
  );
}
