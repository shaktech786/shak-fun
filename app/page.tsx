'use client'

import { Gamepad2 } from 'lucide-react'
import { useGames } from '@/lib/hooks/useGames'
import { GameCard } from '@/components/games/GameCard'
import { LoadingSpinner } from '@/components/ui/LoadingSpinner'
import { EmptyState } from '@/components/ui/EmptyState'

export default function Home() {
  const { games, loading, error } = useGames()

  if (loading) {
    return (
      <div className="container mx-auto px-6 py-12">
        <LoadingSpinner />
      </div>
    )
  }

  if (error) {
    return (
      <div className="container mx-auto px-6 py-12">
        <EmptyState
          icon={<Gamepad2 size={32} />}
          title="Something went wrong"
          description="Unable to load games. Please try again later."
        />
      </div>
    )
  }

  return (
    <div className="container mx-auto px-6 py-12 max-w-6xl">
      <div className="mb-12 animate-fade">
        <h1 className="text-4xl md:text-5xl font-semibold text-foreground mb-3">
          Shak.Fun
        </h1>
        <p className="text-lg text-primary-light">
          Thoughtful games to play at your own pace.
        </p>
      </div>

      {games.length === 0 ? (
        <EmptyState
          icon={<Gamepad2 size={32} />}
          title="Games coming soon"
          description="We're building creative experiences for you. Check back soon!"
        />
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {games.map((game) => (
            <GameCard key={game.id} game={game} />
          ))}
        </div>
      )}
    </div>
  )
}
