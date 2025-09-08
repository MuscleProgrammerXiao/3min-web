"use client";

import React from "react";
import { motion } from "framer-motion";

interface PortfolioBackgroundProps {
  parallaxValues: {
    y1: any;
    y2: any;
    opacity: any;
  };
}

const PortfolioBackground = React.memo(
  ({ parallaxValues }: PortfolioBackgroundProps) => {
    return (
      <div className="absolute inset-0 pointer-events-none">
        {/* 背景光影效果 - 添加视差 */}
        <motion.div
          style={{ y: parallaxValues.y1, opacity: parallaxValues.opacity }}
          className="absolute top-20 left-10 w-96 h-96 bg-black/5 rounded-full blur-3xl"
        />
        <motion.div
          style={{ y: parallaxValues.y2 }}
          className="absolute top-40 right-20 w-80 h-80 bg-black/3 rounded-full blur-2xl"
        />
        <div className="absolute bottom-40 left-1/4 w-72 h-72 bg-black/4 rounded-full blur-3xl" />

        {/* 动态光晕效果 */}
        <motion.div
          animate={{
            x: [0, 100, 0],
            y: [0, -50, 0],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear",
          }}
          className="absolute top-32 left-1/3 w-64 h-64 bg-black/2 rounded-full blur-2xl"
        />

        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.1, 0.3],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute bottom-32 right-1/4 w-80 h-80 bg-black/3 rounded-full blur-3xl"
        />

        <motion.div
          animate={{
            rotate: [0, 360],
          }}
          transition={{
            duration: 30,
            repeat: Infinity,
            ease: "linear",
          }}
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-r from-black/2 to-transparent rounded-full blur-2xl"
        />

        {/* 随机漂浮光点 */}
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            animate={{
              x: [0, Math.random() * 200 - 100, 0],
              y: [0, Math.random() * 200 - 100, 0],
              opacity: [0.2, 0.05, 0.2],
            }}
            transition={{
              duration: 15 + Math.random() * 10,
              repeat: Infinity,
              ease: "easeInOut",
              delay: i * 2,
            }}
            className={`absolute w-16 h-16 bg-black/10 rounded-full blur-xl`}
            style={{
              top: `${20 + Math.random() * 60}%`,
              left: `${10 + Math.random() * 80}%`,
            }}
          />
        ))}
      </div>
    );
  }
);

PortfolioBackground.displayName = "PortfolioBackground";

export default PortfolioBackground;
