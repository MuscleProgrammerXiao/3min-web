import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import Header from "@/components/layout/Header"
import Footer from "@/components/layout/Footer"
import { LenisProvider } from "@/components/providers/LenisProvider"
import { HydrationProvider } from "@/components/providers/HydrationProvider"
import { PageTransition } from "@/components/animations/PageTransition"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "个人网站",
  description: "一个简洁的个人网站，展示个人信息、项目经历和技术技能。",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="zh" className="trancy-zh-CN tc-new-price">
      <body className={inter.className}>
        <HydrationProvider>
          <LenisProvider>
            <Header />
            <PageTransition>
              <main className="min-h-screen">
                {children}
              </main>
            </PageTransition>
            <Footer />
          </LenisProvider>
        </HydrationProvider>
      </body>
    </html>
  )
}
