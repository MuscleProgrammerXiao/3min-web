'use client'

import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { ANIMATION_DURATION, GSAP_EASING, STAGGER_DELAY } from '../constants/animations'

// 注册 ScrollTrigger 插件
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger)
}

/**
 * React Hook: GSAP 动画管理
 * 提供常用的滚动触发动画效果
 */
export function useGSAP() {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!ref.current) return

    const ctx = gsap.context(() => {
      // 淡入动画
      gsap.fromTo('.fade-in', 
        { opacity: 0, y: 50 },
        { 
          opacity: 1, 
          y: 0, 
          duration: ANIMATION_DURATION.medium,
          stagger: STAGGER_DELAY.medium,
          ease: GSAP_EASING.easeOut,
          scrollTrigger: {
            trigger: '.fade-in',
            start: 'top 80%',
            end: 'bottom 20%',
            toggleActions: 'play none none reverse'
          }
        }
      )

      // 滑入动画
      gsap.fromTo('.slide-in-left',
        { opacity: 0, x: -100 },
        {
          opacity: 1,
          x: 0,
          duration: ANIMATION_DURATION.medium,
          ease: GSAP_EASING.easeOut,
          scrollTrigger: {
            trigger: '.slide-in-left',
            start: 'top 80%',
            toggleActions: 'play none none reverse'
          }
        }
      )

      gsap.fromTo('.slide-in-right',
        { opacity: 0, x: 100 },
        {
          opacity: 1,
          x: 0,
          duration: ANIMATION_DURATION.medium,
          ease: GSAP_EASING.easeOut,
          scrollTrigger: {
            trigger: '.slide-in-right',
            start: 'top 80%',
            toggleActions: 'play none none reverse'
          }
        }
      )

      // 缩放动画
      gsap.fromTo('.scale-in',
        { opacity: 0, scale: 0.8 },
        {
          opacity: 1,
          scale: 1,
          duration: ANIMATION_DURATION.medium,
          ease: GSAP_EASING.easeOut,
          scrollTrigger: {
            trigger: '.scale-in',
            start: 'top 80%',
            toggleActions: 'play none none reverse'
          }
        }
      )
    }, ref)

    return () => ctx.revert()
  }, [])

  return ref
}