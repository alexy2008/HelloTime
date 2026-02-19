<template>
  <div class="view-capsule">
    <div class="container">
      <div v-if="isLoading" class="loading">
        <div class="spinner"></div>
        <p>正在加载胶囊...</p>
      </div>
      
      <div v-else-if="capsule" class="card capsule-content">
        <h1>{{ capsule.title }}</h1>
        
        <div class="capsule-meta">
          <div class="meta-item">
            <span class="label">发布者:</span>
            <span class="value">{{ capsule.author || '匿名用户' }}</span>
          </div>
          <div class="meta-item">
            <span class="label">创建时间:</span>
            <span class="value">{{ formatDate(capsule.createTime) }}</span>
          </div>
          <div class="meta-item">
            <span class="label">开启时间:</span>
            <span class="value">{{ formatDate(capsule.openTime) }}</span>
          </div>
        </div>
        
        <div v-if="!isExpired(capsule.openTime)" class="countdown-section">
          <div class="countdown">
            <h3>距离开启还有</h3>
            <div class="timer">
              <div class="time-unit">
                <span class="number">{{ countdown.days }}</span>
                <span class="unit">天</span>
              </div>
              <div class="time-unit">
                <span class="number">{{ countdown.hours }}</span>
                <span class="unit">时</span>
              </div>
              <div class="time-unit">
                <span class="number">{{ countdown.minutes }}</span>
                <span class="unit">分</span>
              </div>
              <div class="time-unit">
                <span class="number">{{ countdown.seconds }}</span>
                <span class="unit">秒</span>
              </div>
            </div>
          </div>
        </div>
        
        <div v-else class="content-section">
          <h3>胶囊内容</h3>
          <div class="content">
            {{ capsule.content }}
          </div>
        </div>
        
        <div class="actions">
          <router-link to="/" class="btn btn-primary">返回首页</router-link>
        </div>
      </div>
      
      <div v-else-if="error" class="error-section">
        <div class="alert alert-error">
          {{ error }}
        </div>
        <router-link to="/" class="btn btn-secondary">返回首页</router-link>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { useRoute } from 'vue-router'
import { capsuleApi } from '@/api'
import { formatDate, isExpired } from '@/utils'

const route = useRoute()
const capsule = ref(null)
const isLoading = ref(true)
const error = ref(null)
const countdown = ref({
  days: 0,
  hours: 0,
  minutes: 0,
  seconds: 0
})

let countdownTimer = null

const loadCapsule = async () => {
  const capsuleCode = route.params.code
  
  try {
    isLoading.value = true
    error.value = null
    
    const response = await capsuleApi.get(capsuleCode)
    capsule.value = response.data
    
    if (!isExpired(capsule.value.openTime)) {
      startCountdown()
    }
  } catch (err) {
    error.value = err.response?.data?.message || '胶囊不存在或已删除'
  } finally {
    isLoading.value = false
  }
}

const startCountdown = () => {
  const updateCountdown = () => {
    const now = new Date()
    // 确保正确解析后端返回的时间字符串
    const openTime = new Date(capsule.value.openTime.replace(' ', 'T'))
    const diff = openTime - now
    
    if (diff <= 0) {
      clearInterval(countdownTimer)
      window.location.reload() // 重新加载以显示内容
      return
    }
    
    const days = Math.floor(diff / (1000 * 60 * 60 * 24))
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60))
    const seconds = Math.floor((diff % (1000 * 60)) / 1000)
    
    countdown.value = { days, hours, minutes, seconds }
  }
  
  updateCountdown()
  countdownTimer = setInterval(updateCountdown, 1000)
}

onMounted(() => {
  loadCapsule()
})

onUnmounted(() => {
  if (countdownTimer) {
    clearInterval(countdownTimer)
  }
})
</script>

<style scoped>
.view-capsule {
  padding: 40px 20px;
  min-height: 100vh;
  background: linear-gradient(135deg, #f9fafb 0%, #e5e7eb 100%);
}

.loading {
  text-align: center;
  padding: 40px;
}

.spinner {
  width: 40px;
  height: 40px;
  border: 4px solid #e5e7eb;
  border-top: 4px solid #4f46e5;
  border-radius: 50%;
  animation: spin 1s linear infinite;
  margin: 0 auto 1rem;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

.capsule-content {
  max-width: 800px;
  margin: 0 auto;
}

.capsule-content h1 {
  text-align: center;
  margin-bottom: 2rem;
  color: #1f2937;
}

.capsule-meta {
  background: #f9fafb;
  padding: 1.5rem;
  border-radius: 8px;
  margin-bottom: 2rem;
}

.meta-item {
  display: flex;
  justify-content: space-between;
  margin-bottom: 0.5rem;
}

.meta-item:last-child {
  margin-bottom: 0;
}

.label {
  font-weight: 500;
  color: #6b7280;
}

.value {
  color: #1f2937;
}

.countdown-section {
  text-align: center;
  margin: 2rem 0;
}

.countdown h3 {
  margin-bottom: 1.5rem;
  color: #374151;
}

.timer {
  display: flex;
  justify-content: center;
  gap: 1rem;
  flex-wrap: wrap;
}

.time-unit {
  background: #4f46e5;
  color: white;
  padding: 1rem;
  border-radius: 8px;
  min-width: 80px;
}

.number {
  display: block;
  font-size: 2rem;
  font-weight: 700;
  line-height: 1;
}

.unit {
  display: block;
  font-size: 0.875rem;
  opacity: 0.9;
}

.content-section {
  margin: 2rem 0;
}

.content-section h3 {
  margin-bottom: 1rem;
  color: #374151;
}

.content {
  background: #f9fafb;
  padding: 1.5rem;
  border-radius: 8px;
  line-height: 1.8;
  white-space: pre-wrap;
  border-left: 4px solid #4f46e5;
}

.actions {
  text-align: center;
  margin-top: 2rem;
}

.error-section {
  max-width: 500px;
  margin: 0 auto;
  text-align: center;
}
</style>