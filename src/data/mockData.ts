// Mock Data para simular banco de dados
export interface Company {
  id: string;
  name: string;
  slug: string;
  logo: string;
  plan: 'free' | 'pro' | 'enterprise';
  employees_count: number;
  created_at: string;
  settings: {
    primary_color: string;
    secondary_color: string;
    timezone: string;
    language: string;
  };
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'team_leader' | 'colaborador';
  company_id: string;
  team_id?: string;
  avatar?: string;
  department: string;
  hire_date: string;
  last_login?: string;
}

export interface Team {
  id: string;
  name: string;
  company_id: string;
  leader_id: string;
  members: string[];
  created_at: string;
  description: string;
}

export interface Training {
  id: string;
  title: string;
  description: string;
  content: string;
  duration: number; // em minutos
  company_id: string;
  category: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  modules: TrainingModule[];
  created_at: string;
  updated_at: string;
  rating: number;
  total_ratings: number;
}

export interface TrainingModule {
  id: string;
  title: string;
  content: string;
  duration: number;
  order: number;
  type: 'video' | 'text' | 'quiz' | 'interactive';
}

export interface UserTrainingProgress {
  user_id: string;
  training_id: string;
  progress: number; // 0-100
  completed_at?: string;
  current_module: number;
  time_spent: number; // em minutos
  score?: number;
}

export interface Challenge {
  id: string;
  title: string;
  description: string;
  company_id: string;
  created_by: string;
  deadline: string;
  status: 'draft' | 'active' | 'voting' | 'finished';
  category: string;
  prize: string;
  max_participants?: number;
  created_at: string;
  updated_at: string;
}

export interface ChallengeSubmission {
  id: string;
  challenge_id: string;
  user_id: string;
  title: string;
  description: string;
  files: string[];
  votes: number;
  submitted_at: string;
  team_submission: boolean;
  team_members?: string[];
}

export interface Suggestion {
  id: string;
  title: string;
  description: string;
  category: string;
  user_id: string;
  company_id: string;
  votes: number;
  status: 'voting' | 'under-review' | 'approved' | 'implemented' | 'rejected';
  implementation_complexity: 'low' | 'medium' | 'high';
  estimated_impact: 'low' | 'medium' | 'high';
  created_at: string;
  updated_at: string;
  implemented_at?: string;
  feedback?: string;
}

export interface Feedback {
  id: string;
  type: 'clima' | '360' | 'tarefa' | 'reconhecimento';
  content: string;
  from_user_id: string;
  to_user_id?: string;
  company_id: string;
  rating?: number;
  mood: 'positive' | 'neutral' | 'negative';
  category: string;
  anonymous: boolean;
  created_at: string;
}

export interface Survey {
  id: string;
  title: string;
  description: string;
  company_id: string;
  created_by: string;
  questions: SurveyQuestion[];
  deadline: string;
  status: 'draft' | 'active' | 'closed';
  type: 'clima' | 'pulse' | 'custom';
  anonymous: boolean;
  created_at: string;
}

export interface SurveyQuestion {
  id: string;
  question: string;
  type: 'multiple_choice' | 'rating' | 'text' | 'yes_no';
  options?: string[];
  required: boolean;
  order: number;
}

export interface SurveyResponse {
  id: string;
  survey_id: string;
  user_id: string;
  responses: Record<string, any>;
  submitted_at: string;
}

