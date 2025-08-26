'use client'

import React,{ useState, useMemo, useCallback, useRef } from 'react'
import Link from 'next/link'
import { motion, useInView } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/common'
import { AnimatedSection, TypewriterText } from '@/components/common'
import { ScrollProgress } from '@/components/common/ScrollProgress'
import BlogPagination from '@/components/blog/BlogPagination'
import { 
  useOptimizedAnimation, 
  useScrollAnimations 
} from '@/lib/hooks'
import { 
  projects, 
  categories, 
  portfolioStats, 
  portfolioConfig,
  categoryDisplayNames,
  type Project 
} from '@/lib/constants/portfolio'
import { ExternalLink, Github, ArrowRight, Code, Palette, Smartphone } from 'lucide-react'

// 项目卡片组件 - 增强版
// 优化后的ProjectCard组件
const ProjectCard = React.memo(({ project, index }: { project: Project; index: number }) => {
  const cardRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(cardRef, { 
    once: true, 
    margin: '-50px',
    amount: 0.3 // 优化触发条件
  })

  // 使用CSS变量优化动画性能
  const cardStyle = useMemo(() => ({
    '--delay': `${index * 0.1}s`,
    '--index': index
  } as React.CSSProperties), [index])

  return (
    <motion.div
      ref={cardRef}
      className="project-card group"
      style={cardStyle}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
      transition={{ 
        duration: 0.6, 
        delay: index * 0.1,
        ease: 'easeOut'
      }}
    >
      <Card className="h-full border border-gray-200 bg-white overflow-hidden hover:shadow-xl transition-shadow duration-300">
        <CardContent className="p-6 h-full flex flex-col">
          {/* 项目标题和分类 */}
          <div className="flex items-start justify-between mb-4">
            <div className="flex-1">
              <h3 className="text-xl font-light text-gray-900 mb-2 group-hover:text-gray-700 transition-colors duration-200">
                {project.title}
              </h3>
              <div className="flex items-center gap-2 mb-3">
                <div className="transition-transform duration-300 group-hover:rotate-12">
                  {project.category === 'web' && <Code className="h-4 w-4 text-gray-500" />}
                  {project.category === 'design' && <Palette className="h-4 w-4 text-gray-500" />}
                  {project.category === 'mobile' && <Smartphone className="h-4 w-4 text-gray-500" />}
                </div>
                <span className="text-sm text-gray-500">
                  {categoryDisplayNames[project.category]}
                </span>
              </div>
            </div>
          </div>

          {/* 项目描述 */}
          <p className="text-gray-600 text-sm leading-relaxed mb-4 flex-1">
            {project.description}
          </p>

          {/* 技术标签 - 优化渲染 */}
          <div className="flex flex-wrap gap-2 mb-6">
            {project.technologies.map((tech: string) => (
              <span
                key={tech}
                className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded border hover:bg-gray-200 transition-colors duration-200"
              >
                {tech}
              </span>
            ))}
          </div>

          {/* 操作按钮 */}
          <div className="flex gap-3 mt-auto">
            <Button
              variant="outline"
              size="sm"
              asChild
              className="flex-1 hover:bg-gray-50 transition-colors duration-200"
            >
              <Link href={project.githubUrl} target="_blank" rel="noopener noreferrer">
                <Github className="h-4 w-4 mr-2" />
                代码
              </Link>
            </Button>
            
            <Button
              size="sm"
              asChild
              className="flex-1 bg-gray-900 text-white hover:bg-gray-800 transition-colors duration-200"
            >
              <Link href={project.liveUrl} target="_blank" rel="noopener noreferrer">
                <ExternalLink className="h-4 w-4 mr-2" />
                预览
              </Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
})

ProjectCard.displayName = 'ProjectCard'

export default function PortfolioPage() {
  const [typingComplete, setTypingComplete] = useState(false)
  const [selectedCategory, setSelectedCategory] = useState('全部')
  const [currentPage, setCurrentPage] = useState(1)
  const animationConfig = useOptimizedAnimation()
  const { containerRef, parallaxValues } = useScrollAnimations()
  
  // 优化过滤逻辑
  const filteredProjects = useMemo(() => {
    if (selectedCategory === '全部') {
      return projects
    }
    return projects.filter(project => project.category === selectedCategory)
  }, [selectedCategory])
  
  const projectsPerPage = portfolioConfig.projectsPerPage || 6
  const totalPages = useMemo(() => 
    Math.ceil(filteredProjects.length / projectsPerPage), 
    [filteredProjects.length, projectsPerPage]
  )
  
  const currentProjects = useMemo(() => {
    const startIndex = (currentPage - 1) * projectsPerPage
    const endIndex = startIndex + projectsPerPage
    return filteredProjects.slice(startIndex, endIndex)
  }, [filteredProjects, currentPage, projectsPerPage])
  
  // 优化回调函数
  const handlePageChange = useCallback((page: number) => {
    setCurrentPage(page)
    // 使用requestAnimationFrame优化滚动
    requestAnimationFrame(() => {
      const projectsSection = document.querySelector('.projects-grid')
      if (projectsSection) {
        projectsSection.scrollIntoView({ behavior: 'smooth' })
      }
    })
  }, [])
  
  const handleCategoryChange = useCallback((category: string) => {
    setSelectedCategory(category)
    setCurrentPage(1)
  }, [])
  
  return (
    <div ref={containerRef} className="min-h-screen bg-white relative overflow-hidden">
      {/* 滚动进度指示器 */}
      <ScrollProgress />
      
      {/* 背景光影效果 - 添加视差 */}
      <div className="absolute inset-0 pointer-events-none">
        <motion.div 
          style={{ y: parallaxValues.y1, opacity: parallaxValues.opacity }}
          className="absolute top-20 left-10 w-96 h-96 bg-black/5 rounded-full blur-3xl" 
        />
        <motion.div 
          style={{ y: parallaxValues.y2 }}
          className="absolute top-40 right-20 w-80 h-80 bg-black/3 rounded-full blur-2xl" 
        />
        <div className="absolute bottom-40 left-1/4 w-72 h-72 bg-black/4 rounded-full blur-3xl" />
        
        {/* 动态光晕效果 */}
        <motion.div
          animate={{
            x: [0, 100, 0],
            y: [0, -50, 0],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear"
          }}
          className="absolute top-32 left-1/3 w-64 h-64 bg-black/2 rounded-full blur-2xl"
        />
        
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.1, 0.3],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="absolute bottom-32 right-1/4 w-80 h-80 bg-black/3 rounded-full blur-3xl"
        />
        
        <motion.div
          animate={{
            rotate: [0, 360],
          }}
          transition={{
            duration: 30,
            repeat: Infinity,
            ease: "linear"
          }}
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-r from-black/2 to-transparent rounded-full blur-2xl"
        />
        
        {/* 随机漂浮光点 */}
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            animate={{
              x: [0, Math.random() * 200 - 100, 0],
              y: [0, Math.random() * 200 - 100, 0],
              opacity: [0.2, 0.05, 0.2],
            }}
            transition={{
              duration: 15 + Math.random() * 10,
              repeat: Infinity,
              ease: "easeInOut",
              delay: i * 2
            }}
            className={`absolute w-16 h-16 bg-black/10 rounded-full blur-xl`}
            style={{
              top: `${20 + Math.random() * 60}%`,
              left: `${10 + Math.random() * 80}%`,
            }}
          />
        ))}
      </div>

      {/* 主要内容 */}
      <div className="relative z-10">
        {/* 标题区域 */}
        <AnimatedSection className="pt-32 pb-20 px-4 text-center">
          <div className="max-w-4xl mx-auto">
            {/* 主标题 - 增强黑色光影效果 */}
            <div className="relative mb-8">
              <h1 
                className="text-6xl md:text-7xl lg:text-8xl font-light text-gray-900 mb-6 relative z-10"
                style={{
                  textShadow: `
                    2px 2px 4px rgba(0, 0, 0, 0.1),
                    4px 4px 8px rgba(0, 0, 0, 0.08),
                    6px 6px 12px rgba(0, 0, 0, 0.06),
                    8px 8px 16px rgba(0, 0, 0, 0.04)
                  `
                }}
              >
                我的作品
              </h1>
            </div>
            
            {/* 副标题 */}
            <div className="mb-8">
              <TypewriterText 
                text="探索创意与技术的完美融合" 
                onComplete={() => setTypingComplete(true)}
              />
            </div>
            
            {/* 统计信息 */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: typingComplete ? 1 : 0, y: typingComplete ? 0 : 20 }}
              transition={{ duration: animationConfig.duration, delay: 0.5 }}
              className="grid grid-cols-3 md:grid-cols-3 gap-8 max-w-2xl mx-auto"
            >
              <div className="text-center">
                <div 
                  className="text-3xl md:text-4xl font-light text-gray-900 mb-2"
                  style={{
                    textShadow: `
                      1px 1px 2px rgba(0, 0, 0, 0.1),
                      2px 2px 4px rgba(0, 0, 0, 0.08),
                      3px 3px 6px rgba(0, 0, 0, 0.06)
                    `
                  }}
                >
                  {portfolioStats.totalProjects}+
                </div>
                <div className="text-gray-600 text-sm">完成项目</div>
              </div>
              <div className="text-center">
                <div 
                  className="text-3xl md:text-4xl font-light text-gray-900 mb-2"
                  style={{
                    textShadow: `
                      1px 1px 2px rgba(0, 0, 0, 0.1),
                      2px 2px 4px rgba(0, 0, 0, 0.08),
                      3px 3px 6px rgba(0, 0, 0, 0.06)
                    `
                  }}
                >
                  {portfolioStats.techFields}+
                </div>
                <div className="text-gray-600 text-sm">技术领域</div>
              </div>
              <div className="text-center">
                <div 
                  className="text-3xl md:text-4xl font-light text-gray-900 mb-2"
                  style={{
                    textShadow: `
                      1px 1px 2px rgba(0, 0, 0, 0.1),
                      2px 2px 4px rgba(0, 0, 0, 0.08),
                      3px 3px 6px rgba(0, 0, 0, 0.06)
                    `
                  }}
                >
                  {portfolioStats.experienceYears}+
                </div>
                <div className="text-gray-600 text-sm">经验年限</div>
              </div>
            </motion.div>
          </div>
        </AnimatedSection>

        {/* 分类筛选 */}
        <AnimatedSection className="px-4 mb-16">
          <div className="max-w-6xl mx-auto">
            <div className="flex flex-wrap justify-center gap-4">
              {categories.map((category) => (
                <Button
                  key={category}
                  variant={selectedCategory === category ? "default" : "outline"}
                  onClick={() => handleCategoryChange(category)}
                  className={`
                    px-6 py-2 transition-all duration-300
                    ${
                      selectedCategory === category
                        ? 'bg-gray-900 text-white hover:bg-gray-800 shadow-lg'
                        : 'border-gray-300 text-gray-700 hover:bg-gray-50 hover:border-gray-400'
                    }
                  `}
                >
                  {category}
                </Button>
              ))}
            </div>
          </div>
        </AnimatedSection>

        {/* 项目网格 */}
        <AnimatedSection id="projects-section" className="px-4 pb-20">
          <div className="max-w-6xl mx-auto">
            <motion.div
              key={`${selectedCategory}-${currentPage}`}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 min-h-[600px] projects-grid"
            >
              {currentProjects.map((project, index) => (
                <ProjectCard 
                  key={`${project.id}-${selectedCategory}`} 
                  project={project} 
                  index={index} 
                />
              ))}
            </motion.div>
            {/* 分页组件 - 使用现有的BlogPagination */}
            {totalPages > 1 && (
              <div className="mt-12">
                <BlogPagination
                  currentPage={currentPage}
                  totalPages={totalPages}
                  onPageChange={handlePageChange}
                />
              </div>
            )}
          </div>
        </AnimatedSection>

        {/* CTA 区域 */}
        <AnimatedSection className="py-20 px-4 text-center bg-gray-50">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-light text-gray-900 mb-6">
              有项目想法？
            </h2>
            <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
              我很乐意与您讨论您的项目需求，让我们一起创造出色的数字体验。
            </p>
            <Button
              size="lg"
              asChild
              className="bg-gray-900 text-white hover:bg-gray-800 px-8 py-3 text-lg transition-all duration-300 hover:shadow-lg"
            >
              <Link href="/contact">
                联系我
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          </div>
        </AnimatedSection>
      </div>
    </div>
  )
}