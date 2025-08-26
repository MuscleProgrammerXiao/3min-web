'use client'

import { motion } from 'framer-motion'
import { Calendar, MapPin, Briefcase, GraduationCap } from 'lucide-react'
import { AnimatedSection } from '@/components/common'
import { useRouter } from 'next/navigation'
import { ANIMATION_DURATION, ANIMATION_EASING, STAGGER_DELAY } from '@/lib/constants/animations'

interface ExperienceItem {
  id: string
  type: 'work' | 'education' | 'project'
  title: string
  company: string
  location: string
  period: string
  description: string
  skills?: string[]
}

const experiences: ExperienceItem[] = [
  {
    id: '1',
    type: 'project',
    title: '个人网站项目',
    company: '个人项目',
    location: '远程',
    period: '2025.08 - 2025.09',
    description: '设计并开发个人作品展示网站，包含博客系统、作品展示和在线聊天功能。',
    skills: ['Next.js', 'Tailwind CSS', 'Framer Motion', 'Vercel']
  },
   {
    id: '2',
    type: 'work',
    title: '前端开发工程师',
    company: '银行软件开发中心',
    location: '深圳',
    period: '2022.04 - 至今',
    description: '负责前端开发，参与多个项目的架构设计和技术选型，提升团队开发效率。',
    skills: ['React', 'TypeScript', 'Echarts', 'Canvas']
  },
  {
    id: '3',
    type: 'work',
    title: '前端开发工程师',
    company: '互联网公司',
    location: '重庆',
    period: '2020.01 - 2022.04',
    description: '参与公司产品的前端开发工作，学习企业级项目开发流程和团队协作。',
    skills: ['Vue', 'Element UI', 'Git', 'Webpack','微信H5']
  },
   {
    id: '4',
    type: 'education',
    title: '软件工程',
    company: '重庆工程学院',
    location: '重庆',
    period: '2016.09 - 2020.06',
    description: '主修软件工程专业，因为一次校内比赛喜欢上了页面设计，从而选择了前端开发',
    skills: ['JavaScript', 'React', 'Vue', '数据结构']
  },
]

const getIcon = (type: string) => {
  switch (type) {
    case 'work':
      return <Briefcase className="h-4 w-4 sm:h-5 sm:w-5" />
    case 'education':
      return <GraduationCap className="h-4 w-4 sm:h-5 sm:w-5" />
    case 'project':
      return <Calendar className="h-4 w-4 sm:h-5 sm:w-5" />
    default:
      return <Briefcase className="h-4 w-4 sm:h-5 sm:w-5" />
  }
}

const getTypeColor = (type: string) => {
  switch (type) {
    case 'work':
      return 'bg-blue-500'
    case 'education':
      return 'bg-green-500'
    case 'project':
      return 'bg-purple-500'
    default:
      return 'bg-gray-500'
  }
}

const getTypeGradient = (type: string) => {
  switch (type) {
    case 'work':
      return 'from-blue-500 to-blue-600'
    case 'education':
      return 'from-green-500 to-green-600'
    case 'project':
      return 'from-purple-500 to-purple-600'
    default:
      return 'from-gray-500 to-gray-600'
  }
}

