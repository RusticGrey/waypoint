'use client';

import { useState, useEffect } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import Link from 'next/link';
import { useEnums } from '@/lib/hooks/useEnums';

interface Activity {
  id: string;
  activityName: string;
  category: string;
  role: string | null;
  gradeLevel: string;
  hoursPerWeek: number;
  weeksPerYear: number;
  description: string;
}

export default function EditActivitiesPage() {
  const { enums, loading: enumsLoading } = useEnums();
  const [activities, setActivities] = useState<Activity[]>([]);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [showAdd, setShowAdd] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [formData, setFormData] = useState({
    activityName: '',
    category: '',
    role: '',
    gradeLevel: '',
    hoursPerWeek: 1,
    weeksPerYear: 1,
    description: '',
  });

  useEffect(() => {
    fetchActivities();
  }, []);

  // Set default category once enums load
  useEffect(() => {
    if (enums && 
        enums.activityCategories && enums.activityCategories.length > 0 && 
        enums.gradeLevels && enums.gradeLevels.length > 0 && 
        !formData.category && !formData.gradeLevel) {
      setFormData(prev => ({
        ...prev,
        category: enums.activityCategories[0],
        gradeLevel: enums.gradeLevels[0],
      }));
    }
  }, [enums]);

  const fetchActivities = async () => {
    try {
      const res = await fetch('/api/student/activities');
      if (!res.ok) throw new Error('Failed to fetch activities');
      const data = await res.json();
      console.log('Fetched Activity:', data);
      setActivities(data.activities || []);
    } catch (err) {
      console.error('Fetch error:', err);
      setError('Failed to load activities');
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    
    try {
      const url = editingId 
        ? `/api/student/activities/${editingId}`
        : '/api/student/activities';
      
      const method = editingId ? 'PATCH' : 'POST';

      console.log('Submitting:', method, url, formData);

      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (!res.ok) {
        const errorData = await res.json();
        console.error('API Error:', errorData);
        throw new Error(errorData.error || 'Failed to save activity');
      }

      const result = await res.json();
      console.log('Saved successfully:', result);

      resetForm();
      await fetchActivities();
    } catch (err: any) {
      console.error('Submit error:', err);
      setError(err.message || 'Failed to save activity');
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (activity: Activity) => {
    setEditingId(activity.id);
    setFormData({
      activityName: activity.activityName,
      category: activity.category,
      role: activity.role || '',
      gradeLevel: activity.gradeLevel,
      hoursPerWeek: activity.hoursPerWeek,
      weeksPerYear: activity.weeksPerYear,
      description: activity.description,
    });
    setShowAdd(true);
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Delete this activity?')) return;
    
    setLoading(true);
    try {
      const res = await fetch(`/api/student/activities/${id}`, {
        method: 'DELETE',
      });

      if (!res.ok) throw new Error('Failed to delete activity');

      await fetchActivities();
    } catch (err) {
      console.error('Delete error:', err);
      setError('Failed to delete activity');
    } finally {
      setLoading(false);
    }
  };

  // const toggleGrade = (grade: string) => {
  //   setFormData(prev => ({
  //     ...prev,
  //     grade_levels: prev.gradeLevels.includes(grade)
  //       ? prev.gradeLevels.filter(g => g !== grade)
  //       : [...prev.gradeLevels, grade]
  //   }));
  // };

  const resetForm = () => {
    setEditingId(null);
    setShowAdd(false);
    setFormData({
      activityName: '',
      category: enums?.activityCategories?.[0] || '',
      role: '',
      gradeLevel: enums?.gradeLevels?.[0] || '',
      hoursPerWeek: 1,
      weeksPerYear: 1,
      description: '',
    });
  };

  if (enumsLoading) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <p className="text-gray-600 text-center py-12">Loading...</p>
      </div>
    );
  }

  if (!enums || !enums.activityCategories || enums.activityCategories.length === 0 || !enums.gradeLevels || enums.gradeLevels.length=== 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <p className="text-red-600 text-center py-12">Failed to load form options</p>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="mb-6 flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Edit Activities</h1>
          <p className="text-gray-600 mt-1">Add, edit, or remove your extracurricular activities</p>
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
            <CardTitle>My Activities ({activities.length})</CardTitle>
            {!showAdd && (
              <Button onClick={() => setShowAdd(true)} disabled={loading}>
                + Add Activity
              </Button>
            )}
          </div>
        </CardHeader>
        <CardContent>
          {showAdd && (
            <form onSubmit={handleSubmit} className="mb-6 p-4 border rounded-lg bg-gray-50">
              <h3 className="font-semibold text-gray-900 mb-4">
                {editingId ? 'Edit Activity' : 'Add New Activity'}
              </h3>
              
              <div className="space-y-4">
                <Input
                  label="Activity Name *"
                  value={formData.activityName}
                  onChange={(e) => setFormData({ ...formData, activityName: e.target.value })}
                  required
                />

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-900 mb-1">
                      Category *
                    </label>
                    <select
                      value={formData.category}
                      onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md text-gray-900"
                      required
                    >
                      {enums.activityCategories.map(cat => (
                        <option key={cat} value={cat}>{cat.replace(/_/g, ' ')}</option>
                      ))}
                    </select>
                  </div>

                  <Input
                    label="Your Role (optional)"
                    value={formData.role}
                    onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                  />
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
                      {enums.gradeLevels.map(cat => (
                        <option key={cat} value={cat}>{cat.replace(/_/g, ' ')}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <Input
                    label="Hours per Week *"
                    type="number"
                    min="1"
                    max="168"
                    value={formData.hoursPerWeek}
                    onChange={(e) => setFormData({ ...formData, hoursPerWeek: parseInt(e.target.value) })}
                    required
                  />

                  <Input
                    label="Weeks per Year *"
                    type="number"
                    min="1"
                    max="52"
                    value={formData.weeksPerYear}
                    onChange={(e) => setFormData({ ...formData, weeksPerYear: parseInt(e.target.value) })}
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-900 mb-1">
                    Description *
                  </label>
                  <textarea
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    rows={4}
                    required
                    minLength={10}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md text-gray-900"
                  />
                  <p className="text-xs text-gray-500 mt-1">Minimum 10 characters</p>
                </div>

                <div className="flex gap-2">
                  <Button 
                    type="submit" 
                    className="flex-1"
                    // disabled={loading || formData.gradeLevels.length === 0}
                  >
                    {loading ? 'Saving...' : editingId ? 'Update Activity' : 'Add Activity'}
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

          {activities.length > 0 ? (
            <div className="space-y-3">
              {activities.map((activity) => (
                <div key={activity.id} className="border rounded-lg p-4 hover:bg-gray-50">
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <h3 className="font-semibold text-gray-900">{activity.activityName}</h3>
                      <p className="text-sm text-gray-600 mt-1">
                        {activity.category.replace(/_/g, ' ')} {activity.role && `• ${activity.role}`}
                      </p>
                      <p className="text-sm text-gray-700 mt-2">{activity.description}</p>
                      <p className="text-xs text-gray-500 mt-2">
                        {activity.hoursPerWeek}h/week × {activity.weeksPerYear} weeks = {activity.hoursPerWeek * activity.weeksPerYear} total hours
                      </p>
                    </div>
                    <div className="flex gap-2 ml-4">
                      <button
                        onClick={() => handleEdit(activity)}
                        className="text-blue-600 hover:text-blue-800 text-sm"
                        disabled={loading}
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(activity.id)}
                        className="text-red-600 hover:text-red-800 text-sm"
                        disabled={loading}
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-500 text-center py-8">No activities yet. Click "+ Add Activity" to get started!</p>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
