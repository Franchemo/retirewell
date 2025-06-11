
import { useState } from "react";
import { motion } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import { 
  Plane, 
  ChefHat, 
  Heart, 
  Activity, 
  Users, 
  Palette, 
  Lightbulb, 
  ArrowRight,
  ArrowLeft,
  Check
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";

interface Dream {
  id: string;
  title: string;
  description: string;
  icon: React.ComponentType<any>;
}

const dreams: Dream[] = [
  {
    id: "travel",
    title: "Travel",
    description: "Explore the world and create lasting memories",
    icon: Plane,
  },
  {
    id: "cooking",
    title: "Cooking & Learning",
    description: "Master new skills and cuisines",
    icon: ChefHat,
  },
  {
    id: "volunteering",
    title: "Volunteering",
    description: "Give back to your community",
    icon: Heart,
  },
  {
    id: "health",
    title: "Health & Wellness",
    description: "Maintain an active, healthy lifestyle",
    icon: Activity,
  },
  {
    id: "family",
    title: "Family Time",
    description: "Spend quality time with loved ones",
    icon: Users,
  },
  {
    id: "hobbies",
    title: "Hobbies",
    description: "Pursue your passions and interests",
    icon: Palette,
  },
  {
    id: "project",
    title: "Start a Project",
    description: "Launch that dream business or initiative",
    icon: Lightbulb,
  },
];

const DreamSetting = () => {
  const [selectedDreams, setSelectedDreams] = useState<string[]>([]);
  const [personalNote, setPersonalNote] = useState("");
  const navigate = useNavigate();
  const { toast } = useToast();

  const toggleDream = (dreamId: string) => {
    setSelectedDreams(prev => 
      prev.includes(dreamId) 
        ? prev.filter(id => id !== dreamId)
        : [...prev, dreamId]
    );
  };

  const handleContinue = () => {
    if (selectedDreams.length === 0) {
      toast({
        title: "Select at least one dream",
        description: "Choose the retirement dreams that resonate with you.",
        variant: "destructive",
      });
      return;
    }

    // Save to localStorage for demo purposes
    localStorage.setItem("retirewell-dreams", JSON.stringify({
      selectedDreams,
      personalNote,
      timestamp: Date.now()
    }));

    toast({
      title: "Dreams saved!",
      description: `${selectedDreams.length} dreams selected for your retirement vision.`,
    });

    navigate("/retirewell/onboarding");
  };

  return (
    <div className="mobile-full bg-gradient-to-br from-background via-primary/5 to-financial-aspirational/10">
      <div className="mobile-container py-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <div className="flex items-center mb-4">
            <Link to="/retirewell" className="p-2 rounded-lg hover:bg-white/20 transition-colors">
              <ArrowLeft className="w-5 h-5" />
            </Link>
            <h1 className="text-2xl font-bold ml-3">Set Your Dreams</h1>
          </div>
          <p className="text-foreground/70 leading-relaxed">
            What does your ideal retirement look like? Select the dreams that inspire you most.
          </p>
        </motion.div>

        {/* Dream Cards Grid */}
        <div className="grid grid-cols-1 gap-4 mb-8">
          {dreams.map((dream, index) => {
            const isSelected = selectedDreams.includes(dream.id);
            return (
              <motion.div
                key={dream.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                onClick={() => toggleDream(dream.id)}
                className={`dream-card cursor-pointer ${isSelected ? 'selected' : ''}`}
              >
                <div className="flex items-center space-x-4">
                  <div className={`p-3 rounded-xl transition-all duration-300 ${
                    isSelected 
                      ? 'bg-financial-aspirational/20' 
                      : 'bg-financial-secure/10'
                  }`}>
                    <dream.icon className={`w-6 h-6 ${
                      isSelected ? 'text-financial-aspirational' : 'text-financial-secure'
                    }`} />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-lg">{dream.title}</h3>
                    <p className="text-sm text-muted-foreground">{dream.description}</p>
                  </div>
                  {isSelected && (
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className="p-2 bg-financial-aspirational rounded-full"
                    >
                      <Check className="w-4 h-4 text-white" />
                    </motion.div>
                  )}
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Personal Note */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="financial-card mb-8"
        >
          <h3 className="font-semibold mb-3">Why are these dreams important to you?</h3>
          <Textarea
            placeholder="Share what makes these dreams meaningful to you... (optional)"
            value={personalNote}
            onChange={(e) => setPersonalNote(e.target.value)}
            className="financial-input resize-none"
            rows={4}
          />
        </motion.div>

        {/* Selected Dreams Summary */}
        {selectedDreams.length > 0 && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="progress-card mb-8"
          >
            <h3 className="font-semibold mb-3">Selected Dreams ({selectedDreams.length})</h3>
            <div className="flex flex-wrap gap-2">
              {selectedDreams.map(dreamId => {
                const dream = dreams.find(d => d.id === dreamId);
                return (
                  <span 
                    key={dreamId}
                    className="px-3 py-1 bg-financial-aspirational/10 text-financial-aspirational text-sm rounded-full border border-financial-aspirational/20"
                  >
                    {dream?.title}
                  </span>
                );
              })}
            </div>
          </motion.div>
        )}

        {/* Continue Button */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="fixed bottom-6 left-1/2 transform -translate-x-1/2 w-full max-w-md px-4"
        >
          <Button 
            onClick={handleContinue}
            className="w-full button-financial text-lg py-4"
            disabled={selectedDreams.length === 0}
          >
            Continue to Planning
            <ArrowRight className="w-5 h-5 ml-2" />
          </Button>
        </motion.div>

        {/* Safe area for mobile */}
        <div className="h-24"></div>
      </div>
    </div>
  );
};

export default DreamSetting;
