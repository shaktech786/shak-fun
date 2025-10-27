'use client'

import { useState, useEffect } from 'react'
import { createClient } from '@/lib/supabase/client'
import { Game } from '@/types/database'

export function useGames() {
  const [games, setGames] = useState<Game[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<Error | null>(null)
  const supabase = createClient()

  useEffect(() => {
    const fetchGames = async () => {
      try {
        const { data, error } = await supabase
          .from('games')
          .select('*')
          .eq('is_active', true)
          .order('play_count', { ascending: false })

        if (error) throw error
        setGames(data || [])
      } catch (err) {
        setError(err as Error)
      } finally {
        setLoading(false)
      }
    }

    fetchGames()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []) // supabase client is stable, doesn't need to be in deps

  return { games, loading, error }
}

export function useGame(slug: string) {
  const [game, setGame] = useState<Game | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<Error | null>(null)
  const supabase = createClient()

  useEffect(() => {
    const fetchGame = async () => {
      try {
        const { data, error } = await supabase
          .from('games')
          .select('*')
          .eq('slug', slug)
          .single()

        if (error) throw error
        setGame(data)
      } catch (err) {
        setError(err as Error)
      } finally {
        setLoading(false)
      }
    }

    fetchGame()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [slug]) // supabase client is stable, doesn't need to be in deps

  return { game, loading, error }
}
