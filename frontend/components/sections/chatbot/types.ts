import { ElementType } from "react";

export interface ChatMessage {
  id: string;
  content: string;
  type: "user" | "ai";
  timestamp: Date;
}

export interface AnimatedIconProps {
  icon: ElementType;
  className: string;
  delay?: number;
}

export interface BubbleDecorationProps {
  className: string;
  duration?: number;
}

export interface FloatingDecorationProps {
  className: string;
  duration?: number;
}

export interface ChatBubbleProps {
  message: string;
  isTyping?: boolean;
  type: "welcome" | "response";
}

export interface ChatInputProps {
  value: string;
  onChange: (value: string) => void;
  onSubmit: (message: string) => void;
  isTyping: boolean;
  inputRef: React.RefObject<HTMLInputElement>;
  shouldFocusOnSuggestion?: boolean; // 建议点击后是否聚焦输入框，默认 true
}

export interface AIResponse {
  [key: string]: string;
}
