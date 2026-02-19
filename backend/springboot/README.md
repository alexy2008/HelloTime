# Time Capsule 后端

基于 Spring Boot 的时间胶囊应用后端服务。

## 技术栈

- **Spring Boot 3.2** - Java 应用框架
- **Spring Data JPA** - 数据持久层框架
- **PostgreSQL/SQLite** - 数据库支持
- **JWT** - Token 认证
- **Maven** - 项目构建工具

## 项目结构

```
src/main/java/com/timecapsule/
├── controller/     # 控制器层
├── service/        # 业务逻辑层
├── repository/     # 数据访问层
├── model/          # 实体模型
├── dto/            # 数据传输对象
├── config/         # 配置类
├── exception/      # 异常处理
└── util/           # 工具类
```

## 环境要求

- Java 17+
- Maven 3.8+
- PostgreSQL 或 SQLite

## 快速开始

### 1. 配置数据库

修改 `src/main/resources/application.properties`:

```properties
# PostgreSQL 配置
spring.datasource.url=jdbc:postgresql://localhost:5432/timecapsule
spring.datasource.username=postgres
spring.datasource.password=your_password

# 或使用 SQLite
# spring.datasource.url=jdbc:sqlite:timecapsule.db
```

### 2. 运行应用

```bash
# 使用 Maven Wrapper
./mvnw spring-boot:run

# 或使用已安装的 Maven
mvn spring-boot:run
```

默认访问地址: http://localhost:8080/api

### 3. 开发模式运行

```bash
./mvnw spring-boot:run -Dspring-boot.run.profiles=dev
```

## API 接口

详见 [API 文档](../../docs/API.md)

### 主要接口

- `POST /api/capsules` - 创建胶囊
- `GET /api/capsules/{code}` - 获取胶囊
- `GET /api/capsules/{code}/status` - 检查状态
- `POST /api/admin/login` - 管理员登录
- `GET /api/admin/capsules` - 获取所有胶囊
- `DELETE /api/admin/capsules/{id}` - 删除胶囊

## 配置说明

### 管理员密码

在 `application.properties` 中配置:

```properties
admin.password=admin123
```

### JWT 配置

```properties
jwt.secret=your-secret-key-here-change-in-production
jwt.expiration=86400000
```

## 数据库设计

详见 [数据库文档](../../docs/DATABASE.md)

## 测试

运行单元测试:

```bash
./mvnw test
```

## 构建部署

打包应用:

```bash
./mvnw clean package
```

运行打包后的应用:

```bash
java -jar target/time-capsule-backend-1.0.0.jar
```