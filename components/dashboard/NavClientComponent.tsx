'use client';

import { QuickStartModal } from './QuickStartModal';

interface NavClientComponentProps {
  role: string;
  isAdmin?: boolean;
}

export function NavClientComponent({ role, isAdmin }: NavClientComponentProps) {
  return <QuickStartModal role={role as 'student' | 'counselor'} isAdmin={isAdmin} />;
}
