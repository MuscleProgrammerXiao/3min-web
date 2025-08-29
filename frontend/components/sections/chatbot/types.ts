export interface ChatMessage {
  id: string
  content: string
  type: 'user' | 'ai'
  timestamp: Date
}

export interface AnimatedIconProps {
  icon: React.ReactNode
  className: string
  delay?: number
}

export interface BubbleDecorationProps {
  className: string
  duration?: number
}

export interface FloatingDecorationProps {
  className: string
  duration?: number
}

export interface ChatBubbleProps {
  message: string
  isTyping?: boolean
  type: 'welcome' | 'response'
}

export interface ChatInputProps {
  value: string
  onChange: (value: string) => void
  onSubmit: (message: string) => void
  isTyping: boolean
  inputRef: React.RefObject<HTMLInputElement>
}

export interface AIResponse {
  [key: string]: string
}