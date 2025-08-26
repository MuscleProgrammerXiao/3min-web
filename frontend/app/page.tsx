'use client'

import HeroSection from '@/components/sections/HeroSection'
import AboutSection from '@/components/sections/AboutSection'
import ChatBotSection from '@/components/sections/ChatBotSection'
import ExperienceSection from '@/components/sections/ExperienceSection'
import { useScrollToTop } from '@/lib/hooks'

export default function Home() {
  // 直接调用 hook，不需要返回值
  useScrollToTop()
  
  return (
    <main>
      <HeroSection />
      <AboutSection />
      <ChatBotSection />
      <ExperienceSection />
    </main>
  )
}
