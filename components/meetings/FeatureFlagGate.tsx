'use client';

import { ReactNode } from 'react';

interface FeatureFlagGateProps {
  children: ReactNode;
  fallback?: ReactNode;
}

export function FeatureFlagGate({ children, fallback = null }: FeatureFlagGateProps) {
  const isEnabled = process.env.NEXT_PUBLIC_ENABLE_MEETINGS === 'true';

  if (!isEnabled) {
    return <>{fallback}</>;
  }

  return <>{children}</>;
}
