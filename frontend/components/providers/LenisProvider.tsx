'use client'

import { ReactNode } from 'react'
import { useLenis } from '@/lib/hooks'

interface LenisProviderProps {
  children: ReactNode
}

export function LenisProvider({ children }: LenisProviderProps) {
  useLenis()
  
  return <>{children}</>
}