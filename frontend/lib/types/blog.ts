// 博客文章类型
export interface BlogPost {
  id: number;
  title: string;
  excerpt: string;
  content?: string;
  date: string;
  readTime: string;
  category: BlogCategory;
  tags: string[];
  slug: string;
  author?: string;
  coverImage?: string;
  published: boolean;
}

// 博客分类类型
export type BlogCategory = "技术" | "生活" | "分享" | "随笔" | "教程" | "产品";

// 搜索参数类型
export interface BlogSearchParams {
  query?: string;
  category?: BlogCategory;
  tags?: string[];
  page?: number;
  limit?: number;
}

// 分页响应类型
export interface PaginatedResponse<T> {
  data: T[];
  pagination: {
    current: number;
    total: number;
    pageSize: number;
    totalPages: number;
  };
}

// 博客过滤器类型
export interface BlogFilters {
  category?: BlogCategory;
  tags?: string[];
  dateRange?: {
    start: string;
    end: string;
  };
}
