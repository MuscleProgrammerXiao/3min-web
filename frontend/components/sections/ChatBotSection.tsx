"use client";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect, useRef, useCallback, useMemo } from "react";
import { containerVariants, itemVariants } from "./chatbot/animations";
import { useInView } from "@/lib/hooks/useInView";
import { useScrollToBottom } from "@/lib/hooks/useScrollToBottom";

import WelcomeMessage from "./chatbot/WelcomeMessage";
import ChatBubble from "./chatbot/ChatBubble";
import ChatInput from "./chatbot/ChatInput";
import { LoadingSpinner } from "@/components/common";

const ChatBotSection = () => {
  const [question, setQuestion] = useState("");
  const [currentAnswer, setCurrentAnswer] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [showWelcome, setShowWelcome] = useState(true);
  const [isInViewState, setIsInViewState] = useState(false);
  const [isPageInitialized, setIsPageInitialized] = useState(false);
  const [hasFirstChunk, setHasFirstChunk] = useState(false);
  const showWelcomeMemo = useMemo(
    () => showWelcome && !isTyping && !currentAnswer,
    [showWelcome, isTyping, currentAnswer]
  );

  const inputRef = useRef<HTMLInputElement>(null);
  const sectionRef = useRef<HTMLElement>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  // 自动滚动到最新答案（已禁用自动跟随）
  useEffect(() => {
    // 已禁用自动跟随滚动
  }, [currentAnswer, hasFirstChunk]);
  // 页面级滚动到最底部（确保点击发送后滚动到底部）
  const scrollToPageBottom = useScrollToBottom();

  // 页面初始化检测
  useEffect(() => {
    // 等待页面完全加载和初始滚动完成
    const initTimer = setTimeout(() => {
      setIsPageInitialized(true);
    }, 1000); // 给足够时间让 useScrollToTop 完成

    return () => clearTimeout(initTimer);
  }, []);

  // 视口检测：使用自定义 hook
  const isInView = useInView(
    sectionRef as React.RefObject<HTMLElement>,
    { threshold: 0.1 },
    isPageInitialized
  );
  useEffect(() => {
    setIsInViewState(isInView);
  }, [isInView]);

  // 保持输入框聚焦（当组件在视口内且页面已初始化时）
  // 移除强制聚焦逻辑：不再自动抢占输入框焦点，尊重用户操作
  useEffect(() => {
    // no-op
  }, []);

  // 打字机效果
  const typeWriter = useCallback(async (text: string) => {
    setCurrentAnswer("");
    setIsTyping(true);
    setHasFirstChunk(true);

    for (let i = 0; i <= text.length; i++) {
      await new Promise(resolve => setTimeout(resolve, 30));
      setCurrentAnswer(text.slice(0, i));
    }

    setIsTyping(false);
    // 不再强制聚焦输入框
  }, []);

  const typingQueueRef = useRef<Promise<void>>(Promise.resolve());
  const abortControllerRef = useRef<AbortController | null>(null);
  const typeWriterAppend = useCallback(async (appendText: string) => {
    for (let i = 0; i < appendText.length; i++) {
      await new Promise(resolve => setTimeout(resolve, 18));
      setCurrentAnswer(prev => prev + appendText[i]);
    }
  }, []);

  const handleSubmit = useCallback(
    async (message: string) => {
      // 取消上一次请求与打字序列
      if (abortControllerRef.current) {
        try {
          abortControllerRef.current.abort();
        } catch {}
      }
      abortControllerRef.current = new AbortController();
      // 重置 UI 状态
      setShowWelcome(false);
      setQuestion("");
      setIsTyping(true);
      setCurrentAnswer("");
      setHasFirstChunk(false);
      try {
        const res = await fetch("/api/chat", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ message }),
          signal: abortControllerRef.current.signal,
        });

        if (!res.body) {
          const data = await res.json();
          const answer = data?.content ?? "抱歉，暂时无法获取回答。";
          await typeWriter(answer);
          return;
        }

        setIsTyping(true);
        setCurrentAnswer("");
        const reader = res.body.getReader();
        const decoder = new TextDecoder();
        let buffer = "";
        let receivedFirst = false;
        while (true) {
          const { value, done } = await reader.read();
          if (abortControllerRef.current?.signal.aborted) break;
          if (done) break;
          buffer += decoder.decode(value, { stream: true });
          const chunk = buffer;
          buffer = "";
          if (!receivedFirst && chunk) {
            setHasFirstChunk(true);
            receivedFirst = true;
          }
          typingQueueRef.current = typingQueueRef.current.then(() =>
            typeWriterAppend(chunk)
          );
        }
        await typingQueueRef.current;
        setIsTyping(false);
      } catch (err) {
        if (!abortControllerRef.current?.signal.aborted) {
          await typeWriter("请求失败，请稍后重试。");
        }
      }
    },
    [typeWriter]
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

              {/* 滚动定位锚点 */}
              <div ref={messagesEndRef} />
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
