'use client'

import { ReactNode } from 'react'
import { useLenis } from '@/lib/useLenis'

interface LenisProviderProps {
  children: ReactNode
}

export function LenisProvider({ children }: LenisProviderProps) {
  useLenis()
  
  return <>{children}</>
}