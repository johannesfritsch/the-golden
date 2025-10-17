import { Link } from 'react-router-dom'
import { Loader2 } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'

export default function Tap() {
  return (
    <div className="min-h-dvh flex items-center justify-center p-6">
      <Card className="w-full max-w-sm">
        <CardHeader>
          <CardTitle>Verifying your Aura</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col items-center gap-6">
            <div className="flex items-center gap-3 text-muted-foreground">
              <Loader2 className="animate-spin" />
              <span>Checking your SUN NFC link…</span>
            </div>
            <div className="grid w-full gap-3">
              <Button asChild variant="secondary">
                <Link to="/login">I have an account</Link>
              </Button>
              <Button asChild>
                <Link to="/register">I am new here</Link>
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}


