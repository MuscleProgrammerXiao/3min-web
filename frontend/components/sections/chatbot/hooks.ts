import { useCallback, useRef, useState } from "react";

export interface ChatStreamState {
  currentAnswer: string;
  isTyping: boolean;
  hasFirstChunk: boolean;
}

export const useChatStream = () => {
  const [currentAnswer, setCurrentAnswer] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [hasFirstChunk, setHasFirstChunk] = useState(false);

  const typingQueueRef = useRef<Promise<void>>(Promise.resolve());
  const abortControllerRef = useRef<AbortController | null>(null);

  const typeWriterReplace = useCallback(async (text: string) => {
    setCurrentAnswer("");
    setIsTyping(true);
    setHasFirstChunk(true);
    for (let i = 0; i <= text.length; i++) {
      // 逐字替换
      // 30ms 间隔以模拟打字机效果
      // 避免在 hook 内写注释，保持简洁
      // 此处实现沿用原有行为
      // eslint-disable-next-line no-await-in-loop
      await new Promise(resolve => setTimeout(resolve, 30));
      setCurrentAnswer(text.slice(0, i));
    }
    setIsTyping(false);
  }, []);

  const typeWriterAppend = useCallback(async (appendText: string) => {
    for (let i = 0; i < appendText.length; i++) {
      // 18ms 间隔的追加效果
      // eslint-disable-next-line no-await-in-loop
      await new Promise(resolve => setTimeout(resolve, 18));
      setCurrentAnswer(prev => prev + appendText[i]);
    }
  }, []);

  const abort = useCallback(() => {
    if (abortControllerRef.current) {
      try {
        abortControllerRef.current.abort();
      } catch {}
    }
  }, []);

  const reset = useCallback(() => {
    setCurrentAnswer("");
    setIsTyping(false);
    setHasFirstChunk(false);
  }, []);

  const submit = useCallback(async (message: string) => {
    abort();
    abortControllerRef.current = new AbortController();
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
        await typeWriterReplace(answer);
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
        await typeWriterReplace("请求失败，请稍后重试。");
      }
    }
  }, [abort, typeWriterReplace, typeWriterAppend]);

  return { currentAnswer, isTyping, hasFirstChunk, submit, reset, abort };
};