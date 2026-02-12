'use client';

import { useState, useEffect } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import Link from 'next/link';

interface Project {
  id: string;
  title: string;
  experience_type: string;
  organization: string | null;
  role_title: string | null;
  start_date: string;
  end_date: string | null;
  is_ongoing: boolean;
  description: string;
}

const PROJECT_TYPES = [
  'Research',
  'Internship',
  'Independent_Project',
  'Volunteer_Project',
  'Other'
];

export default function EditProjectsPage() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [showAdd, setShowAdd] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [formData, setFormData] = useState({
    title: '',
    experience_type: 'Research',
    organization: '',
    role: '',
    start_date: '',
    end_date: '',
    is_ongoing: false,
    description: '',
  });

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      const res = await fetch('/api/student/projects');
      if (!res.ok) throw new Error('Failed to fetch projects');
      const data = await res.json();
      console.log('Fetched projects:', data);
      setProjects(data.projects || []);
    } catch (err) {
      console.error('Fetch error:', err);
      setError('Failed to load projects');
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    
    try {
      const url = editingId 
        ? `/api/student/projects/${editingId}`
        : '/api/student/projects';
      
      const method = editingId ? 'PATCH' : 'POST';

      console.log('Submitting:', method, url, formData);

      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          end_date: formData.is_ongoing ? null : formData.end_date,
        }),
      });

      if (!res.ok) {
        const errorData = await res.json();
        console.error('API Error:', errorData);
        throw new Error(errorData.error || 'Failed to save project');
      }

      const result = await res.json();
      console.log('Saved successfully:', result);

      resetForm();
      await fetchProjects();
    } catch (err: any) {
      console.error('Submit error:', err);
      setError(err.message || 'Failed to save project');
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (project: Project) => {
    setEditingId(project.id);
    setFormData({
      title: project.title,
      experience_type: project.experience_type,
      organization: project.organization || '',
      role: project.role_title || '', // Map role_title to role
      start_date: project.start_date.split('T')[0],
      end_date: project.end_date ? project.end_date.split('T')[0] : '',
      is_ongoing: project.is_ongoing,
      description: project.description,
    });
    setShowAdd(true);
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Delete this project?')) return;
    
    setLoading(true);
    try {
      const res = await fetch(`/api/student/projects/${id}`, {
        method: 'DELETE',
      });

      if (!res.ok) throw new Error('Failed to delete project');

      await fetchProjects();
    } catch (err) {
      console.error('Delete error:', err);
      setError('Failed to delete project');
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setEditingId(null);
    setShowAdd(false);
    setFormData({
      title: '',
      experience_type: 'Research',
      organization: '',
      role: '',
      start_date: '',
      end_date: '',
      is_ongoing: false,
      description: '',
    });
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="mb-6 flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Edit Projects</h1>
          <p className="text-gray-600 mt-1">Manage your research, internships, and projects</p>
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
            <CardTitle>My Projects ({projects.length})</CardTitle>
            {!showAdd && (
              <Button onClick={() => setShowAdd(true)} disabled={loading}>
                + Add Project
              </Button>
            )}
          </div>
        </CardHeader>
        <CardContent>
          {showAdd && (
            <form onSubmit={handleSubmit} className="mb-6 p-4 border rounded-lg bg-gray-50">
              <h3 className="font-semibold text-gray-900 mb-4">
                {editingId ? 'Edit Project' : 'Add New Project'}
              </h3>
              
              <div className="space-y-4">
                <Input
                  label="Project Title *"
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
                      value={formData.experience_type}
                      onChange={(e) => setFormData({ ...formData, experience_type: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md text-gray-900"
                    >
                      {PROJECT_TYPES.map(type => (
                        <option key={type} value={type}>{type.replace('_', ' ')}</option>
                      ))}
                    </select>
                  </div>

                  <Input
                    label="Organization (optional)"
                    value={formData.organization}
                    onChange={(e) => setFormData({ ...formData, organization: e.target.value })}
                  />
                </div>

                <Input
                  label="Your Role (optional)"
                  value={formData.role}
                  onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                />

                <div className="grid grid-cols-2 gap-4">
                  <Input
                    label="Start Date *"
                    type="date"
                    value={formData.start_date}
                    onChange={(e) => setFormData({ ...formData, start_date: e.target.value })}
                    required
                  />

                  <Input
                    label="End Date"
                    type="date"
                    value={formData.end_date}
                    onChange={(e) => setFormData({ ...formData, end_date: e.target.value })}
                    disabled={formData.is_ongoing}
                  />
                </div>

                <label className="flex items-center">
                  <input
                    type="checkbox"
                    checked={formData.is_ongoing}
                    onChange={(e) => setFormData({ ...formData, is_ongoing: e.target.checked, end_date: '' })}
                    className="mr-2"
                  />
                  <span className="text-sm text-gray-900">This project is ongoing</span>
                </label>

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
                    disabled={loading}
                  >
                    {loading ? 'Saving...' : editingId ? 'Update Project' : 'Add Project'}
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

          {projects.length > 0 ? (
            <div className="space-y-3">
              {projects.map((project) => (
                <div key={project.id} className="border rounded-lg p-4 hover:bg-gray-50">
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <h3 className="font-semibold text-gray-900">{project.title}</h3>
                      <p className="text-sm text-gray-600 mt-1">
                        {project.experience_type.replace('_', ' ')}
                        {project.organization && ` • ${project.organization}`}
                        {project.role_title && ` • ${project.role_title}`}
                      </p>
                      <p className="text-xs text-gray-500 mt-1">
                        {new Date(project.start_date).toLocaleDateString()} - {
                          project.is_ongoing 
                            ? 'Present' 
                            : project.end_date ? new Date(project.end_date).toLocaleDateString() : 'N/A'
                        }
                      </p>
                      <p className="text-sm text-gray-700 mt-2">{project.description}</p>
                    </div>
                    <div className="flex gap-2 ml-4">
                      <button
                        onClick={() => handleEdit(project)}
                        className="text-blue-600 hover:text-blue-800 text-sm"
                        disabled={loading}
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(project.id)}
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
            <p className="text-gray-500 text-center py-8">No projects yet. Click "+ Add Project" to get started!</p>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
