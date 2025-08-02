import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Database types
export interface Database {
  public: {
    Tables: {
      companies: {
        Row: {
          id: string;
          name: string;
          slug: string;
          logo: string | null;
          plan: 'free' | 'pro' | 'enterprise';
          employees_count: number;
          settings: any;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          name: string;
          slug: string;
          logo?: string | null;
          plan?: 'free' | 'pro' | 'enterprise';
          employees_count?: number;
          settings?: any;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          name?: string;
          slug?: string;
          logo?: string | null;
          plan?: 'free' | 'pro' | 'enterprise';
          employees_count?: number;
          settings?: any;
          created_at?: string;
          updated_at?: string;
        };
      };
      user_profiles: {
        Row: {
          id: string;
          name: string;
          email: string;
          role: 'admin' | 'team_leader' | 'colaborador';
          company_id: string | null;
          team_id: string | null;
          avatar: string | null;
          department: string | null;
          hire_date: string | null;
          last_login: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id: string;
          name: string;
          email: string;
          role?: 'admin' | 'team_leader' | 'colaborador';
          company_id?: string | null;
          team_id?: string | null;
          avatar?: string | null;
          department?: string | null;
          hire_date?: string | null;
          last_login?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          name?: string;
          email?: string;
          role?: 'admin' | 'team_leader' | 'colaborador';
          company_id?: string | null;
          team_id?: string | null;
          avatar?: string | null;
          department?: string | null;
          hire_date?: string | null;
          last_login?: string | null;
          created_at?: string;
          updated_at?: string;
        };
      };
      trainings: {
        Row: {
          id: string;
          title: string;
          description: string | null;
          content: string | null;
          duration: number;
          company_id: string;
          category: string | null;
          difficulty: 'beginner' | 'intermediate' | 'advanced';
          modules: any;
          rating: number;
          total_ratings: number;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          title: string;
          description?: string | null;
          content?: string | null;
          duration?: number;
          company_id: string;
          category?: string | null;
          difficulty?: 'beginner' | 'intermediate' | 'advanced';
          modules?: any;
          rating?: number;
          total_ratings?: number;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          title?: string;
          description?: string | null;
          content?: string | null;
          duration?: number;
          company_id?: string;
          category?: string | null;
          difficulty?: 'beginner' | 'intermediate' | 'advanced';
          modules?: any;
          rating?: number;
          total_ratings?: number;
          created_at?: string;
          updated_at?: string;
        };
      };
      user_training_progress: {
        Row: {
          id: string;
          user_id: string;
          training_id: string;
          progress: number;
          completed_at: string | null;
          current_module: number;
          time_spent: number;
          score: number | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          training_id: string;
          progress?: number;
          completed_at?: string | null;
          current_module?: number;
          time_spent?: number;
          score?: number | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          user_id?: string;
          training_id?: string;
          progress?: number;
          completed_at?: string | null;
          current_module?: number;
          time_spent?: number;
          score?: number | null;
          created_at?: string;
          updated_at?: string;
        };
      };
      challenges: {
        Row: {
          id: string;
          title: string;
          description: string | null;
          company_id: string;
          created_by: string | null;
          deadline: string | null;
          status: 'draft' | 'active' | 'voting' | 'finished';
          category: string | null;
          prize: string | null;
          max_participants: number | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          title: string;
          description?: string | null;
          company_id: string;
          created_by?: string | null;
          deadline?: string | null;
          status?: 'draft' | 'active' | 'voting' | 'finished';
          category?: string | null;
          prize?: string | null;
          max_participants?: number | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          title?: string;
          description?: string | null;
          company_id?: string;
          created_by?: string | null;
          deadline?: string | null;
          status?: 'draft' | 'active' | 'voting' | 'finished';
          category?: string | null;
          prize?: string | null;
          max_participants?: number | null;
          created_at?: string;
          updated_at?: string;
        };
      };
      suggestions: {
        Row: {
          id: string;
          title: string;
          description: string | null;
          category: string | null;
          user_id: string;
          company_id: string;
          votes: number;
          status: 'voting' | 'under-review' | 'approved' | 'implemented' | 'rejected';
          implementation_complexity: 'low' | 'medium' | 'high';
          estimated_impact: 'low' | 'medium' | 'high';
          implemented_at: string | null;
          feedback: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          title: string;
          description?: string | null;
          category?: string | null;
          user_id: string;
          company_id: string;
          votes?: number;
          status?: 'voting' | 'under-review' | 'approved' | 'implemented' | 'rejected';
          implementation_complexity?: 'low' | 'medium' | 'high';
          estimated_impact?: 'low' | 'medium' | 'high';
          implemented_at?: string | null;
          feedback?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          title?: string;
          description?: string | null;
          category?: string | null;
          user_id?: string;
          company_id?: string;
          votes?: number;
          status?: 'voting' | 'under-review' | 'approved' | 'implemented' | 'rejected';
          implementation_complexity?: 'low' | 'medium' | 'high';
          estimated_impact?: 'low' | 'medium' | 'high';
          implemented_at?: string | null;
          feedback?: string | null;
          created_at?: string;
          updated_at?: string;
        };
      };
    };
  };
}