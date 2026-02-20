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
  background: linear-gradient(135deg, var(--color-bg) 0%, var(--color-border) 100%);
}

.loading {
  text-align: center;
  padding: 40px;
}

.spinner {
  width: 40px;
  height: 40px;
  border: 4px solid var(--color-border);
  border-top: 4px solid var(--color-primary);
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
  color: var(--color-text);
}

.capsule-meta {
  background: var(--color-bg);
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
  color: var(--color-text-secondary);
}

.value {
  color: var(--color-text);
}

.countdown-section {
  text-align: center;
  margin: 2rem 0;
}

.countdown h3 {
  margin-bottom: 1.5rem;
  color: var(--color-text);
}

.timer {
  display: flex;
  justify-content: center;
  gap: 1rem;
  flex-wrap: wrap;
}

.time-unit {
  background: var(--color-primary);
  color: var(--color-bg-card);
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
  color: var(--color-text);
}

.content {
  background: var(--color-bg);
  padding: 1.5rem;
  border-radius: 8px;
  line-height: 1.8;
  var(--color-bg-card)-space: pre-wrap;
  border-left: 4px solid var(--color-primary);
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

/* 响应式设计 */
@media (max-width: 768px) {
  .capsule-content {
    max-width: 100%;
  }

  .capsule-content h1 {
    font-size: 1.5rem;
    margin-bottom: 1.5rem;
  }

  .capsule-meta {
    padding: 1rem;
  }

  .meta-item {
    flex-direction: column;
    gap: 0.25rem;
  }

  .timer {
    gap: 0.5rem;
  }

  .time-unit {
    min-width: 60px;
    padding: 0.75rem;
  }

  .number {
    font-size: 1.5rem;
  }

  .unit {
    font-size: 0.75rem;
  }

  .content {
    padding: 1rem;
    font-size: 0.9rem;
  }

  .content-section h3 {
    font-size: 1rem;
  }

  .countdown h3 {
    font-size: 1rem;
  }
}
</style>