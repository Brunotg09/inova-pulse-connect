import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { MessageSquare, Heart, Frown, Meh, Smile, Calendar, User } from 'lucide-react';
import { DashboardLayout } from '@/components/Layout/DashboardLayout';

const feedbacks = {
  received: [
    {
      id: 1,
      type: 'clima',
      content: 'Excelente apresentação no projeto X! Muito clara e bem estruturada.',
      mood: 'positive',
      from: 'Ana Santos',
      date: '2024-01-10',
      category: 'Apresentação'
    },
    {
      id: 2,
      type: '360',
      content: 'Poderia melhorar a comunicação em reuniões, às vezes as ideias ficam confusas.',
      mood: 'neutral',
      from: 'Carlos Silva',
      date: '2024-01-09',
      category: 'Comunicação'
    },
    {
      id: 3,
      type: 'tarefa',
      content: 'Sempre muito colaborativo e disposto a ajudar a equipe.',
      mood: 'positive',
      from: 'Maria Costa',
      date: '2024-01-08',
      category: 'Colaboração'
    }
  ],
  given: [
    {
      id: 4,
      type: 'clima',
      content: 'Adorei a nova organização do espaço de trabalho!',
      mood: 'positive',
      to: 'Equipe RH',
      date: '2024-01-10',
      category: 'Ambiente'
    },
    {
      id: 5,
      type: '360',
      content: 'Sugestão: mais tempo para discussão nas reuniões de sprint.',
      mood: 'neutral',
      to: 'João Manager',
      date: '2024-01-07',
      category: 'Processos'
    }
  ]
};

export default function Feedbacks() {
  const getMoodIcon = (mood: string) => {
    switch (mood) {
      case 'positive':
        return <Smile className="h-4 w-4 text-green-500" />;
      case 'neutral':
        return <Meh className="h-4 w-4 text-yellow-500" />;
      case 'negative':
        return <Frown className="h-4 w-4 text-red-500" />;
      default:
        return <Heart className="h-4 w-4 text-gray-500" />;
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'clima':
        return 'bg-blue-100 text-blue-800';
      case '360':
        return 'bg-purple-100 text-purple-800';
      case 'tarefa':
        return 'bg-green-100 text-green-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getTypeName = (type: string) => {
    switch (type) {
      case 'clima':
        return 'Clima';
      case '360':
        return '360°';
      case 'tarefa':
        return 'Tarefa';
      default:
        return type;
    }
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold">Feedbacks</h1>
            <p className="text-muted-foreground">Acompanhe os feedbacks recebidos e dados</p>
          </div>
          <Button variant="hero">
            <MessageSquare className="mr-2 h-4 w-4" />
            Dar Feedback
          </Button>
        </div>

        {/* Estatísticas */}
        <div className="grid gap-4 md:grid-cols-4">
          <Card>
            <CardContent className="p-4">
              <div className="text-2xl font-bold">8</div>
              <p className="text-xs text-muted-foreground">Feedbacks recebidos</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="text-2xl font-bold">5</div>
              <p className="text-xs text-muted-foreground">Feedbacks dados</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="text-2xl font-bold">90%</div>
              <p className="text-xs text-muted-foreground">Satisfação geral</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="text-2xl font-bold">12</div>
              <p className="text-xs text-muted-foreground">Melhorias implementadas</p>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="received" className="space-y-4">
          <TabsList>
            <TabsTrigger value="received">Recebidos ({feedbacks.received.length})</TabsTrigger>
            <TabsTrigger value="given">Enviados ({feedbacks.given.length})</TabsTrigger>
            <TabsTrigger value="analytics">Análises</TabsTrigger>
          </TabsList>

          <TabsContent value="received" className="space-y-4">
            {feedbacks.received.map((feedback) => (
              <Card key={feedback.id}>
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <CardTitle className="text-lg">{feedback.category}</CardTitle>
                        <div className={`text-xs px-2 py-1 rounded-full ${getTypeColor(feedback.type)}`}>
                          {getTypeName(feedback.type)}
                        </div>
                        {getMoodIcon(feedback.mood)}
                      </div>
                      <CardDescription className="flex items-center gap-2">
                        <User className="h-4 w-4" />
                        De: {feedback.from}
                        <Calendar className="h-4 w-4 ml-2" />
                        {new Date(feedback.date).toLocaleDateString('pt-BR')}
                      </CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-sm">{feedback.content}</p>
                </CardContent>
              </Card>
            ))}
          </TabsContent>

          <TabsContent value="given" className="space-y-4">
            {feedbacks.given.map((feedback) => (
              <Card key={feedback.id}>
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <CardTitle className="text-lg">{feedback.category}</CardTitle>
                        <div className={`text-xs px-2 py-1 rounded-full ${getTypeColor(feedback.type)}`}>
                          {getTypeName(feedback.type)}
                        </div>
                        {getMoodIcon(feedback.mood)}
                      </div>
                      <CardDescription className="flex items-center gap-2">
                        <User className="h-4 w-4" />
                        Para: {feedback.to}
                        <Calendar className="h-4 w-4 ml-2" />
                        {new Date(feedback.date).toLocaleDateString('pt-BR')}
                      </CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-sm">{feedback.content}</p>
                </CardContent>
              </Card>
            ))}
          </TabsContent>

          <TabsContent value="analytics" className="space-y-4">
            <div className="grid gap-6 md:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle>Distribuição por Tipo</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex justify-between">
                    <span>Feedback de Clima</span>
                    <span className="font-medium">40%</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Feedback 360°</span>
                    <span className="font-medium">35%</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Feedback de Tarefa</span>
                    <span className="font-medium">25%</span>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Tendência Mensal</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex justify-between">
                    <span>Janeiro</span>
                    <span className="font-medium">13 feedbacks</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Dezembro</span>
                    <span className="font-medium">8 feedbacks</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Novembro</span>
                    <span className="font-medium">15 feedbacks</span>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
}