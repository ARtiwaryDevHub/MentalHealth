import { useState } from "react";
import { Button } from "@/components/ui/button";
import { BookOpen, Shuffle, Save, Download } from "lucide-react";

const JournalPrompt = () => {
  const [currentPrompt, setCurrentPrompt] = useState(0);
  const [journalEntry, setJournalEntry] = useState("");
  const [savedEntries, setSavedEntries] = useState<Array<{id: string, prompt: string, entry: string, date: string}>>([]);

  const prompts = [
    {
      category: "Self-Reflection",
      question: "How am I feeling right now, and what might have influenced these emotions today?",
      follow_up: "Take a moment to sit with these feelings without judgment. What would you say to comfort a friend feeling the same way?"
    },
    {
      category: "Gratitude",
      question: "What are three things, big or small, that I'm grateful for today?",
      follow_up: "How did these things make you feel? Can you think of ways to create more moments like these?"
    },
    {
      category: "Challenges",
      question: "What challenge am I facing right now, and what strengths have helped me overcome difficulties before?",
      follow_up: "What's one small step you could take today to move forward with this challenge?"
    },
    {
      category: "Relationships",
      question: "How are my relationships with family and friends affecting me? What do I need more of or less of in these connections?",
      follow_up: "Think about one relationship you'd like to nurture. What could you do to strengthen this bond?"
    },
    {
      category: "Dreams & Goals",
      question: "What dream or goal feels important to me right now? What's one small action I could take toward it this week?",
      follow_up: "What support or resources would help you pursue this dream? Who could you talk to about it?"
    },
    {
      category: "Self-Care",
      question: "What does my mind, body, and heart need right now? How can I show myself kindness today?",
      follow_up: "What activities make you feel most like yourself? How can you incorporate more of these into your routine?"
    },
    {
      category: "Growth",
      question: "What have I learned about myself recently? How have I grown or changed in the past month?",
      follow_up: "What qualities in yourself are you proud of? What would you like to develop further?"
    },
    {
      category: "Stress & Pressure",
      question: "What's creating stress or pressure in my life right now? What would help me feel more balanced?",
      follow_up: "If you could let go of one worry today, what would it be? What would you do with that mental space?"
    },
    {
      category: "Values & Identity",
      question: "What matters most to me in life? Am I living in alignment with these values?",
      follow_up: "When do you feel most authentic and true to yourself? How can you create more of these moments?"
    },
    {
      category: "Hope & Future",
      question: "What am I looking forward to? What kind of person do I want to become?",
      follow_up: "What gives you hope when things feel difficult? How can you hold onto that hope today?"
    }
  ];

  const getRandomPrompt = () => {
    const randomIndex = Math.floor(Math.random() * prompts.length);
    setCurrentPrompt(randomIndex);
    setJournalEntry("");
  };

  const saveEntry = () => {
    if (journalEntry.trim()) {
      const newEntry = {
        id: Date.now().toString(),
        prompt: prompts[currentPrompt].question,
        entry: journalEntry,
        date: new Date().toLocaleDateString()
      };
      setSavedEntries(prev => [newEntry, ...prev]);
      setJournalEntry("");
      // You could add toast notification here
    }
  };

  const downloadEntries = () => {
    const content = savedEntries.map(entry => 
      `Date: ${entry.date}\nPrompt: ${entry.prompt}\nEntry: ${entry.entry}\n${"=".repeat(50)}\n`
    ).join("\n");
    
    const element = document.createElement("a");
    const file = new Blob([content], { type: 'text/plain' });
    element.href = URL.createObjectURL(file);
    element.download = `saathi-journal-${new Date().toISOString().split('T')[0]}.txt`;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="text-center space-y-4 mb-8">
        <div className="flex items-center justify-center space-x-3">
          <div className="p-3 saathi-gradient-primary rounded-xl">
            <BookOpen className="h-6 w-6 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-foreground">Journal Prompts</h1>
        </div>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          Writing can be a powerful way to process emotions and gain clarity. These prompts are designed to help you explore your thoughts and feelings in a safe, nurturing way.
        </p>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Main Journaling Area */}
        <div className="lg:col-span-2 space-y-6">
          <div className="saathi-card p-6">
            <div className="flex items-center justify-between mb-6">
              <div>
                <span className="inline-block px-3 py-1 bg-primary/10 text-primary text-sm font-medium rounded-full mb-2">
                  {prompts[currentPrompt].category}
                </span>
                <h2 className="text-xl font-semibold text-foreground">
                  Today's Prompt
                </h2>
              </div>
              <Button variant="saathi_ghost" onClick={getRandomPrompt}>
                <Shuffle className="h-4 w-4 mr-2" />
                New Prompt
              </Button>
            </div>

            <div className="space-y-4">
              <div className="saathi-gradient-accent p-4 rounded-xl">
                <p className="text-foreground font-medium leading-relaxed">
                  {prompts[currentPrompt].question}
                </p>
              </div>

              <div className="saathi-gradient-warm p-4 rounded-xl">
                <p className="text-sm text-muted-foreground">
                  💭 Follow-up: {prompts[currentPrompt].follow_up}
                </p>
              </div>
            </div>
          </div>

          {/* Writing Area */}
          <div className="saathi-card p-6">
            <h3 className="text-lg font-semibold text-foreground mb-4">Your Thoughts</h3>
            <textarea
              value={journalEntry}
              onChange={(e) => setJournalEntry(e.target.value)}
              placeholder="Start writing your thoughts here... There's no right or wrong way to journal. Just let your thoughts flow naturally."
              className="w-full h-64 p-4 bg-muted/50 rounded-xl border border-border/50 resize-none focus:outline-none focus:ring-2 focus:ring-primary/50 text-foreground"
            />
            
            <div className="flex items-center justify-between mt-4">
              <p className="text-sm text-muted-foreground">
                {journalEntry.length} characters written
              </p>
              <div className="flex space-x-3">
                <Button 
                  variant="saathi_secondary" 
                  onClick={saveEntry}
                  disabled={!journalEntry.trim()}
                >
                  <Save className="h-4 w-4 mr-2" />
                  Save Entry
                </Button>
              </div>
            </div>
          </div>

          {/* Writing Tips */}
          <div className="saathi-gradient-warm p-6 rounded-xl">
            <h3 className="font-semibold text-foreground mb-3">✨ Journaling Tips</h3>
            <ul className="text-sm text-muted-foreground space-y-2">
              <li>• Write without editing or judging yourself</li>
              <li>• It's okay if your thoughts feel messy or incomplete</li>
              <li>• Try to write for at least 5-10 minutes</li>
              <li>• Focus on how things feel, not just what happened</li>
              <li>• Your journal is private - write honestly</li>
              <li>• If you're stuck, describe what you see around you first</li>
            </ul>
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Saved Entries */}
          <div className="saathi-card p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-foreground">Saved Entries</h3>
              {savedEntries.length > 0 && (
                <Button variant="saathi_ghost" size="sm" onClick={downloadEntries}>
                  <Download className="h-4 w-4" />
                </Button>
              )}
            </div>

            {savedEntries.length === 0 ? (
              <p className="text-sm text-muted-foreground text-center py-8">
                Your saved journal entries will appear here. Start writing to create your first entry!
              </p>
            ) : (
              <div className="space-y-3">
                {savedEntries.slice(0, 3).map((entry) => (
                  <div key={entry.id} className="p-3 bg-muted/30 rounded-lg">
                    <p className="text-xs text-muted-foreground mb-1">{entry.date}</p>
                    <p className="text-sm font-medium text-foreground line-clamp-2">
                      {entry.prompt}
                    </p>
                    <p className="text-xs text-muted-foreground mt-2 line-clamp-2">
                      {entry.entry}
                    </p>
                  </div>
                ))}
                {savedEntries.length > 3 && (
                  <p className="text-xs text-center text-muted-foreground">
                    +{savedEntries.length - 3} more entries
                  </p>
                )}
              </div>
            )}
          </div>

          {/* Quick Prompts */}
          <div className="saathi-card p-6">
            <h3 className="text-lg font-semibold text-foreground mb-4">Quick Prompts</h3>
            <div className="space-y-2">
              {["How am I feeling right now?", "What am I grateful for today?", "What do I need to let go of?", "What made me smile recently?"].map((prompt, index) => (
                <button
                  key={index}
                  onClick={() => {
                    setCurrentPrompt(prompts.findIndex(p => p.question.includes(prompt.split(' ')[2])));
                    setJournalEntry("");
                  }}
                  className="w-full text-left p-3 text-sm bg-muted/30 hover:bg-accent/50 rounded-lg transition-colors"
                >
                  {prompt}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JournalPrompt;