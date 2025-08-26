'use client'

import { motion, useInView } from 'framer-motion'
import { useRef, ReactNode } from 'react'
import { containerVariants } from '@/lib/animations/variants'
import { cn } from '@/lib/utils'

interface AnimatedSectionProps {
  children: ReactNode
  className?: string
  id?: string
  variants?: any
  once?: boolean
  margin?: string
}

export function AnimatedSection({ 
  children, 
  className, 
  id,
  variants = containerVariants,
  once = true,
  margin = '-100px'
}: AnimatedSectionProps) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once, margin })

  return (
    <motion.section
      id={id}
      ref={ref}
      variants={variants}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      className={cn(className)}
    >
      {children}
    </motion.section>
  )
}