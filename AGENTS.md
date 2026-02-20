# Time Capsule 项目上下文

## 项目概述

Time Capsule（时间胶囊）是一个全栈演示应用，展示不同前后端技术栈的组合使用。用户可以创建定时开启的消息胶囊，无需登录即可使用。

### 核心功能
- 🕐 **定时开启**: 设定未来时间点开启胶囊
- 🔐 **匿名使用**: 无需注册登录
- 🎯 **唯一访问码**: 8位字母数字组合的胶囊码
- 📝 **纯文本**: 只支持文字内容
- 🛡️ **不可篡改**: 发布后无法修改删除（管理员除外）
- 🎮 **隐藏管理**: 关于页连续点击Logo 5次进入管理界面

## 技术栈

### 后端
| 技术 | 版本 | 说明 |
|------|------|------|
| Spring Boot | 3.2.0 | 主框架 |
| Java | 17 | 运行时 |
| Spring Data JPA | - | 数据访问 |
| H2 / PostgreSQL / SQLite | - | 数据库 |
| JWT (jjwt) | 0.11.5 | 管理员认证 |
| SpringDoc OpenAPI | 2.3.0 | API 文档 |
| Lombok | - | 代码简化 |

### 前端

#### Vue 3 实现
| 技术 | 版本 | 说明 |
|------|------|------|
| Vue | 3.4.x | 主框架 |
| Vue Router | 4.x | 路由管理 |
| Pinia | 2.x | 状态管理 |
| Axios | 1.6.x | HTTP 客户端 |
| Day.js | 1.11.x | 日期处理 |
| Vite | 5.x | 构建工具 |

#### React 实现
| 技术 | 版本 | 说明 |
|------|------|------|
| React | 18.x | 主框架 |
| React Router | 6.x | 路由管理 |
| Zustand | 4.x | 状态管理 |
| Axios | 1.6.x | HTTP 客户端 |
| Day.js | 1.11.x | 日期处理 |
| Vite | 5.x | 构建工具 |

## 项目结构

```
HelloTime/
├── backend/springboot/           # Spring Boot 后端
│   ├── src/main/java/com/timecapsule/
│   │   ├── controller/           # REST 控制器
│   │   │   ├── CapsuleController.java    # 胶囊接口
│   │   │   ├── AdminController.java      # 管理接口
│   │   │   └── SystemController.java     # 系统接口
│   │   ├── service/              # 业务逻辑
│   │   │   ├── CapsuleService.java       # 胶囊服务
│   │   │   └── AdminService.java         # 管理服务
│   │   ├── repository/           # 数据访问
│   │   ├── model/                # 实体模型
│   │   ├── dto/                  # 数据传输对象
│   │   ├── exception/            # 异常处理
│   │   ├── config/               # 配置类
│   │   └── util/                 # 工具类
│   └── src/main/resources/
│       └── application.properties # 应用配置
├── frontend/
│   ├── vue3/                     # Vue 3 前端
│   │   └── src/
│   │       ├── views/            # 页面组件
│   │       ├── components/       # 公共组件
│   │       ├── api/              # API 接口
│   │       ├── router/           # 路由配置
│   │       ├── store/            # 状态管理
│   │       └── utils/            # 工具函数
│   └── react/                    # React 前端
│       └── src/
│           ├── pages/            # 页面组件
│           ├── components/       # 公共组件
│           ├── api/              # API 接口
│           ├── router/           # 路由配置
│           ├── store/            # 状态管理
│           └── utils/            # 工具函数
└── docs/                         # 文档
    ├── API.md                    # API 接口规范
    ├── DATABASE.md               # 数据库设计
    ├── UI.md                     # UI 设计规范
    └── REQUIREMENTS.md           # 需求文档
```

## 构建和运行

### 后端 (Spring Boot)

```bash
# 开发模式运行
cd backend/springboot
./mvnw spring-boot:run

# 编译打包
./mvnw clean package

# 运行打包后的 jar
java -jar target/time-capsule-backend-1.0.0.jar
```

后端默认端口: `http://localhost:8080/api`

