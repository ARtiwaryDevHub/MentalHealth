import { useState } from "react";
import Navigation from "@/components/Navigation";
import HeroSection from "@/components/HeroSection";
import QuickTools from "@/components/QuickTools";
import ChatPreview from "@/components/ChatPreview";
import SaathiFooter from "@/components/SaathiFooter";
import ChatInterface from "@/components/ChatInterface";
import BreathingExercise from "@/components/BreathingExercise";
import JournalPrompt from "@/components/JournalPrompt";
import DailyAffirmations from "@/components/DailyAffirmations";
import SelfCareReminder from "@/components/SelfCareReminder";

const Index = () => {
  const [activeSection, setActiveSection] = useState("home");

  const renderContent = () => {
    switch (activeSection) {
      case "chat":
        return (
          <div className="py-8">
            <ChatInterface />
          </div>
        );
      case "breathing":
        return (
          <div className="py-8">
            <BreathingExercise />
          </div>
        );
      case "journal":
        return (
          <div className="py-8">
            <JournalPrompt />
          </div>
        );
      case "affirmations":
        return (
          <div className="py-8">
            <DailyAffirmations />
          </div>
        );
      case "selfcare":
        return (
          <div className="py-8">
            <SelfCareReminder />
          </div>
        );
      case "home":
      default:
        return (
          <>
            <HeroSection onStartChat={() => setActiveSection("chat")} />
            <QuickTools onToolSelect={setActiveSection} />
            <ChatPreview />
            <SaathiFooter />
          </>
        );
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation activeSection={activeSection} onSectionChange={setActiveSection} />
      {renderContent()}
    </div>
  );
};

export default Index;