// Mock Data
export const mockCompanies: Company[] = [
  {
    id: '1',
    name: 'InovaTech Solutions',
    slug: 'inovatech',
    logo: '🚀',
    plan: 'enterprise',
    employees_count: 120,
    created_at: '2024-01-01',
    settings: {
      primary_color: '#3B82F6',
      secondary_color: '#8B5CF6',
      timezone: 'America/Sao_Paulo',
      language: 'pt-BR'
    }
  },
  {
    id: '2',
    name: 'TechCorp Brasil',
    slug: 'techcorp',
    logo: '⚡',
    plan: 'pro',
    employees_count: 85,
    created_at: '2024-01-01',
    settings: {
      primary_color: '#6366F1',
      secondary_color: '#EC4899',
      timezone: 'America/Sao_Paulo',
      language: 'pt-BR'
    }
  },
  {
    id: '3',
    name: 'Demo Company',
    slug: 'demo',
    logo: '🎯',
    plan: 'free',
    employees_count: 25,
    created_at: '2024-01-01',
    settings: {
      primary_color: '#6B7280',
      secondary_color: '#64748B',
      timezone: 'America/Sao_Paulo',
      language: 'pt-BR'
    }
  }
];

export const mockUsers: User[] = [
  {
    id: '1',
    name: 'João Silva',
    email: 'joao@inovatech.com',
    role: 'admin',
    company_id: '1',
    team_id: '1',
    department: 'Tecnologia',
    hire_date: '2023-01-15',
    last_login: '2024-01-10T10:30:00Z'
  },
  {
    id: '2',
    name: 'Maria Santos',
    email: 'maria@inovatech.com',
    role: 'team_leader',
    company_id: '1',
    team_id: '1',
    department: 'Marketing',
    hire_date: '2023-03-20',
    last_login: '2024-01-10T09:15:00Z'
  },
  {
    id: '3',
    name: 'Pedro Costa',
    email: 'pedro@techcorp.com',
    role: 'colaborador',
    company_id: '2',
    team_id: '2',
    department: 'Vendas',
    hire_date: '2023-06-10',
    last_login: '2024-01-09T16:45:00Z'
  }
];

export const mockTeams: Team[] = [
  {
    id: '1',
    name: 'Equipe de Desenvolvimento',
    company_id: '1',
    leader_id: '2',
    members: ['1', '2'],
    created_at: '2024-01-01',
    description: 'Equipe responsável pelo desenvolvimento de produtos'
  },
  {
    id: '2',
    name: 'Equipe de Vendas',
    company_id: '2',
    leader_id: '3',
    members: ['3'],
    created_at: '2024-01-01',
    description: 'Equipe focada em vendas e relacionamento com clientes'
  }
];

export const mockTrainings: Training[] = [
  {
    id: '1',
    title: 'Fundamentos da Inovação',
    description: 'Aprenda os conceitos básicos de inovação e criatividade no ambiente corporativo',
    content: 'Conteúdo completo sobre inovação...',
    duration: 45,
    company_id: '1',
    category: 'Inovação',
    difficulty: 'beginner',
    rating: 4.8,
    total_ratings: 24,
    created_at: '2024-01-01',
    updated_at: '2024-01-01',
    modules: [
      {
        id: '1',
        title: 'Introdução à Inovação',
        content: 'O que é inovação e por que é importante',
        duration: 15,
        order: 1,
        type: 'video'
      },
      {
        id: '2',
        title: 'Tipos de Inovação',
        content: 'Diferentes tipos e categorias de inovação',
        duration: 20,
        order: 2,
        type: 'text'
      },
      {
        id: '3',
        title: 'Quiz - Fundamentos',
        content: 'Teste seus conhecimentos',
        duration: 10,
        order: 3,
        type: 'quiz'
      }
    ]
  },
  {
    id: '2',
    title: 'Liderança Criativa',
    description: 'Desenvolva suas habilidades de liderança para inspirar inovação na sua equipe',
    content: 'Conteúdo sobre liderança criativa...',
    duration: 60,
    company_id: '1',
    category: 'Liderança',
    difficulty: 'intermediate',
    rating: 4.9,
    total_ratings: 18,
    created_at: '2024-01-01',
    updated_at: '2024-01-01',
    modules: [
      {
        id: '4',
        title: 'Princípios da Liderança Criativa',
        content: 'Fundamentos da liderança que inspira criatividade',
        duration: 25,
        order: 1,
        type: 'video'
      },
      {
        id: '5',
        title: 'Técnicas de Motivação',
        content: 'Como motivar equipes para inovar',
        duration: 25,
        order: 2,
        type: 'interactive'
      },
      {
        id: '6',
        title: 'Avaliação Final',
        content: 'Avaliação dos conhecimentos adquiridos',
        duration: 10,
        order: 3,
        type: 'quiz'
      }
    ]
  }
];

