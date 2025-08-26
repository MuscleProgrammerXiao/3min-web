'use client'

import { useEffect, useRef, useCallback } from 'react'
import { useScroll, useTransform, MotionValue } from 'framer-motion'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

// 注册GSAP插件
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger)
}

// 类型定义
interface ParallaxValues {
  y1: MotionValue<number>
  y2: MotionValue<number>
  opacity: MotionValue<number>
}

interface ScrollAnimationsReturn {
  containerRef: React.RefObject<HTMLDivElement>
  parallaxValues: ParallaxValues
  isReady: boolean
}

interface ScrollProgressReturn {
  scrollYProgress: MotionValue<number>
  scaleX: MotionValue<number>
}

/**
 * 滚动动画Hook - 提供多种滚动触发的动画效果
 */
export const useScrollAnimations = (): ScrollAnimationsReturn => {
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll()
  const isReady = useRef(false)
  
  // 视差效果
  const y1 = useTransform(scrollYProgress, [0, 1], [0, -50])
  const y2 = useTransform(scrollYProgress, [0, 1], [0, -100])
  const opacity = useTransform(scrollYProgress, [0, 0.5, 1], [1, 0.8, 0.6])
  
  // 清理函数
  const cleanup = useCallback(() => {
    if (typeof window !== 'undefined' && ScrollTrigger) {
      ScrollTrigger.getAll().forEach(trigger => {
        if (trigger.vars.trigger && trigger.vars.trigger instanceof Element && containerRef.current?.contains(trigger.vars.trigger)) {
          trigger.kill()
        }
      })
    }
  }, [])
  
  useEffect(() => {
    if (!containerRef.current || typeof window === 'undefined') return
    
    // 检查GSAP和ScrollTrigger是否可用
    if (!gsap || !ScrollTrigger) {
      console.warn('GSAP or ScrollTrigger not available')
      return
    }
    
    // 等待DOM完全加载
    const timer = setTimeout(() => {
      if (!containerRef.current) return
      
      const ctx = gsap.context(() => {
        try {
          // 项目卡片交错动画
          const projectCards = containerRef.current?.querySelectorAll('.project-card')
          if (projectCards && projectCards.length > 0) {
            gsap.fromTo('.project-card', 
              { 
                opacity: 0, 
                y: 60,
                scale: 0.9
              },
              { 
                opacity: 1, 
                y: 0,
                scale: 1,
                duration: 0.8,
                stagger: 0.15,
                ease: 'power2.out',
                scrollTrigger: {
                  trigger: '.projects-grid',
                  start: 'top 80%',
                  end: 'bottom 20%',
                  toggleActions: 'play none none reverse',
                  refreshPriority: -1
                }
              }
            )
          }
          
          // 分类按钮动画
          const categoryButtons = containerRef.current?.querySelectorAll('.category-button')
          if (categoryButtons && categoryButtons.length > 0) {
            gsap.fromTo('.category-button',
              { opacity: 0, x: -30 },
              {
                opacity: 1,
                x: 0,
                duration: 0.6,
                stagger: 0.1,
                ease: 'power2.out',
                scrollTrigger: {
                  trigger: '.category-filters',
                  start: 'top 85%',
                  toggleActions: 'play none none reverse',
                  refreshPriority: -1
                }
              }
            )
          }
          
          // 统计数字动画
          const statNumbers = containerRef.current?.querySelectorAll('.stat-number')
          if (statNumbers && statNumbers.length > 0) {
            gsap.fromTo('.stat-number',
              { textContent: 0 },
              {
                textContent: (i: number, target: Element) => {
                  const value = target.getAttribute('data-value')
                  return value ? parseInt(value, 10) : 0
                },
                duration: 2,
                ease: 'power2.out',
                snap: { textContent: 1 },
                scrollTrigger: {
                  trigger: '.stats-section',
                  start: 'top 80%',
                  toggleActions: 'play none none none',
                  refreshPriority: -1
                }
              }
            )
          }
          
          isReady.current = true
        } catch (error) {
          console.error('Error setting up scroll animations:', error)
        }
      }, containerRef)
      
      return () => {
        ctx.revert()
        cleanup()
      }
    }, 100)
    
    return () => {
      clearTimeout(timer)
      cleanup()
    }
  }, [])
  
  // 组件卸载时清理
  useEffect(() => {
    return () => {
      cleanup()
    }
  }, [])
  
  return {
    containerRef: containerRef as React.RefObject<HTMLDivElement>,
    parallaxValues: { y1, y2, opacity },
    isReady: isReady.current
  }
}

/**
 * 进度指示器Hook
 */
export const useScrollProgress = (): ScrollProgressReturn => {
  const { scrollYProgress } = useScroll()
  const scaleX = useTransform(scrollYProgress, [0, 1], [0, 1])
  
  return { scrollYProgress, scaleX }
}

/**
 * 简化版滚动动画Hook - 仅使用Framer Motion
 * 适用于不需要复杂GSAP动画的场景
 */
export const useSimpleScrollAnimations = () => {
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: containerRef })
  
  // 视差效果
  const y1 = useTransform(scrollYProgress, [0, 1], [0, -50])
  const y2 = useTransform(scrollYProgress, [0, 1], [0, -100])
  const opacity = useTransform(scrollYProgress, [0, 0.5, 1], [1, 0.8, 0.6])
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [1, 1.05, 1])
  
  return {
    containerRef,
    parallaxValues: { y1, y2, opacity, scale }
  }
}