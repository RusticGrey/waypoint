'use client';

import { useState, useEffect } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useEnums } from '@/lib/hooks/useEnums';

export default function EditAcademicPage() {
  const router = useRouter();
  const { enums, loading: enumsLoading } = useEnums();
  const [formData, setFormData] = useState({
    curriculum_type: '',
    grading_system_type: '',
    current_gpa: '',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchAcademicInfo();
  }, []);

  // Set defaults once enums load
  useEffect(() => {
    if (enums && enums.curriculumTypes && enums.gradingSystemTypes && !formData.curriculum_type) {
      setFormData(prev => ({
        ...prev,
        curriculum_type: prev.curriculum_type || enums.curriculumTypes[0],
        grading_system_type: prev.grading_system_type || enums.gradingSystemTypes[0],
      }));
    }
  }, [enums]);

  const fetchAcademicInfo = async () => {
    try {
      const res = await fetch('/api/student/academic');
      const data = await res.json();
      if (data.AcademicProfile) {
        setFormData({
          curriculum_type: data.AcademicProfile.curriculum_type,
          grading_system_type: data.AcademicProfile.grading_system_type,
          current_gpa: data.AcademicProfile.current_gpa || '',
        });
      }
    } catch (err) {
      console.error('Failed to fetch academic info:', err);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    
    try {
      const res = await fetch('/api/student/academic', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          curriculum_type: formData.curriculum_type,
          grading_system_type: formData.grading_system_type,
          current_gpa: formData.current_gpa || null,
        }),
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.error || 'Failed to save');
      }

      router.push('/student/profile');
      router.refresh();
    } catch (err: any) {
      console.error('Save error:', err);
      setError(err.message || 'Failed to save academic info');
    } finally {
      setLoading(false);
    }
  };

  if (enumsLoading) {
    return (
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <p className="text-gray-600 text-center py-12">Loading...</p>
      </div>
    );
  }

  if (!enums || !enums.curriculumTypes || !enums.gradingSystemTypes) {
    return (
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <p className="text-red-600 text-center py-12">Failed to load form options</p>
      </div>
    );
  }

  // Helper to display enum values nicely
  const formatEnumValue = (value: string) => {
    return value.replace(/_/g, ' ');
  };

  // Get field config based on grading system
  const getGradeFieldConfig = () => {
    switch (formData.grading_system_type) {
      case 'Marks_Out_Of_100':
        return {
          label: 'Current Marks (out of 100)',
          placeholder: 'e.g., 85',
          type: 'number',
          min: '0',
          max: '100',
          step: '0.01',
          helpText: 'Enter your current marks out of 100'
        };
      case 'Percentage':
        return {
          label: 'Current Percentage',
          placeholder: 'e.g., 85.5',
          type: 'number',
          min: '0',
          max: '100',
          step: '0.01',
          helpText: 'Enter your current percentage (0-100)'
        };
      case 'IB_Scale':
        return {
          label: 'Current IB Score',
          placeholder: 'e.g., 38',
          type: 'number',
          min: '0',
          max: '45',
          step: '1',
          helpText: 'Enter your IB predicted score (0-45)'
        };
      case 'Letter_Grade':
        return {
          label: 'Current Letter Grade',
          placeholder: 'e.g., A, A+, A-, B+',
          type: 'text', // Changed to text!
          helpText: 'Enter your current letter grade (e.g., A+, A, A-, B+, B)'
        };
      case 'Other':
        return {
          label: 'Current Grade',
          placeholder: 'Enter your current grade',
          type: 'text',
          helpText: 'Enter your current grade in your grading system'
        };
      default:
        return {
          label: 'Current Grade',
          placeholder: 'Enter your current grade',
          type: 'text',
          helpText: 'Enter your current grade'
        };
    }
  };

  const gradeConfig = getGradeFieldConfig();

  // Render the appropriate input based on type
  const renderGradeInput = () => {
    const baseClasses = "w-full px-3 py-2 border border-gray-300 rounded-md text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500";
    
    if (gradeConfig.type === 'number') {
      return (
        <input
          type="number"
          value={formData.current_gpa}
          onChange={(e) => setFormData({ ...formData, current_gpa: e.target.value })}
          placeholder={gradeConfig.placeholder}
          min={gradeConfig.min}
          max={gradeConfig.max}
          step={gradeConfig.step}
          className={baseClasses}
        />
      );
    } else {
      // Text input for Letter_Grade and Other
      return (
        <input
          type="text"
          value={formData.current_gpa}
          onChange={(e) => setFormData({ ...formData, current_gpa: e.target.value })}
          placeholder={gradeConfig.placeholder}
          className={baseClasses}
        />
      );
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="mb-6 flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Edit Academic Information</h1>
          <p className="text-gray-600 mt-1">Update your academic details</p>
        </div>
        <Link href="/student/profile" className="text-blue-600 hover:text-blue-700">
          ← Back to Profile
        </Link>
      </div>

      {error && (
        <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-lg">
          <p className="text-red-800">{error}</p>
        </div>
      )}

      <Card>
        <CardContent className="pt-6">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-900 mb-1">
                Curriculum Type *
              </label>
              <select
                value={formData.curriculum_type}
                onChange={(e) => setFormData({ ...formData, curriculum_type: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md text-gray-900"
                required
              >
                {enums.curriculumTypes.map(type => (
                  <option key={type} value={type}>
                    {formatEnumValue(type)}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-900 mb-1">
                Grading System *
              </label>
              <select
                value={formData.grading_system_type}
                onChange={(e) => {
                  setFormData({ 
                    ...formData, 
                    grading_system_type: e.target.value,
                    current_gpa: '' // Clear GPA when changing grading system
                  });
                }}
                className="w-full px-3 py-2 border border-gray-300 rounded-md text-gray-900"
                required
              >
                {enums.gradingSystemTypes.map(type => (
                  <option key={type} value={type}>
                    {formatEnumValue(type)}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-900 mb-1">
                {gradeConfig.label}
              </label>
              {renderGradeInput()}
              <p className="text-xs text-gray-500 mt-1">{gradeConfig.helpText}</p>
            </div>

            <div className="flex gap-2 pt-4">
              <Button type="submit" className="flex-1" disabled={loading}>
                {loading ? 'Saving...' : 'Save Changes'}
              </Button>
              <Button
                type="button"
                onClick={() => router.push('/student/profile')}
                variant="outline"
                disabled={loading}
              >
                Cancel
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
