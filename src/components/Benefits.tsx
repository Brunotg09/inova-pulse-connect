import { Card, CardContent } from "@/components/ui/card";

const Benefits = () => {
  const benefits = [
    {
      icon: "🎯",
      title: "Cultura de Inovação",
      description: "Microtreinamentos e desafios que estimulam a criatividade e inovação em toda a equipe"
    },
    {
      icon: "💬",
      title: "Escuta Ativa",
      description: "Pesquisas de clima e feedback 360° para entender verdadeiramente sua equipe"
    },
    {
      icon: "🔄",
      title: "Reformulação Inteligente",
      description: "Redistribua tarefas e processos com base em dados reais e feedback contínuo"
    },
    {
      icon: "📈",
      title: "Engajamento Real",
      description: "Aumente a satisfação, reduza o turnover e crie times mais produtivos"
    }
  ];

  return (
    <section className="py-20 px-4 bg-muted/30">
      <div className="container mx-auto">
        <div className="text-center space-y-4 mb-16">
          <h2 className="text-4xl font-bold">
            Por que usar o{" "}
            <span className="bg-gradient-innovation bg-clip-text text-transparent">
              InovaPulse
            </span>
            ?
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Transformamos a gestão de pessoas através de inovação, feedback e engajamento real
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {benefits.map((benefit, index) => (
            <Card key={index} className="relative group hover:shadow-card transition-all duration-300 bg-gradient-card border-0">
              <CardContent className="p-8 text-center space-y-4">
                <div className="text-4xl mb-4 group-hover:scale-110 transition-transform duration-300">
                  {benefit.icon}
                </div>
                <h3 className="text-xl font-semibold">
                  {benefit.title}
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  {benefit.description}
                </p>
              </CardContent>
              <div className="absolute inset-0 bg-gradient-hero opacity-0 group-hover:opacity-5 rounded-lg transition-opacity duration-300"></div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Benefits;