'use client'

import { ReactNode, useEffect, useState } from 'react'
import { LoadingSpinner } from '@/components/common'

interface HydrationProviderProps {
  children: ReactNode
}

export function HydrationProvider({ children }: HydrationProviderProps) {
  const [isHydrated, setIsHydrated] = useState(false)

  useEffect(() => {
    setIsHydrated(true)
  }, [])

  if (!isHydrated) {
    // 使用新的通用LoadingSpinner组件
    return (
      <div className="min-h-screen flex items-center justify-center">
        <LoadingSpinner size="lg" />
      </div>
    )
  }

  return <>{children}</>
}