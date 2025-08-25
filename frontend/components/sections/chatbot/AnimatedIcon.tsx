'use client'
import { motion } from 'framer-motion'
import { AnimatedIconProps } from './types'

const AnimatedIcon = ({ icon: Icon, className, delay = 0 }: AnimatedIconProps) => {
  return (
    <motion.div
      animate={{ 
        rotate: [0, 360],
        scale: [1, 1.2, 1]
      }}
      transition={{ 
        duration: 2, 
        repeat: Infinity,
        delay
      }}
    >
      <Icon className={className} />
    </motion.div>
  )
}

export default AnimatedIcon