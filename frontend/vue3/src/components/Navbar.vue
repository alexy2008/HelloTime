<template>
  <nav class="navbar">
    <div class="navbar-container">
      <router-link to="/" class="navbar-brand">
        <img src="/tclogo.png" alt="Time Capsule" class="navbar-logo">
        <span class="navbar-title">时间胶囊</span>
      </router-link>
      <div class="navbar-actions">
        <ThemeToggle />
      </div>
    </div>
  </nav>
</template>

<script setup>
import ThemeToggle from './ThemeToggle.vue'
</script>

<style scoped>
.navbar {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  background-color: var(--color-bg-card);
  border-bottom: 1px solid var(--color-border);
  z-index: 1000;
  padding: 0.75rem 0;
}

.navbar-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1.5rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.navbar-brand {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  text-decoration: none;
  color: var(--color-text);
  font-weight: 600;
  font-size: 1.25rem;
}

.navbar-logo {
  width: 40px;
  height: 40px;
  object-fit: contain;
}

.navbar-title {
  color: var(--color-text);
  font-weight: 700;
}

.navbar-actions {
  display: flex;
  align-items: center;
  gap: 1rem;
}
</style>
