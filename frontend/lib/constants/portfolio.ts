// 项目类型定义
export interface Project {
  id: number
  title: string
  description: string
  category: 'web' | 'design' | 'mobile'
  technologies: string[]
  githubUrl: string
  liveUrl: string
}

// 项目数据
export const projects: Project[] = [
  {
    id: 1,
    title: '响应式网站设计',
    description: '现代化的响应式网站，具有优雅的用户界面和流畅的用户体验。',
    category: 'web',
    technologies: ['React', 'Next.js', 'Tailwind CSS', 'Framer Motion'],
    githubUrl: '#',
    liveUrl: '#'
  },
  {
    id: 2,
    title: 'UI/UX 设计系统',
    description: '完整的设计系统，包含组件库、设计规范和交互原型。',
    category: 'design',
    technologies: ['Figma', 'Adobe XD', 'Sketch', 'Principle'],
    githubUrl: '#',
    liveUrl: '#'
  },
  {
    id: 3,
    title: '移动端应用',
    description: '跨平台移动应用，提供原生般的用户体验和流畅的性能。',
    category: 'mobile',
    technologies: ['React Native', 'Expo', 'Redux', 'Firebase'],
    githubUrl: '#',
    liveUrl: '#'
  },
  {
    id: 4,
    title: '数据可视化平台',
    description: '企业级数据可视化平台，支持多种图表类型和实时数据更新。',
    category: 'web',
    technologies: ['Vue.js', 'D3.js', 'Node.js', 'MongoDB'],
    githubUrl: '#',
    liveUrl: '#'
  },
  {
    id: 5,
    title: '品牌视觉设计',
    description: '为初创公司设计的完整品牌视觉识别系统，包括logo、色彩和字体规范。',
    category: 'design',
    technologies: ['Illustrator', 'Photoshop', 'InDesign', 'After Effects'],
    githubUrl: '#',
    liveUrl: '#'
  },
  {
    id: 6,
    title: '智能家居控制',
    description: 'IoT智能家居控制应用，支持语音控制和自动化场景设置。',
    category: 'mobile',
    technologies: ['Flutter', 'Dart', 'IoT', 'WebSocket'],
    githubUrl: '#',
    liveUrl: '#'
  },
  {
    id: 7,
    title: '电商管理系统',
    description: '全功能电商后台管理系统，支持订单管理、库存管理和数据分析。',
    category: 'web',
    technologies: ['React', 'TypeScript', 'Ant Design', 'Express'],
    githubUrl: '#',
    liveUrl: '#'
  },
  {
    id: 8,
    title: '社交媒体应用',
    description: '现代化社交媒体应用，支持实时聊天、动态分享和社区功能。',
    category: 'mobile',
    technologies: ['React Native', 'Socket.io', 'Redux', 'Node.js'],
    githubUrl: '#',
    liveUrl: '#'
  },
  {
    id: 9,
    title: '企业官网设计',
    description: '专业的企业官网设计，突出品牌形象和企业文化。',
    category: 'design',
    technologies: ['Figma', 'Photoshop', 'Illustrator', 'Webflow'],
    githubUrl: '#',
    liveUrl: '#'
  }
]

// 项目分类
export const categories = ['全部', '网页开发', '设计', '移动端'] as const

// 分类映射
export const categoryMap = {
  '全部': null,
  '网页开发': 'web',
  '设计': 'design',
  '移动端': 'mobile'
} as const

// 统计信息
export const portfolioStats = {
  totalProjects: projects.length,
  techFields: 3,
  experienceYears: 2
}

// 页面配置
export const portfolioConfig = {
  itemsPerPage: 6,
  animationDelay: 0.1,
  projectsPerPage: 6
}

// 分类图标映射
export const categoryIcons = {
  web: 'Code',
  design: 'Palette',
  mobile: 'Smartphone'
} as const

// 分类显示名称映射
export const categoryDisplayNames = {
  web: '网页开发',
  design: '设计',
  mobile: '移动端'
} as const