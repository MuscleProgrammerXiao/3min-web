'use client'

import { useEffect } from 'react'
import Lenis from '@studio-freight/lenis'

export function useLenis() {
  useEffect(() => {
    // 初始化 Lenis
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      direction: 'vertical',
      smooth: true,
      mouseMultiplier: 1,
      smoothTouch: false,
      touchMultiplier: 2,
      infinite: false,
    })

    // 将lenis实例挂载到window对象上，方便其他地方调用
    ;(window as any).lenis = lenis

    // 页面加载时立即滚动到顶部
    lenis.scrollTo(0, { immediate: true })

    // 动画循环
    function raf(time: number) {
      lenis.raf(time)
      requestAnimationFrame(raf)
    }

    requestAnimationFrame(raf)

    // 清理函数
    return () => {
      ;(window as any).lenis = null
      lenis.destroy()
    }
  }, [])
}