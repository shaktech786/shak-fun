import { Gamepad2 } from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'

export default function Home() {
  return (
    <div className="container mx-auto px-6 py-12 max-w-6xl">
      <div className="mb-12 animate-fade text-center">
        <h1 className="text-4xl md:text-6xl font-semibold text-foreground mb-4">
          VeryGoodMelon.Fun
        </h1>
        <p className="text-xl md:text-2xl text-primary-light mb-8">
          Thoughtful games to help you relax.
        </p>
        <p className="text-lg text-foreground/70 max-w-2xl mx-auto">
          Creative, accessible games designed to reduce anxiety. No ads, no accounts, no stress—just thoughtful experiences.
        </p>
      </div>

      <div className="max-w-4xl mx-auto">
        <h2 className="text-2xl font-semibold text-foreground mb-6 text-center">
          Available Games
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {/* Bowling Game Card */}
          <Link
            href="/games/bowling"
            className="block bg-card-bg border-2 border-card-border rounded-lg overflow-hidden hover-lift transition-all group"
          >
            <div className="relative w-full aspect-square">
              <Image
                src="/games/bowling/thumbnail.png"
                alt="Watermelon Bowling Game - A watermelon rolling down a bowling lane"
                fill
                className="object-cover"
                priority
              />
            </div>
            <div className="p-6">
              <div className="mb-3">
                <h3 className="text-xl font-semibold text-foreground mb-1">
                  Watermelon Bowling
                </h3>
                <p className="text-sm text-primary-light">
                  Roll • Aim • Strike
                </p>
              </div>
              <p className="text-foreground/70 mb-4 text-sm">
                Roll a watermelon down the lane and knock down all the pins! Smooth physics, satisfying strikes, and relaxing gameplay.
              </p>
              <div className="flex items-center gap-2 text-sm text-accent font-medium group-hover:gap-3 transition-all">
                <span>Play Now</span>
                <span>→</span>
              </div>
            </div>
          </Link>

          {/* Coming Soon Card */}
          <div className="bg-card-bg border-2 border-dashed border-card-border rounded-lg p-6 opacity-60 flex flex-col justify-center items-center text-center min-h-[400px]">
            <div className="mb-6">
              <div className="w-16 h-16 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-4">
                <Gamepad2 size={32} className="text-primary" />
              </div>
              <h3 className="text-xl font-semibold text-foreground mb-2">
                More Games Coming
              </h3>
              <p className="text-sm text-primary-light mb-4">
                Stay tuned
              </p>
            </div>
            <p className="text-foreground/70 max-w-xs">
              We&apos;re building more creative experiences for you. Check back soon!
            </p>
          </div>
        </div>
      </div>

      <div className="mt-16 text-center">
        <div className="inline-block bg-accent-soft rounded-lg px-6 py-4">
          <p className="text-sm text-foreground/80 mb-2">
            <strong>Our Philosophy:</strong>
          </p>
          <p className="text-foreground/70 max-w-lg">
            Every game is designed to help you feel less anxious when leaving than when you arrived. Simple, creative, and meaningful.
          </p>
        </div>
      </div>
    </div>
  )
}
