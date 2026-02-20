import axios from 'axios'
import { STORAGE_KEYS, APP_CONFIG } from '@/utils/constants'

// 创建 axios 实例
const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:8080/api',
  timeout: APP_CONFIG.apiTimeout,
  headers: {
    'Content-Type': 'application/json'
  }
})

// 请求拦截器
api.interceptors.request.use(
  config => {
    // 添加认证 token
    const token = localStorage.getItem(STORAGE_KEYS.adminToken)
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  error => {
    return Promise.reject(error)
  }
)

// 响应拦截器
api.interceptors.response.use(
  response => {
    const data = response.data
    // 新的 API 格式
    if (data.success !== undefined) {
      if (data.success) {
        return data
      } else {
        // 业务错误
        const error = new Error(data.error?.message || '请求失败')
        error.code = data.error?.code
        return Promise.reject(error)
      }
    }
    // 旧格式兼容
    return data
  },
  error => {
    // 统一错误处理
    if (error.response) {
      const { status, data } = error.response
      const errorInfo = data?.error || {}
      const errorMessage = errorInfo.message || data?.message || '请求失败'
      
      switch (status) {
        case 401:
          // 未授权，清除 token 并跳转到登录页
          localStorage.removeItem(STORAGE_KEYS.adminToken)
          window.location.href = '/admin'
          break
        case 403:
          console.error('没有权限访问')
          break
        case 404:
          console.error('资源不存在')
          break
        case 500:
          console.error('服务器内部错误')
          break
        default:
          console.error(errorMessage)
      }
      
      const err = new Error(errorMessage)
      err.code = errorInfo.code
      err.status = status
      return Promise.reject(err)
    } else if (error.request) {
      console.error('网络错误，请检查网络连接')
      return Promise.reject(new Error('网络错误，请检查网络连接'))
    } else {
      console.error('请求配置错误')
      return Promise.reject(error)
    }
  }
)

// API 接口定义
export const capsuleApi = {
  // 创建胶囊
  create: (data) => api.post('/capsules', {
    title: data.title,
    content: data.content,
    openTime: data.openTime,
    creatorNickname: data.author || data.creatorNickname
  }),
  
  // 获取胶囊信息
  get: (capsuleCode) => api.get(`/capsules/${capsuleCode}`)
}

export const adminApi = {
  // 管理员登录
  login: (password) => api.post('/admin/login', { password }),
  
  // 获取所有胶囊（分页）
  getAll: (page = 1, size = 20, sort = 'createdAt,desc') => 
    api.get('/admin/capsules', { params: { page, size, sort } }),
  
  // 删除胶囊
  delete: (capsuleCode) => api.delete(`/admin/capsules/${capsuleCode}`)
}

export const systemApi = {
  // 获取应用信息
  getAbout: () => api.get('/about'),
  
  // 健康检查
  getHealth: () => api.get('/health')
}

export default api
