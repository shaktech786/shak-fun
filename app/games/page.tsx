'use client'

import { Gamepad2 } from 'lucide-react'
import { useGames } from '@/lib/hooks/useGames'
import { GameCard } from '@/components/games/GameCard'
import { LoadingSpinner } from '@/components/ui/LoadingSpinner'
import { EmptyState } from '@/components/ui/EmptyState'
import { Button } from '@/components/ui/Button'

export default function GamesPage() {
  const { games, loading, error } = useGames()

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-12">
        <LoadingSpinner />
      </div>
    )
  }

  if (error) {
    return (
      <div className="container mx-auto px-4 py-12">
        <EmptyState
          icon={<Gamepad2 size={32} />}
          title="Oops! Something went wrong"
          description={error.message}
          action={
            <Button onClick={() => window.location.reload()}>
              Try Again
            </Button>
          }
        />
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="mb-8 animate-slide-in">
        <h1 className="text-4xl md:text-5xl font-bold gradient-text mb-3">
          Game Arcade
        </h1>
        <p className="text-lg text-foreground/70">
          Choose your adventure and start playing!
        </p>
      </div>

      {games.length === 0 ? (
        <EmptyState
          icon={<Gamepad2 size={32} />}
          title="No games yet"
          description="Games are coming soon! Check back later for exciting new additions."
          action={
            <Button onClick={() => window.location.href = '/'}>
              Back to Home
            </Button>
          }
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
