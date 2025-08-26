'use client'

import { useState, useEffect, useCallback } from 'react'
import { motion } from 'framer-motion'

interface TypewriterTextProps {
  text: string
  onComplete?: () => void
  speed?: number
  className?: string
  cursorClassName?: string
}

export const TypewriterText = ({ 
  text, 
  onComplete, 
  speed = 50,
  className = '',
  cursorClassName = 'ml-1 text-gray-400'
}: TypewriterTextProps) => {
  const [displayText, setDisplayText] = useState('')
  const [currentIndex, setCurrentIndex] = useState(0)
  
  const handleComplete = useCallback(() => {
    if (onComplete) onComplete()
  }, [onComplete])
  
  useEffect(() => {
    if (currentIndex < text.length) {
      const timer = setTimeout(() => {
        setDisplayText(prev => prev + text[currentIndex])
        setCurrentIndex(prev => prev + 1)
      }, speed)
      return () => clearTimeout(timer)
    } else {
      handleComplete()
    }
  }, [currentIndex, text, handleComplete, speed])
  
  return (
    <span className={`inline-block ${className}`}>
      {displayText}
      <motion.span
        animate={{ opacity: [1, 0] }}
        transition={{ duration: 0.8, repeat: Infinity, repeatType: "reverse" }}
        className={cursorClassName}
      >
        |
      </motion.span>
    </span>
  )
}