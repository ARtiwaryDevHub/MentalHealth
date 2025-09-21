import { Button } from "@/components/ui/button";
import { Wind, BookOpen, Quote, Heart } from "lucide-react";

interface QuickToolsProps {
  onToolSelect: (tool: string) => void;
}

const QuickTools = ({ onToolSelect }: QuickToolsProps) => {
  const tools = [
    {
      icon: Wind,
      title: "Breathing Exercise",
      description: "Calm your mind with guided breathing",
      action: "Try 4-7-8 breathing",
      gradient: "saathi-gradient-primary",
      id: "breathing"
    },
    {
      icon: BookOpen,
      title: "Journal Prompt",
      description: "Express your feelings through writing",
      action: "Start journaling", 
      gradient: "saathi-gradient-secondary",
      id: "journal"
    },
    {
      icon: Quote,
      title: "Daily Affirmation",
      description: "Positive words to lift your spirits",
      action: "Get inspiration",
      gradient: "saathi-gradient-accent",
      id: "affirmations"
    },
    {
      icon: Heart,
      title: "Self-Care Reminder",
      description: "Gentle nudges to take care of yourself",
      action: "Practice self-love",
      gradient: "saathi-gradient-warm",
      id: "selfcare"
    }
  ];

  return (
    <section className="py-20 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="text-center space-y-4 mb-16">
          <h2 className="text-4xl font-bold text-foreground">
            Quick Tools for Your Well-being
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Sometimes you need just a moment of peace. These tools are here whenever you need them.
          </p>
        </div>
        
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {tools.map((tool, index) => (
            <div key={index} className="saathi-card p-6 hover:shadow-[var(--shadow-warm)] transition-all duration-300 group cursor-pointer" onClick={() => onToolSelect(tool.id)}>
              <div className={`w-12 h-12 ${tool.gradient} rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                <tool.icon className="h-6 w-6 text-white" />
              </div>
              
              <h3 className="text-lg font-semibold text-foreground mb-2">
                {tool.title}
              </h3>
              
              <p className="text-muted-foreground text-sm mb-4 leading-relaxed">
                {tool.description}
              </p>
              
              <Button 
                variant="saathi_ghost" 
                className="w-full justify-start p-0 h-auto font-medium"
                onClick={(e) => {
                  e.stopPropagation();
                  onToolSelect(tool.id);
                }}
              >
                {tool.action} →
              </Button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default QuickTools;