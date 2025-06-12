
import { motion } from "framer-motion";
import { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Heart, Plus, Trash2, ArrowRight, Sparkles } from "lucide-react";
import Navigation from "@/components/RetireWell/Navigation";
import MobileDreamCard from "@/components/RetireWell/MobileDreamCard";
import { useRetireWell } from "@/contexts/RetireWellContext";
import { useToast } from "@/hooks/use-toast";

interface Dream {
  id: string;
  title: string;
  description: string;
  estimatedCost: number;
  timeframe: string;
  category?: string;
  personalReason?: string;
}

// Predefined dream options as per document
const PREDEFINED_DREAMS = [
  { title: "Travel the World", category: "Travel", icon: "🌍", description: "Explore new cultures and destinations" },
  { title: "Build a Dream Home", category: "Lifestyle", icon: "🏡", description: "Create your perfect living space" },
  { title: "Start a Business", category: "Career", icon: "💼", description: "Pursue entrepreneurial dreams" },
  { title: "Family Adventures", category: "Family", icon: "👨‍👩‍👧‍👦", description: "Create lasting memories with loved ones" },
  { title: "Learn New Skills", category: "Education", icon: "📚", description: "Master new hobbies and talents" },
  { title: "Give Back to Community", category: "Legacy", icon: "❤️", description: "Make a positive impact" },
  { title: "Health & Wellness", category: "Health", icon: "🏃‍♂️", description: "Maintain an active, healthy lifestyle" }
];

