/**
 * 通用动画变体配置
 * 整合了各组件中重复的动画配置
 */

// 容器动画变体
export const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      duration: 0.6,
      staggerChildren: 0.2,
      delayChildren: 0.1
    }
  }
}

// 项目动画变体
export const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: 'easeOut'
    }
  }
}

// 卡片动画变体
export const cardVariants = {
  hidden: { 
    opacity: 0, 
    scale: 0.8, 
    y: 40
  },
  visible: (index: number = 0) => ({
    opacity: 1,
    scale: 1,
    y: 0,
    transition: {
      duration: 0.6,
      delay: index * 0.1,
      ease: [0.25, 0.46, 0.45, 0.94]
    }
  })
}

// 导航动画变体
export const navVariants = {
  container: {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  },
  item: {
    hidden: { opacity: 0, y: -20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: 'spring',
        stiffness: 300,
        damping: 24
      }
    }
  }
}

// 页面过渡动画变体
export const pageTransitionVariants = {
  initial: { opacity: 0, y: 50 },
  in: { opacity: 1, y: 0 },
  out: { opacity: 0, y: -50 }
}

// 悬停动画配置
export const hoverAnimations = {
  scale: {
    whileHover: { scale: 1.05 },
    whileTap: { scale: 0.95 },
    transition: { duration: 0.2 }
  },
  lift: {
    whileHover: { y: -4, scale: 1.02 },
    transition: { duration: 0.2 }
  },
  glow: {
    whileHover: { 
      boxShadow: '0 10px 30px rgba(0,0,0,0.2)' 
    },
    transition: { duration: 0.3 }
  }
}