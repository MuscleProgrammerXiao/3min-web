"use client";
import { motion } from "framer-motion";
import { Send, User } from "lucide-react";
import { ChatInputProps } from "./types";
import { suggestions } from "./data";
import { itemVariants } from "./animations";

const ChatInput = ({
  value,
  onChange,
  onSubmit,
  isTyping,
  inputRef,
  shouldFocusOnSuggestion = true,
}: ChatInputProps) => {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!value.trim() || isTyping) return;
    onSubmit(value);
  };

  const handleSuggestionClick = (suggestion: string) => {
    onChange(suggestion);
    // 点击建议后是否聚焦输入框（可配置）
    if (shouldFocusOnSuggestion) {
      setTimeout(() => {
        inputRef.current?.focus();
      }, 100);
    }
  };
  return (
    <motion.div
      variants={itemVariants}
      className="bg-white dark:bg-slate-800 rounded-2xl p-4 md:p-6 shadow-xl backdrop-blur-sm bg-opacity-90 dark:bg-opacity-90 border border-gray-100 dark:border-slate-700"
      whileHover={{
        boxShadow: "0 20px 40px -12px rgba(0, 0, 0, 0.15)",
      }}
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="relative">
          <input
            ref={inputRef}
            type="text"
            value={value}
            onChange={e => onChange(e.target.value)}
            placeholder="问问我的AI助手..."
            className="w-full px-6 py-4 bg-gray-50 dark:bg-slate-700 border-2 border-gray-200 dark:border-slate-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm md:text-base text-gray-800 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 transition-all duration-200 pr-12"
            disabled={isTyping}
            autoComplete="off"
          />
          <motion.div
            className="absolute right-4 top-1/2 transform -translate-y-1/2"
            animate={
              value ? { scale: 1, opacity: 1 } : { scale: 0.8, opacity: 0.5 }
            }
          >
            <User className="w-5 h-5 text-gray-400" />
          </motion.div>
        </div>

        <div className="flex items-center justify-between">
          {/* 建议问题 */}
          <div className="flex flex-wrap gap-2 flex-1">
            {suggestions.map(suggestion => (
              <motion.button
                key={suggestion}
                type="button"
                onClick={() => handleSuggestionClick(suggestion)}
                className="px-3 py-1.5 text-xs bg-gray-100 dark:bg-slate-700 text-gray-600 dark:text-gray-300 rounded-full hover:bg-gray-200 dark:hover:bg-slate-600 transition-colors duration-200"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                disabled={isTyping}
              >
                {suggestion}
              </motion.button>
            ))}
          </div>

          {/* 发送按钮 */}
          <motion.button
            type="submit"
            disabled={!value.trim() || isTyping}
            className="ml-4 px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-xl hover:from-blue-600 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 flex items-center space-x-2 font-medium"
            whileHover={value.trim() && !isTyping ? { scale: 1.05 } : {}}
            whileTap={value.trim() && !isTyping ? { scale: 0.95 } : {}}
          >
            <Send className="w-4 h-4" />
            <span className="hidden sm:inline">发送</span>
          </motion.button>
        </div>
      </form>
    </motion.div>
  );
};

export default ChatInput;
