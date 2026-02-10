'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select } from '@/components/ui/select';

interface TestScore {
  id: string;
  test_type: string;
  test_date: string;
  composite_score: number;
  section_scores: any;
}

interface TestScoreModalProps {
  testScore?: TestScore;
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
    test_type: 'SAT',
    test_date: '',
    composite_score: '',
    math_score: '',
    reading_writing_score: '',
    english_score: '',
    science_score: '',
    essay_score: '',
  });

  useEffect(() => {
    if (testScore) {
      const sections = testScore.section_scores || {};
      setFormData({
        test_type: testScore.test_type,
        test_date: testScore.test_date.split('T')[0],
        composite_score: testScore.composite_score.toString(),
        math_score: sections.math?.toString() || '',
        reading_writing_score: sections.reading_writing?.toString() || '',
        english_score: sections.english?.toString() || '',
        science_score: sections.science?.toString() || '',
        essay_score: sections.essay?.toString() || '',
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
          test_type: formData.test_type,
          test_date: formData.test_date,
          composite_score: parseInt(formData.composite_score),
          math_score: formData.math_score ? parseInt(formData.math_score) : null,
          reading_writing_score: formData.reading_writing_score ? parseInt(formData.reading_writing_score) : null,
          english_score: formData.english_score ? parseInt(formData.english_score) : null,
          science_score: formData.science_score ? parseInt(formData.science_score) : null,
          essay_score: formData.essay_score ? parseInt(formData.essay_score) : null,
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

  const isSAT = formData.test_type === 'SAT';
  const isACT = formData.test_type === 'ACT';

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
            <Select
              label="Test Type *"
              value={formData.test_type}
              onChange={(e) => setFormData({ 
                ...formData, 
                test_type: e.target.value,
                math_score: '',
                reading_writing_score: '',
                english_score: '',
                science_score: '',
              })}
              required
            >
              <option value="SAT">SAT</option>
              <option value="ACT">ACT</option>
              <option value="AP">AP</option>
              <option value="IB">IB</option>
              <option value="Other">Other</option>
            </Select>

            <Input
              label="Test Date *"
              type="date"
              value={formData.test_date}
              onChange={(e) => setFormData({ ...formData, test_date: e.target.value })}
              required
            />
          </div>

          <Input
            label={`${formData.test_type} Composite Score *`}
            type="number"
            min="0"
            max={isSAT ? "1600" : isACT ? "36" : "800"}
            value={formData.composite_score}
            onChange={(e) => setFormData({ ...formData, composite_score: e.target.value })}
            required
          />

          {isSAT && (
            <div className="grid grid-cols-2 gap-4">
              <Input
                label="Math (200-800)"
                type="number"
                min="200"
                max="800"
                value={formData.math_score}
                onChange={(e) => setFormData({ ...formData, math_score: e.target.value })}
              />
              <Input
                label="Reading & Writing (200-800)"
                type="number"
                min="200"
                max="800"
                value={formData.reading_writing_score}
                onChange={(e) => setFormData({ ...formData, reading_writing_score: e.target.value })}
              />
            </div>
          )}

          {isACT && (
            <>
              <div className="grid grid-cols-2 gap-4">
                <Input
                  label="Math (1-36)"
                  type="number"
                  min="1"
                  max="36"
                  value={formData.math_score}
                  onChange={(e) => setFormData({ ...formData, math_score: e.target.value })}
                />
                <Input
                  label="English (1-36)"
                  type="number"
                  min="1"
                  max="36"
                  value={formData.english_score}
                  onChange={(e) => setFormData({ ...formData, english_score: e.target.value })}
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <Input
                  label="Reading (1-36)"
                  type="number"
                  min="1"
                  max="36"
                  value={formData.reading_writing_score}
                  onChange={(e) => setFormData({ ...formData, reading_writing_score: e.target.value })}
                />
                <Input
                  label="Science (1-36)"
                  type="number"
                  min="1"
                  max="36"
                  value={formData.science_score}
                  onChange={(e) => setFormData({ ...formData, science_score: e.target.value })}
                />
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