const TimelineItem = ({ experience, index }: { experience: ExperienceItem; index: number }) => {
  const isEven = index % 2 === 0

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      className="relative mb-6 sm:mb-12"
    >
      {/* 移动端布局 - 单列 */}
      <div className="block lg:hidden">
        <div className="flex items-start space-x-4">
          {/* 时间轴节点 */}
          <div className="flex flex-col items-center">
            <motion.div
              initial={{ scale: 0 }}
              whileInView={{ scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.1 + 0.2 }}
              className={`w-3 h-3 rounded-full ${getTypeColor(experience.type)} border-2 border-white shadow-lg flex-shrink-0 mt-2`}
            />
            {index < experiences.length - 1 && (
              <div className="w-0.5 h-16 bg-gradient-to-b from-blue-500 via-green-500 to-purple-500 mt-2" />
            )}
          </div>
          
          {/* 内容卡片 */}
          <div className="flex-1 min-w-0">
            <motion.div
              whileHover={{ scale: 1.02 }}
              className="bg-white rounded-lg shadow-md p-4 border border-gray-100 hover:shadow-lg transition-shadow duration-300"
            >
              <div className="flex items-start mb-3">
                <div className={`p-1.5 rounded-full ${getTypeColor(experience.type)} text-white mr-3 flex-shrink-0 mt-0.5`}>
                  {getIcon(experience.type)}
                </div>
                <div className="min-w-0 flex-1">
                  <h3 className="text-base sm:text-lg font-semibold text-gray-800 leading-tight">{experience.title}</h3>
                  <p className="text-sm text-gray-600">{experience.company}</p>
                </div>
              </div>
              
              <div className="flex flex-col sm:flex-row sm:items-center text-xs sm:text-sm text-gray-500 mb-3 space-y-1 sm:space-y-0">
                <div className="flex items-center mr-4">
                  <Calendar className="h-3 w-3 sm:h-4 sm:w-4 mr-1 flex-shrink-0" />
                  <span>{experience.period}</span>
                </div>
                <div className="flex items-center">
                  <MapPin className="h-3 w-3 sm:h-4 sm:w-4 mr-1 flex-shrink-0" />
                  <span>{experience.location}</span>
                </div>
              </div>
              
              <p className="text-sm sm:text-base text-gray-700 mb-4 leading-relaxed">{experience.description}</p>
              
              {experience.skills && (
                <div className="flex flex-wrap gap-1.5 sm:gap-2">
                  {experience.skills.map((skill, skillIndex) => (
                    <motion.span
                      key={skillIndex}
                      initial={{ opacity: 0, scale: 0.8 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      transition={{ delay: index * 0.1 + skillIndex * 0.05 }}
                      className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-full font-medium"
                    >
                      {skill}
                    </motion.span>
                  ))}
                </div>
              )}
            </motion.div>
          </div>
        </div>
      </div>

      {/* PC端优化布局 - 双列 */}
      <div className="hidden lg:block">
        <div className={`flex items-center ${isEven ? 'flex-row' : 'flex-row-reverse'} relative`}>
          {/* 内容卡片 */}
          <div className={`w-5/12 ${isEven ? 'pr-12' : 'pl-12'}`}>
            <motion.div
              whileHover={{ 
                scale: 1.03, 
                y: -8,
                boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)"
              }}
              className="bg-white rounded-xl shadow-lg p-8 border border-gray-100 hover:border-gray-200 transition-all duration-300 relative overflow-hidden group"
            >
              {/* 背景装饰 */}
              <div className={`absolute top-0 right-0 w-20 h-20 bg-gradient-to-br ${getTypeGradient(experience.type)} opacity-10 rounded-bl-full transition-all duration-300 group-hover:w-24 group-hover:h-24`} />
              
              {/* 类型标签 */}
              <div className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium text-white bg-gradient-to-r ${getTypeGradient(experience.type)} mb-4`}>
                <span className="mr-1">{getIcon(experience.type)}</span>
                {experience.type === 'work' ? '工作经历' : experience.type === 'education' ? '教育背景' : '项目经验'}
              </div>
              
              <div className="mb-4">
                <h3 className="text-xl font-bold text-gray-800 mb-2 leading-tight">{experience.title}</h3>
                <p className="text-base text-gray-600 font-medium">{experience.company}</p>
              </div>
              
              <div className="flex items-center text-sm text-gray-500 mb-4 space-x-4">
                <div className="flex items-center">
                  <Calendar className="h-4 w-4 mr-2" />
                  <span className="font-medium">{experience.period}</span>
                </div>
                <div className="flex items-center">
                  <MapPin className="h-4 w-4 mr-2" />
                  <span>{experience.location}</span>
                </div>
              </div>
              
              <p className="text-gray-700 mb-6 leading-relaxed text-base">{experience.description}</p>
              
              {experience.skills && (
                <div>
                  <h4 className="text-sm font-semibold text-gray-600 mb-3">技能标签</h4>
                  <div className="flex flex-wrap gap-2">
                    {experience.skills.map((skill, skillIndex) => (
                      <motion.span
                        key={skillIndex}
                        initial={{ opacity: 0, scale: 0.8 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        whileHover={{ scale: 1.05 }}
                        transition={{ delay: index * 0.1 + skillIndex * 0.05 }}
                        className={`px-3 py-1.5 bg-gradient-to-r ${getTypeGradient(experience.type)} text-white text-sm rounded-full font-medium shadow-sm hover:shadow-md transition-all duration-200`}
                      >
                        {skill}
                      </motion.span>
                    ))}
                  </div>
                </div>
              )}
            </motion.div>
          </div>

          {/* 增强的时间轴节点 */}
          <div className="absolute left-1/2 transform -translate-x-1/2 z-20">
            <motion.div
              initial={{ scale: 0, rotate: -180 }}
              whileInView={{ scale: 1, rotate: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 + 0.2, type: "spring", stiffness: 200 }}
              className="relative"
            >
              {/* 外圈光晕 */}
              <div className={`absolute inset-0 w-8 h-8 rounded-full bg-gradient-to-r ${getTypeGradient(experience.type)} opacity-20 animate-pulse`} />
              
              {/* 主节点 */}
              <div className={`relative w-6 h-6 rounded-full bg-gradient-to-r ${getTypeGradient(experience.type)} border-4 border-white shadow-lg flex items-center justify-center`}>
                <div className="text-white text-xs">
                  {getIcon(experience.type)}
                </div>
              </div>
              
              {/* 连接线装饰 */}
              <div className={`absolute top-1/2 ${isEven ? 'left-8' : 'right-8'} w-8 h-0.5 bg-gradient-to-r ${getTypeGradient(experience.type)} opacity-30`} />
            </motion.div>
          </div>

          {/* 空白区域 */}
          <div className="w-5/12" />
        </div>
      </div>
    </motion.div>
  )
}

export default function ExperienceSection() {
  const router = useRouter()

  const handleContactClick = () => {
    router.push('/contact')
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
  return (
    <section className="py-16 lg:py-24 bg-gradient-to-br from-gray-50 via-white to-blue-50/30" id="experience">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <AnimatedSection>
          <div className="text-center mb-16 lg:mb-20">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="inline-flex items-center px-4 py-2 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 text-white text-sm font-medium mb-6"
            >
              <Briefcase className="h-4 w-4 mr-2" />
              我的成长历程
            </motion.div>
            
            <motion.h2 
              className="text-4xl lg:text-6xl font-bold text-gray-800 mb-6 bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              我的经历
            </motion.h2>
            
            <motion.p 
              className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              从学习到工作，记录我的成长足迹。每一段经历都是我技能提升和视野拓展的重要里程碑。
            </motion.p>
          </div>
        </AnimatedSection>

        {/* 时间轴容器 */}
        <div className="relative">
          {/* 增强的中央时间轴线 */}
          <motion.div
            initial={{ height: 0 }}
            whileInView={{ height: '100%' }}
            viewport={{ once: true }}
            transition={{ duration: 2, ease: "easeInOut" }}
            className="hidden lg:block absolute left-1/2 transform -translate-x-1/2 w-1 bg-gradient-to-b from-blue-500 via-green-500 to-purple-500 rounded-full shadow-sm"
          />
          
          {/* 时间轴背景装饰 */}
          <div className="hidden lg:block absolute left-1/2 transform -translate-x-1/2 w-px h-full bg-gradient-to-b from-transparent via-gray-200 to-transparent opacity-50" />

          {/* 时间轴项目 */}
          <div className="relative z-10">
            {experiences.map((experience, index) => (
              <TimelineItem key={experience.id} experience={experience} index={index} />
            ))}
          </div>
        </div>
        {/* 联系方式 */}
          <motion.div variants={itemVariants} className="text-center">
            <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 md:p-8 shadow-lg max-w-2xl mx-auto border border-gray-100 dark:border-slate-700">
              <h3 className="text-xl md:text-2xl font-semibold text-gray-800 dark:text-white mb-3 md:mb-4">
                让我们一起创造些什么吧！
              </h3>
              <p className="text-sm md:text-base text-gray-600 dark:text-gray-300 mb-4 md:mb-6">
                如果您有有趣的项目想法，或者想要合作，随时欢迎联系我。
              </p>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleContactClick}
                className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 md:px-8 py-2 md:py-3 rounded-full font-medium hover:shadow-lg transition-shadow duration-300 text-sm md:text-base"
              >
                联系我
              </motion.button>
            </div>
          </motion.div>
      </div>
    </section>
  )
}