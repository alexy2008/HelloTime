import axios from 'axios'
import router from '@/router'
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
    return response.data
  },
  error => {
    // 统一错误处理
    if (error.response) {
      const { status, data } = error.response
      switch (status) {
        case 401:
          // 未授权，清除 token 并跳转到登录页
          localStorage.removeItem(STORAGE_KEYS.adminToken)
          router.push('/admin')
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
          console.error(data?.message || '请求失败')
      }
    } else if (error.request) {
      console.error('网络错误，请检查网络连接')
    } else {
      console.error('请求配置错误')
    }
    return Promise.reject(error)
  }
)

// API 接口定义
export const capsuleApi = {
  // 创建胶囊
  create: (data) => api.post('/capsules', data),
  
  // 获取胶囊信息
  get: (capsuleCode) => api.get(`/capsules/${capsuleCode}`),
  
  // 检查胶囊状态
  getStatus: (capsuleCode) => api.get(`/capsules/${capsuleCode}/status`)
}

export const adminApi = {
  // 管理员登录
  login: (password) => api.post('/admin/login', { password }),
  
  // 获取所有胶囊
  getAll: () => api.get('/admin/capsules'),
  
  // 删除胶囊
  delete: (id) => api.delete(`/admin/capsules/${id}`)
}

export default api