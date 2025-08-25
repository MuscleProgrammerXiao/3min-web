'use client'
import { motion } from 'framer-motion'
import { Skill } from './types'
import { skillCardVariants } from './animations'

interface SkillCardProps {
  skill: Skill
  index: number
  isInView: boolean
}

const SkillCard = ({ skill, index, isInView }: SkillCardProps) => {
  const IconComponent = skill.icon

  return (
    <motion.div
      variants={skillCardVariants as any}
      custom={index}
      whileHover={{ 
        y: -4, 
        scale: 1.05,
        transition: { duration: 0.2 }
      }}
      className="group relative bg-white dark:bg-slate-800/50 backdrop-blur-sm p-4 md:p-6 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 border border-gray-100 dark:border-slate-700/50 overflow-hidden"
    >
      {/* 背景渐变装饰 */}
      <div className={`absolute inset-0 bg-gradient-to-br ${skill.color} opacity-0 group-hover:opacity-10 transition-opacity duration-300`} />
      
      {/* 简洁的图标和技能名称 */}
      <div className="relative z-10 flex flex-col items-center space-y-3 text-center">
        {/* 图标 */}
        <div className={`p-3 rounded-lg bg-gradient-to-br ${skill.color} shadow-md group-hover:shadow-lg transition-shadow duration-300`}>
          <IconComponent className="w-6 h-6 md:w-8 md:h-8 text-white" />
        </div>
        
        {/* 技能名称 */}
        <h4 className="text-sm md:text-base font-semibold text-gray-800 dark:text-white group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-blue-600 group-hover:to-purple-600 group-hover:bg-clip-text transition-all duration-300">
          {skill.name}
        </h4>
      </div>
      
      {/* 悬停时的装饰元素 */}
      <motion.div
        className="absolute -top-1 -right-1 w-2 h-2 bg-gradient-to-br from-blue-400 to-purple-600 rounded-full opacity-0 group-hover:opacity-100"
        animate={{ rotate: 360 }}
        transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
      />
    </motion.div>
  )
}

export default SkillCard