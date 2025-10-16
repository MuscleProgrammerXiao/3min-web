'use client'
import { motion } from 'framer-motion'
import { Bot, Sparkles, Heart, Star } from 'lucide-react'
import { bubbleVariants, avatarVariants } from './animations'
import { welcomeMessage } from '@/lib/prompts/chatbot'
import AnimatedIcon from './AnimatedIcon'
import BubbleDecoration from './BubbleDecoration'
import FloatingDecoration from './FloatingDecoration'

const WelcomeMessage = () => {
  return (
    <motion.div
      variants={bubbleVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
      className="flex items-start justify-center"
    >
      <motion.div 
        className="bg-gradient-to-br from-white to-blue-50 dark:from-slate-800 dark:to-slate-700 rounded-3xl px-8 py-6 shadow-2xl max-w-lg mx-auto relative border border-blue-100 dark:border-slate-600 backdrop-blur-sm"
        whileHover={{ 
          scale: 1.02,
          boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)"
        }}
        transition={{ duration: 0.3 }}
      >
        <BubbleDecoration className="-top-2 -right-2 bg-gradient-to-br from-pink-400 to-purple-500" />
        <FloatingDecoration className="-bottom-1 -left-1 bg-gradient-to-br from-yellow-400 to-orange-500" />
        
        {/* AI头像 */}
        <motion.div 
          className="absolute -top-6 left-1/2 transform -translate-x-1/2 w-12 h-12 bg-gradient-to-br from-blue-500 via-purple-600 to-pink-500 rounded-full flex items-center justify-center shadow-lg"
          animate={avatarVariants.welcome}
          transition={{ 
            boxShadow: { duration: 2, repeat: Infinity },
            rotate: { duration: 4, repeat: Infinity, ease: "easeInOut" }
          }}
          whileHover={{ scale: 1.1 }}
        >
          <Bot className="w-6 h-6 text-white" />
        </motion.div>
        
        <div className="text-center pt-6">
          <motion.p 
            className="text-base md:text-lg text-gray-800 dark:text-white mb-4 leading-relaxed font-medium"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            {welcomeMessage}
          </motion.p>
          <motion.div 
            className="flex justify-center space-x-2"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
          >
            <AnimatedIcon icon={Sparkles} className="w-4 h-4 text-blue-500" delay={0} />
            <AnimatedIcon icon={Heart} className="w-4 h-4 text-purple-500" delay={0.3} />
            <AnimatedIcon icon={Star} className="w-4 h-4 text-pink-500" delay={0.6} />
          </motion.div>
        </div>
      </motion.div>
    </motion.div>
  )
}

export default WelcomeMessage