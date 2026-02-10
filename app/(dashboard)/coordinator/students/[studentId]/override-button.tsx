'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import OverrideModal from './override-modal';

interface OverrideButtonProps {
  studentId: string;
  currentScore: number;
  existingOverride?: {
    override_score: number;
    override_reason: string;
  } | null;
}

export default function OverrideButton({
  studentId,
  currentScore,
  existingOverride,
}: OverrideButtonProps) {
  const [showModal, setShowModal] = useState(false);
  const router = useRouter();

  return (
    <>
      <Button
        onClick={() => setShowModal(true)}
        variant="outline"
        size="sm"
      >
        {existingOverride ? 'Update Override' : 'Override Score'}
      </Button>

      {showModal && (
        <OverrideModal
          studentId={studentId}
          currentScore={currentScore}
          existingOverride={existingOverride || undefined}
          onClose={() => setShowModal(false)}
          onSuccess={() => {
            router.refresh();
          }}
        />
      )}
    </>
  );
}
