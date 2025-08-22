import Link from 'next/link';
import { Calendar, Clock, ArrowRight, Tag } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { BlogPost } from '@/lib/types/blog';

interface BlogCardProps {
  post: BlogPost;
}

export default function BlogCard({ post }: BlogCardProps) {
  return (
    <article className="bg-white rounded-lg shadow-md p-4 md:p-6 hover:shadow-lg transition-all duration-300 border border-gray-100">
      {/* 分类和标签 */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-4">
        <Badge variant="secondary" className="bg-blue-100 text-blue-800 w-fit">
          {post.category}
        </Badge>
        {post.tags.length > 0 && (
          <div className="flex items-center gap-1">
            <Tag className="h-3 w-3 text-gray-400" />
            <div className="flex flex-wrap gap-1">
              {post.tags.slice(0, 2).map((tag) => (
                <Badge key={tag} variant="outline" className="text-xs">
                  {tag}
                </Badge>
              ))}
              {post.tags.length > 2 && (
                <Badge variant="outline" className="text-xs">
                  +{post.tags.length - 2}
                </Badge>
              )}
            </div>
          </div>
        )}
      </div>

      {/* 文章标题 */}
      <h2 className="text-lg md:text-xl font-semibold mb-3 hover:text-blue-600 transition-colors">
        <Link href={`/blog/${post.slug}`} className="line-clamp-2">
          {post.title}
        </Link>
      </h2>

      {/* 文章摘要 */}
      <p className="text-gray-600 mb-4 leading-relaxed line-clamp-3 text-sm md:text-base">
        {post.excerpt}
      </p>

      {/* 元信息 */}
      <div className="flex flex-wrap items-center gap-3 md:gap-4 text-xs md:text-sm text-gray-500 mb-4">
        <div className="flex items-center gap-1">
          <Calendar className="h-3 w-3 md:h-4 md:w-4" />
          <span className="hidden sm:inline">{new Date(post.date).toLocaleDateString('zh-CN')}</span>
          <span className="sm:hidden">{new Date(post.date).toLocaleDateString('zh-CN', { month: 'short', day: 'numeric' })}</span>
        </div>
        <div className="flex items-center gap-1">
          <Clock className="h-3 w-3 md:h-4 md:w-4" />
          {post.readTime}
        </div>
        {post.author && (
          <div className="flex items-center gap-1">
            <span>作者: {post.author}</span>
          </div>
        )}
      </div>

      {/* 阅读更多按钮 */}
      <Link href={`/blog/${post.slug}`}>
        <Button variant="outline" size="sm" className="group w-full sm:w-auto">
          阅读更多
          <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
        </Button>
      </Link>
    </article>
  );
}