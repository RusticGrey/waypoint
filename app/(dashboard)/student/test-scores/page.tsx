'use client';

import { useState, useEffect } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import TestScoreModal from './test-score-modal';

interface TestScore {
  id: string;
  testType: string;
  testDate: string;
  compositeScore: number;
  sectionScores: any;
}

export default function TestScoresPage() {
  const [testScores, setTestScores] = useState<TestScore[]>([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editingScore, setEditingScore] = useState<TestScore | undefined>();

  useEffect(() => {
    fetchTestScores();
  }, []);

  const fetchTestScores = async () => {
    try {
      const res = await fetch('/api/student/test-scores');
      const data = await res.json();
      setTestScores(data.testScores || []);
    } catch (error) {
      console.error('Failed to fetch test scores:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Delete this test score?')) return;

    try {
      const res = await fetch(`/api/student/test-scores/${id}`, {
        method: 'DELETE',
      });

      if (!res.ok) throw new Error('Failed to delete');

      await fetchTestScores();
    } catch (error) {
      console.error('Delete error:', error);
      alert('Failed to delete test score');
    }
  };

  const getBestSAT = () => {
    const satScores = testScores.filter(s => s.testType === 'SAT');
    if (satScores.length === 0) return null;
    return Math.max(...satScores.map(s => s.compositeScore));
  };

  const getBestACT = () => {
    const actScores = testScores.filter(s => s.testType === 'ACT');
    if (actScores.length === 0) return null;
    return Math.max(...actScores.map(s => s.compositeScore));
  };

  const groupedScores = testScores.reduce((acc, score) => {
    if (!acc[score.testType]) acc[score.testType] = [];
    acc[score.testType].push(score);
    return acc;
  }, {} as Record<string, TestScore[]>);

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <p className="text-gray-600 text-center py-12">Loading test scores...</p>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900">Test Scores</h1>
        <p className="text-gray-600 mt-1">Track your SAT, ACT, AP, and IB scores</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <Card>
          <CardContent className="pt-6">
            <div className="text-center">
              <p className="text-sm text-gray-600 mb-2">Best SAT Score</p>
              <div className="text-4xl font-bold text-blue-600">
                {getBestSAT() || '-'}
              </div>
              <p className="text-xs text-gray-500 mt-1">out of 1600</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="text-center">
              <p className="text-sm text-gray-600 mb-2">Best ACT Score</p>
              <div className="text-4xl font-bold text-green-600">
                {getBestACT() || '-'}
              </div>
              <p className="text-xs text-gray-500 mt-1">out of 36</p>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <CardTitle>All Test Scores ({testScores.length})</CardTitle>
            <Button onClick={() => {
              setEditingScore(undefined);
              setShowModal(true);
            }}>
              + Add Test Score
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          {Object.keys(groupedScores).length > 0 ? (
            <div className="space-y-6">
              {Object.entries(groupedScores).map(([testType, scores]) => (
                <div key={testType}>
                  <h3 className="font-semibold text-gray-900 mb-3">{testType} Scores</h3>
                  <div className="space-y-2">
                    {scores.map(score => {
                      // const sections = score.sectionScores || {};
                      return (
                        <div key={score.id} className="flex justify-between items-center p-4 border rounded-lg hover:bg-gray-50">
                          <div className="flex-1">
                            <div className="flex items-center gap-4">
                              <div className="text-3xl font-bold text-gray-900">
                                {score.compositeScore}
                              </div>
                              <div>
                                <p className="text-sm text-gray-600">
                                  {new Date(score.testDate).toLocaleDateString()}
                                </p>
                                {score.testType === 'SAT' && score.mathScore && score.readingWritingScore && (
                                  <p className="text-xs text-gray-500">
                                    Math: {score.mathScore} | Reading & Writing: {score.readingWritingScore}
                                  </p>
                                )}
                                {score.testType === 'ACT' && (
                                  <p className="text-xs text-gray-500">
                                    Math: {score.mathScore} | English: {score.englishScore} | Reading: {score.readingWritingScore} | Science: {score.scienceScore}
                                  </p>
                                )}
                              </div>
                            </div>
                          </div>
                          <div className="flex gap-2">
                            <button
                              onClick={() => {
                                setEditingScore(score);
                                setShowModal(true);
                              }}
                              className="text-blue-600 hover:text-blue-800 text-sm"
                            >
                              Edit
                            </button>
                            <button
                              onClick={() => handleDelete(score.id)}
                              className="text-red-600 hover:text-red-800 text-sm"
                            >
                              Delete
                            </button>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-500 text-center py-8">
              No test scores yet. Click "+ Add Test Score" to get started!
            </p>
          )}
        </CardContent>
      </Card>

      {showModal && (
        <TestScoreModal
          testScore={editingScore}
          onClose={() => setShowModal(false)}
          onSuccess={() => {
            setShowModal(false);
            fetchTestScores();
          }}
        />
      )}
    </div>
  );
}
