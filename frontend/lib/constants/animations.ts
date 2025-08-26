/**
 * 动画相关常量
 */

export const ANIMATION_DURATION = {
  fast: 0.2,
  normal: 0.3,
  medium: 0.6,  // 添加 medium 属性
  slow: 1.2,    // 修改 slow 为更长的时间，适合 Lenis
  page: 0.4
} as const

// Motion 库使用的缓动函数（数组格式）
export const ANIMATION_EASING = {
  default: [0.4, 0, 0.2, 1],
  easeOut: [0.25, 0.46, 0.45, 0.94],
  bounce: [0.68, -0.55, 0.265, 1.55],
  smooth: [0.25, 0.46, 0.45, 0.94]
} as const

// GSAP 库使用的缓动函数（字符串格式）
export const GSAP_EASING = {
  default: 'cubic-bezier(0.4, 0, 0.2, 1)',
  easeOut: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)',
  bounce: 'cubic-bezier(0.68, -0.55, 0.265, 1.55)',
  smooth: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)'
} as const

export const STAGGER_DELAY = {
  fast: 0.05,
  normal: 0.1,
  medium: 0.15,  // 添加 medium 属性
  slow: 0.2
} as const