import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Play, Clock, CheckCircle, Star } from 'lucide-react';
import { DashboardLayout } from '@/components/Layout/DashboardLayout';
import { useState } from 'react';
import { useToast } from '@/hooks/use-toast';

const trainings = [
  {
    id: 1,
    title: 'Fundamentos da Inovação',
    description: 'Aprenda os conceitos básicos de inovação e criatividade no ambiente corporativo',
    duration: '45 min',
    progress: 100,
    status: 'completed',
    rating: 4.8,
    modules: 6,
    content: 'Este treinamento aborda os conceitos fundamentais de inovação, incluindo tipos de inovação, processo criativo e como aplicar no dia a dia.'
  },
  {
    id: 2,
    title: 'Liderança Criativa',
    description: 'Desenvolva suas habilidades de liderança para inspirar inovação na sua equipe',
    duration: '60 min',
    progress: 75,
    status: 'in-progress',
    rating: 4.9,
    modules: 8,
    content: 'Aprenda técnicas de liderança que estimulam a criatividade e inovação em equipes.'
  },
  {
    id: 3,
    title: 'Design Thinking na Prática',
    description: 'Metodologia completa de Design Thinking aplicada a problemas reais',
    duration: '90 min',
    progress: 0,
    status: 'not-started',
    rating: 4.7,
    modules: 12,
    content: 'Metodologia completa de Design Thinking com exercícios práticos e estudos de caso.'
  },
  {
    id: 4,
    title: 'Feedback Construtivo',
    description: 'Como dar e receber feedback de forma efetiva e construtiva',
    duration: '30 min',
    progress: 45,
    status: 'in-progress',
    rating: 4.6,
    modules: 4,
    content: 'Técnicas para dar e receber feedback de forma construtiva e efetiva.'
  },
  {
    id: 5,
    title: 'Gestão da Mudança',
    description: 'Estratégias para implementar mudanças inovadoras na organização',
    duration: '75 min',
    progress: 0,
    status: 'not-started',
    rating: 4.8,
    modules: 10,
    content: 'Estratégias e ferramentas para implementar mudanças organizacionais com sucesso.'
  },
  {
    id: 6,
    title: 'Colaboração Digital',
    description: 'Ferramentas e técnicas para colaboração efetiva em equipes remotas',
    duration: '40 min',
    progress: 0,
    status: 'not-started',
    rating: 4.5,
    modules: 5,
    content: 'Ferramentas digitais e técnicas para melhorar a colaboração em equipes remotas.'
  }
];

export default function Trainings() {
  const [trainingList, setTrainingList] = useState(trainings);
  const { toast } = useToast();

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

  const handleStartTraining = (trainingId: number) => {
    setTrainingList(prev => prev.map(training => 
      training.id === trainingId 
        ? { ...training, status: 'in-progress', progress: 10 }
        : training
    ));
    toast({
      title: "Treinamento iniciado!",
      description: "Você começou um novo treinamento.",
    });
  };

  const handleContinueTraining = (trainingId: number) => {
    const training = trainingList.find(t => t.id === trainingId);
    if (training) {
      const newProgress = Math.min(training.progress + 25, 100);
      const newStatus = newProgress === 100 ? 'completed' : 'in-progress';
      
      setTrainingList(prev => prev.map(t => 
        t.id === trainingId 
          ? { ...t, progress: newProgress, status: newStatus }
          : t
      ));
      
      toast({
        title: newStatus === 'completed' ? "Treinamento concluído!" : "Progresso salvo!",
        description: newStatus === 'completed' 
          ? "Parabéns! Você concluiu o treinamento." 
          : `Progresso: ${newProgress}%`,
      });
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
              <div className="text-2xl font-bold">{trainingList.length}</div>
              <p className="text-xs text-muted-foreground">Trilhas disponíveis</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="text-2xl font-bold">{trainingList.filter(t => t.status === 'completed').length}</div>
              <p className="text-xs text-muted-foreground">Concluídas</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="text-2xl font-bold">{trainingList.filter(t => t.status === 'in-progress').length}</div>
              <p className="text-xs text-muted-foreground">Em andamento</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="text-2xl font-bold">{trainingList.reduce((acc, t) => acc + (t.progress * parseInt(t.duration) / 100), 0).toFixed(0)}</div>
              <p className="text-xs text-muted-foreground">Minutos estudados</p>
            </CardContent>
          </Card>
        </div>

        {/* Lista de treinamentos */}
        <div className="grid gap-6 md:grid-cols-2">
          {trainingList.map((training) => (
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
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button variant="outline" className="flex-1">
                          <CheckCircle className="mr-2 h-4 w-4" />
                          Revisar
                        </Button>
                      </DialogTrigger>
                      <DialogContent>
                        <DialogHeader>
                          <DialogTitle>{training.title}</DialogTitle>
                          <DialogDescription>
                            {training.content}
                          </DialogDescription>
                        </DialogHeader>
                        <div className="space-y-4">
                          <div className="text-sm">
                            <strong>Status:</strong> Concluído ✅
                          </div>
                          <div className="text-sm">
                            <strong>Sua avaliação:</strong> {training.rating}/5 ⭐
                          </div>
                        </div>
                      </DialogContent>
                    </Dialog>
                  ) : (
                    <Button 
                      variant="hero" 
                      className="flex-1"
                      onClick={() => training.status === 'not-started' 
                        ? handleStartTraining(training.id)
                        : handleContinueTraining(training.id)
                      }
                    >
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