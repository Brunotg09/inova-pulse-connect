import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Lightbulb, ThumbsUp, MessageSquare, Plus, TrendingUp, Calendar } from 'lucide-react';
import { DashboardLayout } from '@/components/Layout/DashboardLayout';
import { useState } from 'react';
import { useToast } from '@/hooks/use-toast';

const suggestions = [
  {
    id: 1,
    title: 'App mobile para feedback instantâneo',
    description: 'Desenvolver um aplicativo móvel que permita dar feedback em tempo real sobre reuniões, processos e ambiente de trabalho.',
    author: 'Maria Silva',
    authorInitials: 'MS',
    votes: 23,
    comments: 8,
    status: 'under-review',
    category: 'Tecnologia',
    date: '2024-01-10',
    implementation: 'medium',
    userVoted: false
  },
  {
    id: 2,
    title: 'Horário flexível para toda equipe',
    description: 'Implementar horário flexível de 6h às 22h, permitindo que cada colaborador escolha seu período de trabalho.',
    author: 'João Santos',
    authorInitials: 'JS',
    votes: 45,
    comments: 15,
    status: 'approved',
    category: 'Cultura',
    date: '2024-01-08',
    implementation: 'high',
    userVoted: true
  },
  {
    id: 3,
    title: 'Espaço de descompressão',
    description: 'Criar uma sala com jogos, sofás e plantas para momentos de relaxamento e interação informal.',
    author: 'Ana Costa',
    authorInitials: 'AC',
    votes: 67,
    comments: 22,
    status: 'implemented',
    category: 'Ambiente',
    date: '2024-01-05',
    implementation: 'high',
    userVoted: false
  },
  {
    id: 4,
    title: 'Sistema de carona solidária',
    description: 'Plataforma interna para compartilhamento de caronas entre colaboradores, reduzindo custos e impacto ambiental.',
    author: 'Pedro Lima',
    authorInitials: 'PL',
    votes: 12,
    comments: 4,
    status: 'voting',
    category: 'Sustentabilidade',
    date: '2024-01-09',
    implementation: 'low',
    userVoted: false
  },
  {
    id: 5,
    title: 'Laboratório de inovação',
    description: 'Espaço dedicado para prototipagem e testes de novas ideias, com ferramentas de design thinking.',
    author: 'Carla Mendes',
    authorInitials: 'CM',
    votes: 34,
    comments: 11,
    status: 'under-review',
    category: 'Inovação',
    date: '2024-01-07',
    implementation: 'high',
    userVoted: false
  }
];

