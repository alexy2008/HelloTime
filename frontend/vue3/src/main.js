import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './router'

// 导入全局样式
import './assets/styles/global.css'

// 创建应用实例
const app = createApp(App)

// 使用 Pinia 状态管理
const pinia = createPinia()

// 挂载插件
app.use(pinia)
app.use(router)

// 挂载应用
app.mount('#app')