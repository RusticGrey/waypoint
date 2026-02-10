'use client';

import { useState, useEffect } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import Link from 'next/link';
import { useEnums } from '@/lib/hooks/useEnums';

interface Achievement {
  id: string;
  title: string;
  achievement_type: string;
  organization: string | null;
  recognition_level: string | null;
  grade_level: string | null;
  date_achieved: string | null;
  description: string | null;
}

export default function EditAchievementsPage() {
  const { enums, loading: enumsLoading } = useEnums();
  const [achievements, setAchievements] = useState<Achievement[]>([]);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [showAdd, setShowAdd] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [formData, setFormData] = useState({
    title: '',
    achievement_type: '',
    organization: '',
    recognition_level: '',
    grade_level: '',
    date_received: '',
    description: '',
  });

  useEffect(() => {
    fetchAchievements();
  }, []);

  // Set default values once enums load - with null checks
  useEffect(() => {
    if (enums && 
        enums.achievementTypes && 
        enums.recognitionLevels && 
        enums.gradeLevels &&
        !formData.achievement_type) {
      setFormData(prev => ({
        ...prev,
        achievement_type: enums.achievementTypes[0] || '',
        recognition_level: enums.recognitionLevels[0] || '',
        grade_level: enums.gradeLevels[0] || '',
      }));
    }
  }, [enums]);

  const fetchAchievements = async () => {
    try {
      const res = await fetch('/api/student/achievements');
      if (!res.ok) throw new Error('Failed to fetch achievements');
      const data = await res.json();
      console.log('Fetched achievements:', data);
      setAchievements(data.achievements || []);
    } catch (err) {
      console.error('Fetch error:', err);
      setError('Failed to load achievements');
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    
    try {
      const url = editingId 
        ? `/api/student/achievements/${editingId}`
        : '/api/student/achievements';
      
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
        throw new Error(errorData.error || 'Failed to save achievement');
      }

      const result = await res.json();
      console.log('Saved successfully:', result);

      resetForm();
      await fetchAchievements();
    } catch (err: any) {
      console.error('Submit error:', err);
      setError(err.message || 'Failed to save achievement');
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (achievement: Achievement) => {
    setEditingId(achievement.id);
    setFormData({
      title: achievement.title,
      achievement_type: achievement.achievement_type,
      organization: achievement.organization || '',
      recognition_level: achievement.recognition_level || (enums?.recognitionLevels?.[0] || ''),
      grade_level: achievement.grade_level || (enums?.gradeLevels?.[0] || ''),
      date_received: achievement.date_achieved ? achievement.date_achieved.split('T')[0] : '',
      description: achievement.description || '',
    });
    setShowAdd(true);
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Delete this achievement?')) return;
    
    setLoading(true);
    try {
      const res = await fetch(`/api/student/achievements/${id}`, {
        method: 'DELETE',
      });

      if (!res.ok) throw new Error('Failed to delete achievement');

      await fetchAchievements();
    } catch (err) {
      console.error('Delete error:', err);
      setError('Failed to delete achievement');
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setEditingId(null);
    setShowAdd(false);
    setFormData({
      title: '',
      achievement_type: enums?.achievementTypes?.[0] || '',
      organization: '',
      recognition_level: enums?.recognitionLevels?.[0] || '',
      grade_level: enums?.gradeLevels?.[0] || '',
      date_received: '',
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

  if (!enums || !enums.achievementTypes || !enums.recognitionLevels || !enums.gradeLevels) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <p className="text-red-600 text-center py-12">Failed to load form options. Check console for errors.</p>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="mb-6 flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Edit Achievements</h1>
          <p className="text-gray-600 mt-1">Manage your honors, awards, and recognitions</p>
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
            <CardTitle>My Achievements ({achievements.length})</CardTitle>
            {!showAdd && (
              <Button onClick={() => setShowAdd(true)} disabled={loading}>
                + Add Achievement
              </Button>
            )}
          </div>
        </CardHeader>
        <CardContent>
          {showAdd && (
            <form onSubmit={handleSubmit} className="mb-6 p-4 border rounded-lg bg-gray-50">
              <h3 className="font-semibold text-gray-900 mb-4">
                {editingId ? 'Edit Achievement' : 'Add New Achievement'}
              </h3>
              
              <div className="space-y-4">
                <Input
                  label="Achievement Title *"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  required
                />

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-900 mb-1">
                      Type *
                    </label>
                    <select
                      value={formData.achievement_type}
                      onChange={(e) => setFormData({ ...formData, achievement_type: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md text-gray-900"
                      required
                    >
                      {enums.achievementTypes.map(type => (
                        <option key={type} value={type}>{type.replace(/_/g, ' ')}</option>
                      ))}
                    </select>
                  </div>

                  <Input
                    label="Organization (optional)"
                    value={formData.organization}
                    onChange={(e) => setFormData({ ...formData, organization: e.target.value })}
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-900 mb-1">
                      Recognition Level *
                    </label>
                    <select
                      value={formData.recognition_level}
                      onChange={(e) => setFormData({ ...formData, recognition_level: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md text-gray-900"
                      required
                    >
                      {enums.recognitionLevels.map(level => (
                        <option key={level} value={level}>{level.replace(/_/g, ' ')}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-900 mb-1">
                      Grade Level
                    </label>
                    <select
                      value={formData.grade_level}
                      onChange={(e) => setFormData({ ...formData, grade_level: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md text-gray-900"
                    >
                      {enums.gradeLevels.map(grade => (
                        <option key={grade} value={grade}>
                          {grade.charAt(0).toUpperCase() + grade.slice(1)} Grade
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <Input
                  label="Date Received"
                  type="date"
                  value={formData.date_received}
                  onChange={(e) => setFormData({ ...formData, date_received: e.target.value })}
                />

                <div>
                  <label className="block text-sm font-medium text-gray-900 mb-1">
                    Description
                  </label>
                  <textarea
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    rows={4}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md text-gray-900"
                  />
                </div>

                <div className="flex gap-2">
                  <Button 
                    type="submit" 
                    className="flex-1"
                    disabled={loading}
                  >
                    {loading ? 'Saving...' : editingId ? 'Update Achievement' : 'Add Achievement'}
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

          {achievements.length > 0 ? (
            <div className="space-y-3">
              {achievements.map((achievement) => (
                <div key={achievement.id} className="border rounded-lg p-4 hover:bg-gray-50">
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <h3 className="font-semibold text-gray-900">{achievement.title}</h3>
                      <p className="text-sm text-gray-600 mt-1">
                        {achievement.achievement_type.replace(/_/g, ' ')}
                        {achievement.organization && ` • ${achievement.organization}`}
                      </p>
                      <div className="flex gap-3 mt-2">
                        {achievement.recognition_level && (
                          <span className="text-xs px-2 py-1 bg-blue-100 text-blue-800 rounded">
                            {achievement.recognition_level.replace(/_/g, ' ')}
                          </span>
                        )}
                        {achievement.date_achieved && (
                          <span className="text-xs text-gray-500">
                            {new Date(achievement.date_achieved).toLocaleDateString()}
                          </span>
                        )}
                      </div>
                      {achievement.description && (
                        <p className="text-sm text-gray-700 mt-2">{achievement.description}</p>
                      )}
                    </div>
                    <div className="flex gap-2 ml-4">
                      <button
                        onClick={() => handleEdit(achievement)}
                        className="text-blue-600 hover:text-blue-800 text-sm"
                        disabled={loading}
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(achievement.id)}
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
            <p className="text-gray-500 text-center py-8">No achievements yet. Click "+ Add Achievement" to get started!</p>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
