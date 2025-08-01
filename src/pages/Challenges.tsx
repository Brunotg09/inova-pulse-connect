import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Trophy, Users, Calendar, ThumbsUp, MessageSquare } from 'lucide-react';
import { DashboardLayout } from '@/components/Layout/DashboardLayout';
import { useState } from 'react';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/contexts/AuthContext';
import { MockDatabase } from '@/data/mockData';

export default function Challenges() {
  const { user, company } = useAuth();
  const { toast } = useToast();
  
  // Buscar desafios da empresa
  const challenges = company ? MockDatabase.getChallengesByCompany(company.id) : [];
  
  // Estado para participações do usuário
  const [userParticipations, setUserParticipations] = useState<Record<string, boolean>>(() => {
    const stored = localStorage.getItem(`participations_${user?.id}`);
    return stored ? JSON.parse(stored) : {};
  });
  
  // Estado para estatísticas dinâmicas
  const [challengeStats, setChallengeStats] = useState<Record<string, { participants: number; submissions: number; likes: number }>>(() => {
    const stored = localStorage.getItem(`challenge_stats_${company?.id}`);
    return stored ? JSON.parse(stored) : challenges.reduce((acc, challenge) => {
      acc[challenge.id] = {
        participants: Math.floor(Math.random() * 50) + 10,
        submissions: Math.floor(Math.random() * 20) + 5,
        likes: Math.floor(Math.random() * 100) + 20
      };
      return acc;
    }, {} as Record<string, { participants: number; submissions: number; likes: number }>);
  });

  const [submissionTitle, setSubmissionTitle] = useState('');
  const [submissionDescription, setSubmissionDescription] = useState('');

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'active':
        return <Badge variant="secondary">Ativo</Badge>;
      case 'voting':
        return <Badge variant="default">Votação</Badge>;
      case 'finished':
        return <Badge variant="outline">Finalizado</Badge>;
      case 'upcoming':
        return <Badge variant="outline">Em breve</Badge>;
      default:
        return null;
    }
  };

  const getCategoryColor = (category: string) => {
    const colors: { [key: string]: string } = {
      'Sustentabilidade': 'bg-green-100 text-green-800',
      'Tecnologia': 'bg-blue-100 text-blue-800',
      'UX/UI': 'bg-purple-100 text-purple-800',
      'Comunicação': 'bg-orange-100 text-orange-800'
    };
    return colors[category] || 'bg-gray-100 text-gray-800';
  };

  const handleParticipate = (challengeId: string) => {
    if (!user || !company) return;
    
    // Atualizar participação do usuário
    const newParticipations = { ...userParticipations, [challengeId]: true };
    setUserParticipations(newParticipations);
    localStorage.setItem(`participations_${user.id}`, JSON.stringify(newParticipations));
    
    // Atualizar estatísticas
    const newStats = {
      ...challengeStats,
      [challengeId]: {
        ...challengeStats[challengeId],
        participants: challengeStats[challengeId].participants + 1,
        submissions: challengeStats[challengeId].submissions + 1
      }
    };
    setChallengeStats(newStats);
    localStorage.setItem(`challenge_stats_${company.id}`, JSON.stringify(newStats));
    
    toast({
      title: "Participação confirmada!",
      description: "Sua submissão foi enviada com sucesso.",
    });
    setSubmissionTitle('');
    setSubmissionDescription('');
  };

  const handleVote = (challengeId: string) => {
    if (!company) return;
    
    const newStats = {
      ...challengeStats,
      [challengeId]: {
        ...challengeStats[challengeId],
        likes: challengeStats[challengeId].likes + 1
      }
    };
    setChallengeStats(newStats);
    localStorage.setItem(`challenge_stats_${company.id}`, JSON.stringify(newStats));
    
    toast({
      title: "Voto computado!",
      description: "Obrigado por participar da votação.",
    });
  };
  
  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold">Desafios de Inovação</h1>
            <p className="text-muted-foreground">Participe, vote e ganhe pontos com suas ideias</p>
          </div>
          <Button variant="hero">
            <Trophy className="mr-2 h-4 w-4" />
            Ranking
          </Button>
        </div>

        {/* Estatísticas */}
        <div className="grid gap-4 md:grid-cols-4">
          <Card>
            <CardContent className="p-4">
              <div className="text-2xl font-bold">{challenges.filter(c => c.status === 'active').length}</div>
              <p className="text-xs text-muted-foreground">Desafios ativos</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="text-2xl font-bold">{Object.values(challengeStats).reduce((acc, stats) => acc + stats.participants, 0)}</div>
              <p className="text-xs text-muted-foreground">Participantes</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="text-2xl font-bold">{Object.values(challengeStats).reduce((acc, stats) => acc + stats.submissions, 0)}</div>
              <p className="text-xs text-muted-foreground">Submissões</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="text-2xl font-bold">1.2k</div>
              <p className="text-xs text-muted-foreground">Pontos distribuídos</p>
            </CardContent>
          </Card>
        </div>

        {/* Lista de desafios */}
        <div className="space-y-4">
          {challenges.map((challenge) => {
            const stats = challengeStats[challenge.id] || { participants: 0, submissions: 0, likes: 0 };
            const userParticipating = userParticipations[challenge.id] || false;
            
            return (
            <Card key={challenge.id} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <CardTitle className="text-xl">{challenge.title}</CardTitle>
                      {getStatusBadge(challenge.status)}
                      {userParticipating && (
                        <Badge variant="outline" className="bg-green-50 text-green-700">
                          Participando
                        </Badge>
                      )}
                    </div>
                    <CardDescription>{challenge.description}</CardDescription>
                  </div>
                  <div className="text-right">
                    <div className="text-sm font-medium text-primary">{challenge.prize}</div>
                    <div className={`text-xs px-2 py-1 rounded-full ${getCategoryColor(challenge.category || 'Geral')}`}>
                      {challenge.category}
                    </div>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-6 text-sm text-muted-foreground">
                    <div className="flex items-center">
                      <Users className="mr-1 h-4 w-4" />
                      {stats.participants} participantes
                    </div>
                    <div className="flex items-center">
                      <MessageSquare className="mr-1 h-4 w-4" />
                      {stats.submissions} submissões
                    </div>
                    <div className="flex items-center">
                      <ThumbsUp className="mr-1 h-4 w-4" />
                      {stats.likes} curtidas
                    </div>
                    <div className="flex items-center">
                      <Calendar className="mr-1 h-4 w-4" />
                      {new Date(challenge.deadline).toLocaleDateString('pt-BR')}
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    {challenge.status === 'finished' && (
                      <div className="flex items-center text-sm">
                        <Trophy className="mr-1 h-4 w-4 text-yellow-500" />
                        <span>Finalizado</span>
                      </div>
                    )}
                    
                    {challenge.status === 'active' && (
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button variant="hero">
                            Participar
                          </Button>
                        </DialogTrigger>
                        <DialogContent>
                          <DialogHeader>
                            <DialogTitle>Participar do Desafio</DialogTitle>
                            <DialogDescription>
                              {challenge.title} - {challenge.description}
                            </DialogDescription>
                          </DialogHeader>
                          <div className="space-y-4">
                            <div>
                              <Label htmlFor="title">Título da sua solução</Label>
                              <Input
                                id="title"
                                value={submissionTitle}
                                onChange={(e) => setSubmissionTitle(e.target.value)}
                                placeholder="Digite o título da sua ideia"
                              />
                            </div>
                            <div>
                              <Label htmlFor="description">Descrição</Label>
                              <Textarea
                                id="description"
                                value={submissionDescription}
                                onChange={(e) => setSubmissionDescription(e.target.value)}
                                placeholder="Descreva sua solução em detalhes"
                                rows={4}
                              />
                            </div>
                            <Button 
                              onClick={() => handleParticipate(challenge.id)}
                              className="w-full"
                              disabled={!submissionTitle || !submissionDescription}
                            >
                              Enviar Participação
                            </Button>
                          </div>
                        </DialogContent>
                      </Dialog>
                    )}
                    
                    {challenge.status === 'active' && userParticipating && (
                      <Button variant="outline" disabled>
                        Já participando
                      </Button>
                    )}
                    
                    {challenge.status === 'voting' && (
                      <Button variant="outline" onClick={() => handleVote(challenge.id)}>
                        Votar
                      </Button>
                    )}
                    
                    {challenge.status === 'finished' && (
                      <Button variant="outline">
                        Ver resultado
                      </Button>
                    )}
                    
                    {challenge.status === 'upcoming' && (
                      <Button variant="outline" disabled>
                        Em breve
                      </Button>
                    )}
                  </div>
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