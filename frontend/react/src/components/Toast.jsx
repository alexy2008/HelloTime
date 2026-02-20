import { useEffect } from 'react'
import { useToastStore } from '@/store'
import './Toast.css'

function Toast() {
  const { visible, message, type, duration, close } = useToastStore()

  useEffect(() => {
    if (visible && duration > 0) {
      const timer = setTimeout(() => {
        close()
      }, duration)
      return () => clearTimeout(timer)
    }
  }, [visible, duration, close])

  const getIcon = () => {
    switch (type) {
      case 'success':
        return '✓'
      case 'error':
        return '✕'
      case 'warning':
        return '⚠'
      default:
        return 'ℹ'
    }
  }

  if (!visible) return null

  return (
    <div className={`toast toast-${type}`}>
      <div className="toast-icon">{getIcon()}</div>
      <div className="toast-content">{message}</div>
    </div>
  )
}

export default Toast
