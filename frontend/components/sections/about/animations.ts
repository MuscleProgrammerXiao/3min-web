export const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      duration: 0.6,
      staggerChildren: 0.2
    }
  }
}

export const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: 'easeOut'as const
    }
  }
}

export const skillCardVariants = {
  hidden: { 
    opacity: 0, 
    scale: 0.8, 
    y: 40,
    rotateX: -15
  },
  visible: (index: number) => ({
    opacity: 1,
    scale: 1,
    y: 0,
    rotateX: 0,
    transition: {
      duration: 0.6,
      delay: index * 0.1,
      ease: [0.25, 0.46, 0.45, 0.94]
    }
  })
}

export const progressVariants = {
  hidden: { width: 0, opacity: 0 },
  visible: (level: number) => ({
    width: `${level}%`,
    opacity: 1,
    transition: {
      duration: 1.2,
      ease: "easeOut",
      delay: 0.3
    }
  })
}

export const interestVariants = {
  hidden: { opacity: 0, scale: 0.9, rotateY: -15 },
  visible: (index: number) => ({
    opacity: 1,
    scale: 1,
    rotateY: 0,
    transition: {
      duration: 0.6,
      delay: index * 0.15,
      ease: 'easeOut'
    }
  })
}