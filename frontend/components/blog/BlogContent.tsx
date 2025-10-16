'use client';

import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

interface BlogContentProps {
  content: string;
}

export default function BlogContent({ content }: BlogContentProps) {
  return (
    <ReactMarkdown
      remarkPlugins={[remarkGfm]}
      components={{
        h1: ({ children }: any) => (
          <h1 className="mt-12 mb-8 font-bold text-gray-900">{children}</h1>
        ),
        h2: ({ children }: any) => (
          <h2 className="mt-10 mb-6 font-bold text-gray-900">{children}</h2>
        ),
        h3: ({ children }: any) => (
          <h3 className="mt-8 mb-4 font-semibold text-gray-900">{children}</h3>
        ),
        p: ({ children }: any) => (
          <p className="mb-4 leading-relaxed">{children}</p>
        ),
        a: ({ children, href }: any) => (
          <a href={href ?? ''} className="text-blue-600 hover:text-blue-800 underline">
            {children}
          </a>
        ),
        ul: ({ children }: any) => (
          <ul className="list-disc pl-6 mb-4">{children}</ul>
        ),
        li: ({ children }: any) => <li className="mb-1">{children}</li>,
        code: ({ inline, children }: any) =>
          inline ? (
            <code className="bg-gray-100 px-2 py-1 rounded text-sm font-mono">{children}</code>
          ) : (
            <pre className="bg-gray-100 rounded-lg p-4 my-6 overflow-x-auto">
              <code className="text-sm">{children}</code>
            </pre>
          ),
        img: ({ alt, src }: any) => (
          <img
            src={src ?? ''}
            alt={alt ?? ''}
            className="w-full max-h-96 object-cover rounded-lg shadow-sm my-4"
            loading="lazy"
          />
        ),
      }}
    >
      {content}
    </ReactMarkdown>
  );
}