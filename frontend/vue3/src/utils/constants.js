/**
 * 应用常量配置
 */
export const APP_CONFIG = {
  // 应用信息
  name: 'Time Capsule',
  version: '1.0.0',
  
  // API 配置
  apiTimeout: 10000,
  
  // 胶囊码配置
  capsuleCode: {
    length: 8,
    pattern: /^[A-Z0-9]{8}$/
  },
  
  // 验证规则
  validation: {
    titleMaxLength: 100,
    contentMaxLength: 1000,
    authorMaxLength: 50
  },
  
  // 管理员配置
  admin: {
    clickCountToEnter: 5,
    clickTimeWindow: 1000 // 毫秒
  }
}

/**
 * 消息提示配置
 */
export const TOAST_CONFIG = {
  duration: 3000,
  position: 'top'
}

/**
 * 本地存储 Key
 */
export const STORAGE_KEYS = {
  adminToken: 'admin-token'
}

export default {
  APP_CONFIG,
  TOAST_CONFIG,
  STORAGE_KEYS
}
