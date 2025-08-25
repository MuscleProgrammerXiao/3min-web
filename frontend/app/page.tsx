'use client'

import { useEffect } from 'react'
import HeroSection from '@/components/sections/HeroSection'
import AboutSection from '@/components/sections/AboutSection'
import ChatBotSection from '@/components/sections/ChatBotSection'
import ExperienceSection from '@/components/sections/ExperienceSection'

export default function Home() {
  useEffect(() => {
    // 页面加载时滚动到顶部
    window.scrollTo(0, 0)
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