const DreamSetting = () => {
  const [dreams, setDreams] = useState<Dream[]>([]);
  const [selectedDreams, setSelectedDreams] = useState<string[]>([]);
  const [showCustomForm, setShowCustomForm] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const [newDream, setNewDream] = useState({
    title: "",
    description: "",
    estimatedCost: "",
    timeframe: "",
  });

  const { updateProgress } = useRetireWell();
  const { toast } = useToast();
  const navigate = useNavigate();

  // 稳定的更新函数
  const updateUserProgress = useCallback((dreamsCount: number) => {
    console.log("Updating progress with dreams count:", dreamsCount);
    updateProgress({
      hasCompletedDreams: dreamsCount > 0,
      dreamsCount: dreamsCount,
      currentStep: dreamsCount > 0 ? 'goals' : 'dreams'
    });
  }, [updateProgress]);

  // 只在组件挂载时加载一次
  useEffect(() => {
    console.log("Loading dreams from localStorage...");
    const savedDreams = localStorage.getItem('retirewell-dreams');
    if (savedDreams) {
      try {
        const dreamsList = JSON.parse(savedDreams);
        console.log("Loaded dreams:", dreamsList);
        setDreams(dreamsList);
        setSelectedDreams(dreamsList.map((d: Dream) => d.title));
        updateUserProgress(dreamsList.length);
      } catch (error) {
        console.error("Error parsing saved dreams:", error);
      }
    }
    setIsLoaded(true);
  }, []); // 只依赖空数组，确保只执行一次

  // 保存dreams到localStorage，但不触发进度更新
  useEffect(() => {
    if (isLoaded) {
      console.log("Saving dreams to localStorage:", dreams);
      localStorage.setItem('retirewell-dreams', JSON.stringify(dreams));
      updateUserProgress(dreams.length);
    }
  }, [dreams, isLoaded, updateUserProgress]);

  const addPredefinedDream = (predefinedDream: typeof PREDEFINED_DREAMS[0]) => {
    console.log("Adding/removing predefined dream:", predefinedDream.title);
    
    if (selectedDreams.includes(predefinedDream.title)) {
      // Remove if already selected
      setSelectedDreams(prev => prev.filter(title => title !== predefinedDream.title));
      setDreams(prev => prev.filter(dream => dream.title !== predefinedDream.title));
    } else {
      // Add new dream
      const dream: Dream = {
        id: Date.now().toString(),
        title: predefinedDream.title,
        description: predefinedDream.description,
        estimatedCost: 50000,
        timeframe: "5-10 years",
        category: predefinedDream.category,
        personalReason: ""
      };
      setSelectedDreams(prev => [...prev, predefinedDream.title]);
      setDreams(prev => [...prev, dream]);
      
      toast({
        title: "Dream selected!",
        description: `"${dream.title}" has been added to your retirement dreams.`,
      });
    }
  };

  const addCustomDream = () => {
    if (newDream.title.trim()) {
      const dream: Dream = {
        id: Date.now().toString(),
        title: newDream.title,
        description: newDream.description,
        estimatedCost: parseFloat(newDream.estimatedCost) || 0,
        timeframe: newDream.timeframe,
        category: "Custom",
        personalReason: ""
      };
      setDreams(prev => [...prev, dream]);
      setNewDream({ title: "", description: "", estimatedCost: "", timeframe: "" });
      setShowCustomForm(false);
      
      toast({
        title: "Custom dream added!",
        description: `"${dream.title}" has been added to your retirement dreams.`,
      });
    }
  };

  const removeDream = (id: string) => {
    const dreamToRemove = dreams.find(d => d.id === id);
    if (dreamToRemove) {
      setDreams(dreams.filter(dream => dream.id !== id));
      setSelectedDreams(prev => prev.filter(title => title !== dreamToRemove.title));
    }
  };

  const updateDreamReason = (dreamId: string, reason: string) => {
    setDreams(prev => prev.map(dream => 
      dream.id === dreamId 
        ? { ...dream, personalReason: reason }
        : dream
    ));
  };

  const handleContinue = () => {
    if (dreams.length === 0) {
      toast({
        title: "Select at least one dream",
        description: "Please select at least one retirement dream before continuing.",
      });
      return;
    }
    
    console.log("Navigating to goals page...");
    navigate('/retirewell/goals');
  };

  if (!isLoaded) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5 pb-20 flex items-center justify-center">
        <div className="text-center">
          <div className="w-8 h-8 border-4 border-financial-secure border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading your dreams...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5 pb-24">
      <div className="max-w-md mx-auto px-4 py-6">
        {/* Header - Optimized for mobile */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-6"
        >
          <div className="flex items-center justify-center space-x-2 mb-3">
            <Heart className="w-6 h-6 text-financial-secure" />
            <h1 className="text-2xl font-bold text-financial-gradient">
              What Are Your Retirement Dreams?
            </h1>
          </div>
          <p className="text-base text-muted-foreground leading-relaxed px-2">
            Before we talk numbers, let's explore what truly matters to you. Select the dreams that resonate with your vision of retirement.
          </p>
        </motion.div>

        {/* Progress indicator - More prominent */}
        {dreams.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-6 text-center"
          >
            <div className="inline-flex items-center space-x-2 bg-financial-secure/10 text-financial-secure px-4 py-2 rounded-full border border-financial-secure/20">
              <Sparkles className="w-4 h-4" />
              <span className="text-sm font-semibold">
                {dreams.length} dream{dreams.length > 1 ? 's' : ''} selected
              </span>
            </div>
          </motion.div>
        )}

        {/* Dreams Grid - Using new mobile-optimized cards */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mb-6"
        >
          <div className="space-y-3">
            {PREDEFINED_DREAMS.map((dream, index) => (
              <MobileDreamCard
                key={dream.title}
                dream={dream}
                isSelected={selectedDreams.includes(dream.title)}
                onClick={() => addPredefinedDream(dream)}
                index={index}
              />
            ))}
          </div>
        </motion.div>

        {/* Add Custom Dream Button */}
        {!showCustomForm && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
            className="mb-6"
          >
            <Button
              variant="outline"
              onClick={() => setShowCustomForm(true)}
              className="w-full border-dashed border-2 py-6 text-muted-foreground hover:text-financial-secure hover:border-financial-secure transition-colors"
            >
              <Plus className="w-5 h-5 mr-2" />
              Add Custom Dream
            </Button>
          </motion.div>
        )}

        {/* Custom Dream Form */}
        {showCustomForm && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="mb-6"
          >
            <Card className="border-2 border-financial-secure/20 bg-financial-secure/5">
              <CardHeader className="pb-4">
                <CardTitle className="flex items-center space-x-2 text-lg">
                  <Plus className="w-5 h-5 text-financial-secure" />
                  <span>Add Custom Dream</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="title" className="text-sm font-medium">Dream Title</Label>
                  <Input
                    id="title"
                    placeholder="e.g., Learn to Paint"
                    value={newDream.title}
                    onChange={(e) => setNewDream({...newDream, title: e.target.value})}
                    className="mt-1"
                  />
                </div>
                <div>
                  <Label htmlFor="description" className="text-sm font-medium">Description</Label>
                  <Input
                    id="description"
                    placeholder="Describe your dream in detail..."
                    value={newDream.description}
                    onChange={(e) => setNewDream({...newDream, description: e.target.value})}
                    className="mt-1"
                  />
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <Label htmlFor="cost" className="text-sm font-medium">Estimated Cost ($)</Label>
                    <Input
                      id="cost"
                      type="number"
                      placeholder="10000"
                      value={newDream.estimatedCost}
                      onChange={(e) => setNewDream({...newDream, estimatedCost: e.target.value})}
                      className="mt-1"
                    />
                  </div>
                  <div>
                    <Label htmlFor="timeframe" className="text-sm font-medium">Timeframe</Label>
                    <Input
                      id="timeframe"
                      placeholder="5 years"
                      value={newDream.timeframe}
                      onChange={(e) => setNewDream({...newDream, timeframe: e.target.value})}
                      className="mt-1"
                    />
                  </div>
                </div>
                <div className="flex space-x-2 pt-2">
                  <Button onClick={addCustomDream} className="button-financial flex-1">
                    <Plus className="w-4 h-4 mr-2" />
                    Add Dream
                  </Button>
                  <Button 
                    variant="outline" 
                    onClick={() => setShowCustomForm(false)}
                    className="flex-1"
                  >
                    Cancel
                  </Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        )}

        {/* Personal Reasons Section - Improved mobile layout */}
        {dreams.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-24"
          >
            <div className="text-center mb-6">
              <h2 className="text-xl font-semibold text-financial-secure bg-white/90 px-4 py-3 rounded-xl inline-block shadow-sm border border-financial-secure/20">
                Tell Us Why These Dreams Matter
              </h2>
            </div>
            
            <div className="space-y-4">
              {dreams.map((dream, index) => (
                <motion.div
                  key={dream.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Card className="border border-financial-secure/20 bg-white shadow-sm">
                    <CardContent className="p-4">
                      <div className="flex items-center space-x-3 mb-3">
                        <div className="text-xl flex-shrink-0">
                          {PREDEFINED_DREAMS.find(pd => pd.title === dream.title)?.icon || "🎯"}
                        </div>
                        <h4 className="font-semibold text-financial-secure flex-1 text-base">
                          {dream.title}
                        </h4>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => removeDream(dream.id)}
                          className="text-destructive hover:text-destructive flex-shrink-0 h-8 w-8 p-0"
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                      <Textarea
                        placeholder={`What makes "${dream.title}" meaningful to you?`}
                        value={dream.personalReason || ""}
                        onChange={(e) => updateDreamReason(dream.id, e.target.value)}
                        className="min-h-[80px] resize-none text-sm"
                      />
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}

        {dreams.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.9 }}
            className="text-center py-12 text-muted-foreground mb-20"
          >
            <Heart className="w-16 h-16 mx-auto mb-4 opacity-30" />
            <p className="text-lg">Select your retirement dreams above to get started!</p>
          </motion.div>
        )}
      </div>

      {/* Fixed Continue Button - Better mobile positioning */}
      {dreams.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="fixed bottom-20 left-0 right-0 px-4 z-40"
        >
          <div className="max-w-md mx-auto">
            <Button 
              onClick={handleContinue}
              className="w-full button-financial text-base py-4 shadow-lg"
            >
              Continue to Goals Setup
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
          </div>
        </motion.div>
      )}
      
      {/* Bottom Navigation */}
      <Navigation />
    </div>
  );
};

export default DreamSetting;
