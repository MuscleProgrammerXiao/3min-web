"use client";

import { Mail, Phone, Download } from "lucide-react";

export default function ContactPage() {
  return (
    <div className="pt-22">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">联系我</h1>
          <p className="text-xl text-gray-600">
            欢迎与我交流，期待听到您的想法
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-12">
          {/* 联系方式 */}
          <div>
            <h2 className="text-2xl font-semibold mb-6">联系方式</h2>
            <div className="space-y-4">
              <a
                href="mailto:895422334@qq.com"
                className="flex items-center gap-3 hover:text-blue-600 transition-colors"
              >
                <Mail className="h-5 w-5 text-blue-600" />
                895422334@qq.com
              </a>
              <a
                href="tel:18598039775"
                className="flex items-center gap-3 hover:text-blue-600 transition-colors"
              >
                <Phone className="h-5 w-5 text-blue-700" />
                185 9803 9775
              </a>
            </div>
          </div>
          {/* 关于我 */}
          <div>
            <h2 className="text-2xl font-semibold mb-6">关于我</h2>
            <p className="text-gray-600 leading-relaxed">
              我是一名前端开发工程师兼产品经理，擅长将业务目标与用户体验连接起来。
            </p>
            <p className="text-gray-600 leading-relaxed mt-3">
              前端方向：专注
              React/Next.js、组件化设计、工程化与性能优化、可访问性。
              产品方向：负责需求分析、原型与交互设计、数据驱动迭代（指标埋点与
              A/B 测试）、项目推进与跨团队协作。
            </p>
          </div>
        </div>

        {/* 更多信息 */}
        <div className="mt-6 grid md:grid-cols-2 gap-12">
          <div>
            <h3 className="text-lg font-semibold mb-3">我能提供的帮助</h3>
            <ul className="list-disc pl-5 text-gray-600 space-y-2">
              <li>前端工程：React/Next.js、TypeScript、组件库搭建、SSR/SSG </li>
              <li>交互与设计：信息架构、交互原型、设计系统落地</li>
              <li>产品与增长：需求拆解、数据埋点与漏斗分析、转化提升</li>
              <li>项目偏好：B 端系统、内容站、AI 辅助工具、数据可视化</li>
            </ul>
          </div>
          <div className="flex flex-wrap gap-2 sm:gap-3">
            <a
              href="/resume/frontend-developer.pdf"
              className="inline-flex items-center justify-center gap-2 h-10 md:h-11 px-4 rounded-md bg-black text-white hover:bg-gray-900 text-sm md:text-base md:min-w-[180px]"
              target="_blank"
              rel="noopener noreferrer"
              download
              aria-label="下载前端开发简历PDF"
            >
              <Download className="h-4 w-4" /> 前端开发简历（PDF）
            </a>
            <a
              href="/resume/product-manager.pdf"
              className="inline-flex items-center justify-center gap-2 h-10 md:h-11 px-4 rounded-md bg-black text-white hover:bg-gray-900 text-sm md:text-base md:min-w-[180px]"
              target="_blank"
              rel="noopener noreferrer"
              download
              aria-label="下载产品经理简历PDF"
            >
              <Download className="h-4 w-4" /> 产品经理简历（PDF）
            </a>
          </div>
        </div>

        {/* 快速联系 CTA */}
        <div className="my-12 rounded-lg border p-5 bg-gray-50 text-gray-700 shadow-sm">
          <p className="mb-4 text-base font-semibold">更快联系</p>
          <div className="flex flex-wrap gap-2 sm:gap-3">
            <a
              href="mailto:895422334@qq.com?subject=合作咨询"
              className="inline-flex items-center justify-center gap-2 h-10 md:h-11 px-4 rounded-md bg-blue-600 text-white hover:bg-blue-700 text-sm md:text-base md:min-w-[180px]"
            >
              <Mail className="h-4 w-4" /> 邮件联系
            </a>
            <a
              href="tel:18598039775"
              className="inline-flex items-center justify-center gap-2 h-10 md:h-11 px-4 rounded-md border border-gray-300 hover:bg-gray-100 text-sm md:text-base md:min-w-[180px]"
            >
              <Phone className="h-4 w-4" /> 电话联系
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
