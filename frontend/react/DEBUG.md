# 白屏问题调试指南

## 当前状态
- ✅ 后端运行正常: http://localhost:8080/api
- ✅ 前端运行正常: http://localhost:5174/
- ✅ Vite 服务已启动

## 请按以下步骤调试：

### 1. 打开浏览器开发者工具
- **Chrome/Edge**: 按 `F12` 或 `Cmd+Option+I` (Mac)
- **Firefox**: 按 `F12` 或 `Cmd+Option+I` (Mac)
- **Safari**: 先在菜单中选择 `开发 > 显示Web检查器`

### 2. 检查 Console 标签页
查找是否有红色错误信息，常见错误：

#### 如果看到 "Failed to resolve import"
- 可能是路径别名 `@` 配置问题
- 检查 vite.config.js 中的 alias 配置

#### 如果看到 "Cannot read properties of undefined"
- 可能是组件内部访问了未定义的对象
- 需要查看具体哪一行代码

#### 如果看到 CORS 错误
- 后端 CORS 配置问题
- 检查后端日志

### 3. 检查 Network 标签页
- 查看是否有请求失败（红色）
- 特别关注 `/api` 请求

### 4. 尝试强制刷新
- **Windows/Linux**: `Ctrl + Shift + R`
- **Mac**: `Cmd + Shift + R`

### 5. 清除浏览器缓存
- 在开发者工具中右键刷新按钮
- 选择 "清空缓存并硬性重新加载"

## 如果仍然白屏

请提供以下信息：
1. 浏览器控制台的错误截图
2. Network 标签页的请求列表截图
3. 访问 http://localhost:5174/ 时的页面源代码（右键 > 查看网页源代码）

## 临时解决方案

如果问题持续，可以尝试：

1. 重启前端服务：
```bash
pkill -f "vite.*react"
cd /Users/alex/HelloTime/frontend/react
npm run dev
```

2. 重新安装依赖：
```bash
cd /Users/alex/HelloTime/frontend/react
rm -rf node_modules package-lock.json
npm install
npm run dev
```

3. 检查端口是否被占用：
```bash
lsof -i :5174
```
