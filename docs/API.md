# API 接口规范

## 基本信息

- **Base URL**: `http://localhost:8080/api`
- **数据格式**: JSON
- **字符编码**: UTF-8
- **时间格式**: ISO 8601 (例: `2026-12-31T23:59:59Z`)

## 通用响应格式

### 成功响应
```json
{
  "success": true,
  "data": {},
  "message": "操作成功"
}
```

### 错误响应
```json
{
  "success": false,
  "error": {
    "code": "ERROR_CODE",
    "message": "错误描述"
  }
}
```

## 错误码说明

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

---

## 1. 胶囊相关接口

### 1.1 创建胶囊

创建一个新的时间胶囊。

**请求**
```
POST /capsules
```

**请求体**
```json
{
  "title": "给未来的自己",
  "content": "一年后的今天，希望你已经实现了目标...",
  "openTime": "2027-02-10T12:00:00Z",
  "creatorNickname": "小明"
}
```

**字段说明**

| 字段 | 类型 | 必填 | 说明 | 限制 |
|------|------|------|------|------|
| title | string | 是 | 胶囊标题 | 1-100字符 |
| content | string | 是 | 胶囊内容 | 1-10000字符 |
| openTime | string | 是 | 开启时间(ISO 8601) | 必须是未来时间 |
| creatorNickname | string | 是 | 发布者昵称 | 1-50字符 |

**成功响应** (HTTP 201)
```json
{
  "success": true,
  "data": {
    "capsuleCode": "A3X9K2M7",
    "title": "给未来的自己",
    "openTime": "2027-02-10T12:00:00Z",
    "createdAt": "2026-02-10T10:30:00Z"
  },
  "message": "胶囊创建成功"
}
```

**错误响应示例**
```json
{
  "success": false,
  "error": {
    "code": "INVALID_OPEN_TIME",
    "message": "开启时间必须是未来的时间"
  }
}
```

---

### 1.2 获取胶囊信息

通过胶囊码获取胶囊信息。根据当前时间和开启时间的关系，返回不同的内容。

**请求**
```
GET /capsules/{capsuleCode}
```

**路径参数**

| 参数 | 类型 | 说明 |
|------|------|------|
| capsuleCode | string | 8位胶囊码 |

**成功响应 - 未到开启时间** (HTTP 200)
```json
{
  "success": true,
  "data": {
    "capsuleCode": "A3X9K2M7",
    "title": "给未来的自己",
    "openTime": "2027-02-10T12:00:00Z",
    "canOpen": false,
    "timeRemaining": {
      "days": 365,
      "hours": 1,
      "minutes": 30
    }
  },
  "message": "胶囊尚未到开启时间"
}
```

**成功响应 - 已到开启时间** (HTTP 200)
```json
{
  "success": true,
  "data": {
    "capsuleCode": "A3X9K2M7",
    "title": "给未来的自己",
    "content": "一年后的今天，希望你已经实现了目标...",
    "openTime": "2027-02-10T12:00:00Z",
    "creatorNickname": "小明",
    "createdAt": "2026-02-10T10:30:00Z",
    "canOpen": true
  },
  "message": "胶囊已开启"
}
```

**错误响应示例**
```json
{
  "success": false,
  "error": {
    "code": "CAPSULE_NOT_FOUND",
    "message": "未找到该胶囊，请检查胶囊码是否正确"
  }
}
```

---

## 2. 管理员相关接口

### 2.1 管理员登录验证

验证管理员密码。

**请求**
```
POST /admin/login
```

**请求体**
```json
{
  "password": "admin123"
}
```

**字段说明**

| 字段 | 类型 | 必填 | 说明 |
|------|------|------|------|
| password | string | 是 | 管理员密码 |

**成功响应** (HTTP 200)
```json
{
  "success": true,
  "data": {
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "expiresIn": 3600
  },
  "message": "登录成功"
}
```

**错误响应示例**
```json
{
  "success": false,
  "error": {
    "code": "INVALID_PASSWORD",
    "message": "密码错误"
  }
}
```

---

### 2.2 获取所有胶囊列表

获取所有胶囊的列表信息（需要管理员权限）。

**请求**
```
GET /admin/capsules?page=1&size=20&sort=createdAt,desc
```

**请求头**
```
Authorization: Bearer {token}
```

**查询参数**

