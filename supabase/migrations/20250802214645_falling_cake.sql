/*
  # Initial Schema for InovaPulse

  1. New Tables
    - `companies` - Company information and settings
    - `users` - User profiles with roles and company association
    - `teams` - Team structure and hierarchy
    - `trainings` - Training content and metadata
    - `user_training_progress` - Individual training progress tracking
    - `challenges` - Innovation challenges and competitions
    - `challenge_submissions` - User submissions for challenges
    - `suggestions` - Employee suggestions and ideas
    - `feedbacks` - Feedback system (360°, climate, etc.)
    - `surveys` - Survey definitions and questions
    - `survey_responses` - Individual survey responses

  2. Security
    - Enable RLS on all tables
    - Add policies for company data isolation
    - User authentication through Supabase Auth
*/

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Companies table
CREATE TABLE IF NOT EXISTS companies (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  name text NOT NULL,
  slug text UNIQUE NOT NULL,
  logo text,
  plan text NOT NULL DEFAULT 'free' CHECK (plan IN ('free', 'pro', 'enterprise')),
  employees_count integer DEFAULT 0,
  settings jsonb DEFAULT '{}',
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE companies ENABLE ROW LEVEL SECURITY;

-- Users table (extends Supabase auth.users)
CREATE TABLE IF NOT EXISTS user_profiles (
  id uuid PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  name text NOT NULL,
  email text NOT NULL,
  role text NOT NULL DEFAULT 'colaborador' CHECK (role IN ('admin', 'team_leader', 'colaborador')),
  company_id uuid REFERENCES companies(id) ON DELETE CASCADE,
  team_id uuid,
  avatar text,
  department text,
  hire_date date,
  last_login timestamptz,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE user_profiles ENABLE ROW LEVEL SECURITY;

-- Teams table
CREATE TABLE IF NOT EXISTS teams (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  name text NOT NULL,
  company_id uuid REFERENCES companies(id) ON DELETE CASCADE,
  leader_id uuid REFERENCES user_profiles(id),
  description text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE teams ENABLE ROW LEVEL SECURITY;

-- Add team_id foreign key to user_profiles
ALTER TABLE user_profiles ADD CONSTRAINT fk_user_team 
  FOREIGN KEY (team_id) REFERENCES teams(id);

-- Trainings table
CREATE TABLE IF NOT EXISTS trainings (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  title text NOT NULL,
  description text,
  content text,
  duration integer DEFAULT 0, -- in minutes
  company_id uuid REFERENCES companies(id) ON DELETE CASCADE,
  category text,
  difficulty text DEFAULT 'beginner' CHECK (difficulty IN ('beginner', 'intermediate', 'advanced')),
  modules jsonb DEFAULT '[]',
  rating numeric(2,1) DEFAULT 0,
  total_ratings integer DEFAULT 0,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE trainings ENABLE ROW LEVEL SECURITY;

-- User training progress table
CREATE TABLE IF NOT EXISTS user_training_progress (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id uuid REFERENCES user_profiles(id) ON DELETE CASCADE,
  training_id uuid REFERENCES trainings(id) ON DELETE CASCADE,
  progress integer DEFAULT 0 CHECK (progress >= 0 AND progress <= 100),
  completed_at timestamptz,
  current_module integer DEFAULT 0,
  time_spent integer DEFAULT 0, -- in minutes
  score integer,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  UNIQUE(user_id, training_id)
);

ALTER TABLE user_training_progress ENABLE ROW LEVEL SECURITY;

-- Challenges table
CREATE TABLE IF NOT EXISTS challenges (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  title text NOT NULL,
  description text,
  company_id uuid REFERENCES companies(id) ON DELETE CASCADE,
  created_by uuid REFERENCES user_profiles(id),
  deadline timestamptz,
  status text DEFAULT 'draft' CHECK (status IN ('draft', 'active', 'voting', 'finished')),
  category text,
  prize text,
  max_participants integer,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE challenges ENABLE ROW LEVEL SECURITY;

-- Challenge submissions table
CREATE TABLE IF NOT EXISTS challenge_submissions (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  challenge_id uuid REFERENCES challenges(id) ON DELETE CASCADE,
  user_id uuid REFERENCES user_profiles(id) ON DELETE CASCADE,
  title text NOT NULL,
  description text,
  files jsonb DEFAULT '[]',
  votes integer DEFAULT 0,
  team_submission boolean DEFAULT false,
  team_members jsonb DEFAULT '[]',
  submitted_at timestamptz DEFAULT now(),
  UNIQUE(challenge_id, user_id)
);

ALTER TABLE challenge_submissions ENABLE ROW LEVEL SECURITY;

-- Suggestions table
CREATE TABLE IF NOT EXISTS suggestions (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  title text NOT NULL,
  description text,
  category text,
  user_id uuid REFERENCES user_profiles(id) ON DELETE CASCADE,
  company_id uuid REFERENCES companies(id) ON DELETE CASCADE,
  votes integer DEFAULT 0,
  status text DEFAULT 'voting' CHECK (status IN ('voting', 'under-review', 'approved', 'implemented', 'rejected')),
  implementation_complexity text DEFAULT 'medium' CHECK (implementation_complexity IN ('low', 'medium', 'high')),
  estimated_impact text DEFAULT 'medium' CHECK (estimated_impact IN ('low', 'medium', 'high')),
  implemented_at timestamptz,
  feedback text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE suggestions ENABLE ROW LEVEL SECURITY;

-- Suggestion votes table
CREATE TABLE IF NOT EXISTS suggestion_votes (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  suggestion_id uuid REFERENCES suggestions(id) ON DELETE CASCADE,
  user_id uuid REFERENCES user_profiles(id) ON DELETE CASCADE,
  created_at timestamptz DEFAULT now(),
  UNIQUE(suggestion_id, user_id)
);

ALTER TABLE suggestion_votes ENABLE ROW LEVEL SECURITY;

-- Feedbacks table
CREATE TABLE IF NOT EXISTS feedbacks (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  type text NOT NULL CHECK (type IN ('clima', '360', 'tarefa', 'reconhecimento')),
  content text NOT NULL,
  from_user_id uuid REFERENCES user_profiles(id) ON DELETE CASCADE,
  to_user_id uuid REFERENCES user_profiles(id),
  company_id uuid REFERENCES companies(id) ON DELETE CASCADE,
  rating integer CHECK (rating >= 1 AND rating <= 5),
  mood text CHECK (mood IN ('positive', 'neutral', 'negative')),
  category text,
  anonymous boolean DEFAULT false,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE feedbacks ENABLE ROW LEVEL SECURITY;

-- Surveys table
CREATE TABLE IF NOT EXISTS surveys (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  title text NOT NULL,
  description text,
  company_id uuid REFERENCES companies(id) ON DELETE CASCADE,
  created_by uuid REFERENCES user_profiles(id),
  questions jsonb NOT NULL DEFAULT '[]',
  deadline timestamptz,
  status text DEFAULT 'draft' CHECK (status IN ('draft', 'active', 'closed')),
  type text DEFAULT 'custom' CHECK (type IN ('clima', 'pulse', 'custom')),
  anonymous boolean DEFAULT true,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE surveys ENABLE ROW LEVEL SECURITY;

-- Survey responses table
CREATE TABLE IF NOT EXISTS survey_responses (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  survey_id uuid REFERENCES surveys(id) ON DELETE CASCADE,
  user_id uuid REFERENCES user_profiles(id) ON DELETE CASCADE,
  responses jsonb NOT NULL DEFAULT '{}',
  submitted_at timestamptz DEFAULT now(),
  UNIQUE(survey_id, user_id)
);

ALTER TABLE survey_responses ENABLE ROW LEVEL SECURITY;

-- RLS Policies

-- Companies policies
CREATE POLICY "Users can view their company" ON companies
  FOR SELECT TO authenticated
  USING (id IN (
    SELECT company_id FROM user_profiles WHERE id = auth.uid()
  ));

-- User profiles policies
CREATE POLICY "Users can view profiles in their company" ON user_profiles
  FOR SELECT TO authenticated
  USING (company_id IN (
    SELECT company_id FROM user_profiles WHERE id = auth.uid()
  ));

CREATE POLICY "Users can update their own profile" ON user_profiles
  FOR UPDATE TO authenticated
  USING (id = auth.uid());

-- Teams policies
CREATE POLICY "Users can view teams in their company" ON teams
  FOR SELECT TO authenticated
  USING (company_id IN (
    SELECT company_id FROM user_profiles WHERE id = auth.uid()
  ));

-- Trainings policies
CREATE POLICY "Users can view trainings in their company" ON trainings
  FOR SELECT TO authenticated
  USING (company_id IN (
    SELECT company_id FROM user_profiles WHERE id = auth.uid()
  ));

-- Training progress policies
CREATE POLICY "Users can manage their own training progress" ON user_training_progress
  FOR ALL TO authenticated
  USING (user_id = auth.uid());

-- Challenges policies
CREATE POLICY "Users can view challenges in their company" ON challenges
  FOR SELECT TO authenticated
  USING (company_id IN (
    SELECT company_id FROM user_profiles WHERE id = auth.uid()
  ));

-- Challenge submissions policies
CREATE POLICY "Users can manage their own submissions" ON challenge_submissions
  FOR ALL TO authenticated
  USING (user_id = auth.uid());

CREATE POLICY "Users can view submissions in their company" ON challenge_submissions
  FOR SELECT TO authenticated
  USING (challenge_id IN (
    SELECT id FROM challenges WHERE company_id IN (
      SELECT company_id FROM user_profiles WHERE id = auth.uid()
    )
  ));

-- Suggestions policies
CREATE POLICY "Users can view suggestions in their company" ON suggestions
  FOR SELECT TO authenticated
  USING (company_id IN (
    SELECT company_id FROM user_profiles WHERE id = auth.uid()
  ));

CREATE POLICY "Users can create suggestions in their company" ON suggestions
  FOR INSERT TO authenticated
  WITH CHECK (
    company_id IN (
      SELECT company_id FROM user_profiles WHERE id = auth.uid()
    ) AND user_id = auth.uid()
  );

-- Suggestion votes policies
CREATE POLICY "Users can manage their own votes" ON suggestion_votes
  FOR ALL TO authenticated
  USING (user_id = auth.uid());

-- Feedbacks policies
CREATE POLICY "Users can view feedbacks in their company" ON feedbacks
  FOR SELECT TO authenticated
  USING (company_id IN (
    SELECT company_id FROM user_profiles WHERE id = auth.uid()
  ));

CREATE POLICY "Users can create feedbacks in their company" ON feedbacks
  FOR INSERT TO authenticated
  WITH CHECK (
    company_id IN (
      SELECT company_id FROM user_profiles WHERE id = auth.uid()
    ) AND from_user_id = auth.uid()
  );

-- Surveys policies
CREATE POLICY "Users can view surveys in their company" ON surveys
  FOR SELECT TO authenticated
  USING (company_id IN (
    SELECT company_id FROM user_profiles WHERE id = auth.uid()
  ));

-- Survey responses policies
CREATE POLICY "Users can manage their own survey responses" ON survey_responses
  FOR ALL TO authenticated
  USING (user_id = auth.uid());

-- Functions and triggers for updated_at
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ language 'plpgsql';

-- Add triggers for updated_at
CREATE TRIGGER update_companies_updated_at BEFORE UPDATE ON companies
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_user_profiles_updated_at BEFORE UPDATE ON user_profiles
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_teams_updated_at BEFORE UPDATE ON teams
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_trainings_updated_at BEFORE UPDATE ON trainings
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_user_training_progress_updated_at BEFORE UPDATE ON user_training_progress
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_challenges_updated_at BEFORE UPDATE ON challenges
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_suggestions_updated_at BEFORE UPDATE ON suggestions
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_surveys_updated_at BEFORE UPDATE ON surveys
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();