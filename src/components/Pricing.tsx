import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const Pricing = () => {
  const plans = [
    {
      name: "Free",
      price: "R$ 0",
      period: "Grátis para sempre",
      description: "Perfeito para experimentar nossa plataforma",
      features: [
        "1 trilha de microtreinamento",
        "1 pesquisa de clima por mês",
        "Dashboard básico",
        "Até 10 usuários",
        "Suporte por email"
      ],
      button: "Começar Grátis",
      variant: "outline" as const,
      popular: false
    },
    {
      name: "Pro",
      price: "R$ 49",
      period: "por usuário/mês",
      description: "Para equipes que querem transformar sua cultura",
      features: [
        "Acesso completo a trilhas",
        "Pesquisas ilimitadas de clima",
        "Feedback 360° completo",
        "Mural de sugestões",
        "Dashboard avançado",
        "Gamificação completa",
        "Usuários ilimitados",
        "Suporte prioritário"
      ],
      button: "Testar Pro",
      variant: "hero" as const,
      popular: true
    },
    {
      name: "Enterprise",
      price: "Sob consulta",
      period: "Personalizado",
      description: "Para grandes empresas com necessidades específicas",
      features: [
        "Tudo do Pro",
        "Personalização completa",
        "Integração com RH/ERP",
        "SSO e segurança avançada",
        "Suporte dedicado",
        "Consultoria especializada",
        "Onboarding personalizado",
        "SLA garantido"
      ],
      button: "Falar com Vendas",
      variant: "secondary" as const,
      popular: false
    }
  ];

  return (
    <section id="pricing" className="py-20 px-4 bg-muted/30">
      <div className="container mx-auto">
        <div className="text-center space-y-4 mb-16">
          <h2 className="text-4xl font-bold">
            Planos para todos os{" "}
            <span className="bg-gradient-innovation bg-clip-text text-transparent">
              tamanhos de equipe
            </span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Comece grátis e evolua conforme sua empresa cresce
          </p>
        </div>
        
        <div className="grid lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {plans.map((plan, index) => (
            <Card key={index} className={`relative ${plan.popular ? 'ring-2 ring-primary shadow-hero scale-105' : 'shadow-card'} bg-gradient-card border-0 transition-all duration-300 hover:shadow-hero`}>
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <span className="bg-gradient-hero text-primary-foreground px-4 py-2 rounded-full text-sm font-semibold">
                    ⭐ Mais Popular
                  </span>
                </div>
              )}
              
              <CardHeader className="text-center space-y-4 pb-8">
                <CardTitle className="text-2xl font-bold">{plan.name}</CardTitle>
                <div className="space-y-2">
                  <div className="text-4xl font-bold text-primary">{plan.price}</div>
                  <div className="text-muted-foreground">{plan.period}</div>
                </div>
                <p className="text-muted-foreground">{plan.description}</p>
              </CardHeader>
              
              <CardContent className="space-y-6">
                <ul className="space-y-3">
                  {plan.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-center space-x-3">
                      <span className="text-accent font-bold">✓</span>
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
                
                <Button 
                  variant={plan.variant} 
                  className="w-full py-6 text-lg font-semibold"
                >
                  {plan.button}
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
        
        <div className="text-center mt-16 space-y-4">
          <p className="text-muted-foreground">
            Todas as assinaturas incluem teste gratuito de 14 dias
          </p>
          <div className="flex justify-center items-center space-x-8 text-sm text-muted-foreground">
            <div className="flex items-center space-x-2">
              <span className="text-accent">🔒</span>
              <span>Pagamento seguro</span>
            </div>
            <div className="flex items-center space-x-2">
              <span className="text-accent">📞</span>
              <span>Suporte brasileiro</span>
            </div>
            <div className="flex items-center space-x-2">
              <span className="text-accent">❌</span>
              <span>Cancele quando quiser</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Pricing;