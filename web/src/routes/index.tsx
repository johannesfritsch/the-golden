import { createBrowserRouter } from 'react-router-dom'
import AppLayout from '@/routes/layouts/AppLayout'
import Feed from '@/pages/app/Feed'
import Login from '@/pages/auth/Login'
import Tour from '@/pages/marketing/Tour'
import Register from '@/pages/auth/Register'
import Tap from '@/pages/auth/Tap'

export const router = createBrowserRouter([
  {
    path: '/',
    element: <AppLayout />,
    children: [
      { index: true, element: <Feed /> },
      { path: 'feed', element: <Feed /> },
    ],
  },
  {
    path: '/login',
    element: <Login />,
  },
  {
    path: '/tour',
    element: <Tour />,
  },
  {
    path: '/register',
    element: <Register />,
  },
  {
    path: '/tap',
    element: <Tap />,
  },
])

export default router
