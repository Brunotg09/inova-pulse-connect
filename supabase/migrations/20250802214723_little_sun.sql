/*
  # Seed Data for InovaPulse

  1. Sample Companies
    - InovaTech Solutions (Enterprise)
    - TechCorp Brasil (Pro)
    - Demo Company (Free)

  2. Sample Users
    - Admin, Team Leaders, and Collaborators for each company

  3. Sample Content
    - Trainings, Challenges, Surveys for demonstration
*/

-- Insert sample companies
INSERT INTO companies (id, name, slug, logo, plan, employees_count, settings) VALUES
  ('550e8400-e29b-41d4-a716-446655440001', 'InovaTech Solutions', 'inovatech', '🚀', 'enterprise', 120, '{"primary_color": "#3B82F6", "secondary_color": "#8B5CF6", "timezone": "America/Sao_Paulo", "language": "pt-BR"}'),
  ('550e8400-e29b-41d4-a716-446655440002', 'TechCorp Brasil', 'techcorp', '⚡', 'pro', 85, '{"primary_color": "#6366F1", "secondary_color": "#EC4899", "timezone": "America/Sao_Paulo", "language": "pt-BR"}'),
  ('550e8400-e29b-41d4-a716-446655440003', 'Demo Company', 'demo', '🎯', 'free', 25, '{"primary_color": "#6B7280", "secondary_color": "#64748B", "timezone": "America/Sao_Paulo", "language": "pt-BR"}');

-- Insert sample teams
INSERT INTO teams (id, name, company_id, description) VALUES
  ('550e8400-e29b-41d4-a716-446655440011', 'Equipe de Desenvolvimento', '550e8400-e29b-41d4-a716-446655440001', 'Equipe responsável pelo desenvolvimento de produtos'),
  ('550e8400-e29b-41d4-a716-446655440012', 'Equipe de Marketing', '550e8400-e29b-41d4-a716-446655440001', 'Equipe de marketing e comunicação'),
  ('550e8400-e29b-41d4-a716-446655440013', 'Equipe de Vendas', '550e8400-e29b-41d4-a716-446655440002', 'Equipe focada em vendas e relacionamento com clientes');

-- Insert sample trainings
INSERT INTO trainings (id, title, description, content, duration, company_id, category, difficulty, modules, rating, total_ratings) VALUES
  ('550e8400-e29b-41d4-a716-446655440021', 'Fundamentos da Inovação', 'Aprenda os conceitos básicos de inovação e criatividade no ambiente corporativo', 'Conteúdo completo sobre inovação...', 45, '550e8400-e29b-41d4-a716-446655440001', 'Inovação', 'beginner', '[{"id": "1", "title": "Introdução à Inovação", "content": "O que é inovação e por que é importante", "duration": 15, "order": 1, "type": "video"}, {"id": "2", "title": "Tipos de Inovação", "content": "Diferentes tipos e categorias de inovação", "duration": 20, "order": 2, "type": "text"}, {"id": "3", "title": "Quiz - Fundamentos", "content": "Teste seus conhecimentos", "duration": 10, "order": 3, "type": "quiz"}]', 4.8, 24),
  ('550e8400-e29b-41d4-a716-446655440022', 'Liderança Criativa', 'Desenvolva suas habilidades de liderança para inspirar inovação na sua equipe', 'Conteúdo sobre liderança criativa...', 60, '550e8400-e29b-41d4-a716-446655440001', 'Liderança', 'intermediate', '[{"id": "4", "title": "Princípios da Liderança Criativa", "content": "Fundamentos da liderança que inspira criatividade", "duration": 25, "order": 1, "type": "video"}, {"id": "5", "title": "Técnicas de Motivação", "content": "Como motivar equipes para inovar", "duration": 25, "order": 2, "type": "interactive"}, {"id": "6", "title": "Avaliação Final", "content": "Avaliação dos conhecimentos adquiridos", "duration": 10, "order": 3, "type": "quiz"}]', 4.9, 18);

-- Insert sample challenges
INSERT INTO challenges (id, title, description, company_id, deadline, status, category, prize) VALUES
  ('550e8400-e29b-41d4-a716-446655440031', 'Inovação Verde', 'Proponha soluções sustentáveis para reduzir o impacto ambiental da empresa', '550e8400-e29b-41d4-a716-446655440001', '2024-02-15', 'active', 'Sustentabilidade', '500 pontos + R$ 1000'),
  ('550e8400-e29b-41d4-a716-446655440032', 'App de Produtividade', 'Crie um conceito de aplicativo para melhorar a produtividade da equipe', '550e8400-e29b-41d4-a716-446655440001', '2024-02-10', 'voting', 'Tecnologia', '750 pontos + Curso Premium');

-- Insert sample surveys
INSERT INTO surveys (id, title, description, company_id, questions, deadline, status, type, anonymous) VALUES
  ('550e8400-e29b-41d4-a716-446655440041', 'Pesquisa de Clima - Janeiro 2024', 'Avalie sua satisfação com o ambiente de trabalho este mês', '550e8400-e29b-41d4-a716-446655440001', '[{"id": "1", "question": "Como você avalia o ambiente de trabalho?", "type": "rating", "required": true, "order": 1}, {"id": "2", "question": "Você se sente motivado no trabalho?", "type": "multiple_choice", "options": ["Muito motivado", "Motivado", "Neutro", "Desmotivado", "Muito desmotivado"], "required": true, "order": 2}, {"id": "3", "question": "Sugestões para melhorar o ambiente:", "type": "text", "required": false, "order": 3}]', '2024-02-15', 'active', 'clima', true);