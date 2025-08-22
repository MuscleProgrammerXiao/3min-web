'use client';

import { useState, useMemo } from 'react';
import BlogCard from '@/components/blog/BlogCard';
import BlogSearch from '@/components/blog/BlogSearch';
import BlogPagination from '@/components/blog/BlogPagination';
import { BlogPost, BlogCategory } from '@/lib/types/blog';

// 模拟博客数据
const mockPosts: BlogPost[] = [
  {
    id: 1,
    title: 'Next.js 15 新特性解析',
    excerpt: '深入了解 Next.js 15 带来的新功能和改进，包括性能优化和开发体验提升。探索新的编译器、改进的路由系统以及更好的开发者工具。',
    date: '2024-01-15',
    readTime: '5 分钟',
    category: '技术',
    tags: ['Next.js', 'React', '前端'],
    slug: 'nextjs-15-features',
    author: '3min',
    published: true
  },
  {
    id: 2,
    title: 'React 状态管理最佳实践',
    excerpt: '探讨在现代 React 应用中如何选择和使用合适的状态管理方案。从 useState 到 Zustand，从 Context 到 Redux Toolkit。',
    date: '2024-01-10',
    readTime: '8 分钟',
    category: '技术',
    tags: ['React', 'JavaScript', '状态管理'],
    slug: 'react-state-management',
    author: '3min',
    published: true
  },
  {
    id: 3,
    title: '个人网站开发心得',
    excerpt: '分享从设计到开发完成个人网站的全过程和经验总结。包括技术选型、设计思路、开发流程和部署优化。',
    date: '2024-01-05',
    readTime: '6 分钟',
    category: '分享',
    tags: ['网站开发', '心得', '设计'],
    slug: 'personal-website-development',
    author: '3min',
    published: true
  },
  {
    id: 4,
    title: 'TypeScript 进阶技巧',
    excerpt: 'TypeScript 的高级特性和实用技巧，帮助你写出更安全、更优雅的代码。包括泛型、条件类型、映射类型等。',
    date: '2024-01-01',
    readTime: '10 分钟',
    category: '技术',
    tags: ['TypeScript', 'JavaScript', '前端'],
    slug: 'typescript-advanced-tips',
    author: '3min',
    published: true
  },
  {
    id: 5,
    title: '生活中的编程思维',
    excerpt: '如何将编程思维应用到日常生活中，提高解决问题的效率和质量。从算法思维到系统设计，从调试到优化。',
    date: '2023-12-28',
    readTime: '7 分钟',
    category: '生活',
    tags: ['思维', '生活', '心得'],
    slug: 'programming-mindset-in-life',
    author: '3min',
    published: true
  },
  {
    id: 6,
    title: 'CSS Grid 布局完全指南',
    excerpt: '全面掌握 CSS Grid 布局系统，从基础概念到高级应用。包括网格容器、网格项目、对齐方式等核心概念。',
    date: '2023-12-25',
    readTime: '12 分钟',
    category: '技术',
    tags: ['CSS', '布局', '前端'],
    slug: 'css-grid-complete-guide',
    author: '3min',
    published: true
  }
];

const POSTS_PER_PAGE = 4;

export default function BlogPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<BlogCategory | null>(null);
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [currentPage, setCurrentPage] = useState(1);

  // 过滤博客文章
  const filteredPosts = useMemo(() => {
    return mockPosts.filter(post => {
      const matchesQuery = !searchQuery || 
        post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
      
      const matchesCategory = !selectedCategory || post.category === selectedCategory;
      
      const matchesTags = selectedTags.length === 0 || 
        selectedTags.some(tag => post.tags.includes(tag));
      
      return matchesQuery && matchesCategory && matchesTags && post.published;
    });
  }, [searchQuery, selectedCategory, selectedTags]);

  // 分页逻辑
  const totalPages = Math.ceil(filteredPosts.length / POSTS_PER_PAGE);
  const startIndex = (currentPage - 1) * POSTS_PER_PAGE;
  const paginatedPosts = filteredPosts.slice(startIndex, startIndex + POSTS_PER_PAGE);

  // 重置页码当过滤条件改变时
  const handleSearch = (query: string) => {
    setSearchQuery(query);
    setCurrentPage(1);
  };

  const handleCategoryFilter = (category: BlogCategory | null) => {
    setSelectedCategory(category);
    setCurrentPage(1);
  };

  const handleTagFilter = (tags: string[]) => {
    setSelectedTags(tags);
    setCurrentPage(1);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8 md:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-8 md:mb-12">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">博客</h1>
          <p className="text-lg md:text-xl text-gray-600">
            记录学习过程，分享技术心得
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 lg:gap-8">
          {/* 侧边栏 - 搜索和过滤 */}
          <div className="lg:col-span-1 order-2 lg:order-1">
            <div className="bg-white rounded-lg shadow-sm p-4 md:p-6 lg:sticky lg:top-8">
              <h2 className="text-lg font-semibold mb-4">搜索与过滤</h2>
              <BlogSearch
                onSearch={handleSearch}
                onCategoryFilter={handleCategoryFilter}
                onTagFilter={handleTagFilter}
                selectedCategory={selectedCategory}
                selectedTags={selectedTags}
                searchQuery={searchQuery}
              />
            </div>
          </div>

          {/* 主内容区 */}
          <div className="lg:col-span-3 order-1 lg:order-2">
            {/* 结果统计 */}
            <div className="mb-4 md:mb-6">
              <p className="text-gray-600 text-sm md:text-base">
                找到 <span className="font-semibold text-gray-900">{filteredPosts.length}</span> 篇文章
                {searchQuery && (
                  <span className="ml-2">
                    关于 "<span className="font-semibold">{searchQuery}</span>"
                  </span>
                )}
              </p>
            </div>

            {/* 博客列表 */}
            {paginatedPosts.length > 0 ? (
              <div className="space-y-4 md:space-y-6">
                {paginatedPosts.map((post) => (
                  <BlogCard key={post.id} post={post} />
                ))}
              </div>
            ) : (
              <div className="text-center py-8 md:py-12">
                <p className="text-gray-500 text-lg">没有找到匹配的文章</p>
                <p className="text-gray-400 mt-2">尝试调整搜索条件或清除过滤器</p>
              </div>
            )}

            {/* 分页 */}
            {filteredPosts.length > 0 && (
              <div className="mt-8">
                <BlogPagination
                  currentPage={currentPage}
                  totalPages={totalPages}
                  onPageChange={setCurrentPage}
                />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}