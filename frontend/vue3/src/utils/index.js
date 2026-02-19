import dayjs from 'dayjs'
import 'dayjs/locale/zh-cn'

// 设置中文语言
dayjs.locale('zh-cn')

// 格式化时间
export const formatDate = (date, format = 'YYYY-MM-DD HH:mm:ss') => {
  // 处理后端返回的时间字符串格式
  if (typeof date === 'string' && date.includes(' ')) {
    date = date.replace(' ', 'T')
  }
  return dayjs(date).format(format)
}

// 检查是否已过期
export const isExpired = (date) => {
  // 处理后端返回的时间字符串格式
  if (typeof date === 'string' && date.includes(' ')) {
    date = date.replace(' ', 'T')
  }
  return dayjs().isAfter(dayjs(date))
}

// 验证胶囊码格式
export const validateCapsuleCode = (code) => {
  const regex = /^[A-Z0-9]{8}$/
  return regex.test(code)
}

// 验证表单数据
export const validateForm = (data) => {
  const errors = {}
  
  if (!data.title?.trim()) {
    errors.title = '请输入胶囊标题'
  } else if (data.title.length > 100) {
    errors.title = '标题长度不能超过100个字符'
  }
  
  if (!data.content?.trim()) {
    errors.content = '请输入胶囊内容'
  } else if (data.content.length > 1000) {
    errors.content = '内容长度不能超过1000个字符'
  }
  
  if (data.author && data.author.length > 50) {
    errors.author = '昵称长度不能超过50个字符'
  }
  
  if (!data.openTime) {
    errors.openTime = '请选择开启时间'
  } else if (dayjs(data.openTime).isBefore(dayjs())) {
    errors.openTime = '开启时间必须是未来时间'
  }
  
  return {
    isValid: Object.keys(errors).length === 0,
    errors
  }
}

// 显示提示信息
export const showMessage = (message, type = 'info') => {
  // 这里可以集成 Toast 组件
  console.log(`[${type}] ${message}`)
}

// 防抖函数
export const debounce = (func, wait) => {
  let timeout
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout)
      func(...args)
    }
    clearTimeout(timeout)
    timeout = setTimeout(later, wait)
  }
}

// 节流函数
export const throttle = (func, limit) => {
  let inThrottle
  return function() {
    const args = arguments
    const context = this
    if (!inThrottle) {
      func.apply(context, args)
      inThrottle = true
      setTimeout(() => inThrottle = false, limit)
    }
  }
}