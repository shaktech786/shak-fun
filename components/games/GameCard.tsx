import Link from 'next/link'
import { Card } from '@/components/ui/Card'
import { Badge } from '@/components/ui/Badge'
import { Game } from '@/types/database'
import { Users, Sparkles } from 'lucide-react'

interface GameCardProps {
  game: Game
}

export function GameCard({ game }: GameCardProps) {
  const difficultyColors = {
    easy: 'success' as const,
    medium: 'warning' as const,
    hard: 'danger' as const
  }

  return (
    <Link href={`/games/${game.slug}`}>
      <Card hover className="h-full">
        <div className="aspect-video bg-hover-bg rounded-xl mb-4 overflow-hidden">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={game.thumbnail_url}
            alt={game.title}
            className="w-full h-full object-cover"
          />
        </div>

        <div className="space-y-3">
          <div className="flex items-start justify-between gap-2">
            <h3 className="font-semibold text-base text-foreground line-clamp-1">
              {game.title}
            </h3>
            <Badge variant={difficultyColors[game.difficulty]}>
              {game.difficulty}
            </Badge>
          </div>

          <p className="text-primary-light text-sm line-clamp-2 leading-relaxed">
            {game.description}
          </p>

          <div className="flex items-center justify-between pt-2 border-t border-card-border">
            <div className="flex items-center gap-3 text-xs text-primary-light">
              <div className="flex items-center gap-1">
                <Users size={14} />
                <span>{game.play_count}</span>
              </div>
            </div>

            <div className="flex items-center gap-1 text-xs font-medium text-accent">
              <Sparkles size={14} />
              <span>+{game.points_reward}</span>
            </div>
          </div>
        </div>
      </Card>
    </Link>
  )
}
