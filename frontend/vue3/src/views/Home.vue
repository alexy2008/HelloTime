<template>
  <div class="home">
    <div class="container">
      <div class="hero">
        <div class="logo">
          <img src="/tclogo.png" alt="Time Capsule Logo" class="logo-image">
          <h1 class="logo-text">时间胶囊</h1>
        </div>
        <p class="subtitle">写给未来自己的时间胶囊</p>
        <div class="actions">
          <router-link to="/create" class="btn btn-publish">
            发布
          </router-link>
          <button @click="showLookupModal = true" class="btn btn-open">
            开启
          </button>
        </div>
        <div class="about-link">
          <router-link to="/about" class="about-text">about</router-link>
        </div>
      </div>
    </div>
    
    <!-- 查看胶囊模态框 -->
    <div v-if="showLookupModal" class="modal-overlay" @click="showLookupModal = false">
      <div class="modal-content" @click.stop>
        <h2>查看胶囊</h2>
        <div class="form-group">
          <input 
            v-model="capsuleCode" 
            type="text" 
            placeholder="请输入8位胶囊码"
            class="input"
            maxlength="8"
            @keyup.enter="lookupCapsule"
          >
        </div>
        <div class="modal-actions">
          <button @click="lookupCapsule" class="btn btn-primary" :disabled="!capsuleCode">
            查看
          </button>
          <button @click="showLookupModal = false" class="btn btn-secondary">
            取消
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { validateCapsuleCode } from '@/utils'

const router = useRouter()
const showLookupModal = ref(false)
const capsuleCode = ref('')

const lookupCapsule = () => {
  if (validateCapsuleCode(capsuleCode.value)) {
    router.push(`/capsule/${capsuleCode.value}`)
  } else {
    alert('请输入正确的8位胶囊码')
  }
}
</script>

<style scoped>
.home {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px;
}

.hero {
  text-align: center;
  max-width: 600px;
}

.logo {
  margin-bottom: 2rem;
  cursor: pointer;
  user-select: none;
}

.logo-image {
  width: 150px;
  height: 150px;
  margin-bottom: 1rem;
  transition: transform 0.2s;
}

.logo:hover .logo-image {
  transform: scale(1.1);
}

.logo-text {
  font-size: 3rem;
  font-weight: 700;
  color: var(--color-text);
  margin: 0;
}

.subtitle {
  margin-top: 0.75rem;
  margin-bottom: 2rem;
  font-size: 1rem;
  color: var(--color-text-secondary);
}

.actions {
  display: flex;
  gap: 1rem;
  justify-content: center;
  flex-wrap: wrap;
  margin-bottom: 1rem;
}

.btn-publish {
  background-color: #3b82f6; /* 蓝色 */
  color: var(--color-bg-card);
  border: none;
  padding: 1rem 2rem;
  font-size: 1.1rem;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.2s;
  text-decoration: none;
  display: inline-block;
}

.btn-publish:hover {
  background-color: #2563eb;
  transform: translateY(-2px);
}

.btn-open {
  background-color: var(--color-success); /* 绿色 */
  color: var(--color-bg-card);
  border: none;
  padding: 1rem 2rem;
  font-size: 1.1rem;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.2s;
}

.btn-open:hover {
  background-color: #059669;
  transform: translateY(-2px);
}

.about-link {
  margin-top: 1rem;
}

.about-text {
  color: var(--color-text-secondary);
  font-size: 0.9rem;
  text-decoration: none;
  transition: color 0.2s;
}

.about-text:hover {
  color: var(--color-text);
  text-decoration: underline;
}

.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1001;
}

.modal-content {
  background: var(--color-bg-card);
  padding: 2rem;
  border-radius: 12px;
  width: 90%;
  max-width: 400px;
  box-shadow: var(--shadow-lg);
}

.form-group {
  margin-bottom: 1.5rem;
}

.modal-actions {
  display: flex;
  gap: 1rem;
  justify-content: center;
}

/* 响应式设计 */
@media (max-width: 768px) {
  .logo-image {
    width: 120px;
    height: 120px;
  }

  .logo-text {
    font-size: 2rem;
  }

  .subtitle {
    font-size: 0.9rem;
  }

  .btn-publish,
  .btn-open {
    padding: 0.875rem 1.5rem;
    font-size: 1rem;
  }

  .modal-content {
    padding: 1.5rem;
  }
}
</style>
