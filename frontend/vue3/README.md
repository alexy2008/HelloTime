# Time Capsule 前端

基于 Vue 3 + Vite 的时间胶囊应用前端项目。

## 技术栈

- **Vue 3** - 渐进式 JavaScript 框架
- **Vite** - 新一代前端构建工具
- **Vue Router** - 官方路由管理器
- **Pinia** - 状态管理
- **Axios** - HTTP 客户端
- **Day.js** - 日期处理库

## 项目结构

```
src/
├── assets/          # 静态资源
├── components/      # 公共组件
├── views/          # 页面组件
├── router/         # 路由配置
├── store/          # 状态管理
├── utils/          # 工具函数
├── api/            # API 接口
├── App.vue         # 根组件
└── main.js         # 入口文件
```

## 开发环境

### 安装依赖

```bash
npm install
```

### 启动开发服务器

```bash
npm run dev
```

默认访问地址: http://localhost:5173

### 构建生产版本

```bash
npm run build
```

### 预览生产构建

```bash
npm run preview
```

## 环境变量

创建 `.env` 文件配置环境变量：

```env
VITE_API_BASE_URL=http://localhost:8080/api
VITE_APP_TITLE=Time Capsule
```

## 功能模块

### 1. 首页 (Home)
- 应用介绍和入口
- 创建胶囊快捷入口
- 查看胶囊快捷入口

### 2. 创建胶囊 (CreateCapsule)
- 填写胶囊标题和内容
- 设置开启时间
- 输入发布者昵称
- 获取唯一胶囊码

### 3. 查看胶囊 (ViewCapsule)
- 输入胶囊码查看胶囊
- 未到期显示倒计时
- 到期后显示完整内容

### 4. 管理后台 (Admin)
- 管理员登录
- 查看所有胶囊
- 删除胶囊功能

### 5. 关于页面 (About)
- 应用介绍
- 使用说明
- 隐私声明

## 代码规范

- 使用 Composition API
- 遵循 ESLint 规范
- 组件命名使用 PascalCase
- 文件命名使用 kebab-case