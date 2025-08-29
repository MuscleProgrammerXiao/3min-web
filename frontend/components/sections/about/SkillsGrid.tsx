'use client'
import { motion } from 'framer-motion'
import SkillCard from './SkillCard'
import { skills } from './data'
import { itemVariants } from './animations'

interface SkillsGridProps {
  isInView: boolean
}

const SkillsGrid = ({ isInView }: SkillsGridProps) => {
  return (
    <motion.div variants={itemVariants } className="space-y-6 md:space-y-8">
      <div className="text-center space-y-3">
        <motion.h3 
          className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          技能专长
        </motion.h3>
        <motion.p 
          className="text-sm md:text-base text-gray-600 dark:text-gray-300 max-w-xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          专注于现代化技术栈，持续学习和探索新技术
        </motion.p>
      </div>
      
      {/* 技能卡片网格 - 调整为更紧凑的布局 */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 gap-4 md:gap-6">
        {skills.map((skill, index) => (
          <SkillCard 
            key={skill.name}
            skill={skill}
            index={index}
            isInView={isInView}
          />
        ))}
      </div>
    </motion.div>
  )
}

export default SkillsGrid