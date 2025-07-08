import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Benefits from "@/components/Benefits";
import Features from "@/components/Features";
import Pricing from "@/components/Pricing";
import Results from "@/components/Results";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <Hero />
      <Benefits />
      <Features />
      <Results />
      <Pricing />
      <Footer />
    </div>
  );
};

export default Index;
