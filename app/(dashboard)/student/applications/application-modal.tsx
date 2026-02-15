'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select } from '@/components/ui/select';
import { useEnums } from '@/lib/hooks/useEnums';

interface College {
  id: string;
  name: string;
  country: string;
}

interface Application {
  id: string;
  collegeId: string;
  targetCategory: string;
  applicationStatus: string;
  applicationDeadline: string | null;
  decisionDeadline: string | null;
  essayStatus: string;
  supplementsStatus: string;
  recommendationStatus: string;
  testScoresSent: boolean;
  applicationPortalLink: string | null;
  notes: string | null;
}

interface ApplicationModalProps {
  application?: Application;
  onClose: () => void;
  onSuccess: () => void; 
}

export default function ApplicationModal({
  application,
  onClose,
  onSuccess,
}: ApplicationModalProps) {
  const { enums, loading: enumsLoading } = useEnums();
  const [colleges, setColleges] = useState<College[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [formData, setFormData] = useState({
    collegeId: '',
    targetCategory: 'Reach',
    applicationStatus: 'Not_Started',
    applicationDeadline: '',
    decisionDeadline: '',
    essayStatus: 'Not Started',
    supplementsStatus: 'Not Started',
    recommendationStatus: 'Not Requested',
    testScoresSent: false,
    applicationPortalLink: '',
    notes: '',
  });

  useEffect(() => {
    fetchColleges();
  }, []);

  useEffect(() => {
    if (application) {
      setFormData({
        collegeId: application.collegeId,
        targetCategory: application.targetCategory,
        applicationStatus: application.applicationStatus,
        applicationDeadline: application.applicationDeadline 
          ? application.applicationDeadline.split('T')[0] 
          : '',
        decisionDeadline: application.decisionDeadline 
          ? application.decisionDeadline.split('T')[0] 
          : '',
        essayStatus: application.essayStatus,
        supplementsStatus: application.supplementsStatus,
        recommendationStatus: application.recommendationStatus,
        testScoresSent: application.testScoresSent,
        applicationPortalLink: application.applicationPortalLink || '',
        notes: application.notes || '',
      });
    } else if (enums?.targetCategories && enums?.applicationStatuses) {
      setFormData(prev => ({
        ...prev,
        targetCategory: enums.targetCategories[0] || '',
        applicationStatus: enums.applicationStatuses[0] || 'Not_Started',
      }));
    }
  }, [application, enums]);

  const fetchColleges = async () => {
    try {
      const res = await fetch('/api/colleges');
      const data = await res.json();
      console.log('Colleges fetched:', data.colleges?.length);
      setColleges(data.colleges || []);
    } catch (err) {
      console.error('Failed to fetch colleges:', err);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const url = application
        ? `/api/student/applications/${application.id}`
        : '/api/student/applications';

      const method = application ? 'PATCH' : 'POST';

      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || 'Failed to save application');
      }

      onSuccess();
      onClose();
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  if (enumsLoading) {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-white rounded-lg p-6">
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4 overflow-y-auto">
      <div className="bg-white rounded-lg p-6 max-w-2xl w-full my-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">
          {application ? 'Update Application' : 'Add Application'}
        </h2>

        {error && (
          <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded">
            <p className="text-sm text-red-800">{error}</p>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <Select
            label="College *"
            value={formData.collegeId}
            onChange={(e) => setFormData({ ...formData, collegeId: e.target.value })}
            required
            disabled={!!application}
          >
            <option value="">Select a college</option>
            {colleges.map(college => (
              <option key={college.id} value={college.id}>
                {college.name} ({college.country})
              </option>
            ))}
          </Select>

          <div className="grid grid-cols-2 gap-4">
            <Select
              label="Category *"
              value={formData.targetCategory}
              onChange={(e) => setFormData({ ...formData, targetCategory: e.target.value })}
              required
            >
              {enums?.targetCategories?.map(cat => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </Select>

            <Select
              label="Status *"
              value={formData.applicationStatus}
              onChange={(e) => setFormData({ ...formData, applicationStatus: e.target.value })}
              required
            >
              {enums?.applicationStatuses?.map(status => (
                <option key={status} value={status}>
                  {status.replace(/_/g, ' ')}
                </option>
              ))}
            </Select>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <Input
              label="Application Deadline"
              type="date"
              value={formData.applicationDeadline}
              onChange={(e) => setFormData({ ...formData, applicationDeadline: e.target.value })}
            />

            <Input
              label="Decision Deadline"
              type="date"
              value={formData.decisionDeadline}
              onChange={(e) => setFormData({ ...formData, decisionDeadline: e.target.value })}
            />
          </div>

          <div className="grid grid-cols-3 gap-4">
            <Select
              label="Essay Status"
              value={formData.essayStatus}
              onChange={(e) => setFormData({ ...formData, essayStatus: e.target.value })}
            >
              <option value="Not Started">Not Started</option>
              <option value="In Progress">In Progress</option>
              <option value="Complete">Complete</option>
            </Select>

            <Select
              label="Supplements"
              value={formData.supplementsStatus}
              onChange={(e) => setFormData({ ...formData, supplementsStatus: e.target.value })}
            >
              <option value="Not Started">Not Started</option>
              <option value="In Progress">In Progress</option>
              <option value="Complete">Complete</option>
            </Select>

            <Select
              label="Recommendations"
              value={formData.recommendationStatus}
              onChange={(e) => setFormData({ ...formData, recommendationStatus: e.target.value })}
            >
              <option value="Not Requested">Not Requested</option>
              <option value="Requested">Requested</option>
              <option value="Submitted">Submitted</option>
            </Select>
          </div>

          <label className="flex items-center cursor-pointer">
            <input
              type="checkbox"
              checked={formData.testScoresSent}
              onChange={(e) => setFormData({ ...formData, testScoresSent: e.target.checked })}
              className="mr-2 h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
            />
            <span className="text-sm text-gray-900">Test scores sent</span>
          </label>

          <Input
            label="Application Portal Link"
            type="url"
            value={formData.applicationPortalLink}
            onChange={(e) => setFormData({ ...formData, applicationPortalLink: e.target.value })}
            placeholder="https://..."
          />

          <div>
            <label className="block text-sm font-medium text-gray-900 mb-1">
              Notes
            </label>
            <textarea
              value={formData.notes}
              onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
              rows={3}
              className="w-full px-3 py-2 border border-gray-300 rounded-md text-gray-900 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="Any additional notes..."
            />
          </div>

          <div className="flex gap-2 pt-4">
            <Button type="submit" className="flex-1" disabled={loading}>
              {loading ? 'Saving...' : application ? 'Update Application' : 'Add Application'}
            </Button>
            <Button
              type="button"
              onClick={onClose}
              variant="outline"
              disabled={loading}
            >
              Cancel
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
