'use client'

import { motion } from 'framer-motion'
import { forwardRef, HTMLAttributes } from 'react'
import { cn } from '@/lib/utils'
import { cardVariants } from '@/lib/animations/variants'

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'outlined' | 'elevated' | 'filled'
  padding?: 'none' | 'sm' | 'md' | 'lg'
  animated?: boolean
}

const Card = forwardRef<HTMLDivElement, CardProps>((
  {
    className,
    variant = 'default',
    padding = 'md',
    animated = true,
    children,
    ...props
  },
  ref
) => {
  const baseClasses = 'rounded-lg transition-colors'
  
  const variantClasses = {
    default: 'bg-white border border-gray-200 shadow-sm',
    outlined: 'bg-transparent border border-gray-300',
    elevated: 'bg-white shadow-lg border border-gray-100',
    filled: 'bg-gray-50 border border-gray-200'
  }
  
  const paddingClasses = {
    none: '',
    sm: 'p-3',
    md: 'p-4',
    lg: 'p-6'
  }

  const Component = animated ? motion.div : 'div'
  const animationProps = animated ? {
    variants: cardVariants,
    initial: 'hidden',
    whileInView: 'visible',
    viewport: { once: true, margin: '-50px' },
    whileHover: { y: -2, transition: { duration: 0.2 } }
  } : {}

  return (
    <Component
      ref={ref}
      className={cn(
        baseClasses,
        variantClasses[variant],
        paddingClasses[padding],
        className
      )}
      {...animationProps}
      {...props}
    >
      {children}
    </Component>
  )
})

Card.displayName = 'Card'

// Card 子组件
const CardHeader = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>((
  { className, ...props },
  ref
) => (
  <div
    ref={ref}
    className={cn('flex flex-col space-y-1.5 pb-4', className)}
    {...props}
  />
))
CardHeader.displayName = 'CardHeader'

const CardTitle = forwardRef<HTMLParagraphElement, HTMLAttributes<HTMLHeadingElement>>((
  { className, ...props },
  ref
) => (
  <h3
    ref={ref}
    className={cn('text-lg font-semibold leading-none tracking-tight', className)}
    {...props}
  />
))
CardTitle.displayName = 'CardTitle'

const CardDescription = forwardRef<HTMLParagraphElement, HTMLAttributes<HTMLParagraphElement>>((
  { className, ...props },
  ref
) => (
  <p
    ref={ref}
    className={cn('text-sm text-gray-600', className)}
    {...props}
  />
))
CardDescription.displayName = 'CardDescription'

const CardContent = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>((
  { className, ...props },
  ref
) => (
  <div ref={ref} className={cn('pt-0', className)} {...props} />
))
CardContent.displayName = 'CardContent'

const CardFooter = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>((
  { className, ...props },
  ref
) => (
  <div
    ref={ref}
    className={cn('flex items-center pt-4', className)}
    {...props}
  />
))
CardFooter.displayName = 'CardFooter'

export {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter
}