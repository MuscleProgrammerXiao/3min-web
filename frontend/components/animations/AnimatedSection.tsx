'use client'

import { ReactNode, forwardRef } from 'react'
import { cn } from '@/lib/utils'

interface AnimatedSectionProps {
  children: ReactNode
  className?: string
  animation?: 'fade-in' | 'slide-in-left' | 'slide-in-right' | 'scale-in'
}

export const AnimatedSection = forwardRef<HTMLDivElement, AnimatedSectionProps>(
  ({ children, className, animation = 'fade-in' }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(animation, className)}
      >
        {children}
      </div>
    )
  }
)

AnimatedSection.displayName = 'AnimatedSection'