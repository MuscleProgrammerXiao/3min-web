'use client'

import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'
import { ANIMATION_DURATION } from '@/lib/constants/animations'

interface LoadingSpinnerProps {
  size?: 'sm' | 'md' | 'lg' | 'xl'
  className?: string
  color?: 'primary' | 'secondary' | 'accent'
}

export function LoadingSpinner({ 
  size = 'md', 
  className,
  color = 'primary'
}: LoadingSpinnerProps) {
  const sizeClasses = {
    sm: 'h-4 w-4 border-2',
    md: 'h-8 w-8 border-2',
    lg: 'h-12 w-12 border-3',
    xl: 'h-16 w-16 border-4'
  }

  const colorClasses = {
    primary: 'border-gray-200 border-t-blue-600',
    secondary: 'border-gray-200 border-t-gray-600',
    accent: 'border-gray-200 border-t-purple-600'
  }

  return (
    <motion.div
      className={cn(
        'inline-block rounded-full',
        sizeClasses[size],
        colorClasses[color],
        className
      )}
      animate={{ rotate: 360 }}
      transition={{
        duration: ANIMATION_DURATION.slow,
        repeat: Infinity,
        ease: 'linear'
      }}
    />
  )
}