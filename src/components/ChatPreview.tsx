import { MessageCircle, Send } from "lucide-react";
import { Button } from "@/components/ui/button";

const ChatPreview = () => {
  const messages = [
    {
      type: "saathi",
      content: "Hi there! I'm Saathi. How are you feeling today? Remember, this is a safe space where you can share anything that's on your mind. 💙"
    },
    {
      type: "user", 
      content: "I've been feeling quite overwhelmed with my board exams coming up. My parents have such high expectations..."
    },
    {
      type: "saathi",
      content: "I hear you, and what you're feeling is completely valid. Board exam pressure, especially with family expectations, can feel really heavy. You're not alone in feeling this way. Would you like to talk more about what specifically feels most overwhelming right now?"
    }
  ];

  return (
    <section className="py-20 px-4 bg-muted/30">
      <div className="max-w-4xl mx-auto">
        <div className="text-center space-y-4 mb-12">
          <h2 className="text-4xl font-bold text-foreground">
            A Conversation That Understands
          </h2>
          <p className="text-xl text-muted-foreground">
            See how Saathi provides gentle, non-judgmental support
          </p>
        </div>
        
        <div className="saathi-card p-8 max-w-2xl mx-auto">
          <div className="flex items-center space-x-3 mb-6 pb-4 border-b border-border/50">
            <div className="p-2 saathi-gradient-primary rounded-full">
              <MessageCircle className="h-5 w-5 text-white" />
            </div>
            <div>
              <h3 className="font-semibold text-foreground">Chat with Saathi</h3>
              <p className="text-xs text-muted-foreground">Always here to listen</p>
            </div>
          </div>
          
          <div className="space-y-4 mb-6">
            {messages.map((message, index) => (
              <div key={index} className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[80%] p-4 rounded-2xl ${
                  message.type === 'user' 
                    ? 'saathi-gradient-secondary text-secondary-foreground' 
                    : 'bg-accent text-accent-foreground'
                }`}>
                  <p className="text-sm leading-relaxed">{message.content}</p>
                </div>
              </div>
            ))}
          </div>
          
          <div className="flex items-center space-x-3 p-3 bg-muted/50 rounded-xl">
            <input 
              type="text" 
              placeholder="Share what's on your mind..."
              className="flex-1 bg-transparent border-none outline-none text-sm placeholder:text-muted-foreground"
              disabled
            />
            <Button variant="saathi" size="sm">
              <Send className="h-4 w-4" />
            </Button>
          </div>
          
          <div className="mt-6 p-4 saathi-gradient-warm rounded-xl">
            <p className="text-sm text-center text-muted-foreground">
              💫 This is just a preview. Start your real conversation above!
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ChatPreview;