'use client'
import { motion } from 'framer-motion'
import InterestCard from './InterestCard'
import { interests } from './data'
import { itemVariants } from './animations'

const InterestsGrid = () => {
  return (
    <motion.div variants={itemVariants} className="space-y-6 md:space-y-8">
      <h3 className="text-xl md:text-2xl font-semibold text-center text-gray-800 dark:text-white">
        兴趣爱好
      </h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
        {interests.map((interest, index) => (
          <InterestCard 
            key={interest.name}
            interest={interest}
            index={index}
          />
        ))}
      </div>
    </motion.div>
  )
}

export default InterestsGrid