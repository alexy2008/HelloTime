<template>
  <div id="app">
    <Navbar />
    <div class="app-content">
      <router-view />
    </div>
    <Toast />
  </div>
</template>

<script setup>
import Toast from './components/Toast.vue'
import Navbar from './components/Navbar.vue'
</script>

<style>
body {
  background-color: var(--color-bg);
}

.app-content {
  padding-top: 70px;
  min-height: 100vh;
}
</style>