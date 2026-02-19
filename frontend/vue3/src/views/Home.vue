<template>
  <div class="home">
    <div class="container">
      <div class="hero">
        <div class="logo">
          <div class="logo-icon">🕐</div>
          <h1 class="logo-text">Time Capsule</h1>
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

.logo-icon {
  font-size: 4rem;
  margin-bottom: 1rem;
  transition: transform 0.2s;
}

.logo:hover .logo-icon {
  transform: scale(1.1);
}

.logo-text {
  font-size: 2.5rem;
  font-weight: 700;
  color: #1f2937;
  margin: 0;
}

.subtitle {
  margin-top: 0.75rem;
  margin-bottom: 2rem;
  font-size: 1rem;
  color: #6b7280;
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
  color: white;
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
  background-color: #10b981; /* 绿色 */
  color: white;
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
  color: #6b7280;
  font-size: 0.9rem;
  text-decoration: none;
  transition: color 0.2s;
}

.about-text:hover {
  color: #4b5563;
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
  z-index: 1000;
}

.modal-content {
  background: white;
  padding: 2rem;
  border-radius: 12px;
  width: 90%;
  max-width: 400px;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.2);
}

.form-group {
  margin-bottom: 1.5rem;
}

.modal-actions {
  display: flex;
  gap: 1rem;
  justify-content: center;
}
</style>
