'use client'

import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils/cn'

export function Header() {
  const pathname = usePathname()

  const navLinks = [
    { href: '/', label: 'Home' },
    { href: '/about', label: 'About' }
  ]

  return (
    <header className="border-b border-card-border bg-white/80 backdrop-blur-sm sticky top-0 z-50" role="banner">
      <nav className="container mx-auto px-6 py-4" role="navigation" aria-label="Main navigation">
        <div className="flex items-center justify-between max-w-7xl mx-auto">
          <Link href="/" className="flex items-center gap-3 group" aria-label="Shak.Fun home">
            <Image
              src="/logo.png"
              alt=""
              width={32}
              height={32}
              className="pixelated transition-transform duration-200 group-hover:scale-110"
              priority
            />
            <span className="text-2xl font-medium text-foreground">
              Shak.Fun
            </span>
          </Link>

          <div className="flex items-center gap-8">
            {navLinks.map((link) => {
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

          <a
            href="https://github.com/shaktech786/shak-fun"
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-primary-light hover:text-foreground transition-colors"
            aria-label="View source code on GitHub"
          >
            GitHub
          </a>
        </div>
      </nav>
    </header>
  )
}
