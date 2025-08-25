'use client'

import { useEffect } from 'react'
import HeroSection from '@/components/sections/HeroSection'
import AboutSection from '@/components/sections/AboutSection'
import ChatBotSection from '@/components/sections/ChatBotSection'
import ExperienceSection from '@/components/sections/ExperienceSection'
import { useScrollToTop } from '@/lib/scrollToTop'

export default function Home() {
  const scrollToTopOnMount = useScrollToTop()
  
  useEffect(() => {
    scrollToTopOnMount()
  }, [])

  return (
    <main>
      <HeroSection />
      <AboutSection />
      <ChatBotSection />
      <ExperienceSection />
    </main>
  )
}
