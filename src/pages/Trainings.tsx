import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Play, Clock, CheckCircle, Star } from 'lucide-react';
import { DashboardLayout } from '@/components/Layout/DashboardLayout';

const trainings = [
  {
    id: 1,
    title: 'Fundamentos da Inovação',
    description: 'Aprenda os conceitos básicos de inovação e criatividade no ambiente corporativo',
    duration: '45 min',
    progress: 100,
    status: 'completed',
    rating: 4.8,
    modules: 6
  },
  {
    id: 2,
    title: 'Liderança Criativa',
    description: 'Desenvolva suas habilidades de liderança para inspirar inovação na sua equipe',
    duration: '60 min',
    progress: 75,
    status: 'in-progress',
    rating: 4.9,
    modules: 8
  },
  {
    id: 3,
    title: 'Design Thinking na Prática',
    description: 'Metodologia completa de Design Thinking aplicada a problemas reais',
    duration: '90 min',
    progress: 0,
    status: 'not-started',
    rating: 4.7,
    modules: 12
  },
  {
    id: 4,
    title: 'Feedback Construtivo',
    description: 'Como dar e receber feedback de forma efetiva e construtiva',
    duration: '30 min',
    progress: 45,
    status: 'in-progress',
    rating: 4.6,
    modules: 4
  },
  {
    id: 5,
    title: 'Gestão da Mudança',
    description: 'Estratégias para implementar mudanças inovadoras na organização',
    duration: '75 min',
    progress: 0,
    status: 'not-started',
    rating: 4.8,
    modules: 10
  },
  {
    id: 6,
    title: 'Colaboração Digital',
    description: 'Ferramentas e técnicas para colaboração efetiva em equipes remotas',
    duration: '40 min',
    progress: 0,
    status: 'not-started',
    rating: 4.5,
    modules: 5
  }
];

export default function Trainings() {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'default';
      case 'in-progress': return 'secondary';
      default: return 'outline';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'completed': return 'Concluído';
      case 'in-progress': return 'Em andamento';
      default: return 'Não iniciado';
    }
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold">Treinamentos</h1>
          <p className="text-muted-foreground">Desenvolva suas habilidades de inovação e liderança</p>
        </div>

        {/* Estatísticas */}
        <div className="grid gap-4 md:grid-cols-4">
          <Card>
            <CardContent className="p-4">
              <div className="text-2xl font-bold">6</div>
              <p className="text-xs text-muted-foreground">Trilhas disponíveis</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="text-2xl font-bold">1</div>
              <p className="text-xs text-muted-foreground">Concluídas</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="text-2xl font-bold">2</div>
              <p className="text-xs text-muted-foreground">Em andamento</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="text-2xl font-bold">340</div>
              <p className="text-xs text-muted-foreground">Minutos estudados</p>
            </CardContent>
          </Card>
        </div>

        {/* Lista de treinamentos */}
        <div className="grid gap-6 md:grid-cols-2">
          {trainings.map((training) => (
            <Card key={training.id} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div className="space-y-1">
                    <CardTitle className="text-lg">{training.title}</CardTitle>
                    <CardDescription>{training.description}</CardDescription>
                  </div>
                  <Badge variant={getStatusColor(training.status)}>
                    {getStatusText(training.status)}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between text-sm text-muted-foreground">
                  <div className="flex items-center">
                    <Clock className="mr-1 h-4 w-4" />
                    {training.duration}
                  </div>
                  <div className="flex items-center">
                    <Star className="mr-1 h-4 w-4 fill-current text-yellow-500" />
                    {training.rating}
                  </div>
                  <div>{training.modules} módulos</div>
                </div>

                {training.progress > 0 && (
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Progresso</span>
                      <span>{training.progress}%</span>
                    </div>
                    <Progress value={training.progress} />
                  </div>
                )}

                <div className="flex gap-2">
                  {training.status === 'completed' ? (
                    <Button variant="outline" className="flex-1">
                      <CheckCircle className="mr-2 h-4 w-4" />
                      Revisar
                    </Button>
                  ) : (
                    <Button variant="hero" className="flex-1">
                      <Play className="mr-2 h-4 w-4" />
                      {training.status === 'in-progress' ? 'Continuar' : 'Iniciar'}
                    </Button>
                  )}
                  <Button variant="outline" size="icon">
                    <Star className="h-4 w-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </DashboardLayout>
  );
}