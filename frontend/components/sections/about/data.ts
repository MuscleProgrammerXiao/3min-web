import {
  Code2,
  Palette,
  Camera,
  Mountain,
  Database,
  Code,
  Figma,
} from "lucide-react";
import { Skill, Interest } from "./types";

export const skills: Skill[] = [
  {
    name: "React",
    level: 90,
    color: "from-cyan-400 via-blue-500 to-blue-600",
    icon: Code2,
    category: "前端框架",
    description: "现代化React开发",
  },
  {
    name: "Next.js",
    level: 88,
    color: "from-cyan-400 via-teal-500 to-emerald-600",
    icon: Code,
    category: "CSS框架",
    description: "实用优先的CSS框架",
  },
  {
    name: "TypeScript",
    level: 85,
    color: "from-blue-500 via-indigo-500 to-blue-700",
    icon: Code2,
    category: "编程语言",
    description: "类型安全的JavaScript",
  },
  {
    name: "UI/UX Design",
    level: 75,
    color: "from-purple-500 via-pink-500 to-rose-500",
    icon: Figma,
    category: "设计工具",
    description: "用户体验设计",
  },
];

export const interests: Interest[] = [
  {
    icon: Code2,
    name: "编程开发",
    description: "探索前沿技术，构建优雅解决方案",
    gradient: "from-blue-500 to-purple-600",
  },
  {
    icon: Palette,
    name: "产品设计",
    description: "用户体验至上，设计驱动创新",
    gradient: "from-pink-500 to-rose-500",
  },
  {
    icon: Camera,
    name: "摄影剪辑",
    description: "捕捉瞬间美好，讲述视觉故事",
    gradient: "from-orange-500 to-yellow-500",
  },
  {
    icon: Mountain,
    name: "户外运动",
    description: "拥抱自然，挑战自我极限",
    gradient: "from-green-500 to-teal-500",
  },
];
