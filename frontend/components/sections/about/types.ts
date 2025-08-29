import { LucideIcon } from 'lucide-react'

export interface Skill {
  name: string
  level: number
  color: string
  icon: LucideIcon
  category: string
  description: string
}

export interface Interest {
  icon: LucideIcon
  name: string
  description: string
  gradient: string
}

// export interface AnimationVariants {
//   containerVariants: any
//   itemVariants: any
//   skillCardVariants: any
//   progressVariants: any
//   interestVariants: any
// }