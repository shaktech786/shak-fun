import Link from 'next/link'
import Image from 'next/image'
import { ArrowRight, Sparkles, Heart } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { Card } from '@/components/ui/Card'

export default function Home() {
  return (
    <div className="container mx-auto px-6 max-w-6xl">
      {/* Hero Section */}
      <section className="text-center py-20 md:py-32 animate-fade relative">
        {/* Subtle decorative pixel element */}
        <div className="absolute top-8 right-8 opacity-10 pointer-events-none hidden md:block">
          <Image
            src="/logo.svg"
            alt=""
            width={80}
            height={80}
            className="pixelated"
            aria-hidden="true"
          />
        </div>

        <h1 className="text-5xl md:text-7xl font-semibold text-foreground leading-tight mb-6">
          Play thoughtful games,<br />completely free
        </h1>
        <p className="text-xl md:text-2xl text-primary-light max-w-2xl mx-auto mb-10 leading-relaxed">
          A relaxing collection of creative games. No ads, no accounts, no distractions.
        </p>

        <div className="flex justify-center">
          <Link href="/games">
            <Button size="lg">
              Browse Games
              <ArrowRight className="ml-2" size={18} />
            </Button>
          </Link>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-16 grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
        <Card className="text-center">
          <div className="flex flex-col items-center space-y-4">
            <div className="w-12 h-12 bg-accent-soft rounded-full flex items-center justify-center">
              <Sparkles className="text-accent" size={24} />
            </div>
            <h3 className="text-lg font-semibold text-foreground">
              Thoughtful Design
            </h3>
            <p className="text-primary-light text-sm leading-relaxed">
              Each game is crafted to be engaging without being addictive. Play mindfully.
            </p>
          </div>
        </Card>

        <Card className="text-center">
          <div className="flex flex-col items-center space-y-4">
            <div className="w-12 h-12 bg-accent-soft rounded-full flex items-center justify-center">
              <Heart className="text-accent" size={24} />
            </div>
            <h3 className="text-lg font-semibold text-foreground">
              Made with Purpose
            </h3>
            <p className="text-primary-light text-sm leading-relaxed">
              Every pixel has meaning. Games that bring joy while staying thoughtful.
            </p>
          </div>
        </Card>
      </section>

      {/* CTA Section */}
      <section className="py-20 text-center">
        <Card className="bg-accent-soft/30 border-accent/20">
          <div className="py-8 space-y-6">
            <h2 className="text-3xl md:text-4xl font-semibold text-foreground">
              More games coming soon
            </h2>
            <p className="text-lg text-primary-light max-w-xl mx-auto">
              This is just the beginning. Check back often for new creative experiences.
            </p>
          </div>
        </Card>
      </section>

      {/* Simple Stats */}
      <section className="py-16 pb-24">
        <div className="grid grid-cols-2 gap-8 text-center max-w-md mx-auto">
          <div>
            <p className="text-4xl font-semibold text-foreground mb-2">0</p>
            <p className="text-sm text-primary-light">Games Available</p>
          </div>
          <div>
            <p className="text-4xl font-semibold text-foreground mb-2">100%</p>
            <p className="text-sm text-primary-light">Free Forever</p>
          </div>
        </div>
      </section>
    </div>
  )
}
