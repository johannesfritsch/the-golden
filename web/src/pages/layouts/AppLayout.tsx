import { Outlet, Link, useMatches, useNavigationType, useNavigate } from 'react-router-dom'
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet'
import { Button } from '@/components/ui/button'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { useEffect, useRef, useState } from 'react'

export default function AppLayout() {
  const matches = useMatches()
  const navType = useNavigationType()
  const navigate = useNavigate()
  const [menuOpen, setMenuOpen] = useState(false)
  const menuRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    const appName = 'The Golden'
    const activeWithTitle = [...matches].reverse().find(m => (m.handle as any)?.title)
    const pageTitle = (activeWithTitle?.handle as any)?.title as string | undefined
    document.title = pageTitle ? `${appName} | ${pageTitle}` : appName
  }, [matches, navType])

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setMenuOpen(false)
      }
    }
    if (menuOpen) document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [menuOpen])

  function handleLogout() {
    localStorage.removeItem('loggedIn')
    navigate('/', { replace: true })
  }

  return (
    <div className="min-h-dvh flex flex-col">
      <header className="sticky top-0 z-40 border-b bg-background/80 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="mx-auto w-full max-w-5xl px-4 h-14 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="sm" aria-label="Open navigation">
                  ☰
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="w-80">
                <SheetHeader>
                  <SheetTitle>Navigation</SheetTitle>
                </SheetHeader>
                <nav className="mt-4 grid gap-2">
                  <Button asChild variant="ghost" className="justify-start">
                    <Link to="/">Home</Link>
                  </Button>
                  <Button asChild variant="ghost" className="justify-start">
                    <Link to="/feed">Feed</Link>
                  </Button>
                </nav>
              </SheetContent>
            </Sheet>
            <Link to="/" className="font-semibold">The Golden</Link>
          </div>
          <div className="relative" ref={menuRef}>
            <button
              type="button"
              aria-label="Open profile menu"
              className="rounded-full focus:outline-none focus:ring-2 focus:ring-ring/50"
              onClick={() => setMenuOpen((o) => !o)}
            >
              <Avatar className="size-8">
                <AvatarFallback>GG</AvatarFallback>
              </Avatar>
            </button>
            {menuOpen ? (
              <div
                role="menu"
                aria-label="Profile menu"
                className="absolute right-0 mt-2 w-44 rounded-md border bg-popover text-popover-foreground shadow-md"
              >
                <div className="py-1">
                  <button
                    className="w-full px-3 py-2 text-left text-sm hover:bg-accent hover:text-accent-foreground"
                    onClick={handleLogout}
                  >
                    Log out
                  </button>
                </div>
              </div>
            ) : null}
          </div>
        </div>
      </header>
      <main className="mx-auto w-full max-w-5xl flex-1 px-4 py-6">
        <Outlet />
      </main>
    </div>
  )
}
