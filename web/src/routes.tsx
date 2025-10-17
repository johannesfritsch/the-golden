import { createBrowserRouter } from 'react-router-dom'
import AppLayout from '@/pages/layouts/AppLayout'
import Feed from '@/pages/app/Feed'
import Login from '@/pages/auth/Login'
import Tour from '@/pages/marketing/Tour'
import Register from '@/pages/auth/Register'
import Tap from '@/pages/auth/Tap'
import RootGate from '@/pages/RootGate'

export const router = createBrowserRouter([
  {
    path: '/',
    element: <RootGate />,
    handle: { title: 'Loading' },
  },
  {
    path: '/',
    element: <AppLayout />,
    children: [
      { path: 'feed', element: <Feed />, handle: { title: 'Feed' } },
    ],
  },
  {
    path: '/login',
    element: <Login />,
    handle: { title: 'Login' },
  },
  {
    path: '/tour',
    element: <Tour />,
    handle: { title: 'Tour' },
  },
  {
    path: '/register',
    element: <Register />,
    handle: { title: 'Register' },
  },
  {
    path: '/tap',
    element: <Tap />,
    handle: { title: 'Tap' },
  },
])

export default router
