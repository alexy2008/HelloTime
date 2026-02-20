import { Link } from 'react-router-dom'
import './Navbar.css'

function Navbar() {
  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/" className="navbar-brand">
          <img src="/tclogo.png" alt="Time Capsule" className="navbar-logo" />
          <span className="navbar-title">时间胶囊</span>
        </Link>
      </div>
    </nav>
  )
}

export default Navbar
