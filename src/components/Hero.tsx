import { Button } from "@/components/ui/button";
import heroDashboard from "@/assets/hero-dashboard.jpg";

const Hero = () => {
  return (
    <section className="pt-24 pb-12 px-4">
      <div className="container mx-auto">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-8">
            <div className="space-y-4">
              <h1 className="text-5xl lg:text-6xl font-bold leading-tight">
                Transforme sua empresa com{" "}
                <span className="bg-gradient-innovation bg-clip-text text-transparent">
                  inovação
                </span>
                {" "}e{" "}
                <span className="bg-gradient-innovation bg-clip-text text-transparent">
                  engajamento
                </span>
              </h1>
              
              <p className="text-xl text-muted-foreground leading-relaxed">
                InovaPulse ajuda empresas a cultivar uma cultura de inovação, 
                melhorar o clima organizacional e reformular processos com 
                base em feedback contínuo da equipe.
              </p>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <Button variant="hero" size="lg" className="text-lg px-8 py-6">
                🚀 Solicitar Acesso Antecipado
              </Button>
              <Button variant="outline" size="lg" className="text-lg px-8 py-6">
                📺 Ver Demo
              </Button>
            </div>
            
            <div className="flex items-center space-x-8 text-sm text-muted-foreground">
              <div className="flex items-center space-x-2">
                <span className="text-accent">✅</span>
                <span>Setup em 5 minutos</span>
              </div>
              <div className="flex items-center space-x-2">
                <span className="text-accent">✅</span>
                <span>Teste gratuito</span>
              </div>
              <div className="flex items-center space-x-2">
                <span className="text-accent">✅</span>
                <span>Suporte brasileiro</span>
              </div>
            </div>
          </div>
          
          <div className="relative">
            <div className="relative rounded-2xl overflow-hidden shadow-hero">
              <img 
                src={heroDashboard} 
                alt="InovaPulse Dashboard" 
                className="w-full h-auto"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-primary/20 to-transparent"></div>
            </div>
            
            <div className="absolute -top-4 -right-4 w-72 h-72 bg-primary/10 rounded-full blur-3xl"></div>
            <div className="absolute -bottom-8 -left-8 w-96 h-96 bg-secondary/10 rounded-full blur-3xl"></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;