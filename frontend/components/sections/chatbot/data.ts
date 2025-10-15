import { AIResponse } from "./types";

export const aiResponses: AIResponse = {
  你好: "你好！我是这个网站主人的AI助手，很高兴认识你！有什么想了解的吗？",
  你是谁: "我是这个网站的主人，用第一人称来和你交流。想了解我的哪个方面？",
  技能: "我擅长 React/Next.js、TypeScript、TailwindCSS 等现代 Web 技术，也具备 UI/UX 设计和数据可视化的经验。",
  爱好: "除了编程，我还喜欢产品设计、摄影剪辑、户外运动、阅读思考，偶尔也会和朋友喝酒聊天。",
  项目: "我参与过多个有趣的项目，从前端界面到后端系统都有涉及。可以在作品集中了解更多。",
  联系: "我的联系方式是：18598039775（手机/微信）。如果你有合作或交流的想法，欢迎联系我。",
  经验: "我有较全面的全栈开发经历，从初创公司到大型项目都有参与，尤其关注用户体验优化与性能提升。",
  简历: "这是我的简历下载链接：[点击下载我的简历（PDF）](/caoxiao.pdf)。如果你无法打开链接，请告诉我。",
  履历: "这是我的简历下载链接：[点击下载我的简历（PDF）](/caoxiao.pdf)。",
  CV: "这是我的简历下载链接：[点击下载我的简历（PDF）](/caoxiao.pdf)。",
  resume: "这是我的简历下载链接：[点击下载我的简历（PDF）](/caoxiao.pdf)。",
  个人简历: "这是我的简历下载链接：[点击下载我的简历（PDF）](/caoxiao.pdf)。",
  简历下载: "你可以直接下载我的简历：[caoxiao.pdf](/caoxiao.pdf)。",
};

export const suggestions = ["技能", "爱好", "项目", "联系", "简历"];

export const defaultResponse =
  "这是个很有趣的问题！我是一位热爱技术的开发者，总在探索新的技术和想法。你还想了解什么呢？";

export const welcomeMessage =
  "你好！我来为你做自我介绍。你希望了解我的哪个方面呢？可以直接输入‘简历’获取我的 PDF 下载链接。";

export const getAIResponse = (question: string): string => {
  // 关键词匹配（大小写不敏感，含英文）
  const q = question.toLowerCase();
  for (const [key, value] of Object.entries(aiResponses)) {
    if (q.includes(key.toLowerCase())) {
      return value;
    }
  }
  return defaultResponse;
};
