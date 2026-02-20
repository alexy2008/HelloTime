import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'

// 导入全局样式
import './assets/styles/global.css'

// 创建应用实例
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
)
