# Vue 3 vs React 实现对比

基于 Time Capsule 项目的 Vue 3 和 React 版本对比分析。

---

## 📊 核心差异概览

| 维度 | Vue 3 | React |
|------|-------|-------|
| **模板语法** | HTML 模板 + JS 表达式 | JSX（JS 扩展） |
| **状态管理** | Pinia | Zustand |
| **路由** | Vue Router | React Router v6 |
| **组件定义** | SFC（.vue 单文件组件） | .jsx/.tsx 文件 |
| **响应式** | 响应式系统（ref, reactive） | Hooks（useState, useEffect） |
| **CSS 作用域** | scoped（原生支持） | CSS Modules / styled-components |

---

## 1️⃣ 组件结构对比

### Vue 3 - Toast 组件
```vue
<template>
  <Teleport to="body">
    <Transition name="toast">
      <div v-if="visible" :class="['toast', `toast-${type}`]">
        <div class="toast-icon">
          <span v-if="type === 'success'">✓</span>
          <span v-else-if="type === 'error'">✕</span>
        </div>
        <div class="toast-content">{{ message }}</div>
      </div>
    </Transition>
  </Teleport>
</template>

<script setup>
import { ref, watch } from 'vue'

const props = defineProps({
  message: String,
  type: String,
  visible: Boolean
})

const emit = defineEmits(['close'])

watch(() => props.visible, (newVal) => {
  if (newVal) {
    setTimeout(() => emit('close'), 3000)
  }
})
</script>

<style scoped>
.toast { /* 样式 */ }
</style>
```

**特点**：
- ✅ 模板（HTML）、脚本（JS）、样式（CSS）分离在同一个文件
- ✅ `<style scoped>` 原生支持 CSS 作用域
- ✅ `<Teleport>`、`<Transition>` 等内置组件
- ✅ `v-if`、`v-else-if` 模板语法直观
- ✅ 双向绑定 `v-model`

---

### React - Toast 组件
```jsx
import { useEffect } from 'react'
import { useToastStore } from '@/store'
import './Toast.css'

function Toast() {
  const { visible, message, type, duration, close } = useToastStore()

  useEffect(() => {
    if (visible && duration > 0) {
      const timer = setTimeout(() => close(), duration)
      return () => clearTimeout(timer)
    }
  }, [visible, duration, close])

  const getIcon = () => {
    switch (type) {
      case 'success': return '✓'
      case 'error': return '✕'
      default: return 'ℹ'
    }
  }

  if (!visible) return null

  return (
    <div className={`toast toast-${type}`}>
      <div className="toast-icon">{getIcon()}</div>
      <div className="toast-content">{message}</div>
    </div>
  )
}

export default Toast
```

**特点**：
- ✅ JSX 中使用 JS 表达式更灵活
- ✅ `useEffect` 统一管理副作用（清理定时器）
- ❌ 需要单独导入 CSS 文件
- ❌ 需要手动条件渲染 `if (!visible) return null`
- ✅ 三元表达式更符合 JS 习惯

---

## 2️⃣ 状态管理对比

### Vue 3 - Pinia
```javascript
import { defineStore } from 'pinia'

export const useAdminStore = defineStore('admin', {
  state: () => ({
    isAuthenticated: false,
    token: null
  }),
  
  actions: {
    setAuth(token) {
      this.isAuthenticated = !!token
      this.token = token
      if (token) {
        localStorage.setItem(STORAGE_KEYS.adminToken, token)
      }
    },
    
    logout() {
      this.setAuth(null)
    }
  }
})
```

**特点**：
- ✅ 直观的 options API（state、actions 分离）
- ✅ `this` 直接访问状态
- ✅ 自动 TypeScript 推断（如使用 TypeScript）
- ✅ DevTools 完美支持

---

### React - Zustand
```javascript
import { create } from 'zustand'

export const useAdminStore = create((set, get) => ({
  isAuthenticated: false,
  token: null,
  
  setAuth: (token) => {
    set({ 
      isAuthenticated: !!token, 
      token 
    })
    if (token) {
      localStorage.setItem(STORAGE_KEYS.adminToken, token)
    }
  },
  
  logout: () => {
    get().setAuth(null)
  }
}))
```

**特点**：
- ✅ 简洁的函数式风格
- ✅ `set` 函数更新状态，`get` 读取状态
- ✅ 无需 Provider 包裹
- ✅ 轻量级，零依赖

