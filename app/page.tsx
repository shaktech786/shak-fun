import Link from 'next/link'
import { ArrowRight, Sparkles, Users, Heart } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { Card } from '@/components/ui/Card'

export default function Home() {
  return (
    <div className="container mx-auto px-6 max-w-6xl">
      {/* Hero Section */}
      <section className="text-center py-20 md:py-32 animate-fade">
        <h1 className="text-5xl md:text-7xl font-semibold text-foreground leading-tight mb-6">
          Play games,<br />support charity
        </h1>
        <p className="text-xl md:text-2xl text-primary-light max-w-2xl mx-auto mb-10 leading-relaxed">
          A collection of thoughtful games. Earn points, compete with others, and know that 100% goes to good causes.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Link href="/games">
            <Button size="lg">
              Browse Games
              <ArrowRight className="ml-2" size={18} />
            </Button>
          </Link>
          <Link href="/auth/login">
            <Button size="lg" variant="secondary">
              Sign Up Free
            </Button>
          </Link>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-16 grid grid-cols-1 md:grid-cols-3 gap-8">
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
              <Users className="text-accent" size={24} />
            </div>
            <h3 className="text-lg font-semibold text-foreground">
              Friendly Competition
            </h3>
            <p className="text-primary-light text-sm leading-relaxed">
              Track your progress, climb leaderboards, and celebrate achievements together.
            </p>
          </div>
        </Card>

        <Card className="text-center">
          <div className="flex flex-col items-center space-y-4">
            <div className="w-12 h-12 bg-accent-soft rounded-full flex items-center justify-center">
              <Heart className="text-accent" size={24} />
            </div>
            <h3 className="text-lg font-semibold text-foreground">
              Play for Good
            </h3>
            <p className="text-primary-light text-sm leading-relaxed">
              100% of proceeds support charitable causes. Have fun while making a difference.
            </p>
          </div>
        </Card>
      </section>

      {/* CTA Section */}
      <section className="py-20 text-center">
        <Card className="bg-accent-soft/30 border-accent/20">
          <div className="py-8 space-y-6">
            <h2 className="text-3xl md:text-4xl font-semibold text-foreground">
              Ready to play?
            </h2>
            <p className="text-lg text-primary-light max-w-xl mx-auto">
              Create your account and get 100 free points to start playing.
            </p>
            <Link href="/auth/login">
              <Button size="lg">
                Get Started
                <ArrowRight className="ml-2" size={18} />
              </Button>
            </Link>
          </div>
        </Card>
      </section>

      {/* Simple Stats */}
      <section className="py-16 pb-24">
        <div className="grid grid-cols-3 gap-8 text-center">
          <div>
            <p className="text-4xl font-semibold text-foreground mb-2">0</p>
            <p className="text-sm text-primary-light">Games Played</p>
          </div>
          <div>
            <p className="text-4xl font-semibold text-foreground mb-2">0</p>
            <p className="text-sm text-primary-light">Active Players</p>
          </div>
          <div>
            <p className="text-4xl font-semibold text-foreground mb-2">100%</p>
            <p className="text-sm text-primary-light">To Charity</p>
          </div>
        </div>
      </section>
    </div>
  )
}
