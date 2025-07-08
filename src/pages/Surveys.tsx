import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { UserCheck, Calendar, Users, TrendingUp, CheckCircle, Clock } from 'lucide-react';
import { DashboardLayout } from '@/components/Layout/DashboardLayout';

const surveys = {
  active: [
    {
      id: 1,
      title: 'Pesquisa de Clima - Janeiro 2024',
      description: 'Avalie sua satisfação com o ambiente de trabalho este mês',
      responses: 45,
      totalEmployees: 60,
      deadline: '2024-01-15',
      estimatedTime: '5 min',
      status: 'active'
    },
    {
      id: 2,
      title: 'Feedback sobre Home Office',
      description: 'Compartilhe sua experiência com o trabalho remoto',
      responses: 28,
      totalEmployees: 60,
      deadline: '2024-01-20',
      estimatedTime: '3 min',
      status: 'active'
    }
  ],
  completed: [
    {
      id: 3,
      title: 'Satisfação com Benefícios',
      description: 'Pesquisa sobre benefícios corporativos',
      responses: 58,
      totalEmployees: 60,
      deadline: '2024-01-05',
      estimatedTime: '7 min',
      status: 'completed',
      score: 8.2
    },
    {
      id: 4,
      title: 'Comunicação Interna',
      description: 'Como você avalia nossa comunicação interna?',
      responses: 55,
      totalEmployees: 60,
      deadline: '2023-12-20',
      estimatedTime: '4 min',
      status: 'completed',
      score: 7.8
    }
  ]
};

const pulseData = [
  { week: 'Semana 1', mood: 85, participation: 92 },
  { week: 'Semana 2', mood: 78, participation: 88 },
  { week: 'Semana 3', mood: 82, participation: 91 },
  { week: 'Semana 4', mood: 88, participation: 95 }
];

export default function Surveys() {
  const getProgressPercentage = (responses: number, total: number) => {
    return Math.round((responses / total) * 100);
  };

  const getMoodColor = (score: number) => {
    if (score >= 8) return 'text-green-600';
    if (score >= 6) return 'text-yellow-600';
    return 'text-red-600';
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold">Pesquisas de Clima</h1>
            <p className="text-muted-foreground">Monitore a satisfação e engajamento da equipe</p>
          </div>
          <Button variant="hero">
            <UserCheck className="mr-2 h-4 w-4" />
            Nova Pesquisa
          </Button>
        </div>

        {/* Estatísticas */}
        <div className="grid gap-4 md:grid-cols-4">
          <Card>
            <CardContent className="p-4">
              <div className="text-2xl font-bold">4</div>
              <p className="text-xs text-muted-foreground">Pesquisas este mês</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="text-2xl font-bold">91%</div>
              <p className="text-xs text-muted-foreground">Taxa de participação</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="text-2xl font-bold">8.0</div>
              <p className="text-xs text-muted-foreground">Satisfação média</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="text-2xl font-bold">186</div>
              <p className="text-xs text-muted-foreground">Total de respostas</p>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="active" className="space-y-4">
          <TabsList>
            <TabsTrigger value="active">Ativas ({surveys.active.length})</TabsTrigger>
            <TabsTrigger value="completed">Finalizadas ({surveys.completed.length})</TabsTrigger>
            <TabsTrigger value="pulse">Pulse Survey</TabsTrigger>
          </TabsList>

          <TabsContent value="active" className="space-y-4">
            {surveys.active.map((survey) => (
              <Card key={survey.id} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <CardTitle className="text-xl">{survey.title}</CardTitle>
                        <Badge variant="secondary">
                          <Clock className="mr-1 h-3 w-3" />
                          {survey.estimatedTime}
                        </Badge>
                      </div>
                      <CardDescription>{survey.description}</CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Participação</span>
                      <span>{survey.responses}/{survey.totalEmployees} ({getProgressPercentage(survey.responses, survey.totalEmployees)}%)</span>
                    </div>
                    <Progress value={getProgressPercentage(survey.responses, survey.totalEmployees)} />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center text-sm text-muted-foreground">
                      <Calendar className="mr-1 h-4 w-4" />
                      Prazo: {new Date(survey.deadline).toLocaleDateString('pt-BR')}
                    </div>
                    <Button variant="hero">
                      Responder Pesquisa
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </TabsContent>

          <TabsContent value="completed" className="space-y-4">
            {surveys.completed.map((survey) => (
              <Card key={survey.id}>
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <CardTitle className="text-xl">{survey.title}</CardTitle>
                        <Badge variant="outline">
                          <CheckCircle className="mr-1 h-3 w-3" />
                          Finalizada
                        </Badge>
                      </div>
                      <CardDescription>{survey.description}</CardDescription>
                    </div>
                    <div className="text-right">
                      <div className={`text-2xl font-bold ${getMoodColor(survey.score!)}`}>
                        {survey.score}/10
                      </div>
                      <div className="text-xs text-muted-foreground">Nota média</div>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Participação final</span>
                      <span>{survey.responses}/{survey.totalEmployees} ({getProgressPercentage(survey.responses, survey.totalEmployees)}%)</span>
                    </div>
                    <Progress value={getProgressPercentage(survey.responses, survey.totalEmployees)} />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center text-sm text-muted-foreground">
                      <Calendar className="mr-1 h-4 w-4" />
                      Finalizada em: {new Date(survey.deadline).toLocaleDateString('pt-BR')}
                    </div>
                    <Button variant="outline">
                      Ver Resultados
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </TabsContent>

          <TabsContent value="pulse" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Pulse Survey - Janeiro 2024</CardTitle>
                <CardDescription>Acompanhamento semanal do humor da equipe</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {pulseData.map((data, index) => (
                    <div key={index} className="space-y-2">
                      <div className="flex justify-between items-center">
                        <span className="font-medium">{data.week}</span>
                        <div className="flex items-center gap-4 text-sm">
                          <span>Humor: {data.mood}%</span>
                          <span>Participação: {data.participation}%</span>
                        </div>
                      </div>
                      <div className="grid grid-cols-2 gap-2">
                        <Progress value={data.mood} />
                        <Progress value={data.participation} />
                      </div>
                    </div>
                  ))}
                </div>
                
                <div className="mt-6 p-4 bg-muted/50 rounded-lg">
                  <h4 className="font-medium mb-2">Próximo Pulse Survey</h4>
                  <p className="text-sm text-muted-foreground mb-3">
                    Como você se sente esta semana? Responda em apenas 30 segundos.
                  </p>
                  <Button variant="hero" size="sm">
                    Responder Agora
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
}