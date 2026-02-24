'use client';

import { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';

interface QuickStartModalProps {
  role: 'student' | 'counselor';
  isAdmin?: boolean;
}

export function QuickStartModal({ role, isAdmin }: QuickStartModalProps) {
  const [isOpen, setIsOpen] = useState(false);

  const features = {
    student: [
      {
        icon: '✅',
        title: 'Complete Profile',
        description: 'Finish the 7-step onboarding to build your comprehensive profile.'
      },
      {
        icon: '📚',
        title: 'Manage Academics',
        description: 'Update your grades, activities, achievements, and projects.'
      },
      {
        icon: '🎓',
        title: 'College Applications',
        description: 'Build your college list and track application deadlines.'
      },
      {
        icon: '🎯',
        title: 'Set Goals',
        description: 'Create and track personal improvement goals.'
      }
    ],
    counselor: [
      {
        icon: '👥',
        title: 'Manage Students',
        description: 'View assigned students and monitor their progress.'
      },
      ...(process.env.NEXT_PUBLIC_ENABLE_MEETINGS === 'true' ? [
        {
          icon: '📅',
          title: 'Log Meetings',
          description: 'Record meeting notes, action items, and student mood.'
        }
      ] : []),
      {
        icon: '⏱️',
        title: 'Track Deadlines',
        description: 'Monitor upcoming application deadlines for all students.'
      },
      ...(isAdmin ? [
        {
          icon: '⚙️',
          title: 'User Management',
          description: 'Create and manage student and counselor accounts.'
        },
        {
          icon: '🏛️',
          title: 'College Database',
          description: 'Manage the central database of colleges and statistics.'
        }
      ] : [])
    ]
  };

  const currentFeatures = features[role];

  return (
    <>
      {/* Help Icon Button */}
      <button
        onClick={() => setIsOpen(true)}
        className="p-2 rounded-full hover:bg-gray-100 transition-colors text-gray-600 hover:text-blue-600"
        aria-label="Quick Start Guide"
        title="Quick Start Guide"
      >
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      </button>

      {/* Modal Backdrop */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 transition-opacity"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Modal */}
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            {/* Header */}
            <div className="sticky top-0 bg-blue-50 border-b border-blue-200 px-6 py-4 flex items-center justify-between">
              <h2 className="text-xl font-bold text-blue-900 flex items-center gap-2">
                <span className="text-2xl">🚀</span>
                Quick Start Guide
              </h2>
              <button
                onClick={() => setIsOpen(false)}
                className="text-gray-500 hover:text-gray-700 transition-colors p-1 rounded-full hover:bg-blue-100"
                aria-label="Close"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Content */}
            <div className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {currentFeatures.map((feature, index) => (
                  <div key={index} className="flex flex-col space-y-2 p-4 bg-gray-50 rounded-lg border border-gray-200 hover:border-blue-300 hover:bg-blue-50 transition-colors">
                    <div className="flex items-center space-x-3">
                      <span className="text-2xl" role="img" aria-label={feature.title}>{feature.icon}</span>
                      <h3 className="font-semibold text-gray-900">{feature.title}</h3>
                    </div>
                    <p className="text-sm text-gray-700 leading-relaxed">
                      {feature.description}
                    </p>
                  </div>
                ))}
              </div>

              {/* Footer */}
              <div className="mt-6 pt-4 border-t border-gray-200">
                <p className="text-sm text-gray-600 text-center">
                  {role === 'student' ? 'Need help? Check out the guides for each section of your profile.' : 'Use these features to manage your counseling practice effectively.'}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
