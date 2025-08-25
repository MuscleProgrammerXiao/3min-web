'use client'

/**
 * 滚动到页面顶部的工具函数
 * 兼容Lenis平滑滚动和原生滚动
 */
export const scrollToTop = (immediate: boolean = true) => {
  // 方法1: 原生滚动
  const behavior = immediate ? 'instant' : 'smooth'
  window.scrollTo({ top: 0, left: 0, behavior: behavior as ScrollBehavior })
  document.documentElement.scrollTop = 0
  document.body.scrollTop = 0
  
  // 方法2: 如果存在Lenis实例，使用Lenis的scrollTo
  const lenisInstance = (window as any).lenis
  if (lenisInstance && typeof lenisInstance.scrollTo === 'function') {
    lenisInstance.scrollTo(0, { immediate })
  }
}

/**
 * React Hook: 页面加载时滚动到顶部
 */
export const useScrollToTop = () => {
  const scrollToTopOnMount = () => {
    // 立即滚动
    scrollToTop(true)
    
    // 延迟滚动，确保所有组件都已加载
    setTimeout(() => scrollToTop(true), 100)
    setTimeout(() => scrollToTop(true), 300)
  }
  
  return scrollToTopOnMount
}