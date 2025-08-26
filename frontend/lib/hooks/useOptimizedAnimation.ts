'use client'

import { useState, useEffect, useMemo } from 'react'
import { ANIMATION_DURATION, ANIMATION_EASING } from '@/lib/constants/animations'

export const useOptimizedAnimation = () => {
  const [isMobile, setIsMobile] = useState(false)
  
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768)
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])
  
  return useMemo(() => ({
    duration: isMobile ? ANIMATION_DURATION.fast : ANIMATION_DURATION.medium,
    ease: ANIMATION_EASING.easeOut
  }), [isMobile])
}