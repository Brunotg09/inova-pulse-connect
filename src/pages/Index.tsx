import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Benefits from "@/components/Benefits";
import Features from "@/components/Features";
import Pricing from "@/components/Pricing";
import Results from "@/components/Results";
import Footer from "@/components/Footer";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Building2, ArrowRight } from "lucide-react";

const Index = () => {
  // Empresas demo para demonstração
  const demoCompanies = [
    {
      name: 'InovaTech Solutions',
      slug: 'inovatech',
      description: 'Empresa de tecnologia focada em inovação',
      logo: '🚀',
      employees: 120
    },
    {
      name: 'TechCorp Brasil',
      slug: 'techcorp',
      description: 'Líder em transformação digital',
      logo: '⚡',
      employees: 85
    },
    {
      name: 'Demo Company',
      slug: 'demo',
      description: 'Empresa de demonstração',
      logo: '🎯',
      employees: 25
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <Hero />
      <Benefits />
      <Features />
      
      {/* Seção de empresas demo */}
      <section className="py-20 px-4 bg-muted/30">
        <div className="container mx-auto">
          <div className="text-center space-y-4 mb-16">
            <h2 className="text-4xl font-bold">
              Explore empresas{" "}
              <span className="bg-gradient-innovation bg-clip-text text-transparent">
                de demonstração
              </span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Veja como diferentes empresas usam o InovaPulse para transformar sua cultura organizacional
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {demoCompanies.map((company) => (
              <Card key={company.slug} className="hover:shadow-lg transition-all duration-300 bg-gradient-card border-0">
                <CardHeader className="text-center">
                  <div className="text-4xl mb-4">{company.logo}</div>
                  <CardTitle className="text-xl">{company.name}</CardTitle>
                  <CardDescription>{company.description}</CardDescription>
                </CardHeader>
                <CardContent className="text-center space-y-4">
                  <div className="flex items-center justify-center space-x-2 text-sm text-muted-foreground">
                    <Building2 className="h-4 w-4" />
                    <span>{company.employees} colaboradores</span>
                  </div>
                  <Button variant="hero" className="w-full" asChild>
                    <Link to={`/${company.slug}`}>
                      Explorar {company.name}
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
      
      <Results />
      <Pricing />
      <Footer />
    </div>
  );
};

export default Index;
