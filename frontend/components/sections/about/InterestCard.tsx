'use client'
import { motion } from 'framer-motion'
import { Interest } from './types'
import { interestVariants } from './animations'

interface InterestCardProps {
  interest: Interest
  index: number
}

const InterestCard = ({ interest, index }: InterestCardProps) => {
  const IconComponent = interest.icon

  return (
    <motion.div
      variants={interestVariants}
      custom={index}
      whileHover={{ y: -5, scale: 1.02 }}
      className="group relative bg-white dark:bg-slate-800 p-4 md:p-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 dark:border-slate-700 overflow-hidden"
    >
      <div className={`absolute inset-0 bg-gradient-to-br ${interest.gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-300`} />
      <div className="relative z-10 text-center space-y-3 md:space-y-4">
        <div className={`inline-flex p-3 md:p-4 rounded-full bg-gradient-to-br ${interest.gradient} shadow-lg`}>
          <IconComponent className="w-6 h-6 md:w-8 md:h-8 text-white" />
        </div>
        <div className="space-y-1 md:space-y-2">
          <h4 className="font-semibold text-sm md:text-base text-gray-800 dark:text-white">
            {interest.name}
          </h4>
          <p className="text-xs md:text-sm text-gray-600 dark:text-gray-300 leading-relaxed">
            {interest.description}
          </p>
        </div>
      </div>
      <motion.div
        className="absolute -top-1 -right-1 w-2 h-2 bg-gradient-to-br from-pink-400 to-purple-600 rounded-full opacity-0 group-hover:opacity-100"
        animate={{ scale: [1, 1.2, 1] }}
        transition={{ duration: 2, repeat: Infinity }}
      />
    </motion.div>
  )
}

export default InterestCard