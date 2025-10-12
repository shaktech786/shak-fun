'use client'

import { Trophy, Gamepad2, Calendar, Award } from 'lucide-react'
import { useAuth } from '@/lib/hooks/useAuth'
import { Card } from '@/components/ui/Card'
import { PointsDisplay } from '@/components/ui/PointsDisplay'
import { LoadingSpinner } from '@/components/ui/LoadingSpinner'
import { Button } from '@/components/ui/Button'
import { format } from 'date-fns'

export default function ProfilePage() {
  const { user, profile, loading } = useAuth()

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-12">
        <LoadingSpinner />
      </div>
    )
  }

  if (!user || !profile) {
    return (
      <div className="container mx-auto px-4 py-12">
        <Card>
          <p className="text-center">Please log in to view your profile</p>
        </Card>
      </div>
    )
  }

  const stats = [
    {
      icon: <Trophy size={24} />,
      label: 'Total Points',
      value: <PointsDisplay points={profile.points} size="lg" />
    },
    {
      icon: <Gamepad2 size={24} />,
      label: 'Games Played',
      value: profile.total_games_played
    },
    {
      icon: <Calendar size={24} />,
      label: 'Member Since',
      value: format(new Date(profile.created_at), 'MMM yyyy')
    },
    {
      icon: <Award size={24} />,
      label: 'Achievements',
      value: 0
    }
  ]

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-4xl mx-auto space-y-8">
        {/* Profile Header */}
        <Card className="animate-slide-in">
          <div className="flex flex-col md:flex-row items-center gap-6">
            <div className="w-24 h-24 bg-gradient-to-br from-primary to-accent rounded-full flex items-center justify-center text-white text-3xl font-bold retro-shadow">
              {profile.username[0].toUpperCase()}
            </div>

            <div className="flex-1 text-center md:text-left">
              <h1 className="text-3xl font-bold text-foreground mb-2">
                {profile.username}
              </h1>
              <p className="text-foreground/70">{profile.email}</p>
            </div>

            <Button variant="ghost">
              Edit Profile
            </Button>
          </div>
        </Card>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {stats.map((stat, index) => (
            <Card key={index}>
              <div className="text-center space-y-3">
                <div className="w-12 h-12 bg-card-border rounded-lg flex items-center justify-center mx-auto text-primary">
                  {stat.icon}
                </div>
                <div>
                  <p className="text-2xl font-bold text-foreground">
                    {stat.value}
                  </p>
                  <p className="text-sm text-foreground/70">{stat.label}</p>
                </div>
              </div>
            </Card>
          ))}
        </div>

        {/* Recent Activity */}
        <Card>
          <h2 className="text-2xl font-bold text-foreground mb-4">
            Recent Activity
          </h2>
          <div className="text-center py-8 text-foreground/70">
            <Gamepad2 size={48} className="mx-auto mb-4 opacity-50" />
            <p>No recent activity yet. Start playing games to see your history!</p>
          </div>
        </Card>

        {/* Achievements */}
        <Card>
          <h2 className="text-2xl font-bold text-foreground mb-4">
            Achievements
          </h2>
          <div className="text-center py-8 text-foreground/70">
            <Award size={48} className="mx-auto mb-4 opacity-50" />
            <p>Play games to unlock achievements and earn bonus points!</p>
          </div>
        </Card>
      </div>
    </div>
  )
}
