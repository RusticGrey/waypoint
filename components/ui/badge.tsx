import * as React from "react"
import { cn } from "@/lib/utils"
import { ux } from "@/lib/ux"

export interface BadgeProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'success' | 'warning' | 'error' | 'neutral' | 'brand';
}

function Badge({ className, variant = 'neutral', ...props }: BadgeProps) {
  return (
    <div 
      className={cn(
        "inline-flex items-center",
        ux.badge[variant], 
        className
      )} 
      {...props} 
    />
  )
}

export { Badge }
