import { Card, CardContent } from "@/components/ui/card";

const Results = () => {
  const stats = [
    {
      icon: "📊",
      value: "+30%",
      label: "Engajamento",
      description: "em 3 meses"
    },
    {
      icon: "💼",
      value: "64%",
      label: "Redução Turnover",
      description: "menos rotatividade"
    },
    {
      icon: "🚀",
      value: "5min",
      label: "Setup",
      description: "para começar"
    },
    {
      icon: "⭐",
      value: "4.9/5",
      label: "Satisfação",
      description: "dos usuários"
    }
  ];

  return (
    <section className="py-20 px-4">
      <div className="container mx-auto">
        <div className="text-center space-y-4 mb-16">
          <h2 className="text-4xl font-bold">
            Resultados que você pode{" "}
            <span className="bg-gradient-innovation bg-clip-text text-transparent">
              esperar
            </span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Empresas que usam InovaPulse veem transformações reais em engajamento e produtividade
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          {stats.map((stat, index) => (
            <Card key={index} className="text-center bg-gradient-card border-0 shadow-card hover:shadow-hero transition-all duration-300">
              <CardContent className="p-8 space-y-4">
                <div className="text-4xl">{stat.icon}</div>
                <div className="text-3xl font-bold text-primary">{stat.value}</div>
                <div className="space-y-1">
                  <div className="font-semibold">{stat.label}</div>
                  <div className="text-sm text-muted-foreground">{stat.description}</div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
        
        <Card className="bg-gradient-hero border-0 text-primary-foreground">
          <CardContent className="p-12 text-center space-y-6">
            <h3 className="text-3xl font-bold">
              🎯 Para quem é o InovaPulse?
            </h3>
            <div className="grid md:grid-cols-3 gap-8 mt-8">
              <div className="space-y-4">
                <div className="text-4xl">🏢</div>
                <h4 className="text-xl font-semibold">PMEs Inovadoras</h4>
                <p className="opacity-90">
                  Pequenas e médias empresas que querem se destacar através da inovação
                </p>
              </div>
              <div className="space-y-4">
                <div className="text-4xl">👥</div>
                <h4 className="text-xl font-semibold">RHs e Líderes</h4>
                <p className="opacity-90">
                  Profissionais de gestão de pessoas e cultura organizacional
                </p>
              </div>
              <div className="space-y-4">
                <div className="text-4xl">🔄</div>
                <h4 className="text-xl font-semibold">Consultorias</h4>
                <p className="opacity-90">
                  Empresas de transformação digital e melhoria de processos
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
};

export default Results;