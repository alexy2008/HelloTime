import { useState, useEffect } from 'react'

const THEME_KEY = 'time-capsule-theme'

export default function ThemeSwitch() {
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem(THEME_KEY) || 'light'
  })

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme)
    localStorage.setItem(THEME_KEY, theme)
  }, [theme])

  const toggleTheme = () => {
    setTheme(prev => prev === 'light' ? 'dark' : 'light')
  }

  return (
    <button
      onClick={toggleTheme}
      style={{
        background: 'transparent',
        border: '1px solid var(--color-border)',
        padding: '8px 16px',
        borderRadius: '8px',
        cursor: 'pointer',
        fontSize: '1.2rem'
      }}
      title={theme === 'light' ? '切换到暗色模式' : '切换到明亮模式'}
    >
      {theme === 'light' ? '🌙' : '☀️'}
    </button>
  )
}
