import { createBrowserRouter } from 'react-router-dom'
import Home from '@/pages/Home'
import CreateCapsule from '@/pages/CreateCapsule'
import ViewCapsule from '@/pages/ViewCapsule'
import About from '@/pages/About'
import Admin from '@/pages/Admin'

const router = createBrowserRouter([
  {
    path: '/',
    element: <Home />
  },
  {
    path: '/create',
    element: <CreateCapsule />
  },
  {
    path: '/capsule/:code',
    element: <ViewCapsule />
  },
  {
    path: '/about',
    element: <About />
  },
  {
    path: '/admin',
    element: <Admin />
  }
])

export default router
