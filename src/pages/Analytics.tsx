import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { BarChart3, TrendingUp, Users, Target, Calendar, Download } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { DashboardLayout } from '@/components/Layout/DashboardLayout';
import { useAuth } from '@/contexts/AuthContext';
import { MockDatabase } from '@/data/mockData';

export default function Analytics() {
  const { company } = useAuth();
  const analytics = company ? MockDatabase.getAnalytics(company.id) : null;

  if (!analytics) {
    return (
      <DashboardLayout>
        <div className="flex items-center justify-center h-64">
          <p>Carregando analytics...</p>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold">Relatórios e Análises</h1>
            <p className="text-muted-foreground">Insights detalhados sobre engajamento e inovação</p>
          </div>
          <Button variant="outline">
            <Download className="mr-2 h-4 w-4" />
            Exportar Relatório
          </Button>
        </div>

        {/* KPIs Principais */}
        <div className="grid gap-6 md:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Índice de Engajamento</CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-primary">{analytics.engagement.rate}%</div>
              <p className="text-xs text-muted-foreground">{analytics.engagement.trend} vs mês anterior</p>
              <Progress value={analytics.engagement.rate} className="mt-2" />
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Participação Ativa</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-secondary">{analytics.engagement.participation_rate}%</div>
              <p className="text-xs text-muted-foreground">{analytics.users.active_last_week} de {analytics.users.total} colaboradores</p>
              <Progress value={analytics.engagement.participation_rate} className="mt-2" />
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Satisfação Geral</CardTitle>
              <Target className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-accent">{analytics.feedback.average_rating}/5</div>
              <p className="text-xs text-muted-foreground">Meta: 8.0 atingida!</p>
              <Progress value={(analytics.feedback.average_rating / 5) * 100} className="mt-2" />
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Ideias Implementadas</CardTitle>
              <BarChart3 className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{analytics.suggestions.implemented}</div>
              <p className="text-xs text-muted-foreground">de {analytics.suggestions.total} sugestões ({Math.round((analytics.suggestions.implemented / analytics.suggestions.total) * 100)}%)</p>
              <Progress value={(analytics.suggestions.implemented / analytics.suggestions.total) * 100} className="mt-2" />
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="engagement" className="space-y-4">
          <TabsList>
            <TabsTrigger value="engagement">Engajamento</TabsTrigger>
            <TabsTrigger value="innovation">Inovação</TabsTrigger>
            <TabsTrigger value="feedback">Feedback</TabsTrigger>
            <TabsTrigger value="trends">Tendências</TabsTrigger>
          </TabsList>

          <TabsContent value="engagement" className="space-y-4">
            <div className="grid gap-6 md:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle>Engajamento por Departamento</CardTitle>
                  <CardDescription>Participação em atividades nos últimos 30 dias</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {Object.entries(analytics.users.by_department).map(([dept, count]) => {
                    const percentage = Math.round((count / analytics.users.total) * 100);
                    return (
                      <div key={dept} className="space-y-2">
                        <div className="flex justify-between">
                          <span>{dept}</span>
                          <span className="font-medium">{percentage}%</span>
                        </div>
                        <Progress value={percentage} />
                      </div>
                    );
                  })}
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Evolução Mensal</CardTitle>
                  <CardDescription>Índice de engajamento nos últimos 6 meses</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Janeiro 2024</span>
                      <span className="font-medium">85%</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Dezembro 2023</span>
                      <span className="font-medium">73%</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Novembro 2023</span>
                      <span className="font-medium">68%</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Outubro 2023</span>
                      <span className="font-medium">71%</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="innovation" className="space-y-4">
            <div className="grid gap-6 md:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle>Desafios Completados</CardTitle>
                  <CardDescription>Performance nos últimos 3 meses</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-primary">{analytics.challenges.active}</div>
                    <p className="text-sm text-muted-foreground">Desafios finalizados</p>
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-sm">Taxa de participação</span>
                      <span className="font-medium">{analytics.challenges.participation_rate}%</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm">Média de submissões</span>
                      <span className="font-medium">{Math.round(analytics.challenges.total_submissions / Math.max(analytics.challenges.active, 1))}/desafio</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm">Qualidade média</span>
                      <span className="font-medium">8.5/10</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Sugestões por Categoria</CardTitle>
                  <CardDescription>Distribuição das ideias submetidas</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span>Positivo</span>
                      <span className="font-medium text-green-600">{Math.round((analytics.feedback.positive / analytics.feedback.total) * 100)}%</span>
                    </div>
                    <Progress value={(analytics.feedback.positive / analytics.feedback.total) * 100} className="[&>div]:bg-green-500" />
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span>Neutro</span>
                      <span className="font-medium text-yellow-600">{Math.round((analytics.feedback.neutral / analytics.feedback.total) * 100)}%</span>
                    </div>
                    <Progress value={(analytics.feedback.neutral / analytics.feedback.total) * 100} className="[&>div]:bg-yellow-500" />
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span>Negativo</span>
                      <span className="font-medium text-red-600">{Math.round((analytics.feedback.negative / analytics.feedback.total) * 100)}%</span>
                    </div>
                    <Progress value={(analytics.feedback.negative / analytics.feedback.total) * 100} className="[&>div]:bg-red-500" />
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="feedback" className="space-y-4">
            <div className="grid gap-6 md:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle>Volume de Feedback</CardTitle>
                  <CardDescription>Quantidade de feedbacks por tipo</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span>Feedback de Clima</span>
                      <span className="font-medium">156</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span>Feedback 360°</span>
                      <span className="font-medium">89</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span>Feedback de Tarefas</span>
                      <span className="font-medium">67</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Sentiment Analysis</CardTitle>
                  <CardDescription>Análise do tom dos feedbacks</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span>Positivo</span>
                      <span className="font-medium text-green-600">68%</span>
                    </div>
                    <Progress value={68} className="[&>div]:bg-green-500" />
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span>Neutro</span>
                      <span className="font-medium text-yellow-600">22%</span>
                    </div>
                    <Progress value={22} className="[&>div]:bg-yellow-500" />
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span>Negativo</span>
                      <span className="font-medium text-red-600">10%</span>
                    </div>
                    <Progress value={10} className="[&>div]:bg-red-500" />
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="trends" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Tendências e Insights</CardTitle>
                <CardDescription>Análises e previsões baseadas em dados</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="p-4 bg-primary/10 rounded-lg">
                    <h4 className="font-medium text-primary mb-2">Engajamento em Alta</h4>
                    <p className="text-sm text-muted-foreground">
                      O engajamento cresceu 12% este mês, principalmente devido aos novos desafios de inovação.
                    </p>
                  </div>
                  <div className="p-4 bg-secondary/10 rounded-lg">
                    <h4 className="font-medium text-secondary mb-2">Feedback Qualitativo</h4>
                    <p className="text-sm text-muted-foreground">
                      A qualidade dos feedbacks melhorou 25% com as novas diretrizes de comunicação.
                    </p>
                  </div>
                  <div className="p-4 bg-accent/10 rounded-lg">
                    <h4 className="font-medium text-accent mb-2">Ideias Implementadas</h4>
                    <p className="text-sm text-muted-foreground">
                      52% das sugestões foram implementadas, superando a meta de 40%.
                    </p>
                  </div>
                  <div className="p-4 bg-orange-100 rounded-lg">
                    <h4 className="font-medium text-orange-800 mb-2">Oportunidade de Melhoria</h4>
                    <p className="text-sm text-muted-foreground">
                      O departamento de RH pode aumentar a participação em 15% com ações direcionadas.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
}