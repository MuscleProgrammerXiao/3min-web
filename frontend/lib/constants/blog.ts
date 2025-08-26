/**
 * 博客相关常量
 */

export const BLOG_CATEGORIES = [
  { id: 'all', name: '全部', color: 'bg-gray-100 text-gray-800' },
  { id: 'tech', name: '技术分享', color: 'bg-blue-100 text-blue-800' },
  { id: 'life', name: '生活随笔', color: 'bg-green-100 text-green-800' },
  { id: 'project', name: '项目经验', color: 'bg-purple-100 text-purple-800' },
  { id: 'tutorial', name: '教程指南', color: 'bg-orange-100 text-orange-800' }
] as const

export const BLOG_TAGS = [
  'React', 'TypeScript', 'Next.js', 'Tailwind CSS', 
  'JavaScript', 'CSS', 'HTML', 'Node.js', 
  'Vue', 'Angular', 'Python', 'Java',
  '前端开发', '后端开发', '全栈开发', '移动开发',
  '数据库', 'API', '性能优化', '用户体验'
] as const

export type BlogCategory = typeof BLOG_CATEGORIES[number]['id']
export type BlogTag = typeof BLOG_TAGS[number]