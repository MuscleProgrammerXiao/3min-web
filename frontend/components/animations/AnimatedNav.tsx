'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'

interface NavItem {
  href: string
  label: string
  icon?: React.ReactNode
}

interface AnimatedNavProps {
  items: NavItem[]
  className?: string
  orientation?: 'horizontal' | 'vertical'
}

export function AnimatedNav({ items, className, orientation = 'horizontal' }: AnimatedNavProps) {
  const pathname = usePathname()

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  }

  const itemVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: 'spring',
        stiffness: 300,
        damping: 24
      }as const
    }
  }

  return (
    <motion.nav
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className={cn(
        orientation === 'horizontal' ? 'flex space-x-8' : 'flex flex-col space-y-1',
        className
      )}
    >
      {items.map((item) => {
        const isActive = pathname === item.href
        
        return (
          <motion.div
            key={item.href}
            variants={itemVariants}
            className="relative"
          >
            <Link
              href={item.href}
              className={cn(
                'relative px-3 py-2 text-sm font-medium transition-colors duration-200',
                'hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 rounded-md',
                isActive ? 'text-gray-900' : 'text-gray-700',
                orientation === 'vertical' && 'block w-full text-left'
              )}
            >
              <span className="flex items-center">
                {item.icon && <span className="mr-2">{item.icon}</span>}
                {item.label}
              </span>
              
              {/* 活跃状态指示器 */}
              {isActive && (
                <motion.div
                  layoutId="activeTab"
                  className={cn(
                    'absolute bg-blue-500',
                    orientation === 'horizontal'
                      ? 'bottom-0 left-0 right-0 h-0.5'
                      : 'left-0 top-0 bottom-0 w-0.5'
                  )}
                  initial={false}
                  transition={{
                    type: 'spring',
                    stiffness: 500,
                    damping: 30
                  }}
                />
              )}
            </Link>
          </motion.div>
        )
      })}
    </motion.nav>
  )
}