import React from 'react';
import { cn } from '@/lib/utils';
import { ux } from '@/lib/ux';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  variant?: 'base' | 'pop';
}

export function Card({ children, className = '', variant = 'base' }: CardProps) {
  return (
    <div className={cn(ux.card[variant], 'p-6', className)}>
      {children}
    </div>
  );
}

interface CardHeaderProps {
  children: React.ReactNode;
  className?: string;
}

export function CardHeader({ children, className = '' }: CardHeaderProps) {
  return (
    <div className={cn('mb-4', className)}>
      {children}
    </div>
  );
}

interface CardTitleProps {
  children: React.ReactNode;
  className?: string;
}

export function CardTitle({ children, className = '' }: CardTitleProps) {
  return (
    <h3 className={cn(ux.text.subheading, 'text-lg', className)}>
      {children}
    </h3>
  );
}

interface CardContentProps {
  children: React.ReactNode;
  className?: string;
}

export function CardContent({ children, className = '' }: CardContentProps) {
  return (
    <div className={className}>
      {children}
    </div>
  );
}