export const mockChallenges: Challenge[] = [
  {
    id: '1',
    title: 'Inovação Verde',
    description: 'Proponha soluções sustentáveis para reduzir o impacto ambiental da empresa',
    company_id: '1',
    created_by: '1',
    deadline: '2024-01-15',
    status: 'active',
    category: 'Sustentabilidade',
    prize: '500 pontos + R$ 1000',
    max_participants: 50,
    created_at: '2024-01-01',
    updated_at: '2024-01-01'
  },
  {
    id: '2',
    title: 'App de Produtividade',
    description: 'Crie um conceito de aplicativo para melhorar a produtividade da equipe',
    company_id: '1',
    created_by: '2',
    deadline: '2024-01-10',
    status: 'voting',
    category: 'Tecnologia',
    prize: '750 pontos + Curso Premium',
    created_at: '2024-01-01',
    updated_at: '2024-01-05'
  }
];

export const mockSuggestions: Suggestion[] = [
  {
    id: '1',
    title: 'App mobile para feedback instantâneo',
    description: 'Desenvolver um aplicativo móvel que permita dar feedback em tempo real sobre reuniões, processos e ambiente de trabalho.',
    category: 'Tecnologia',
    user_id: '2',
    company_id: '1',
    votes: 23,
    status: 'under-review',
    implementation_complexity: 'medium',
    estimated_impact: 'high',
    created_at: '2024-01-10',
    updated_at: '2024-01-10'
  },
  {
    id: '2',
    title: 'Horário flexível para toda equipe',
    description: 'Implementar horário flexível de 6h às 22h, permitindo que cada colaborador escolha seu período de trabalho.',
    category: 'Cultura',
    user_id: '1',
    company_id: '1',
    votes: 45,
    status: 'approved',
    implementation_complexity: 'high',
    estimated_impact: 'high',
    created_at: '2024-01-08',
    updated_at: '2024-01-09'
  }
];

export const mockFeedbacks: Feedback[] = [
  {
    id: '1',
    type: 'clima',
    content: 'Excelente apresentação no projeto X! Muito clara e bem estruturada.',
    from_user_id: '2',
    to_user_id: '1',
    company_id: '1',
    rating: 5,
    mood: 'positive',
    category: 'Apresentação',
    anonymous: false,
    created_at: '2024-01-10'
  },
  {
    id: '2',
    type: '360',
    content: 'Poderia melhorar a comunicação em reuniões, às vezes as ideias ficam confusas.',
    from_user_id: '1',
    to_user_id: '2',
    company_id: '1',
    rating: 3,
    mood: 'neutral',
    category: 'Comunicação',
    anonymous: true,
    created_at: '2024-01-09'
  }
];

export const mockSurveys: Survey[] = [
  {
    id: '1',
    title: 'Pesquisa de Clima - Janeiro 2024',
    description: 'Avalie sua satisfação com o ambiente de trabalho este mês',
    company_id: '1',
    created_by: '1',
    deadline: '2024-01-15',
    status: 'active',
    type: 'clima',
    anonymous: true,
    created_at: '2024-01-01',
    questions: [
      {
        id: '1',
        question: 'Como você avalia o ambiente de trabalho?',
        type: 'rating',
        required: true,
        order: 1
      },
      {
        id: '2',
        question: 'Você se sente motivado no trabalho?',
        type: 'multiple_choice',
        options: ['Muito motivado', 'Motivado', 'Neutro', 'Desmotivado', 'Muito desmotivado'],
        required: true,
        order: 2
      },
      {
        id: '3',
        question: 'Sugestões para melhorar o ambiente:',
        type: 'text',
        required: false,
        order: 3
      }
    ]
  }
];

