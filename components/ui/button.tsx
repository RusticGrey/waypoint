import React from 'react';
import { cn } from '@/lib/utils';
import { ux } from '@/lib/ux';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  children: React.ReactNode;
}

export function Button({ 
  variant = 'primary', 
  children, 
  className = '',
  ...props 
}: ButtonProps) {
  return (
    <button 
      className={cn(ux.button[variant], className)}
      {...props}
    >
      {children}
    </button>
  );
}
