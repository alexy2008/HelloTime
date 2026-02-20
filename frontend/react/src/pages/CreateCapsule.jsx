import { useState } from 'react'
import { Link } from 'react-router-dom'
import { capsuleApi } from '@/api'
import { validateForm } from '@/utils'
import './CreateCapsule.css'

function CreateCapsule() {
  const [isLoading, setIsLoading] = useState(false)
  const [showSuccessModal, setShowSuccessModal] = useState(false)
  const [showConfirmModal, setShowConfirmModal] = useState(false)
  const [capsuleCode, setCapsuleCode] = useState('')
  const [errors, setErrors] = useState({})
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    openTime: '',
    author: ''
  })

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const validation = validateForm(formData)
    
    if (!validation.isValid) {
      setErrors(validation.errors)
      return
    }
    
    setShowConfirmModal(true)
  }

  const confirmPublish = async () => {
    setShowConfirmModal(false)
    setErrors({})
    setIsLoading(true)
    
    try {
      const response = await capsuleApi.create(formData)
      setCapsuleCode(response.data.capsuleCode)
      setShowSuccessModal(true)
      
      // 清空表单
      setFormData({
        title: '',
        content: '',
        openTime: '',
        author: ''
      })
    } catch (error) {
      alert(error.message || '创建失败，请重试')
    } finally {
      setIsLoading(false)
    }
  }

  const cancelPublish = () => {
    setShowConfirmModal(false)
  }

  const copyCode = async () => {
    try {
      await navigator.clipboard.writeText(capsuleCode)
      alert('胶囊码已复制到剪贴板')
    } catch (err) {
      // 降级方案
      const textArea = document.createElement('textarea')
      textArea.value = capsuleCode
      document.body.appendChild(textArea)
      textArea.select()
      document.execCommand('copy')
      document.body.removeChild(textArea)
      alert('胶囊码已复制到剪贴板')
    }
  }

  return (
    <div className="create-capsule">
      <div className="container">
        {/* 创建表单 */}
        {!showSuccessModal && (
          <div className="card">
            <h1>创建时间胶囊</h1>
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label>胶囊标题 *</label>
                <input 
                  name="title"
                  value={formData.title}
                  onChange={handleInputChange}
                  type="text" 
                  className="input"
                  placeholder="给你的胶囊起个名字"
                  maxLength="100"
                />
                {errors.title && <span className="error">{errors.title}</span>}
              </div>
              
              <div className="form-group">
                <label>胶囊内容 *</label>
                <textarea 
                  name="content"
                  value={formData.content}
                  onChange={handleInputChange}
                  className="input"
                  rows="6"
                  placeholder="写下你想对未来的自己说的话..."
                  maxLength="1000"
                ></textarea>
                {errors.content && <span className="error">{errors.content}</span>}
              </div>
              
              <div className="form-group">
                <label>开启时间 *</label>
                <input 
                  name="openTime"
                  value={formData.openTime}
                  onChange={handleInputChange}
                  type="datetime-local" 
                  className="input"
                />
                {errors.openTime && <span className="error">{errors.openTime}</span>}
              </div>
              
              <div className="form-group">
                <label>你的昵称</label>
                <input 
                  name="author"
                  value={formData.author}
                  onChange={handleInputChange}
                  type="text" 
                  className="input"
                  placeholder="可选"
                  maxLength="50"
                />
                {errors.author && <span className="error">{errors.author}</span>}
              </div>
              
              <div className="form-actions">
                <button type="submit" className="btn btn-primary" disabled={isLoading}>
                  {isLoading ? '创建中...' : '创建胶囊'}
                </button>
                <Link to="/" className="btn btn-secondary">取消</Link>
              </div>
            </form>
          </div>
        )}
        
        {/* 确认发布弹窗 */}
        {showConfirmModal && (
          <div className="modal-overlay" onClick={cancelPublish}>
            <div className="modal-content confirm-modal" onClick={e => e.stopPropagation()}>
              <div className="modal-header">
                <h3>确认发布</h3>
              </div>
              <div className="modal-body">
                <p>胶囊一经发布无法删除，也无法更改。确定要发布吗？</p>
              </div>
              <div className="modal-footer">
                <button onClick={cancelPublish} className="btn btn-secondary">取消</button>
                <button onClick={confirmPublish} className="btn btn-primary">确定发布</button>
              </div>
            </div>
          </div>
        )}
        
        {/* 创建成功界面 */}
        {showSuccessModal && (
          <div className="success-container">
            <div className="success-card">
              <div className="success-header">
                <div className="success-icon">✓</div>
                <h1>创建成功！</h1>
              </div>
              
              <div className="success-content">
                <p className="subtitle">你的胶囊码是：</p>
                <div className="capsule-code">{capsuleCode}</div>
                <p className="tip">请妥善保管这个号码，这是查看胶囊的唯一凭证</p>
              </div>
              
              <div className="success-actions">
                <button onClick={copyCode} className="btn btn-primary btn-large">
                  复制胶囊码
                </button>
                <Link to="/" className="btn btn-secondary btn-large">
                  返回首页
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default CreateCapsule
