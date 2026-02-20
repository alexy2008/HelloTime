# Time Capsule - 时间胶囊应用

一个简洁优雅的时间胶囊应用，允许用户创建定时开启的消息胶囊。

## 项目简介

Time Capsule 是一个展示现代全栈开发技术的范例应用。用户可以创建包含消息的时间胶囊，设定未来的开启时间，并通过唯一的胶囊码来访问。

### 核心特性

- 🕐 **定时开启**: 设定未来任意时间点开启胶囊
- 🔐 **匿名使用**: 无需注册登录，保护隐私
- 🎯 **唯一访问**: 通过8位胶囊码访问，简单安全
- 📝 **纯文本**: 专注于文字内容，简洁高效
- 🛡️ **不可篡改**: 一经发布无法修改或删除(管理员除外)
- 🎮 **隐藏管理**: 在关于页连续点击Logo 5次可进入管理界面

## 技术架构

本项目采用前后端分离架构,支持多种技术栈组合:

### 后端实现
- ✅ Spring Boot + PostgreSQL/SQLite
- 🔲 Node.js + Express
- 🔲 Python + FastAPI
- 🔲 Go + Gin

### 前端实现
- ✅ Vue 3 + Vite
- ✅ React + Vite
- 🔲 Angular
- 🔲 Svelte

## 快速开始

### 后端 (Spring Boot)
```bash
cd backend/springboot
./mvnw spring-boot:run
```

默认端口: `http://localhost:8080`

### 前端 (Vue 3)
```bash
cd frontend/vue3
npm install
npm run dev
```

默认端口: `http://localhost:5173`

### 前端 (React)
```bash
cd frontend/react
npm install
npm run dev
```

默认端口: `http://localhost:5174`

## API 文档

详见 [API Specification](./docs/API.md)

## 数据库设计

详见 [Database Schema](./docs/DATABASE.md)

## UI 设计规范

详见 [UI Guidelines](./docs/UI.md)

## 需求文档

详见 [原始需求文档](./docs/REQUIREMENTS.md)

## 项目结构
```
HelloTime/
├── docs/                   # 文档
│   ├── API.md             # API 接口规范
│   ├── DATABASE.md        # 数据库设计
│   ├── UI.md              # UI 设计规范
│   └── REQUIREMENTS.md    # 原始需求文档
├── backend/               # 后端实现
│   └── springboot/        # Spring Boot 实现
│       ├── src/           # 源代码
│       │   ├── main/      # 主代码
│       │   └── test/      # 测试代码
│       ├── pom.xml        # Maven 配置
│       └── README.md      # 后端说明
├── frontend/              # 前端实现
│   ├── vue3/              # Vue 3 实现
│   │   ├── src/           # 源代码
│   │   │   ├── assets/    # 静态资源
│   │   │   ├── components/ # 组件
│   │   │   ├── views/     # 页面
│   │   │   ├── router/    # 路由
│   │   │   ├── store/     # 状态管理
│   │   │   ├── utils/     # 工具函数
│   │   │   └── api/       # API 接口
│   │   ├── public/        # 公共文件
│   │   ├── package.json   # 依赖配置
│   │   └── README.md      # 前端说明
│   └── react/             # React 实现
│       ├── src/           # 源代码
│       │   ├── assets/    # 静态资源
│       │   ├── components/ # 组件
│       │   ├── pages/     # 页面
│       │   ├── router/    # 路由
│       │   ├── store/     # 状态管理
│       │   ├── utils/     # 工具函数
│       │   └── api/       # API 接口
│       ├── public/        # 公共文件
│       ├── package.json   # 依赖配置
│       └── README.md      # 前端说明
├── .gitignore             # Git 忽略文件
└── README.md              # 项目说明
```

## 功能说明

### 1. 发布胶囊
- 输入开启时间(必须是未来时间)
- 填写胶囊标题和内容
- 设置发布者昵称
- 获得唯一的8位胶囊码
- 发布前有确认提示

### 2. 开启胶囊
- 输入胶囊码查看胶囊
- 未到开启时间只能看到标题
- 到达开启时间后可查看完整内容

### 3. 管理功能
- 在关于页连续点击Logo 5次进入管理界面
- 输入管理员密码进行身份验证
- 查看所有胶囊并可执行删除操作

## 环境变量配置

### 后端 (Spring Boot)
```properties
# application.properties
spring.datasource.url=jdbc:postgresql://localhost:5432/timecapsule
spring.datasource.username=postgres
spring.datasource.password=your_password
admin.password=admin123
```

### 前端
```env
# .env
VITE_API_BASE_URL=http://localhost:8080/api
```

## 开发路线图

- [x] 项目架构设计
- [x] API 接口设计
- [x] 数据库设计
- [x] UI 规范设计
- [x] Spring Boot 后端实现
- [x] Vue 3 前端实现
- [x] React 前端实现
- [ ] 添加更多后端实现
- [ ] 添加更多前端实现
- [ ] 单元测试
- [ ] E2E 测试
- [ ] Docker 部署支持

## 贡献指南

欢迎提交 Issue 和 Pull Request!

## 许可证

MIT License

## 联系方式

如有问题或建议,欢迎提交 Issue。
