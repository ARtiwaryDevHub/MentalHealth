import { Heart } from "lucide-react";

const SaathiHeader = () => {
  return (
    <header className="w-full py-6 px-4 bg-background/80 backdrop-blur-sm border-b border-border/50">
      <div className="max-w-6xl mx-auto flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="p-2 saathi-gradient-primary rounded-xl">
            <Heart className="h-6 w-6 text-white" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-foreground">Saathi</h1>
            <p className="text-xs text-muted-foreground">Your caring companion</p>
          </div>
        </div>
        
        <nav className="hidden md:flex items-center space-x-6">
          <a href="#chat" className="text-muted-foreground hover:text-primary transition-colors">
            Chat
          </a>
          <a href="#tools" className="text-muted-foreground hover:text-primary transition-colors">
            Tools
          </a>
          <a href="#resources" className="text-muted-foreground hover:text-primary transition-colors">
            Resources
          </a>
        </nav>
      </div>
    </header>
  );
};

export default SaathiHeader;