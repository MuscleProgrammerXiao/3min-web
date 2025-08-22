'use client'

import Link from 'next/link'
import { useGlobalStore } from '@/lib/store'
import { Button } from '@/components/ui/button'
import { Menu, X, User, LogOut, Shield } from 'lucide-react'
import { useHydration } from '@/lib/useHydration'
import { ShadcnNav } from '@/components/layout/ShadcnNav'
import { motion, Transition } from 'framer-motion'
import { useMemo } from 'react'

type CustomTransition = Transition & {
  staggerChildren?: number;
  delayChildren?: number;
};
export default function Header() {
  const hydrated = useHydration()
  const { sidebarOpen, setSidebarOpen, isAuthenticated, user, logout, isAdmin } = useGlobalStore()

  // 动态生成导航项，包含管理后台
  const navItems = useMemo(() => {
    const baseItems = [
      { href: '/', label: '主页' },
      { href: '/portfolio', label: '作品' },
      { href: '/blog', label: '博客' },
      { href: '/contact', label: '联系我' },
    ]

    // 如果是管理员，添加管理后台链接
    if (hydrated && isAdmin()) {
      baseItems.push({
        href: '/admin',
        label: '管理后台',
        className: 'text-red-600 hover:text-red-700' 
      })
    }

    return baseItems
  }, [hydrated, isAdmin])

  const headerVariants = {
    hidden: { y: -100, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: 'spring',
        stiffness: 300,
        damping: 30,
        staggerChildren: 0.1,
        delayChildren: 0.1
      } satisfies CustomTransition
    }
  }

  const itemVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: 'spring',
        stiffness: 260,
        damping: 20
      } satisfies CustomTransition
    }
  }

  return (
    <motion.header
      variants={headerVariants}
      initial="hidden"
      animate="visible"
      className="bg-white shadow-sm border-b sticky top-0 z-50 backdrop-blur-sm bg-white/95"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <motion.div variants={itemVariants} className="flex items-center">
            <Link href="/" className="text-xl font-bold text-gray-900 hover:text-blue-600 transition-colors">
              3min°
            </Link>
          </motion.div>

          {/* Desktop Navigation */}
          <motion.div variants={itemVariants} className="hidden md:block">
            <ShadcnNav items={navItems} />
          </motion.div>

          {/* User Actions */}
          <motion.div
            variants={itemVariants}
            className="flex items-center space-x-4"
          >
            {hydrated ? (
              isAuthenticated ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="flex items-center space-x-2"
                >
                  <div className="flex items-center space-x-2">
                    {user?.role === 'admin' && (
                      <motion.span
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="px-2 py-1 bg-red-100 text-red-800 text-xs rounded-full flex items-center"
                      >
                        <Shield className="h-3 w-3 mr-1" />
                        管理员
                      </motion.span>
                    )}
                    <span className="text-sm text-gray-700">欢迎, {user?.name}</span>
                  </div>
                  <Button variant="outline" size="sm" onClick={logout} className="hover:scale-105 transition-transform">
                    <LogOut className="h-4 w-4 mr-2" />
                    退出
                  </Button>
                </motion.div>
              ) : (
                <Link href="/login">
                  <Button variant="outline" size="sm" className="hover:scale-105 transition-transform">
                    <User className="h-4 w-4 mr-2" />
                    登录
                  </Button>
                </Link>
              )
            ) : (
              <Link href="/login">
                <Button variant="outline" size="sm">
                  <User className="h-4 w-4 mr-2" />
                  登录
                </Button>
              </Link>
            )}
            
            {/* Mobile menu button */}
            <motion.div whileTap={{ scale: 0.95 }}>
              <Button
                variant="ghost"
                size="sm"
                className="md:hidden"
                onClick={() => setSidebarOpen(!sidebarOpen)}
              >
                <motion.div
                  animate={{ rotate: hydrated && sidebarOpen ? 180 : 0 }}
                  transition={{ duration: 0.2 }}
                >
                  {hydrated && sidebarOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
                </motion.div>
              </Button>
            </motion.div>
          </motion.div>
        </div>

        {/* Mobile Navigation */}
        {hydrated && (
          <motion.div
            initial={false}
            animate={{
              height: sidebarOpen ? 'auto' : 0,
              opacity: sidebarOpen ? 1 : 0
            }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            className="md:hidden overflow-hidden"
          >
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-white border-t">
              <ShadcnNav items={navItems} orientation="vertical" />
            </div>
          </motion.div>
        )}
      </div>
    </motion.header>
  )
}