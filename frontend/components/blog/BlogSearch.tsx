"use client";

import { useState } from "react";
import { Search, X, ChevronDown, ChevronUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { BlogCategory } from "@/lib/types/blog";
import { BLOG_CATEGORIES, BLOG_AVAILABLE_TAGS } from "@/lib/constants/blog";

interface BlogSearchProps {
  onSearch: (query: string) => void;
  onCategoryFilter: (category: BlogCategory | null) => void;
  onTagFilter: (tags: string[]) => void;
  selectedCategory?: BlogCategory | null;
  selectedTags?: string[];
  searchQuery?: string;
}

const categories: BlogCategory[] = BLOG_CATEGORIES;
const availableTags = BLOG_AVAILABLE_TAGS;

export default function BlogSearch({
  onSearch,
  onCategoryFilter,
  onTagFilter,
  selectedCategory,
  selectedTags = [],
  searchQuery = "",
}: BlogSearchProps) {
  const [query, setQuery] = useState(searchQuery);
  const [isTagsExpanded, setIsTagsExpanded] = useState(false);

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
    setQuery("");
    onSearch("");
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
          onChange={e => setQuery(e.target.value)}
          className="pl-10 pr-4"
        />
        {query && (
          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={() => {
              setQuery("");
              onSearch("");
            }}
            className="absolute right-2 top-1/2 transform -translate-y-1/2 h-6 w-6 p-0"
          >
            <X className="h-4 w-4" />
          </Button>
        )}
      </form>

      {/* 分类和标签 - 移动端同一行，桌面端分开 */}
      <div className="space-y-4 lg:space-y-6">
        {/* 分类和标签标题行 - 移动端 */}
        <div className="flex items-center justify-between lg:hidden">
          <h3 className="text-sm font-medium text-gray-700">分类</h3>
          <button
            onClick={() => setIsTagsExpanded(!isTagsExpanded)}
            className="flex items-center text-sm font-medium text-gray-700 hover:text-gray-900"
          >
            标签
            {isTagsExpanded ? (
              <ChevronUp className="ml-1 h-4 w-4" />
            ) : (
              <ChevronDown className="ml-1 h-4 w-4" />
            )}
          </button>
        </div>

        {/* 分类过滤 */}
        <div className="lg:space-y-3">
          <h3 className="hidden lg:block text-sm font-medium text-gray-700 mb-3">
            分类
          </h3>
          <div className="flex flex-wrap gap-2">
            {categories.map(category => (
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
        <div
          className={`lg:space-y-3 ${!isTagsExpanded ? "hidden lg:block" : ""}`}
        >
          <h3 className="hidden lg:block text-sm font-medium text-gray-700 mb-3">
            标签
          </h3>
          <div className="flex flex-wrap gap-2">
            {availableTags.map(tag => (
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
