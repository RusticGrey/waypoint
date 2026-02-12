'use client';

import { useState, useEffect } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import Link from 'next/link';
import { useEnums } from '@/lib/hooks/useEnums';

interface Transcript {
  id: string;
  courseName: string;
  gradeLevel: string;
  semester: string;
  gradeValue: string;
  honorsLevel: string;
}

const gradeLabels: Record<string, string> = {
  ninth: '9th Grade',
  tenth: '10th Grade',
  eleventh: '11th Grade',
  twelfth: '12th Grade',
};

export default function EditTranscriptsPage() {
  const { enums, loading: enumsLoading } = useEnums();
  const [transcripts, setTranscripts] = useState<Transcript[]>([]);
  const [courses, setCourses] = useState<string[]>([]);
  const [curriculum, setCurriculum] = useState('');
  const [gradingSystem, setGradingSystem] = useState('');
  const [editingId, setEditingId] = useState<string | null>(null);
  const [showAdd, setShowAdd] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [formData, setFormData] = useState({
    courseName: '',
    gradeLevel: '',
    semester: '',
    gradeValue: '',
    honorsLevel: '',
  });

  useEffect(() => {
    fetchStudentCurriculum();
    fetchTranscripts();
  }, []);

  useEffect(() => {
    if (curriculum) {
      fetchCourses();
    }
  }, [curriculum]);

  // Set defaults when enums load
  useEffect(() => {
    if (enums && enums.gradeLevels && enums.semesterTypes && enums.honorsLevels && !formData.gradeLevel) {
      setFormData(prev => ({
        ...prev,
        gradeLevel: enums.gradeLevels[0],
        semester: enums.semesterTypes[0],
        honorsLevel: enums.honorsLevels[0],
      }));
    }
  }, [enums]);

  const fetchStudentCurriculum = async () => {
    try {
      const res = await fetch('/api/student/academic');
      const data = await res.json();
      if (data.academicProfile?.curriculumType) {
        setCurriculum(data.academicProfile.curriculumType);
        setGradingSystem(data.academicProfile.gradingSystemType || 'Percentage');
      }
    } catch (err) {
      console.error('Failed to fetch curriculum:', err);
    }
  };

  const fetchTranscripts = async () => {
    try {
      const res = await fetch('/api/student/transcripts');
      if (!res.ok) throw new Error('Failed to fetch transcripts');
      const data = await res.json();
      setTranscripts(data.transcripts || []);
    } catch (err) {
      console.error('Fetch error:', err);
      setError('Failed to load transcripts');
    }
  };

  const fetchCourses = async () => {
    try {
      const res = await fetch(`/api/subjects?curriculum=${curriculum}`);
      const data = await res.json();
      setCourses(data.subjects || []);
    } catch (err) {
      console.error('Failed to fetch courses:', err);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    
    try {
      const url = editingId 
        ? `/api/student/transcripts/${editingId}`
        : '/api/student/transcripts';
      
      const method = editingId ? 'PATCH' : 'POST';

      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.error || 'Failed to save transcript');
      }

      resetForm();
      await fetchTranscripts();
    } catch (err: any) {
      console.error('Submit error:', err);
      setError(err.message || 'Failed to save transcript');
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (transcript: Transcript) => {
    setEditingId(transcript.id);
    setFormData({
      courseName: transcript.courseName,
      gradeLevel: transcript.gradeLevel,
      semester: transcript.semester,
      gradeValue: transcript.gradeValue,
      honorsLevel: transcript.honorsLevel,
    });
    setShowAdd(true);
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Delete this course?')) return;
    
    setLoading(true);
    try {
      const res = await fetch(`/api/student/transcripts/${id}`, {
        method: 'DELETE',
      });

      if (!res.ok) throw new Error('Failed to delete transcript');

      await fetchTranscripts();
    } catch (err) {
      console.error('Delete error:', err);
      setError('Failed to delete transcript');
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setEditingId(null);
    setShowAdd(false);
    setFormData({
      courseName: '',
      gradeLevel: enums?.gradeLevels?.[0] || '',
      semester: enums?.semesterTypes?.[0] || '',
      gradeValue: '',
      honorsLevel: enums?.honorsLevels?.[0] || '',
    });
  };

  // Get grade field configuration based on grading system
  const getGradeFieldConfig = () => {
    switch (gradingSystem) {
      case 'Marks_Out_Of_100':
        return {
          label: 'Grade (Marks) *',
          placeholder: 'e.g., 85, 92',
          type: 'number',
          min: '0',
          max: '100',
          step: '0.01',
          helpText: 'Enter marks out of 100'
        };
      case 'Percentage':
        return {
          label: 'Grade (%) *',
          placeholder: 'e.g., 85, 92.5',
          type: 'number',
          min: '0',
          max: '100',
          step: '0.01',
          helpText: 'Enter percentage (0-100)'
        };
      case 'IB_Scale':
        return {
          label: 'IB Grade *',
          placeholder: 'e.g., 7, 6, 5',
          type: 'number',
          min: '1',
          max: '7',
          step: '1',
          helpText: 'Enter IB grade (1-7)'
        };
      case 'Letter_Grade':
        return {
          label: 'Letter Grade *',
          placeholder: 'e.g., A+, A, A-, B+, B',
          type: 'text', // Changed to text for letter grades
          helpText: 'Enter letter grade (A+, A, A-, B+, B, B-, C+, etc.)'
        };
      case 'Other':
        return {
          label: 'Grade *',
          placeholder: 'Enter your grade',
          type: 'text',
          helpText: 'Enter grade in your grading system'
        };
      default:
        return {
          label: 'Grade *',
          placeholder: 'e.g., A, 85%, 3.8',
          type: 'text',
          helpText: 'Enter your grade'
        };
    }
  };

  if (enumsLoading) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <p className="text-gray-600 text-center py-12">Loading...</p>
      </div>
    );
  }

  if (!enums || !enums.gradeLevels || !enums.semesterTypes || !enums.honorsLevels) {
    
    console.log(JSON.stringify(enums));
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <p className="text-red-600 text-center py-12">Failed to load form options</p>
      </div>
    );
  }

  const gradeConfig = getGradeFieldConfig();

  // Render the appropriate input based on type
  const renderGradeInput = () => {
    const baseClasses = "w-full px-3 py-2 border border-gray-300 rounded-md text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500";
    
    if (gradeConfig.type === 'number') {
      return (
        <input
          type="number"
          value={formData.gradeValue}
          onChange={(e) => setFormData({ ...formData, gradeValue: e.target.value })}
          placeholder={gradeConfig.placeholder}
          min={gradeConfig.min}
          max={gradeConfig.max}
          step={gradeConfig.step}
          className={baseClasses}
          required
        />
      );
    } else {
      // Text input for Letter_Grade and Other
      return (
        <input
          type="text"
          value={formData.gradeValue}
          onChange={(e) => setFormData({ ...formData, gradeValue: e.target.value })}
          placeholder={gradeConfig.placeholder}
          className={baseClasses}
          required
        />
      );
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="mb-6 flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Edit Transcripts</h1>
          <p className="text-gray-600 mt-1">
            Manage your course history and grades
            {gradingSystem && (
              <span className="ml-2 text-sm">
                (Using {gradingSystem.replace(/_/g, ' ')} grading system)
              </span>
            )}
          </p>
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

      <Card className="mb-6">
        <CardHeader>
          <div className="flex justify-between items-center">
            <CardTitle>My Courses ({transcripts.length})</CardTitle>
            {!showAdd && (
              <Button onClick={() => setShowAdd(true)} disabled={loading}>
                + Add Course
              </Button>
            )}
          </div>
        </CardHeader>
        <CardContent>
          {showAdd && (
            <form onSubmit={handleSubmit} className="mb-6 p-4 border rounded-lg bg-gray-50">
              <h3 className="font-semibold text-gray-900 mb-4">
                {editingId ? 'Edit Course' : 'Add New Course'}
              </h3>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-900 mb-1">
                    Course Name *
                  </label>
                  <select
                    value={formData.courseName}
                    onChange={(e) => setFormData({ ...formData, courseName: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md text-gray-900"
                    required
                  >
                    <option value="">Select a course</option>
                    {courses.map(course => (
                      <option key={course} value={course}>{course}</option>
                    ))}
                  </select>
                  {courses.length === 0 && (
                    <p className="text-xs text-gray-500 mt-1">
                      Loading courses for {curriculum.replace(/_/g, ' ')}...
                    </p>
                  )}
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-900 mb-1">
                      Grade Level *
                    </label>
                    <select
                      value={formData.gradeLevel}
                      onChange={(e) => setFormData({ ...formData, gradeLevel: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md text-gray-900"
                      required
                    >
                      {enums.gradeLevels.map(grade => (
                        <option key={grade} value={grade}>
                          {gradeLabels[grade] || grade}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-900 mb-1">
                      Semester *
                    </label>
                    <select
                      value={formData.semester}
                      onChange={(e) => setFormData({ ...formData, semester: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md text-gray-900"
                      required
                    >
                      {enums.semesterTypes.map(sem => (
                        <option key={sem} value={sem}>
                          {sem.replace(/_/g, ' ')}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-900 mb-1">
                      {gradeConfig.label}
                    </label>
                    {renderGradeInput()}
                    <p className="text-xs text-gray-500 mt-1">{gradeConfig.helpText}</p>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-900 mb-1">
                      Course Level *
                    </label>
                    <select
                      value={formData.honorsLevel}
                      onChange={(e) => setFormData({ ...formData, honorsLevel: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md text-gray-900"
                      required
                    >
                      {enums.honorsLevels.map(level => (
                        <option key={level} value={level}>
                          {level.replace(/_/g, ' ')}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="flex gap-2">
                  <Button 
                    type="submit" 
                    className="flex-1"
                    disabled={loading || !formData.courseName}
                  >
                    {loading ? 'Saving...' : editingId ? 'Update Course' : 'Add Course'}
                  </Button>
                  <Button
                    type="button"
                    onClick={resetForm}
                    variant="outline"
                    disabled={loading}
                  >
                    Cancel
                  </Button>
                </div>
              </div>
            </form>
          )}

          {transcripts.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead>
                  <tr>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Course</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Grade Level</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Semester</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Grade</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Level</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {transcripts.map((transcript) => (
                    <tr key={transcript.id}>
                      <td className="px-4 py-3 text-sm text-gray-900">{transcript.courseName}</td>
                      <td className="px-4 py-3 text-sm text-gray-600">{gradeLabels[transcript.gradeLevel]}</td>
                      <td className="px-4 py-3 text-sm text-gray-600">{transcript.semester.replace(/_/g, ' ')}</td>
                      <td className="px-4 py-3 text-sm font-medium text-gray-900">{transcript.gradeValue}</td>
                      <td className="px-4 py-3 text-sm text-gray-600">{transcript.honorsLevel.replace(/_/g, ' ')}</td>
                      <td className="px-4 py-3 text-sm">
                        <button
                          onClick={() => handleEdit(transcript)}
                          className="text-blue-600 hover:text-blue-800 mr-3"
                          disabled={loading}
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => handleDelete(transcript.id)}
                          className="text-red-600 hover:text-red-800"
                          disabled={loading}
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <p className="text-gray-500 text-center py-8">No courses yet. Click "+ Add Course" to get started!</p>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