---

## 3️⃣ 路由对比

### Vue 3 - Vue Router
```javascript
import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: () => import('@/views/Home.vue')
  },
  {
    path: '/capsule/:code',
    name: 'ViewCapsule',
    component: () => import('@/views/ViewCapsule.vue'),
    props: true  // 路由参数自动作为 props
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
```

**特点**：
- ✅ 路由配置清晰
- ✅ `props: true` 自动传递路由参数
- ✅ 命名路由 `router.push({ name: 'Home' })`

---

### React - React Router v6
```javascript
import { createBrowserRouter } from 'react-router-dom'

const router = createBrowserRouter([
  {
    path: '/',
    element: <Home />
  },
  {
    path: '/capsule/:code',
    element: <ViewCapsule />  // 使用 useParams 钩子获取参数
  }
])

export default router
```

**特点**：
- ✅ 配置与 JSX 一致性
- ✅ 组件中使用 `useParams()` 获取参数
- ✅ `useNavigate()` 钩子编程式导航

---

## 4️⃣ 表单处理对比

### Vue 3 - 双向绑定
```vue
<template>
  <input 
    v-model="capsuleCode" 
    type="text" 
    placeholder="请输入8位胶囊码"
    maxlength="8"
    @keyup.enter="lookupCapsule"
  >
</template>

<script setup>
import { ref } from 'vue'

const capsuleCode = ref('')

const lookupCapsule = () => {
  console.log(capsuleCode.value)
}
</script>
```

**特点**：
- ✅ `v-model` 自动双向绑定
- ✅ `@keyup.enter` 事件修饰符
- ✅ `.value` 访问 ref 值

---

### React - 受控组件
```jsx
function Home() {
  const [capsuleCode, setCapsuleCode] = useState('')

  const lookupCapsule = () => {
    console.log(capsuleCode)
  }

  return (
    <input 
      value={capsuleCode}
      onChange={e => setCapsuleCode(e.target.value.toUpperCase())}
      onKeyPress={e => e.key === 'Enter' && lookupCapsule()}
    />
  )
}
```

**特点**：
- ✅ 受控组件模式更可控
- ✅ 直接在 `onChange` 中处理转换（大写）
- ❌ 需要手动处理所有事件

---

## 5️⃣ 自定义 Hook/Composable 对比

### Vue 3 - Composable
```javascript
import { reactive, toRefs } from 'vue'

const state = reactive({
  visible: false,
  message: '',
  type: 'info'
})

export function useToast() {
  const success = (message) => {
    state.message = message
    state.type = 'success'
    state.visible = true
  }

  return {
    ...toRefs(state),  // 解构保持响应式
    success
  }
}
```

**使用**：
```vue
<script setup>
import { useToast } from '@/composables/useToast'

const toast = useToast()
toast.success('操作成功')
</script>
```

---

### React - Custom Hook
```javascript
export const useToastStore = create((set) => ({
  visible: false,
  message: '',
  
  success: (message) => {
    set({ message, type: 'success', visible: true })
  }
}))
```

**使用**：
```jsx
function MyComponent() {
  const { success } = useToastStore()
  success('操作成功')
}
```

---

## 6️⃣ 条件渲染对比

### Vue 3
```vue
<template>
  <div v-if="visible" class="toast">
    <span v-if="type === 'success'">✓</span>
    <span v-else-if="type === 'error'">✕</span>
    <span v-else>ℹ</span>
  </div>
</template>
```

**特点**：
- ✅ `v-if`、`v-else-if`、`v-else` 语义清晰
- ✅ 不需要三元表达式

---

### React
```jsx
const getIcon = () => {
  switch (type) {
    case 'success': return '✓'
    case 'error': return '✕'
    default: return 'ℹ'
  }
}

return (
  visible && (
    <div className="toast">
      <div className="toast-icon">{getIcon()}</div>
    </div>
  )
)
```

**特点**：
- ✅ 使用原生 JS 条件语句
- ✅ `&&` 短路运算简洁
- ✅ 三元表达式 `condition ? true : false`

---

## 7️⃣ 列表渲染对比

### Vue 3
```vue
<template>
  <div v-for="capsule in capsules" :key="capsule.id">
    <h3>{{ capsule.title }}</h3>
  </div>
</template>
```

