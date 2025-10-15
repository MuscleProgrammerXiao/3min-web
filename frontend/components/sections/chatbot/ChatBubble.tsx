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
import { useMemo } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

// 提取文本中的 JSON 候选内容（支持 ```json 代码块、通用 ``` 代码块、整体 JSON、以及第一个平衡的大括号/中括号片段）
const extractJsonCandidate = (text: string): string | null => {
  const fenceJson = text.match(/```json\s*([\s\S]*?)```/i);
  if (fenceJson?.[1]) return fenceJson[1].trim();

  const fenceGeneric = text.match(/```\s*([\s\S]*?)```/);
  if (fenceGeneric?.[1]) {
    const t = fenceGeneric[1].trim();
    if (
      (t.startsWith("{") && t.endsWith("}")) ||
      (t.startsWith("[") && t.endsWith("]"))
    ) {
      return t;
    }
  }

  const trimmed = text.trim();
  if (
    (trimmed.startsWith("{") && trimmed.endsWith("}")) ||
    (trimmed.startsWith("[") && trimmed.endsWith("]"))
  ) {
    return trimmed;
  }

  const findBalanced = (open: string, close: string) => {
    let depth = 0;
    let start = -1;
    for (let i = 0; i < text.length; i++) {
      const ch = text[i];
      if (ch === open) {
        if (depth === 0) start = i;
        depth++;
      } else if (ch === close) {
        if (depth > 0) {
          depth--;
          if (depth === 0 && start !== -1) {
            const candidate = text.slice(start, i + 1).trim();
            if (candidate.startsWith(open) && candidate.endsWith(close))
              return candidate;
          }
        }
      }
    }
    return null;
  };

  return findBalanced("{", "}") || findBalanced("[", "]");
};

const ChatBubble = ({ message, isTyping = false, type }: ChatBubbleProps) => {
  const isResponse = type === "response";

  const { isJson, formattedJson } = useMemo(() => {
    const tryParse = (text: string) => {
      try {
        const obj = JSON.parse(text);
        return { ok: true, pretty: JSON.stringify(obj, null, 2) };
      } catch {
        return { ok: false, pretty: "" };
      }
    };

    const candidate = extractJsonCandidate(message);
    if (candidate) {
      const res = tryParse(candidate);
      if (res.ok) return { isJson: true, formattedJson: res.pretty };
    }

    return { isJson: false, formattedJson: "" };
  }, [message]);

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

        <div className="pt-6">
          {isJson ? (
            <motion.pre
              className="text-sm md:text-base text-left text-gray-800 dark:text-white leading-relaxed font-mono bg-gray-50 dark:bg-slate-800/50 border border-gray-200 dark:border-slate-700 rounded-xl p-4 whitespace-pre overflow-x-auto"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              <code>{formattedJson}</code>
              {isTyping && (
                <motion.span
                  {...typingIndicatorVariants}
                  className="ml-1 text-blue-500 font-bold"
                >
                  ▋
                </motion.span>
              )}
            </motion.pre>
          ) : (
            <motion.div
              className="prose prose-sm md:prose text-left max-w-none text-gray-800 dark:text-white dark:prose-invert"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              <ReactMarkdown
                remarkPlugins={[remarkGfm]}
                components={{
                  h1: ({ node, ...props }) => (
                    <h1 className="text-2xl md:text-3xl font-bold mt-2 mb-3" {...props} />
                  ),
                  h2: ({ node, ...props }) => (
                    <h2 className="text-xl md:text-2xl font-bold mt-2 mb-3" {...props} />
                  ),
                  h3: ({ node, ...props }) => (
                    <h3 className="text-lg md:text-xl font-semibold mt-2 mb-2" {...props} />
                  ),
                  p: ({ node, ...props }) => (
                    <p className="leading-relaxed mb-2" {...props} />
                  ),
                  a: ({ node, ...props }) => (
                    <a className="text-blue-600 dark:text-blue-400 hover:underline" target="_blank" rel="noopener noreferrer" {...props} />
                  ),
                  ul: ({ node, ...props }) => (
                    <ul className="list-disc list-inside pl-0 my-2" {...props} />
                  ),
                  ol: ({ node, ...props }) => (
                    <ol className="list-decimal list-inside pl-0 my-2" {...props} />
                  ),
                  li: ({ node, ...props }) => (
                    <li className="mb-1" {...props} />
                  ),
                  code: ({ className, children, ...props }: any) => {
                    const isCodeBlock = typeof className === "string" && /language-/.test(className);
                    if (isCodeBlock) {
                      return (
                        <code className="font-mono text-sm" {...props}>
                          {children}
                        </code>
                      );
                    }
                    return (
                      <code className="bg-gray-100 dark:bg-slate-800 px-1.5 py-0.5 rounded font-mono text-sm" {...props}>
                        {children}
                      </code>
                    );
                  },
                  pre: ({ node, ...props }) => (
                    <pre className="bg-gray-100 dark:bg-slate-800 rounded-lg p-3 my-3 overflow-x-auto" {...props} />
                  ),
                  blockquote: ({ node, ...props }) => (
                    <blockquote className="border-l-4 border-gray-300 dark:border-slate-600 pl-3 italic my-3" {...props} />
                  ),
                }}
              >
                {message}
              </ReactMarkdown>
              {isTyping && (
                <motion.span
                  {...typingIndicatorVariants}
                  className="ml-1 text-blue-500 font-bold"
                >
                  ▋
                </motion.span>
              )}
            </motion.div>
          )}
        </div>
      </motion.div>
    </motion.div>
  );
};

export default ChatBubble;
