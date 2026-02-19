<template>
  <div class="about">
    <div class="container">
      <div class="card">
        <div class="about-header" @click="handleLogoClick">
          <div class="logo-icon">🕐</div>
          <div class="title-group">
            <h1>关于 Time Capsule</h1>
            <p class="version">版本 {{ appVersion }}</p>
            <p class="hint-text">（在此处快速点击5次进入管理员界面）</p>
          </div>
        </div>
        
        <section class="section">
          <h2>📖 什么是时间胶囊？</h2>
          <p>时间胶囊是一种特殊的"信件"，你可以现在写下想对未来自己说的话，设定一个未来的开启时间，在那个时刻再打开查看。</p>
        </section>
        
        <section class="section">
          <h2>✨ 核心特性</h2>
          <ul class="features">
            <li>
              <strong>🕐 定时开启</strong>
              <span>设定未来任意时间点开启胶囊</span>
            </li>
            <li>
              <strong>🔐 匿名使用</strong>
              <span>无需注册登录，保护你的隐私</span>
            </li>
            <li>
              <strong>🎯 唯一访问</strong>
              <span>通过8位胶囊码访问，简单安全</span>
            </li>
            <li>
              <strong>📝 纯文本</strong>
              <span>专注于文字内容，简洁高效</span>
            </li>
            <li>
              <strong>🛡️ 不可篡改</strong>
              <span>一经发布无法修改或删除（管理员除外）</span>
            </li>
          </ul>
        </section>
        
        <section class="section">
          <h2>🚀 如何使用？</h2>
          <div class="steps">
            <div class="step">
              <div class="step-number">1</div>
              <div class="step-content">
                <h3>创建胶囊</h3>
                <p>在首页点击"创建胶囊"，填写标题、内容，设置开启时间和昵称</p>
              </div>
            </div>
            <div class="step">
              <div class="step-number">2</div>
              <div class="step-content">
                <h3>获取胶囊码</h3>
                <p>创建成功后会获得一个8位的唯一胶囊码，请妥善保管</p>
              </div>
            </div>
            <div class="step">
              <div class="step-number">3</div>
              <div class="step-content">
                <h3>等待开启</h3>
                <p>在设定的时间到达前，胶囊内容会被保护起来</p>
              </div>
            </div>
            <div class="step">
              <div class="step-number">4</div>
              <div class="step-content">
                <h3>查看胶囊</h3>
                <p>到达开启时间后，输入胶囊码即可查看完整内容</p>
              </div>
            </div>
          </div>
        </section>
        
        <section class="section">
          <h2>🔒 隐私保护</h2>
          <ul class="privacy-list">
            <li>我们不会收集任何个人身份信息</li>
            <li>胶囊内容加密存储，确保安全性</li>
            <li>删除功能仅限管理员使用</li>
            <li>服务日志不记录具体内容</li>
          </ul>
        </section>
        
        <section class="section">
          <h2>👨‍💻 技术栈</h2>
          <div class="tech-stack">
            <div class="tech-item">
              <strong>后端:</strong> Spring Boot + PostgreSQL
            </div>
            <div class="tech-item">
              <strong>前端:</strong> Vue 3 + Vite
            </div>
            <div class="tech-item">
              <strong>部署:</strong> Docker + Nginx
            </div>
          </div>
        </section>
        
        <section class="section">
          <h2>📬 联系我们</h2>
          <p>如有任何问题或建议，欢迎通过以下方式联系我们：</p>
          <ul class="contact-list">
            <li>提交 GitHub Issue</li>
            <li>发送邮件至 support@timecapsule.app</li>
          </ul>
        </section>
        
        <div class="footer-actions">
          <router-link to="/" class="btn btn-primary">返回首页</router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

const appVersion = '1.0.0'
const logoClickCount = ref(0)
const lastClickTime = ref(0)

const handleLogoClick = () => {
  const now = Date.now()

  if (now - lastClickTime.value > 1000) {
    logoClickCount.value = 0
  }

  logoClickCount.value++
  lastClickTime.value = now

  if (logoClickCount.value >= 5) {
    router.push('/admin')
  }
}
</script>

<style scoped>
.about {
  padding: 40px 20px;
  min-height: 100vh;
  background: linear-gradient(135deg, #f9fafb 0%, #e5e7eb 100%);
}

.card {
  max-width: 800px;
  margin: 0 auto;
}

.about-header {
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 2rem;
  cursor: pointer;
  user-select: none;
}

.logo-icon {
  font-size: 3rem;
}

.title-group h1 {
  margin: 0;
  color: #1f2937;
}

.version {
  margin: 0.25rem 0 0;
  font-size: 0.9rem;
  color: #6b7280;
}

.hint-text {
  margin: 0.25rem 0 0;
  font-size: 0.8rem;
  color: #9ca3af;
}

.section {
  margin-bottom: 2.5rem;
}

.section h2 {
  color: #374151;
  margin-bottom: 1rem;
  padding-bottom: 0.5rem;
  border-bottom: 2px solid #e5e7eb;
}

.section p {
  line-height: 1.8;
  color: #4b5563;
}

.features {
  list-style: none;
}

.features li {
  padding: 1rem;
  margin-bottom: 0.5rem;
  background: #f9fafb;
  border-radius: 8px;
  border-left: 4px solid #4f46e5;
}

.features strong {
  display: block;
  color: #1f2937;
  margin-bottom: 0.25rem;
}

.steps {
  display: grid;
  gap: 1.5rem;
}

.step {
  display: flex;
  gap: 1.5rem;
  align-items: flex-start;
}

.step-number {
  width: 40px;
  height: 40px;
  background: #4f46e5;
  color: white;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
  flex-shrink: 0;
}

.step-content h3 {
  margin: 0 0 0.5rem 0;
  color: #1f2937;
}

.step-content p {
  margin: 0;
  color: #6b7280;
}

.privacy-list,
.contact-list {
  padding-left: 1.5rem;
}

.privacy-list li,
.contact-list li {
  margin-bottom: 0.5rem;
  color: #4b5563;
}

.tech-stack {
  display: grid;
  gap: 1rem;
}

.tech-item {
  padding: 1rem;
  background: #f3f4f6;
  border-radius: 8px;
  color: #374151;
}

.footer-actions {
  display: flex;
  gap: 1rem;
  justify-content: center;
  margin-top: 2rem;
  padding-top: 2rem;
  border-top: 1px solid #e5e7eb;
}
</style>
