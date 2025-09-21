import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Play, Pause, RotateCcw, Wind } from "lucide-react";

const BreathingExercise = () => {
  const [isActive, setIsActive] = useState(false);
  const [phase, setPhase] = useState<"breathe-in" | "hold" | "breathe-out" | "pause">("breathe-in");
  const [timeLeft, setTimeLeft] = useState(4);
  const [cycle, setCycle] = useState(0);
  const [exerciseType, setExerciseType] = useState<"478" | "box" | "calm">("478");

  const exercises = {
    "478": {
      name: "4-7-8 Breathing",
      description: "Inhale for 4, hold for 7, exhale for 8. Great for reducing anxiety and promoting sleep.",
      phases: [
        { name: "breathe-in", duration: 4, instruction: "Breathe in slowly through your nose" },
        { name: "hold", duration: 7, instruction: "Hold your breath gently" },
        { name: "breathe-out", duration: 8, instruction: "Exhale completely through your mouth" },
        { name: "pause", duration: 2, instruction: "Rest and prepare for the next breath" }
      ]
    },
    "box": {
      name: "Box Breathing",
      description: "Equal counts for each phase. Used by Navy SEALs for focus and calm.",
      phases: [
        { name: "breathe-in", duration: 4, instruction: "Breathe in slowly" },
        { name: "hold", duration: 4, instruction: "Hold your breath" },
        { name: "breathe-out", duration: 4, instruction: "Exhale slowly" },
        { name: "pause", duration: 4, instruction: "Hold empty and relax" }
      ]
    },
    "calm": {
      name: "Calming Breath",
      description: "Simple and gentle. Perfect for beginners or when feeling overwhelmed.",
      phases: [
        { name: "breathe-in", duration: 3, instruction: "Gently breathe in" },
        { name: "hold", duration: 2, instruction: "Pause naturally" },
        { name: "breathe-out", duration: 5, instruction: "Slowly breathe out" },
        { name: "pause", duration: 2, instruction: "Rest and reset" }
      ]
    }
  };

  const currentExercise = exercises[exerciseType];
  const currentPhaseIndex = currentExercise.phases.findIndex(p => p.name === phase);
  const currentPhaseData = currentExercise.phases[currentPhaseIndex];

  useEffect(() => {
    let interval: NodeJS.Timeout;
    
    if (isActive && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft(time => time - 1);
      }, 1000);
    } else if (isActive && timeLeft === 0) {
      const nextPhaseIndex = (currentPhaseIndex + 1) % currentExercise.phases.length;
      if (nextPhaseIndex === 0) {
        setCycle(prev => prev + 1);
      }
      setPhase(currentExercise.phases[nextPhaseIndex].name as any);
      setTimeLeft(currentExercise.phases[nextPhaseIndex].duration);
    }

    return () => clearInterval(interval);
  }, [isActive, timeLeft, currentPhaseIndex, currentExercise.phases]);

  const startExercise = () => {
    setIsActive(true);
  };

  const pauseExercise = () => {
    setIsActive(false);
  };

  const resetExercise = () => {
    setIsActive(false);
    setPhase("breathe-in");
    setTimeLeft(currentExercise.phases[0].duration);
    setCycle(0);
  };

  const changeExercise = (type: "478" | "box" | "calm") => {
    setExerciseType(type);
    resetExercise();
    setTimeLeft(exercises[type].phases[0].duration);
  };

  const getCircleScale = () => {
    const progress = (currentPhaseData.duration - timeLeft) / currentPhaseData.duration;
    switch (phase) {
      case "breathe-in":
        return 0.5 + (progress * 0.5); // Scale from 0.5 to 1
      case "hold":
        return 1; // Stay at full size
      case "breathe-out":
        return 1 - (progress * 0.5); // Scale from 1 to 0.5
      case "pause":
        return 0.5; // Stay at small size
      default:
        return 0.5;
    }
  };

  const getPhaseColor = () => {
    switch (phase) {
      case "breathe-in":
        return "saathi-gradient-primary";
      case "hold":
        return "saathi-gradient-accent";
      case "breathe-out":
        return "saathi-gradient-secondary";
      case "pause":
        return "saathi-gradient-warm";
      default:
        return "saathi-gradient-primary";
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="text-center space-y-4 mb-8">
        <div className="flex items-center justify-center space-x-3">
          <div className="p-3 saathi-gradient-primary rounded-xl">
            <Wind className="h-6 w-6 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-foreground">Breathing Exercises</h1>
        </div>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          Take a moment to center yourself with these guided breathing exercises. Find a comfortable position and let your breath be your anchor to calm.
        </p>
      </div>

      {/* Exercise Selection */}
      <div className="grid md:grid-cols-3 gap-4 mb-8">
        {Object.entries(exercises).map(([key, exercise]) => (
          <div
            key={key}
            onClick={() => changeExercise(key as any)}
            className={`saathi-card p-4 cursor-pointer transition-all duration-300 ${
              exerciseType === key ? "ring-2 ring-primary shadow-[var(--shadow-warm)]" : "hover:shadow-[var(--shadow-soft)]"
            }`}
          >
            <h3 className="font-semibold text-foreground mb-2">{exercise.name}</h3>
            <p className="text-sm text-muted-foreground">{exercise.description}</p>
          </div>
        ))}
      </div>

      <div className="saathi-card p-8">
        {/* Breathing Circle */}
        <div className="flex flex-col items-center space-y-8">
          <div className="relative w-80 h-80 flex items-center justify-center">
            <div
              className={`w-64 h-64 rounded-full ${getPhaseColor()} flex items-center justify-center transition-transform duration-1000 ease-in-out`}
              style={{ transform: `scale(${getCircleScale()})` }}
            >
              <div className="text-center text-white">
                <div className="text-6xl font-bold">{timeLeft}</div>
                <div className="text-lg font-medium capitalize">{phase.replace("-", " ")}</div>
              </div>
            </div>
            
            {/* Outer ring */}
            <div className="absolute inset-0 rounded-full border-4 border-primary/20"></div>
          </div>

          {/* Instructions */}
          <div className="text-center space-y-4">
            <h2 className="text-2xl font-semibold text-foreground">
              {currentExercise.name}
            </h2>
            <p className="text-lg text-muted-foreground">
              {currentPhaseData.instruction}
            </p>
            <div className="saathi-gradient-warm p-4 rounded-xl">
              <p className="text-sm text-muted-foreground">
                Cycle {cycle + 1} • {phase.replace("-", " ").toUpperCase()}
              </p>
            </div>
          </div>

          {/* Controls */}
          <div className="flex items-center space-x-4">
            <Button
              variant="saathi"
              size="lg"
              onClick={isActive ? pauseExercise : startExercise}
            >
              {isActive ? <Pause className="h-5 w-5 mr-2" /> : <Play className="h-5 w-5 mr-2" />}
              {isActive ? "Pause" : "Start"}
            </Button>
            
            <Button
              variant="saathi_secondary"
              size="lg"
              onClick={resetExercise}
            >
              <RotateCcw className="h-5 w-5 mr-2" />
              Reset
            </Button>
          </div>

          {/* Tips */}
          <div className="max-w-2xl mx-auto mt-8 p-6 saathi-gradient-warm rounded-xl">
            <h3 className="font-semibold text-foreground mb-3">💫 Breathing Tips</h3>
            <ul className="text-sm text-muted-foreground space-y-2">
              <li>• Find a comfortable, quiet space where you won't be disturbed</li>
              <li>• Keep your shoulders relaxed and your back straight</li>
              <li>• If you feel dizzy, return to your normal breathing rhythm</li>
              <li>• Practice regularly for the best results - even 5 minutes helps</li>
              <li>• Focus on the sensation of breath rather than counting perfectly</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BreathingExercise;