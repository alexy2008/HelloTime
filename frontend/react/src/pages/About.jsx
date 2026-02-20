import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import ThemeSwitch from '@/components/ThemeSwitch'
import './About.css'

function About() {
  const navigate = useNavigate()
  const appVersion = '1.0.0'
  const [logoClickCount, setLogoClickCount] = useState(0)
  const [lastClickTime, setLastClickTime] = useState(0)

  const handleLogoClick = () => {
    const now = Date.now()

    if (now - lastClickTime > 1000) {
      setLogoClickCount(0)
    }

    const newCount = logoClickCount + 1
    setLogoClickCount(newCount)
    setLastClickTime(now)

    if (newCount >= 5) {
      navigate('/admin')
    }
  }

  return (
    <div className="about">
      {/* 导航栏 */}
      <nav style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        backgroundColor: 'var(--color-bg-card)',
        borderBottom: '1px solid var(--color-border)',
        padding: '1rem',
        zIndex: 1000
      }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Link to="/" style={{ textDecoration: 'none', color: 'var(--color-text)', fontWeight: 'bold', fontSize: '1.25rem' }}>
            🕐 时间胶囊
          </Link>
          <ThemeSwitch />
        </div>
      </nav>

      <div className="container">
        <div className="card">
          <div className="about-header" onClick={handleLogoClick}>
            <img src="/tclogo.png" alt="Time Capsule Logo" className="logo-image" />
            <div className="title-group">
              <h1>关于时间胶囊</h1>
              <p className="version">版本 {appVersion}</p>
              <p className="hint-text">（在此处快速点击5次进入管理员界面）</p>
            </div>
          </div>
          
          <section className="section">
            <h2>📖 什么是时间胶囊？</h2>
            <p>时间胶囊是一种特殊的"信件"，你可以现在写下想对未来自己说的话，设定一个未来的开启时间，在那个时刻再打开查看。</p>
          </section>
          
          <section className="section">
            <h2>✨ 核心特性</h2>
            <ul className="features">
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
          
          <section className="section">
            <h2>🚀 如何使用？</h2>
            <div className="steps">
              <div className="step">
                <div className="step-number">1</div>
                <div className="step-content">
                  <h3>创建胶囊</h3>
                  <p>在首页点击"创建胶囊"，填写标题、内容，设置开启时间和昵称</p>
                </div>
              </div>
              <div className="step">
                <div className="step-number">2</div>
                <div className="step-content">
                  <h3>获取胶囊码</h3>
                  <p>创建成功后会获得一个8位的唯一胶囊码，请妥善保管</p>
                </div>
              </div>
              <div className="step">
                <div className="step-number">3</div>
                <div className="step-content">
                  <h3>等待开启</h3>
                  <p>在设定的时间到达前，胶囊内容会被保护起来</p>
                </div>
              </div>
              <div className="step">
                <div className="step-number">4</div>
                <div className="step-content">
                  <h3>查看胶囊</h3>
                  <p>到达开启时间后，输入胶囊码即可查看完整内容</p>
                </div>
              </div>
            </div>
          </section>
          
          <section className="section">
            <h2>🔒 隐私保护</h2>
            <ul className="privacy-list">
              <li>我们不会收集任何个人身份信息</li>
              <li>胶囊内容加密存储，确保安全性</li>
              <li>删除功能仅限管理员使用</li>
              <li>服务日志不记录具体内容</li>
            </ul>
          </section>
          
          <section className="section">
            <h2>👨‍💻 技术栈</h2>
            <div className="tech-stack">
              <div className="tech-item">
                <strong>后端:</strong> Spring Boot + PostgreSQL
              </div>
              <div className="tech-item">
                <strong>前端:</strong> React + Vite
              </div>
              <div className="tech-item">
                <strong>部署:</strong> Docker + Nginx
              </div>
            </div>
          </section>
          
          <section className="section">
            <h2>📬 联系我们</h2>
            <p>如有任何问题或建议，欢迎通过以下方式联系我们：</p>
            <ul className="contact-list">
              <li>提交 GitHub Issue</li>
              <li>发送邮件至 support@timecapsule.app</li>
            </ul>
          </section>
          
          <div className="footer-actions">
            <Link to="/" className="btn btn-primary">返回首页</Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default About
