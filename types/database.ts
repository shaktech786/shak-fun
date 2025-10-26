export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "13.0.5"
  }
  public: {
    Tables: {
      achievements: {
        Row: {
          created_at: string | null
          description: string
          icon_url: string
          id: string
          points_reward: number | null
          requirement_type: string
          requirement_value: number
          title: string
        }
        Insert: {
          created_at?: string | null
          description: string
          icon_url: string
          id?: string
          points_reward?: number | null
          requirement_type: string
          requirement_value: number
          title: string
        }
        Update: {
          created_at?: string | null
          description?: string
          icon_url?: string
          id?: string
          points_reward?: number | null
          requirement_type?: string
          requirement_value?: number
          title?: string
        }
        Relationships: []
      }
      games: {
        Row: {
          average_score: number | null
          category: string
          created_at: string | null
          description: string
          difficulty: string | null
          id: string
          is_active: boolean | null
          play_count: number | null
          points_reward: number | null
          points_to_play: number | null
          slug: string
          thumbnail_url: string
          title: string
          updated_at: string | null
        }
        Insert: {
          average_score?: number | null
          category: string
          created_at?: string | null
          description: string
          difficulty?: string | null
          id?: string
          is_active?: boolean | null
          play_count?: number | null
          points_reward?: number | null
          points_to_play?: number | null
          slug: string
          thumbnail_url: string
          title: string
          updated_at?: string | null
        }
        Update: {
          average_score?: number | null
          category?: string
          created_at?: string | null
          description?: string
          difficulty?: string | null
          id?: string
          is_active?: boolean | null
          play_count?: number | null
          points_reward?: number | null
          points_to_play?: number | null
          slug?: string
          thumbnail_url?: string
          title?: string
          updated_at?: string | null
        }
        Relationships: []
      }
      hard_choices_votes: {
        Row: {
          choice: string
          created_at: string | null
          dilemma_id: string
          id: string
        }
        Insert: {
          choice: string
          created_at?: string | null
          dilemma_id: string
          id?: string
        }
        Update: {
          choice?: string
          created_at?: string | null
          dilemma_id?: string
          id?: string
        }
        Relationships: []
      }
      hope_daily_submissions: {
        Row: {
          commentary: string
          created_at: string | null
          id: string
          word_id: string
        }
        Insert: {
          commentary: string
          created_at?: string | null
          id?: string
          word_id: string
        }
        Update: {
          commentary?: string
          created_at?: string | null
          id?: string
          word_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "hope_daily_submissions_word_id_fkey"
            columns: ["word_id"]
            isOneToOne: false
            referencedRelation: "hope_daily_words"
            referencedColumns: ["id"]
          },
        ]
      }
      hope_daily_words: {
        Row: {
          created_at: string | null
          date: string
          id: string
          word: string
        }
        Insert: {
          created_at?: string | null
          date: string
          id?: string
          word: string
        }
        Update: {
          created_at?: string | null
          date?: string
          id?: string
          word?: string
        }
        Relationships: []
      }
      profiles: {
        Row: {
          avatar_url: string | null
          created_at: string | null
          email: string
          id: string
          last_login: string | null
          points: number | null
          total_games_played: number | null
          updated_at: string | null
          username: string
        }
        Insert: {
          avatar_url?: string | null
          created_at?: string | null
          email: string
          id: string
          last_login?: string | null
          points?: number | null
          total_games_played?: number | null
          updated_at?: string | null
          username: string
        }
        Update: {
          avatar_url?: string | null
          created_at?: string | null
          email?: string
          id?: string
          last_login?: string | null
          points?: number | null
          total_games_played?: number | null
          updated_at?: string | null
          username?: string
        }
        Relationships: []
      }
      scores: {
        Row: {
          completed_at: string | null
          created_at: string | null
          game_id: string
          id: string
          points_earned: number | null
          score: number
          user_id: string
        }
        Insert: {
          completed_at?: string | null
          created_at?: string | null
          game_id: string
          id?: string
          points_earned?: number | null
          score: number
          user_id: string
        }
        Update: {
          completed_at?: string | null
          created_at?: string | null
          game_id?: string
          id?: string
          points_earned?: number | null
          score?: number
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "scores_game_id_fkey"
            columns: ["game_id"]
            isOneToOne: false
            referencedRelation: "games"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "scores_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      site_visits: {
        Row: {
          id: string
          visited_at: string | null
        }
        Insert: {
          id?: string
          visited_at?: string | null
        }
        Update: {
          id?: string
          visited_at?: string | null
        }
        Relationships: []
      }
      thinkers: {
        Row: {
          avatar_url: string | null
          bio: string
          conversation_style: string
          core_beliefs: Json
          created_at: string | null
          culture: string
          era: string
          field: string
          id: string
          name: string
          opening_line: string
          updated_at: string | null
        }
        Insert: {
          avatar_url?: string | null
          bio: string
          conversation_style: string
          core_beliefs?: Json
          created_at?: string | null
          culture: string
          era: string
          field: string
          id: string
          name: string
          opening_line: string
          updated_at?: string | null
        }
        Update: {
          avatar_url?: string | null
          bio?: string
          conversation_style?: string
          core_beliefs?: Json
          created_at?: string | null
          culture?: string
          era?: string
          field?: string
          id?: string
          name?: string
          opening_line?: string
          updated_at?: string | null
        }
        Relationships: []
      }
      timeless_minds_conversations: {
        Row: {
          created_at: string | null
          ended_at: string | null
          id: string
          message_count: number | null
          session_id: string | null
          started_at: string | null
          thinker_id: string
        }
        Insert: {
          created_at?: string | null
          ended_at?: string | null
          id?: string
          message_count?: number | null
          session_id?: string | null
          started_at?: string | null
          thinker_id: string
        }
        Update: {
          created_at?: string | null
          ended_at?: string | null
          id?: string
          message_count?: number | null
          session_id?: string | null
          started_at?: string | null
          thinker_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "timeless_minds_conversations_thinker_id_fkey"
            columns: ["thinker_id"]
            isOneToOne: false
            referencedRelation: "thinkers"
            referencedColumns: ["id"]
          },
        ]
      }
      timeless_minds_messages: {
        Row: {
          content: string
          conversation_id: string
          created_at: string | null
          id: string
          role: string
        }
        Insert: {
          content: string
          conversation_id: string
          created_at?: string | null
          id?: string
          role: string
        }
        Update: {
          content?: string
          conversation_id?: string
          created_at?: string | null
          id?: string
          role?: string
        }
        Relationships: [
          {
            foreignKeyName: "timeless_minds_messages_conversation_id_fkey"
            columns: ["conversation_id"]
            isOneToOne: false
            referencedRelation: "timeless_minds_conversations"
            referencedColumns: ["id"]
          },
        ]
      }
      user_achievements: {
        Row: {
          achievement_id: string
          id: string
          unlocked_at: string | null
          user_id: string
        }
        Insert: {
          achievement_id: string
          id?: string
          unlocked_at?: string | null
          user_id: string
        }
        Update: {
          achievement_id?: string
          id?: string
          unlocked_at?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "user_achievements_achievement_id_fkey"
            columns: ["achievement_id"]
            isOneToOne: false
            referencedRelation: "achievements"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "user_achievements_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {},
  },
} as const

// Helper type exports for common tables
export type Game = Tables<'games'>
export type Profile = Tables<'profiles'>
export type Thinker = Tables<'thinkers'>
export type HopeDailyWord = Tables<'hope_daily_words'>
export type HardChoicesVote = Tables<'hard_choices_votes'>
export type TimelessMindsConversation = Tables<'timeless_minds_conversations'>
export type TimelessMindsMessage = Tables<'timeless_minds_messages'>