### 前端 Vue 3

```bash
cd frontend/vue3
npm install
npm run dev      # 开发模式
npm run build    # 生产构建
npm run preview  # 预览构建结果
```

Vue 3 默认端口: `http://localhost:5173`

### 前端 React

```bash
cd frontend/react
npm install
npm run dev      # 开发模式
npm run build    # 生产构建
npm run preview  # 预览构建结果
```

React 默认端口: `http://localhost:5174`

## API 接口

### 公开接口

| 接口 | 方法 | 说明 |
|------|------|------|
| `/capsules` | POST | 创建胶囊 |
| `/capsules/{code}` | GET | 获取胶囊信息 |
| `/about` | GET | 获取应用信息 |
| `/health` | GET | 健康检查 |

### 管理接口 (需要 JWT 认证)

| 接口 | 方法 | 说明 |
|------|------|------|
| `/admin/login` | POST | 管理员登录 |
| `/admin/capsules` | GET | 获取所有胶囊列表 |
| `/admin/capsules/{code}` | DELETE | 删除胶囊 |

### API 响应格式

```json
// 成功响应
{
  "success": true,
  "data": {},
  "message": "操作成功"
}

// 错误响应
{
  "success": false,
  "error": {
    "code": "ERROR_CODE",
    "message": "错误描述"
  }
}
```

## 配置说明

### 后端配置 (application.properties)

```properties
# 服务端口
server.port=8080
server.servlet.context-path=/api

# 数据库 (默认 H2 内存数据库)
spring.datasource.url=jdbc:h2:mem:timecapsule

# 管理员密码
admin.password=admin123

# JWT 配置
jwt.secret=<密钥>
jwt.expiration=86400000
```

### 前端配置 (.env)

```env
# Vue 3
VITE_API_BASE_URL=http://localhost:8080/api

# React
VITE_API_BASE_URL=http://localhost:8080/api
```

## 开发约定

### 代码风格

- **后端**: 使用 Lombok 简化代码，遵循 Spring Boot 最佳实践
- **前端**: 
  - Vue 3 使用 Composition API (`<script setup>`)
  - React 使用函数组件 + Hooks
  - CSS 使用 scoped 模块化

### 目录约定

- `views/` 或 `pages/`: 页面级组件
- `components/`: 可复用组件
- `api/`: API 接口定义
- `utils/`: 工具函数
- `store/`: 状态管理

### 命名约定

- 组件文件: PascalCase (如 `Home.vue`, `Home.jsx`)
- 工具文件: camelCase (如 `constants.js`, `validation.js`)
- CSS 类名: kebab-case (如 `.btn-primary`, `.modal-content`)

## 调试工具

### 后端

- H2 Console: `http://localhost:8080/api/h2-console`
- Swagger UI: `http://localhost:8080/api/swagger-ui.html`
- 默认 H2 连接: JDBC URL = `jdbc:h2:mem:timecapsule`, User = `sa`, Password = 空

### 前端

- Vue DevTools 浏览器扩展
- React Developer Tools 浏览器扩展

## 错误码

| 错误码 | 说明 | HTTP 状态码 |
|--------|------|-------------|
| CAPSULE_NOT_FOUND | 胶囊不存在 | 404 |
| INVALID_CAPSULE_CODE | 无效的胶囊码 | 400 |
| INVALID_OPEN_TIME | 开启时间必须是未来时间 | 400 |
| CONTENT_TOO_LONG | 内容超过长度限制 | 400 |
| UNAUTHORIZED | 未授权访问 | 401 |
| INVALID_PASSWORD | 密码错误 | 401 |
| VALIDATION_ERROR | 数据验证失败 | 400 |
| INTERNAL_ERROR | 服务器内部错误 | 500 |

## 环境要求

- Java 17+
- Node.js 18+
- Maven 3.8+ (或使用内置 mvnw)

## 相关文档

- [API 接口规范](docs/API.md)
- [数据库设计](docs/DATABASE.md)
- [UI 设计规范](docs/UI.md)
- [需求文档](docs/REQUIREMENTS.md)
