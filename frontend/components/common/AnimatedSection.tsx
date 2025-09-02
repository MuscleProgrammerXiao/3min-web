"use client";

import { motion, useInView } from "framer-motion";
import { useRef, ReactNode } from "react";
import { containerVariants } from "@/lib/animations/variants";
import { cn } from "@/lib/utils";
import { Variants } from "framer-motion";

interface AnimatedSectionProps {
  children: ReactNode;
  className?: string;
  id?: string;
  variants?: Variants;
  once?: boolean;
  margin?: string; // 保持接口中的 margin 属性名以便向后兼容
}
type MarginType = `${number}px` | `${number}%` | `${number}px ${number}px`;
export function AnimatedSection({
  children,
  className,
  id,
  variants = containerVariants,
  once = true,
  margin = "-100px", // 默认值
}: AnimatedSectionProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once, margin: margin as MarginType }); // 改为 rootMargin

  return (
    <motion.section
      id={id}
      ref={ref}
      variants={variants}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      className={cn(className)}
    >
      {children}
    </motion.section>
  );
}
