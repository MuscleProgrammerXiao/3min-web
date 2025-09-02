"use client";

import { useEffect } from "react";
import Lenis from "@studio-freight/lenis";
import { ANIMATION_DURATION } from "../constants/animations";

declare global {
  interface Window {
    lenis: Lenis | null;
  }
}
/**
 * React Hook: Lenis 平滑滚动管理
 * 初始化和管理 Lenis 平滑滚动实例
 */
export function useLenis() {
  useEffect(() => {
    const lenis = new Lenis({
      duration: ANIMATION_DURATION.slow,
      orientation: "vertical",
      smoothWheel: true,
      wheelMultiplier: 1,
      syncTouch: false, // 移动端使用原生滚动，性能更好
      touchMultiplier: 2,
      infinite: false,
      gestureOrientation: "vertical",
    });

    // 将lenis实例挂载到window对象上，方便其他地方调用
    window.lenis = lenis;

    // 页面加载时立即滚动到顶部
    lenis.scrollTo(0, { immediate: true });

    // 动画循环
    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    // 清理函数
    return () => {
      window.lenis = null;
      lenis.destroy();
    };
  }, []);
}
