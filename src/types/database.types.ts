// Supabase Database Types
// 이 파일은 추후 Supabase CLI로 자동 생성될 수 있습니다:
// npx supabase gen types typescript --local > src/types/database.types.ts

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
          email: string
          full_name: string
          avatar_url: string | null
          role: 'mentor' | 'mentee' | 'admin'
          locale: string
          created_at: string
          updated_at: string
        }
        Insert: {
          id: string
          email: string
          full_name: string
          avatar_url?: string | null
          role?: 'mentor' | 'mentee' | 'admin'
          locale?: string
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          email?: string
          full_name?: string
          avatar_url?: string | null
          role?: 'mentor' | 'mentee' | 'admin'
          locale?: string
          created_at?: string
          updated_at?: string
        }
      }
      mentor_profiles: {
        Row: {
          id: string
          user_id: string
          company: string | null
          job_title: string | null
          bio: string | null
          location: string | null
          linkedin_url: string | null
          calendar_url: string | null
          session_duration_minutes: number
          session_price_usd: number | null
          is_active: boolean
          is_approved: boolean
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          user_id: string
          company?: string | null
          job_title?: string | null
          bio?: string | null
          location?: string | null
          linkedin_url?: string | null
          calendar_url?: string | null
          session_duration_minutes?: number
          session_price_usd?: number | null
          is_active?: boolean
          is_approved?: boolean
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          company?: string | null
          job_title?: string | null
          bio?: string | null
          location?: string | null
          linkedin_url?: string | null
          calendar_url?: string | null
          session_duration_minutes?: number
          session_price_usd?: number | null
          is_active?: boolean
          is_approved?: boolean
          created_at?: string
          updated_at?: string
        }
      }
      specialties: {
        Row: {
          id: string
          name_ko: string
          name_en: string | null
          slug: string
          category: string | null
          created_at: string
        }
        Insert: {
          id?: string
          name_ko: string
          name_en?: string | null
          slug: string
          category?: string | null
          created_at?: string
        }
        Update: {
          id?: string
          name_ko?: string
          name_en?: string | null
          slug?: string
          category?: string | null
          created_at?: string
        }
      }
      donations: {
        Row: {
          id: string
          mentee_user_id: string | null
          mentor_profile_id: string | null
          amount_usd: number
          processing_fee_usd: number
          total_charged_usd: number
          currency: string
          stripe_payment_intent_id: string | null
          stripe_checkout_session_id: string | null
          status: 'pending' | 'completed' | 'failed' | 'refunded'
          donated_at: string | null
          created_at: string
        }
      }
      impact_reports: {
        Row: {
          id: string
          title: string
          content: string
          report_period: string
          total_donated_usd: number | null
          total_mentors: number | null
          total_mentees: number | null
          total_sessions: number | null
          published_at: string | null
          created_at: string
        }
      }
    }
  }
}
