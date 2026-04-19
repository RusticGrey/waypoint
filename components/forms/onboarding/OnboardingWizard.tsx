'use client';

import { useState, useEffect } from 'react';
import { ux } from '@/lib/ux';
import { cn } from '@/lib/utils';
import PersonalProfileForm from './PersonalProfileForm';
import TranscriptForm from './TranscriptForm';
import TestScoreForm from './TestScoreForm';
import ActivityForm from './ActivityForm';
import AchievementForm from './AchievementForm';
import ProjectForm from './ProjectForm';
// import { Student } from '@prisma/client';        

type Step = 1 | 2 | 3 | 4 | 5 | 6;

interface FormData {
  personal: any;
  transcripts: any[];
  testScores: any[];
  activities: any[];
  achievements: any[];
  projects: any[];
}

interface OnboardingWizardProps {
  student: any;
  userId: string;
}

export default function OnboardingWizard({ student, userId }: OnboardingWizardProps) {
  
  console.log('Existing student data:', JSON.stringify(student));
  
  const [currentStep, setCurrentStep] = useState<Step>(1);
  const [completionPct, setCompletionPct] = useState<number>(student?.profileCompletionPct || 0);
  const [formData, setFormData] = useState<FormData>({
    personal: {
      ...student?.personalProfile,
      currentGrade: student?.currentGrade,
    },
    transcripts: student?.transcripts || [],
    testScores: student?.testScores || [],
    activities: student?.activities || [],
    achievements: student?.achievements || [],
    projects: student?.projectExperiences || [],
  });

  // Re-sync test scores if student prop changes (e.g. after internal navigate/refresh)
  useEffect(() => {
    if (student?.testScores) {
      setFormData(prev => ({
        ...prev,
        testScores: student.testScores
      }));
    }
  }, [student?.testScores]);

  const steps = [
    { number: 1, title: 'Personal Information' },
    { number: 2, title: 'Transcripts' },
    { number: 3, title: 'Test Scores' },
    { number: 4, title: 'Activities' },
    { number: 5, title: 'Achievements' },
    { number: 6, title: 'Projects & Experiences (Optional)' },
  ];

  const handleNext = (stepKey: keyof FormData, data: any, newCompletionPct?: number) => {
    setFormData((prev) => ({ ...prev, [stepKey]: data }));
    
    if (typeof newCompletionPct === 'number') {
      setCompletionPct(newCompletionPct);
    }

    if (currentStep < 6) {
      setCurrentStep((prev) => (prev + 1) as Step);
    }
  };

  const handleSave = (stepKey: keyof FormData, data: any, newCompletionPct?: number) => {
    setFormData((prev) => ({ ...prev, [stepKey]: data }));
    
    if (typeof newCompletionPct === 'number') {
      setCompletionPct(newCompletionPct);
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep((prev) => (prev - 1) as Step);
    }
  };

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <PersonalProfileForm
            onNext={(data, pct) => handleNext('personal', data, pct)}
            initialData={formData.personal}
          />
        );
      case 2:
        return (
          <TranscriptForm
            onNext={(data, pct) => handleNext('transcripts', data, pct)}
            onSave={(data, pct) => handleSave('transcripts', data, pct)}
            onBack={handleBack}
            initialData={formData.transcripts}
            currentGrade={formData.personal?.currentGrade}
          />
        );
      case 3:
        return (
          <TestScoreForm
            onNext={(data, pct) => handleNext('testScores', data, pct)}
            onSave={(data, pct) => handleSave('testScores', data, pct)}
            onBack={handleBack}
            initialData={formData.testScores}
          />
        );
      case 4:
        return (
          <ActivityForm
            onNext={(data, pct) => handleNext('activities', data, pct)}
            onSave={(data, pct) => handleSave('activities', data, pct)}
            onBack={handleBack}
            initialData={formData.activities}
          />
        );
      case 5:
        return (
          <AchievementForm
            onNext={(data, pct) => handleNext('achievements', data, pct)}
            onSave={(data, pct) => handleSave('achievements', data, pct)}
            onBack={handleBack}
            initialData={formData.achievements}
            currentGrade={formData.personal?.currentGrade}
          />
        );
      case 6:
        return (
          <ProjectForm
            onNext={(data, pct) => handleNext('projects', data, pct)}
            onSave={(data, pct) => handleSave('projects', data, pct)}
            onBack={handleBack}
            initialData={formData.projects}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      {/* Progress bar */}
      <div className="mb-12">
        <div className="flex items-center justify-between">
          {steps.map((step, idx) => (
            <div key={step.number} className="flex items-center flex-1">
              <div
                className={cn(
                  "w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold transition-all shadow-sm",
                  currentStep >= step.number 
                    ? "bg-brand-600 text-white shadow-brand-100" 
                    : "bg-surface-muted text-slate-400"
                )}
              >
                {step.number}
              </div>
              {idx < steps.length - 1 && (
                <div
                  className={cn(
                    "h-1.5 flex-1 mx-2 rounded-full transition-all",
                    currentStep > step.number ? "bg-brand-600" : "bg-surface-muted"
                  )}
                />
              )}
            </div>
          ))}
        </div>
        <div className="mt-6 text-center space-y-1">
          <h2 className={ux.text.subheading}>{steps[currentStep - 1].title}</h2>
          <p className={ux.text.muted}>Step {currentStep} of {steps.length} ({completionPct}% complete)</p>
        </div>
      </div>

      {/* Step content */}
      <div className={cn(ux.card.base, "p-8 shadow-md relative overflow-hidden")}>
        <div className="absolute top-0 left-0 w-full h-1.5 bg-surface-soft">
          <div 
            className="h-full bg-brand-500 transition-all duration-500" 
            style={{ width: `${(currentStep / steps.length) * 100}%` }}
          />
        </div>
        {renderStep()}
      </div>
    </div>
  );
}
