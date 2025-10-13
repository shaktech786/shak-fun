'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { Mail, Lock, User, Gamepad2 } from 'lucide-react'
import { createClient } from '@/lib/supabase/client'
import { Button } from '@/components/ui/Button'
import { Card } from '@/components/ui/Card'

export default function SignUpPage() {
  const router = useRouter()
  const supabase = createClient()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [username, setUsername] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError(null)

    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          username
        }
      }
    })

    if (error) {
      setError(error.message)
      setLoading(false)
    } else {
      router.push('/games')
      router.refresh()
    }
  }

  const handleGoogleSignUp = async () => {
    setLoading(true)
    const { error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: `${window.location.origin}/auth/callback`
      }
    })

    if (error) {
      setError(error.message)
      setLoading(false)
    }
  }

  return (
    <div className="container mx-auto px-4 py-12 max-w-md">
      <Card className="animate-slide-in">
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-gradient-to-br from-primary to-accent rounded-lg flex items-center justify-center mx-auto mb-4 retro-shadow animate-float">
            <Gamepad2 className="text-white" size={32} />
          </div>
          <h1 className="text-3xl font-bold gradient-text mb-2">Join Shak.Fun!</h1>
          <p className="text-foreground/70">Get 100 free points to start playing</p>
        </div>

        {error && (
          <div className="bg-danger/10 border border-danger/30 rounded-lg p-4 mb-6" role="alert">
            <p className="text-danger text-sm font-medium">{error}</p>
          </div>
        )}

        <form onSubmit={handleSignUp} className="space-y-4 mb-6">
          <div>
            <label htmlFor="username" className="block text-sm font-medium text-foreground mb-2">
              Username
            </label>
            <div className="relative">
              <User className="absolute left-3 top-1/2 -translate-y-1/2 text-primary-light pointer-events-none" size={18} aria-hidden="true" />
              <input
                id="username"
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full pl-10 pr-4 py-3 bg-background border border-card-border rounded-lg focus:border-accent focus:ring-2 focus:ring-accent/20 focus:outline-none text-foreground transition-colors"
                placeholder="Choose a username"
                autoComplete="username"
                required
                aria-required="true"
              />
            </div>
          </div>

          <div>
            <label htmlFor="email" className="block text-sm font-medium text-foreground mb-2">
              Email address
            </label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-primary-light pointer-events-none" size={18} aria-hidden="true" />
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full pl-10 pr-4 py-3 bg-background border border-card-border rounded-lg focus:border-accent focus:ring-2 focus:ring-accent/20 focus:outline-none text-foreground transition-colors"
                placeholder="your@email.com"
                autoComplete="email"
                required
                aria-required="true"
              />
            </div>
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-foreground mb-2">
              Password
            </label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-primary-light pointer-events-none" size={18} aria-hidden="true" />
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-10 pr-4 py-3 bg-background border border-card-border rounded-lg focus:border-accent focus:ring-2 focus:ring-accent/20 focus:outline-none text-foreground transition-colors"
                placeholder="Choose a secure password"
                autoComplete="new-password"
                minLength={6}
                required
                aria-required="true"
                aria-describedby="password-requirements"
              />
            </div>
            <p id="password-requirements" className="text-xs text-primary-light mt-1">
              At least 6 characters
            </p>
          </div>

          <Button type="submit" className="w-full" disabled={loading}>
            {loading ? 'Creating account...' : 'Create Account'}
          </Button>
        </form>

        <div className="relative mb-6">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-card-border" />
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-2 bg-card-bg text-foreground/70">Or continue with</span>
          </div>
        </div>

        <Button
          onClick={handleGoogleSignUp}
          variant="ghost"
          className="w-full"
          disabled={loading}
        >
          <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
            <path
              fill="currentColor"
              d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
            />
            <path
              fill="currentColor"
              d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
            />
            <path
              fill="currentColor"
              d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
            />
            <path
              fill="currentColor"
              d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
            />
          </svg>
          Sign up with Google
        </Button>

        <p className="text-center text-sm text-foreground/70 mt-6">
          Already have an account?{' '}
          <Link href="/auth/login" className="text-primary font-semibold hover:underline">
            Sign in
          </Link>
        </p>
      </Card>
    </div>
  )
}
