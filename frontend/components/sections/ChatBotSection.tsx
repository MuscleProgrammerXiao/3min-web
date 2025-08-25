'use client'
import { motion, AnimatePresence } from 'framer-motion'
import { useState, useEffect, useRef, useCallback } from 'react'
import { containerVariants, itemVariants } from './chatbot/animations'
import { getAIResponse } from './chatbot/data'
import WelcomeMessage from './chatbot/WelcomeMessage'
import ChatBubble from './chatbot/ChatBubble'
import ChatInput from './chatbot/ChatInput'

const ChatBotSection = () => {
  const [question, setQuestion] = useState('')
  const [currentAnswer, setCurrentAnswer] = useState('')
  const [isTyping, setIsTyping] = useState(false)
  const [showWelcome, setShowWelcome] = useState(true)
  const [isInView, setIsInView] = useState(false)
  
  const inputRef = useRef<HTMLInputElement>(null)
  const sectionRef = useRef<HTMLElement>(null)

  // 滚动监听和自动聚焦
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsInView(entry.isIntersecting)
        // 当组件进入视口时自动聚焦输入框
        if (entry.isIntersecting && inputRef.current) {
          // 延迟聚焦，确保动画完成
          setTimeout(() => {
            inputRef.current?.focus()
          }, 500)
        }
      },
      {
        threshold: 0.3, // 当30%的组件可见时触发
        rootMargin: '-50px 0px -50px 0px' // 提前触发
      }
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current)
      }
    }
  }, [])

  // 保持输入框聚焦（当组件在视口内时）
  useEffect(() => {
    if (isInView && inputRef.current && !isTyping) {
      const handleFocus = () => {
        if (document.activeElement !== inputRef.current) {
          inputRef.current?.focus()
        }
      }

      // 监听点击事件，如果点击的不是输入框，重新聚焦
      const handleClick = (e: MouseEvent) => {
        const target = e.target as HTMLElement
        // 如果点击的不是输入框、按钮或建议标签，重新聚焦输入框
        if (!target.closest('input') && !target.closest('button') && isInView) {
          setTimeout(() => {
            inputRef.current?.focus()
          }, 100)
        }
      }

      document.addEventListener('click', handleClick)
      
      // 定期检查焦点状态
      const focusInterval = setInterval(handleFocus, 1000)

      return () => {
        document.removeEventListener('click', handleClick)
        clearInterval(focusInterval)
      }
    }
  }, [isInView, isTyping])

  // 打字机效果
  const typeWriter = useCallback(async (text: string) => {
    setCurrentAnswer('')
    setIsTyping(true)
    
    for (let i = 0; i <= text.length; i++) {
      await new Promise(resolve => setTimeout(resolve, 30))
      setCurrentAnswer(text.slice(0, i))
    }
    
    setIsTyping(false)
    // 打字完成后重新聚焦输入框
    setTimeout(() => {
      if (isInView && inputRef.current) {
        inputRef.current.focus()
      }
    }, 200)
  }, [isInView])

  const handleSubmit = useCallback(async (message: string) => {
    setShowWelcome(false)
    const response = getAIResponse(message)
    setQuestion('')
    await typeWriter(response)
  }, [typeWriter])

  const handleInputChange = useCallback((value: string) => {
    setQuestion(value)
  }, [])

  return (
    <section 
      ref={sectionRef}
      className="py-12 md:py-20 bg-gradient-to-br from-slate-50 to-blue-50 dark:from-slate-900 dark:to-slate-800"
    >
      <div className="container mx-auto px-4 max-w-4xl">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          className="space-y-8 md:space-y-12"
        >
          {/* 标题区域 */}
          <motion.div variants={itemVariants as any} className="text-center">
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-800 dark:text-white mb-4">
              通过我的智能体了解更多关于我
            </h2>
            <p className="text-base md:text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              有什么想了解的？问问我的AI助手吧！
            </p>
          </motion.div>
          
          {/* AI对话区域 */}
          <motion.div variants={itemVariants as any} className="max-w-3xl mx-auto">
            {/* 对话显示区域 */}
            <div className="min-h-[250px] md:min-h-[300px] mb-4 md:mb-6">
              <AnimatePresence mode="wait">
                {showWelcome && <WelcomeMessage />}
                
                {currentAnswer && (
                  <ChatBubble 
                    message={currentAnswer}
                    isTyping={isTyping}
                    type="response"
                  />
                )}
              </AnimatePresence>
            </div>
            
            {/* 输入区域 */}
            <ChatInput
              value={question}
              onChange={handleInputChange}
              onSubmit={handleSubmit}
              isTyping={isTyping}
              inputRef={inputRef as React.RefObject<HTMLInputElement>}
            />
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}

export default ChatBotSection