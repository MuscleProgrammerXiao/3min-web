import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ArrowLeft, FileX } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-gray-50 py-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="bg-white rounded-lg shadow-sm p-12">
          <FileX className="h-16 w-16 text-gray-400 mx-auto mb-6" />
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            文章未找到
          </h1>
          <p className="text-gray-600 mb-8">
            抱歉，您访问的文章不存在或已被删除。
          </p>
          <div className="space-x-4">
            <Link href="/blog">
              <Button variant="outline">
                <ArrowLeft className="mr-2 h-4 w-4" />
                返回博客列表
              </Button>
            </Link>
            <Link href="/">
              <Button>
                回到首页
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}