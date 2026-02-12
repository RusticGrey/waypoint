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
  college_id: string;
  target_category: string;
  application_status: string;
  application_deadline: string | null;
  decision_deadline: string | null;
  essay_status: string;
  supplements_status: string;
  recommendation_status: string;
  test_scores_sent: boolean;
  application_portal_link: string | null;
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
    college_id: '',
    target_category: '',
    application_status: 'Not_Started',
    application_deadline: '',
    decision_deadline: '',
    essay_status: 'Not Started',
    supplements_status: 'Not Started',
    recommendation_status: 'Not Requested',
    test_scores_sent: false,
    application_portal_link: '',
    notes: '',
  });

  useEffect(() => {
    fetchColleges();
  }, []);

  useEffect(() => {
    if (application) {
      setFormData({
        college_id: application.college_id,
        target_category: application.target_category,
        application_status: application.application_status,
        application_deadline: application.application_deadline 
          ? application.application_deadline.split('T')[0] 
          : '',
        decision_deadline: application.decision_deadline 
          ? application.decision_deadline.split('T')[0] 
          : '',
        essay_status: application.essay_status,
        supplements_status: application.supplements_status,
        recommendation_status: application.recommendation_status,
        test_scores_sent: application.TestScore_sent,
        application_portal_link: application.application_portal_link || '',
        notes: application.notes || '',
      });
    } else if (enums?.targetCategories && enums?.applicationStatuses) {
      setFormData(prev => ({
        ...prev,
        target_category: enums.targetCategories[0] || '',
        application_status: enums.applicationStatuses[0] || 'Not_Started',
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
            value={formData.college_id}
            onChange={(e) => setFormData({ ...formData, college_id: e.target.value })}
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
              value={formData.target_category}
              onChange={(e) => setFormData({ ...formData, target_category: e.target.value })}
              required
            >
              {enums?.targetCategories?.map(cat => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </Select>

            <Select
              label="Status *"
              value={formData.application_status}
              onChange={(e) => setFormData({ ...formData, application_status: e.target.value })}
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
              value={formData.application_deadline}
              onChange={(e) => setFormData({ ...formData, application_deadline: e.target.value })}
            />

            <Input
              label="Decision Deadline"
              type="date"
              value={formData.decision_deadline}
              onChange={(e) => setFormData({ ...formData, decision_deadline: e.target.value })}
            />
          </div>

          <div className="grid grid-cols-3 gap-4">
            <Select
              label="Essay Status"
              value={formData.essay_status}
              onChange={(e) => setFormData({ ...formData, essay_status: e.target.value })}
            >
              <option value="Not Started">Not Started</option>
              <option value="In Progress">In Progress</option>
              <option value="Complete">Complete</option>
            </Select>

            <Select
              label="Supplements"
              value={formData.supplements_status}
              onChange={(e) => setFormData({ ...formData, supplements_status: e.target.value })}
            >
              <option value="Not Started">Not Started</option>
              <option value="In Progress">In Progress</option>
              <option value="Complete">Complete</option>
            </Select>

            <Select
              label="Recommendations"
              value={formData.recommendation_status}
              onChange={(e) => setFormData({ ...formData, recommendation_status: e.target.value })}
            >
              <option value="Not Requested">Not Requested</option>
              <option value="Requested">Requested</option>
              <option value="Submitted">Submitted</option>
            </Select>
          </div>

          <label className="flex items-center cursor-pointer">
            <input
              type="checkbox"
              checked={formData.TestScore_sent}
              onChange={(e) => setFormData({ ...formData, test_scores_sent: e.target.checked })}
              className="mr-2 h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
            />
            <span className="text-sm text-gray-900">Test scores sent</span>
          </label>

          <Input
            label="Application Portal Link"
            type="url"
            value={formData.application_portal_link}
            onChange={(e) => setFormData({ ...formData, application_portal_link: e.target.value })}
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
