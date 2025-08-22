'use client'

import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { useGSAP } from '@/lib/useGSAP'
import { AnimatedSection } from '@/components/animations/AnimatedSection'
import { AIChatSection } from '@/components/chat/AIChatSection'

export default function HomePage() {
  const containerRef = useGSAP()

  return (
    <div ref={containerRef} className="min-h-screen">
      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100">
        <div className="text-center space-y-6 px-4">
          <AnimatedSection animation="fade-in">
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900">
              欢迎来到我的个人网站
            </h1>
          </AnimatedSection>
          <AnimatedSection animation="fade-in">
            <p className="text-xl md:text-2xl text-gray-600 max-w-2xl mx-auto">
              这里是我展示作品、分享想法和与世界连接的地方
            </p>
          </AnimatedSection>
          <AnimatedSection animation="scale-in">
            <div className="flex gap-4 justify-center">
              <Button asChild size="lg">
                <Link href="/portfolio">查看作品</Link>
              </Button>
              <Button asChild variant="outline" size="lg">
                <Link href="/contact">联系我</Link>
              </Button>
            </div>
          </AnimatedSection>
        </div>
      </section>
      <AIChatSection />
    </div>
  )
}
