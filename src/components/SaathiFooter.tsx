import { Heart, Shield, Clock, Users } from "lucide-react";

const SaathiFooter = () => {
  const features = [
    {
      icon: Shield,
      title: "100% Confidential",
      description: "Your conversations are completely private and secure"
    },
    {
      icon: Clock,
      title: "Available 24/7", 
      description: "Whenever you need support, I'm here for you"
    },
    {
      icon: Users,
      title: "Culturally Aware",
      description: "Understanding the unique challenges of Indian youth"
    },
    {
      icon: Heart,
      title: "Non-Judgmental",
      description: "A safe space free from criticism or judgment"
    }
  ];

  return (
    <footer id="about" className="py-20 px-4 bg-muted/20 border-t border-border/50">
      <div className="max-w-6xl mx-auto">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {features.map((feature, index) => (
            <div key={index} className="text-center space-y-3">
              <div className="w-12 h-12 saathi-gradient-accent rounded-full flex items-center justify-center mx-auto">
                <feature.icon className="h-6 w-6 text-accent-foreground" />
              </div>
              <h3 className="font-semibold text-foreground">{feature.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
        
        <div className="text-center space-y-6 pt-12 border-t border-border/50">
          <div className="space-y-2">
            <h3 className="text-2xl font-bold text-foreground">
              Remember: You're Not Alone
            </h3>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              If you're experiencing thoughts of self-harm or need immediate help, 
              please reach out to a trusted adult, counselor, or call a mental health helpline.
            </p>
          </div>
          
          <div className="saathi-card p-6 max-w-md mx-auto">
            <p className="text-sm text-center text-muted-foreground">
              <strong>Emergency Resources:</strong><br />
              KIRAN Mental Health Helpline: 1800-599-0019<br />
              Sneha Suicide Prevention: 044-2464-0050
            </p>
          </div>
          
          <div className="pt-6">
            <p className="text-xs text-muted-foreground">
              Saathi is an AI companion designed to provide emotional support. 
              It is not a replacement for professional mental health care.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default SaathiFooter;