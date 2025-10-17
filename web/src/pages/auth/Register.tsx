import { Button } from '@/components/ui/button'
import { useNavigate } from 'react-router-dom'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

export default function Register() {
  const navigate = useNavigate()
  function handleRegister() {
    localStorage.setItem('loggedIn', 'true')
    navigate('/', { replace: true })
  }
  return (
    <div className="min-h-dvh flex items-center justify-center p-6">
      <Card className="w-full max-w-sm">
        <CardHeader>
          <div className="flex justify-center">
            <img src="/icon.png" alt="The Golden" className="h-12 w-12 rounded-md" />
          </div>
          <CardTitle className="mt-2 text-center">Create your account</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" placeholder="you@example.com" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input id="password" type="password" placeholder="••••••••" />
            </div>
            <Button className="w-full" onClick={handleRegister}>Register</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}


