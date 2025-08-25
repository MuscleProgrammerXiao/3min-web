'use client'
import { motion } from 'framer-motion'
import { FloatingDecorationProps } from './types'

const FloatingDecoration = ({ className, duration = 3 }: FloatingDecorationProps) => {
  return (
    <motion.div
      className={`absolute w-4 h-4 rounded-full ${className}`}
      animate={{ 
        y: [-5, 5, -5],
        x: [-2, 2, -2]
      }}
      transition={{ 
        duration, 
        repeat: Infinity,
        ease: "easeInOut"
      }}
    />
  )
}

export default FloatingDecoration