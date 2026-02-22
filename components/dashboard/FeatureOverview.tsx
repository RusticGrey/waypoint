'use client';

import { useState, useEffect } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';

interface FeatureOverviewProps {
  role: 'student' | 'coordinator' | 'counselor';
}

export function FeatureOverview({ role }: FeatureOverviewProps) {
  const [isOpen, setIsOpen] = useState(true);

  // Check local storage on mount
  useEffect(() => {
    const closed = localStorage.getItem(`feature-overview-closed-${role}`);
    if (closed === 'true') {
      setIsOpen(false);
    }
  }, [role]);

  const toggleOpen = () => {
    const newState = !isOpen;
    setIsOpen(newState);
    localStorage.setItem(`feature-overview-closed-${role}`, String(!newState));
  };

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
    coordinator: [
      {
        icon: '👥',
        title: 'Manage Students',
        description: 'View assigned students and monitor their progress.'
      },
      ...(process.env.NEXT_PUBLIC_ENABLE_MEETINGS === 'true' ? [{
        icon: '📅',
        title: 'Log Meetings',
        description: 'Record meeting notes, action items, and student mood.'
      }] : []),
      {
        icon: '⚙️',
        title: 'Profile Override',
        description: 'Adjust profile strength scores based on your assessment.'
      },
      {
        icon: '⏱️',
        title: 'Track Deadlines',
        description: 'Monitor upcoming application deadlines for all students.'
      }
    ],
    counselor: [
      {
        icon: '👥',
        title: 'User Management',
        description: 'Create and manage student and coordinator accounts.'
      },
      {
        icon: '🔗',
        title: 'Assignments',
        description: 'Assign students to coordinators for personalized guidance.'
      },
      {
        icon: '🏛️',
        title: 'College Database',
        description: 'Manage the central database of colleges and statistics.'
      },
      {
        icon: '📖',
        title: 'Course Management',
        description: 'Update available subjects and curriculums.'
      }
    ]
  };

  const currentFeatures = features[role];

  return (
    <Card className={`mb-8 border-l-4 border-l-blue-500 bg-blue-50/50 transition-all duration-300 ${isOpen ? '' : 'h-20 overflow-hidden'}`}>
      <CardHeader>
        <div className="flex flex-row items-center justify-between cursor-pointer" onClick={toggleOpen}>
          <CardTitle className="text-lg font-semibold text-blue-900 flex items-center gap-2">
            Quick Start Guide
            {!isOpen && <span className="text-sm font-normal text-blue-600">(Click to expand)</span>}
          </CardTitle>
          <button 
            onClick={(e) => { e.stopPropagation(); toggleOpen(); }}
            className="text-blue-500 hover:text-blue-700 transition-colors p-1 rounded-full hover:bg-blue-100"
            aria-label={isOpen ? "Collapse" : "Expand"}
          >
            {isOpen ? '▲' : '▼'}
          </button>
        </div>
      </CardHeader>
      
      {isOpen && (
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 animate-in fade-in slide-in-from-top-2 duration-300">
            {currentFeatures.map((feature, index) => (
              <div key={index} className="flex flex-col space-y-2 p-3 bg-white rounded-lg shadow-sm border border-blue-100">
                <div className="flex items-center space-x-2">
                  <span className="text-xl" role="img" aria-label={feature.title}>{feature.icon}</span>
                  <h3 className="font-medium text-gray-900">{feature.title}</h3>
                </div>
                <p className="text-xs text-gray-600 leading-relaxed">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </CardContent>
      )}
    </Card>
  );
}
