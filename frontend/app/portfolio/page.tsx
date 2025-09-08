"use client";

import React, { useState, useMemo, useCallback, useRef } from "react";
import { useScroll, useTransform } from "framer-motion";
import { projects, categoryMap } from "@/lib/constants/portfolio";
import { ScrollProgress } from "@/components/common";
import {
  CategoryFilter,
  PortfolioHeader,
  ProjectGrid,
  PortfolioBackground,
  PortfolioCTA,
} from "@/components/portfolio";

// 常量定义
const PROJECTS_PER_PAGE = 3;

export default function PortfolioPage() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [selectedCategory, setSelectedCategory] = useState<string>("全部");
  const [currentPage, setCurrentPage] = useState(1);
  const [typingComplete, setTypingComplete] = useState(false);

  // 视差滚动效果
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const parallaxValues = {
    y1: useTransform(scrollYProgress, [0, 1], [0, -100]),
    y2: useTransform(scrollYProgress, [0, 1], [0, -150]),
    opacity: useTransform(scrollYProgress, [0, 0.5, 1], [1, 0.5, 0]),
  };

  // 使用useMemo优化过滤逻辑
  const filteredProjects = useMemo(() => {
    const mappedCategory =
      categoryMap[selectedCategory as keyof typeof categoryMap];
    if (mappedCategory === null) {
      return projects;
    }
    return projects.filter(project => project.category === mappedCategory);
  }, [selectedCategory]);

  // 使用useMemo优化分页计算
  const paginationData = useMemo(() => {
    const totalPages = Math.ceil(filteredProjects.length / PROJECTS_PER_PAGE);
    const startIndex = (currentPage - 1) * PROJECTS_PER_PAGE;
    const currentProjects = filteredProjects.slice(
      startIndex,
      startIndex + PROJECTS_PER_PAGE
    );

    return {
      totalPages,
      currentProjects,
    };
  }, [filteredProjects, currentPage]);

  // 使用useCallback优化事件处理函数
  const handlePageChange = useCallback((page: number) => {
    setCurrentPage(page);
    // 滚动到顶部
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  // 使用useCallback优化分类变化处理
  const handleCategoryChange = useCallback((category: string) => {
    setSelectedCategory(category);
    setCurrentPage(1); // 重置到第一页
  }, []);

  return (
    <div
      ref={containerRef}
      className="min-h-screen bg-white relative overflow-hidden"
    >
      {/* 滚动进度指示器 */}
      <ScrollProgress />

      {/* 背景光影效果 */}
      <PortfolioBackground parallaxValues={parallaxValues} />

      {/* 主要内容 */}
      <div className="relative z-10">
        {/* 标题区域 */}
        <PortfolioHeader
          typingComplete={typingComplete}
          onTypingComplete={() => setTypingComplete(true)}
          animationDuration={1000}
        />

        {/* 分类筛选 */}
        <CategoryFilter
          selectedCategory={selectedCategory}
          onCategoryChange={handleCategoryChange}
        />

        {/* 项目网格 */}
        <ProjectGrid
          projects={paginationData.currentProjects}
          selectedCategory={selectedCategory}
          currentPage={currentPage}
          totalPages={paginationData.totalPages}
          onPageChange={handlePageChange}
        />

        {/* CTA 区域 */}
        <PortfolioCTA />
      </div>
    </div>
  );
}
