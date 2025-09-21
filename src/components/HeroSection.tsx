import { Button } from "@/components/ui/button";
import { MessageCircle, Heart, Sparkles } from "lucide-react";
import heroImage from "@/assets/saathi-hero.jpg";

interface HeroSectionProps {
  onStartChat: () => void;
}

const HeroSection = ({ onStartChat }: HeroSectionProps) => {
  return (
    <section className="relative py-20 px-4 overflow-hidden">
      <div className="absolute inset-0 saathi-gradient-warm opacity-50"></div>
      
      <div className="max-w-6xl mx-auto relative z-10">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="space-y-8">
            <div className="space-y-4">
              <div className="inline-flex items-center space-x-2 bg-accent/50 rounded-full px-4 py-2">
                <Sparkles className="h-4 w-4 text-accent-foreground" />
                <span className="text-sm font-medium text-accent-foreground">
                  Safe • Confidential • Caring
                </span>
              </div>
              
              <h1 className="text-5xl md:text-6xl font-bold leading-tight">
                <span className="text-foreground">Your trusted</span>{" "}
                <span className="text-transparent bg-clip-text saathi-gradient-primary">
                  companion
                </span>{" "}
                <span className="text-foreground">for emotional well-being</span>
              </h1>
              
              <p className="text-xl text-muted-foreground leading-relaxed">
                I'm Saathi - here to listen, support, and walk alongside you through 
                life's ups and downs. No judgment, just understanding and care.
              </p>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <Button variant="saathi" size="lg" className="group" onClick={onStartChat}>
                <MessageCircle className="mr-2 h-5 w-5 group-hover:scale-110 transition-transform" />
                Start Chatting
              </Button>
              <Button variant="saathi_secondary" size="lg" onClick={() => document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' })}>
                <Heart className="mr-2 h-4 w-4" />
                Learn More
              </Button>
            </div>
            
            <div className="pt-8 border-t border-border/50">
              <p className="text-sm text-muted-foreground">
                ✨ Designed specifically for Indian youth • Available 24/7 • Completely confidential
              </p>
            </div>
          </div>
          
          <div className="relative">
            <div className="saathi-card p-8 overflow-hidden">
              <img 
                src={heroImage} 
                alt="Peaceful sunrise representing hope and new beginnings"
                className="w-full h-80 object-cover rounded-xl"
              />
            </div>
            <div className="absolute -top-4 -right-4 saathi-gradient-accent p-3 rounded-full">
              <Heart className="h-6 w-6 text-accent-foreground" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;