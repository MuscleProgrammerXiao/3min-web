"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { AnimatedSection } from "@/components/common";
import { categories } from "@/lib/constants/portfolio";

interface CategoryFilterProps {
  selectedCategory: string;
  onCategoryChange: (category: string) => void;
}

const CategoryFilter = React.memo(
  ({ selectedCategory, onCategoryChange }: CategoryFilterProps) => {
    return (
      <AnimatedSection className="px-4 mb-16">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-wrap justify-center gap-4">
            {categories.map(category => (
              <Button
                key={category}
                variant={selectedCategory === category ? "default" : "outline"}
                onClick={() => onCategoryChange(category)}
                className={`
                px-6 py-2 transition-all duration-300
                ${
                  selectedCategory === category
                    ? "bg-gray-900 text-white hover:bg-gray-800 shadow-lg"
                    : "border-gray-300 text-gray-700 hover:bg-gray-50 hover:border-gray-400"
                }
              `}
              >
                {category}
              </Button>
            ))}
          </div>
        </div>
      </AnimatedSection>
    );
  }
);

CategoryFilter.displayName = "CategoryFilter";

export default CategoryFilter;
