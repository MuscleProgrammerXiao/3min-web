"use client";
import { motion } from "framer-motion";
import { Bot } from "lucide-react";
import { ChatBubbleProps } from "./types";
import {
  bubbleVariants,
  avatarVariants,
  typingIndicatorVariants,
} from "./animations";
import BubbleDecoration from "./BubbleDecoration";
import FloatingDecoration from "./FloatingDecoration";

const ChatBubble = ({ message, isTyping = false, type }: ChatBubbleProps) => {
  const isResponse = type === "response";

  return (
    <motion.div
      variants={bubbleVariants}
      initial="hidden"
      animate="visible"
      className="flex items-start justify-center"
    >
      <motion.div
        className={`bg-gradient-to-br ${
          isResponse
            ? "from-white to-green-50 dark:from-slate-800 dark:to-slate-700 border-green-100 dark:border-slate-600"
            : "from-white to-blue-50 dark:from-slate-800 dark:to-slate-700 border-blue-100 dark:border-slate-600"
        } rounded-3xl px-8 py-6 shadow-2xl max-w-lg mx-auto relative border backdrop-blur-sm`}
        whileHover={{
          scale: 1.02,
          boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)",
        }}
        transition={{ duration: 0.3 }}
      >
        <BubbleDecoration
          className={`-top-2 -right-2 bg-gradient-to-br ${
            isResponse
              ? "from-green-400 to-emerald-500"
              : "from-pink-400 to-purple-500"
          }`}
        />
        <FloatingDecoration
          className={`-bottom-1 -left-1 bg-gradient-to-br ${
            isResponse
              ? "from-blue-400 to-cyan-500"
              : "from-yellow-400 to-orange-500"
          }`}
        />

        {/* AI头像 */}
        <motion.div
          className={`absolute -top-6 left-1/2 transform -translate-x-1/2 w-12 h-12 bg-gradient-to-br ${
            isResponse
              ? "from-green-500 via-emerald-600 to-teal-500"
              : "from-blue-500 via-purple-600 to-pink-500"
          } rounded-full flex items-center justify-center shadow-lg`}
          animate={isTyping ? avatarVariants.typing : avatarVariants.idle}
          transition={{
            duration: 1,
            repeat: isTyping ? Infinity : 2,
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
            {message}
            {isTyping && (
              <motion.span
                {...typingIndicatorVariants}
                className="ml-1 text-blue-500 font-bold"
              >
                ▋
              </motion.span>
            )}
          </motion.p>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default ChatBubble;
