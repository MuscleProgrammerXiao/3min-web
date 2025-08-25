import { AIResponse } from './types'

export const aiResponses: AIResponse = {
  '你好': '你好！我是这个网站主人的AI助手，很高兴认识你！有什么想了解的吗？',
  '你是谁': '我是一个AI助手，专门为访客介绍我的主人。他是一位热爱技术的全栈开发者！',
  '技能': '我的主人精通React/Next.js、TypeScript、TailwindCSS等现代Web技术，还擅长UI/UX设计和数据可视化。',
  '爱好': '除了编程，他还喜欢产品设计、摄影剪辑、户外运动、阅读思考，偶尔也会和朋友喝酒聊天。',
  '项目': '他参与过多个有趣的项目，从前端界面到后端系统，都有丰富的经验。你可以查看他的作品集了解更多！',
  '联系': '如果你想与他合作或交流，可以通过页面上的联系方式找到他。他很乐意与志同道合的人交流！',
  '经验': '他有丰富的全栈开发经验，从初创公司到大型项目都有参与，特别擅长用户体验优化和性能提升。'
}

export const suggestions = ['技能', '爱好', '项目', '联系']

export const defaultResponse = '这是个很有趣的问题！我的主人是一个充满创意的开发者，总是在探索新的技术和想法。你还想了解什么呢？'

export const welcomeMessage = '你好！我是AI助手，很高兴为你介绍我的主人。你想了解什么呢？'

export const getAIResponse = (question: string): string => {
  // 关键词匹配
  for (const [key, value] of Object.entries(aiResponses)) {
    if (question.toLowerCase().includes(key.toLowerCase())) {
      return value
    }
  }
  return defaultResponse
}