import { calculateYearDifference } from "@/lib/utils/scroll";
// 项目类型定义
export interface Project {
  id: number;
  title: string;
  description: string;
  category: "web" | "design" | "mobile";
  technologies: string[];
  githubUrl: string;
  liveUrl: string;
  image?: string; // 添加可选的图片字段
}

// 项目数据
export const projects: Project[] = [
  {
    id: 1,
    title: "AI智能报表录取",
    description:
      "为实现降本增效，提升客户经理日常手工操作效率，通过对业务流程的拆分与整合，结合OCR技术，开发了AI智能报表录取系统，此系统为案例版本",
    category: "web",
    technologies: [
      "React",
      "react-konva",
      "TypeScript",
      "Zustand",
      "UmiJS",
      "OCR",
    ],
    githubUrl: "https://github.com/MuscleProgrammerXiao",
    liveUrl: "http://116.205.176.83:8080/ocr-report",
    image: "/images/fsr.png",
  },
  {
    id: 3,
    title: "移动端社交应用",
    description:
      "基于React Native开发的社交应用，支持实时聊天、动态发布、好友管理等功能。",
    category: "mobile",
    technologies: ["React Native", "Firebase", "Redux", "TypeScript"],
    githubUrl: "https://github.com/MuscleProgrammerXiao",
    liveUrl: "#",
    image: "/images/social-app.png",
  },
  {
    id: 4,
    title: "企业官网设计",
    description:
      "现代化企业官网UI/UX设计，注重用户体验和视觉效果，响应式设计适配多端。",
    category: "design",
    technologies: ["Figma", "Adobe XD", "Photoshop", "Illustrator"],
    githubUrl: "https://github.com/MuscleProgrammerXiao",
    liveUrl: "#",
    image: "/images/corporate-design.png",
  },
  {
    id: 5,
    title: "数据可视化平台",
    description:
      "基于D3.js和Chart.js的数据可视化平台，支持多种图表类型和实时数据更新。",
    category: "web",
    technologies: ["Vue.js", "D3.js", "Chart.js", "Python", "FastAPI"],
    githubUrl: "https://github.com/MuscleProgrammerXiao",
    liveUrl: "#",
    image: "/images/data-viz.png",
  },
  {
    id: 6,
    title: "健身追踪应用",
    description:
      "移动端健身追踪应用，支持运动记录、健康数据分析、个人训练计划制定。",
    category: "mobile",
    technologies: ["Flutter", "Dart", "SQLite", "Provider"],
    githubUrl: "https://github.com/MuscleProgrammerXiao",
    liveUrl: "#",
    image: "/images/fitness-app.png",
  },
];

// 项目分类
export const categories = ["全部", "web应用", "设计", "移动端"] as const;

// 分类映射
export const categoryMap = {
  全部: null,
  web应用: "web",
  设计: "design",
  移动端: "mobile",
} as const;

// 统计信息
export const portfolioStats = {
  totalProjects: projects.length,
  techFields: 5,
  experienceYears: calculateYearDifference(2020),
};

// 页面配置
export const portfolioConfig = {
  itemsPerPage: 6,
  animationDelay: 0.1,
  projectsPerPage: 6,
};

// 分类图标映射
export const categoryIcons = {
  web: "Code",
  design: "Palette",
  mobile: "Smartphone",
} as const;

// 分类显示名称映射
export const categoryDisplayNames = {
  web: "web应用",
  design: "设计",
  mobile: "移动端",
} as const;
