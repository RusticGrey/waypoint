'use client';

import { useState } from 'react';
import PersonalProfileForm from './PersonalProfileForm';
import AcademicProfileForm from './AcademicProfileForm';
import TranscriptForm from './TranscriptForm';
import TestScoreForm from './TestScoreForm';
import ActivityForm from './ActivityForm';
import AchievementForm from './AchievementForm';
import ProjectForm from './ProjectForm';
// import { Student } from '@prisma/client';        

type Step = 1 | 2 | 3 | 4 | 5 | 6 | 7;

interface FormData {
  personal: any;
  academic: any;
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
    academic: student?.academicProfile,
    transcripts: student?.transcripts || [],
    testScores: student?.testScores || [],
    activities: student?.activities || [],
    achievements: student?.achievements || [],
    projects: student?.projectExperiences || [],
  });

  const steps = [
    { number: 1, title: 'Personal Information' },
    { number: 2, title: 'Academic Background' },
    { number: 3, title: 'Transcripts' },
    { number: 4, title: 'Test Scores' },
    { number: 5, title: 'Activities' },
    { number: 6, title: 'Achievements' },
    { number: 7, title: 'Projects & Experiences (Optional)' },
  ];

  const handleNext = (stepKey: keyof FormData, data: any, newCompletionPct?: number) => {
    setFormData((prev) => ({ ...prev, [stepKey]: data }));
    
    if (typeof newCompletionPct === 'number') {
      setCompletionPct(newCompletionPct);
    }

    if (currentStep < 7) {
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
          <AcademicProfileForm
            onNext={(data, pct) => handleNext('academic', data, pct)}
            onBack={handleBack}
            initialData={formData.academic}
          />
        );
      case 3:
        return (
          <TranscriptForm
            onNext={(data, pct) => handleNext('transcripts', data, pct)}
            onSave={(data, pct) => handleSave('transcripts', data, pct)}
            onBack={handleBack}
            initialData={formData.transcripts}
            curriculum={formData.academic?.curriculumType}
            currentGrade={formData.personal?.currentGrade}
          />
        );
      case 4:
        return (
          <TestScoreForm
            onNext={(data, pct) => handleNext('testScores', data, pct)}
            onSave={(data, pct) => handleSave('testScores', data, pct)}
            onBack={handleBack}
            initialData={formData.testScores}
          />
        );
      case 5:
        return (
          <ActivityForm
            onNext={(data, pct) => handleNext('activities', data, pct)}
            onSave={(data, pct) => handleSave('activities', data, pct)}
            onBack={handleBack}
            initialData={formData.activities}
          />
        );
      case 6:
        return (
          <AchievementForm
            onNext={(data, pct) => handleNext('achievements', data, pct)}
            onSave={(data, pct) => handleSave('achievements', data, pct)}
            onBack={handleBack}
            initialData={formData.achievements}
            currentGrade={formData.personal?.currentGrade}
          />
        );
      case 7:
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
      <div className="mb-8">
        <div className="flex items-center justify-between">
          {steps.map((step, idx) => (
            <div key={step.number} className="flex items-center flex-1">
              <div
                className={`
                  w-10 h-10 rounded-full flex items-center justify-center text-sm font-semibold
                  ${currentStep >= step.number ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-600'}
                `}
              >
                {step.number}
              </div>
              {idx < steps.length - 1 && (
                <div
                  className={`h-1 flex-1 mx-2 ${currentStep > step.number ? 'bg-blue-600' : 'bg-gray-200'}`}
                />
              )}
            </div>
          ))}
        </div>
        <div className="mt-4 text-center">
          <h2 className="text-xl font-semibold text-gray-900">{steps[currentStep - 1].title}</h2>
          <p className="text-sm text-gray-500">Step {currentStep} of {steps.length} ({completionPct}% complete)</p>
        </div>
      </div>

      {/* Step content */}
      <div className="bg-white rounded-lg shadow p-8">
        {renderStep()}
      </div>
    </div>
  );
}
