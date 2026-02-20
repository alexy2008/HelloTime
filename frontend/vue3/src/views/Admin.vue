<template>
  <div class="admin">
    <div class="container">
      <div v-if="!isAdmin" class="login-form">
        <div class="card">
          <h1>管理员登录</h1>
          <form @submit.prevent="handleLogin">
            <div class="form-group">
              <label>管理员密码</label>
              <input 
                v-model="password" 
                type="password" 
                class="input"
                placeholder="请输入管理员密码"
              >
            </div>
            <button type="submit" class="btn btn-primary" :disabled="isLoading">
              {{ isLoading ? '登录中...' : '登录' }}
            </button>
          </form>
        </div>
      </div>
      
      <div v-else>
        <div class="header">
          <h1>胶囊管理</h1>
          <button @click="logout" class="btn btn-secondary">退出登录</button>
        </div>
        
        <div class="actions">
          <input
            v-model="searchKeyword"
            type="text"
            class="input search-input"
            placeholder="按标题或胶囊码搜索"
          >
          <button @click="loadCapsules" class="btn btn-primary">刷新列表</button>
        </div>
        
        <div v-if="isLoading" class="loading">
          <div class="spinner"></div>
          <p>加载中...</p>
        </div>
        
        <div v-else-if="filteredCapsules.length > 0" class="capsules-list">
          <div 
            v-for="capsule in filteredCapsules" 
            :key="capsule.id"
            class="capsule-item card"
          >
            <div class="capsule-header">
              <h3>{{ capsule.title }}</h3>
              <span class="capsule-code">{{ capsule.capsuleCode }}</span>
            </div>
            
            <div class="capsule-meta">
              <div class="meta-item">
                <span class="label">作者:</span>
                <span class="value">{{ capsule.creatorNickname || capsule.author || '匿名' }}</span>
              </div>
              <div class="meta-item">
                <span class="label">创建时间:</span>
                <span class="value">{{ formatDate(capsule.createdAt || capsule.createTime) }}</span>
              </div>
              <div class="meta-item">
                <span class="label">开启时间:</span>
                <span class="value">{{ formatDate(capsule.openTime) }}</span>
              </div>
              <div class="meta-item">
                <span class="label">状态:</span>
                <span class="value" :class="{ 'status-open': capsule.canOpen || capsule.isOpen }">
                  {{ (capsule.canOpen || capsule.isOpen) ? '已开启' : '未开启' }}
                </span>
              </div>
            </div>
            
            <div class="capsule-content">
              <div class="label">胶囊内容:</div>
              <p class="content-text">
                {{ capsule.content || '（暂无内容）' }}
              </p>
            </div>
            
            <div class="capsule-actions">
              <button 
                @click="openDeleteModal(capsule)" 
                class="btn btn-danger"
                :disabled="deletingCode === capsule.capsuleCode"
              >
                {{ deletingCode === capsule.capsuleCode ? '删除中...' : '删除' }}
              </button>
            </div>
          </div>
        </div>
        
        <div v-else class="empty-state">
          <p>暂无胶囊数据</p>
        </div>
        
        <!-- 分页 -->
        <div v-if="pagination.totalPages > 1" class="pagination">
          <button 
            class="btn btn-secondary"
            :disabled="pagination.currentPage === 1"
            @click="loadCapsules(pagination.currentPage - 1)"
          >
            上一页
          </button>
          <span class="page-info">
            第 {{ pagination.currentPage }} / {{ pagination.totalPages }} 页
          </span>
          <button 
            class="btn btn-secondary"
            :disabled="pagination.currentPage === pagination.totalPages"
            @click="loadCapsules(pagination.currentPage + 1)"
          >
            下一页
          </button>
        </div>
      </div>

      <div v-if="showDeleteModal" class="modal-overlay">
        <div class="modal-content">
          <h3 class="modal-title">确认删除</h3>
          <p class="modal-text">
            确定要删除
            <span v-if="capsuleToDelete">{{ capsuleToDelete.title || '这个胶囊' }}</span>
            吗？此操作不可恢复。
          </p>
          <div class="modal-actions">
            <button @click="cancelDelete" class="btn btn-secondary">取消</button>
            <button 
              @click="confirmDelete" 
              class="btn btn-danger"
              :disabled="deletingCode === capsuleToDelete?.capsuleCode"
            >
              {{ deletingCode === capsuleToDelete?.capsuleCode ? '删除中...' : '确认删除' }}
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { adminApi } from '@/api'
import { formatDate } from '@/utils'
import { useAdminStore } from '@/store'
import useToast from '@/composables/useToast'
const adminStore = useAdminStore()

const toast = useToast()

const isAdmin = ref(false)
const password = ref('')
const isLoading = ref(false)
const deletingCode = ref(null)
const capsules = ref([])
const searchKeyword = ref('')
const showDeleteModal = ref(false)
const capsuleToDelete = ref(null)
const pagination = ref({
  currentPage: 1,
  pageSize: 20,
  totalItems: 0,
  totalPages: 0
})

