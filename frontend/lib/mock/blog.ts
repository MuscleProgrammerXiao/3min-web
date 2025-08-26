import { BlogPost, BlogCategory } from '@/lib/types/blog';

// 博客配置常量
export const BLOG_CONFIG = {
  POSTS_PER_PAGE: 6,
  FEATURED_POSTS_COUNT: 3,
  RELATED_POSTS_COUNT: 3,
  EXCERPT_LENGTH: 120,
  CONTENT_PREVIEW_LENGTH: 50
};

// 博客文章数据
export const mockPosts: BlogPost[] = [
  {
    id: 1,
    title: 'Next.js 15 新特性解析',
    excerpt: '深入了解 Next.js 15 带来的新功能和改进，包括性能优化、开发体验提升等重要更新',
    content: 'Next.js 15 带来了许多激动人心的新特性，包括改进的性能、更好的开发体验和新的API设计。本文将详细介绍这些新功能如何提升我们的开发效率。',
    date: '2024-01-15',
    readTime: '5 分钟',
    category: '技术',
    tags: ['Next.js', 'React', '前端', 'JavaScript'],
    slug: 'nextjs-15-features',
    author: '3min',
    published: true
  },
  {
    id: 2,
    title: 'React 状态管理最佳实践',
    excerpt: '探讨在现代 React 应用中如何选择和使用合适的状态管理方案，提升应用性能',
    content: 'React 状态管理是构建复杂应用的关键。本文分析了 useState、useReducer、Context API 和第三方库的使用场景，帮助开发者做出最佳选择。',
    date: '2024-01-10',
    readTime: '8 分钟',
    category: '技术',
    tags: ['React', 'JavaScript', '状态管理', '前端'],
    slug: 'react-state-management',
    author: '3min',
    published: true
  },
  {
    id: 3,
    title: '个人网站开发心得',
    excerpt: '分享个人网站从设计到部署的完整开发经验，包括技术选型和优化策略',
    content: '开发个人网站是一个很好的学习机会。从技术选型到UI设计，再到部署上线，每个环节都有很多值得分享的经验和踩过的坑。',
    date: '2024-01-05',
    readTime: '6 分钟',
    category: '分享',
    tags: ['开发', '经验', '分享', '网站'],
    slug: 'personal-website-development',
    author: '3min',
    published: true
  },
  {
    id: 4,
    title: 'TypeScript 进阶技巧',
    excerpt: '掌握 TypeScript 的高级特性，提升代码质量和开发效率',
    content: 'TypeScript 的类型系统非常强大，掌握泛型、条件类型、映射类型等高级特性，可以让我们写出更安全、更优雅的代码。',
    date: '2024-01-01',
    readTime: '7 分钟',
    category: '技术',
    tags: ['TypeScript', 'JavaScript', '类型系统'],
    slug: 'typescript-advanced-tips',
    author: '3min',
    published: true
  },
  {
    id: 5,
    title: 'CSS Grid 布局完全指南',
    excerpt: '全面掌握 CSS Grid 布局，创建复杂而灵活的网页布局',
    content: 'CSS Grid 是现代网页布局的强大工具。通过网格容器和网格项目的概念，我们可以轻松创建复杂的二维布局，告别传统的浮动和定位。',
    date: '2023-12-28',
    readTime: '10 分钟',
    category: '技术',
    tags: ['CSS', 'Grid', '布局', '前端'],
    slug: 'css-grid-guide',
    author: '3min',
    published: true
  },
  {
    id: 6,
    title: '工作生活平衡的思考',
    excerpt: '在快节奏的工作中如何保持生活的平衡，分享一些个人的思考和实践',
    content: '作为程序员，很容易陷入加班和技术学习的循环中。如何在职业发展和个人生活之间找到平衡，是每个人都需要思考的问题。',
    date: '2023-12-25',
    readTime: '4 分钟',
    category: '生活',
    tags: ['生活', '思考', '平衡', '成长'],
    slug: 'work-life-balance',
    author: '3min',
    published: true
  },
  {
    id: 7,
    title: 'Vue 3 Composition API 实战',
    excerpt: 'Vue 3 Composition API 的实际应用场景和最佳实践分享',
    content: 'Vue 3 的 Composition API 为组件逻辑复用提供了新的思路。通过组合式函数，我们可以更好地组织和复用代码逻辑。',
    date: '2023-12-20',
    readTime: '6 分钟',
    category: '技术',
    tags: ['Vue', 'Composition API', '前端'],
    slug: 'vue3-composition-api',
    author: '3min',
    published: false
  },
  {
    id: 8,
    title: '前端性能优化实践',
    excerpt: '从多个维度分析前端性能优化的方法和技巧，提升用户体验',
    content: '前端性能优化是提升用户体验的关键。从资源加载、代码分割到缓存策略，每个细节都可能影响应用的性能表现。',
    date: '2023-12-15',
    readTime: '9 分钟',
    category: '技术',
    tags: ['性能优化', '前端', '用户体验'],
    slug: 'frontend-performance-optimization',
    author: '3min',
    published: true
  }
];

