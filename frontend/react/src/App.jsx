import { RouterProvider } from 'react-router-dom'
import router from './router'

function App() {
  return (
    <div style={{ minHeight: '100vh', backgroundColor: 'var(--color-bg)' }}>
      <RouterProvider router={router} />
    </div>
  )
}

export default App
