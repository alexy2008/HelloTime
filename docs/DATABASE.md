# 数据库设计

## 概述

Time Capsule 应用的数据库设计方案，支持 PostgreSQL 和 SQLite 两种数据库。

## 表结构设计

### 1. 胶囊表 (capsules)

存储所有时间胶囊的基本信息。

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

#### 字段说明

| 字段名 | 类型 | 约束 | 说明 |
|--------|------|------|------|
| id | BIGSERIAL | PK | 主键，自增 |
| capsule_code | VARCHAR(8) | UK, NOT NULL | 8位唯一胶囊码 |
| title | VARCHAR(100) | NOT NULL | 胶囊标题 |
| content | TEXT | NOT NULL | 胶囊内容 |
| open_time | TIMESTAMP WITH TIME ZONE | NOT NULL | 开启时间 |
| author | VARCHAR(50) | | 发布者昵称 |
| create_time | TIMESTAMP WITH TIME ZONE | DEFAULT CURRENT_TIMESTAMP | 创建时间 |
| is_deleted | BOOLEAN | DEFAULT FALSE | 软删除标记 |

#### 索引

```sql
-- 胶囊码索引（唯一约束已自动创建）
CREATE INDEX idx_capsules_open_time ON capsules(open_time);
CREATE INDEX idx_capsules_create_time ON capsules(create_time);
```

## SQLite 兼容版本

```sql
CREATE TABLE capsules (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    capsule_code TEXT UNIQUE NOT NULL,
    title TEXT NOT NULL,
    content TEXT NOT NULL,
    open_time TEXT NOT NULL,
    author TEXT,
    create_time TEXT DEFAULT CURRENT_TIMESTAMP,
    is_deleted BOOLEAN DEFAULT FALSE
);
```

## 初始化数据

### 生成胶囊码

胶囊码由8位随机字母数字组成：

```java
private String generateCapsuleCode() {
    String chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    StringBuilder code = new StringBuilder();
    Random random = new Random();
    for (int i = 0; i < 8; i++) {
        code.append(chars.charAt(random.nextInt(chars.length())));
    }
    return code.toString();
}
```

## 查询示例

### 1. 根据胶囊码查询（排除已删除）

```sql
SELECT * FROM capsules 
WHERE capsule_code = ? AND is_deleted = FALSE;
```

### 2. 查询已到期可开启的胶囊

```sql
SELECT * FROM capsules 
WHERE open_time <= CURRENT_TIMESTAMP 
AND is_deleted = FALSE;
```

### 3. 查询所有未删除胶囊

```sql
SELECT * FROM capsules 
WHERE is_deleted = FALSE 
ORDER BY create_time DESC;
```

## 性能优化建议

1. **索引优化**: 为常用查询字段建立索引
2. **分页查询**: 大量数据时使用 LIMIT/OFFSET
3. **软删除**: 使用 is_deleted 字段而非物理删除
4. **定期清理**: 可定期清理过期很久的数据

## 备份策略

建议每日备份数据库，保留最近30天的备份文件。