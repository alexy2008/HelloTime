import { ref, watch } from 'vue'

const THEME_KEY = 'time-capsule-theme'

export function useTheme() {
  const theme = ref(localStorage.getItem(THEME_KEY) || 'light')

  // 应用主题
  const applyTheme = (newTheme) => {
    document.documentElement.setAttribute('data-theme', newTheme)
    localStorage.setItem(THEME_KEY, newTheme)
  }

  // 切换主题
  const toggleTheme = () => {
    theme.value = theme.value === 'light' ? 'dark' : 'light'
  }

  // 监听主题变化
  watch(theme, (newTheme) => {
    applyTheme(newTheme)
  }, { immediate: true })

  return {
    theme,
    toggleTheme,
    isDark: () => theme.value === 'dark'
  }
}
