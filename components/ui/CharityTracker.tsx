'use client'

import { Heart } from 'lucide-react'
import { Card } from './Card'

export function CharityTracker() {
  const charityPercentage = parseInt(
    process.env.NEXT_PUBLIC_CHARITY_PERCENTAGE || '100'
  )

  return (
    <Card className="bg-gradient-to-br from-accent/10 to-primary/10 border-accent/30">
      <div className="flex items-center gap-4">
        <div className="w-12 h-12 bg-gradient-to-br from-accent to-primary rounded-lg flex items-center justify-center animate-pulse-glow">
          <Heart className="text-white" fill="white" size={24} />
        </div>

        <div className="flex-1">
          <h3 className="font-bold text-lg text-foreground mb-1">
            Playing for Good
          </h3>
          <p className="text-foreground/70 text-sm">
            {charityPercentage}% of proceeds go to charity. Have fun while making a difference!
          </p>
        </div>
      </div>
    </Card>
  )
}