| 参数 | 类型 | 必填 | 默认值 | 说明 |
|------|------|------|--------|------|
| page | integer | 否 | 1 | 页码（从1开始） |
| size | integer | 否 | 20 | 每页数量 |
| sort | string | 否 | createdAt,desc | 排序字段和方向 |

**成功响应** (HTTP 200)
```json
{
  "success": true,
  "data": {
    "items": [
      {
        "id": 1,
        "capsuleCode": "A3X9K2M7",
        "title": "给未来的自己",
        "content": "一年后的今天...",
        "openTime": "2027-02-10T12:00:00Z",
        "creatorNickname": "小明",
        "createdAt": "2026-02-10T10:30:00Z",
        "canOpen": false
      },
      {
        "id": 2,
        "capsuleCode": "B7Y4N1K8",
        "title": "生日快乐",
        "content": "祝你生日快乐...",
        "openTime": "2026-12-25T00:00:00Z",
        "creatorNickname": "小红",
        "createdAt": "2026-02-09T15:20:00Z",
        "canOpen": false
      }
    ],
    "pagination": {
      "currentPage": 1,
      "pageSize": 20,
      "totalItems": 42,
      "totalPages": 3
    }
  },
  "message": "获取成功"
}
```

---

### 2.3 删除胶囊

删除指定的胶囊（需要管理员权限）。

**请求**
```
DELETE /admin/capsules/{capsuleCode}
```

**请求头**
```
Authorization: Bearer {token}
```

**路径参数**

| 参数 | 类型 | 说明 |
|------|------|------|
| capsuleCode | string | 8位胶囊码 |

**成功响应** (HTTP 200)
```json
{
  "success": true,
  "data": {
    "capsuleCode": "A3X9K2M7",
    "deletedAt": "2026-02-10T14:30:00Z"
  },
  "message": "胶囊删除成功"
}
```

**错误响应示例**
```json
{
  "success": false,
  "error": {
    "code": "CAPSULE_NOT_FOUND",
    "message": "未找到该胶囊"
  }
}
```

---

## 3. 系统信息接口

### 3.1 获取应用信息

获取应用的基本信息和版本。

**请求**
```
GET /about
```

**成功响应** (HTTP 200)
```json
{
  "success": true,
  "data": {
    "name": "Time Capsule",
    "version": "1.0.0",
    "description": "一个简洁优雅的时间胶囊应用",
    "backend": "Spring Boot 3.2.0",
    "database": "PostgreSQL 15",
    "buildTime": "2026-02-01T10:00:00Z"
  },
  "message": "获取成功"
}
```

---

## 4. 健康检查接口

### 4.1 健康检查

检查服务是否正常运行。

**请求**
```
GET /health
```

**成功响应** (HTTP 200)
```json
{
  "success": true,
  "data": {
    "status": "UP",
    "timestamp": "2026-02-10T10:30:00Z",
    "database": "UP",
    "diskSpace": "UP"
  }
}
```

---

## 请求示例

### cURL 示例

**创建胶囊**
```bash
curl -X POST http://localhost:8080/api/capsules \
  -H "Content-Type: application/json" \
  -d '{
    "title": "给未来的自己",
    "content": "一年后的今天，希望你已经实现了目标",
    "openTime": "2027-02-10T12:00:00Z",
    "creatorNickname": "小明"
  }'
```

**获取胶囊**
```bash
curl http://localhost:8080/api/capsules/A3X9K2M7
```

**管理员登录**
```bash
curl -X POST http://localhost:8080/api/admin/login \
  -H "Content-Type: application/json" \
  -d '{"password": "admin123"}'
```

**获取所有胶囊（管理员）**
```bash
curl http://localhost:8080/api/admin/capsules \
  -H "Authorization: Bearer {token}"
```

**删除胶囊（管理员）**
```bash
curl -X DELETE http://localhost:8080/api/admin/capsules/A3X9K2M7 \
  -H "Authorization: Bearer {token}"
```

---

## 注意事项

1. **时区处理**: 所有时间均使用 UTC 时区，前端需要根据用户时区进行转换
2. **胶囊码生成**: 8位大写字母和数字组合，排除易混淆字符（如 0/O, 1/I/L）
3. **内容长度**: 标题最长100字符，内容最长10000字符，昵称最长50字符
4. **JWT Token**: 管理员 token 有效期为 1 小时
5. **分页**: 默认每页20条，最大100条
6. **CORS**: 开发环境允许所有来源，生产环境需配置白名单
