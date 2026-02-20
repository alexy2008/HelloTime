import { create } from 'zustand'
import { STORAGE_KEYS } from '@/utils/constants'

// 管理员状态管理
export const useAdminStore = create((set, get) => ({
  isAuthenticated: false,
  token: null,
  
  setAuth: (token) => {
    set({ 
      isAuthenticated: !!token, 
      token 
    })
    if (token) {
      localStorage.setItem(STORAGE_KEYS.adminToken, token)
    } else {
      localStorage.removeItem(STORAGE_KEYS.adminToken)
    }
  },
  
  checkAuth: () => {
    const token = localStorage.getItem(STORAGE_KEYS.adminToken)
    set({ 
      isAuthenticated: !!token, 
      token 
    })
  },
  
  logout: () => {
    get().setAuth(null)
  }
}))

// Toast 状态管理
export const useToastStore = create((set) => ({
  visible: false,
  message: '',
  type: 'info',
  duration: 3000,
  
  show: (message, type = 'info', duration = 3000) => {
    set({ message, type, duration, visible: true })
  },
  
  success: (message, duration) => {
    set({ message, type: 'success', duration: duration || 3000, visible: true })
  },
  
  error: (message, duration) => {
    set({ message, type: 'error', duration: duration || 3000, visible: true })
  },
  
  warning: (message, duration) => {
    set({ message, type: 'warning', duration: duration || 3000, visible: true })
  },
  
  info: (message, duration) => {
    set({ message, type: 'info', duration: duration || 3000, visible: true })
  },
  
  close: () => {
    set({ visible: false })
  }
}))