const filteredCapsules = computed(() => {
  if (!searchKeyword.value) {
    return capsules.value
  }
  const keyword = searchKeyword.value.toLowerCase()
  return capsules.value.filter(capsule => {
    const title = (capsule.title || '').toLowerCase()
    const code = (capsule.capsuleCode || '').toLowerCase()
    return title.includes(keyword) || code.includes(keyword)
  })
})

const handleLogin = async () => {
  if (!password.value) {
    toast.warning('请输入密码')
    return
  }
  
  isLoading.value = true
  
  try {
    const response = await adminApi.login(password.value)
    adminStore.setAuth(response.data.token)
    isAdmin.value = true
    loadCapsules()
  } catch (error) {
    toast.error(error.message || '登录失败')
  } finally {
    isLoading.value = false
  }
}

const loadCapsules = async (page = 1) => {
  isLoading.value = true
  
  try {
    const response = await adminApi.getAll(page, pagination.value.pageSize)
    capsules.value = response.data.items || response.data
    if (response.data.pagination) {
      pagination.value = response.data.pagination
    }
  } catch (error) {
    toast.error(error.message || '加载失败')
  } finally {
    isLoading.value = false
  }
}

const openDeleteModal = (capsule) => {
  capsuleToDelete.value = capsule
  showDeleteModal.value = true
}

const cancelDelete = () => {
  showDeleteModal.value = false
  capsuleToDelete.value = null
}

const confirmDelete = async () => {
  if (!capsuleToDelete.value) return
  const capsuleCode = capsuleToDelete.value.capsuleCode
  deletingCode.value = capsuleCode

  try {
    await adminApi.delete(capsuleCode)
    capsules.value = capsules.value.filter(c => c.capsuleCode !== capsuleCode)
    toast.success('删除成功')
  } catch (error) {
    toast.error(error.message || '删除失败')
  } finally {
    deletingCode.value = null
    showDeleteModal.value = false
    capsuleToDelete.value = null
  }
}

const logout = () => {
  adminStore.logout()
  isAdmin.value = false
  password.value = ''
  capsules.value = []
}

onMounted(() => {
  adminStore.checkAuth()
  isAdmin.value = adminStore.isAuthenticated
  if (isAdmin.value) {
    loadCapsules()
  }
})
</script>

<style scoped>
.admin {
  padding: 40px 20px;
  min-height: 100vh;
  background: linear-gradient(135deg, var(--color-bg) 0%, var(--color-border) 100%);
}

.login-form {
  max-width: 400px;
  margin: 0 auto;
}

.login-form h1 {
  text-align: center;
  margin-bottom: 2rem;
}

.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
}

.header h1 {
  margin: 0;
}

.actions {
  margin-bottom: 2rem;
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  align-items: center;
  justify-content: space-between;
}

.search-input {
  max-width: 260px;
}

.loading {
  text-align: center;
  padding: 40px;
}

.capsules-list {
  display: grid;
  gap: 1.5rem;
  max-width: 1200px;
  margin: 0 auto;
}

.capsule-item {
  transition: transform 0.2s;
}

.capsule-item:hover {
  transform: translateY(-2px);
}

.capsule-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
  padding-bottom: 1rem;
  border-bottom: 1px solid var(--color-border);
}

.capsule-header h3 {
  margin: 0;
  color: var(--color-text);
}

.capsule-code {
  background: var(--color-bg);
  padding: 0.25rem 0.75rem;
  border-radius: 20px;
  font-family: monospace;
  font-size: 0.875rem;
  color: var(--color-primary);
  font-weight: 500;
}

.capsule-meta {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1rem;
  margin-bottom: 1.5rem;
}

.capsule-content {
  margin-bottom: 1.5rem;
}

.content-text {
  margin-top: 0.5rem;
  margin-bottom: 0;
  var(--color-bg-card)-space: pre-wrap;
  line-height: 1.6;
  color: var(--color-text-secondary);
}

.pagination {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 1rem;
  margin-top: 2rem;
}

.page-info {
  color: var(--color-text-secondary);
}

.modal-overlay {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
}

.modal-content {
  background: var(--color-bg-card);
  border-radius: 12px;
  padding: 24px;
  max-width: 400px;
  width: 90%;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.2);
}

.modal-title {
  margin-bottom: 12px;
  font-size: 1.25rem;
  color: var(--color-text);
}

.modal-text {
  margin-bottom: 20px;
  color: var(--color-text-secondary);
}

.modal-text span {
  font-weight: 600;
  color: var(--color-text);
}

.modal-actions {
  display: flex;
  justify-content: flex-end;
  gap: 12px;
}

.meta-item {
  display: flex;
  justify-content: space-between;
}

.label {
  font-weight: 500;
  color: var(--color-text-secondary);
}

.value {
  color: var(--color-text);
}

.status-open {
  color: var(--color-success);
  font-weight: 500;
}

.capsule-actions {
  display: flex;
  gap: 1rem;
  justify-content: flex-end;
}

.btn-danger {
  background-color: var(--color-error);
  color: var(--color-bg-card);
}

.btn-danger:hover {
  background-color: #dc2626;
}

.empty-state {
  text-align: center;
  padding: 40px;
  color: var(--color-text-secondary);
}
</style>
