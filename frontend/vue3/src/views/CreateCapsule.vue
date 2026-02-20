<template>
  <div class="create-capsule">
    <div class="container">
      <!-- 创建表单 -->
      <div v-if="!showSuccessModal" class="card">
        <h1>创建时间胶囊</h1>
        <form @submit.prevent="handleSubmit">
          <div class="form-group">
            <label>胶囊标题 *</label>
            <input 
              v-model="formData.title" 
              type="text" 
              class="input"
              placeholder="给你的胶囊起个名字"
              maxlength="100"
            >
            <span v-if="errors.title" class="error">{{ errors.title }}</span>
          </div>
          
          <div class="form-group">
            <label>胶囊内容 *</label>
            <textarea 
              v-model="formData.content" 
              class="input"
              rows="6"
              placeholder="写下你想对未来的自己说的话..."
              maxlength="1000"
            ></textarea>
            <span v-if="errors.content" class="error">{{ errors.content }}</span>
          </div>
          
          <div class="form-group">
            <label>开启时间 *</label>
            <input 
              v-model="formData.openTime" 
              type="datetime-local" 
              class="input"
            >
            <span v-if="errors.openTime" class="error">{{ errors.openTime }}</span>
          </div>
          
          <div class="form-group">
            <label>你的昵称</label>
            <input 
              v-model="formData.author" 
              type="text" 
              class="input"
              placeholder="可选"
              maxlength="50"
            >
            <span v-if="errors.author" class="error">{{ errors.author }}</span>
          </div>
          
          <div class="form-actions">
            <button type="submit" class="btn btn-primary" :disabled="isLoading">
              {{ isLoading ? '创建中...' : '创建胶囊' }}
            </button>
            <router-link to="/" class="btn btn-secondary">取消</router-link>
          </div>
        </form>
      </div>
      
      <!-- 确认发布弹窗 -->
      <div v-if="showConfirmModal" class="modal-overlay" @click="cancelPublish">
        <div class="modal-content confirm-modal" @click.stop>
          <div class="modal-header">
            <h3>确认发布</h3>
          </div>
          <div class="modal-body">
            <p>胶囊一经发布无法删除，也无法更改。确定要发布吗？</p>
          </div>
          <div class="modal-footer">
            <button @click="cancelPublish" class="btn btn-secondary">取消</button>
            <button @click="confirmPublish" class="btn btn-primary">确定发布</button>
          </div>
        </div>
      </div>
      
      <!-- 创建成功界面 -->
      <div v-if="showSuccessModal" class="success-container">
        <div class="success-card">
          <div class="success-header">
            <div class="success-icon">✓</div>
            <h1>创建成功！</h1>
          </div>
          
          <div class="success-content">
            <p class="subtitle">你的胶囊码是：</p>
            <div class="capsule-code">{{ capsuleCode }}</div>
            <p class="tip">请妥善保管这个号码，这是查看胶囊的唯一凭证</p>
          </div>
          
          <div class="success-actions">
            <button @click="copyCode" class="btn btn-primary btn-large">
              复制胶囊码
            </button>
            <router-link to="/" class="btn btn-secondary btn-large">
              返回首页
            </router-link>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive } from 'vue'
import { capsuleApi } from '@/api'
import { validateForm } from '@/utils'

const isLoading = ref(false)
const showSuccessModal = ref(false)
const showConfirmModal = ref(false)  // 新增：确认弹窗状态
const capsuleCode = ref('')
const errors = ref({})

const formData = reactive({
  title: '',
  content: '',
  openTime: '',
  author: ''
})

const handleSubmit = async () => {
  const validation = validateForm(formData)
  
  if (!validation.isValid) {
    errors.value = validation.errors
    return
  }
  
  // 显示自定义确认弹窗而不是系统confirm
  showConfirmModal.value = true
}

// 确认发布
const confirmPublish = async () => {
  showConfirmModal.value = false
  errors.value = {}
  isLoading.value = true
  
  try {
    const response = await capsuleApi.create(formData)
    capsuleCode.value = response.data.capsuleCode
    showSuccessModal.value = true
    
    // 清空表单
    Object.assign(formData, {
      title: '',
      content: '',
      openTime: '',
      author: ''
    })
  } catch (error) {
    alert(error.message || '创建失败，请重试')
  } finally {
    isLoading.value = false
  }
}

