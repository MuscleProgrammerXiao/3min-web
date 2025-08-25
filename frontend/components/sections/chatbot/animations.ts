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
      ease: 'easeOut'
    }
  }
}

export const bubbleVariants = {
  hidden: { 
    opacity: 0, 
    scale: 0.3, 
    y: 50,
    rotateX: -90
  },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    rotateX: 0,
    transition: {
      type: "spring",
      damping: 20,
      stiffness: 300,
      duration: 0.8
    }
  },
  exit: {
    opacity: 0,
    scale: 0.8,
    y: -30,
    transition: {
      duration: 0.3
    }
  }
}

export const typingIndicatorVariants = {
  animate: {
    opacity: [0, 1, 0],
    scale: [1, 1.2, 1]
  },
  transition: {
    duration: 0.8,
    repeat: Infinity,
    ease: "easeInOut"
  }
}

export const avatarVariants = {
  welcome: {
    boxShadow: [
      '0 0 0 0 rgba(59, 130, 246, 0.4)',
      '0 0 0 15px rgba(59, 130, 246, 0)',
      '0 0 0 0 rgba(59, 130, 246, 0)'
    ],
    rotate: [0, 5, -5, 0]
  },
  typing: {
    scale: [1, 1.1, 1],
    boxShadow: [
      '0 0 0 0 rgba(34, 197, 94, 0.4)',
      '0 0 0 15px rgba(34, 197, 94, 0)',
      '0 0 0 0 rgba(34, 197, 94, 0)'
    ],
    rotate: [0, 10, -10, 0]
  },
  idle: {
    boxShadow: [
      '0 0 0 0 rgba(34, 197, 94, 0.2)',
      '0 0 0 8px rgba(34, 197, 94, 0)',
      '0 0 0 0 rgba(34, 197, 94, 0)'
    ]
  }
}