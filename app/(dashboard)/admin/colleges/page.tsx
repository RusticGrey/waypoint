'use client';

import { useState, useEffect } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

interface College {
  id: string;
  name: string;
  country: string;
  acceptanceRate: number | null;
  rankingUsNews: number | null;
  avgGpa: number | null;
  avgSat: number | null;
  avgAct: number | null;
}

export default function CollegesManagementPage() {
  const [colleges, setColleges] = useState<College[]>([]);
  const [formData, setFormData] = useState({
    name: '',
    country: 'United States',
    acceptanceRate: '',
    rankingUsNews: '',
    avgGpa: '',
    avgSat: '',
    avgAct: '',
  });
  const [editingId, setEditingId] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetchColleges();
  }, []);

  const fetchColleges = async () => {
    try {
      const res = await fetch('/api/colleges');
      const data = await res.json();
      setColleges(data.colleges || []);
    } catch (error) {
      console.error('Failed to fetch colleges', error);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const startEditing = (college: College) => {
    setEditingId(college.id);
    setFormData({
      name: college.name,
      country: college.country,
      acceptanceRate: college.acceptanceRate?.toString() || '',
      rankingUsNews: college.rankingUsNews?.toString() || '',
      avgGpa: college.avgGpa?.toString() || '',
      avgSat: college.avgSat?.toString() || '',
      avgAct: college.avgAct?.toString() || '',
    });
    // Scroll to top to see the form
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const cancelEditing = () => {
    setEditingId(null);
    setFormData({
      name: '',
      country: 'United States',
      acceptanceRate: '',
      rankingUsNews: '',
      avgGpa: '',
      avgSat: '',
      avgAct: '',
    });
  };

  const handleSubmit = async () => {
    if (!formData.name.trim()) return;

    setLoading(true);
    try {
      const url = '/api/colleges';
      const method = editingId ? 'PUT' : 'POST';
      const body = editingId ? { ...formData, id: editingId } : formData;

      await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });

      cancelEditing();
      fetchColleges();
    } catch (error) {
      alert(`Failed to ${editingId ? 'update' : 'add'} college`);
    } finally {
      setLoading(false);
    }
  };

  const deleteCollege = async (id: string) => {
    if (!confirm('Are you sure you want to delete this college?')) return;
    
    try {
      await fetch(`/api/colleges?id=${id}`, {
        method: 'DELETE',
      });
      fetchColleges();
    } catch (error) {
      alert('Failed to delete college');
    }
  };

  const filteredColleges = colleges.filter((college) =>
    college.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-6">Manage Colleges</h1>

      <Card className="mb-8">
        <CardHeader>
          <CardTitle>{editingId ? 'Edit College' : 'Add New College'}</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                College Name *
              </label>
              <Input
                name="name"
                placeholder="e.g. Stanford University"
                value={formData.name}
                onChange={handleInputChange}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Country
              </label>
              <Input
                name="country"
                placeholder="United States"
                value={formData.country}
                onChange={handleInputChange}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Acceptance Rate (%)
              </label>
              <Input
                name="acceptanceRate"
                type="number"
                placeholder="e.g. 5.2"
                value={formData.acceptanceRate}
                onChange={handleInputChange}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                US News Ranking
              </label>
              <Input
                name="rankingUsNews"
                type="number"
                placeholder="e.g. 3"
                value={formData.rankingUsNews}
                onChange={handleInputChange}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Avg GPA
              </label>
              <Input
                name="avgGpa"
                type="number"
                step="0.01"
                placeholder="e.g. 3.9"
                value={formData.avgGpa}
                onChange={handleInputChange}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Avg SAT
              </label>
              <Input
                name="avgSat"
                type="number"
                placeholder="e.g. 1500"
                value={formData.avgSat}
                onChange={handleInputChange}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Avg ACT
              </label>
              <Input
                name="avgAct"
                type="number"
                placeholder="e.g. 34"
                value={formData.avgAct}
                onChange={handleInputChange}
              />
            </div>
          </div>
          <div className="flex justify-end gap-2">
             {editingId && (
                <Button variant="outline" onClick={cancelEditing} disabled={loading}>
                  Cancel
                </Button>
             )}
             <Button onClick={handleSubmit} disabled={loading || !formData.name.trim()}>
              {loading ? (editingId ? 'Updating...' : 'Adding...') : (editingId ? 'Update College' : 'Add College')}
            </Button>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <CardTitle>College List ({colleges.length})</CardTitle>
            <div className="w-64">
                <Input 
                    placeholder="Search colleges..." 
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="border rounded-md overflow-hidden">
             <div className="overflow-y-auto max-h-[600px]">
                <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                    <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Country</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Acceptance Rate</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Ranking</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Avg GPA/SAT/ACT</th>
                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                    </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                    {filteredColleges.map((college) => (
                    <tr key={college.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{college.name}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{college.country}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {college.acceptanceRate ? `${college.acceptanceRate}%` : '-'}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {college.rankingUsNews ? `#${college.rankingUsNews}` : '-'}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            <div className="text-xs space-y-1">
                                <div>GPA: {college.avgGpa || '-'}</div>
                                <div>SAT: {college.avgSat || '-'}</div>
                                <div>ACT: {college.avgAct || '-'}</div>
                            </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium space-x-2">
                        <button 
                            onClick={() => startEditing(college)}
                            className="text-blue-600 hover:text-blue-900"
                        >
                            Edit
                        </button>
                        <button 
                            onClick={() => deleteCollege(college.id)}
                            className="text-red-600 hover:text-red-900"
                        >
                            Delete
                        </button>
                        </td>
                    </tr>
                    ))}
                    {filteredColleges.length === 0 && (
                    <tr>
                        <td colSpan={6} className="px-6 py-8 text-center text-gray-500">
                        No colleges found matching your search.
                        </td>
                    </tr>
                    )}
                </tbody>
                </table>
             </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
