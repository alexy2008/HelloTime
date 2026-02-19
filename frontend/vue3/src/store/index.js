import { defineStore } from 'pinia'
import { STORAGE_KEYS, APP_CONFIG } from '@/utils/constants'

// 胶囊状态管理
export const useCapsuleStore = defineStore('capsule', {
  state: () => ({
    currentCapsule: null,
    capsules: [],
    isLoading: false,
    error: null
  }),
  
  actions: {
    setCurrentCapsule(capsule) {
      this.currentCapsule = capsule
    },
    
    setCapsules(capsules) {
      this.capsules = capsules
    },
    
    addCapsule(capsule) {
      this.capsules.unshift(capsule)
    },
    
    removeCapsule(id) {
      this.capsules = this.capsules.filter(c => c.id !== id)
    },
    
    setLoading(loading) {
      this.isLoading = loading
    },
    
    setError(error) {
      this.error = error
    },
    
    clearError() {
      this.error = null
    },
    
    clear() {
      this.currentCapsule = null
      this.capsules = []
      this.error = null
    }
  }
})

// 管理员状态管理
export const useAdminStore = defineStore('admin', {
  state: () => ({
    isAuthenticated: false,
    token: null
  }),
  
  actions: {
    setAuth(token) {
      this.isAuthenticated = !!token
      this.token = token
      if (token) {
        localStorage.setItem(STORAGE_KEYS.adminToken, token)
      } else {
        localStorage.removeItem(STORAGE_KEYS.adminToken)
      }
    },
    
    checkAuth() {
      const token = localStorage.getItem(STORAGE_KEYS.adminToken)
      this.isAuthenticated = !!token
      this.token = token
    },
    
    logout() {
      this.setAuth(null)
    }
  }
})

// 导出配置供外部使用
export { APP_CONFIG }