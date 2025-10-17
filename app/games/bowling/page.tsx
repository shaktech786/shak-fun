import type { Metadata } from 'next'
import WatermelonBowling from '@/components/games/WatermelonBowling'

export const metadata: Metadata = {
  title: 'Watermelon Bowling | VeryGoodMelon.Fun',
  description: 'Bowl strikes with a watermelon! A relaxing, old-school flash-style bowling game with smooth physics and satisfying animations.'
}

export default function BowlingPage() {
  return (
    <div className="container mx-auto px-6 py-12 max-w-6xl">
      <div className="animate-fade">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-semibold mb-3 text-foreground">
            Watermelon Bowling
          </h1>
          <p className="text-lg text-foreground/70 max-w-2xl mx-auto">
            Roll a watermelon down the lane and knock down all the pins! Smooth physics, satisfying strikes.
          </p>
        </div>

        <WatermelonBowling />

        <div className="mt-12 text-center">
          <a
            href="/games"
            className="inline-block px-6 py-3 bg-primary text-white rounded-lg font-medium hover:bg-primary/90 transition-colors"
          >
            ← Back to Games
          </a>
        </div>
      </div>
    </div>
  )
}
