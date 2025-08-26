'use client'

import { useEffect, useState } from 'react'

/**
 * React Hook: 判断组件是否已完成水合作用
 * 用于避免服务端渲染和客户端渲染不一致的问题
 */
export function useHydration() {
  const [hydrated, setHydrated] = useState(false)

  useEffect(() => {
    setHydrated(true)
  }, [])

  return hydrated
}