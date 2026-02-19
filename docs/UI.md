# UI 设计规范

## 设计理念

简洁、优雅、专注内容的时间胶囊应用界面设计规范。

## 色彩规范

### 主色调
- **主色**: `#4F46E5` (Indigo-600) - 用于主要按钮和重要元素
- **辅助色**: `#818CF8` (Indigo-400) - 用于次要按钮和装饰元素

### 中性色
- **背景色**: `#F9FAFB` (Gray-50)
- **卡片背景**: `#FFFFFF` 
- **文字主色**: `#1F2937` (Gray-900)
- **文字次色**: `#6B7280` (Gray-500)
- **边框色**: `#E5E7EB` (Gray-200)

### 状态色
- **成功**: `#10B981` (Green-500)
- **警告**: `#F59E0B` (Amber-500)
- **错误**: `#EF4444` (Red-500)
- **信息**: `#3B82F6` (Blue-500)

## 字体规范

### 字体家族
```css
font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
```

### 字号层级
- **H1**: 32px/2rem - 页面主标题
- **H2**: 24px/1.5rem - 区块标题
- **H3**: 20px/1.25rem - 小标题
- **正文**: 16px/1rem - 主要文字
- **小字**: 14px/0.875rem - 辅助文字
- **微字**: 12px/0.75rem - 提示文字

## 组件规范

### 1. 按钮 Button

```css
.btn {
  padding: 12px 24px;
  border-radius: 8px;
  font-weight: 500;
  transition: all 0.2s;
  cursor: pointer;
  border: none;
}

.btn-primary {
  background-color: #4F46E5;
  color: white;
}

.btn-primary:hover {
  background-color: #4338CA;
}

.btn-secondary {
  background-color: #F3F4F6;
  color: #1F2937;
  border: 1px solid #E5E7EB;
}

.btn-secondary:hover {
  background-color: #E5E7EB;
}
```

### 2. 输入框 Input

```css
.input {
  width: 100%;
  padding: 12px 16px;
  border: 1px solid #E5E7EB;
  border-radius: 8px;
  font-size: 16px;
  transition: border-color 0.2s;
}

.input:focus {
  outline: none;
  border-color: #4F46E5;
  box-shadow: 0 0 0 3px rgba(79, 70, 229, 0.1);
}
```

### 3. 卡片 Card

```css
.card {
  background: white;
  border-radius: 12px;
  padding: 24px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  border: 1px solid #E5E7EB;
}
```

### 4. 提示框 Alert

```css
.alert {
  padding: 16px 20px;
  border-radius: 8px;
  margin-bottom: 16px;
}

.alert-success {
  background-color: #ECFDF5;
  border: 1px solid #A7F3D0;
  color: #065F46;
}

.alert-error {
  background-color: #FEF2F2;
  border: 1px solid #FECACA;
  color: #991B1B;
}

.alert-info {
  background-color: #EFF6FF;
  border: 1px solid #BFDBFE;
  color: #1E40AF;
}
```

## 页面布局

### 1. 创建胶囊页面

```
┌─────────────────────────────────┐
│            Header               │
├─────────────────────────────────┤
│                                 │
│          Create Form            │
│                                 │
│  [标题输入框]                   │
│  [内容文本域]                   │
│  [时间选择器]                   │
│  [昵称输入框]                   │
│                                 │
│       [创建胶囊按钮]            │
│                                 │
└─────────────────────────────────┘
```

### 2. 查看胶囊页面

```
┌─────────────────────────────────┐
│            Header               │
├─────────────────────────────────┤
│                                 │
│         Capsule Card            │
│                                 │
│  标题: 新年愿望                 │
│  作者: 匿名用户                 │
│  创建时间: 2024-01-01           │
│  开启时间: 2024-12-31           │
│                                 │
│  [内容区域]                     │
│                                 │
└─────────────────────────────────┘
```

### 3. 管理页面

```
┌─────────────────────────────────┐
│            Header               │
├─────────────────────────────────┤
│  [搜索框]  [刷新按钮]           │
├─────────────────────────────────┤
│                                 │
│        Capsules List            │
│                                 │
│  ┌───────────────────────────┐  │
│  │ 胶囊1 [查看详情] [删除]   │  │
│  ├───────────────────────────┤  │
│  │ 胶囊2 [查看详情] [删除]   │  │
│  └───────────────────────────┘  │
│                                 │
└─────────────────────────────────┘
```

## 响应式设计

### 断点设置
- **手机**: < 768px
- **平板**: 768px - 1024px
- **桌面**: > 1024px

### 移动端适配
- 表单字段垂直排列
- 按钮宽度100%
- 卡片间距减小
- 字号适当放大

## 交互规范

### 1. 加载状态
- 按钮提交时显示加载动画
- 页面切换时显示骨架屏
- 异步请求时显示加载提示

### 2. 错误处理
- 表单验证错误在对应字段下方显示
- 网络错误显示重试按钮
- 404页面提供返回首页链接

### 3. 成功反馈
- 操作成功显示 Toast 提示
- 胶囊创建成功显示胶囊码
- 页面跳转提供平滑过渡

## 动画效果

### 1. 微交互动画
```css
.transition-all {
  transition: all 0.2s ease-in-out;
}

.hover-scale {
  transition: transform 0.2s;
}

.hover-scale:hover {
  transform: scale(1.02);
}
```

### 2. 页面切换动画
- 使用淡入淡出效果
- 卡片入场使用轻微上滑动画
- 按钮点击有按下反馈

## 可访问性

### 1. 键盘导航
- 所有交互元素可通过 Tab 键访问
- 表单支持 Enter 键提交
- ESC 键关闭模态框

### 2. 屏幕阅读器
- 重要信息添加 aria-label
- 图标按钮添加文字说明
- 表单字段关联标签

### 3. 对比度
- 文字与背景对比度 ≥ 4.5:1
- 重要按钮对比度 ≥ 3:1
- 禁用状态保持可识别性