import { useTheme } from '@/store/ThemeContext'
import './ThemeToggle.css'

function ThemeToggle() {
  const { theme, toggleTheme } = useTheme()

  return (
    <button
      onClick={toggleTheme}
      className="theme-toggle"
      title={theme === 'light' ? '切换到暗色模式' : '切换到明亮模式'}
    >
      <span className="icon">{theme === 'light' ? '🌙' : '☀️'}</span>
    </button>
  )
}

export default ThemeToggle
