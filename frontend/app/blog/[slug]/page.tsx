'use client';

import { useState, useEffect, use } from 'react';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { Calendar, Clock, ArrowLeft, Share2, Tag, User, ChevronUp } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { BlogPost } from '@/lib/types/blog';
import BlogCard from '@/components/blog/BlogCard';
import BlogContent from '@/components/blog/BlogContent';

// 模拟博客数据（实际项目中应该从API获取）
const mockPosts: BlogPost[] = [
  {
    id: 1,
    title: 'Next.js 15 新特性解析',
    excerpt: '深入了解 Next.js 15 带来的新功能和改进，包括性能优化和开发体验提升。',
    content: `
# Next.js 15 新特性解析

Next.js 15 是一个重要的版本更新，带来了许多令人兴奋的新功能和改进。在这篇文章中，我们将深入探讨这些新特性，以及它们如何改善我们的开发体验。

## 主要新特性

### 1. 改进的编译器

Next.js 15 引入了全新的编译器架构，基于 Rust 构建，提供了显著的性能提升：

- **更快的构建速度**：编译时间减少了 40-60%
- **更好的内存管理**：内存使用量降低了 30%
- **增量编译**：只重新编译发生变化的部分

### 2. 新的路由系统

新版本对 App Router 进行了重大改进：

\`\`\`typescript
// 新的并行路由语法
export default function Layout({
  children,
  analytics,
  team
}: {
  children: React.ReactNode
  analytics: React.ReactNode
  team: React.ReactNode
}) {
  return (
    <>
      {children}
      {analytics}
      {team}
    </>
  )
}
\`\`\`

### 3. 服务器组件优化

React Server Components 在 Next.js 15 中得到了进一步优化：

- **流式渲染改进**：更快的首屏加载时间
- **缓存策略优化**：智能缓存管理
- **SEO 增强**：更好的搜索引擎优化支持

## 性能提升

### 构建性能

通过新的编译器和优化策略，Next.js 15 在构建性能方面有了显著提升：

1. **冷启动时间**：减少 50%
2. **热重载速度**：提升 3-5 倍
3. **生产构建**：优化 40%

### 运行时性能

- **JavaScript 包大小**：平均减少 20%
- **首屏加载时间**：改善 30%
- **交互响应时间**：提升 25%

## 开发者体验改进

### 1. 更好的错误提示

新版本提供了更清晰、更有用的错误信息：

\`\`\`bash
❌ Error: Invalid route configuration
   ├─ File: app/dashboard/page.tsx
   ├─ Line: 15:3
   └─ Suggestion: Check your export statement
\`\`\`

### 2. 改进的开发工具

- **新的调试面板**：可视化路由和组件状态
- **性能分析器**：实时性能监控
- **依赖分析**：可视化依赖关系

## 迁移指南

如果你正在使用 Next.js 14，升级到 15 相对简单：

\`\`\`bash
npm install next@15
# 或
yarn add next@15
# 或
pnpm add next@15
\`\`\`

### 破坏性变更

1. **Node.js 版本要求**：最低支持 Node.js 18.17
2. **某些实验性功能**：已被移除或重构
3. **配置文件格式**：部分配置选项有所调整

## 总结

Next.js 15 是一个令人兴奋的版本，它不仅提升了性能，还改善了开发者体验。无论你是新手还是经验丰富的开发者，这些新特性都将帮助你构建更快、更好的 Web 应用。

建议尽快升级到 Next.js 15，享受这些改进带来的好处。如果你在迁移过程中遇到问题，可以参考官方文档或社区资源。

---

*这篇文章涵盖了 Next.js 15 的主要新特性。如果你想了解更多细节，建议查看官方文档和发布说明。*
    `,
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
    excerpt: '探讨在现代 React 应用中如何选择和使用合适的状态管理方案。',
    content: `
# React 状态管理最佳实践

在现代 React 应用开发中，状态管理是一个核心话题。随着应用复杂度的增加，选择合适的状态管理方案变得越来越重要。

## 状态管理的演进

### 从 Class Components 到 Hooks

React 的状态管理经历了从类组件的 \`this.state\` 到函数组件的 \`useState\` 的转变：

\`\`\`typescript
// 类组件时代
class Counter extends React.Component {
  state = { count: 0 }
  
  increment = () => {
    this.setState({ count: this.state.count + 1 })
  }
}

// Hooks 时代
function Counter() {
  const [count, setCount] = useState(0)
  
  const increment = () => setCount(count + 1)
}
\`\`\`

## 选择合适的状态管理方案

### 1. 本地状态 - useState

对于简单的组件内部状态，\`useState\` 是最佳选择：

\`\`\`typescript
function LoginForm() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  
  // 组件逻辑...
}
\`\`\`

### 2. 组件间共享 - useContext

当需要在多个组件间共享状态时，Context API 是一个好选择：

\`\`\`typescript
const ThemeContext = createContext()

function App() {
  const [theme, setTheme] = useState('light')
  
  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      <Header />
      <Main />
    </ThemeContext.Provider>
  )
}
\`\`\`

### 3. 复杂状态 - useReducer

对于复杂的状态逻辑，\`useReducer\` 提供了更好的可预测性：

\`\`\`typescript
const todoReducer = (state, action) => {
  switch (action.type) {
    case 'ADD_TODO':
      return [...state, action.payload]
    case 'TOGGLE_TODO':
      return state.map(todo => 
        todo.id === action.id 
          ? { ...todo, completed: !todo.completed }
          : todo
      )
    default:
      return state
  }
}

function TodoApp() {
  const [todos, dispatch] = useReducer(todoReducer, [])
}
\`\`\`

## 第三方状态管理库

### Zustand - 轻量级选择

\`\`\`typescript
import { create } from 'zustand'

const useStore = create((set) => ({
  count: 0,
  increment: () => set((state) => ({ count: state.count + 1 })),
  decrement: () => set((state) => ({ count: state.count - 1 })),
}))
\`\`\`

### Redux Toolkit - 企业级应用

\`\`\`typescript
import { createSlice } from '@reduxjs/toolkit'

const counterSlice = createSlice({
  name: 'counter',
  initialState: { value: 0 },
  reducers: {
    increment: (state) => {
      state.value += 1
    },
    decrement: (state) => {
      state.value -= 1
    }
  }
})
\`\`\`

## 最佳实践建议

### 1. 状态提升原则

将状态提升到需要它的组件的最近公共祖先：

\`\`\`typescript
// ❌ 不好的做法
function App() {
  return (
    <div>
      <ComponentA /> {/* 内部管理用户状态 */}
      <ComponentB /> {/* 内部管理用户状态 */}
    </div>
  )
}

// ✅ 好的做法
function App() {
  const [user, setUser] = useState(null)
  
  return (
    <div>
      <ComponentA user={user} />
      <ComponentB user={user} />
    </div>
  )
}
\`\`\`

### 2. 避免过度优化

不要过早引入复杂的状态管理方案：

- **小型应用**：useState + useContext
- **中型应用**：useState + useContext + useReducer
- **大型应用**：考虑 Zustand 或 Redux Toolkit

### 3. 状态规范化

对于复杂的嵌套数据，考虑状态规范化：

\`\`\`typescript
// ❌ 嵌套结构
const state = {
  posts: [
    {
      id: 1,
      title: 'Post 1',
      author: { id: 1, name: 'John' },
      comments: [{ id: 1, text: 'Great!' }]
    }
  ]
}

// ✅ 规范化结构
const state = {
  posts: { 1: { id: 1, title: 'Post 1', authorId: 1, commentIds: [1] } },
  authors: { 1: { id: 1, name: 'John' } },
  comments: { 1: { id: 1, text: 'Great!' } }
}
\`\`\`

## 性能优化

### 1. 使用 useMemo 和 useCallback

\`\`\`typescript
function ExpensiveComponent({ items, onItemClick }) {
  const expensiveValue = useMemo(() => {
    return items.reduce((sum, item) => sum + item.value, 0)
  }, [items])
  
  const handleClick = useCallback((id) => {
    onItemClick(id)
  }, [onItemClick])
  
  return (
    <div>
      <p>Total: {expensiveValue}</p>
      {/* 渲染列表 */}
    </div>
  )
}
\`\`\`

### 2. 状态分割

将不相关的状态分开管理：

\`\`\`typescript
// ❌ 单一大状态
const [appState, setAppState] = useState({
  user: null,
  posts: [],
  ui: { loading: false, error: null }
})

// ✅ 分割状态
const [user, setUser] = useState(null)
const [posts, setPosts] = useState([])
const [ui, setUi] = useState({ loading: false, error: null })
\`\`\`

## 总结

React 状态管理的关键是选择合适的工具和模式。从简单的 \`useState\` 开始，根据应用的复杂度逐步引入更高级的解决方案。记住，最好的状态管理方案是能够满足当前需求且团队能够理解和维护的方案。

---

*状态管理是一个不断演进的领域，保持学习和实践是掌握它的最佳方式。*
    `,
    date: '2024-01-10',
    readTime: '8 分钟',
    category: '技术',
    tags: ['React', 'JavaScript', '状态管理'],
    slug: 'react-state-management',
    author: '3min',
    published: true
  },
  // 其他文章数据...
];

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
        <div className="mb-6 md:mb-8">
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