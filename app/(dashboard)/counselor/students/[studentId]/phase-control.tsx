'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Select } from '@/components/ui/select';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';

export function PhaseControl({ studentId, currentPhase }: { studentId: string; currentPhase: string }) {
  const [phase, setPhase] = useState(currentPhase);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handlePhaseChange = async (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newPhase = e.target.value;
    setPhase(newPhase); // Optimistic update
    
    if (confirm(`Are you sure you want to move this student to the ${newPhase.replace('_', ' ')} phase?`)) {
        setIsLoading(true);
        try {
        const response = await fetch(`/api/counselor/students/${studentId}/phase`, {
            method: 'PATCH',
            headers: {
            'Content-Type': 'application/json',
            },
            body: JSON.stringify({ phase: newPhase }),
        });

        if (!response.ok) {
            throw new Error('Failed to update phase');
        }

        router.refresh();
        } catch (error) {
        alert('Failed to update student phase.');
        setPhase(currentPhase); // Revert on error
        } finally {
        setIsLoading(false);
        }
    } else {
        setPhase(currentPhase); // Revert on cancel
    }
  };

  return (
    <Card className="mb-6 border-blue-200 bg-blue-50">
      <CardHeader className="pb-3">
        <CardTitle className="text-blue-800 text-lg">Student Phase Management</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex items-center gap-4">
          <p className="text-sm text-blue-700 flex-1">
            Control the student's current progress phase to unlock relevant features.
          </p>
          <div className="w-64">
            <Select 
              value={phase} 
              onChange={handlePhaseChange} 
              disabled={isLoading}
              className="bg-white border-blue-300"
            >
              <option value="Onboarding" disabled={currentPhase !== 'Onboarding'}>Onboarding</option>
              <option value="Profile_Building">Profile Building</option>
              <option value="College_Applications">College Applications</option>
            </Select>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
