"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useGlobalStore } from "@/lib/store";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Save, Eye, ArrowLeft, Plus, X, FileText } from "lucide-react";
import { BlogPost, BlogCategory } from "@/lib/types/blog";
import Link from "next/link";
import dynamic from "next/dynamic";

const categories = ["技术", "生活", "随笔", "教程"];
const commonTags = [
  "React",
  "Next.js",
  "JavaScript",
  "TypeScript",
  "前端",
  "后端",
  "开发",
  "经验",
];

export default function NewBlogPage() {
  const router = useRouter();
  const { isAuthenticated, isAdmin, user } = useGlobalStore();
  const [formData, setFormData] = useState({
    title: "",
    excerpt: "",
    content: "",
    category: "",
    tags: [] as string[],
    published: false,
  });
  const [newTag, setNewTag] = useState("");
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    if (!isAuthenticated || !isAdmin()) {
      router.push("/login");
    }
  }, [isAuthenticated, isAdmin, router]);

  const handleInputChange = (
    field: string,
    value: string | boolean | string[]
  ) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const addTag = (tag: string) => {
    if (tag && !formData.tags.includes(tag)) {
      setFormData(prev => ({
        ...prev,
        tags: [...prev.tags, tag],
      }));
    }
    setNewTag("");
  };

  const removeTag = (tagToRemove: string) => {
    setFormData(prev => ({
      ...prev,
      tags: prev.tags.filter(tag => tag !== tagToRemove),
    }));
  };

  const generateSlug = (title: string) => {
    return title
      .toLowerCase()
      .replace(/[^a-z0-9\u4e00-\u9fa5]+/g, "-")
      .replace(/^-+|-+$/g, "");
  };

  const handleSave = async (publish: boolean = false) => {
    setIsSaving(true);

    try {
      const blogPost: Partial<BlogPost> = {
        title: formData.title,
        excerpt: formData.excerpt,
        content: formData.content,
        category: formData.category as BlogCategory,
        tags: formData.tags,
        slug: generateSlug(formData.title),
        author: user?.name || "3min",
        date: new Date().toISOString().split("T")[0],
        readTime: `${Math.ceil(formData.content.length / 500)} 分钟`,
        published: publish || formData.published,
      };

      // 这里应该调用API保存博客
      console.log("保存博客:", blogPost);

      // 模拟API调用
      await new Promise(resolve => setTimeout(resolve, 1000));

      router.push("/admin/blog");
    } catch (error) {
      console.error("保存失败:", error);
    } finally {
      setIsSaving(false);
    }
  };

  if (!isAuthenticated || !isAdmin()) {
    return null;
  }

  return (
    <div className="py-4 md:py-6">
      {/* 移动端优化：减少容器内边距，调整最大宽度 */}
      <div className="max-w-7xl mx-auto px-2 sm:px-4 lg:px-6">
        {/* Header - 移动端优化 */}
        <div className="mb-4 md:mb-6">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <Link href="/admin/blog">
                <Button
                  variant="outline"
                  className="mb-3 md:mb-4 w-full sm:w-auto"
                >
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  返回博客管理
                </Button>
              </Link>
              <h1 className="text-2xl md:text-3xl font-bold text-gray-900 flex items-center">
                <FileText className="h-6 w-6 md:h-8 md:w-8 text-blue-600 mr-2 md:mr-3" />
                新建文章
              </h1>
            </div>
            {/* 移动端按钮布局优化 */}
            <div className="flex flex-col sm:flex-row gap-2 w-full sm:w-auto">
              <Button
                variant="outline"
                onClick={() => handleSave(false)}
                disabled={isSaving}
                className="w-full sm:w-auto"
              >
                <Save className="h-4 w-4 mr-2" />
                保存草稿
              </Button>
              <Button
                onClick={() => handleSave(true)}
                disabled={isSaving}
                className="w-full sm:w-auto"
              >
                <Eye className="h-4 w-4 mr-2" />
                发布文章
              </Button>
            </div>
          </div>
        </div>

        {/* 响应式网格布局 */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-4 md:gap-6">
          {/* 主要内容 - 移动端全宽，桌面端4列 */}
          <div className="lg:col-span-4 space-y-4 md:space-y-6">
            {/* 基本信息 */}
            <Card>
              <CardHeader className="pb-3 md:pb-4">
                <CardTitle className="text-lg md:text-xl">基本信息</CardTitle>
                <CardDescription className="text-sm">
                  填写文章的基本信息
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-3 md:space-y-4">
                <div>
                  <Label htmlFor="title" className="text-sm font-medium">
                    文章标题
                  </Label>
                  <Input
                    id="title"
                    placeholder="输入文章标题"
                    value={formData.title}
                    onChange={e => handleInputChange("title", e.target.value)}
                    className="mt-1"
                  />
                </div>
                <div>
                  <Label htmlFor="excerpt" className="text-sm font-medium">
                    文章摘要
                  </Label>
                  <Textarea
                    id="excerpt"
                    placeholder="输入文章摘要，简要描述文章内容"
                    value={formData.excerpt}
                    onChange={e => handleInputChange("excerpt", e.target.value)}
                    rows={3}
                    className="mt-1 resize-none"
                  />
                </div>
              </CardContent>
            </Card>

            {/* 文章内容 - 移动端优化 */}
            <Card>
              <CardHeader className="pb-3 md:pb-4">
                <CardTitle className="text-lg md:text-xl">文章内容</CardTitle>
                <CardDescription className="text-sm">
                  使用 Markdown 编辑器编写文章内容，支持实时预览
                </CardDescription>
              </CardHeader>
              <CardContent className="p-0">
                <div className="markdown-editor-container">
                  <MDEditor
                    value={formData.content}
                    onChange={value =>
                      handleInputChange("content", value || "")
                    }
                    preview="edit"
                    hideToolbar={false}
                    textareaProps={{
                      placeholder:
                        "# 文章标题\n\n在这里使用 Markdown 格式编写您的文章内容...\n\n## 二级标题\n\n段落内容...",
                      style: {
                        fontSize: window.innerWidth < 768 ? 12 : 14,
                        lineHeight: 1.6,
                        fontFamily:
                          'ui-monospace, SFMono-Regular, "SF Mono", Consolas, "Liberation Mono", Menlo, monospace',
                      },
                    }}
                    height={window.innerWidth < 768 ? 400 : 600}
                    data-color-mode="light"
                  />
                </div>
              </CardContent>
            </Card>
          </div>

          {/* 侧边栏 - 移动端在下方显示 */}
          <div className="space-y-3 md:space-y-4 order-first lg:order-last">
            {/* 发布设置 */}
            <Card>
              <CardHeader className="pb-2 md:pb-3">
                <CardTitle className="text-base md:text-lg">发布设置</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2 md:space-y-3">
                <div className="flex items-center justify-between">
                  <Label htmlFor="published" className="text-sm">
                    立即发布
                  </Label>
                  <Switch
                    id="published"
                    checked={formData.published}
                    onCheckedChange={checked =>
                      handleInputChange("published", checked)
                    }
                  />
                </div>
              </CardContent>
            </Card>

            {/* 分类和标签 */}
            <Card>
              <CardHeader className="pb-2 md:pb-3">
                <CardTitle className="text-base md:text-lg">
                  分类和标签
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-2 md:space-y-3">
                <div>
                  <Label htmlFor="category" className="text-sm font-medium">
                    文章分类
                  </Label>
                  <Select
                    value={formData.category}
                    onValueChange={value =>
                      handleInputChange("category", value)
                    }
                  >
                    <SelectTrigger className="mt-1">
                      <SelectValue placeholder="选择分类" />
                    </SelectTrigger>
                    <SelectContent>
                      {categories.map(category => (
                        <SelectItem key={category} value={category}>
                          {category}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label className="text-sm font-medium">文章标签</Label>
                  <div className="flex gap-2 mt-1">
                    <Input
                      placeholder="添加标签"
                      value={newTag}
                      onChange={e => setNewTag(e.target.value)}
                      onKeyPress={e => {
                        if (e.key === "Enter") {
                          e.preventDefault();
                          addTag(newTag);
                        }
                      }}
                      className="text-sm flex-1"
                    />
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={() => addTag(newTag)}
                      className="shrink-0"
                    >
                      <Plus className="h-4 w-4" />
                    </Button>
                  </div>

                  {/* 常用标签 - 移动端优化 */}
                  <div className="mt-2">
                    <Label className="text-xs text-gray-600">常用标签：</Label>
                    <div className="flex flex-wrap gap-1 mt-1">
                      {commonTags.map(tag => (
                        <Badge
                          key={tag}
                          variant="outline"
                          className="cursor-pointer hover:bg-gray-100 text-xs px-2 py-1"
                          onClick={() => addTag(tag)}
                        >
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  {/* 已选标签 */}
                  {formData.tags.length > 0 && (
                    <div className="mt-2">
                      <Label className="text-xs text-gray-600">
                        已选标签：
                      </Label>
                      <div className="flex flex-wrap gap-1 mt-1">
                        {formData.tags.map(tag => (
                          <Badge
                            key={tag}
                            className="bg-blue-100 text-blue-800 text-xs px-2 py-1"
                          >
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
              <CardHeader className="pb-2 md:pb-3">
                <CardTitle className="text-base md:text-lg">文章统计</CardTitle>
              </CardHeader>
              <CardContent className="space-y-1 md:space-y-2">
                <div className="flex justify-between text-sm">
                  <span>字符数：</span>
                  <span className="font-medium">{formData.content.length}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>预计阅读时间：</span>
                  <span className="font-medium">
                    {Math.ceil(formData.content.length / 500)} 分钟
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>标签数量：</span>
                  <span className="font-medium">{formData.tags.length}</span>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}

// 动态导入MDEditor以避免SSR问题
const MDEditor = dynamic(() => import("@uiw/react-md-editor"), { ssr: false });
