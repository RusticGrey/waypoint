'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select } from '@/components/ui/select';

interface TestScore {
  id: string;
  testType: string;
  testDate: string;
  compositeScore: number;
  mathScore: number;
  scienceScore: number;
  readingWritingScore: number;
  englishScore: number;
  comments: string;
  testName: string;
}

interface TestScoreModalProps {
  testScore?: any;
  onClose: () => void;
  onSuccess: () => void;
}

export default function TestScoreModal({
  testScore,
  onClose,
  onSuccess,
}: TestScoreModalProps) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [formData, setFormData] = useState({
    testType: 'SAT',
    testName: '',
    testDate: '',
    compositeScore: '',
    mathScore: '',
    readingWritingScore: '',
    englishScore: '',
    scienceScore: '',
    comments: '',
  });

  useEffect(() => {
    if (testScore) {
      setFormData({
        testType: testScore.testType,
        testName: testScore.testName || '',
        testDate: testScore.testDate.split('T')[0],
        compositeScore: testScore.compositeScore.toString(),
        mathScore: testScore.mathScore?.toString() || '',
        readingWritingScore: testScore.readingWritingScore?.toString() || '',
        englishScore: testScore.englishScore?.toString() || '',
        scienceScore: testScore.scienceScore?.toString() || '',
        comments: testScore.comments || '',
      });
    }
  }, [testScore]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const url = testScore
        ? `/api/student/test-scores/${testScore.id}`
        : '/api/student/test-scores';

      const method = testScore ? 'PATCH' : 'POST';

      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          testType: formData.testType,
          testName: formData.testType === 'Other' ? formData.testName : null,
          testDate: formData.testDate,
          compositeScore: parseInt(formData.compositeScore),
          mathScore: formData.mathScore ? parseInt(formData.mathScore) : null,
          readingWritingScore: formData.readingWritingScore ? parseInt(formData.readingWritingScore) : null,
          englishScore: formData.englishScore ? parseInt(formData.englishScore) : null,
          scienceScore: formData.scienceScore ? parseInt(formData.scienceScore) : null,
          comments: formData.comments,
        }),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || 'Failed to save test score');
      }

      onSuccess();
      onClose();
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const isSAT = formData.testType === 'SAT';
  const isACT = formData.testType === 'ACT';

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg p-6 max-w-2xl w-full">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">
          {testScore ? 'Update Test Score' : 'Add Test Score'}
        </h2>

        {error && (
          <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded">
            <p className="text-sm text-red-800">{error}</p>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">Test Type *</label>
              <Select
                value={formData.testType}
                onChange={(e) => setFormData({ 
                  ...formData, 
                  testType: e.target.value,
                })}
                required
              >
                <option value="SAT">SAT</option>
                <option value="ACT">ACT</option>
                <option value="AP">AP</option>
                <option value="IB">IB</option>
                <option value="TOEFL">TOEFL</option>
                <option value="IELTS">IELTS</option>
                <option value="Duolingo">Duolingo</option>
                <option value="Other">Other</option>
              </Select>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">Test Date *</label>
              <Input
                type="date"
                value={formData.testDate}
                onChange={(e) => setFormData({ ...formData, testDate: e.target.value })}
                required
              />
            </div>
          </div>

          {formData.testType === 'Other' && (
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">Test Name *</label>
              <Input
                placeholder="Enter the name of the test"
                value={formData.testName}
                onChange={(e) => setFormData({ ...formData, testName: e.target.value })}
                required
              />
            </div>
          )}

          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700">
              {formData.testType} Composite Score *
            </label>
            <Input
              type="number"
              min="0"
              max={isSAT ? "1600" : isACT ? "36" : "2400"}
              value={formData.compositeScore}
              onChange={(e) => setFormData({ ...formData, compositeScore: e.target.value })}
              required
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700">Comments</label>
            <textarea
              className="w-full min-h-[80px] p-3 border border-gray-300 rounded-md text-sm focus:ring-2 focus:ring-blue-500 outline-none"
              placeholder="Additional details about the test..."
              value={formData.comments}
              onChange={(e) => setFormData({ ...formData, comments: e.target.value })}
            />
          </div>

          {isSAT && (
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">Math (200-800)</label>
                <Input
                  type="number"
                  min="200"
                  max="800"
                  value={formData.mathScore}
                  onChange={(e) => setFormData({ ...formData, mathScore: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">Reading & Writing (200-800)</label>
                <Input
                  type="number"
                  min="200"
                  max="800"
                  value={formData.readingWritingScore}
                  onChange={(e) => setFormData({ ...formData, readingWritingScore: e.target.value })}
                />
              </div>
            </div>
          )}

          {isACT && (
            <>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">Math (1-36)</label>
                  <Input
                    type="number"
                    min="1"
                    max="36"
                    value={formData.mathScore}
                    onChange={(e) => setFormData({ ...formData, mathScore: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">English (1-36)</label>
                  <Input
                    type="number"
                    min="1"
                    max="36"
                    value={formData.englishScore}
                    onChange={(e) => setFormData({ ...formData, englishScore: e.target.value })}
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">Reading (1-36)</label>
                  <Input
                    type="number"
                    min="1"
                    max="36"
                    value={formData.readingWritingScore}
                    onChange={(e) => setFormData({ ...formData, readingWritingScore: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">Science (1-36)</label>
                  <Input
                    type="number"
                    min="1"
                    max="36"
                    value={formData.scienceScore}
                    onChange={(e) => setFormData({ ...formData, scienceScore: e.target.value })}
                  />
                </div>
              </div>
            </>
          )}

          <div className="flex gap-2 pt-4">
            <Button type="submit" className="flex-1" disabled={loading}>
              {loading ? 'Saving...' : testScore ? 'Update Score' : 'Add Score'}
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
