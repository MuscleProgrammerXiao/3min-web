import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'

interface User {
  id: string
  name: string
  email: string
  role: 'admin'
}

interface GlobalState {
  // UI 状态 - 不持久化，避免水合问题
  sidebarOpen: boolean
  setSidebarOpen: (open: boolean) => void
  
  // 用户状态 - 持久化
  isAuthenticated: boolean
  user: User | null
  login: (user: User) => void
  logout: () => void
  isAdmin: () => boolean
}

// 分离 UI 状态和用户状态
// 兼容 SSR/路由切换时的 localStorage 不可用情况
const noopStorage: Storage = {
  getItem: () => null,
  setItem: () => {},
  removeItem: () => {},
  clear: () => {},
  key: () => null,
  length: 0,
}
const safeStorage = typeof window !== 'undefined' ? localStorage : noopStorage

export const useGlobalStore = create<GlobalState>()(
  persist(
    (set, get) => ({
      // UI 状态 - 默认值
      sidebarOpen: false,
      setSidebarOpen: (open: boolean) => set({ sidebarOpen: open }),
      
      // 用户状态
      isAuthenticated: false,
      user: null,
      
      login: (user: User) => set({ 
        isAuthenticated: true, 
        user 
      }),
      
      logout: () => set({ 
        isAuthenticated: false, 
        user: null 
      }),
      
      isAdmin: () => {
        const state = get()
        return state.isAuthenticated && state.user?.role === 'admin'
      },
    }),
    {
      name: 'user-storage',
      storage: createJSONStorage(() => safeStorage),
      // 只持久化用户相关状态，不持久化 UI 状态
      partialize: (state) => ({
        isAuthenticated: state.isAuthenticated,
        user: state.user,
      }),
    }
  )
)