'use client'
import { motion, AnimatePresence } from 'framer-motion'
import { useState, useEffect, useRef } from 'react'
import { Send, Bot, User, Sparkles, Heart, Star } from 'lucide-react'

const ChatBotSection = () => {
  const [question, setQuestion] = useState('')
  const [currentAnswer, setCurrentAnswer] = useState('')
  const [isTyping, setIsTyping] = useState(false)
  const [showWelcome, setShowWelcome] = useState(true)
  const inputRef = useRef<HTMLInputElement>(null)

  // 自动聚焦输入框
  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus()
    }
  }, [])

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.6,
        staggerChildren: 0.2
      }
    }
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: 'easeOut'
      }as any
    }
  }

  // 气泡动画变体
  const bubbleVariants = {
    hidden: { 
      opacity: 0, 
      scale: 0.3, 
      y: 50,
      rotateX: -90
    },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      rotateX: 0,
      transition: {
        type: "spring",
        damping: 20,
        stiffness: 300,
        duration: 0.8
      }as any
    },
    exit: {
      opacity: 0,
      scale: 0.8,
      y: -30,
      transition: {
        duration: 0.3
      }
    }
  }

  // 模拟AI回答的预设回答
  const getAIResponse = (question: string): string => {
    const responses: { [key: string]: string } = {
      '你好': '你好！我是这个网站主人的AI助手，很高兴认识你！有什么想了解的吗？',
      '你是谁': '我是一个AI助手，专门为访客介绍我的主人。他是一位热爱技术的全栈开发者！',
      '技能': '我的主人精通React/Next.js、TypeScript、TailwindCSS等现代Web技术，还擅长UI/UX设计和数据可视化。',
      '爱好': '除了编程，他还喜欢产品设计、摄影剪辑、户外运动、阅读思考，偶尔也会和朋友喝酒聊天。',
      '项目': '他参与过多个有趣的项目，从前端界面到后端系统，都有丰富的经验。你可以查看他的作品集了解更多！',
      '联系': '如果你想与他合作或交流，可以通过页面上的联系方式找到他。他很乐意与志同道合的人交流！',
      '经验': '他有丰富的全栈开发经验，从初创公司到大型项目都有参与，特别擅长用户体验优化和性能提升。'
    }
    
    // 简单的关键词匹配
    for (const [key, value] of Object.entries(responses)) {
      if (question.toLowerCase().includes(key.toLowerCase())) {
        return value
      }
    }
    
    return '这是个很有趣的问题！我的主人是一个充满创意的开发者，总是在探索新的技术和想法。你还想了解什么呢？'
  }

  // 打字机效果
  const typeWriter = async (text: string) => {
    setCurrentAnswer('')
    setIsTyping(true)
    
    for (let i = 0; i <= text.length; i++) {
      await new Promise(resolve => setTimeout(resolve, 30))
      setCurrentAnswer(text.slice(0, i))
    }
    
    setIsTyping(false)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!question.trim()) return
    
    setShowWelcome(false)
    const response = getAIResponse(question)
    setQuestion('')
    await typeWriter(response)
  }

  return (
    <section className="py-12 md:py-20 bg-gradient-to-br from-slate-50 to-blue-50 dark:from-slate-900 dark:to-slate-800">
      <div className="container mx-auto px-4 max-w-4xl">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          className="space-y-8 md:space-y-12"
        >
          {/* 标题区域 */}
          <motion.div variants={itemVariants} className="text-center">
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-800 dark:text-white mb-4">
              通过我的智能体了解更多关于我
            </h2>
            <p className="text-base md:text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              有什么想了解的？问问我的AI助手吧！
            </p>
          </motion.div>
          
          {/* AI对话区域 - 重新设计的气泡框 */}
          <motion.div variants={itemVariants} className="max-w-3xl mx-auto">
            {/* 对话显示区域 - 缩短距离 */}
            <div className="min-h-[250px] md:min-h-[300px] mb-4 md:mb-6">
              <AnimatePresence mode="wait">
                {showWelcome && (
                  <motion.div
                    variants={bubbleVariants}
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                    className="flex items-start justify-center"
                  >
                    <motion.div 
                      className="bg-gradient-to-br from-white to-blue-50 dark:from-slate-800 dark:to-slate-700 rounded-3xl px-8 py-6 shadow-2xl max-w-lg mx-auto relative border border-blue-100 dark:border-slate-600 backdrop-blur-sm"
                      whileHover={{ 
                        scale: 1.02,
                        boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)"
                      }}
                      transition={{ duration: 0.3 }}
                    >
                      {/* 装饰性背景元素 */}
                      <motion.div
                        className="absolute -top-2 -right-2 w-6 h-6 bg-gradient-to-br from-pink-400 to-purple-500 rounded-full"
                        animate={{ 
                          rotate: [0, 360],
                          scale: [1, 1.2, 1]
                        }}
                        transition={{ 
                          duration: 4, 
                          repeat: Infinity,
                          ease: "easeInOut"
                        }}
                      />
                      <motion.div
                        className="absolute -bottom-1 -left-1 w-4 h-4 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full"
                        animate={{ 
                          y: [-5, 5, -5],
                          x: [-2, 2, -2]
                        }}
                        transition={{ 
                          duration: 3, 
                          repeat: Infinity,
                          ease: "easeInOut"
                        }}
                      />
                      
                      {/* AI头像 - 增强动画 */}
                      <motion.div 
                        className="absolute -top-6 left-1/2 transform -translate-x-1/2 w-12 h-12 bg-gradient-to-br from-blue-500 via-purple-600 to-pink-500 rounded-full flex items-center justify-center shadow-lg"
                        animate={{ 
                          boxShadow: [
                            '0 0 0 0 rgba(59, 130, 246, 0.4)',
                            '0 0 0 15px rgba(59, 130, 246, 0)',
                            '0 0 0 0 rgba(59, 130, 246, 0)'
                          ],
                          rotate: [0, 5, -5, 0]
                        }}
                        transition={{ 
                          boxShadow: { duration: 2, repeat: Infinity },
                          rotate: { duration: 4, repeat: Infinity, ease: "easeInOut" }
                        }}
                        whileHover={{ scale: 1.1 }}
                      >
                        <Bot className="w-6 h-6 text-white" />
                      </motion.div>
                      
                      <div className="text-center pt-6">
                        <motion.p 
                          className="text-base md:text-lg text-gray-800 dark:text-white mb-4 leading-relaxed font-medium"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ delay: 0.3 }}
                        >
                          你好！我是AI助手，很高兴为你介绍我的主人。你想了解什么呢？
                        </motion.p>
                        <motion.div 
                          className="flex justify-center space-x-2"
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.6 }}
                        >
                          <motion.div
                            animate={{ 
                              rotate: [0, 360],
                              scale: [1, 1.2, 1]
                            }}
                            transition={{ 
                              duration: 2, 
                              repeat: Infinity,
                              delay: 0
                            }}
                          >
                            <Sparkles className="w-4 h-4 text-blue-500" />
                          </motion.div>
                          <motion.div
                            animate={{ 
                              rotate: [0, 360],
                              scale: [1, 1.2, 1]
                            }}
                            transition={{ 
                              duration: 2, 
                              repeat: Infinity,
                              delay: 0.3
                            }}
                          >
                            <Heart className="w-4 h-4 text-purple-500" />
                          </motion.div>
                          <motion.div
                            animate={{ 
                              rotate: [0, 360],
                              scale: [1, 1.2, 1]
                            }}
                            transition={{ 
                              duration: 2, 
                              repeat: Infinity,
                              delay: 0.6
                            }}
                          >
                            <Star className="w-4 h-4 text-pink-500" />
                          </motion.div>
                        </motion.div>
                      </div>
                    </motion.div>
                  </motion.div>
                )}
                
                {currentAnswer && (
                  <motion.div
                    variants={bubbleVariants}
                    initial="hidden"
                    animate="visible"
                    className="flex items-start justify-center"
                  >
                    <motion.div 
                      className="bg-gradient-to-br from-white to-green-50 dark:from-slate-800 dark:to-slate-700 rounded-3xl px-8 py-6 shadow-2xl max-w-lg mx-auto relative border border-green-100 dark:border-slate-600 backdrop-blur-sm"
                      whileHover={{ 
                        scale: 1.02,
                        boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)"
                      }}
                      transition={{ duration: 0.3 }}
                    >
                      {/* 装饰性背景元素 */}
                      <motion.div
                        className="absolute -top-2 -right-2 w-6 h-6 bg-gradient-to-br from-green-400 to-emerald-500 rounded-full"
                        animate={{ 
                          rotate: [0, 360],
                          scale: [1, 1.2, 1]
                        }}
                        transition={{ 
                          duration: 4, 
                          repeat: Infinity,
                          ease: "easeInOut"
                        }}
                      />
                      <motion.div
                        className="absolute -bottom-1 -left-1 w-4 h-4 bg-gradient-to-br from-blue-400 to-cyan-500 rounded-full"
                        animate={{ 
                          y: [-5, 5, -5],
                          x: [-2, 2, -2]
                        }}
                        transition={{ 
                          duration: 3, 
                          repeat: Infinity,
                          ease: "easeInOut"
                        }}
                      />
                      
                      {/* AI头像 - 回答状态 */}
                      <motion.div 
                        className="absolute -top-6 left-1/2 transform -translate-x-1/2 w-12 h-12 bg-gradient-to-br from-green-500 via-emerald-600 to-teal-500 rounded-full flex items-center justify-center shadow-lg"
                        animate={isTyping ? { 
                          scale: [1, 1.1, 1],
                          boxShadow: [
                            '0 0 0 0 rgba(34, 197, 94, 0.4)',
                            '0 0 0 15px rgba(34, 197, 94, 0)',
                            '0 0 0 0 rgba(34, 197, 94, 0)'
                          ],
                          rotate: [0, 10, -10, 0]
                        } : {
                          boxShadow: [
                            '0 0 0 0 rgba(34, 197, 94, 0.2)',
                            '0 0 0 8px rgba(34, 197, 94, 0)',
                            '0 0 0 0 rgba(34, 197, 94, 0)'
                          ]
                        }}
                        transition={{ 
                          duration: 1, 
                          repeat: isTyping ? Infinity : 2
                        }}
                        whileHover={{ scale: 1.1 }}
                      >
                        <Bot className="w-6 h-6 text-white" />
                      </motion.div>
                      
                      <div className="text-center pt-6">
                        <motion.p 
                          className="text-base md:text-lg text-gray-800 dark:text-white leading-relaxed font-medium"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                        >
                          {currentAnswer}
                          {isTyping && (
                            <motion.span
                              animate={{ 
                                opacity: [0, 1, 0],
                                scale: [1, 1.2, 1]
                              }}
                              transition={{ 
                                duration: 0.8, 
                                repeat: Infinity,
                                ease: "easeInOut"
                              }}
                              className="ml-1 text-blue-500 font-bold"
                            >
                              ▋
                            </motion.span>
                          )}
                        </motion.p>
                      </div>
                    </motion.div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
            
            {/* 输入区域 - 缩短距离 */}
            <motion.div 
              variants={itemVariants}
              className="bg-white dark:bg-slate-800 rounded-2xl p-4 md:p-6 shadow-xl backdrop-blur-sm bg-opacity-90 dark:bg-opacity-90 border border-gray-100 dark:border-slate-700"
              whileHover={{ 
                boxShadow: "0 20px 40px -12px rgba(0, 0, 0, 0.15)"
              }}
            >
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="relative">
                  <input
                    ref={inputRef}
                    type="text"
                    value={question}
                    onChange={(e) => setQuestion(e.target.value)}
                    placeholder="问问我的AI助手..."
                    className="w-full px-6 py-4 bg-gray-50 dark:bg-slate-700 border-2 border-gray-200 dark:border-slate-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm md:text-base text-gray-800 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 transition-all duration-200 pr-12"
                    disabled={isTyping}
                  />
                  <motion.div
                    className="absolute right-4 top-1/2 transform -translate-y-1/2"
                    animate={question ? { scale: 1, opacity: 1 } : { scale: 0.8, opacity: 0.5 }}
                  >
                    <User className="w-5 h-5 text-gray-400" />
                  </motion.div>
                </div>
                
                <div className="flex items-center justify-between">
                  {/* 建议问题 */}
                  <div className="flex flex-wrap gap-2 flex-1">
                    {['技能', '爱好', '项目', '联系'].map((suggestion) => (
                      <motion.button
                        key={suggestion}
                        type="button"
                        onClick={() => setQuestion(suggestion)}
                        className="px-3 py-1.5 text-xs bg-gray-100 dark:bg-slate-700 text-gray-600 dark:text-gray-300 rounded-full hover:bg-gray-200 dark:hover:bg-slate-600 transition-colors duration-200"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        {suggestion}
                      </motion.button>
                    ))}
                  </div>
                  
                  {/* 发送按钮 */}
                  <motion.button
                    type="submit"
                    disabled={!question.trim() || isTyping}
                    className="ml-4 px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-xl hover:from-blue-600 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 flex items-center space-x-2 font-medium"
                    whileHover={question.trim() && !isTyping ? { scale: 1.05 } : {}}
                    whileTap={question.trim() && !isTyping ? { scale: 0.95 } : {}}
                  >
                    <Send className="w-4 h-4" />
                    <span className="hidden sm:inline">发送</span>
                  </motion.button>
                </div>
              </form>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}

export default ChatBotSection