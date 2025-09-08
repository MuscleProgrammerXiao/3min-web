"use client";

import { useState, useEffect, useMemo, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { AnimatedSection } from "@/components/common";
import {
  ANIMATION_DURATION,
  ANIMATION_EASING,
} from "@/lib/constants/animations";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Download } from "lucide-react";

// 性能优化的动画配置
const useOptimizedAnimation = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  return useMemo(
    () => ({
      duration: isMobile ? ANIMATION_DURATION.fast : ANIMATION_DURATION.medium,
      ease: ANIMATION_EASING.easeOut,
    }),
    [isMobile]
  );
};

// 优化的 TypewriterText 组件
const TypewriterText = ({
  text,
  onComplete,
}: {
  text: string;
  onComplete?: () => void;
}) => {
  const [displayText, setDisplayText] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleComplete = useCallback(() => {
    if (onComplete) onComplete();
  }, [onComplete]);

  useEffect(() => {
    if (currentIndex < text.length) {
      const timer = setTimeout(() => {
        setDisplayText(prev => prev + text[currentIndex]);
        setCurrentIndex(prev => prev + 1);
      }, 50);
      return () => clearTimeout(timer);
    } else {
      handleComplete();
    }
  }, [currentIndex, text, handleComplete]);

  return (
    <span className="inline-block">
      {displayText}
      <motion.span
        animate={{ opacity: [1, 0] }}
        transition={{ duration: 0.8, repeat: Infinity, repeatType: "reverse" }}
        className="ml-1"
      >
        |
      </motion.span>
    </span>
  );
};

