import { Button } from "@/components/ui/button";

const Footer = () => {
  return (
    <footer className="bg-foreground text-background">
      <div className="container mx-auto px-4 py-16">
        <div className="grid lg:grid-cols-4 gap-12">
          <div className="lg:col-span-2 space-y-6">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-hero rounded-lg flex items-center justify-center">
                <span className="text-primary-foreground font-bold text-lg">🚀</span>
              </div>
              <span className="font-bold text-2xl">InovaPulse</span>
            </div>
            
            <p className="text-lg text-background/80 max-w-md">
              Transforme sua empresa com inovação, escuta ativa e engajamento real. 
              Crie um ambiente onde a inovação nasce de dentro.
            </p>
            
            <div className="space-y-4">
              <h4 className="font-semibold text-lg">Comece agora:</h4>
              <Button variant="hero" size="lg" className="w-full sm:w-auto">
                🚀 Solicitar Acesso Antecipado
              </Button>
            </div>
          </div>
          
          <div className="space-y-6">
            <h4 className="font-semibold text-lg">Plataforma</h4>
            <ul className="space-y-3 text-background/80">
              <li><a href="#features" className="hover:text-background transition-colors">Funcionalidades</a></li>
              <li><a href="#pricing" className="hover:text-background transition-colors">Preços</a></li>
              <li><a href="#" className="hover:text-background transition-colors">Integrações</a></li>
              <li><a href="#" className="hover:text-background transition-colors">API</a></li>
              <li><a href="#" className="hover:text-background transition-colors">Segurança</a></li>
            </ul>
          </div>
          
          <div className="space-y-6">
            <h4 className="font-semibold text-lg">Suporte</h4>
            <ul className="space-y-3 text-background/80">
              <li><a href="#" className="hover:text-background transition-colors">Central de Ajuda</a></li>
              <li><a href="#" className="hover:text-background transition-colors">Documentação</a></li>
              <li><a href="#" className="hover:text-background transition-colors">Contato</a></li>
              <li><a href="#" className="hover:text-background transition-colors">Status</a></li>
              <li><a href="#" className="hover:text-background transition-colors">Comunidade</a></li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-background/20 mt-16 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="text-background/60">
              © 2024 InovaPulse. Todos os direitos reservados.
            </div>
            
            <div className="flex items-center space-x-6 text-background/60">
              <a href="#" className="hover:text-background transition-colors">Privacidade</a>
              <a href="#" className="hover:text-background transition-colors">Termos</a>
              <a href="#" className="hover:text-background transition-colors">Cookies</a>
            </div>
          </div>
          
          <div className="mt-8 text-center text-background/40 text-sm">
            🇧🇷 Desenvolvido no Brasil com ❤️ para transformar empresas através da inovação
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;