import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Quote, Heart, Shuffle, Bookmark, Share } from "lucide-react";

const DailyAffirmations = () => {
  const [currentAffirmation, setCurrentAffirmation] = useState(0);
  const [favorites, setFavorites] = useState<number[]>([]);
  const [showAll, setShowAll] = useState(false);

  const affirmations = [
    {
      text: "I am enough, exactly as I am right now.",
      category: "Self-Worth",
      context: "Remember that your value isn't determined by achievements or others' opinions."
    },
    {
      text: "It's okay to not have everything figured out. I'm learning and growing every day.",
      category: "Growth",
      context: "Life is a journey of continuous learning. Be patient with yourself."
    },
    {
      text: "My feelings are valid, and it's healthy to express them.",
      category: "Emotions",
      context: "All emotions serve a purpose. You don't have to hide or suppress them."
    },
    {
      text: "I choose to be kind to myself, especially when things are difficult.",
      category: "Self-Compassion",
      context: "Treat yourself with the same kindness you'd show a good friend."
    },
    {
      text: "I have overcome challenges before, and I have the strength to handle what comes next.",
      category: "Resilience",
      context: "Look back at difficult times you've navigated. You're stronger than you know."
    },
    {
      text: "My dreams and goals matter, and I deserve to pursue them.",
      category: "Dreams",
      context: "Your aspirations are valid, no matter how big or small they seem to others."
    },
    {
      text: "I don't need to compare myself to others. My journey is unique and valuable.",
      category: "Comparison",
      context: "Everyone's path is different. Focus on your own growth and progress."
    },
    {
      text: "It's okay to ask for help when I need it. Seeking support shows wisdom and courage.",
      category: "Support",
      context: "Independence doesn't mean doing everything alone. Community and support are strengths."
    },
    {
      text: "I am worthy of love, respect, and kindness - from others and from myself.",
      category: "Self-Love",
      context: "You deserve to be treated well. Start by treating yourself with respect."
    },
    {
      text: "My mistakes don't define me. They are opportunities to learn and grow.",
      category: "Learning",
      context: "Mistakes are part of being human. What matters is how you learn from them."
    },
    {
      text: "I trust my ability to make decisions that are right for me.",
      category: "Confidence",
      context: "You know yourself better than anyone else. Trust your inner wisdom."
    },
    {
      text: "Today offers new possibilities, and I'm open to positive changes.",
      category: "Hope",
      context: "Each day is a fresh start. Approach it with curiosity and openness."
    },
    {
      text: "I'm allowed to set boundaries to protect my energy and well-being.",
      category: "Boundaries",
      context: "Saying 'no' to some things allows you to say 'yes' to what truly matters."
    },
    {
      text: "I celebrate my progress, no matter how small the steps may seem.",
      category: "Progress",
      context: "Small steps consistently taken lead to significant changes over time."
    },
    {
      text: "My mental health matters, and I prioritize taking care of my emotional well-being.",
      category: "Mental Health",
      context: "Your mental health is just as important as your physical health."
    },
    {
      text: "I am resilient, creative, and capable of finding solutions to challenges.",
      category: "Problem-Solving",
      context: "You have more resources and creativity within you than you might realize."
    },
    {
      text: "I choose to focus on what I can control and let go of what I cannot.",
      category: "Acceptance",
      context: "Peace comes from focusing your energy where you can make a difference."
    },
    {
      text: "My voice and opinions matter. I have something valuable to contribute.",
      category: "Voice",
      context: "Your perspective is unique and valuable. Don't be afraid to share it."
    },
    {
      text: "I am patient with myself as I navigate life's ups and downs.",
      category: "Patience",
      context: "Life has natural rhythms. Be gentle with yourself through all phases."
    },
    {
      text: "I choose hope over fear, love over judgment, and growth over perfection.",
      category: "Choice",
      context: "Every moment offers a choice in how you respond to life's situations."
    }
  ];

  // Set random affirmation on component mount
  useEffect(() => {
    const randomIndex = Math.floor(Math.random() * affirmations.length);
    setCurrentAffirmation(randomIndex);
  }, []);

  const getRandomAffirmation = () => {
    let randomIndex;
    do {
      randomIndex = Math.floor(Math.random() * affirmations.length);
    } while (randomIndex === currentAffirmation && affirmations.length > 1);
    setCurrentAffirmation(randomIndex);
  };

  const toggleFavorite = (index: number) => {
    setFavorites(prev => 
      prev.includes(index) 
        ? prev.filter(i => i !== index)
        : [...prev, index]
    );
  };

  const shareAffirmation = () => {
    const affirmation = affirmations[currentAffirmation];
    if (navigator.share) {
      navigator.share({
        title: 'Daily Affirmation from Saathi',
        text: `"${affirmation.text}" - ${affirmation.context}`,
      });
    } else {
      navigator.clipboard.writeText(`"${affirmation.text}" - ${affirmation.context}`);
      // You could add a toast notification here
    }
  };

  const currentAff = affirmations[currentAffirmation];

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="text-center space-y-4 mb-8">
        <div className="flex items-center justify-center space-x-3">
          <div className="p-3 saathi-gradient-primary rounded-xl">
            <Quote className="h-6 w-6 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-foreground">Daily Affirmations</h1>
        </div>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          Positive affirmations can help reshape your inner dialogue and build self-compassion. Take a moment to really let these words sink in.
        </p>
      </div>

      {/* Featured Affirmation */}
      <div className="saathi-card p-8 mb-8">
        <div className="text-center space-y-6">
          <div className="space-y-4">
            <span className="inline-block px-4 py-2 bg-primary/10 text-primary text-sm font-medium rounded-full">
              {currentAff.category}
            </span>
            
            <div className="saathi-gradient-accent p-6 rounded-2xl">
              <Quote className="h-8 w-8 text-accent-foreground mx-auto mb-4 opacity-60" />
              <blockquote className="text-2xl md:text-3xl font-semibold text-foreground leading-relaxed">
                {currentAff.text}
              </blockquote>
            </div>

            <div className="saathi-gradient-warm p-4 rounded-xl max-w-2xl mx-auto">
              <p className="text-sm text-muted-foreground leading-relaxed">
                💭 {currentAff.context}
              </p>
            </div>
          </div>

          <div className="flex items-center justify-center space-x-4">
            <Button variant="saathi" onClick={getRandomAffirmation}>
              <Shuffle className="h-4 w-4 mr-2" />
              New Affirmation
            </Button>
            
            <Button
              variant={favorites.includes(currentAffirmation) ? "saathi" : "saathi_secondary"}
              onClick={() => toggleFavorite(currentAffirmation)}
            >
              <Heart className={`h-4 w-4 mr-2 ${favorites.includes(currentAffirmation) ? 'fill-current' : ''}`} />
              {favorites.includes(currentAffirmation) ? 'Favorited' : 'Favorite'}
            </Button>
            
            <Button variant="saathi_ghost" onClick={shareAffirmation}>
              <Share className="h-4 w-4 mr-2" />
              Share
            </Button>
          </div>
        </div>
      </div>

      {/* Categories & Favorites */}
      <div className="grid md:grid-cols-2 gap-6 mb-8">
        <div className="saathi-card p-6">
          <h3 className="text-lg font-semibold text-foreground mb-4">Categories</h3>
          <div className="flex flex-wrap gap-2">
            {Array.from(new Set(affirmations.map(a => a.category))).map(category => (
              <button
                key={category}
                onClick={() => {
                  const categoryAffirmations = affirmations
                    .map((a, i) => ({ ...a, index: i }))
                    .filter(a => a.category === category);
                  const randomCategoryAff = categoryAffirmations[Math.floor(Math.random() * categoryAffirmations.length)];
                  setCurrentAffirmation(randomCategoryAff.index);
                }}
                className="px-3 py-2 bg-accent/50 hover:bg-accent text-accent-foreground text-sm rounded-full transition-colors"
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        <div className="saathi-card p-6">
          <h3 className="text-lg font-semibold text-foreground mb-4">
            Your Favorites ({favorites.length})
          </h3>
          {favorites.length === 0 ? (
            <p className="text-sm text-muted-foreground">
              Heart the affirmations that resonate with you to save them here.
            </p>
          ) : (
            <div className="space-y-2">
              {favorites.slice(0, 3).map(index => (
                <button
                  key={index}
                  onClick={() => setCurrentAffirmation(index)}
                  className="w-full text-left p-3 bg-accent/30 hover:bg-accent/50 rounded-lg transition-colors"
                >
                  <p className="text-sm font-medium text-foreground line-clamp-2">
                    {affirmations[index].text}
                  </p>
                </button>
              ))}
              {favorites.length > 3 && (
                <p className="text-xs text-center text-muted-foreground">
                  +{favorites.length - 3} more favorites
                </p>
              )}
            </div>
          )}
        </div>
      </div>

      {/* All Affirmations */}
      <div className="saathi-card p-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold text-foreground">All Affirmations</h3>
          <Button
            variant="saathi_ghost"
            onClick={() => setShowAll(!showAll)}
          >
            {showAll ? 'Show Less' : 'Show All'}
          </Button>
        </div>

        <div className="grid gap-4">
          {affirmations.slice(0, showAll ? affirmations.length : 6).map((affirmation, index) => (
            <div
              key={index}
              className={`p-4 rounded-xl border transition-all cursor-pointer ${
                index === currentAffirmation
                  ? 'saathi-gradient-accent border-primary/50'
                  : 'bg-muted/30 border-border/50 hover:bg-accent/30'
              }`}
              onClick={() => setCurrentAffirmation(index)}
            >
              <div className="flex items-start justify-between space-x-4">
                <div className="flex-1">
                  <div className="flex items-center space-x-2 mb-2">
                    <span className="text-xs px-2 py-1 bg-primary/10 text-primary rounded-full">
                      {affirmation.category}
                    </span>
                    {favorites.includes(index) && (
                      <Heart className="h-3 w-3 text-primary fill-current" />
                    )}
                  </div>
                  <p className="font-medium text-foreground leading-relaxed">
                    {affirmation.text}
                  </p>
                </div>
                <Button
                  variant="saathi_ghost"
                  size="sm"
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleFavorite(index);
                  }}
                >
                  <Bookmark className={`h-4 w-4 ${favorites.includes(index) ? 'fill-current' : ''}`} />
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Usage Tips */}
      <div className="saathi-gradient-warm p-6 rounded-xl mt-6">
        <h3 className="font-semibold text-foreground mb-3">🌟 How to Use Affirmations</h3>
        <ul className="text-sm text-muted-foreground space-y-2">
          <li>• Read slowly and let the words really sink in</li>
          <li>• Repeat your favorites throughout the day</li>
          <li>• Say them out loud for extra impact</li>
          <li>• Choose one to focus on for an entire week</li>
          <li>• Write your favorites in a journal or on sticky notes</li>
          <li>• Remember: it's okay if you don't believe them immediately - that's normal!</li>
        </ul>
      </div>
    </div>
  );
};

export default DailyAffirmations;