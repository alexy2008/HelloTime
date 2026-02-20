<template>
  <button @click="toggleTheme" class="theme-toggle" :title="theme === 'light' ? '切换到暗色模式' : '切换到明亮模式'">
    <span v-if="theme === 'light'" class="icon">🌙</span>
    <span v-else class="icon">☀️</span>
  </button>
</template>

<script setup>
import { useTheme } from '@/composables/useTheme'

const { theme, toggleTheme } = useTheme()
</script>

<style scoped>
.theme-toggle {
  background: transparent;
  border: 1px solid var(--color-border);
  border-radius: var(--radius-md);
  padding: 8px 12px;
  cursor: pointer;
  transition: all 0.2s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.2rem;
}

.theme-toggle:hover {
  background-color: var(--color-bg-card);
  border-color: var(--color-primary);
  transform: scale(1.05);
}

.icon {
  display: block;
  line-height: 1;
}
</style>
