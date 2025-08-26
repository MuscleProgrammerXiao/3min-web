'use client'

import { motion } from 'framer-motion'
import { useScrollProgress } from '@/lib/hooks/useScrollAnimations'

export function ScrollProgress() {
  const { scaleX } = useScrollProgress()
  
  return (
    <motion.div
      className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 to-purple-600 origin-left z-50"
      style={{ scaleX }}
    />
  )
}