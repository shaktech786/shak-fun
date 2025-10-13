'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useAuth } from '@/lib/hooks/useAuth'
import { PointsDisplay } from './PointsDisplay'
import { Button } from './Button'
import { createClient } from '@/lib/supabase/client'
import { cn } from '@/lib/utils/cn'

export function Header() {
  const pathname = usePathname()
  const { user, profile, loading } = useAuth()
  const supabase = createClient()

  const handleSignOut = async () => {
    await supabase.auth.signOut()
    window.location.href = '/'
  }

  const navLinks = [
    { href: '/games', label: 'Games' },
    { href: '/leaderboard', label: 'Leaderboard' },
    { href: '/profile', label: 'Profile', authRequired: true }
  ]

  return (
    <header className="border-b border-card-border bg-white/80 backdrop-blur-sm sticky top-0 z-50" role="banner">
      <nav className="container mx-auto px-6 py-4" role="navigation" aria-label="Main navigation">
        <div className="flex items-center justify-between max-w-7xl mx-auto">
          <Link href="/" className="flex items-center gap-2 group" aria-label="Shak.Fun home">
            <span className="text-2xl font-medium text-foreground accent-underline">
              Shak.Fun
            </span>
          </Link>

          <div className="flex items-center gap-8">
            {navLinks.map((link) => {
              if (link.authRequired && !user) return null

              const isActive = pathname === link.href

              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={cn(
                    'font-medium transition-colors text-sm',
                    isActive
                      ? 'text-foreground'
                      : 'text-primary-light hover:text-foreground'
                  )}
                  aria-current={isActive ? 'page' : undefined}
                >
                  {link.label}
                </Link>
              )
            })}
          </div>

          <div className="flex items-center gap-3">
            {loading ? (
              <div className="w-20 h-8 bg-hover-bg animate-pulse rounded" aria-label="Loading" />
            ) : user && profile ? (
              <>
                <PointsDisplay points={profile.points} size="md" />
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={handleSignOut}
                  aria-label="Sign out of your account"
                >
                  Sign Out
                </Button>
              </>
            ) : (
              <Link href="/auth/login">
                <Button size="sm" aria-label="Sign in to your account">
                  Sign In
                </Button>
              </Link>
            )}
          </div>
        </div>
      </nav>
    </header>
  )
}
