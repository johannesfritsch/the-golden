import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

export default function RootGate() {
  const navigate = useNavigate()

  useEffect(() => {
    const loggedIn = typeof window !== 'undefined' && localStorage.getItem('loggedIn') === 'true'
    navigate(loggedIn ? '/feed' : '/tour', { replace: true })
  }, [navigate])

  return (
    <div className="flex h-[50vh] items-center justify-center" aria-live="polite" aria-busy="true">
      <div className="h-8 w-8 animate-spin rounded-full border-2 border-muted-foreground border-t-transparent" />
    </div>
  )
}


