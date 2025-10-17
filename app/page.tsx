import { Gamepad2 } from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'

export default function Home() {
  return (
    <div className="container mx-auto px-6 py-8 max-w-4xl">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
          {/* Bowling Game Card - Balatro-style Joker Card */}
          <Link
            href="/games/bowling"
            className="block relative group"
          >
            <div className="relative overflow-hidden rounded-2xl transition-all duration-300 ease-out
                          hover:scale-105 hover:-translate-y-2 hover:rotate-1
                          hover:shadow-2xl hover:shadow-accent/20
                          transform-gpu will-change-transform">
              <Image
                src="/games/bowling/card.png"
                alt="The Striker - Watermelon Bowling Joker Card"
                width={1024}
                height={1792}
                className="w-full h-auto object-contain
                          transition-all duration-300 ease-out
                          group-hover:brightness-110"
                priority
              />
              {/* Subtle glow overlay on hover */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100
                            transition-opacity duration-300 ease-out
                            bg-gradient-to-t from-accent/10 via-transparent to-transparent
                            pointer-events-none" />

              {/* Shine effect on hover */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100
                            transition-all duration-500 ease-out
                            bg-gradient-to-br from-white/0 via-white/20 to-white/0
                            translate-x-[-100%] group-hover:translate-x-[100%]
                            pointer-events-none" />
            </div>

            {/* Play indicator that appears on hover */}
            <div className="absolute bottom-6 left-1/2 -translate-x-1/2
                          opacity-0 group-hover:opacity-100
                          transform translate-y-2 group-hover:translate-y-0
                          transition-all duration-300 ease-out
                          bg-accent text-white px-6 py-3 rounded-full
                          font-semibold text-sm shadow-lg
                          pointer-events-none">
              Play Now →
            </div>
          </Link>

          {/* Coming Soon Card */}
          <div className="bg-card-bg border-2 border-dashed border-card-border rounded-2xl p-8 opacity-60 flex flex-col justify-center items-center text-center aspect-[1024/1792]">
            <div className="mb-6">
              <div className="w-20 h-20 bg-primary/10 rounded-xl flex items-center justify-center mx-auto mb-6">
                <Gamepad2 size={40} className="text-primary" />
              </div>
              <h3 className="text-2xl font-semibold text-foreground mb-3">
                More Jokers Coming
              </h3>
              <p className="text-sm text-primary-light mb-4">
                New cards in the deck
              </p>
            </div>
            <p className="text-foreground/70 max-w-xs">
              Each game is a unique joker card. Check back soon for more creative experiences!
            </p>
          </div>
        </div>
      </div>
  )
}
