'use client'

/**
 * 统一的滚动工具函数
 * 整合了 scrollToTop.ts 和 smoothScroll.ts 的功能
 */

// 滚动配置接口
interface ScrollOptions {
  behavior?: 'smooth' | 'instant'
  offset?: number
  immediate?: boolean
}

/**
 * 滚动到页面顶部
 * 兼容Lenis平滑滚动和原生滚动
 */
export const scrollToTop = (options: ScrollOptions = {}) => {
  const { behavior = 'smooth', immediate = false } = options
  
  // 原生滚动
  const scrollBehavior = immediate ? 'instant' : behavior
  window.scrollTo({ top: 0, left: 0, behavior: scrollBehavior as ScrollBehavior })
  document.documentElement.scrollTop = 0
  document.body.scrollTop = 0
  
  // Lenis滚动支持
  const lenisInstance = (window as { lenis?: { scrollTo: (target: number, options?: { immediate?: boolean }) => void } }).lenis
  if (lenisInstance && typeof lenisInstance.scrollTo === 'function') {
    lenisInstance.scrollTo(0, { immediate })
  }
}

/**
 * 滚动到指定元素
 */
export const scrollToElement = (selector: string, options: ScrollOptions = {}) => {
  const { behavior = 'smooth', offset = 0 } = options
  const element = document.querySelector(selector)
  
  if (element) {
    const elementPosition = element.getBoundingClientRect().top + window.pageYOffset
    const offsetPosition = elementPosition - offset
    
    window.scrollTo({
      top: offsetPosition,
      behavior: behavior as ScrollBehavior
    })
  }
}

/**
 * 滚动到页面底部
 */
export const scrollToBottom = (options: ScrollOptions = {}) => {
  const { behavior = 'smooth' } = options
  
  window.scrollTo({
    top: document.body.scrollHeight,
    behavior: behavior as ScrollBehavior
  })
}

/**
 * 计算滚动偏移量（考虑固定头部）
 */
export const calculateScrollOffset = (headerHeight: number = 64, extraPadding: number = 20) => {
  return headerHeight + extraPadding
}