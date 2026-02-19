import { APP_CONFIG } from './constants'

/**
 * 验证胶囊码格式
 * @param {string} code - 胶囊码
 * @returns {{ valid: boolean, message?: string }}
 */
export function validateCapsuleCode(code) {
  if (!code) {
    return { valid: false, message: '请输入胶囊码' }
  }
  
  if (code.length !== APP_CONFIG.capsuleCode.length) {
    return { 
      valid: false, 
      message: `胶囊码必须为${APP_CONFIG.capsuleCode.length}位` 
    }
  }
  
  if (!APP_CONFIG.capsuleCode.pattern.test(code)) {
    return { 
      valid: false, 
      message: '胶囊码只能包含大写字母和数字' 
    }
  }
  
  return { valid: true }
}

/**
 * 验证胶囊标题
 * @param {string} title - 标题
 * @returns {{ valid: boolean, message?: string }}
 */
export function validateTitle(title) {
  if (!title || !title.trim()) {
    return { valid: false, message: '请输入标题' }
  }
  
  if (title.length > APP_CONFIG.validation.titleMaxLength) {
    return { 
      valid: false, 
      message: `标题不能超过${APP_CONFIG.validation.titleMaxLength}个字符` 
    }
  }
  
  return { valid: true }
}

/**
 * 验证胶囊内容
 * @param {string} content - 内容
 * @returns {{ valid: boolean, message?: string }}
 */
export function validateContent(content) {
  if (!content || !content.trim()) {
    return { valid: false, message: '请输入胶囊内容' }
  }
  
  if (content.length > APP_CONFIG.validation.contentMaxLength) {
    return { 
      valid: false, 
      message: `内容不能超过${APP_CONFIG.validation.contentMaxLength}个字符` 
    }
  }
  
  return { valid: true }
}

/**
 * 验证昵称
 * @param {string} author - 昵称
 * @returns {{ valid: boolean, message?: string }}
 */
export function validateAuthor(author) {
  if (author && author.length > APP_CONFIG.validation.authorMaxLength) {
    return { 
      valid: false, 
      message: `昵称不能超过${APP_CONFIG.validation.authorMaxLength}个字符` 
    }
  }
  
  return { valid: true }
}

/**
 * 验证开启时间
 * @param {string} openTime - 开启时间
 * @returns {{ valid: boolean, message?: string }}
 */
export function validateOpenTime(openTime) {
  if (!openTime) {
    return { valid: false, message: '请选择开启时间' }
  }
  
  const openDate = new Date(openTime)
  const now = new Date()
  
  if (openDate <= now) {
    return { valid: false, message: '开启时间必须晚于当前时间' }
  }
  
  return { valid: true }
}

/**
 * 验证管理员密码
 * @param {string} password - 密码
 * @returns {{ valid: boolean, message?: string }}
 */
export function validatePassword(password) {
  if (!password) {
    return { valid: false, message: '请输入密码' }
  }
  
  if (password.length < 4) {
    return { valid: false, message: '密码长度至少4位' }
  }
  
  return { valid: true }
}

/**
 * 验证胶囊创建数据
 * @param {Object} data - 胶囊数据
 * @returns {{ valid: boolean, errors: Object }}
 */
export function validateCapsuleData(data) {
  const errors = {}
  
  const titleResult = validateTitle(data.title)
  if (!titleResult.valid) errors.title = titleResult.message
  
  const contentResult = validateContent(data.content)
  if (!contentResult.valid) errors.content = contentResult.message
  
  const authorResult = validateAuthor(data.author)
  if (!authorResult.valid) errors.author = authorResult.message
  
  const timeResult = validateOpenTime(data.openTime)
  if (!timeResult.valid) errors.openTime = timeResult.message
  
  return {
    valid: Object.keys(errors).length === 0,
    errors
  }
}

export default {
  validateCapsuleCode,
  validateTitle,
  validateContent,
  validateAuthor,
  validateOpenTime,
  validatePassword,
  validateCapsuleData
}
