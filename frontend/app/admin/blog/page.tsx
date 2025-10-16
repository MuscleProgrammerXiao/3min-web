'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useGlobalStore } from '@/lib/store';
import { useBlogStore } from '@/lib/stores/blog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import {
  Plus,
  Search,
  Filter,
  MoreHorizontal,
  Trash2,
  Eye,
  FileText,
  Calendar,
  User
} from 'lucide-react';
import { BlogPost } from '@/lib/types/blog';
import Link from 'next/link';


export default function AdminBlogPage() {
  const router = useRouter();
  const { isAuthenticated, isAdmin } = useGlobalStore();
  const { posts, updatePost, deletePost } = useBlogStore();
  const [filteredPosts, setFilteredPosts] = useState<BlogPost[]>(posts);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<'all' | 'published' | 'draft'>('all');
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [postToDelete, setPostToDelete] = useState<BlogPost | null>(null);

  useEffect(() => {
    if (!isAuthenticated || !isAdmin()) {
      router.push('/login');
    }
  }, [isAuthenticated, isAdmin, router]);

  // 搜索和筛选逻辑
  useEffect(() => {
    let filtered = posts;

    // 按搜索关键词筛选
    if (searchQuery) {
      filtered = filtered.filter(post =>
        post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
      );
    }

    // 按发布状态筛选
    if (statusFilter !== 'all') {
      filtered = filtered.filter(post =>
        statusFilter === 'published' ? post.published : !post.published
      );
    }

    setFilteredPosts(filtered);
  }, [posts, searchQuery, statusFilter]);

  const handleDeletePost = (post: BlogPost) => {
    setPostToDelete(post);
    setDeleteDialogOpen(true);
  };

  const confirmDelete = () => {
    if (postToDelete) {
      deletePost(postToDelete.id);
      setDeleteDialogOpen(false);
      setPostToDelete(null);
    }
  };

  const togglePublishStatus = (postId: number) => {
    const current = posts.find(p => p.id === postId)?.published ?? false;
    updatePost(postId, { published: !current });
  };

  if (!isAuthenticated || !isAdmin()) {
    return null;
  }

  return (
    <div className="py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 flex items-center">
                <FileText className="h-8 w-8 text-blue-600 mr-3" />
                博客管理
              </h1>
              <p className="text-gray-600 mt-2">管理您的博客文章，发布新内容</p>
            </div>
            <Link href="/admin/blog/new">
              <Button>
                <Plus className="h-4 w-4 mr-2" />
                新建文章
              </Button>
            </Link>
          </div>
        </div>

        {/* 搜索和筛选 */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                  placeholder="搜索文章标题、内容或标签..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <div className="flex gap-2">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline">
                    <Filter className="h-4 w-4 mr-2" />
                    状态筛选
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuItem onClick={() => setStatusFilter('all')}>
                    全部
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setStatusFilter('published')}>
                    已发布
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setStatusFilter('draft')}>
                    草稿
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </div>

        {/* 博客列表 */}
        <div className="bg-white rounded-lg shadow-sm">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>标题</TableHead>
                <TableHead>分类</TableHead>
                <TableHead>状态</TableHead>
                <TableHead>发布日期</TableHead>
                <TableHead>作者</TableHead>
                <TableHead className="text-right">操作</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredPosts.map((post) => (
                <TableRow key={post.id}>
                  <TableCell>
                    <div>
                      <div className="font-medium text-gray-900">{post.title}</div>
                      <div className="text-sm text-gray-500 mt-1 line-clamp-2">
                        {post.excerpt}
                      </div>
                      <div className="flex gap-1 mt-2">
                        {post.tags.map((tag) => (
                          <Badge key={tag} variant="outline" className="text-xs">
                            {tag}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant="secondary">{post.category}</Badge>
                  </TableCell>
                  <TableCell>
                    <Badge
                      variant={post.published ? "default" : "secondary"}
                      className={post.published ? "bg-green-100 text-green-800" : "bg-yellow-100 text-yellow-800"}
                    >
                      {post.published ? '已发布' : '草稿'}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center text-sm text-gray-500">
                      <Calendar className="h-4 w-4 mr-1" />
                      {new Date(post.date).toLocaleDateString('zh-CN')}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center text-sm text-gray-500">
                      <User className="h-4 w-4 mr-1" />
                      {post.author}
                    </div>
                  </TableCell>
                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem asChild>
                          <Link href={`/blog/${post.slug}`}>
                            <Eye className="h-4 w-4 mr-2" />
                            预览
                          </Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          onClick={() => togglePublishStatus(post.id)}
                        >
                          {post.published ? '取消发布' : '发布'}
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          onClick={() => handleDeletePost(post)}
                          className="text-red-600"
                        >
                          <Trash2 className="h-4 w-4 mr-2" />
                          删除
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>

          {filteredPosts.length === 0 && (
            <div className="text-center py-12">
              <FileText className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">暂无文章</h3>
              <p className="text-gray-500 mb-4">还没有符合条件的文章</p>
              <Link href="/admin/blog/new">
                <Button>
                  <Plus className="h-4 w-4 mr-2" />
                  创建第一篇文章
                </Button>
              </Link>
            </div>
          )}
        </div>

        {/* 删除确认对话框 */}
        <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>确认删除</AlertDialogTitle>
              <AlertDialogDescription>
                您确定要删除文章 &quot;{postToDelete?.title}&quot; 吗？此操作无法撤销。
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>取消</AlertDialogCancel>
              <AlertDialogAction onClick={confirmDelete} className="bg-red-600 hover:bg-red-700">
                删除
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    </div>
  );
}