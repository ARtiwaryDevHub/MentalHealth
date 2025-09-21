import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Heart, CheckCircle, Clock, Zap, Coffee, Moon, Smile } from "lucide-react";

const SelfCareReminder = () => {
  const [completedToday, setCompletedToday] = useState<string[]>([]);
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 60000); // Update every minute

    return () => clearInterval(timer);
  }, []);

  const selfCareCategories = [
    {
      name: "Physical Care",
      icon: Zap,
      color: "saathi-gradient-primary",
      activities: [
        { id: "drink-water", name: "Drink a glass of water", duration: "1 min", description: "Stay hydrated for better mood and energy" },
        { id: "stretch", name: "Do some gentle stretches", duration: "5 min", description: "Release tension from your body" },
        { id: "walk", name: "Take a short walk", duration: "10 min", description: "Fresh air and movement boost endorphins" },
        { id: "deep-breaths", name: "Take 10 deep breaths", duration: "2 min", description: "Activate your relaxation response" },
        { id: "healthy-snack", name: "Eat something nourishing", duration: "5 min", description: "Fuel your body with good nutrients" }
      ]
    },
    {
      name: "Emotional Care", 
      icon: Heart,
      color: "saathi-gradient-secondary",
      activities: [
        { id: "gratitude", name: "Write down 3 things you're grateful for", duration: "3 min", description: "Shift focus to positive aspects of life" },
        { id: "self-compassion", name: "Practice self-compassion", duration: "2 min", description: "Treat yourself with kindness" },
        { id: "feelings-check", name: "Check in with your feelings", duration: "3 min", description: "Acknowledge your emotions without judgment" },
        { id: "positive-affirmation", name: "Say something kind to yourself", duration: "1 min", description: "Build a more supportive inner voice" },
        { id: "cry-if-needed", name: "Allow yourself to feel and cry if needed", duration: "As long as you need", description: "Emotional release is healthy and healing" }
      ]
    },
    {
      name: "Mental Care",
      icon: Coffee,
      color: "saathi-gradient-accent", 
      activities: [
        { id: "unplug", name: "Take a break from screens", duration: "15 min", description: "Give your mind a digital detox" },
        { id: "organize", name: "Organize your space for 5 minutes", duration: "5 min", description: "Clear space often leads to clearer mind" },
        { id: "learn-something", name: "Learn something new and fun", duration: "10 min", description: "Keep your mind engaged and curious" },
        { id: "plan-tomorrow", name: "Plan something nice for tomorrow", duration: "5 min", description: "Give yourself something to look forward to" },
        { id: "mindfulness", name: "Practice mindfulness for a few minutes", duration: "5 min", description: "Ground yourself in the present moment" }
      ]
    },
    {
      name: "Social Care",
      icon: Smile,
      color: "saathi-gradient-warm",
      activities: [
        { id: "text-friend", name: "Send a caring message to a friend", duration: "3 min", description: "Connection strengthens both of you" },
        { id: "hug", name: "Give or ask for a hug", duration: "1 min", description: "Physical touch releases oxytocin" },
        { id: "call-family", name: "Call a family member you care about", duration: "10 min", description: "Nurture important relationships" },
        { id: "compliment", name: "Give someone a genuine compliment", duration: "1 min", description: "Spreading kindness boosts your own mood" },
        { id: "alone-time", name: "Enjoy some peaceful alone time", duration: "15 min", description: "Recharge your social energy" }
      ]
    }
  ];

  const toggleActivity = (activityId: string) => {
    setCompletedToday(prev => 
      prev.includes(activityId)
        ? prev.filter(id => id !== activityId)
        : [...prev, activityId]
    );
  };

  const getTimeBasedSuggestions = () => {
    const hour = currentTime.getHours();
    
    if (hour < 9) {
      return {
        title: "Good Morning! 🌅",
        suggestions: ["drink-water", "stretch", "gratitude", "plan-tomorrow"]
      };
    } else if (hour < 12) {
      return {
        title: "Mid-Morning Boost ☀️",
        suggestions: ["walk", "deep-breaths", "learn-something", "organize"]
      };
    } else if (hour < 15) {
      return {
        title: "Afternoon Energy 🌞",
        suggestions: ["healthy-snack", "unplug", "text-friend", "mindfulness"]
      };
    } else if (hour < 18) {
      return {
        title: "Late Afternoon Care 🌤️",
        suggestions: ["feelings-check", "stretch", "compliment", "walk"]
      };
    } else if (hour < 21) {
      return {
        title: "Evening Wind Down 🌆",
        suggestions: ["call-family", "gratitude", "organize", "self-compassion"]
      };
    } else {
      return {
        title: "Nighttime Self-Care 🌙",
        suggestions: ["deep-breaths", "alone-time", "positive-affirmation", "mindfulness"]
      };
    }
  };

  const timeBasedSuggestions = getTimeBasedSuggestions();
  const completedCount = completedToday.length;
  const totalActivities = selfCareCategories.reduce((total, category) => total + category.activities.length, 0);

  return (
    <div className="max-w-6xl mx-auto p-6">
      <div className="text-center space-y-4 mb-8">
        <div className="flex items-center justify-center space-x-3">
          <div className="p-3 saathi-gradient-primary rounded-xl">
            <Heart className="h-6 w-6 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-foreground">Self-Care Reminders</h1>
        </div>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          Small acts of self-care can make a big difference in how you feel. Choose activities that resonate with you today.
        </p>
      </div>

      {/* Progress Overview */}
      <div className="grid md:grid-cols-3 gap-4 mb-8">
        <div className="saathi-card p-6 text-center">
          <div className="text-3xl font-bold text-primary mb-2">{completedCount}</div>
          <p className="text-sm text-muted-foreground">Self-care acts today</p>
        </div>
        
        <div className="saathi-card p-6 text-center">
          <div className="text-3xl font-bold text-primary mb-2">
            {Math.round((completedCount / totalActivities) * 100)}%
          </div>
          <p className="text-sm text-muted-foreground">Care completion</p>
        </div>
        
        <div className="saathi-card p-6 text-center">
          <Clock className="h-8 w-8 text-primary mx-auto mb-2" />
          <p className="text-sm text-muted-foreground">
            {currentTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
          </p>
        </div>
      </div>

      {/* Time-Based Suggestions */}
      <div className="saathi-card p-6 mb-8">
        <h2 className="text-xl font-semibold text-foreground mb-4">{timeBasedSuggestions.title}</h2>
        <p className="text-muted-foreground mb-4">Here are some self-care suggestions perfect for this time of day:</p>
        
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {timeBasedSuggestions.suggestions.map(suggestionId => {
            const activity = selfCareCategories
              .flatMap(cat => cat.activities)
              .find(act => act.id === suggestionId);
            
            if (!activity) return null;

            return (
              <button
                key={activity.id}
                onClick={() => toggleActivity(activity.id)}
                className={`p-4 rounded-xl text-left transition-all ${
                  completedToday.includes(activity.id)
                    ? 'bg-primary/10 border-2 border-primary/50'
                    : 'bg-muted/50 hover:bg-accent/50 border-2 border-transparent'
                }`}
              >
                <div className="flex items-center space-x-2 mb-2">
                  {completedToday.includes(activity.id) ? (
                    <CheckCircle className="h-5 w-5 text-primary" />
                  ) : (
                    <div className="w-5 h-5 border-2 border-muted-foreground/50 rounded-full" />
                  )}
                  <span className="text-xs text-muted-foreground">{activity.duration}</span>
                </div>
                <h3 className="font-medium text-foreground text-sm mb-1">{activity.name}</h3>
                <p className="text-xs text-muted-foreground">{activity.description}</p>
              </button>
            );
          })}
        </div>
      </div>

      {/* All Categories */}
      <div className="grid lg:grid-cols-2 gap-6">
        {selfCareCategories.map((category, categoryIndex) => {
          const Icon = category.icon;
          const completedInCategory = category.activities.filter(activity => 
            completedToday.includes(activity.id)
          ).length;

          return (
            <div key={categoryIndex} className="saathi-card p-6">
              <div className="flex items-center space-x-3 mb-6">
                <div className={`p-3 ${category.color} rounded-xl`}>
                  <Icon className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-foreground">{category.name}</h3>
                  <p className="text-sm text-muted-foreground">
                    {completedInCategory}/{category.activities.length} completed
                  </p>
                </div>
              </div>

              <div className="space-y-3">
                {category.activities.map((activity) => (
                  <button
                    key={activity.id}
                    onClick={() => toggleActivity(activity.id)}
                    className={`w-full p-4 rounded-xl text-left transition-all ${
                      completedToday.includes(activity.id)
                        ? 'bg-primary/10 border-2 border-primary/50'
                        : 'bg-muted/30 hover:bg-accent/50 border-2 border-transparent'
                    }`}
                  >
                    <div className="flex items-start space-x-3">
                      {completedToday.includes(activity.id) ? (
                        <CheckCircle className="h-5 w-5 text-primary mt-1 flex-shrink-0" />
                      ) : (
                        <div className="w-5 h-5 border-2 border-muted-foreground/50 rounded-full mt-1 flex-shrink-0" />
                      )}
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-1">
                          <h4 className="font-medium text-foreground">{activity.name}</h4>
                          <span className="text-xs text-muted-foreground">{activity.duration}</span>
                        </div>
                        <p className="text-sm text-muted-foreground">{activity.description}</p>
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          );
        })}
      </div>

      {/* Encouragement */}
      <div className="mt-8 saathi-gradient-warm p-6 rounded-xl text-center">
        <h3 className="text-lg font-semibold text-foreground mb-3">
          {completedCount === 0 ? "Every journey begins with a single step 🌱" :
           completedCount < 5 ? "You're doing great! Keep going 🌟" :
           completedCount < 10 ? "Wonderful self-care today! 💖" :
           "You're absolutely amazing at self-care! 🌈"}
        </h3>
        <p className="text-sm text-muted-foreground">
          {completedCount === 0 ? "Choose one small act of kindness for yourself right now." :
           "Remember: self-care isn't selfish - it's essential. You deserve this care and attention."}
        </p>
      </div>
    </div>
  );
};

export default SelfCareReminder;