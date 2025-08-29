'use client';

import { useState, useEffect, use } from 'react';
import { useRouter } from 'next/navigation';
import { useGlobalStore } from '@/lib/store';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import {
  Save,
  Eye,
  ArrowLeft,
  Plus,
  X,
  FileText
} from 'lucide-react';
import { BlogPost } from '@/lib/types/blog';
import Link from 'next/link';

// 模拟博客数据
const mockBlogPosts: BlogPost[] = [
  {
    id: 1,
    title: 'Next.js 15 新特性解析',
    excerpt: '深入了解 Next.js 15 带来的新功能和改进',
    content: '# Next.js 15 新特性解析\n\nNext.js 15 是一个重要的版本更新...',
    date: '2024-01-15',
    readTime: '5 分钟',
    category: '技术',
    tags: ['Next.js', 'React', '前端'],
    slug: 'nextjs-15-features',
    author: '3min',
    published: true
  }
];

const categories = ['技术', '生活', '随笔', '教程'];
const commonTags = ['React', 'Next.js', 'JavaScript', 'TypeScript', '前端', '后端', '开发', '经验'];

interface EditBlogPageProps {
  params: Promise<{
    id: string;
  }>;
}

export default function EditBlogPage({ params }: EditBlogPageProps) {
  const { id } = use(params);
  const router = useRouter();
  const { isAuthenticated, isAdmin } = useGlobalStore();
  const [formData, setFormData] = useState({
    title: '',
    excerpt: '',
    content: '',
    category: '',
    tags: [] as string[],
    published: false
  });
  const [newTag, setNewTag] = useState('');
  const [isSaving, setIsSaving] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!isAuthenticated || !isAdmin()) {
      router.push('/login');
      return;
    }

    // 加载博客数据
    const loadBlogPost = async () => {
      try {
        // 模拟API调用
        const post = mockBlogPosts.find(p => p.id === parseInt(id));
        if (post) {
          setFormData({
            title: post.title,
            excerpt: post.excerpt,
            content: post.content || '',
            category: post.category,
            tags: post.tags,
            published: post.published
          });
        } else {
          router.push('/admin/blog');
        }
      } catch (error) {
        console.error('加载博客失败:', error);
        router.push('/admin/blog');
      } finally {
        setIsLoading(false);
      }
    };

    loadBlogPost();
  }, [id, isAuthenticated, isAdmin, router]);

  const handleInputChange = (field: string, value: string | boolean | string[]) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const addTag = (tag: string) => {
    if (tag && !formData.tags.includes(tag)) {
      setFormData(prev => ({
        ...prev,
        tags: [...prev.tags, tag]
      }));
    }
    setNewTag('');
  };

  const removeTag = (tagToRemove: string) => {
    setFormData(prev => ({
      ...prev,
      tags: prev.tags.filter(tag => tag !== tagToRemove)
    }));
  };

  const handleSave = async (publish: boolean = false) => {
    setIsSaving(true);
    
    try {
      const updatedPost = {
        ...formData,
        readTime: `${Math.ceil(formData.content.length / 500)} 分钟`,
        published: publish || formData.published
      };

      // 这里应该调用API更新博客
      console.log('更新博客:', updatedPost);
      
      // 模拟API调用
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      router.push('/admin/blog');
    } catch (error) {
      console.error('保存失败:', error);
    } finally {
      setIsSaving(false);
    }
  };

  if (!isAuthenticated || !isAdmin()) {
    return null;
  }

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">加载中...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <Link href="/admin/blog">
                <Button variant="outline" className="mb-4">
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  返回博客管理
                </Button>
              </Link>
              <h1 className="text-3xl font-bold text-gray-900 flex items-center">
                <FileText className="h-8 w-8 text-blue-600 mr-3" />
                编辑文章
              </h1>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" onClick={() => handleSave(false)} disabled={isSaving}>
                <Save className="h-4 w-4 mr-2" />
                保存草稿
              </Button>
              <Button onClick={() => handleSave(true)} disabled={isSaving}>
                <Eye className="h-4 w-4 mr-2" />
                更新并发布
              </Button>
            </div>
          </div>
        </div>

        {/* 表单内容与新建页面相同，这里省略重复代码 */}
        {/* ... 与新建页面相同的表单结构 ... */}
        
        <div className="grid lg:grid-cols-3 gap-8">
          {/* 主要内容 */}
          <div className="lg:col-span-2 space-y-6">
            {/* 基本信息 */}
            <Card>
              <CardHeader>
                <CardTitle>基本信息</CardTitle>
                <CardDescription>填写文章的基本信息</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="title">文章标题</Label>
                  <Input
                    id="title"
                    placeholder="输入文章标题"
                    value={formData.title}
                    onChange={(e) => handleInputChange('title', e.target.value)}
                  />
                </div>
                <div>
                  <Label htmlFor="excerpt">文章摘要</Label>
                  <Textarea
                    id="excerpt"
                    placeholder="输入文章摘要，简要描述文章内容"
                    value={formData.excerpt}
                    onChange={(e) => handleInputChange('excerpt', e.target.value)}
                    rows={3}
                  />
                </div>
              </CardContent>
            </Card>

            {/* 文章内容 */}
            <Card>
              <CardHeader>
                <CardTitle>文章内容</CardTitle>
                <CardDescription>使用 Markdown 格式编写文章内容</CardDescription>
              </CardHeader>
              <CardContent>
                <Textarea
                  placeholder="# 文章标题\n\n在这里使用 Markdown 格式编写您的文章内容...\n\n## 二级标题\n\n段落内容..."
                  value={formData.content}
                  onChange={(e) => handleInputChange('content', e.target.value)}
                  rows={20}
                  className="font-mono"
                />
              </CardContent>
            </Card>
          </div>

          {/* 侧边栏 */}
          <div className="space-y-6">
            {/* 发布设置 */}
            <Card>
              <CardHeader>
                <CardTitle>发布设置</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <Label htmlFor="published">立即发布</Label>
                  <Switch
                    id="published"
                    checked={formData.published}
                    onCheckedChange={(checked) => handleInputChange('published', checked)}
                  />
                </div>
              </CardContent>
            </Card>

            {/* 分类和标签 */}
            <Card>
              <CardHeader>
                <CardTitle>分类和标签</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="category">文章分类</Label>
                  <Select value={formData.category} onValueChange={(value) => handleInputChange('category', value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="选择分类" />
                    </SelectTrigger>
                    <SelectContent>
                      {categories.map((category) => (
                        <SelectItem key={category} value={category}>
                          {category}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                
                <div>
                  <Label>文章标签</Label>
                  <div className="flex gap-2 mt-2">
                    <Input
                      placeholder="添加标签"
                      value={newTag}
                      onChange={(e) => setNewTag(e.target.value)}
                      onKeyPress={(e) => {
                        if (e.key === 'Enter') {
                          e.preventDefault();
                          addTag(newTag);
                        }
                      }}
                    />
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={() => addTag(newTag)}
                    >
                      <Plus className="h-4 w-4" />
                    </Button>
                  </div>
                  
                  {/* 常用标签 */}
                  <div className="mt-3">
                    <Label className="text-sm text-gray-600">常用标签：</Label>
                    <div className="flex flex-wrap gap-1 mt-1">
                      {commonTags.map((tag) => (
                        <Badge
                          key={tag}
                          variant="outline"
                          className="cursor-pointer hover:bg-gray-100"
                          onClick={() => addTag(tag)}
                        >
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  
                  {/* 已选标签 */}
                  {formData.tags.length > 0 && (
                    <div className="mt-3">
                      <Label className="text-sm text-gray-600">已选标签：</Label>
                      <div className="flex flex-wrap gap-1 mt-1">
                        {formData.tags.map((tag) => (
                          <Badge key={tag} className="bg-blue-100 text-blue-800">
                            {tag}
                            <X
                              className="h-3 w-3 ml-1 cursor-pointer"
                              onClick={() => removeTag(tag)}
                            />
                          </Badge>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* 文章统计 */}
            <Card>
              <CardHeader>
                <CardTitle>文章统计</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>字符数：</span>
                  <span>{formData.content.length}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>预计阅读时间：</span>
                  <span>{Math.ceil(formData.content.length / 500)} 分钟</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>标签数量：</span>
                  <span>{formData.tags.length}</span>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}