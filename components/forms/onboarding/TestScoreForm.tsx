'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { testScoreSchema, TestScoreInput } from '@/lib/validations/student';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useState } from 'react';

interface Props {
  onNext: (data: any[], completionPercentage?: number) => void;
  onSave?: (data: any[], completionPercentage?: number) => void;
  onBack: () => void;
  initialData?: any[];
}

const TEST_TYPES = [
  'SAT',
  'ACT',
  'AP',
  'IB',
  'TOEFL',
  'IELTS',
  'Duolingo',
  'Other'
];

export default function TestScoreForm({ onNext, onSave, onBack, initialData = [] }: Props) {
  const [testScores, setTestScores] = useState<any[]>(initialData);
  const [showForm, setShowForm] = useState(false);
  const [editIndex, setEditIndex] = useState<number | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    watch,
  } = useForm<TestScoreInput>({
    resolver: zodResolver(testScoreSchema),
  });

  const testType = watch('testType');

  const saveTestScores = async (newScores: any[]) => {
    try {
      const response = await fetch('/api/onboarding/test-scores', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ testScores: newScores }),
      });

      if (response.ok) {
        const responseData = await response.json();
        if (onSave) {
          onSave(newScores, responseData.completionPercentage);
        }
      } else {
        console.error('Failed to save test scores');
      }
    } catch (error) {
      console.error('Error saving test scores:', error);
    }
  };

  const onSubmitScore = (data: TestScoreInput) => {
    let updatedScores;
    if (editIndex !== null) {
      updatedScores = [...testScores];
      updatedScores[editIndex] = data;
      setEditIndex(null);
    } else {
      updatedScores = [...testScores, data];
    }
    
    setTestScores(updatedScores);
    saveTestScores(updatedScores);
    
    reset();
    setShowForm(false);
  };

  const editScore = (index: number) => {
    const score = testScores[index];
    // Exclude Date objects if any, convert to strings if needed (schema expects string YYYY-MM-DD for testDate)
    // Assuming initialData comes formatted or we handle it.
    // If DB sends Date object for testDate, we need to convert it to string YYYY-MM-DD for input type="date"
    
    const formattedScore = { ...score };
    if (score.testDate instanceof Date) {
        formattedScore.testDate = score.testDate.toISOString().split('T')[0];
    } else if (typeof score.testDate === 'string' && score.testDate.includes('T')) {
        formattedScore.testDate = score.testDate.split('T')[0];
    }

    reset(formattedScore);
    setEditIndex(index);
    setShowForm(true);
  };

  const removeScore = (index: number) => {
    const updatedScores = testScores.filter((_, i) => i !== index);
    setTestScores(updatedScores);
    saveTestScores(updatedScores);

    if (editIndex === index) {
      setEditIndex(null);
      setShowForm(false);
      reset();
    }
  };

  const handleNext = async () => {
    // Just verify save or proceed (data is saved on add/edit)
    // We can re-save to be safe and get percentage
    await saveTestScores(testScores);
    
    // We pass testScores to onNext, but percentage update is handled by saveTestScores->onSave
    // onNext also triggers step advancement in parent
    onNext(testScores);
  };

  return (
    <div className="space-y-6">
      <div>
        <p className="text-sm text-gray-600 mb-4">
          Add your standardized test scores (SAT, ACT, AP, IB, etc.). You can add multiple scores.
        </p>

        {testScores.length > 0 && (
          <div className="mb-6 space-y-2">
            <h3 className="font-medium text-gray-900">Added Scores ({testScores.length})</h3>
            {testScores.map((score, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded border">
                <div>
                  <p className="font-medium text-gray-900">{score.testType}</p>
                  <p className="text-sm text-gray-600">
                    Date: {new Date(score.testDate).toLocaleDateString()} • Score: {score.compositeScore}
                  </p>
                </div>
                <div className="flex gap-2">
                  <button
                    type="button"
                    onClick={() => editScore(index)}
                    className="text-blue-600 hover:text-blue-800 text-sm"
                  >
                    Edit
                  </button>
                  <button
                    type="button"
                    onClick={() => removeScore(index)}
                    className="text-red-600 hover:text-red-800 text-sm"
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {!showForm && (
          <Button
            type="button"
            onClick={() => {
              setShowForm(true);
              setEditIndex(null);
              reset({
                testType: '',
                testDate: '',
                compositeScore: 0,
              });
            }}
            variant="outline"
            className="w-full"
          >
            + Add Test Score
          </Button>
        )}

        {showForm && (
          <form 
            onSubmit={handleSubmit(onSubmitScore, (e) => console.error(e))} 
            className="space-y-4 p-4 border rounded-lg bg-gray-50"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Test Type *
                </label>
                <select
                  {...register('testType')}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md text-gray-900"
                >
                  <option value="">Select test</option>
                  {TEST_TYPES.map((t) => (
                    <option key={t} value={t}>{t}</option>
                  ))}
                </select>
                {errors.testType && (
                  <p className="mt-1 text-sm text-red-600">{errors.testType.message}</p>
                )}
              </div>

              <Input
                label="Test Date *"
                type="date"
                {...register('testDate')}
                error={errors.testDate?.message}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Input
                label="Composite / Total Score *"
                type="number"
                {...register('compositeScore', { valueAsNumber: true })}
                error={errors.compositeScore?.message}
              />
            </div>

            {/* Optional section scores based on test type could go here, keeping it simple for now */}
            
            <div className="flex gap-2">
              <Button type="submit" className="flex-1">
                {editIndex !== null ? 'Update Score' : 'Add Score'}
              </Button>
              <Button
                type="button"
                onClick={() => {
                  setShowForm(false);
                  reset();
                  setEditIndex(null);
                }}
                variant="outline"
              >
                Cancel
              </Button>
            </div>
          </form>
        )}
      </div>

      <div className="flex justify-between pt-6 border-t">
        <Button type="button" onClick={onBack} variant="outline">
          ← Back
        </Button>
        <Button
          type="button"
          onClick={handleNext}
        >
          Next →
        </Button>
      </div>
    </div>
  );
}
