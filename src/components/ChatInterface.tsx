import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Send, Bot, User } from "lucide-react";

interface Message {
  id: string;
  content: string;
  sender: "user" | "saathi";
  timestamp: Date;
}

const ChatInterface = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      content: "Namaste! I'm Saathi, your caring companion. I'm here to listen and support you through whatever you're experiencing. How are you feeling today? 💙",
      sender: "saathi",
      timestamp: new Date(),
    }
  ]);
  const [inputValue, setInputValue] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const generateSaathiResponse = (userMessage: string): string => {
    const responses = {
      greeting: [
        "Thank you for sharing with me. It's completely okay to feel whatever you're experiencing right now. Would you like to tell me more about what's been on your mind?",
        "I hear you, and I want you to know that your feelings are completely valid. This is a safe space where you can express anything. What's been weighing on your heart lately?",
        "I'm really glad you're here and opening up. Sometimes just talking about what we're feeling can help. Can you share a bit more about what's been affecting you?"
      ],
      stress: [
        "Stress can feel overwhelming, especially with all the pressures you might be facing. It's completely normal to feel this way. Have you been able to take any breaks for yourself recently?",
        "I understand that stress can make everything feel harder. You're not alone in feeling this way. Would it help to talk about what's causing the most stress right now?",
        "Stress is something many people your age experience, especially with academic and social pressures. What do you think would help you feel a bit more at peace right now?"
      ],
      family: [
        "Family relationships can be really complex and emotionally challenging. It sounds like you're dealing with something difficult. Your feelings about this are completely valid.",
        "I can sense that family dynamics are affecting you. It's okay to have complicated feelings about family - many people do. Would you like to share more about what's happening?",
        "Family expectations and relationships can create a lot of pressure. It's important to remember that your feelings matter too. What's been the hardest part for you?"
      ],
      exam: [
        "Exam pressure is something so many students face, and it can feel really intense. Remember that your worth isn't defined by your grades. How are you taking care of yourself during this stressful time?",
        "Board exams and academic pressure can feel overwhelming. It's completely understandable to feel stressed. Are you getting enough sleep and taking breaks when you need them?",
        "The pressure around exams can be really tough, especially with everyone's expectations. You're doing your best, and that's what matters. What would help you feel more supported right now?"
      ],
      default: [
        "Thank you for sharing that with me. I can hear that this is important to you. Your feelings are completely valid, and I'm here to listen. Would you like to explore this more?",
        "I appreciate you opening up about this. It takes courage to share our feelings. How long have you been feeling this way?",
        "What you're experiencing sounds really meaningful to you. I'm here to support you through this. Is there anything specific you'd like help with?"
      ]
    };

    const lowerMessage = userMessage.toLowerCase();
    
    if (lowerMessage.includes("hello") || lowerMessage.includes("hi") || lowerMessage.includes("hey")) {
      return responses.greeting[Math.floor(Math.random() * responses.greeting.length)];
    } else if (lowerMessage.includes("stress") || lowerMessage.includes("overwhelm") || lowerMessage.includes("pressure")) {
      return responses.stress[Math.floor(Math.random() * responses.stress.length)];
    } else if (lowerMessage.includes("family") || lowerMessage.includes("parents") || lowerMessage.includes("mom") || lowerMessage.includes("dad")) {
      return responses.family[Math.floor(Math.random() * responses.family.length)];
    } else if (lowerMessage.includes("exam") || lowerMessage.includes("study") || lowerMessage.includes("school") || lowerMessage.includes("grade")) {
      return responses.exam[Math.floor(Math.random() * responses.exam.length)];
    } else {
      return responses.default[Math.floor(Math.random() * responses.default.length)];
    }
  };

  const handleSendMessage = async () => {
    if (!inputValue.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      content: inputValue,
      sender: "user",
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue("");
    setIsTyping(true);

    // Simulate Saathi thinking and responding
    setTimeout(() => {
      const saathiResponse: Message = {
        id: (Date.now() + 1).toString(),
        content: generateSaathiResponse(inputValue),
        sender: "saathi",
        timestamp: new Date(),
      };

      setMessages(prev => [...prev, saathiResponse]);
      setIsTyping(false);
    }, 2000 + Math.random() * 1000);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="saathi-card overflow-hidden">
        <div className="p-6 border-b border-border/50 saathi-gradient-warm">
          <div className="flex items-center space-x-3">
            <div className="p-2 saathi-gradient-primary rounded-full">
              <Bot className="h-5 w-5 text-white" />
            </div>
            <div>
              <h2 className="text-xl font-semibold text-foreground">Chat with Saathi</h2>
              <p className="text-sm text-muted-foreground">A safe, confidential space to share your feelings</p>
            </div>
          </div>
        </div>

        <div className="h-96 overflow-y-auto p-6 space-y-4">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex ${message.sender === "user" ? "justify-end" : "justify-start"}`}
            >
              <div className={`flex items-start space-x-3 max-w-[80%] ${
                message.sender === "user" ? "flex-row-reverse space-x-reverse" : ""
              }`}>
                <div className={`p-2 rounded-full ${
                  message.sender === "user" 
                    ? "saathi-gradient-secondary" 
                    : "saathi-gradient-primary"
                }`}>
                  {message.sender === "user" ? (
                    <User className="h-4 w-4 text-secondary-foreground" />
                  ) : (
                    <Bot className="h-4 w-4 text-white" />
                  )}
                </div>
                <div className={`p-4 rounded-2xl ${
                  message.sender === "user"
                    ? "saathi-gradient-secondary text-secondary-foreground"
                    : "bg-accent text-accent-foreground"
                }`}>
                  <p className="text-sm leading-relaxed">{message.content}</p>
                  <p className="text-xs opacity-70 mt-2">
                    {message.timestamp.toLocaleTimeString()}
                  </p>
                </div>
              </div>
            </div>
          ))}
          
          {isTyping && (
            <div className="flex justify-start">
              <div className="flex items-start space-x-3 max-w-[80%]">
                <div className="p-2 saathi-gradient-primary rounded-full">
                  <Bot className="h-4 w-4 text-white" />
                </div>
                <div className="bg-accent text-accent-foreground p-4 rounded-2xl">
                  <div className="flex space-x-1">
                    <div className="w-2 h-2 bg-primary rounded-full animate-bounce"></div>
                    <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{animationDelay: "0.1s"}}></div>
                    <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{animationDelay: "0.2s"}}></div>
                  </div>
                </div>
              </div>
            </div>
          )}
          
          <div ref={messagesEndRef} />
        </div>

        <div className="p-6 border-t border-border/50">
          <div className="flex items-center space-x-3">
            <textarea
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Share what's on your mind... I'm here to listen 💙"
              className="flex-1 min-h-[80px] p-4 bg-muted/50 rounded-xl border border-border/50 resize-none focus:outline-none focus:ring-2 focus:ring-primary/50"
              disabled={isTyping}
            />
            <Button
              variant="saathi"
              onClick={handleSendMessage}
              disabled={!inputValue.trim() || isTyping}
              className="self-end"
            >
              <Send className="h-4 w-4" />
            </Button>
          </div>
          
          <div className="mt-4 p-3 saathi-gradient-warm rounded-lg">
            <p className="text-xs text-center text-muted-foreground">
              💫 Remember: This is a judgment-free space. If you need immediate help, please contact a mental health professional or crisis helpline.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatInterface;