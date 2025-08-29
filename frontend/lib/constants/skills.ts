/**
 * 技能和兴趣相关常量
 */

import { 
  Code2, 
  Palette, 
  Camera, 
  Mountain,
  Database,
  Figma
} from 'lucide-react'

export const SKILL_CATEGORIES = [
  { id: 'frontend', name: '前端开发', color: 'from-blue-500 to-cyan-500' },
  { id: 'backend', name: '后端开发', color: 'from-green-500 to-emerald-500' },
  { id: 'design', name: '设计工具', color: 'from-purple-500 to-pink-500' },
  { id: 'mobile', name: '移动开发', color: 'from-orange-500 to-red-500' },
  { id: 'database', name: '数据库', color: 'from-gray-500 to-slate-500' }
] as const

export const SKILLS_DATA = [
  { 
    name: 'React/Next.js', 
    level: 90, 
    color: 'from-cyan-400 via-blue-500 to-blue-600', 
    icon: Code2,
    category: 'frontend',
    description: '现代化React开发'
  },
  { 
    name: 'TypeScript', 
    level: 85, 
    color: 'from-blue-500 via-indigo-500 to-blue-700', 
    icon: Database,
    category: 'frontend',
    description: '类型安全的JavaScript'
  },
  { 
    name: 'TailwindCSS', 
    level: 88, 
    color: 'from-cyan-400 via-teal-500 to-emerald-600', 
    icon: Palette,
    category: 'frontend',
    description: '实用优先的CSS框架'
  },
  { 
    name: 'UI/UX Design', 
    level: 75, 
    color: 'from-purple-500 via-pink-500 to-rose-500', 
    icon: Figma,
    category: 'design',
    description: '用户体验设计'
  }
] as const

export const INTERESTS_DATA = [
  { 
    icon: Code2, 
    name: '编程开发', 
    description: '探索前沿技术，构建优雅解决方案',
    gradient: 'from-blue-500 to-purple-600'
  },
  { 
    icon: Palette, 
    name: '产品设计', 
    description: '用户体验至上，设计驱动创新',
    gradient: 'from-pink-500 to-rose-500'
  },
  { 
    icon: Camera, 
    name: '摄影剪辑', 
    description: '捕捉瞬间美好，讲述视觉故事',
    gradient: 'from-orange-500 to-yellow-500'
  },
  { 
    icon: Mountain, 
    name: '户外运动', 
    description: '拥抱自然，挑战自我极限',
    gradient: 'from-green-500 to-teal-500'
  }
] as const

export type SkillCategory = typeof SKILL_CATEGORIES[number]['id']
export type SkillData = typeof SKILLS_DATA[number]
export type InterestData = typeof INTERESTS_DATA[number]