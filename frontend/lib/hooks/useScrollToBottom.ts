import { useCallback } from "react";

export function useScrollToBottom() {
  const scrollToBottom = useCallback(() => {
    const bottom = Math.max(
      document.documentElement.scrollHeight,
      document.body.scrollHeight
    );
    window.scrollTo({ top: bottom, behavior: "smooth" });
  }, []);

  return scrollToBottom;
}