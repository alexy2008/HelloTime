# Time Capsule (HelloTime) 项目上下文

## 项目概述

**Time Capsule** (时间胶囊) 是一个全栈 Web 应用，允许用户创建定时开启的消息胶囊。用户可以创建包含文字内容的时间胶囊，设定未来的开启时间，并通过唯一的 8 位胶囊码来访问。

### 核心特性

- 🕐 **定时开启**: 设定未来任意时间点开启胶囊
- 🔐 **匿名使用**: 无需注册登录，保护隐私
- 🎯 **唯一访问**: 通过 8 位胶囊码访问，简单安全
- 🛡️ **不可篡改**: 一经发布无法修改或删除 (管理员除外)
- 🎮 **隐藏管理**: 在关于页连续点击 Logo 5 次可进入管理界面

### 技术架构

| 层级 | 技术栈 | 状态 |
|------|--------|------|
| **前端** | Vue 3 + Vite + Pinia + Vue Router | ✅ 已实现 |
| **后端** | Spring Boot 3.2 + Spring Data JPA | ✅ 已实现 |
| **数据库** | PostgreSQL / SQLite / H2 | ✅ 支持 |
| **认证** | JWT | ✅ 已实现 |
| **构建** | Maven (后端) / Vite (前端) | ✅ 已配置 |

## 项目结构

```
HelloTime/
├── docs/                   # 项目文档
│   ├── API.md             # API 接口规范
│   ├── DATABASE.md        # 数据库设计
│   └── UI.md              # UI 设计规范
├── backend/
│   └── springboot/        # Spring Boot 后端
│       ├── src/main/java/com/timecapsule/
│       │   ├── Application.java      # 启动类
│       │   ├── controller/           # REST 控制器
│       │   ├── service/              # 业务逻辑层
│       │   ├── repository/           # 数据访问层
│       │   ├── model/                # 实体模型
│       │   ├── dto/                  # 数据传输对象
│       │   ├── config/               # 配置类
│       │   ├── exception/            # 异常处理
│       │   └── util/                 # 工具类
│       ├── src/main/resources/
│       │   └── application.properties
│       ├── pom.xml                   # Maven 配置
│       └── mvnw                      # Maven Wrapper
├── frontend/
│   └── vue3/              # Vue 3 前端
│       ├── src/
│       │   ├── api/                  # API 接口封装
│       │   ├── assets/               # 静态资源
│       │   ├── components/           # 公共组件
│       │   ├── views/                # 页面组件
│       │   ├── router/               # 路由配置
│       │   ├── store/                # Pinia 状态管理
│       │   ├── utils/                # 工具函数
│       │   ├── App.vue               # 根组件
│       │   └── main.js               # 入口文件
│       ├── public/
│       ├── index.html
│       ├── package.json
│       ├── vite.config.js
│       └── .env                      # 环境变量
└── QWEN.md                          # 项目上下文文档
```

## 构建与运行

### 环境要求

- **Java**: 17+
- **Node.js**: 18+ (推荐)
- **Maven**: 3.8+ (或使用项目自带的 mvnw)
- **数据库**: PostgreSQL 14+ / SQLite / H2

### 后端运行

```bash
cd backend/springboot

# 方式 1: 使用 Maven Wrapper (推荐)
./mvnw spring-boot:run

# 方式 2: 使用已安装的 Maven
mvn spring-boot:run

# 构建生产包
./mvnw clean package
java -jar target/time-capsule-backend-1.0.0.jar
```

**默认端口**: `http://localhost:8080`

### 前端运行

```bash
cd frontend/vue3

# 安装依赖 (首次运行)
npm install

# 启动开发服务器
npm run dev

# 构建生产版本
npm run build

# 预览生产构建
npm run preview

# 代码检查
npm run lint
```

**默认端口**: `http://localhost:5173`

### 数据库配置

在 `backend/springboot/src/main/resources/application.properties` 中配置:

```properties
# PostgreSQL 配置
spring.datasource.url=jdbc:postgresql://localhost:5432/timecapsule
spring.datasource.username=postgres
spring.datasource.password=your_password

# 或使用 SQLite
# spring.datasource.url=jdbc:sqlite:timecapsule.db

# 管理员密码
admin.password=admin123

# JWT 配置
jwt.secret=your-secret-key-here-change-in-production
jwt.expiration=86400000
```

### 前端环境变量

在 `frontend/vue3/.env` 中配置:

```env
VITE_API_BASE_URL=http://localhost:8080/api
VITE_APP_TITLE=Time Capsule
```

## API 接口概览

| 方法 | 路径 | 说明 | 权限 |
|------|------|------|------|
| POST | `/api/capsules` | 创建时间胶囊 | 公开 |
| GET | `/api/capsules/{code}` | 获取胶囊详情 | 公开 |
| GET | `/api/capsules/{code}/status` | 检查胶囊状态 | 公开 |
| POST | `/api/admin/login` | 管理员登录 | 公开 |
| GET | `/api/admin/capsules` | 获取所有胶囊 | 管理员 |
| DELETE | `/api/admin/capsules/{id}` | 删除胶囊 | 管理员 |

详细 API 规范见 [docs/API.md](./docs/API.md)

## 数据库设计

### 胶囊表 (capsules)

```sql
CREATE TABLE capsules (
    id BIGSERIAL PRIMARY KEY,
    capsule_code VARCHAR(8) UNIQUE NOT NULL,
    title VARCHAR(100) NOT NULL,
    content TEXT NOT NULL,
    open_time TIMESTAMP WITH TIME ZONE NOT NULL,
    author VARCHAR(50),
    create_time TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    is_deleted BOOLEAN DEFAULT FALSE
);
```

详细数据库设计见 [docs/DATABASE.md](./docs/DATABASE.md)

## 开发规范

### 代码风格

**后端 (Java/Spring Boot)**:
- 使用 Lombok 简化代码
- 遵循 Spring Boot 最佳实践
- RESTful API 设计风格
- 统一响应格式：`{code, message, data}`

**前端 (Vue 3)**:
- 使用 Composition API (`<script setup>`)
- 组件命名：PascalCase
- 文件命名：kebab-case
- 遵循 ESLint + Prettier 规范

### 测试实践

```bash
# 后端单元测试
cd backend/springboot
./mvnw test

# 前端代码检查
cd frontend/vue3
npm run lint
```

### Git 工作流

- 主分支：`main`
- 开发分支：`develop` (如有需要)
- 功能分支：`feature/xxx`
- 修复分支：`fix/xxx`

## 关键实现细节

### 胶囊码生成

8 位随机字母数字组合 (A-Z, 0-9)，由后端 `CapsuleUtil` 生成。

### 认证机制

- 管理员通过密码验证获取 JWT Token
- Token 有效期：24 小时 (86400000ms)
- 请求头格式：`Authorization: Bearer {token}`

### 隐藏管理入口

在"关于"页面连续点击 Logo 5 次可进入管理员登录界面。

## 常见问题

### 端口冲突

- 后端默认 8080，可在 `application.properties` 修改 `server.port`
- 前端默认 5173，可在 `vite.config.js` 修改

### 数据库连接失败

检查 PostgreSQL 服务是否启动，或切换到 SQLite 模式。

### 跨域问题

开发环境下后端已配置 CORS 允许前端访问。

## 相关文档

- [API 接口规范](./docs/API.md)
- [数据库设计](./docs/DATABASE.md)
- [UI 设计规范](./docs/UI.md)
- [后端说明](./backend/springboot/README.md)
- [前端说明](./frontend/vue3/README.md)
