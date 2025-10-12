import { ReactNode } from 'react'
import { cn } from '@/lib/utils/cn'

interface BadgeProps {
  children: ReactNode
  variant?: 'default' | 'success' | 'warning' | 'danger' | 'info'
  className?: string
}

export function Badge({ children, variant = 'default', className }: BadgeProps) {
  const variants = {
    default: 'bg-hover-bg text-primary border border-card-border',
    success: 'bg-success/10 text-success border border-success/20',
    warning: 'bg-warm/10 text-warm border border-warm/20',
    danger: 'bg-danger/10 text-danger border border-danger/20',
    info: 'bg-accent-soft text-accent border border-accent/20'
  }

  return (
    <span
      className={cn(
        'inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium',
        variants[variant],
        className
      )}
    >
      {children}
    </span>
  )
}
