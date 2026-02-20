import { useState, useEffect, useMemo } from 'react'
import { adminApi } from '@/api'
import { formatDate } from '@/utils'
import { useAdminStore, useToastStore } from '@/store'
import './Admin.css'

function Admin() {
  const { isAuthenticated, setAuth, checkAuth, logout } = useAdminStore()
  const toast = useToastStore()
  const [isAdmin, setIsAdmin] = useState(false)
  const [password, setPassword] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [deletingCode, setDeletingCode] = useState(null)
  const [capsules, setCapsules] = useState([])
  const [searchKeyword, setSearchKeyword] = useState('')
  const [showDeleteModal, setShowDeleteModal] = useState(false)
  const [capsuleToDelete, setCapsuleToDelete] = useState(null)
  const [pagination, setPagination] = useState({
    currentPage: 1,
    pageSize: 20,
    totalItems: 0,
    totalPages: 0
  })

  const filteredCapsules = useMemo(() => {
    if (!searchKeyword) {
      return capsules
    }
    const keyword = searchKeyword.toLowerCase()
    return capsules.filter(capsule => {
      const title = (capsule.title || '').toLowerCase()
      const code = (capsule.capsuleCode || '').toLowerCase()
      return title.includes(keyword) || code.includes(keyword)
    })
  }, [capsules, searchKeyword])

  useEffect(() => {
    checkAuth()
    setIsAdmin(isAuthenticated)
    if (isAuthenticated) {
      loadCapsules()
    }
  }, [checkAuth, isAuthenticated])

  const handleLogin = async (e) => {
    e.preventDefault()
    if (!password) {
      toast.warning('请输入密码')
      return
    }
    
    setIsLoading(true)
    
    try {
      const response = await adminApi.login(password)
      setAuth(response.data.token)
      setIsAdmin(true)
      loadCapsules()
    } catch (error) {
      toast.error(error.message || '登录失败')
    } finally {
      setIsLoading(false)
    }
  }

  const loadCapsules = async (page = 1) => {
    setIsLoading(true)
    
    try {
      const response = await adminApi.getAll(page, pagination.pageSize)
      setCapsules(response.data.items || response.data)
      if (response.data.pagination) {
        setPagination(response.data.pagination)
      }
    } catch (error) {
      toast.error(error.message || '加载失败')
    } finally {
      setIsLoading(false)
    }
  }

  const openDeleteModal = (capsule) => {
    setCapsuleToDelete(capsule)
    setShowDeleteModal(true)
  }

  const cancelDelete = () => {
    setShowDeleteModal(false)
    setCapsuleToDelete(null)
  }

  const confirmDelete = async () => {
    if (!capsuleToDelete) return
    const capsuleCode = capsuleToDelete.capsuleCode
    setDeletingCode(capsuleCode)

    try {
      await adminApi.delete(capsuleCode)
      setCapsules(capsules.filter(c => c.capsuleCode !== capsuleCode))
      toast.success('删除成功')
    } catch (error) {
      toast.error(error.message || '删除失败')
    } finally {
      setDeletingCode(null)
      setShowDeleteModal(false)
      setCapsuleToDelete(null)
    }
  }

  const handleLogout = () => {
    logout()
    setIsAdmin(false)
    setPassword('')
    setCapsules([])
  }

  if (!isAdmin) {
    return (
      <div className="admin">
        <div className="container">
          <div className="login-form">
            <div className="card">
              <h1>管理员登录</h1>
              <form onSubmit={handleLogin}>
                <div className="form-group">
                  <label>管理员密码</label>
                  <input 
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    type="password" 
                    className="input"
                    placeholder="请输入管理员密码"
                  />
                </div>
                <button type="submit" className="btn btn-primary" disabled={isLoading}>
                  {isLoading ? '登录中...' : '登录'}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="admin">
      <div className="container">
        <div className="header">
          <h1>胶囊管理</h1>
          <button onClick={handleLogout} className="btn btn-secondary">退出登录</button>
        </div>
        
        <div className="actions">
          <input
            value={searchKeyword}
            onChange={e => setSearchKeyword(e.target.value)}
            type="text"
            className="input search-input"
            placeholder="按标题或胶囊码搜索"
          />
          <button onClick={() => loadCapsules()} className="btn btn-primary">刷新列表</button>
        </div>
        
        {isLoading ? (
          <div className="loading">
            <div className="spinner"></div>
            <p>加载中...</p>
          </div>
        ) : filteredCapsules.length > 0 ? (
          <div className="capsules-list">
            {filteredCapsules.map(capsule => (
              <div key={capsule.id} className="capsule-item card">
                <div className="capsule-header">
                  <h3>{capsule.title}</h3>
                  <span className="capsule-code">{capsule.capsuleCode}</span>
                </div>
                
                <div className="capsule-meta">
                  <div className="meta-item">
                    <span className="label">作者:</span>
                    <span className="value">{capsule.creatorNickname || capsule.author || '匿名'}</span>
                  </div>
                  <div className="meta-item">
                    <span className="label">创建时间:</span>
                    <span className="value">{formatDate(capsule.createdAt || capsule.createTime)}</span>
                  </div>
                  <div className="meta-item">
                    <span className="label">开启时间:</span>
                    <span className="value">{formatDate(capsule.openTime)}</span>
                  </div>
                  <div className="meta-item">
                    <span className="label">状态:</span>
                    <span className={`value ${(capsule.canOpen || capsule.isOpen) ? 'status-open' : ''}`}>
                      {(capsule.canOpen || capsule.isOpen) ? '已开启' : '未开启'}
                    </span>
                  </div>
                </div>
                
                <div className="capsule-content">
                  <div className="label">胶囊内容:</div>
                  <p className="content-text">
                    {capsule.content || '（暂无内容）'}
                  </p>
                </div>
                
                <div className="capsule-actions">
                  <button 
                    onClick={() => openDeleteModal(capsule)} 
                    className="btn btn-danger"
                    disabled={deletingCode === capsule.capsuleCode}
                  >
                    {deletingCode === capsule.capsuleCode ? '删除中...' : '删除'}
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="empty-state">
            <p>暂无胶囊数据</p>
          </div>
        )}

        {pagination.totalPages > 1 && (
          <div className="pagination">
            <button 
              className="btn btn-secondary"
              disabled={pagination.currentPage === 1}
              onClick={() => loadCapsules(pagination.currentPage - 1)}
            >
              上一页
            </button>
            <span className="page-info">
              第 {pagination.currentPage} / {pagination.totalPages} 页
            </span>
            <button 
              className="btn btn-secondary"
              disabled={pagination.currentPage === pagination.totalPages}
              onClick={() => loadCapsules(pagination.currentPage + 1)}
            >
              下一页
            </button>
          </div>
        )}

        {showDeleteModal && (
          <div className="modal-overlay">
            <div className="modal-content">
              <h3 className="modal-title">确认删除</h3>
              <p className="modal-text">
                确定要删除
                {capsuleToDelete && <span> {capsuleToDelete.title || '这个胶囊'} </span>}
                吗？此操作不可恢复。
              </p>
              <div className="modal-actions">
                <button onClick={cancelDelete} className="btn btn-secondary">取消</button>
                <button 
                  onClick={confirmDelete} 
                  className="btn btn-danger"
                  disabled={deletingCode === capsuleToDelete?.capsuleCode}
                >
                  {deletingCode === capsuleToDelete?.capsuleCode ? '删除中...' : '确认删除'}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default Admin
