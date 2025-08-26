'use client'

import { useEffect, useState } from 'react'
import { usePathname } from 'next/navigation'

/**
 * React Hook: 页面切换过渡动画
 * 监听路由变化并提供加载状态
 */
export function usePageTransition() {
  const [isLoading, setIsLoading] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    setIsLoading(true)
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 300)

    return () => clearTimeout(timer)
  }, [pathname])

  return { isLoading }
}