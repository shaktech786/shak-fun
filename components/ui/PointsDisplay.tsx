'use client'

import { Sparkles } from 'lucide-react'
import { formatPoints } from '@/lib/utils/points'
import { cn } from '@/lib/utils/cn'

interface PointsDisplayProps {
  points: number
  size?: 'sm' | 'md' | 'lg'
  showLabel?: boolean
}

export function PointsDisplay({ points, size = 'md', showLabel = false }: PointsDisplayProps) {
  const sizes = {
    sm: 'text-sm',
    md: 'text-sm',
    lg: 'text-base'
  }

  const iconSizes = {
    sm: 14,
    md: 16,
    lg: 18
  }

  return (
    <div className={cn('flex items-center gap-1.5 font-medium text-accent bg-accent-soft px-3 py-1.5 rounded-full', sizes[size])}>
      <Sparkles size={iconSizes[size]} />
      <span>{formatPoints(points)}</span>
      {showLabel && <span className="text-primary-light font-normal">points</span>}
    </div>
  )
}
