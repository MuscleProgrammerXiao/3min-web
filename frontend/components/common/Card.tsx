"use client";

import { motion, Variants } from "framer-motion";
import { forwardRef, HTMLAttributes, ReactNode } from "react";
import { cn } from "@/lib/utils";

// ====== 修正：把 variants 的类型显式为 Variants，且使用元组形式的 ease ======
export const cardVariants: Variants = {
  hidden: { opacity: 0, scale: 0.98, y: 8 },
  // visible 是个 TargetResolver（index?: number）=> TargetAndTransition
  visible: (index: number = 0) => ({
    opacity: 1,
    scale: 1,
    y: 0,
    transition: {
      duration: 0.32,
      delay: 0.04 * index,
      // 使用元组 [number, number, number, number] 或者字符串，如 "easeInOut"
      // 元组会被正确推断为具体的 easing 值
      ease: [0.2, 0.8, 0.2, 1] as [number, number, number, number],
    },
  }),
};

// ====== Props 类型 ======
interface CardBaseProps extends HTMLAttributes<HTMLDivElement> {
  variant?: "default" | "outlined" | "elevated" | "filled";
  padding?: "none" | "sm" | "md" | "lg";
  animated?: boolean;
  children?: ReactNode;
}

// ====== 组件实现：对 animated 分支分别渲染 motion.div 或 普通 div ======
const Card = forwardRef<HTMLDivElement, CardBaseProps>(
  (
    {
      className,
      variant = "default",
      padding = "md",
      animated = true,
      children,
      ...props
    },
    ref
  ) => {
    const baseClasses = "rounded-lg transition-colors";

    const variantClasses: Record<
      NonNullable<CardBaseProps["variant"]>,
      string
    > = {
      default: "bg-white border border-gray-200 shadow-sm",
      outlined: "bg-transparent border border-gray-300",
      elevated: "bg-white shadow-lg border border-gray-100",
      filled: "bg-gray-50 border border-gray-200",
    };

    const paddingClasses: Record<
      NonNullable<CardBaseProps["padding"]>,
      string
    > = {
      none: "",
      sm: "p-3",
      md: "p-4",
      lg: "p-6",
    };

    // 关键：**分别渲染 motion.div 与 div**，避免类型冲突
    if (animated) {
      return (
        <motion.div
          ref={ref}
          className={cn(
            baseClasses,
            variantClasses[variant],
            paddingClasses[padding],
            className
          )}
          variants={cardVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          whileHover={{ y: -2, transition: { duration: 0.2 } }}
          // 仅把常规 div props 传入（motion.div 兼容 HTMLAttributes）
          {...(props as any)}
        >
          {children}
        </motion.div>
      );
    }

    return (
      <div
        ref={ref}
        className={cn(
          baseClasses,
          variantClasses[variant],
          paddingClasses[padding],
          className
        )}
        {...props}
      >
        {children}
      </div>
    );
  }
);

Card.displayName = "Card";

// ====== 子组件（与之前相同的正确类型） ======
const CardHeader = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn("flex flex-col space-y-1.5 pb-4", className)}
      {...props}
    />
  )
);
CardHeader.displayName = "CardHeader";

const CardTitle = forwardRef<
  HTMLHeadingElement,
  HTMLAttributes<HTMLHeadingElement>
>(({ className, ...props }, ref) => (
  <h3
    ref={ref}
    className={cn(
      "text-lg font-semibold leading-none tracking-tight",
      className
    )}
    {...props}
  />
));
CardTitle.displayName = "CardTitle";

const CardDescription = forwardRef<
  HTMLParagraphElement,
  HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
  <p ref={ref} className={cn("text-sm text-gray-600", className)} {...props} />
));
CardDescription.displayName = "CardDescription";

const CardContent = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn("pt-0", className)} {...props} />
  )
);
CardContent.displayName = "CardContent";

const CardFooter = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn("flex items-center pt-4", className)}
      {...props}
    />
  )
);
CardFooter.displayName = "CardFooter";

export {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
};
