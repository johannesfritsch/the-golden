import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { Button } from '@/components/ui/button'

type Slide = {
  id: string
  image: string
  title: string
  description: string
}

export default function Tour() {
  const slides: Slide[] = useMemo(
    () => [
      {
        id: 'welcome',
        image: 'https://picsum.photos/seed/golden-lobby/1920/1080',
        title: 'Welcome to The Golden',
        description:
          "Discover curated nights, intimate spaces, and effortless bookings—crafted for your circle. Explore experiences tailored to your vibe. See what's trending and plan with friends. Everything you need to go out, in one place.",
      },
      {
        id: 'events',
        image: 'https://picsum.photos/seed/golden-jazz/1920/1080',
        title: 'New events, always fresh',
        description:
          "From jazz sets to chef's tables—your feed highlights what matters, when it matters. Follow venues you love. Keep tabs on exclusive drops. Never miss a moment.",
      },
      {
        id: 'aura',
        image: 'https://picsum.photos/seed/golden-aura/1920/1080',
        title: 'Your Aura unlocks access',
        description:
          'The Aura is your login medium and membership signal. Obtain it to access bookings and messages. It keeps your identity portable and private. Claim yours to unlock the full experience.',
      },
      {
        id: 'connections',
        image: 'https://picsum.photos/seed/golden-friends/1920/1080',
        title: 'Built around your circle',
        description:
          'See when friends book, refer new members, and coordinate effortlessly. Share invites and plan together. Build your circle and elevate your nights. The more connected, the better it gets.',
      },
    ],
    [],
  )

  const [currentIndex, setCurrentIndex] = useState(0)
  const isLast = currentIndex === slides.length - 1
  const current = slides[currentIndex]

  function goNext() {
    if (!isLast) setCurrentIndex((i) => i + 1)
  }

  return (
    <div className="relative h-lvh w-lvw overflow-hidden bg-black">
      <div className="absolute inset-0">
        <img
          key={current.id}
          src={current.image}
          alt=""
          className="h-full w-full object-cover"
        />
      </div>

      <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-background/40 to-transparent" />

      <div className="pointer-events-none absolute inset-x-0 bottom-0">
        <div className="pointer-events-auto w-full">
          <div className="rounded-t-2xl border bg-background px-5 sm:px-6 pt-5 pb-safe-plus-4 shadow-lg">
            <div className="space-y-3">
              <h2 className="text-xl sm:text-2xl font-semibold leading-tight">{current.title}</h2>
              <p className="text-sm sm:text-base text-muted-foreground">{current.description}</p>
            </div>
            <div className="mt-4 flex items-center justify-between gap-3">
              <Button asChild variant="link" className="px-0">
                <Link to="/login">Login instead</Link>
              </Button>
              <div className="flex items-center gap-3">
                {isLast && (
                  <Button asChild>
                    <Link to="/register">Register</Link>
                  </Button>
                )}
                {!isLast && (
                  <Button variant="secondary" onClick={goNext}>Next</Button>
                )}
              </div>
            </div>
            <div className="mt-3 flex justify-center gap-1.5">
              {slides.map((s, idx) => (
                <Button
                  key={s.id}
                  variant="ghost"
                  className={
                    'h-1.5 w-6 rounded-full p-0 transition-colors ' +
                    (idx === currentIndex ? 'bg-foreground/80' : 'bg-muted-foreground/30 hover:bg-muted-foreground/50')
                  }
                  aria-label={`Go to slide ${idx + 1}`}
                  aria-current={idx === currentIndex}
                  onClick={() => setCurrentIndex(idx)}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}


