import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <header className="fixed top-0 w-full bg-background/80 backdrop-blur-md border-b border-border z-50">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 bg-gradient-hero rounded-lg flex items-center justify-center">
            <span className="text-primary-foreground font-bold text-lg">🚀</span>
          </div>
          <span className="font-bold text-xl bg-gradient-innovation bg-clip-text text-transparent">
            InovaPulse
          </span>
        </div>
        
        <nav className="hidden md:flex items-center space-x-8">
          <a href="#features" className="text-muted-foreground hover:text-foreground transition-colors">
            Funcionalidades
          </a>
          <a href="#pricing" className="text-muted-foreground hover:text-foreground transition-colors">
            Preços
          </a>
          <a href="#about" className="text-muted-foreground hover:text-foreground transition-colors">
            Sobre
          </a>
        </nav>
        
        <div className="flex items-center space-x-4">
          <Button variant="ghost" className="hidden md:inline-flex" asChild>
            <Link to="/login">
            Login
            </Link>
          </Button>
          <Button variant="hero" asChild>
            <Link to="/register">
            Acesso Antecipado
            </Link>
          </Button>
        </div>
      </div>
    </header>
  );
};

export default Header;