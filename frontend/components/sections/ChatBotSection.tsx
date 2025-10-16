"use client";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect, useRef, useCallback, useMemo } from "react";
import { containerVariants, itemVariants } from "./chatbot/animations";
import { useChatStream } from "./chatbot/hooks";

import WelcomeMessage from "./chatbot/WelcomeMessage";
import ChatBubble from "./chatbot/ChatBubble";
import ChatInput from "./chatbot/ChatInput";
import { LoadingSpinner } from "@/components/common";

const ChatBotSection = () => {
  const [question, setQuestion] = useState("");
  const { currentAnswer, isTyping, hasFirstChunk, submit } = useChatStream();
  const [showWelcome, setShowWelcome] = useState(true);
  const showWelcomeMemo = useMemo(
    () => showWelcome && !isTyping && !currentAnswer,
    [showWelcome, isTyping, currentAnswer]
  );

  const inputRef = useRef<HTMLInputElement>(null);
  const sectionRef = useRef<HTMLElement>(null);
  // 自动滚动到最新答案（已禁用自动跟随）
  useEffect(() => {
    // 已禁用自动跟随滚动
  }, [currentAnswer, hasFirstChunk]);

  // 页面初始化与视口检测逻辑移除（当前无需）

  // 不再自动抢占输入框焦点，尊重用户操作

  const handleSubmit = useCallback(
    async (message: string) => {
      setShowWelcome(false);
      setQuestion("");
      await submit(message);
    },
    [submit]
  );

  const handleInputChange = useCallback((value: string) => {
    setQuestion(value);
  }, []);

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
          viewport={{ once: true, margin: "-100px" }}
          className="space-y-8 md:space-y-12"
        >
          {/* 标题区域 */}
          <motion.div variants={itemVariants} className="text-center">
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-800 dark:text-white mb-4">
              智能体对话
            </h2>
            <p className="text-base md:text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              通过对话，你可以更多的了解我
            </p>
          </motion.div>

          {/* AI对话区域 */}
          <motion.div variants={itemVariants} className="max-w-3xl mx-auto">
            {/* 对话显示区域 */}
            <div className="min-h-[250px] md:min-h-[300px] mb-4 md:mb-6">
              {/* 等待动画：淡入淡出 + 文本轻微呼吸动效 */}
              <AnimatePresence mode="wait">
                {isTyping && !hasFirstChunk && (
                  <motion.div
                    key="loading"
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -6 }}
                    transition={{ duration: 0.2 }}
                    className="flex justify-center py-8"
                  >
                    <div className="flex items-center gap-3">
                      <LoadingSpinner size="md" />
                      <motion.span
                        initial={{ opacity: 0.7 }}
                        animate={{ opacity: [0.6, 1, 0.6] }}
                        transition={{ duration: 1.2, repeat: Infinity }}
                        className="text-gray-600 dark:text-gray-300"
                      >
                        正在思考...
                      </motion.span>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* 回答气泡：进场/退场动画 */}
              {/* 欢迎引导（首次对话前显示空状态） */}
              {showWelcomeMemo && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.22 }}
                >
                  <WelcomeMessage />
                </motion.div>
              )}
              <AnimatePresence mode="popLayout">
                {currentAnswer && (
                  <motion.div
                    key="answer"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.22 }}
                  >
                    <ChatBubble
                      message={currentAnswer}
                      isTyping={isTyping}
                      type="response"
                    />
                  </motion.div>
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
              shouldFocusOnSuggestion={!isTyping}
            />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default ChatBotSection;
