'use client'
import { motion } from 'framer-motion'
import { BubbleDecorationProps } from './types'

const BubbleDecoration = ({ className, duration = 4 }: BubbleDecorationProps) => {
  return (
    <motion.div
      className={`absolute w-6 h-6 rounded-full ${className}`}
      animate={{ 
        rotate: [0, 360],
        scale: [1, 1.2, 1]
      }}
      transition={{ 
        duration, 
        repeat: Infinity,
        ease: "easeInOut"
      }}
    />
  )
}

export default BubbleDecoration