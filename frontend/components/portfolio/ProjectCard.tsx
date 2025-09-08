"use client";

import React, { useMemo, useRef } from "react";
import Link from "next/link";
import { motion, useInView } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/common";
import { categoryDisplayNames, type Project } from "@/lib/constants/portfolio";
import {
  ExternalLink,
  Github,
  Code,
  Palette,
  Smartphone,
} from "lucide-react";

interface ProjectCardProps {
  project: Project;
  index: number;
}

const ProjectCard = React.memo(({ project, index }: ProjectCardProps) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(cardRef, {
    once: true,
    margin: "-50px",
    amount: 0.3,
  });

  const cardStyle = useMemo(
    () =>
      ({
        "--delay": `${index * 0.1}s`,
        "--index": index,
      }) as React.CSSProperties,
    [index]
  );

  const CategoryIcon = useMemo(() => {
    switch (project.category) {
      case "web":
        return <Code className="h-3.5 w-3.5 text-blue-600" />;
      case "design":
        return <Palette className="h-3.5 w-3.5 text-purple-600" />;
      case "mobile":
        return <Smartphone className="h-3.5 w-3.5 text-green-600" />;
      default:
        return <Code className="h-3.5 w-3.5 text-blue-600" />;
    }
  }, [project.category]);

  const CategoryIconLarge = useMemo(() => {
    switch (project.category) {
      case "web":
        return <Code className="h-5 w-5 text-blue-600" />;
      case "design":
        return <Palette className="h-5 w-5 text-purple-600" />;
      case "mobile":
        return <Smartphone className="h-5 w-5 text-green-600" />;
      default:
        return <Code className="h-5 w-5 text-blue-600" />;
    }
  }, [project.category]);

  return (
    <motion.div
      ref={cardRef}
      className="project-card group cursor-pointer"
      style={cardStyle}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
      transition={{
        duration: 0.6,
        delay: index * 0.1,
        ease: "easeOut",
      }}
    >
      <Card className="h-[500px] border-0 bg-white overflow-hidden hover:shadow-2xl transition-all duration-500 relative rounded-2xl group-hover:scale-[1.02] flex flex-col">
        {/* 主背景图片区域 */}
        {project.image && (
          <div className="relative h-48 overflow-hidden rounded-t-2xl">
            <div
              className="absolute inset-0 bg-cover bg-center bg-no-repeat transform group-hover:scale-110 transition-transform duration-700"
              style={{ backgroundImage: `url(${project.image})` }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />

            {/* 分类标签浮动在图片上 */}
            <div className="absolute top-4 left-4 flex items-center gap-2 bg-white/90 backdrop-blur-sm px-3 py-1.5 rounded-full">
              <div className="transition-transform duration-300 group-hover:rotate-12">
                {CategoryIcon}
              </div>
              <span className="text-xs font-medium text-gray-700">
                {categoryDisplayNames[project.category]}
              </span>
            </div>

            {/* 项目标题在图片底部 */}
            <div className="absolute bottom-4 left-4 right-4">
              <h3 className="text-xl font-bold text-white mb-1 group-hover:text-blue-200 transition-colors duration-300">
                {project.title}
              </h3>
            </div>
          </div>
        )}

        {/* 内容区域 */}
        <CardContent className="p-6 flex flex-col flex-1">
          {/* 无背景图时的标题区域 */}
          {!project.image && (
            <div className="mb-4">
              <div className="flex items-center gap-3 mb-3">
                <div className="p-2 rounded-lg bg-gray-100 group-hover:bg-blue-100 transition-colors duration-300">
                  {CategoryIconLarge}
                </div>
                <span className="text-sm font-medium text-gray-500">
                  {categoryDisplayNames[project.category]}
                </span>
              </div>
              <h3 className="text-xl font-bold text-gray-900 group-hover:text-blue-600 transition-colors duration-300">
                {project.title}
              </h3>
            </div>
          )}

          {/* 项目描述 */}
          <p className="text-gray-600 text-sm leading-relaxed mb-6 line-clamp-3">
            {project.description}
          </p>

          {/* 技术标签 - 显示所有标签，自动填满宽度 */}
          <div className="flex flex-wrap gap-2 mb-6">
            {project.technologies.map((tech: string) => (
              <span
                key={tech}
                className="flex-1 min-w-fit px-3 py-1.5 bg-gradient-to-r from-blue-50 to-purple-50 text-gray-700 text-xs font-medium rounded-full border border-gray-200 hover:border-blue-300 hover:shadow-sm transition-all duration-200 text-center"
              >
                {tech}
              </span>
            ))}
          </div>

          {/* 操作按钮 */}
          <div className="flex gap-3 mt-auto">
            <Button
              variant="outline"
              size="sm"
              asChild
              className="flex-1 border-gray-300 hover:border-blue-400 hover:bg-blue-50 hover:text-blue-700 transition-all duration-300 rounded-lg"
            >
              <Link
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Github className="h-4 w-4 mr-2" />
                源码
              </Link>
            </Button>

            <Button
              size="sm"
              asChild
              className="flex-1 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white shadow-lg hover:shadow-xl transition-all duration-300 rounded-lg"
            >
              <Link
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
              >
                <ExternalLink className="h-4 w-4 mr-2" />
                预览
              </Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
});

ProjectCard.displayName = "ProjectCard";

export default ProjectCard;