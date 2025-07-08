import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import teamInnovation from "@/assets/team-innovation.jpg";
import feedbackEngagement from "@/assets/feedback-engagement.jpg";

const Features = () => {
  const features = [
    {
      category: "🎯 Núcleo de Inovação",
      title: "Desenvolva uma cultura de criatividade",
      description: "Trilhas de microtreinamento, desafios semanais e gamificação com ranking e medalhas.",
      items: [
        "Trilhas de microtreinamento em inovação",
        "Desafios semanais com votação interna", 
        "Gamificação com ranking e recompensas",
        "Biblioteca de conteúdo atualizada"
      ],
      image: teamInnovation,
      imageAlt: "Equipe inovando em reunião colaborativa"
    },
    {
      category: "💬 Feedback e Clima",
      title: "Escute sua equipe de verdade",
      description: "Pesquisas rápidas, feedback 360° e análise de engajamento com dashboards intuitivos.",
      items: [
        "Pesquisas rápidas de clima (pulse surveys)",
        "Feedback 360° entre pares e líderes",
        "Painel de humor com emojis",
        "Análise de engajamento com alertas"
      ],
      image: feedbackEngagement,
      imageAlt: "Equipe engajada dando feedback positivo"
    }
  ];

  return (
    <section id="features" className="py-20 px-4">
      <div className="container mx-auto">
        <div className="text-center space-y-4 mb-16">
          <h2 className="text-4xl font-bold">
            Funcionalidades que{" "}
            <span className="bg-gradient-innovation bg-clip-text text-transparent">
              transformam
            </span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Ferramentas completas para inovação, feedback e reformulação de processos
          </p>
        </div>
        
        <div className="space-y-20">
          {features.map((feature, index) => (
            <div key={index} className={`grid lg:grid-cols-2 gap-12 items-center ${index % 2 === 1 ? 'lg:flex-row-reverse' : ''}`}>
              <div className={`space-y-6 ${index % 2 === 1 ? 'lg:order-2' : ''}`}>
                <div className="space-y-4">
                  <span className="text-primary font-semibold text-lg">
                    {feature.category}
                  </span>
                  <h3 className="text-3xl font-bold">
                    {feature.title}
                  </h3>
                  <p className="text-lg text-muted-foreground">
                    {feature.description}
                  </p>
                </div>
                
                <Card className="bg-gradient-card border-0 shadow-card">
                  <CardHeader>
                    <CardTitle className="text-xl">Principais recursos:</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    {feature.items.map((item, itemIndex) => (
                      <div key={itemIndex} className="flex items-center space-x-3">
                        <span className="text-accent font-bold">✓</span>
                        <span>{item}</span>
                      </div>
                    ))}
                  </CardContent>
                </Card>
              </div>
              
              <div className={`relative ${index % 2 === 1 ? 'lg:order-1' : ''}`}>
                <div className="relative rounded-2xl overflow-hidden shadow-hero">
                  <img 
                    src={feature.image} 
                    alt={feature.imageAlt}
                    className="w-full h-auto"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-primary/10 to-transparent"></div>
                </div>
                
                <div className={`absolute w-64 h-64 rounded-full blur-3xl ${
                  index % 2 === 0 
                    ? '-top-8 -right-8 bg-primary/10' 
                    : '-bottom-8 -left-8 bg-secondary/10'
                }`}></div>
              </div>
            </div>
          ))}
        </div>
        
        <div className="mt-16 text-center">
          <Card className="bg-gradient-hero border-0 text-primary-foreground max-w-4xl mx-auto">
            <CardContent className="p-12 space-y-6">
              <h3 className="text-2xl font-bold">
                🔄 Reformulação de Tarefas e Processos
              </h3>
              <p className="text-lg opacity-90">
                Mural colaborativo de sugestões, votação interna para priorizar mudanças 
                e redistribuição inteligente de tarefas baseada em feedback real da equipe.
              </p>
              <div className="grid md:grid-cols-3 gap-6 mt-8">
                <div className="text-center space-y-2">
                  <div className="text-3xl">💡</div>
                  <div className="font-semibold">Mural de Ideias</div>
                </div>
                <div className="text-center space-y-2">
                  <div className="text-3xl">🗳️</div>
                  <div className="font-semibold">Votação Interna</div>
                </div>
                <div className="text-center space-y-2">
                  <div className="text-3xl">⚖️</div>
                  <div className="font-semibold">Redistribuição</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default Features;