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
}

interface TargetCollege {
  id: string;
  collegeId: string;
  targetCategory: string;
  College: College;
}

export default function CollegesPage() {
  const [targetColleges, setTargetColleges] = useState<TargetCollege[]>([]);
  const [allColleges, setAllColleges] = useState<College[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCollege, setSelectedCollege] = useState<string>('');
  const [targetCategory, setTargetCategory] = useState<string>('Match');
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    fetchTargetColleges();
    fetchAllColleges();
  }, []);

  const fetchTargetColleges = async () => {
    try {
      const res = await fetch('/api/student/target-colleges');
      const data = await res.json();
      setTargetColleges(data.targetColleges || []);
    } catch (error) {
      console.error('Failed to fetch target colleges:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchAllColleges = async () => {
    try {
      const res = await fetch('/api/colleges');
      const data = await res.json();
      console.log('Colleges loaded:', data.colleges?.length || 0);
      setAllColleges(data.colleges || []);
    } catch (error) {
      console.error('Failed to fetch colleges:', error);
    }
  };

  const filteredColleges = allColleges.filter(college =>
    college.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    college.country.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleAddCollege = async () => {
    if (!selectedCollege) {
      alert('Please select a college');
      return;
    }

    setSaving(true);
    try {
      const res = await fetch('/api/student/target-colleges', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          collegeId: selectedCollege,
          targetCategory,
        }),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || 'Failed to add college');
      }

      setSearchTerm('');
      setSelectedCollege('');
      await fetchTargetColleges();
    } catch (error: any) {
      alert(error.message);
    } finally {
      setSaving(false);
    }
  };

  const handleRemoveCollege = async (id: string) => {
    if (!confirm('Remove this college from your list?')) return;

    try {
      const res = await fetch(`/api/student/target-colleges/${id}`, {
        method: 'DELETE',
      });

      if (!res.ok) throw new Error('Failed to remove college');

      await fetchTargetColleges();
    } catch (error) {
      console.error('Delete error:', error);
      alert('Failed to remove college');
    }
  };

  const getCategoryColor = (cat: string) => {
    const colors: Record<string, string> = {
      Safety: 'bg-green-100 text-green-800',
      Match: 'bg-yellow-100 text-yellow-800',
      Reach: 'bg-red-100 text-red-800',
    };
    return colors[cat] || 'bg-gray-100 text-gray-800';
  };

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <p className="text-gray-600 text-center py-12">Loading colleges...</p>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900">Target Colleges</h1>
        <p className="text-gray-600 mt-1">Build your college list with Safety, Match, and Reach schools</p>
      </div>

      {/* Add College Card */}
      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Add College to Your List</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <Input
              label="Search Colleges"
              type="text"
              placeholder="Search by name or country..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />

            {searchTerm && filteredColleges.length > 0 && (
              <div className="border rounded-md max-h-60 overflow-y-auto">
                {filteredColleges.slice(0, 10).map(college => (
                  <button
                    key={college.id}
                    onClick={() => {
                      setSelectedCollege(college.id);
                      setSearchTerm(college.name);
                    }}
                    className={`w-full text-left px-4 py-2 hover:bg-gray-50 border-b last:border-b-0 ${
                      selectedCollege === college.id ? 'bg-blue-50' : ''
                    }`}
                  >
                    <div className="font-medium text-gray-900">{college.name}</div>
                    <div className="text-sm text-gray-600">{college.country}</div>
                  </button>
                ))}
              </div>
            )}

            {selectedCollege && (
              <div className="flex gap-4 items-end">
                <div className="flex-1">
                  <label className="block text-sm font-medium text-gray-900 mb-1">
                    Target Category
                  </label>
                  <select
                    value={targetCategory}
                    onChange={(e) => setTargetCategory(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md text-gray-900 bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  >
                    <option value="Safety">Safety</option>
                    <option value="Match">Match</option>
                    <option value="Reach">Reach</option>
                  </select>
                </div>
                <Button onClick={handleAddCollege} disabled={saving}>
                  {saving ? 'Adding...' : 'Add to List'}
                </Button>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Target Colleges List */}
      <Card>
        <CardHeader>
          <CardTitle>My Target Colleges ({targetColleges.length})</CardTitle>
        </CardHeader>
        <CardContent>
          {targetColleges.length > 0 ? (
            <div className="space-y-3">
              {['Safety', 'Match', 'Reach'].map(cat => {
                const collegesInCategory = targetColleges.filter(tc => tc.targetCategory === cat);
                if (collegesInCategory.length === 0) return null;

                return (
                  <div key={cat}>
                    <h3 className="font-semibold text-gray-900 mb-2">{cat} Schools ({collegesInCategory.length})</h3>
                    <div className="space-y-2">
                      {collegesInCategory.map(tc => (
                        <div key={tc.id} className="flex justify-between items-center p-3 border rounded-lg hover:bg-gray-50">
                          <div>
                            <p className="font-medium text-gray-900">{tc.college.name}</p>
                            <p className="text-sm text-gray-600">{tc.college.country}</p>
                          </div>
                          <div className="flex items-center gap-3">
                            <span className={`px-2 py-1 text-xs rounded ${getCategoryColor(tc.targetCategory)}`}>
                              {tc.targetCategory}
                            </span>
                            <button
                              onClick={() => handleRemoveCollege(tc.id)}
                              className="text-red-600 hover:text-red-800 text-sm"
                            >
                              Remove
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <p className="text-gray-500 text-center py-8">
              No colleges in your list yet. Search and add colleges above!
            </p>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
