# Time Capsule Frontend (React)

React 版本的时间胶囊前端应用。

## 技术栈

- **React 18** - 前端框架
- **React Router 6** - 路由管理
- **Zustand** - 状态管理
- **Axios** - HTTP 客户端
- **Day.js** - 日期处理
- **Vite** - 构建工具

## 快速开始

### 安装依赖
```bash
npm install
```

### 启动开发服务器
```bash
npm run dev
```

默认端口: `http://localhost:5174`

### 构建生产版本
```bash
npm run build
```

### 预览生产构建
```bash
npm run preview
```

## 项目结构

```
src/
├── api/                  # API 接口封装
├── assets/               # 静态资源
│   └── styles/          # 全局样式
├── components/           # 公共组件
│   └── Toast.jsx        # 提示组件
├── pages/                # 页面组件
│   ├── Home.jsx         # 主页
│   ├── CreateCapsule.jsx # 创建胶囊页
│   ├── ViewCapsule.jsx  # 查看胶囊页
│   ├── About.jsx        # 关于页
│   └── Admin.jsx        # 管理员页
├── router/               # 路由配置
├── store/                # 状态管理 (Zustand)
├── utils/                # 工具函数
├── App.jsx               # 根组件
└── main.jsx              # 入口文件
```

## 功能特性

- ✅ 创建时间胶囊
- ✅ 查看胶囊详情（带倒计时）
- ✅ 管理员功能（隐藏入口）
- ✅ Toast 提示
- ✅ 响应式设计

## 与 Vue 版本的对比

React 版本在功能和界面效果上与 Vue 版本保持完全一致：

- 相同的 API 接口调用
- 相同的样式设计
- 相同的业务逻辑
- 相同的用户体验

主要技术差异：

| 功能 | Vue 版本 | React 版本 |
|------|----------|------------|
| 状态管理 | Pinia | Zustand |
| 路由 | Vue Router | React Router |
| 组件风格 | Composition API | Hooks |
| 样式作用域 | Scoped CSS | CSS Modules/独立文件 |

## 环境变量

在 `.env` 文件中配置：

```env
VITE_API_BASE_URL=http://localhost:8080/api
VITE_APP_TITLE=Time Capsule
```

## 开发注意事项

1. 确保后端服务已启动 (端口 8080)
2. React 版本使用端口 5174，避免与 Vue 版本冲突
3. 所有样式均复用 Vue 版本的设计，保持一致性
