# API 接口规范

## 概述

Time Capsule 应用的 RESTful API 接口规范。

## 基础信息

- Base URL: `http://localhost:8080/api`
- Content-Type: `application/json`
- 字符编码: UTF-8

## 接口列表

### 1. 创建时间胶囊

**POST** `/capsules`

创建一个新的时间胶囊。

#### 请求参数

```json
{
  "title": "胶囊标题",
  "content": "胶囊内容",
  "openTime": "2024-12-31T23:59:59Z",
  "author": "发布者昵称"
}
```

| 参数 | 类型 | 必填 | 说明 |
|------|------|------|------|
| title | string | 是 | 胶囊标题，长度1-100字符 |
| content | string | 是 | 胶囊内容，长度1-1000字符 |
| openTime | string | 是 | 开启时间，ISO 8601格式 |
| author | string | 否 | 发布者昵称，长度1-50字符 |

#### 响应示例

```json
{
  "code": 200,
  "message": "success",
  "data": {
    "id": 1,
    "capsuleCode": "ABC123DE",
    "title": "新年愿望",
    "openTime": "2024-12-31T23:59:59Z",
    "author": "匿名用户",
    "createTime": "2024-01-01T12:00:00Z"
  }
}
```

### 2. 获取胶囊信息

**GET** `/capsules/{capsuleCode}`

根据胶囊码获取胶囊信息。

#### 请求参数

路径参数：
- capsuleCode: 8位字母数字组合的胶囊码

#### 响应示例

```json
{
  "code": 200,
  "message": "success",
  "data": {
    "id": 1,
    "capsuleCode": "ABC123DE",
    "title": "新年愿望",
    "content": "希望明年能学会一门新技能...",
    "openTime": "2024-12-31T23:59:59Z",
    "author": "匿名用户",
    "createTime": "2024-01-01T12:00:00Z",
    "isOpen": true
  }
}
```

### 3. 检查胶囊状态

**GET** `/capsules/{capsuleCode}/status`

仅获取胶囊的基本状态信息（不包含内容）。

#### 响应示例

```json
{
  "code": 200,
  "message": "success",
  "data": {
    "capsuleCode": "ABC123DE",
    "title": "新年愿望",
    "isOpen": false,
    "openTime": "2024-12-31T23:59:59Z"
  }
}
```

### 4. 管理员登录

**POST** `/admin/login`

管理员登录接口。

#### 请求参数

```json
{
  "password": "admin123"
}
```

#### 响应示例

```json
{
  "code": 200,
  "message": "success",
  "data": {
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
  }
}
```

### 5. 获取所有胶囊（管理员）

**GET** `/admin/capsules`

需要管理员权限，获取所有胶囊列表。

#### 请求头

```
Authorization: Bearer {token}
```

#### 响应示例

```json
{
  "code": 200,
  "message": "success",
  "data": [
    {
      "id": 1,
      "capsuleCode": "ABC123DE",
      "title": "新年愿望",
      "openTime": "2024-12-31T23:59:59Z",
      "author": "匿名用户",
      "createTime": "2024-01-01T12:00:00Z",
      "isOpen": true
    }
  ]
}
```

### 6. 删除胶囊（管理员）

**DELETE** `/admin/capsules/{id}`

需要管理员权限，根据ID删除胶囊。

#### 请求头

```
Authorization: Bearer {token}
```

#### 响应示例

```json
{
  "code": 200,
  "message": "删除成功"
}
```

## 错误响应格式

```json
{
  "code": 400,
  "message": "错误描述信息",
  "data": null
}
```

## 状态码说明

| 状态码 | 说明 |
|--------|------|
| 200 | 请求成功 |
| 400 | 请求参数错误 |
| 401 | 未授权 |
| 404 | 资源不存在 |
| 500 | 服务器内部错误 |

## 数据验证规则

1. **时间验证**: openTime 必须是未来时间
2. **长度限制**: 
   - title: 1-100字符
   - content: 1-1000字符  
   - author: 1-50字符
3. **格式验证**: 时间格式必须为 ISO 8601 标准