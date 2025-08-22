'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useGlobalStore } from '@/lib/store'
import { Button } from '@/components/ui/button'
import { 
  Shield, 
  FileText, 
  Eye,
  Edit,
  Trash2
} from 'lucide-react'

export default function AdminPage() {
  const router = useRouter()
  const { isAuthenticated, isAdmin, user } = useGlobalStore()

  useEffect(() => {
    // 权限检查
    if (!isAuthenticated || !isAdmin()) {
      router.push('/login')
    }
  }, [isAuthenticated, isAdmin, router])

  // 如果不是管理员，不渲染内容
  if (!isAuthenticated || !isAdmin()) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <Shield className="h-16 w-16 text-gray-400 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-900 mb-2">访问受限</h2>
          <p className="text-gray-600 mb-4">您需要管理员权限才能访问此页面</p>
          <Button onClick={() => router.push('/login')}>前往登录</Button>
        </div>
      </div>
    )
  }

  const recentPosts = [
    { id: 1, title: 'Next.js 15 新特性解析', status: '已发布', date: '2024-01-15' },
    { id: 2, title: 'React 状态管理最佳实践', status: '草稿', date: '2024-01-10' },
    { id: 3, title: '个人网站开发心得', status: '已发布', date: '2024-01-05' }
  ]

  return (
    <div className="py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 flex items-center">
                <Shield className="h-8 w-8 text-red-600 mr-3" />
                管理后台
              </h1>
              <p className="text-gray-600 mt-2">欢迎回来，{user?.name}</p>
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Recent Posts */}
          <div className="bg-white rounded-lg shadow-md">
            <div className="p-6 border-b border-gray-200">
              <h2 className="text-xl font-semibold text-gray-900">最近文章</h2>
            </div>
            <div className="p-6">
              <div className="space-y-4">
                {recentPosts.map((post) => (
                  <div key={post.id} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                    <div>
                      <h3 className="font-medium text-gray-900">{post.title}</h3>
                      <div className="flex items-center space-x-4 mt-1">
                        <span className={`px-2 py-1 text-xs rounded-full ${
                          post.status === '已发布' 
                            ? 'bg-green-100 text-green-800' 
                            : 'bg-yellow-100 text-yellow-800'
                        }`}>
                          {post.status}
                        </span>
                        <span className="text-sm text-gray-500">{post.date}</span>
                      </div>
                    </div>
                    <div className="flex space-x-2">
                      <Button variant="ghost" size="sm">
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="sm">
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="sm">
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="bg-white rounded-lg shadow-md">
            <div className="p-6 border-b border-gray-200">
              <h2 className="text-xl font-semibold text-gray-900">快速操作</h2>
            </div>
            <div className="p-6">
              <div className="grid grid-cols-1 gap-4">
                <Button 
                  variant="outline" 
                  className="h-20 flex flex-col items-center justify-center"
                  onClick={() => router.push('/admin/blog/new')}
                >
                  <FileText className="h-6 w-6 mb-2" />
                  <span className="text-sm">新建文章</span>
                </Button>
                <Button 
                  variant="outline" 
                  className="h-20 flex flex-col items-center justify-center"
                  onClick={() => router.push('/admin/blog')}
                >
                  <FileText className="h-6 w-6 mb-2" />
                  <span className="text-sm">博客管理</span>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}