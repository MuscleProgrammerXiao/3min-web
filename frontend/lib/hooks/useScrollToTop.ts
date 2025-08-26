'use client'

import { useEffect } from 'react'
import { scrollToTop } from '../utils/scroll'

/**
 * React Hook: 页面加载时滚动到顶部
 */
export const useScrollToTop = (immediate: boolean = true) => {
  useEffect(() => {
    // 立即滚动
    scrollToTop({ immediate })
    
    // 延迟滚动，确保所有组件都已加载
    const timer = setTimeout(() => {
      scrollToTop({ immediate })
    }, 100)
    
    return () => clearTimeout(timer)
  }, [])
}