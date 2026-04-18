'use client';

import { useState, useEffect } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ux } from '@/lib/ux';
import { cn } from '@/lib/utils';

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
    <div className={ux.layout.page}>
      <div className={ux.layout.header}>
        <h1 className={ux.text.heading}>Manage Colleges</h1>
        <p className={ux.text.body}>Update the global college database available to all students.</p>
      </div>

      <Card className="mb-10" variant="base">
        <CardHeader>
          <CardTitle className={ux.text.subheading}>
            {editingId ? 'Edit College' : 'Add New College'}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <div className="space-y-1.5">
              <label className={ux.form.label}>
                College Name <span className="text-red-500">*</span>
              </label>
              <Input
                name="name"
                placeholder="e.g. Stanford University"
                value={formData.name}
                onChange={handleInputChange}
                className={ux.form.input}
              />
            </div>
            <div className="space-y-1.5">
              <label className={ux.form.label}>Country</label>
              <Input
                name="country"
                placeholder="United States"
                value={formData.country}
                onChange={handleInputChange}
                className={ux.form.input}
              />
            </div>
            <div className="space-y-1.5">
              <label className={ux.form.label}>Acceptance Rate (%)</label>
              <Input
                name="acceptanceRate"
                type="number"
                placeholder="e.g. 5.2"
                value={formData.acceptanceRate}
                onChange={handleInputChange}
                className={ux.form.input}
              />
            </div>
            <div className="space-y-1.5">
              <label className={ux.form.label}>US News Ranking</label>
              <Input
                name="rankingUsNews"
                type="number"
                placeholder="e.g. 3"
                value={formData.rankingUsNews}
                onChange={handleInputChange}
                className={ux.form.input}
              />
            </div>
            <div className="space-y-1.5">
              <label className={ux.form.label}>Avg GPA</label>
              <Input
                name="avgGpa"
                type="number"
                step="0.01"
                placeholder="e.g. 3.9"
                value={formData.avgGpa}
                onChange={handleInputChange}
                className={ux.form.input}
              />
            </div>
            <div className="space-y-1.5">
              <label className={ux.form.label}>Avg SAT</label>
              <Input
                name="avgSat"
                type="number"
                placeholder="e.g. 1500"
                value={formData.avgSat}
                onChange={handleInputChange}
                className={ux.form.input}
              />
            </div>
            <div className="space-y-1.5">
              <label className={ux.form.label}>Avg ACT</label>
              <Input
                name="avgAct"
                type="number"
                placeholder="e.g. 34"
                value={formData.avgAct}
                onChange={handleInputChange}
                className={ux.form.input}
              />
            </div>
          </div>
          <div className="flex justify-end gap-3">
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

      <Card variant="base">
        <CardHeader>
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <CardTitle className={ux.text.subheading}>
              College List ({colleges.length})
            </CardTitle>
            <div className="w-full md:w-80">
                <Input 
                    placeholder="Search colleges..." 
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className={ux.form.input}
                />
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="border border-slate-200 rounded-2xl overflow-hidden shadow-sm">
             <div className="overflow-y-auto max-h-[600px]">
                <table className="min-w-full divide-y divide-slate-200">
                <thead className="bg-surface-soft">
                    <tr>
                    <th className="px-6 py-4 text-left text-[10px] font-black text-slate-500 uppercase tracking-widest">Name</th>
                    <th className="px-6 py-4 text-left text-[10px] font-black text-slate-500 uppercase tracking-widest">Country</th>
                    <th className="px-6 py-4 text-left text-[10px] font-black text-slate-500 uppercase tracking-widest">Acceptance</th>
                    <th className="px-6 py-4 text-left text-[10px] font-black text-slate-500 uppercase tracking-widest">Ranking</th>
                    <th className="px-6 py-4 text-left text-[10px] font-black text-slate-500 uppercase tracking-widest">Averages</th>
                    <th className="px-6 py-4 text-right text-[10px] font-black text-slate-500 uppercase tracking-widest">Actions</th>
                    </tr>
                </thead>
                <tbody className="bg-white divide-y divide-slate-200">
                    {filteredColleges.map((college) => (
                    <tr key={college.id} className="hover:bg-surface-soft transition-colors">
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-bold text-slate-900">{college.name}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-600 font-medium">{college.country}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-600 font-medium">
                        {college.acceptanceRate ? `${college.acceptanceRate}%` : '-'}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-600 font-medium">
                        {college.rankingUsNews ? `#${college.rankingUsNews}` : '-'}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-600">
                            <div className="text-xs space-y-1 font-medium">
                                <div className="flex gap-1"><span className="text-slate-400">GPA:</span> {college.avgGpa || '-'}</div>
                                <div className="flex gap-1"><span className="text-slate-400">SAT:</span> {college.avgSat || '-'}</div>
                                <div className="flex gap-1"><span className="text-slate-400">ACT:</span> {college.avgAct || '-'}</div>
                            </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-bold space-x-4">
                        <button 
                            onClick={() => startEditing(college)}
                            className="text-brand-600 hover:text-brand-800 transition-colors uppercase text-xs tracking-tight"
                        >
                            Edit
                        </button>
                        <button 
                            onClick={() => deleteCollege(college.id)}
                            className="text-red-600 hover:text-red-800 transition-colors uppercase text-xs tracking-tight"
                        >
                            Delete
                        </button>
                        </td>
                    </tr>
                    ))}
                    {filteredColleges.length === 0 && (
                    <tr>
                        <td colSpan={6} className="px-6 py-12 text-center text-slate-400 italic">
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