export default function Suggestions() {
  const [suggestionList, setSuggestionList] = useState(suggestions);
  const [newSuggestion, setNewSuggestion] = useState({
    title: '',
    description: '',
    category: ''
  });
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const { toast } = useToast();

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'voting':
        return <Badge variant="secondary">Em votação</Badge>;
      case 'under-review':
        return <Badge variant="outline">Em análise</Badge>;
      case 'approved':
        return <Badge variant="default">Aprovada</Badge>;
      case 'implemented':
        return <Badge className="bg-green-100 text-green-800">Implementada</Badge>;
      case 'rejected':
        return <Badge variant="destructive">Rejeitada</Badge>;
      default:
        return null;
    }
  };

  const getCategoryColor = (category: string) => {
    const colors: { [key: string]: string } = {
      'Tecnologia': 'bg-blue-100 text-blue-800',
      'Cultura': 'bg-purple-100 text-purple-800',
      'Ambiente': 'bg-green-100 text-green-800',
      'Sustentabilidade': 'bg-emerald-100 text-emerald-800',
      'Inovação': 'bg-orange-100 text-orange-800'
    };
    return colors[category] || 'bg-gray-100 text-gray-800';
  };

  const getImplementationColor = (level: string) => {
    switch (level) {
      case 'high':
        return 'text-red-600';
      case 'medium':
        return 'text-yellow-600';
      case 'low':
        return 'text-green-600';
      default:
        return 'text-gray-600';
    }
  };

  const getImplementationText = (level: string) => {
    switch (level) {
      case 'high':
        return 'Alta complexidade';
      case 'medium':
        return 'Média complexidade';
      case 'low':
        return 'Baixa complexidade';
      default:
        return 'Não avaliada';
    }
  };

  const handleVote = (suggestionId: number) => {
    setSuggestionList(prev => prev.map(suggestion => 
      suggestion.id === suggestionId 
        ? { 
            ...suggestion, 
            votes: suggestion.userVoted ? suggestion.votes - 1 : suggestion.votes + 1,
            userVoted: !suggestion.userVoted
          }
        : suggestion
    ));
    
    const suggestion = suggestionList.find(s => s.id === suggestionId);
    toast({
      title: suggestion?.userVoted ? "Voto removido!" : "Voto computado!",
      description: suggestion?.userVoted ? "Seu voto foi removido." : "Obrigado por votar nesta sugestão.",
    });
  };

  const handleCreateSuggestion = () => {
    if (!newSuggestion.title || !newSuggestion.description || !newSuggestion.category) {
      toast({
        title: "Campos obrigatórios",
        description: "Preencha todos os campos para criar a sugestão.",
        variant: "destructive"
      });
      return;
    }

    const suggestion = {
      id: suggestionList.length + 1,
      title: newSuggestion.title,
      description: newSuggestion.description,
      author: 'Você',
      authorInitials: 'VC',
      votes: 1,
      comments: 0,
      status: 'voting',
      category: newSuggestion.category,
      date: new Date().toISOString().split('T')[0],
      implementation: 'medium',
      userVoted: true
    };

    setSuggestionList(prev => [suggestion, ...prev]);
    setNewSuggestion({ title: '', description: '', category: '' });
    setIsDialogOpen(false);
    
    toast({
      title: "Sugestão criada!",
      description: "Sua sugestão foi enviada e está em votação.",
    });
  };
  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold">Mural de Sugestões</h1>
            <p className="text-muted-foreground">Compartilhe suas ideias e vote nas melhores propostas</p>
          </div>
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button variant="hero">
                <Plus className="mr-2 h-4 w-4" />
                Nova Sugestão
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Criar Nova Sugestão</DialogTitle>
                <DialogDescription>
                  Compartilhe sua ideia para melhorar nossa empresa
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="title">Título</Label>
                  <Input
                    id="title"
                    value={newSuggestion.title}
                    onChange={(e) => setNewSuggestion(prev => ({ ...prev, title: e.target.value }))}
                    placeholder="Digite o título da sua sugestão"
                  />
                </div>
                <div>
                  <Label htmlFor="category">Categoria</Label>
                  <Select value={newSuggestion.category} onValueChange={(value) => setNewSuggestion(prev => ({ ...prev, category: value }))}>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione uma categoria" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Tecnologia">Tecnologia</SelectItem>
                      <SelectItem value="Cultura">Cultura</SelectItem>
                      <SelectItem value="Ambiente">Ambiente</SelectItem>
                      <SelectItem value="Sustentabilidade">Sustentabilidade</SelectItem>
                      <SelectItem value="Inovação">Inovação</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="description">Descrição</Label>
                  <Textarea
                    id="description"
                    value={newSuggestion.description}
                    onChange={(e) => setNewSuggestion(prev => ({ ...prev, description: e.target.value }))}
                    placeholder="Descreva sua sugestão em detalhes"
                    rows={4}
                  />
                </div>
                <Button onClick={handleCreateSuggestion} className="w-full">
                  Criar Sugestão
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>

        {/* Estatísticas */}
        <div className="grid gap-4 md:grid-cols-4">
          <Card>
            <CardContent className="p-4">
              <div className="text-2xl font-bold">{suggestionList.length}</div>
              <p className="text-xs text-muted-foreground">Sugestões ativas</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="text-2xl font-bold">{suggestionList.reduce((acc, s) => acc + s.votes, 0)}</div>
              <p className="text-xs text-muted-foreground">Total de votos</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="text-2xl font-bold">{suggestionList.filter(s => s.status === 'implemented').length}</div>
              <p className="text-xs text-muted-foreground">Implementadas</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="text-2xl font-bold">89%</div>
              <p className="text-xs text-muted-foreground">Taxa de aprovação</p>
            </CardContent>
          </Card>
        </div>

        {/* Lista de sugestões */}
        <div className="space-y-4">
          {suggestionList
            .sort((a, b) => b.votes - a.votes)
            .map((suggestion) => (
            <Card key={suggestion.id} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <CardTitle className="text-xl">{suggestion.title}</CardTitle>
                      {getStatusBadge(suggestion.status)}
                    </div>
                    <CardDescription>{suggestion.description}</CardDescription>
                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <Avatar className="h-6 w-6">
                          <AvatarFallback className="text-xs">{suggestion.authorInitials}</AvatarFallback>
                        </Avatar>
                        <span>{suggestion.author}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Calendar className="h-4 w-4" />
                        <span>{new Date(suggestion.date).toLocaleDateString('pt-BR')}</span>
                      </div>
                      <div className={`text-xs px-2 py-1 rounded-full ${getCategoryColor(suggestion.category)}`}>
                        {suggestion.category}
                      </div>
                      <div className={`text-xs ${getImplementationColor(suggestion.implementation)}`}>
                        {getImplementationText(suggestion.implementation)}
                      </div>
                    </div>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <Button
                      variant="outline"
                      size="sm"
                      className="flex items-center gap-1"
                      onClick={() => handleVote(suggestion.id)}
                    >
                      <ThumbsUp className="h-4 w-4" />
                      {suggestion.votes}
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="flex items-center gap-1"
                    >
                      <MessageSquare className="h-4 w-4" />
                      {suggestion.comments} comentários
                    </Button>
                  </div>

                  <div className="flex items-center gap-2">
                    {suggestion.status === 'voting' && (
                      <Button 
                        variant={suggestion.userVoted ? "outline" : "hero"} 
                        size="sm"
                        onClick={() => handleVote(suggestion.id)}
                      >
                        {suggestion.userVoted ? "Votado" : "Votar"}
                      </Button>
                    )}
                    <Button variant="outline" size="sm">
                      Ver detalhes
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Call to action */}
        <Card className="bg-gradient-card border-0">
          <CardContent className="p-8 text-center">
            <div className="space-y-4">
              <div className="flex justify-center">
                <div className="w-16 h-16 bg-gradient-hero rounded-full flex items-center justify-center">
                  <Lightbulb className="h-8 w-8 text-primary-foreground" />
                </div>
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2">Tem uma ideia brilhante?</h3>
                <p className="text-muted-foreground mb-4">
                  Compartilhe sua sugestão e ajude a melhorar nosso ambiente de trabalho
                </p>
                <Button variant="hero" onClick={() => setIsDialogOpen(true)}>
                  <Plus className="mr-2 h-4 w-4" />
                  Criar Nova Sugestão
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}