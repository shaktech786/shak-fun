import type { Metadata } from 'next'
import WatermelonBowling from '@/components/games/WatermelonBowling'
import { GameLayout, createGameMetadata } from '@/components/games/GameLayout'

export const metadata: Metadata = createGameMetadata(
  'Watermelon Bowling',
  'Bowl strikes with a watermelon! A relaxing, old-school flash-style bowling game with smooth physics and satisfying animations.'
)

export default function BowlingPage() {
  return (
    <GameLayout
      title="Watermelon Bowling"
      description="Roll a watermelon down the lane and knock down all the pins!"
      maxWidth="6xl"
    >
      <WatermelonBowling />
    </GameLayout>
  )
}
