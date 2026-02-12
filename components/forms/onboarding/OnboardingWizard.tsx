'use client';

import { useState } from 'react';
import PersonalProfileForm from './PersonalProfileForm';
import AcademicProfileForm from './AcademicProfileForm';
import TranscriptForm from './TranscriptForm';
import ActivityForm from './ActivityForm';
import AchievementForm from './AchievementForm';
import ProjectForm from './ProjectForm';

type Step = 1 | 2 | 3 | 4 | 5 | 6;

interface FormData {
  personal: any;
  academic: any;
  Transcript: any[];
  Activity: any[];
  Achievement: any[];
  projects: any[];
}

export default function OnboardingWizard() {
  const [currentStep, setCurrentStep] = useState<Step>(1);
  const [formData, setFormData] = useState<FormData>({
    personal: {},
    academic: {},
    Transcript: [],
    Activity: [],
    Achievement: [],
    projects: [],
  });

  const steps = [
    { number: 1, title: 'Personal Information' },
    { number: 2, title: 'Academic Background' },
    { number: 3, title: 'Transcripts' },
    { number: 4, title: 'Activities' },
    { number: 5, title: 'Achievements' },
    { number: 6, title: 'Projects & Experiences' },
  ];

  const handleNext = (stepKey: keyof FormData, data: any) => {
    setFormData((prev) => ({ ...prev, [stepKey]: data }));
    if (currentStep < 6) {
      setCurrentStep((prev) => (prev + 1) as Step);
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
            onNext={(data) => handleNext('personal', data)}
            initialData={formData.personal}
          />
        );
      case 2:
        return (
          <AcademicProfileForm
            onNext={(data) => handleNext('academic', data)}
            onBack={handleBack}
            initialData={formData.academic}
          />
        );
      case 3:
        return (
          <TranscriptForm
            onNext={(data) => handleNext('transcripts', data)}
            onBack={handleBack}
            initialData={formData.transcripts}
            curriculum={formData.academic.curriculumType}
            currentGrade={formData.personal.currentGrade}
          />
        );
      case 4:
        return (
          <ActivityForm
            onNext={(data) => handleNext('activities', data)}
            onBack={handleBack}
            initialData={formData.activities}
            currentGrade={formData.personal.currentGrade}
          />
        );
      case 5:
        return (
          <AchievementForm
            onNext={(data) => handleNext('achievements', data)}
            onBack={handleBack}
            initialData={formData.achievements}
            currentGrade={formData.personal.currentGrade}
          />
        );
      case 6:
        return (
          <ProjectForm
            onNext={(data) => handleNext('projects', data)}
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
          <p className="text-sm text-gray-500">Step {currentStep} of {steps.length}</p>
        </div>
      </div>

      {/* Step content */}
      <div className="bg-white rounded-lg shadow p-8">
        {renderStep()}
      </div>
    </div>
  );
}