// 获取所有分类
export const getAllCategories = (): BlogCategory[] => {
  const categories = Array.from(new Set(mockPosts.map(post => post.category)));
  return categories as BlogCategory[];
};

// 获取所有标签
export const getAllTags = (): string[] => {
  const tags = Array.from(new Set(mockPosts.flatMap(post => post.tags)));
  return tags.sort();
};

// 根据分类获取文章
export const getPostsByCategory = (category: BlogCategory): BlogPost[] => {
  return mockPosts.filter(post => post.category === category && post.published);
};

// 根据标签获取文章
export const getPostsByTag = (tag: string): BlogPost[] => {
  return mockPosts.filter(post => post.tags.includes(tag) && post.published);
};

// 根据 slug 获取文章
export const getPostBySlug = (slug: string): BlogPost | undefined => {
  return mockPosts.find(post => post.slug === slug);
};

// 获取最新文章
export const getLatestPosts = (limit: number = 5): BlogPost[] => {
  return mockPosts
    .filter(post => post.published)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, limit);
};

// 获取相关文章
export const getRelatedPosts = (currentPost: BlogPost, limit: number = 3): BlogPost[] => {
  return mockPosts
    .filter(post => 
      post.id !== currentPost.id && 
      post.published &&
      (post.category === currentPost.category || 
       post.tags.some(tag => currentPost.tags.includes(tag)))
    )
    .sort((a, b) => {
      // 优先显示同分类的文章
      if (a.category === currentPost.category && b.category !== currentPost.category) {
        return -1;
      }
      if (b.category === currentPost.category && a.category !== currentPost.category) {
        return 1;
      }
      // 然后按日期排序
      return new Date(b.date).getTime() - new Date(a.date).getTime();
    })
    .slice(0, limit);
};

// 搜索文章
export const searchPosts = (query: string): BlogPost[] => {
  const lowercaseQuery = query.toLowerCase();
  return mockPosts.filter(post => 
    post.published &&
    (post.title.toLowerCase().includes(lowercaseQuery) ||
     post.excerpt.toLowerCase().includes(lowercaseQuery) ||
     post.content?.toLowerCase().includes(lowercaseQuery) ||
     post.tags.some(tag => tag.toLowerCase().includes(lowercaseQuery)))
  );
};

// 获取文章统计信息
export const getBlogStats = () => {
  const publishedPosts = mockPosts.filter(post => post.published);
  const categories = getAllCategories();
  const tags = getAllTags();
  
  return {
    totalPosts: publishedPosts.length,
    totalCategories: categories.length,
    totalTags: tags.length,
    draftPosts: mockPosts.filter(post => !post.published).length
  };
};