"use client";

import React from "react";
import { AnimatedSection, TypewriterText } from "@/components/common";
import PortfolioStats from "./PortfolioStats";

interface PortfolioHeaderProps {
  typingComplete: boolean;
  onTypingComplete: () => void;
  animationDuration: number;
}

const PortfolioHeader = React.memo(
  ({
    typingComplete,
    onTypingComplete,
    animationDuration,
  }: PortfolioHeaderProps) => {
    const titleShadowStyle = {
      textShadow: `
      2px 2px 4px rgba(0, 0, 0, 0.1),
      4px 4px 8px rgba(0, 0, 0, 0.08),
      6px 6px 12px rgba(0, 0, 0, 0.06),
      8px 8px 16px rgba(0, 0, 0, 0.04)
    `,
    };

    return (
      <AnimatedSection className="pt-32 pb-20 px-4 text-center">
        <div className="max-w-4xl mx-auto">
          {/* 主标题 - 增强黑色光影效果 */}
          <div className="relative mb-8">
            <h1
              className="text-6xl md:text-7xl lg:text-8xl font-light text-gray-900 mb-6 relative z-10"
              style={titleShadowStyle}
            >
              我的作品
            </h1>
          </div>

          {/* 副标题 */}
          <div className="mb-8">
            <TypewriterText
              text="探索创意与技术的完美融合"
              onComplete={onTypingComplete}
            />
          </div>
          {/* 统计信息 */}
          <PortfolioStats
            typingComplete={typingComplete}
            animationDuration={animationDuration}
          />
        </div>
      </AnimatedSection>
    );
  }
);

PortfolioHeader.displayName = "PortfolioHeader";

export default PortfolioHeader;
