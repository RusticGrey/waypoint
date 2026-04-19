'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { testScoreSchema, TestScoreInput } from '@/lib/validations/student';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useState } from 'react';
import { cn } from '@/lib/utils';
import { ux } from '@/lib/ux';

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
    getValues,
  } = useForm<TestScoreInput>({
    resolver: zodResolver(testScoreSchema) as any,
    values: {
      testScores: testScores,
    } as any,
    defaultValues: {
      compositeScore: 0,
    }
  });

  const testType = watch('testType');

  const saveTestScores = async (newScores: any[]) => {
    try {
      const response = await fetch('/api/onboarding/test-scores', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          testScores: newScores.map(s => ({
            ...s,
            testName: s.testName || null,
            mathScore: s.mathScore || null,
            englishScore: s.englishScore || null,
            scienceScore: s.scienceScore || null,
            readingWritingScore: s.readingWritingScore || null,
            listeningScore: s.listeningScore || null,
            speakingScore: s.speakingScore || null,
            writingScore: s.writingScore || null,
            comments: s.comments || null,
          }))
        }),
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
    try {
      const response = await fetch('/api/onboarding/test-scores', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ testScores }),
      });

      if (response.ok) {
        const responseData = await response.json();
        onNext(testScores, responseData.completionPercentage);
      }
    } catch (error) {
      console.error('Error in handleNext:', error);
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <p className={ux.text.body}>
          Add your standardized test scores (SAT, ACT, AP, IB, etc.). You can add multiple scores.
        </p>

        {testScores.length > 0 && (
          <div className="mb-8 mt-6 space-y-3">
            <h3 className={cn(ux.text.accent, "text-sm")}>Added Scores ({testScores.length})</h3>
            {testScores.map((score, index) => (
              <div key={index} className="flex items-center justify-between p-4 bg-surface-soft rounded-xl border border-surface-muted shadow-sm">
                <div>
                  <p className="font-bold text-slate-900">{score.testType === 'Other' ? score.testName : score.testType}</p>
                  <p className="text-xs text-slate-500 font-medium">
                    {new Date(score.testDate).toLocaleDateString(undefined, { year: 'numeric', month: 'short', day: 'numeric' })} • <span className="text-brand-600 font-black">Score: {score.compositeScore}</span>
                  </p>
                </div>
                <div className="flex gap-4">
                  <button
                    type="button"
                    onClick={() => editScore(index)}
                    className="text-brand-600 hover:text-brand-700 font-bold text-xs uppercase tracking-tight"
                  >
                    Edit
                  </button>
                  <button
                    type="button"
                    onClick={() => removeScore(index)}
                    className="text-red-500 hover:text-red-600 font-bold text-xs uppercase tracking-tight"
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
            className={cn(ux.button.outline, "w-full border-dashed border-2 py-8 hover:bg-brand-50 transition-colors border-brand-200 text-brand-600 font-bold")}
          >
            + Add Test Score
          </Button>
        )}

        {showForm && (
          <form 
            onSubmit={handleSubmit((data) => onSubmitScore(data as any), (e) => console.error(e))} 
            className="space-y-6 p-6 border-2 border-dashed border-brand-200 rounded-xl bg-brand-50/30 animate-in fade-in zoom-in-95 duration-200"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className={ux.form.label}>
                  Test Type <span className="text-red-500">*</span>
                </label>
                <select
                  {...register('testType')}
                  className={ux.form.input}
                >
                  <option value="">Select test</option>
                  {TEST_TYPES.map((t) => (
                    <option key={t} value={t}>{t}</option>
                  ))}
                </select>
                {errors.testType && (
                  <p className={ux.form.error}>{(errors.testType as any).message}</p>
                )}
              </div>

              <div className="space-y-2">
                <label className={ux.form.label}>
                  Test Date <span className="text-red-500">*</span>
                </label>
                <Input
                  type="date"
                  {...register('testDate')}
                  className={ux.form.input}
                />
                {errors.testDate && <p className={ux.form.error}>{(errors.testDate as any).message}</p>}
              </div>
            </div>

            {(testType === 'Other' || testType === 'AP' || testType === 'IB') && (
              <div className="space-y-2 animate-in fade-in slide-in-from-top-1 duration-200">
                <label className={ux.form.label}>
                  {testType === 'AP' ? 'AP Subject' : testType === 'IB' ? 'IB Subject' : 'Test Name'} <span className="text-red-500">*</span>
                </label>
                <Input
                  placeholder={testType === 'AP' ? "e.g., AP Calculus BC" : testType === 'IB' ? "e.g., IB Physics HL" : "e.g., PSAT, AMC 10, etc."}
                  {...register('testName', { required: (testType === 'AP' || testType === 'IB' || testType === 'Other') ? 'Subject/Name is required' : false })}
                  className={ux.form.input}
                />
                {errors.testName && <p className={ux.form.error}>{errors.testName.message as string}</p>}
              </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className={ux.form.label}>
                  Composite / Total Score <span className="text-red-500">*</span>
                </label>
                <Input
                  type="number"
                  {...register('compositeScore', { valueAsNumber: true })}
                  className={ux.form.input}
                />
                {errors.compositeScore && <p className={ux.form.error}>{(errors.compositeScore as any).message}</p>}
              </div>
            </div>

            {/* Sub-scores for SAT */}
            {testType === 'SAT' && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-4 bg-white rounded-xl border border-surface-muted shadow-inner animate-in fade-in slide-in-from-top-1">
                <div className="space-y-2">
                  <label className={ux.form.label}>Math Score</label>
                  <Input
                    type="number"
                    {...register('mathScore', { valueAsNumber: true })}
                    className={ux.form.input}
                    placeholder="200-800"
                  />
                </div>
                <div className="space-y-2">
                  <label className={ux.form.label}>Reading & Writing</label>
                  <Input
                    type="number"
                    {...register('readingWritingScore', { valueAsNumber: true })}
                    className={ux.form.input}
                    placeholder="200-800"
                  />
                </div>
              </div>
            )}

            {/* Sub-scores for ACT */}
            {testType === 'ACT' && (
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-4 bg-white rounded-xl border border-surface-muted shadow-inner animate-in fade-in slide-in-from-top-1">
                <div className="space-y-2">
                  <label className={ux.form.label}>Math</label>
                  <Input
                    type="number"
                    {...register('mathScore', { valueAsNumber: true })}
                    className={ux.form.input}
                    placeholder="1-36"
                  />
                </div>
                <div className="space-y-2">
                  <label className={ux.form.label}>English</label>
                  <Input
                    type="number"
                    {...register('englishScore', { valueAsNumber: true })}
                    className={ux.form.input}
                    placeholder="1-36"
                  />
                </div>
                <div className="space-y-2">
                  <label className={ux.form.label}>Reading</label>
                  <Input
                    type="number"
                    {...register('readingWritingScore', { valueAsNumber: true })}
                    className={ux.form.input}
                    placeholder="1-36"
                  />
                </div>
                <div className="space-y-2">
                  <label className={ux.form.label}>Science</label>
                  <Input
                    type="number"
                    {...register('scienceScore', { valueAsNumber: true })}
                    className={ux.form.input}
                    placeholder="1-36"
                  />
                </div>
              </div>
            )}

            {/* Sub-scores for English Proficiency Tests (TOEFL, IELTS, Duolingo) */}
            {(testType === 'TOEFL' || testType === 'IELTS' || testType === 'Duolingo') && (
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-4 bg-white rounded-xl border border-surface-muted shadow-inner animate-in fade-in slide-in-from-top-1">
                <div className="space-y-2">
                  <label className={ux.form.label}>Listening</label>
                  <Input
                    type="number"
                    {...register('listeningScore', { valueAsNumber: true })}
                    className={ux.form.input}
                    placeholder="Score"
                  />
                </div>
                <div className="space-y-2">
                  <label className={ux.form.label}>Reading</label>
                  <Input
                    type="number"
                    {...register('readingWritingScore', { valueAsNumber: true })}
                    className={ux.form.input}
                    placeholder="Score"
                  />
                </div>
                <div className="space-y-2">
                  <label className={ux.form.label}>Speaking</label>
                  <Input
                    type="number"
                    {...register('speakingScore', { valueAsNumber: true })}
                    className={ux.form.input}
                    placeholder="Score"
                  />
                </div>
                <div className="space-y-2">
                  <label className={ux.form.label}>Writing</label>
                  <Input
                    type="number"
                    {...register('writingScore', { valueAsNumber: true })}
                    className={ux.form.input}
                    placeholder="Score"
                  />
                </div>
              </div>
            )}

            <div className="space-y-2">
              <label className={ux.form.label}>
                Comments <span className="text-slate-400 font-normal">(optional)</span>
              </label>
              <textarea
                {...register('comments')}
                className={cn(ux.form.input, "min-h-[100px]")}
                placeholder="Additional details about the test..."
              />
            </div>

            <div className="flex gap-4">
              <Button type="submit" className={cn(ux.button.primary, "flex-1")}>
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
                className={ux.button.outline}
              >
                Cancel
              </Button>
            </div>
          </form>
        )}
      </div>

      <div className="flex justify-between pt-6 border-t border-surface-muted">
        <Button type="button" onClick={onBack} variant="outline" className={ux.button.outline}>
          ← Back
        </Button>
        <Button
          type="button"
          onClick={handleNext}
          className={ux.button.primary}
        >
          Next →
        </Button>
      </div>
    </div>
  );
}