const HeroSection = () => {
  const [typingComplete, setTypingComplete] = useState(false);
  const [imageError, setImageError] = useState(false);
  const animationConfig = useOptimizedAnimation();

  // 下载简历功能
  const downloadResume = useCallback((type: "frontend" | "product") => {
    const link = document.createElement("a");
    link.href = "/caoxiao.pdf";
    link.download =
      type === "frontend" ? "曹晓-前端开发简历.pdf" : "曹晓-产品经理简历.pdf";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }, []);

  const scrollToNext = useCallback(() => {
    const nextSection = document.querySelector("#about");
    if (nextSection) {
      // 计算header高度偏移量（64px + 额外间距）
      const headerHeight = 64; // header高度 + 额外间距
      const elementPosition =
        nextSection.getBoundingClientRect().top + window.pageYOffset;
      const offsetPosition = elementPosition - headerHeight;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
    }
  }, []);

  const handleTypingComplete = useCallback(() => {
    setTypingComplete(true);
  }, []);

  return (
    <AnimatedSection className="relative min-h-screen flex flex-col overflow-hidden">
      {/* 优化的背景图片 - 桌面端和移动端分别使用不同图片 */}
      <div className="absolute inset-0 z-0">
        {!imageError ? (
          <>
            {/* 桌面端背景 */}
            <Image
              src="/images/travel-hero.jpg"
              alt="Hero Background Desktop"
              fill
              priority
              quality={85}
              sizes="(max-width: 768px) 0vw, 100vw"
              className="object-cover hidden md:block"
              placeholder="blur"
              blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkqGx0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R//2Q=="
              onError={() => setImageError(true)}
            />
            {/* 移动端背景 */}
            <Image
              src="/images/travle-m.jpg"
              alt="Hero Background Mobile"
              fill
              priority
              quality={85}
              sizes="(max-width: 768px) 100vw, 0vw"
              className="object-cover md:hidden"
              placeholder="blur"
              blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkqGx0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R//2Q=="
              onError={() => setImageError(true)}
            />
          </>
        ) : (
          // 备用渐变背景
          <div className="absolute inset-0 bg-gradient-to-br from-blue-900 via-purple-900 to-indigo-900" />
        )}
      </div>

      {/* 重新设计的遮罩层 - 移动端优化 */}
      <div className="absolute inset-0 z-10">
        {/* 桌面端深色遮罩 */}
        <div className="absolute inset-0 hidden md:block bg-gradient-to-br from-black/40 via-black/30 to-black/50" />

        {/* 移动端重新设计的遮罩 - 上下渐变 */}
        <div className="absolute inset-0 md:hidden">
          {/* 顶部深色渐变 - 确保文字可读性 */}
          <div className="absolute top-0 left-0 right-0 h-1/5 bg-gradient-to-b from-black/60 via-black/40 to-transparent" />
          {/* 底部深色渐变 - 确保按钮可见性 */}
          <div className="absolute bottom-0 left-0 right-0 h-1/4 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />
          {/* 中心高光区域 */}
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent" />
        </div>
      </div>

      {/* 重新设计的移动端布局 */}
      <div className="relative z-20 flex flex-col min-h-screen">
        {/* 顶部内容区域 - 移动端优化 */}
        <div className="flex-1 flex flex-col justify-center px-4 sm:px-6 lg:px-8 pt-16 md:pt-0">
          <div className="max-w-4xl mx-auto text-center md:text-center">
            {/* 主标题 - 移动端左对齐，桌面端居中 */}
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: animationConfig.duration,
                ease: animationConfig.ease,
              }}
              className="text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-bold mb-4 md:mb-6 leading-tight text-left md:text-center"
            >
              <span className="bg-gradient-to-r from-white via-blue-100 to-cyan-100 bg-clip-text text-transparent drop-shadow-2xl filter">
                这是我的个人网站
              </span>
            </motion.h1>

            {/* 副标题 - 移动端优化 */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: animationConfig.duration,
                delay: 0.3,
                ease: animationConfig.ease,
              }}
              className="text-base sm:text-lg md:text-2xl mb-6 md:mb-8 font-medium text-left md:text-center"
            >
              <span className="text-white/95 drop-shadow-lg filter">
                <TypewriterText
                  text="展示作品 · 分享想法 · 连接世界"
                  onComplete={handleTypingComplete}
                />
              </span>
            </motion.div>

            {/* 移动端按钮组 - 重新设计 */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{
                opacity: typingComplete ? 1 : 0,
                y: typingComplete ? 0 : 20,
              }}
              transition={{
                duration: animationConfig.duration,
                ease: animationConfig.ease,
              }}
              className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-8"
            >
              <Link href="/portfolio">
                <Button
                  size="lg"
                  className="
                    w-full sm:w-auto min-w-[140px] h-12
                    bg-white/20 hover:bg-white/30 
                    backdrop-blur-md backdrop-saturate-150
                    border border-white/30 hover:border-white/50
                    text-white hover:text-white 
                    px-8 py-3 text-lg font-semibold 
                    shadow-xl hover:shadow-2xl 
                    transition-all duration-300 ease-out
                    rounded-xl
                    relative overflow-hidden
                    group
                  "
                >
                  {/* 内部光效 */}
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <span className="relative z-10">查看作品</span>
                </Button>
              </Link>
              <Link href="/contact">
                <Button
                  variant="outline"
                  size="lg"
                  className="
                    w-full sm:w-auto min-w-[140px] h-12
                    bg-black/20 hover:bg-black/30 
                    backdrop-blur-md backdrop-saturate-150
                    border-2 border-white/40 hover:border-white/60 
                    text-white hover:text-white 
                    px-8 py-3 text-lg font-semibold 
                    shadow-xl hover:shadow-2xl 
                    transition-all duration-300 ease-out
                    rounded-xl
                    relative overflow-hidden
                    group
                  "
                >
                  {/* 内部光效 */}
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <span className="relative z-10">联系我</span>
                </Button>
              </Link>
            </motion.div>

            {/* 下载简历按钮 */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{
                opacity: typingComplete ? 1 : 0,
                y: typingComplete ? 0 : 20,
              }}
              transition={{
                duration: animationConfig.duration,
                delay: 0.2,
                ease: animationConfig.ease,
              }}
              className="flex justify-center mb-16"
            >
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button size="sm">
                    <Download className="w-4 h-4 mr-2" />
                    <span className="relative z-10">下载简历</span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent
                  align="center"
                  className="
                    bg-white/10 backdrop-blur-md backdrop-saturate-150
                    border border-white/20
                    rounded-lg
                    shadow-xl
                  "
                >
                  <DropdownMenuItem
                    onClick={() => downloadResume("frontend")}
                    className="
                      text-white hover:bg-white/10 
                      cursor-pointer transition-colors duration-200
                      focus:bg-white/10 focus:text-white
                    "
                  >
                    <Download className="w-4 h-4 mr-2" />
                    前端开发简历
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    onClick={() => downloadResume("product")}
                    className="
                      text-white hover:bg-white/10 
                      cursor-pointer transition-colors duration-200
                      focus:bg-white/10 focus:text-white
                    "
                  >
                    <Download className="w-4 h-4 mr-2" />
                    产品经理简历
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </motion.div>
          </div>
        </div>

        {/* 底部探索按钮 - 移动端固定在底部 */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: typingComplete ? 1 : 0 }}
          transition={{ duration: animationConfig.duration, delay: 0.5 }}
          className="pb-8 md:pb-16 flex justify-center"
        >
          <motion.button
            onClick={scrollToNext}
            className="
              group relative px-6 py-3 md:p-4 rounded-full 
              bg-white/10 backdrop-blur-md text-white 
              border border-white/30 
              shadow-lg hover:shadow-xl transition-all duration-300 
              hover:bg-white/20
            "
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            aria-label="滚动到下一部分"
          >
            <div className="flex items-center gap-2">
              <span className="text-sm md:text-base font-medium">探索更多</span>
              <motion.div
                animate={{ y: [0, 3, 0] }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              >
                ↓
              </motion.div>
            </div>
          </motion.button>
        </motion.div>
      </div>
    </AnimatedSection>
  );
};

export default HeroSection;
