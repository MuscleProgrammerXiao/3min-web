'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { motion } from 'framer-motion'
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from '@/components/ui/navigation-menu'
import { cn } from '@/lib/utils'

interface NavItem {
  href: string
  label: string
  className?: string
}

interface ShadcnNavProps {
  items: NavItem[]
  className?: string
  orientation?: 'horizontal' | 'vertical'
}

export function ShadcnNav({ items, className, orientation = 'horizontal' }: ShadcnNavProps) {
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
      } as any
    }
  }

  if (orientation === 'vertical') {
    return (
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className={cn('flex flex-col space-y-1', className)}
      >
        {items.map((item) => {
          const isActive = pathname === item.href
          
          return (
            <motion.div key={item.href} variants={itemVariants}>
              <Link
                href={item.href}
                className={cn(
                  'flex items-center px-3 py-2 text-sm font-medium rounded-md transition-colors',
                  'hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500',
                  isActive ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                  item.className
                )}
              >
                {item.label}
              </Link>
            </motion.div>
          )
        })}
      </motion.div>
    )
  }

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className={className}
    >
      <NavigationMenu>
        <NavigationMenuList className="flex space-x-2">
          {items.map((item) => {
            const isActive = pathname === item.href
            
            return (
              <motion.div key={item.href} variants={itemVariants}>
                <NavigationMenuItem>
                  <NavigationMenuLink asChild>
                    <Link
                      href={item.href}
                      className={cn(
                        navigationMenuTriggerStyle(),
                        'flex items-center transition-colors',
                        isActive && 'bg-gray-100 text-gray-900',
                        item.className
                      )}
                    >
                      {item.label}
                    </Link>
                  </NavigationMenuLink>
                </NavigationMenuItem>
              </motion.div>
            )
          })}
        </NavigationMenuList>
      </NavigationMenu>
    </motion.div>
  )
}