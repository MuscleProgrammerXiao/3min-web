'use client'
import { motion } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef } from 'react'
import { Code, Palette, Camera, Mountain, BookOpen, Wine } from 'lucide-react'
import Image from 'next/image'

const AboutSection = () => {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.6,
        staggerChildren: 0.2
      }as any
    }
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: 'easeOut'
      }as any
    }
  }

  const skillVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.5,
        ease: 'easeOut'
      }as any
    }
  }

  const skills = [
    { name: 'React/Next.js', level: 90, color: 'var(--skill-react)', icon: '⚛️' },
    { name: 'TypeScript', level: 85, color: 'var(--skill-typescript)', icon: '📘' },
    { name: 'TailwindCSS', level: 88, color: 'var(--skill-tailwind)', icon: '🎨' },
    { name: 'UI/UX Design', level: 75, color: 'var(--skill-design)', icon: '🎯' },
    { name: 'Canvas', level: 70, color: 'var(--skill-canvas)', icon: '🖼️' },
    { name: 'Echarts', level: 80, color: 'var(--skill-charts)', icon: '📊' }
  ]

  const interests = [
    { 
      icon: Code, 
      name: '编程开发', 
      description: '探索前沿技术，构建优雅解决方案',
      gradient: 'var(--primary-gradient)'
    },
    { 
      icon: Palette, 
      name: '产品设计', 
      description: '用户体验至上，设计驱动创新',
      gradient: 'var(--secondary-gradient)'
    },
    { 
      icon: Camera, 
      name: '摄影剪辑', 
      description: '捕捉瞬间美好，讲述视觉故事',
      gradient: 'var(--warm-gradient)'
    },
    { 
      icon: Mountain, 
      name: '户外运动', 
      description: '拥抱自然，挑战自我极限',
      gradient: 'var(--ocean-gradient)'
    }
  ]

  return (
    <section id="about" ref={ref} className="py-12 md:py-20 bg-gradient-to-br from-slate-50 to-blue-50 dark:from-slate-900 dark:to-slate-800">
      <div className="container mx-auto px-4 max-w-6xl">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="space-y-12 md:space-y-16"
        >
          {/* 标题 */}
          <motion.div variants={itemVariants} className="text-center">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-800 dark:text-white mb-4 md:mb-6">
              关于我
            </h2>
            <p className="text-base md:text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed">
              一个热爱技术、追求极致用户体验的全栈开发者
            </p>
          </motion.div>

          {/* 个人简介 */}
          <motion.div variants={itemVariants} className="grid lg:grid-cols-2 gap-8 md:gap-12 items-center">
            <div className="relative">
              <motion.div
                className="relative w-64 h-64 md:w-80 md:h-80 mx-auto lg:mx-0"
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.3 }}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-blue-400 to-purple-600 rounded-full blur-2xl opacity-20 animate-pulse" />
                <Image
                  src="/images/avctor.jpg"
                  alt="个人头像"
                  fill
                  className="rounded-full object-cover shadow-2xl border-4 border-white dark:border-slate-700"
                  priority
                />
                {/* 装饰元素 */}
                <motion.div
                  className="absolute -top-2 -right-2 md:-top-4 md:-right-4 w-6 h-6 md:w-8 md:h-8 bg-yellow-400 rounded-full"
                  animate={{ rotate: 360 }}
                  transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                />
                <motion.div
                  className="absolute -bottom-2 -left-2 md:-bottom-4 md:-left-4 w-4 h-4 md:w-6 md:h-6 bg-pink-400 rounded-full"
                  animate={{ y: [-10, 10, -10] }}
                  transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                />
              </motion.div>
            </div>
            <div className="space-y-4 md:space-y-6 text-center lg:text-left">
              <h3 className="text-2xl md:text-3xl font-semibold text-gray-800 dark:text-white">
                你好，我是一名全栈开发者
              </h3>
              <div className="space-y-3 md:space-y-4 text-sm md:text-base text-gray-600 dark:text-gray-300 leading-relaxed">
                <p>
                  我热衷于创造优雅的数字体验，专注于前端技术和用户体验设计。
                  从概念到实现，我享受将创意转化为现实的每一个过程。
                </p>
                <p>
                  除了技术，我也是一个生活的探索者。摄影让我捕捉美好瞬间，
                  户外运动让我保持活力，阅读让我不断成长。
                </p>
                <p>
                  我相信技术应该服务于人，让生活变得更美好。
                  如果你也有这样的想法，我们一定会有很多共同话题！
                </p>
              </div>
            </div>
          </motion.div>

          {/* 技能部分 - 移动端优化 */}
          <motion.div variants={itemVariants} className="space-y-6 md:space-y-8">
            <h3 className="text-xl md:text-2xl font-semibold text-center text-gray-800 dark:text-white">
              技能专长
            </h3>
            {/* 移动端：单列布局，桌面端：三列布局 */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
              {skills.map((skill, index) => (
                <motion.div
                  key={skill.name}
                  variants={skillVariants}
                  custom={index}
                  whileHover={{ y: -5, scale: 1.02 }}
                  className="bg-white dark:bg-slate-800 p-4 md:p-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 dark:border-slate-700"
                >
                  <div className="flex items-center justify-between mb-3 md:mb-4">
                    <div className="flex items-center space-x-2 md:space-x-3">
                      <span className="text-lg md:text-2xl">{skill.icon}</span>
                      <span className="font-medium text-sm md:text-base text-gray-800 dark:text-white truncate">
                        {skill.name}
                      </span>
                    </div>
                    <span className="text-xs md:text-sm font-semibold text-gray-500 dark:text-gray-400 bg-gray-100 dark:bg-slate-700 px-2 py-1 rounded text-nowrap">
                      {skill.level}%
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2 md:h-3 overflow-hidden">
                    <motion.div
                      className={`h-2 md:h-3 rounded-full bg-gradient-to-r ${skill.color} relative`}
                      initial={{ width: 0 }}
                      animate={isInView ? { width: `${skill.level}%` } : { width: 0 }}
                      transition={{ duration: 1.5, delay: index * 0.2, ease: "easeOut" }}
                    >
                      <motion.div
                        className="absolute inset-0 bg-white/20 rounded-full"
                        animate={{ x: [-100, 100] }}
                        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                      />
                    </motion.div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* 兴趣爱好 - 移动端优化 */}
          <motion.div variants={itemVariants} className="space-y-6 md:space-y-8">
            <h3 className="text-xl md:text-2xl font-semibold text-center text-gray-800 dark:text-white">
              兴趣爱好
            </h3>
            {/* 移动端：单列布局，平板：双列，桌面：三列 */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
              {interests.map((interest, index) => {
                const IconComponent = interest.icon
                return (
                  <motion.div
                    key={interest.name}
                    variants={skillVariants}
                    custom={index}
                    whileHover={{ y: -8, scale: 1.03 }}
                    className="bg-white dark:bg-slate-800 p-4 md:p-6 rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 group border border-gray-100 dark:border-slate-700 overflow-hidden relative"
                  >
                    {/* 背景装饰 */}
                    <div className={`absolute top-0 right-0 w-16 h-16 md:w-20 md:h-20 bg-gradient-to-br ${interest.gradient} opacity-10 rounded-full transform translate-x-4 -translate-y-4 md:translate-x-6 md:-translate-y-6 group-hover:scale-150 transition-transform duration-500`} />
                    
                    <div className="relative z-10">
                      <div className="flex items-start space-x-3 md:space-x-4">
                        <motion.div 
                          className={`p-2 md:p-3 bg-gradient-to-br ${interest.gradient} rounded-lg group-hover:scale-110 transition-transform duration-300 shadow-lg flex-shrink-0`}
                          whileHover={{ rotate: [0, -10, 10, 0] }}
                          transition={{ duration: 0.5 }}
                        >
                          <IconComponent className="w-5 h-5 md:w-6 md:h-6 text-white" />
                        </motion.div>
                        <div className="flex-1 min-w-0">
                          <h4 className="font-semibold text-sm md:text-base text-gray-800 dark:text-white mb-1 md:mb-2 group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:bg-clip-text group-hover:from-blue-600 group-hover:to-purple-600 transition-all duration-300">
                            {interest.name}
                          </h4>
                          <p className="text-xs md:text-sm text-gray-600 dark:text-gray-300 leading-relaxed">
                            {interest.description}
                          </p>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )
              })}
            </div>
          </motion.div>

          
        </motion.div>
      </div>
    </section>
  )
}

export default AboutSection