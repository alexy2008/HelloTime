import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { validateCapsuleCode } from '@/utils'
import ThemeSwitch from '@/components/ThemeSwitch'
import './Home.css'

function Home() {
  const navigate = useNavigate()
  const [showLookupModal, setShowLookupModal] = useState(false)
  const [capsuleCode, setCapsuleCode] = useState('')

  const lookupCapsule = () => {
    if (validateCapsuleCode(capsuleCode)) {
      navigate(`/capsule/${capsuleCode}`)
    } else {
      alert('请输入正确的8位胶囊码')
    }
  }

  return (
    <div className="home">
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
        <div className="hero">
          <div className="logo">
            <img src="/tclogo.png" alt="Time Capsule Logo" className="logo-image" />
            <h1 className="logo-text">时间胶囊</h1>
          </div>
          <p className="subtitle">写给未来自己的时间胶囊</p>
          <div className="actions">
            <Link to="/create" className="btn btn-publish">
              发布
            </Link>
            <button onClick={() => setShowLookupModal(true)} className="btn btn-open">
              开启
            </button>
          </div>
          <div className="about-link">
            <Link to="/about" className="about-text">about</Link>
          </div>
        </div>
      </div>

      {/* 查看胶囊模态框 */}
      {showLookupModal && (
        <div className="modal-overlay" onClick={() => setShowLookupModal(false)}>
          <div className="modal-content" onClick={e => e.stopPropagation()}>
            <h2>查看胶囊</h2>
            <div className="form-group">
              <input
                value={capsuleCode}
                onChange={e => setCapsuleCode(e.target.value.toUpperCase())}
                type="text"
                placeholder="请输入8位胶囊码"
                className="input"
                maxLength="8"
                onKeyUp={e => e.key === 'Enter' && lookupCapsule()}
              />
            </div>
            <div className="modal-actions">
              <button onClick={lookupCapsule} className="btn btn-primary" disabled={!capsuleCode}>
                查看
              </button>
              <button onClick={() => setShowLookupModal(false)} className="btn btn-secondary">
                取消
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default Home
