'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { usePathname } from 'next/navigation'
import { ReactNode } from 'react'

interface PageTransitionProps {
  children: ReactNode
}

const pageVariants = {
  // initial: {
  //   opacity: 0,
  //   // filter: 'blur(10px)',
  //   y: 20
  // },
  // in: {
  //   opacity: 1,
  //   // filter: 'blur(0px)',
  //   y: 0
  // },
  // out: {
  //   opacity: 0,
  //   // filter: 'blur(10px)',
  //   y: -20
  // }

  // initial: { opacity: 0, x: 100, scale: 0.9 },
  // in: { opacity: 1, x: 0, scale: 1 },
  // out: { opacity: 0, x: -100, scale: 0.9 }

  initial: { opacity: 0, y: 50 },
  in: { opacity: 1, y: 0 },
  out: { opacity: 0, y: -50 }
}

const pageTransition = {
  // type: 'tween',
  // ease: 'easeOut',
  // duration: 0.4

  // type: 'spring',
  // stiffness: 260,
  // damping: 20,
  // mass: 1

  type: 'spring',
  stiffness: 300,
  damping: 30
}

export function PageTransition({ children }: PageTransitionProps) {
  const pathname = usePathname()

  return (
    <AnimatePresence mode="wait" initial={false}>
      <motion.div
        key={pathname}
        initial="initial"
        animate="in"
        exit="out"
        variants={pageVariants}
        transition={pageTransition}
        className="w-full"
      >
        {children}
      </motion.div>
    </AnimatePresence>
  )
}