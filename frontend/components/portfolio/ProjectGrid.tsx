"use client";

import React from "react";
import { motion } from "framer-motion";
import { AnimatedSection } from "@/components/common";
import BlogPagination from "@/components/blog/BlogPagination";
import ProjectCard from "./ProjectCard";
import { type Project } from "@/lib/constants/portfolio";

interface ProjectGridProps {
  projects: Project[];
  selectedCategory: string;
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

const ProjectGrid = React.memo(({ 
  projects, 
  selectedCategory, 
  currentPage, 
  totalPages, 
  onPageChange 
}: ProjectGridProps) => {
  return (
    <AnimatedSection id="projects-section" className="px-4 pb-20">
      <div className="max-w-6xl mx-auto">
        <motion.div
          key={`${selectedCategory}-${currentPage}`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 min-h-[600px] projects-grid"
        >
          {projects.map((project, index) => (
            <ProjectCard
              key={`${project.id}-${selectedCategory}`}
              project={project}
              index={index}
            />
          ))}
        </motion.div>
        
        {/* 分页组件 */}
        {totalPages > 1 && (
          <div className="mt-12">
            <BlogPagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={onPageChange}
            />
          </div>
        )}
      </div>
    </AnimatedSection>
  );
});

ProjectGrid.displayName = "ProjectGrid";

export default ProjectGrid;