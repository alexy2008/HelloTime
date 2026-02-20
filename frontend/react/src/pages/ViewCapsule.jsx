import { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { capsuleApi } from '@/api'
import { formatDate, isExpired } from '@/utils'
import './ViewCapsule.css'

function ViewCapsule() {
  const { code } = useParams()
  const [capsule, setCapsule] = useState(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState(null)
  const [countdown, setCountdown] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  })

  useEffect(() => {
    let countdownTimer = null

    const loadCapsule = async () => {
      try {
        setIsLoading(true)
        setError(null)
        
        const response = await capsuleApi.get(code)
        setCapsule(response.data)
        
        if (!isExpired(response.data.openTime)) {
          startCountdown()
        }
      } catch (err) {
        setError(err.response?.data?.message || '胶囊不存在或已删除')
      } finally {
        setIsLoading(false)
      }
    }

    const startCountdown = () => {
      const updateCountdown = () => {
        const now = new Date()
        const openTime = new Date(capsule.openTime.replace(' ', 'T'))
        const diff = openTime - now
        
        if (diff <= 0) {
          clearInterval(countdownTimer)
          window.location.reload()
          return
        }
        
        const days = Math.floor(diff / (1000 * 60 * 60 * 24))
        const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
        const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60))
        const seconds = Math.floor((diff % (1000 * 60)) / 1000)
        
        setCountdown({ days, hours, minutes, seconds })
      }
      
      updateCountdown()
      countdownTimer = setInterval(updateCountdown, 1000)
    }

    loadCapsule()

    return () => {
      if (countdownTimer) {
        clearInterval(countdownTimer)
      }
    }
  }, [code, capsule?.openTime])

  if (isLoading) {
    return (
      <div className="view-capsule">
        <div className="container">
          <div className="loading">
            <div className="spinner"></div>
            <p>正在加载胶囊...</p>
          </div>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="view-capsule">
        <div className="container">
          <div className="error-section">
            <div className="alert alert-error">
              {error}
            </div>
            <Link to="/" className="btn btn-secondary">返回首页</Link>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="view-capsule">
      <div className="container">
        <div className="card capsule-content">
          <h1>{capsule.title}</h1>
          
          <div className="capsule-meta">
            <div className="meta-item">
              <span className="label">发布者:</span>
              <span className="value">{capsule.author || '匿名用户'}</span>
            </div>
            <div className="meta-item">
              <span className="label">创建时间:</span>
              <span className="value">{formatDate(capsule.createTime)}</span>
            </div>
            <div className="meta-item">
              <span className="label">开启时间:</span>
              <span className="value">{formatDate(capsule.openTime)}</span>
            </div>
          </div>
          
          {!isExpired(capsule.openTime) ? (
            <div className="countdown-section">
              <div className="countdown">
                <h3>距离开启还有</h3>
                <div className="timer">
                  <div className="time-unit">
                    <span className="number">{countdown.days}</span>
                    <span className="unit">天</span>
                  </div>
                  <div className="time-unit">
                    <span className="number">{countdown.hours}</span>
                    <span className="unit">时</span>
                  </div>
                  <div className="time-unit">
                    <span className="number">{countdown.minutes}</span>
                    <span className="unit">分</span>
                  </div>
                  <div className="time-unit">
                    <span className="number">{countdown.seconds}</span>
                    <span className="unit">秒</span>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="content-section">
              <h3>胶囊内容</h3>
              <div className="content">
                {capsule.content}
              </div>
            </div>
          )}
          
          <div className="actions">
            <Link to="/" className="btn btn-primary">返回首页</Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ViewCapsule
