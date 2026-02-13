'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

interface OverrideModalProps {
  studentId: string;
  currentScore: number;
  existingOverride?: {
    override_score: number;
    override_reason: string;
  };
  onClose: () => void;
  onSuccess: () => void;
}

export default function OverrideModal({
  studentId,
  currentScore,
  existingOverride,
  onClose,
  onSuccess,
}: OverrideModalProps) {
  const [overrideScore, setOverrideScore] = useState(
    existingOverride?.overrideScore?.toString() || currentScore.toString()
  );
  const [overrideReason, setOverrideReason] = useState(
    existingOverride?.overrideReason || ''
  );
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const res = await fetch('/api/coordinator/profile-override', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          studentId: studentId,
          overrideScore: parseInt(overrideScore),
          overrideReason: overrideReason,
        }),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || 'Failed to save override');
      }

      onSuccess();
      onClose();
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleRemove = async () => {
    if (!confirm('Remove this override and restore automatic scoring?')) return;

    setLoading(true);
    try {
      const res = await fetch(`/api/coordinator/profile-override?student_id=${studentId}`, {
        method: 'DELETE',
      });

      if (!res.ok) throw new Error('Failed to remove override');

      onSuccess();
      onClose();
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 max-w-lg w-full mx-4">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">
          {existingOverride ? 'Update' : 'Override'} Profile Score
        </h2>

        <div className="mb-4 p-3 bg-blue-50 border border-blue-200 rounded">
          <p className="text-sm text-blue-900">
            <strong>Automatic Score:</strong> {currentScore}/100
          </p>
          <p className="text-xs text-blue-700 mt-1">
            You can override this score if you believe the automatic calculation doesn't accurately reflect the student's profile.
          </p>
        </div>

        {error && (
          <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded">
            <p className="text-sm text-red-800">{error}</p>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            label="Override Score (0-100) *"
            type="number"
            min="0"
            max="100"
            value={overrideScore}
            onChange={(e) => setOverrideScore(e.target.value)}
            required
          />

          <div>
            <label className="block text-sm font-medium text-gray-900 mb-1">
              Reason for Override *
            </label>
            <textarea
              value={overrideReason}
              onChange={(e) => setOverrideReason(e.target.value)}
              rows={4}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md text-gray-900"
              placeholder="Explain why this student's profile deserves a different score..."
            />
            <p className="text-xs text-gray-500 mt-1">
              This will be visible to the student as a counselor note.
            </p>
          </div>

          <div className="flex gap-2 pt-4">
            <Button type="submit" className="flex-1" disabled={loading}>
              {loading ? 'Saving...' : existingOverride ? 'Update Override' : 'Save Override'}
            </Button>
            {existingOverride && (
              <Button
                type="button"
                onClick={handleRemove}
                variant="outline"
                disabled={loading}
                className="text-red-600 hover:text-red-700"
              >
                Remove Override
              </Button>
            )}
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
