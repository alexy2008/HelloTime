import { reactive, toRefs } from 'vue'

// 全局 Toast 状态
const state = reactive({
  visible: false,
  message: '',
  type: 'info',
  duration: 3000
})

/**
 * Toast 组合式函数
 * 使用方法：
 *   const toast = useToast()
 *   toast.success('操作成功')
 *   toast.error('操作失败')
 */
export function useToast() {
  const show = (message, type = 'info', duration = 3000) => {
    state.message = message
    state.type = type
    state.duration = duration
    state.visible = true
  }

  const success = (message, duration) => {
    show(message, 'success', duration)
  }

  const error = (message, duration) => {
    show(message, 'error', duration)
  }

  const warning = (message, duration) => {
    show(message, 'warning', duration)
  }

  const info = (message, duration) => {
    show(message, 'info', duration)
  }

  const close = () => {
    state.visible = false
  }

  return {
    ...toRefs(state),
    show,
    success,
    error,
    warning,
    info,
    close
  }
}

export default useToast
