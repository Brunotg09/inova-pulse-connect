import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { 
  Trophy, 
  Users, 
  MessageSquare, 
  Lightbulb, 
  TrendingUp, 
  Star,
  ArrowRight,
  Target
} from 'lucide-react';
import { DashboardLayout } from '@/components/Layout/DashboardLayout';

export default function Dashboard() {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold">Dashboard</h1>
          <p className="text-muted-foreground">Acompanhe o progresso da sua equipe</p>
        </div>

        {/* Métricas principais */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Engajamento</CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">85%</div>
              <p className="text-xs text-muted-foreground">+12% desde o mês passado</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Desafios Ativos</CardTitle>
              <Trophy className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">12</div>
              <p className="text-xs text-muted-foreground">3 finalizando hoje</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Feedbacks</CardTitle>
              <MessageSquare className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">47</div>
              <p className="text-xs text-muted-foreground">8 novos esta semana</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Sugestões</CardTitle>
              <Lightbulb className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">23</div>
              <p className="text-xs text-muted-foreground">5 em votação</p>
            </CardContent>
          </Card>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          {/* Progresso de Treinamentos */}
          <Card>
            <CardHeader>
              <CardTitle>Trilhas de Treinamento</CardTitle>
              <CardDescription>Seu progresso atual</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-sm font-medium">Inovação Digital</span>
                  <span className="text-sm text-muted-foreground">75%</span>
                </div>
                <Progress value={75} />
              </div>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-sm font-medium">Liderança Criativa</span>
                  <span className="text-sm text-muted-foreground">45%</span>
                </div>
                <Progress value={45} />
              </div>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-sm font-medium">Feedback Efetivo</span>
                  <span className="text-sm text-muted-foreground">90%</span>
                </div>
                <Progress value={90} />
              </div>
              <Button variant="outline" className="w-full">
                Ver todos os treinamentos
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </CardContent>
          </Card>

          {/* Atividades Recentes */}
          <Card>
            <CardHeader>
              <CardTitle>Atividades Recentes</CardTitle>
              <CardDescription>O que está acontecendo na sua equipe</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-accent rounded-full"></div>
                <div className="flex-1">
                  <p className="text-sm">Nova sugestão: "App mobile para feedback"</p>
                  <p className="text-xs text-muted-foreground">há 2 horas</p>
                </div>
                <Badge variant="secondary">Nova</Badge>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-primary rounded-full"></div>
                <div className="flex-1">
                  <p className="text-sm">Desafio "Inovação Verde" finalizado</p>
                  <p className="text-xs text-muted-foreground">há 4 horas</p>
                </div>
                <Badge>Concluído</Badge>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-secondary rounded-full"></div>
                <div className="flex-1">
                  <p className="text-sm">10 novos feedbacks recebidos</p>
                  <p className="text-xs text-muted-foreground">ontem</p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-accent rounded-full"></div>
                <div className="flex-1">
                  <p className="text-sm">Ranking atualizado - você subiu 3 posições!</p>
                  <p className="text-xs text-muted-foreground">2 dias atrás</p>
                </div>
                <Star className="h-4 w-4 text-accent" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Objetivos da Semana */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Target className="mr-2 h-5 w-5" />
              Objetivos da Semana
            </CardTitle>
            <CardDescription>Foque no que realmente importa</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 md:grid-cols-3">
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">Completar 2 treinamentos</span>
                  <Badge variant="outline">1/2</Badge>
                </div>
                <Progress value={50} />
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">Participar de 3 desafios</span>
                  <Badge variant="outline">3/3</Badge>
                </div>
                <Progress value={100} />
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">Dar 5 feedbacks</span>
                  <Badge variant="outline">2/5</Badge>
                </div>
                <Progress value={40} />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}