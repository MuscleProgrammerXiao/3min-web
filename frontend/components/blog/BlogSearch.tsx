'use client';

import { useState } from 'react';
import { Search, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { BlogCategory } from '@/lib/types/blog';

interface BlogSearchProps {
  onSearch: (query: string) => void;
  onCategoryFilter: (category: BlogCategory | null) => void;
  onTagFilter: (tags: string[]) => void;
  selectedCategory?: BlogCategory | null;
  selectedTags?: string[];
  searchQuery?: string;
}

const categories: BlogCategory[] = ['技术', '生活', '分享', '随笔'];
const availableTags = ['React', 'Next.js', 'TypeScript', 'JavaScript', 'CSS', '前端', '后端', '设计', '工具', '心得'];

export default function BlogSearch({
  onSearch,
  onCategoryFilter,
  onTagFilter,
  selectedCategory,
  selectedTags = [],
  searchQuery = ''
}: BlogSearchProps) {
  const [query, setQuery] = useState(searchQuery);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(query);
  };

  const handleCategoryClick = (category: BlogCategory) => {
    if (selectedCategory === category) {
      onCategoryFilter(null);
    } else {
      onCategoryFilter(category);
    }
  };

  const handleTagClick = (tag: string) => {
    const newTags = selectedTags.includes(tag)
      ? selectedTags.filter(t => t !== tag)
      : [...selectedTags, tag];
    onTagFilter(newTags);
  };

  const clearFilters = () => {
    setQuery('');
    onSearch('');
    onCategoryFilter(null);
    onTagFilter([]);
  };

  return (
    <div className="space-y-6">
      {/* 搜索框 */}
      <form onSubmit={handleSearch} className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
        <Input
          type="text"
          placeholder="搜索博客文章..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="pl-10 pr-4"
        />
        {query && (
          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={() => {
              setQuery('');
              onSearch('');
            }}
            className="absolute right-2 top-1/2 transform -translate-y-1/2 h-6 w-6 p-0"
          >
            <X className="h-4 w-4" />
          </Button>
        )}
      </form>

      {/* 分类过滤 */}
      <div>
        <h3 className="text-sm font-medium text-gray-700 mb-3">分类</h3>
        <div className="flex flex-wrap gap-2">
          {categories.map((category) => (
            <Badge
              key={category}
              variant={selectedCategory === category ? "default" : "outline"}
              className="cursor-pointer hover:bg-primary/10"
              onClick={() => handleCategoryClick(category)}
            >
              {category}
            </Badge>
          ))}
        </div>
      </div>

      {/* 标签过滤 */}
      <div>
        <h3 className="text-sm font-medium text-gray-700 mb-3">标签</h3>
        <div className="flex flex-wrap gap-2">
          {availableTags.map((tag) => (
            <Badge
              key={tag}
              variant={selectedTags.includes(tag) ? "default" : "outline"}
              className="cursor-pointer hover:bg-primary/10"
              onClick={() => handleTagClick(tag)}
            >
              {tag}
            </Badge>
          ))}
        </div>
      </div>

      {/* 清除过滤器 */}
      {(selectedCategory || selectedTags.length > 0 || query) && (
        <Button variant="outline" onClick={clearFilters} className="w-full">
          清除所有过滤器
        </Button>
      )}
    </div>
  );
}