'use client'
import { motion } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef } from 'react'
import BackgroundDecorations from './about/BackgroundDecorations'
import ProfileCard from './about/ProfileCard'
import SkillsGrid from './about/SkillsGrid'
import InterestsGrid from './about/InterestsGrid'
import { containerVariants } from './about/animations'

const AboutSection = () => {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section id="about" className="py-16 md:py-24 bg-gradient-to-br from-gray-50 to-white dark:from-gray-900 dark:to-gray-800 relative overflow-hidden">
      {/* 背景装饰 */}
      <BackgroundDecorations />

      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <motion.div
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="space-y-12 md:space-y-16"
        >
          {/* 个人介绍部分 */}
          <ProfileCard />
          {/* 技能专长部分 */}
          <SkillsGrid isInView={isInView} />
          {/* 兴趣爱好部分 */}
          <InterestsGrid />
        </motion.div>
      </div>
    </section>
  )
}

export default AboutSection