import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Play, Clock, CheckCircle, Star } from 'lucide-react';
import { DashboardLayout } from '@/components/Layout/DashboardLayout';
import { useState } from 'react';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/contexts/AuthContext';
import { MockDatabase, Training, UserTrainingProgress } from '@/data/mockData';

export default function Trainings() {
  const { user, company } = useAuth();
  const { toast } = useToast();
  
  // Buscar treinamentos da empresa
  const trainings = company ? MockDatabase.getTrainingsByCompany(company.id) : [];
  
  // Estado para progresso dos treinamentos
  const [trainingProgress, setTrainingProgress] = useState<Record<string, UserTrainingProgress>>(() => {
    if (!user) return {};
    
    const progress: Record<string, UserTrainingProgress> = {};
    trainings.forEach(training => {
      const userProgress = MockDatabase.getTrainingProgress(user.id, training.id);
      if (userProgress) {
        progress[training.id] = userProgress;
      } else {
        // Criar progresso inicial
        progress[training.id] = {
          user_id: user.id,
          training_id: training.id,
          progress: 0,
          current_module: 0,
          time_spent: 0
        };
      }
    });
    return progress;
  });

  const getStatus = (progress: UserTrainingProgress) => {
    if (progress.progress === 100) return 'completed';
    if (progress.progress > 0) return 'in-progress';
    return 'not-started';
  };

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

  const handleStartTraining = (trainingId: string) => {
    if (!user) return;
    
    const newProgress: UserTrainingProgress = {
      user_id: user.id,
      training_id: trainingId,
      progress: 10,
      current_module: 1,
      time_spent: 5
    };
    
    MockDatabase.updateTrainingProgress(newProgress);
    setTrainingProgress(prev => ({
      ...prev,
      [trainingId]: newProgress
    }));
    
    toast({
      title: "Treinamento iniciado!",
      description: "Você começou um novo treinamento.",
    });
  };

  const handleContinueTraining = (trainingId: string) => {
    if (!user) return;
    
    const currentProgress = trainingProgress[trainingId];
    if (!currentProgress) return;
    
    const newProgressValue = Math.min(currentProgress.progress + 25, 100);
    const updatedProgress: UserTrainingProgress = {
      ...currentProgress,
      progress: newProgressValue,
      time_spent: currentProgress.time_spent + 15,
      completed_at: newProgressValue === 100 ? new Date().toISOString() : undefined
    };
    
    MockDatabase.updateTrainingProgress(updatedProgress);
    setTrainingProgress(prev => ({
      ...prev,
      [trainingId]: updatedProgress
    }));
    
    toast({
      title: newProgressValue === 100 ? "Treinamento concluído!" : "Progresso salvo!",
      description: newProgressValue === 100 
        ? "Parabéns! Você concluiu o treinamento." 
        : `Progresso: ${newProgressValue}%`,
    });
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
              <div className="text-2xl font-bold">{trainings.length}</div>
              <p className="text-xs text-muted-foreground">Trilhas disponíveis</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="text-2xl font-bold">{Object.values(trainingProgress).filter(p => p.progress === 100).length}</div>
              <p className="text-xs text-muted-foreground">Concluídas</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="text-2xl font-bold">{Object.values(trainingProgress).filter(p => p.progress > 0 && p.progress < 100).length}</div>
              <p className="text-xs text-muted-foreground">Em andamento</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="text-2xl font-bold">{Object.values(trainingProgress).reduce((acc, p) => acc + p.time_spent, 0)}</div>
              <p className="text-xs text-muted-foreground">Minutos estudados</p>
            </CardContent>
          </Card>
        </div>

        {/* Lista de treinamentos */}
        <div className="grid gap-6 md:grid-cols-2">
          {trainings.map((training) => {
            const progress = trainingProgress[training.id];
            const status = getStatus(progress);
            
            return (
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
                    {training.duration} min
                  </div>
                  <div className="flex items-center">
                    <Star className="mr-1 h-4 w-4 fill-current text-yellow-500" />
                    {training.rating}
                  </div>
                  <div>{training.modules.length} módulos</div>
                </div>

                {progress.progress > 0 && (
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Progresso</span>
                      <span>{progress.progress}%</span>
                    </div>
                    <Progress value={progress.progress} />
                  </div>
                )}

                <div className="flex gap-2">
                  {status === 'completed' ? (
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
                            {training.description}
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
                      onClick={() => status === 'not-started' 
                        ? handleStartTraining(training.id)
                        : handleContinueTraining(training.id)
                      }
                    >
                      <Play className="mr-2 h-4 w-4" />
                      {status === 'in-progress' ? 'Continuar' : 'Iniciar'}
                    </Button>
                  )}
                  <Button variant="outline" size="icon">
                    <Star className="h-4 w-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          );
          })}
        </div>
      </div>
    </DashboardLayout>
  );
}