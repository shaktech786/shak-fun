export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string
          username: string
          email: string
          avatar_url: string | null
          points: number
          total_games_played: number
          created_at: string
          updated_at: string
          last_login: string
        }
        Insert: {
          id: string
          username: string
          email: string
          avatar_url?: string | null
          points?: number
          total_games_played?: number
          created_at?: string
          updated_at?: string
          last_login?: string
        }
        Update: {
          id?: string
          username?: string
          email?: string
          avatar_url?: string | null
          points?: number
          total_games_played?: number
          created_at?: string
          updated_at?: string
          last_login?: string
        }
      }
      games: {
        Row: {
          id: string
          slug: string
          title: string
          description: string
          thumbnail_url: string
          category: string
          difficulty: 'easy' | 'medium' | 'hard'
          points_to_play: number
          points_reward: number
          is_active: boolean
          play_count: number
          average_score: number
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          slug: string
          title: string
          description: string
          thumbnail_url: string
          category: string
          difficulty?: 'easy' | 'medium' | 'hard'
          points_to_play?: number
          points_reward?: number
          is_active?: boolean
          play_count?: number
          average_score?: number
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          slug?: string
          title?: string
          description?: string
          thumbnail_url?: string
          category?: string
          difficulty?: 'easy' | 'medium' | 'hard'
          points_to_play?: number
          points_reward?: number
          is_active?: boolean
          play_count?: number
          average_score?: number
          created_at?: string
          updated_at?: string
        }
      }
      scores: {
        Row: {
          id: string
          user_id: string
          game_id: string
          score: number
          points_earned: number
          completed_at: string
          created_at: string
        }
        Insert: {
          id?: string
          user_id: string
          game_id: string
          score: number
          points_earned?: number
          completed_at?: string
          created_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          game_id?: string
          score?: number
          points_earned?: number
          completed_at?: string
          created_at?: string
        }
      }
      achievements: {
        Row: {
          id: string
          title: string
          description: string
          icon_url: string
          points_reward: number
          requirement_type: string
          requirement_value: number
          created_at: string
        }
        Insert: {
          id?: string
          title: string
          description: string
          icon_url: string
          points_reward?: number
          requirement_type: string
          requirement_value: number
          created_at?: string
        }
        Update: {
          id?: string
          title?: string
          description?: string
          icon_url?: string
          points_reward?: number
          requirement_type?: string
          requirement_value?: number
          created_at?: string
        }
      }
      user_achievements: {
        Row: {
          id: string
          user_id: string
          achievement_id: string
          unlocked_at: string
        }
        Insert: {
          id?: string
          user_id: string
          achievement_id: string
          unlocked_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          achievement_id?: string
          unlocked_at?: string
        }
      }
    }
  }
}

export type Profile = Database['public']['Tables']['profiles']['Row']
export type Game = Database['public']['Tables']['games']['Row']
export type Score = Database['public']['Tables']['scores']['Row']
export type Achievement = Database['public']['Tables']['achievements']['Row']
export type UserAchievement = Database['public']['Tables']['user_achievements']['Row']
