"use client";

import React from "react";
import { motion } from "framer-motion";
import { portfolioStats } from "@/lib/constants/portfolio";

interface PortfolioStatsProps {
  typingComplete: boolean;
  animationDuration: number;
}

const PortfolioStats = React.memo(
  ({ typingComplete, animationDuration }: PortfolioStatsProps) => {
    const textShadowStyle = {
      textShadow: `
      1px 1px 2px rgba(0, 0, 0, 0.1),
      2px 2px 4px rgba(0, 0, 0, 0.08),
      3px 3px 6px rgba(0, 0, 0, 0.06)
    `,
    };

    const statsData = [
      {
        value: `${portfolioStats.totalProjects}+`,
        label: "完成项目",
      },
      {
        value: `${portfolioStats.techFields}+`,
        label: "技术领域",
      },
      {
        value: `${portfolioStats.experienceYears}+`,
        label: "经验年限",
      },
    ];

    return (
      <motion.div
        initial={{ opacity: 1, y: 0 }}
        className="grid grid-cols-3 md:grid-cols-3 gap-8 max-w-2xl mx-auto"
      >
        {statsData.map((stat, index) => (
          <div key={index} className="text-center">
            <div
              className="text-4xl md:text-5xl font-bold text-black mb-3"
              style={textShadowStyle}
            >
              {stat.value}
            </div>
            <div className="text-gray-800 text-base font-medium">
              {stat.label}
            </div>
          </div>
        ))}
      </motion.div>
    );
  }
);

PortfolioStats.displayName = "PortfolioStats";

export default PortfolioStats;
