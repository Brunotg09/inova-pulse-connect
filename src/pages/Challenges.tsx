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

const challenges = [
  {
    id: 1,
    title: 'Inovação Verde',
    description: 'Proponha soluções sustentáveis para reduzir o impacto ambiental da empresa',
    status: 'active',
    participants: 24,
    submissions: 8,
    likes: 45,
    deadline: '2024-01-15',
    category: 'Sustentabilidade',
    prize: '500 pontos',
    userParticipating: false
  },
  {
    id: 2,
    title: 'App de Produtividade',
    description: 'Crie um conceito de aplicativo para melhorar a produtividade da equipe',
    status: 'voting',
    participants: 18,
    submissions: 12,
    likes: 67,
    deadline: '2024-01-10',
    category: 'Tecnologia',
    prize: '750 pontos',
    userParticipating: true
  },
  {
    id: 3,
    title: 'Experiência do Cliente',
    description: 'Desenvolva uma estratégia para melhorar a experiência dos nossos clientes',
    status: 'finished',
    participants: 32,
    submissions: 15,
    likes: 89,
    deadline: '2024-01-05',
    category: 'UX/UI',
    prize: '1000 pontos',
    winner: 'Maria Silva',
    userParticipating: false
  },
  {
    id: 4,
    title: 'Comunicação Interna',
    description: 'Proponha melhorias para a comunicação entre departamentos',
    status: 'upcoming',
    participants: 0,
    submissions: 0,
    likes: 0,
    deadline: '2024-01-20',
    category: 'Comunicação',
    prize: '400 pontos',
    userParticipating: false
  }
];

export default function Challenges() {
  const [challengeList, setChallengeList] = useState(challenges);
  const [submissionTitle, setSubmissionTitle] = useState('');
  const [submissionDescription, setSubmissionDescription] = useState('');
  const { toast } = useToast();

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

  const handleParticipate = (challengeId: number) => {
    setChallengeList(prev => prev.map(challenge => 
      challenge.id === challengeId 
        ? { 
            ...challenge, 
            userParticipating: true,
            participants: challenge.participants + 1,
            submissions: challenge.submissions + 1
          }
        : challenge
    ));
    toast({
      title: "Participação confirmada!",
      description: "Sua submissão foi enviada com sucesso.",
    });
    setSubmissionTitle('');
    setSubmissionDescription('');
  };

  const handleVote = (challengeId: number) => {
    setChallengeList(prev => prev.map(challenge => 
      challenge.id === challengeId 
        ? { ...challenge, likes: challenge.likes + 1 }
        : challenge
    ));
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
              <div className="text-2xl font-bold">{challengeList.filter(c => c.status === 'active').length}</div>
              <p className="text-xs text-muted-foreground">Desafios ativos</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="text-2xl font-bold">{challengeList.reduce((acc, c) => acc + c.participants, 0)}</div>
              <p className="text-xs text-muted-foreground">Participantes</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="text-2xl font-bold">{challengeList.reduce((acc, c) => acc + c.submissions, 0)}</div>
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
          {challengeList.map((challenge) => (
            <Card key={challenge.id} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <CardTitle className="text-xl">{challenge.title}</CardTitle>
                      {getStatusBadge(challenge.status)}
                      {challenge.userParticipating && (
                        <Badge variant="outline" className="bg-green-50 text-green-700">
                          Participando
                        </Badge>
                      )}
                    </div>
                    <CardDescription>{challenge.description}</CardDescription>
                  </div>
                  <div className="text-right">
                    <div className="text-sm font-medium text-primary">{challenge.prize}</div>
                    <div className={`text-xs px-2 py-1 rounded-full ${getCategoryColor(challenge.category)}`}>
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
                      {challenge.participants} participantes
                    </div>
                    <div className="flex items-center">
                      <MessageSquare className="mr-1 h-4 w-4" />
                      {challenge.submissions} submissões
                    </div>
                    <div className="flex items-center">
                      <ThumbsUp className="mr-1 h-4 w-4" />
                      {challenge.likes} curtidas
                    </div>
                    <div className="flex items-center">
                      <Calendar className="mr-1 h-4 w-4" />
                      {new Date(challenge.deadline).toLocaleDateString('pt-BR')}
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    {challenge.status === 'finished' && challenge.winner && (
                      <div className="flex items-center text-sm">
                        <Trophy className="mr-1 h-4 w-4 text-yellow-500" />
                        <span>Vencedor: {challenge.winner}</span>
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
                    
                    {challenge.status === 'active' && challenge.userParticipating && (
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
          ))}
        </div>
      </div>
    </DashboardLayout>
  );
}