// 取消发布
const cancelPublish = () => {
  showConfirmModal.value = false
}

const copyCode = async () => {
  try {
    await navigator.clipboard.writeText(capsuleCode.value)
    alert('胶囊码已复制到剪贴板')
  } catch (err) {
    // 降级方案
    const textArea = document.createElement('textarea')
    textArea.value = capsuleCode.value
    document.body.appendChild(textArea)
    textArea.select()
    document.execCommand('copy')
    document.body.removeChild(textArea)
    alert('胶囊码已复制到剪贴板')
  }
}
</script>

<style scoped>
.create-capsule {
  padding: 40px 20px;
  min-height: 100vh;
  background: linear-gradient(135deg, var(--color-bg) 0%, var(--color-border) 100%);
}

.card {
  max-width: 600px;
  margin: 0 auto;
}

.card h1 {
  text-align: center;
  margin-bottom: 2rem;
  color: var(--color-text);
}

/* 成功界面样式 */
.success-container {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 80vh;
}

.success-card {
  background: var(--color-bg-card);
  border-radius: 16px;
  padding: 3rem;
  box-shadow: var(--shadow-lg);
  text-align: center;
  max-width: 500px;
  width: 100%;
}

.success-header {
  margin-bottom: 2rem;
}

.success-icon {
  width: 80px;
  height: 80px;
  background: var(--color-success);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 1.5rem;
  font-size: 2.5rem;
  color: white;
  font-weight: bold;
}

.success-header h1 {
  color: var(--color-text);
  margin: 0;
  font-size: 2rem;
}

.success-content {
  margin-bottom: 2.5rem;
}

.subtitle {
  color: var(--color-text-secondary);
  font-size: 1.1rem;
  margin-bottom: 1.5rem;
}

.capsule-code {
  font-size: 2.5rem;
  font-weight: 800;
  letter-spacing: 0.3rem;
  background: var(--color-bg);
  padding: 1.5rem;
  border-radius: 12px;
  margin: 1.5rem 0;
  color: var(--color-text);
  font-family: 'Courier New', monospace;
}

.tip {
  color: var(--color-text-secondary);
  margin: 1.5rem 0;
  font-size: 0.9rem;
  line-height: 1.6;
}

.success-actions {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  margin-top: 1rem;
}

.btn-large {
  padding: 16px 24px;
  font-size: 1.1rem;
}

/* 模态弹窗样式 */
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1001;
}

.modal-content {
  background: var(--color-bg-card);
  border-radius: 12px;
  box-shadow: var(--shadow-lg);
  max-width: 400px;
  width: 90%;
  overflow: hidden;
}

.confirm-modal .modal-header {
  padding: 1.5rem 1.5rem 0.5rem;
  border-bottom: 1px solid var(--color-border);
}

.confirm-modal .modal-header h3 {
  margin: 0;
  color: var(--color-text);
  font-size: 1.25rem;
  font-weight: 600;
}

.confirm-modal .modal-body {
  padding: 1.5rem;
}

.confirm-modal .modal-body p {
  margin: 0;
  color: var(--color-text-secondary);
  line-height: 1.6;
}

.confirm-modal .modal-footer {
  padding: 1rem 1.5rem 1.5rem;
  display: flex;
  gap: 1rem;
  justify-content: flex-end;
}

.confirm-modal .modal-footer .btn {
  min-width: 80px;
  padding: 8px 16px;
}

/* 表单样式 */
.form-group {
  margin-bottom: 1.5rem;
}

.form-group label {
  display: block;
  margin-bottom: 0.5rem;
  font-weight: 500;
  color: var(--color-text);
}

textarea.input {
  resize: vertical;
  min-height: 120px;
}

.error {
  color: var(--color-error);
  font-size: 0.875rem;
  margin-top: 0.25rem;
  display: block;
}

.form-actions {
  display: flex;
  gap: 1rem;
  margin-top: 2rem;
}

/* 响应式设计 */
@media (max-width: 768px) {
  .success-card {
    padding: 2rem;
  }
  
  .capsule-code {
    font-size: 2rem;
    letter-spacing: 0.2rem;
  }
  
  .success-header h1 {
    font-size: 1.75rem;
  }
  
  .success-actions {
    flex-direction: column;
  }
}
</style>