**特点**：
- ✅ `v-for` 指令直观
- ✅ `:key` 绑定方便

---

### React
```jsx
{capsules.map(capsule => (
  <div key={capsule.id}>
    <h3>{capsule.title}</h3>
  </div>
))}
```

**特点**：
- ✅ 使用 `Array.map()` 符合 JS 习惯
- ✅ JSX 插值清晰

---

## 8️⃣ CSS 作用域对比

### Vue 3 - Scoped CSS
```vue
<style scoped>
.toast {
  position: fixed;
  top: 20px;
}

/* 自动添加属性选择器 */
</style>
```

**特点**：
- ✅ `scoped` 原生支持
- ✅ 自动生成 `[data-v-xxx]` 属性选择器
- ✅ 不需要额外配置

---

### React - CSS Modules
```jsx
import styles from './Toast.module.css'

function Toast() {
  return <div className={styles.toast}>Content</div>
}
```

**特点**：
- ❌ 需要配置 vite/webpack
- ❌ 每个文件都要导入样式
- ✅ CSS 类名自动 hash，避免冲突

**或使用全局 CSS**（本项目的做法）：
```jsx
import './Toast.css'

function Toast() {
  return <div className="toast">Content</div>
}
```

---

## 9️⃣ 事件处理对比

### Vue 3
```vue
<button @click="handleClick">点击</button>
<button @click.stop="handleClick">阻止冒泡</button>
<input @keyup.enter="handleSubmit">
```

**特点**：
- ✅ `@` 事件修饰符：`.stop`、`.prevent`、`.enter` 等
- ✅ 自动访问方法

---

### React
```jsx
<button onClick={handleClick}>点击</button>
<button onClick={e => e.stopPropagation()}>阻止冒泡</button>
<input onKeyPress={e => e.key === 'Enter' && handleSubmit()}>
```

**特点**：
- ✅ 使用原生事件对象
- ❌ 需要手动处理 `e.stopPropagation()`

---

## 🔟 TypeScript 支持对比

### Vue 3
```vue
<script setup lang="ts">
interface Props {
  message: string
  type: 'success' | 'error' | 'info'
}

const props = defineProps<Props>()
</script>
```

**特点**：
- ✅ 内置类型定义
- ✅ 编译时检查模板

---

### React
```tsx
interface ToastProps {
  message: string
  type: 'success' | 'error' | 'info'
}

function Toast({ message, type }: ToastProps) {
  return <div>{message}</div>
}
```

**特点**：
- ✅ 原生 TS 支持
- ✅ 类型推断更准确

---

## 📈 学习曲线对比

| 框架 | 入门难度 | 模板语法 | JS 知识要求 |
|------|---------|---------|------------|
| **Vue 3** | ⭐⭐ | HTML + 指令 | ⭐⭐ |
| **React** | ⭐⭐⭐ | JSX（扩展 JS） | ⭐⭐⭐⭐ |

### Vue 3 适合人群：
- HTML/CSS 背景开发者
- 喜欢模板语法
- 快速上手项目

### React 适合人群：
- JavaScript 背景开发者
- 喜欢灵活性和自由度
- 追求 JS 生态一致性

---

## 🎯 项目代码统计

| 指标 | Vue 3 | React |
|------|-------|-------|
| **文件数量** | ~50 | ~50 |
| **代码行数** | ~2000 | ~2000 |
| **组件文件** | .vue (SFC) | .jsx |
| **样式文件** | 内置 `<style>` | 独立 .css |
| **构建速度** | ~500ms | ~508ms |

---

## 💡 总结与建议

### 选择 Vue 3，如果：
- ✅ 喜欢模板语法和 HTML 风格
- ✅ 希望更快的开发速度
- ✅ 团队成员主要是 HTML/CSS 背景
- ✅ 需要开箱即用的功能（scoped、transition）

### 选择 React，如果：
- ✅ 有扎实的 JavaScript 基础
- ✅ 喜欢 JSX 的灵活性
- ✅ 想深入理解前端底层
- ✅ 关注 React 生态和就业市场

### 本项目体验：
两个版本在功能、界面、用户体验上**完全一致**，展示了现代前端框架可以实现相同的效果，只是**编程风格和思维模式**不同。

**推荐学习路径**：
1. 先掌握 Vue 3（快速上手）
2. 再学习 React（理解 JS 生态）
3. 对比两者的差异，加深理解