// Funções utilitárias para simular operações de banco
export class MockDatabase {
  // Companies
  static getCompanies(): Company[] {
    return mockCompanies;
  }

  static getCompanyBySlug(slug: string): Company | undefined {
    return mockCompanies.find(c => c.slug === slug);
  }

  // Users
  static getUsersByCompany(companyId: string): User[] {
    return mockUsers.filter(u => u.company_id === companyId);
  }

  static getUserByEmail(email: string): User | undefined {
    return mockUsers.find(u => u.email === email);
  }

  // Teams
  static getTeamsByCompany(companyId: string): Team[] {
    return mockTeams.filter(t => t.company_id === companyId);
  }

  // Trainings
  static getTrainingsByCompany(companyId: string): Training[] {
    return mockTrainings.filter(t => t.company_id === companyId);
  }

  static getTrainingProgress(userId: string, trainingId: string): UserTrainingProgress | undefined {
    const key = `progress_${userId}_${trainingId}`;
    const stored = localStorage.getItem(key);
    return stored ? JSON.parse(stored) : undefined;
  }

  static updateTrainingProgress(progress: UserTrainingProgress): void {
    const key = `progress_${progress.user_id}_${progress.training_id}`;
    localStorage.setItem(key, JSON.stringify(progress));
  }

  // Challenges
  static getChallengesByCompany(companyId: string): Challenge[] {
    return mockChallenges.filter(c => c.company_id === companyId);
  }

  // Suggestions
  static getSuggestionsByCompany(companyId: string): Suggestion[] {
    const stored = localStorage.getItem(`suggestions_${companyId}`);
    return stored ? JSON.parse(stored) : mockSuggestions.filter(s => s.company_id === companyId);
  }

  static saveSuggestions(companyId: string, suggestions: Suggestion[]): void {
    localStorage.setItem(`suggestions_${companyId}`, JSON.stringify(suggestions));
  }

  // Feedbacks
  static getFeedbacksByCompany(companyId: string): Feedback[] {
    return mockFeedbacks.filter(f => f.company_id === companyId);
  }

  // Surveys
  static getSurveysByCompany(companyId: string): Survey[] {
    return mockSurveys.filter(s => s.company_id === companyId);
  }

  // Analytics
  static getAnalytics(companyId: string) {
    const users = this.getUsersByCompany(companyId);
    const trainings = this.getTrainingsByCompany(companyId);
    const challenges = this.getChallengesByCompany(companyId);
    const suggestions = this.getSuggestionsByCompany(companyId);
    const feedbacks = this.getFeedbacksByCompany(companyId);

    return {
      users: {
        total: users.length,
        active_last_week: Math.floor(users.length * 0.8),
        by_department: users.reduce((acc, user) => {
          acc[user.department] = (acc[user.department] || 0) + 1;
          return acc;
        }, {} as Record<string, number>)
      },
      engagement: {
        rate: 85,
        trend: '+12%',
        participation_rate: 92
      },
      trainings: {
        total: trainings.length,
        completed: Math.floor(trainings.length * 0.6),
        in_progress: Math.floor(trainings.length * 0.3),
        average_rating: 4.7
      },
      challenges: {
        active: challenges.filter(c => c.status === 'active').length,
        total_submissions: 45,
        participation_rate: 78
      },
      suggestions: {
        total: suggestions.length,
        implemented: suggestions.filter(s => s.status === 'implemented').length,
        under_review: suggestions.filter(s => s.status === 'under-review').length,
        total_votes: suggestions.reduce((acc, s) => acc + s.votes, 0)
      },
      feedback: {
        total: feedbacks.length,
        positive: feedbacks.filter(f => f.mood === 'positive').length,
        neutral: feedbacks.filter(f => f.mood === 'neutral').length,
        negative: feedbacks.filter(f => f.mood === 'negative').length,
        average_rating: 4.2
      }
    };
  }
}