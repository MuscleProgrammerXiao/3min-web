'use client';

import { useState, useEffect, use } from 'react';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { Calendar, Clock, ArrowLeft, Share2, Tag, User, ChevronUp } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { BlogPost } from '@/lib/types/blog';
import BlogContent from '@/components/blog/BlogContent';
import { mockPosts } from '@/lib/mock/blog';

interface BlogDetailPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export default function BlogDetailPage({ params }: BlogDetailPageProps) {
  const { slug } = use(params);
  const [post, setPost] = useState<BlogPost | null>(null);
  const [relatedPosts, setRelatedPosts] = useState<BlogPost[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showScrollTop, setShowScrollTop] = useState(false);

  // 监听滚动事件
  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
      setShowScrollTop(scrollTop > 300); // 滚动超过300px时显示按钮
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // 滚动到顶部函数
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  useEffect(() => {
    // 模拟API调用
    const fetchPost = async () => {
      setIsLoading(true);
      
      // 查找对应的文章
      const foundPost = mockPosts.find(p => p.slug === slug);
      
      if (!foundPost) {
        notFound();
        return;
      }
      
      setPost(foundPost);
      
      // 获取相关文章（同分类或同标签）
      const related = mockPosts
        .filter(p => 
          p.id !== foundPost.id && 
          (p.category === foundPost.category || 
           p.tags.some(tag => foundPost.tags.includes(tag)))
        )
        .slice(0, 3);
      
      setRelatedPosts(related);
      setIsLoading(false);
    };

    fetchPost();
  }, [slug]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-200 rounded w-3/4 mb-4"></div>
            <div className="h-4 bg-gray-200 rounded w-1/2 mb-8"></div>
            <div className="space-y-4">
              <div className="h-4 bg-gray-200 rounded"></div>
              <div className="h-4 bg-gray-200 rounded w-5/6"></div>
              <div className="h-4 bg-gray-200 rounded w-4/6"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!post) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8 md:py-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* 返回按钮 */}
        <div className="my-6 md:my-8">
          <Link href="/blog">
            <Button variant="outline" size="sm" className="group">
              <ArrowLeft className="mr-2 h-4 w-4 group-hover:-translate-x-1 transition-transform" />
              <span className="hidden sm:inline">返回博客列表</span>
              <span className="sm:hidden">返回</span>
            </Button>
          </Link>
        </div>

        {/* 文章头部 */}
        <article className="bg-white rounded-lg shadow-sm p-4 md:p-6 lg:p-8 mb-6 md:mb-8">
          {/* 分类和标签 */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
            <Badge variant="secondary" className="bg-blue-100 text-blue-800 w-fit">
              {post.category}
            </Badge>
            <div className="flex items-center gap-2">
              <Tag className="h-4 w-4 text-gray-400" />
              <div className="flex flex-wrap gap-2">
                {post.tags.map((tag) => (
                  <Badge key={tag} variant="outline" className="text-sm">
                    {tag}
                  </Badge>
                ))}
              </div>
            </div>
          </div>

          {/* 文章标题 */}
          <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 mb-4 md:mb-6 leading-tight">
            {post.title}
          </h1>

          {/* 文章元信息 */}
          <div className="flex flex-wrap items-center gap-4 md:gap-6 text-sm md:text-base text-gray-600 mb-6 md:mb-8 pb-6 md:pb-8 border-b border-gray-200">
            <div className="flex items-center gap-2">
              <User className="h-4 w-4" />
              <span>{post.author}</span>
            </div>
            <div className="flex items-center gap-2">
              <Calendar className="h-4 w-4" />
              <span className="hidden sm:inline">{new Date(post.date).toLocaleDateString('zh-CN', {
                year: 'numeric',
                month: 'long',
                day: 'numeric'
              })}</span>
              <span className="sm:hidden">{new Date(post.date).toLocaleDateString('zh-CN')}</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="h-4 w-4" />
              <span>{post.readTime}</span>
            </div>
            <Button variant="outline" size="sm" className="ml-auto">
              <Share2 className="h-4 w-4 mr-2" />
              <span className="hidden sm:inline">分享</span>
            </Button>
          </div>

          {/* 文章内容 */}
          <div className="prose prose-sm md:prose-lg max-w-none">
            <BlogContent content={post.content || ''} />
          </div>
        </article>

        {/* 相关文章 */}
        {relatedPosts.length > 0 && (
          <div className="bg-white rounded-lg shadow-sm p-4 md:p-6 lg:p-8">
            <h2 className="text-xl md:text-2xl font-bold text-gray-900 mb-4 md:mb-6">相关文章</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 md:gap-6">
              {relatedPosts.map((relatedPost) => (
                <div key={relatedPost.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                  <Badge variant="outline" className="mb-3">
                    {relatedPost.category}
                  </Badge>
                  <h3 className="font-semibold mb-2 line-clamp-2 text-sm md:text-base">
                    <Link 
                      href={`/blog/${relatedPost.slug}`}
                      className="hover:text-blue-600 transition-colors"
                    >
                      {relatedPost.title}
                    </Link>
                  </h3>
                  <p className="text-gray-600 text-xs md:text-sm line-clamp-3 mb-3">
                    {relatedPost.excerpt}
                  </p>
                  <div className="flex items-center gap-3 md:gap-4 text-xs text-gray-500">
                    <span>{new Date(relatedPost.date).toLocaleDateString('zh-CN')}</span>
                    <span>{relatedPost.readTime}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
      
      {/* 回到顶部按钮 */}
      {showScrollTop && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-6 right-6 md:bottom-8 md:right-8 z-50 bg-blue-600 hover:bg-blue-700 text-white p-2 md:p-3 rounded-full shadow-lg transition-all duration-300 ease-in-out transform hover:scale-110 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          aria-label="回到顶部"
        >
          <ChevronUp className="h-5 w-5 md:h-6 md:w-6" />
        </button>
      )}
    </div>
  );
}