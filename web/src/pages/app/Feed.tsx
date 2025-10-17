import { Link } from 'react-router-dom'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'

const items = [
  {
    id: '1',
    title: 'A new event has been posted',
    description: 'Jazz & Cocktails at The Golden Lounge',
    time: '2h ago',
    badge: 'Event',
    image: 'https://picsum.photos/seed/event/1200/600',
  },
  {
    id: '2',
    title: 'One of your friends has made a booking',
    description: 'Table for 4 this Friday, 7:30 PM',
    time: '4h ago',
    badge: 'Booking',
    image: 'https://picsum.photos/seed/booking/1200/600',
  },
  {
    id: '3',
    title: 'Someone you referred registered',
    description: 'Anna just joined The Golden',
    time: '1d ago',
    badge: 'Referral',
    image: 'https://picsum.photos/seed/referral/1200/600',
  },
  {
    id: '4',
    title: 'A new message has been received',
    description: '“See you there! Save me a seat.”',
    time: '2d ago',
    badge: 'Message',
    image: 'https://picsum.photos/seed/message/1200/600',
  },
]

export default function Feed() {
  return (
    <div className="min-h-dvh flex items-center justify-center p-6 sm:p-8">
      <div className="w-full max-w-2xl space-y-7">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-semibold">Your feed</h1>
          <Button asChild variant="outline">
            <Link to="/">Home</Link>
          </Button>
        </div>
        <div className="grid gap-7">
          {items.map((item, idx) => (
            <Card key={item.id}>
              <CardHeader className="gap-3">
                <div className="flex items-center gap-3">
                  <Avatar className="size-10">
                    <AvatarImage src={`https://i.pravatar.cc/100?img=${idx + 1}`} />
                    <AvatarFallback>GG</AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <CardTitle className="leading-none text-base">{item.title}</CardTitle>
                      <Badge variant="secondary" className="rounded-full">{item.badge}</Badge>
                      <span className="text-xs text-muted-foreground">{item.time}</span>
                    </div>
                    <p className="text-sm text-muted-foreground">{item.description}</p>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="overflow-hidden rounded-lg">
                  <img
                    src={item.image}
                    alt=""
                    className="block w-full h-auto aspect-[3/1] object-cover"
                    loading="lazy"
                    width={1200}
                    height={600}
                  />
                </div>
                <div className="flex items-center gap-3">
                  <Button size="sm" variant="secondary">Like</Button>
                  <Button size="sm" variant="outline">Share</Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
        <div className="flex justify-center">
          <Button variant="secondary">Load more</Button>
        </div>
      </div>
    </div>
  )
}


