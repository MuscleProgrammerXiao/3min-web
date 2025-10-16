"use client";

import { ReactNode } from "react";

interface PageTransitionProps {
  children: ReactNode;
}

// 路由切换动画已移除：该组件现在仅作为无动画的包装
export function PageTransition({ children }: PageTransitionProps) {
  return <>{children}</>;
}
