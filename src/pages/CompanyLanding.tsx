import { useParams, Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Building2, Users, Trophy, Lightbulb, TrendingUp, ArrowRight } from 'lucide-react';
import { supabase } from '@/lib/supabase';
import type { Database } from '@/lib/supabase';

type Company = Database['public']['Tables']['companies']['Row'];

export default function CompanyLanding() {
  const { companySlug } = useParams<{ companySlug: string }>();
  const [company, setCompany] = useState<Company | null>(null);
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    challenges_active: 0,
    suggestions_month: 0,
    engagement_rate: 0,
    innovations_implemented: 0
  });

  useEffect(() => {
    if (companySlug) {
      loadCompanyData();
    }
  }, [companySlug]);

  const loadCompanyData = async () => {
    try {
      const { data: companyData, error } = await supabase
        .from('companies')
        .select('*')
        .eq('slug', companySlug)
        .single();

      if (error) throw error;
      setCompany(companyData);

      // Load company stats
      const [challengesResult, suggestionsResult] = await Promise.all([
        supabase
          .from('challenges')
          .select('id, status')
          .eq('company_id', companyData.id),
        supabase
          .from('suggestions')
          .select('id, status, created_at')
          .eq('company_id', companyData.id)
      ]);

      const challenges = challengesResult.data || [];
      const suggestions = suggestionsResult.data || [];
      
      // Calculate stats
      const currentMonth = new Date().getMonth();
      const currentYear = new Date().getFullYear();
      
      setStats({
        challenges_active: challenges.filter(c => c.status === 'active').length,
        suggestions_month: suggestions.filter(s => {
          const createdDate = new Date(s.created_at);
          return createdDate.getMonth() === currentMonth && createdDate.getFullYear() === currentYear;
        }).length,
        engagement_rate: Math.floor(Math.random() * 20) + 80, // Mock for now
        innovations_implemented: suggestions.filter(s => s.status === 'implemented').length
      });

    } catch (error) {
      console.error('Error loading company data:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary mx-auto"></div>
          <p className="mt-4 text-xl text-gray-600">Carregando...</p>
        </div>
      </div>
    );
  }

  if (!company) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4">Empresa não encontrada</h1>
          <p className="text-xl text-gray-600 mb-4">A empresa "{companySlug}" não existe ou foi desativada.</p>
          <Link to="/" className="text-blue-500 hover:text-blue-700 underline">
            Voltar ao início
          </Link>
        </div>
      </div>
    );
  }

  const getPlanBadge = (plan: string) => {
    switch (plan) {
      case 'enterprise':
        return <Badge className="bg-purple-100 text-purple-800">Enterprise</Badge>;
      case 'pro':
        return <Badge className="bg-blue-100 text-blue-800">Pro</Badge>;
      case 'free':
        return <Badge variant="outline">Free</Badge>;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-muted/50">
      {/* Header da empresa */}
      <header className="border-b bg-background/80 backdrop-blur-md">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="w-10 h-10 bg-gradient-hero rounded-lg flex items-center justify-center text-2xl">
              {company.logo || '🏢'}
            </div>
            <div>
              <h1 className="font-bold text-xl">{company.name}</h1>
              <p className="text-sm text-muted-foreground">Transformando através da inovação</p>
            </div>
            {getPlanBadge(company.plan)}
          </div>
          
          <div className="flex items-center space-x-4">
            <Button variant="ghost" asChild>
              <Link to={`/${companySlug}/login`}>
                Login
              </Link>
            </Button>
            <Button variant="hero" asChild>
              <Link to={`/${companySlug}/register`}>
                Acessar Plataforma
              </Link>
            </Button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto text-center">
          <div className="space-y-6 max-w-4xl mx-auto">
            <div className="text-6xl mb-6">{company.logo || '🏢'}</div>
            <h1 className="text-5xl font-bold">
              Bem-vindo à{" "}
              <span className="bg-gradient-innovation bg-clip-text text-transparent">
                {company.name}
              </span>
            </h1>
            <p className="text-xl text-muted-foreground">
              Plataforma de inovação e engajamento para sua equipe
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button variant="hero" size="lg" asChild>
                <Link to={`/${companySlug}/login`}>
                  <Building2 className="mr-2 h-5 w-5" />
                  Acessar Dashboard
                </Link>
              </Button>
              <Button variant="outline" size="lg">
                <Users className="mr-2 h-5 w-5" />
                {company.employees_count} Colaboradores
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Estatísticas da empresa */}
      <section className="py-16 px-4 bg-muted/30">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">
            Resultados da {company.name}
          </h2>
          
          <div className="grid md:grid-cols-4 gap-8">
            <Card className="text-center">
              <CardHeader>
                <Trophy className="h-8 w-8 mx-auto text-primary" />
                <CardTitle className="text-2xl">{stats.challenges_active}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">Desafios Ativos</p>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardHeader>
                <Lightbulb className="h-8 w-8 mx-auto text-secondary" />
                <CardTitle className="text-2xl">{stats.suggestions_month}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">Sugestões este Mês</p>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardHeader>
                <TrendingUp className="h-8 w-8 mx-auto text-accent" />
                <CardTitle className="text-2xl">{stats.engagement_rate}%</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">Taxa de Engajamento</p>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardHeader>
                <Users className="h-8 w-8 mx-auto text-primary" />
                <CardTitle className="text-2xl">{stats.innovations_implemented}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">Inovações Implementadas</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 px-4">
        <div className="container mx-auto">
          <Card className="bg-gradient-hero border-0 text-primary-foreground max-w-4xl mx-auto">
            <CardContent className="p-12 text-center space-y-6">
              <h3 className="text-3xl font-bold">
                Faça parte da transformação!
              </h3>
              <p className="text-lg opacity-90">
                Junte-se aos {company.employees_count} colaboradores da {company.name} 
                que já estão inovando e transformando o futuro da empresa.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button variant="secondary" size="lg" asChild>
                  <Link to={`/${companySlug}/login`}>
                    Fazer Login
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Link>
                </Button>
                <Button variant="outline" size="lg" className="bg-transparent border-white text-white hover:bg-white hover:text-primary" asChild>
                  <Link to={`/${companySlug}/register`}>
                    Criar Conta
                  </Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t bg-background/80 backdrop-blur-md py-8">
        <div className="container mx-auto px-4 text-center">
          <div className="flex items-center justify-center space-x-2 mb-4">
            <div className="w-6 h-6 bg-gradient-hero rounded flex items-center justify-center">
              <span className="text-primary-foreground font-bold text-sm">🚀</span>
            </div>
            <span className="font-bold">InovaPulse</span>
          </div>
          <p className="text-sm text-muted-foreground">
            © 2024 {company.name}. Powered by InovaPulse.
          </p>
        </div>
      </footer>
    </div>
  );
}