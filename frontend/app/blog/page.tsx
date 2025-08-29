'use client';

import { useState, useMemo } from 'react';
import BlogCard from '@/components/blog/BlogCard';
import BlogSearch from '@/components/blog/BlogSearch';
import BlogPagination from '@/components/blog/BlogPagination';
import {  BlogCategory } from '@/lib/types/blog';
import { mockPosts, BLOG_CONFIG } from '@/lib/mock/blog';

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
  const totalPages = Math.ceil(filteredPosts.length / BLOG_CONFIG.POSTS_PER_PAGE);
  const startIndex = (currentPage - 1) * BLOG_CONFIG.POSTS_PER_PAGE;
  const paginatedPosts = filteredPosts.slice(startIndex, startIndex + BLOG_CONFIG.POSTS_PER_PAGE);

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
    <div className="min-h-screen bg-gray-50 pt-22 md:pt-22">
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
          <div className="lg:col-span-1 order-1 lg:order-1">
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
          <div className="lg:col-span-3 order-2 lg:order-2">
            {/* 结果统计 */}
            <div className="mb-4 md:mb-6">
              <p className="text-gray-600 text-sm md:text-base">
                找到 <span className="font-semibold text-gray-900">{filteredPosts.length}</span> 篇文章
                {searchQuery && (
                  <span className="ml-2">
                    关于 &quot;<span className="font-semibold">{searchQuery}</span>&quot;
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
              <div className="my-10">
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