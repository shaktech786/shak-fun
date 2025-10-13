import { ReactNode } from 'react'
import { cn } from '@/lib/utils/cn'

interface CardProps {
  children: ReactNode
  className?: string
  hover?: boolean
}

export function Card({ children, className, hover = false }: CardProps) {
  return (
    <div
      className={cn(
        'bg-card-bg border border-card-border rounded-2xl p-6 soft-shadow pixel-texture transition-all',
        hover && 'hover-lift cursor-pointer',
        className
      )}
    >
      {children}
    </div>
  )
}
