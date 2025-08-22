'use client';

import { useEffect, useState } from 'react';

interface BlogContentProps {
  content: string;
}

export default function BlogContent({ content }: BlogContentProps) {
  const [processedContent, setProcessedContent] = useState('');

  useEffect(() => {
    // 简单的 Markdown 处理（实际项目中建议使用 react-markdown）
    const processMarkdown = (text: string) => {
      return text
        // 处理标题
        .replace(/^### (.*$)/gim, '<h3 class="text-xl font-semibold mt-8 mb-4 text-gray-900">$1</h3>')
        .replace(/^## (.*$)/gim, '<h2 class="text-2xl font-bold mt-10 mb-6 text-gray-900">$1</h2>')
        .replace(/^# (.*$)/gim, '<h1 class="text-3xl font-bold mt-12 mb-8 text-gray-900">$1</h1>')
        // 处理代码块
        .replace(/```([\s\S]*?)```/g, '<pre class="bg-gray-100 rounded-lg p-4 my-6 overflow-x-auto"><code class="text-sm">$1</code></pre>')
        // 处理行内代码
        .replace(/`([^`]+)`/g, '<code class="bg-gray-100 px-2 py-1 rounded text-sm font-mono">$1</code>')
        // 处理粗体
        .replace(/\*\*(.*?)\*\*/g, '<strong class="font-semibold">$1</strong>')
        // 处理斜体
        .replace(/\*(.*?)\*/g, '<em class="italic">$1</em>')
        // 处理链接
        .replace(/\[([^\]]+)\]\(([^\)]+)\)/g, '<a href="$2" class="text-blue-600 hover:text-blue-800 underline">$1</a>')
        // 处理列表
        .replace(/^- (.*$)/gim, '<li class="ml-4 mb-2">• $1</li>')
        // 处理段落
        .replace(/\n\n/g, '</p><p class="mb-4">')
        // 处理换行
        .replace(/\n/g, '<br />');
    };

    setProcessedContent(processMarkdown(content));
  }, [content]);

  return (
    <div 
      className="prose prose-lg max-w-none"
      dangerouslySetInnerHTML={{ __html: `<p class="mb-4">${processedContent}</p>` }}
    />
  );
}