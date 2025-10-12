'use client'

import { Trophy, Medal, Crown } from 'lucide-react'
import { useLeaderboard } from '@/lib/hooks/useLeaderboard'
import { Card } from '@/components/ui/Card'
import { PointsDisplay } from '@/components/ui/PointsDisplay'
import { LoadingSpinner } from '@/components/ui/LoadingSpinner'
import { EmptyState } from '@/components/ui/EmptyState'

export default function LeaderboardPage() {
  const { leaderboard, loading, error } = useLeaderboard(100)

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
          icon={<Trophy size={32} />}
          title="Error loading leaderboard"
          description={error.message}
        />
      </div>
    )
  }

  const getRankIcon = (index: number) => {
    if (index === 0) return <Crown size={24} className="text-secondary" />
    if (index === 1) return <Medal size={24} className="text-foreground/80" />
    if (index === 2) return <Medal size={24} className="text-accent" />
    return null
  }

  const getRankClass = (index: number) => {
    if (index === 0) return 'border-secondary bg-secondary/5'
    if (index === 1) return 'border-foreground/30 bg-foreground/5'
    if (index === 2) return 'border-accent bg-accent/5'
    return ''
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-4xl mx-auto space-y-8">
        <div className="text-center animate-slide-in">
          <div className="w-20 h-20 bg-gradient-to-br from-primary to-accent rounded-full flex items-center justify-center mx-auto mb-4 retro-shadow animate-float">
            <Trophy className="text-white" size={40} />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold gradient-text mb-3">
            Leaderboard
          </h1>
          <p className="text-lg text-foreground/70">
            See how you rank among other players!
          </p>
        </div>

        {leaderboard.length === 0 ? (
          <EmptyState
            icon={<Trophy size={32} />}
            title="No players yet"
            description="Be the first to join and claim the top spot!"
          />
        ) : (
          <Card>
            <div className="space-y-3">
              {leaderboard.map((player, index) => (
                <div
                  key={player.id}
                  className={`flex items-center gap-4 p-4 rounded-lg border-2 transition-all ${
                    getRankClass(index) || 'border-transparent hover:border-card-border'
                  }`}
                >
                  <div className="w-12 text-center">
                    {getRankIcon(index) || (
                      <span className="text-xl font-bold text-foreground/50">
                        #{index + 1}
                      </span>
                    )}
                  </div>

                  <div className="w-12 h-12 bg-gradient-to-br from-primary to-accent rounded-full flex items-center justify-center text-white font-bold retro-shadow">
                    {player.username[0].toUpperCase()}
                  </div>

                  <div className="flex-1">
                    <p className="font-bold text-foreground">
                      {player.username}
                    </p>
                    <p className="text-sm text-foreground/60">
                      {player.total_games_played} games played
                    </p>
                  </div>

                  <div className="text-right">
                    <PointsDisplay points={player.points} size="lg" />
                  </div>
                </div>
              ))}
            </div>
          </Card>
        )}
      </div>
    </div>
  )
}
