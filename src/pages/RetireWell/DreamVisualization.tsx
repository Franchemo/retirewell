
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowLeft, Plane, Users, Palette } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";

const DreamVisualization = () => {
  const [selectedDreams, setSelectedDreams] = useState<string[]>([]);
  const [personalNote, setPersonalNote] = useState("");

  useEffect(() => {
    const savedDreams = localStorage.getItem("retirewell-dreams");
    if (savedDreams) {
      const data = JSON.parse(savedDreams);
      setSelectedDreams(data.selectedDreams || []);
      setPersonalNote(data.personalNote || "");
    }
  }, []);

  const dreamContent = {
    travel: {
      image: "🌍",
      quote: "The world is a book, and those who do not travel read only one page.",
      timeline: "Visit 3 new countries per year starting at age 65"
    },
    family: {
      image: "👨‍👩‍👧‍👦",
      quote: "Family is not an important thing, it's everything.",
      timeline: "Weekly family gatherings and annual reunions"
    },
    hobbies: {
      image: "🎨",
      quote: "Life is really about pursuing the things you love doing.",
      timeline: "Dedicate 20+ hours per week to creative pursuits"
    }
  };

  const getDreamsByCategory = (category: keyof typeof dreamContent) => {
    return selectedDreams.includes(category);
  };

  return (
    <div className="mobile-full bg-gradient-to-br from-background via-financial-aspirational/5 to-primary/10">
      <div className="mobile-container py-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <div className="flex items-center mb-4">
            <Link to="/retirewell/scenarios" className="p-2 rounded-lg hover:bg-white/20 transition-colors">
              <ArrowLeft className="w-5 h-5" />
            </Link>
            <h1 className="text-2xl font-bold ml-3">Dream Visualization</h1>
          </div>
          <p className="text-foreground/70">
            See your retirement dreams come to life
          </p>
        </motion.div>

        {/* Personal Note */}
        {personalNote && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="dream-card mb-6"
          >
            <h3 className="font-semibold mb-2 text-financial-aspirational">Your Personal Vision</h3>
            <p className="text-foreground/80 italic">"{personalNote}"</p>
          </motion.div>
        )}

        {/* Dream Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <Tabs defaultValue="travel" className="w-full">
            <TabsList className="grid w-full grid-cols-3 mb-6">
              <TabsTrigger value="travel" className="flex items-center space-x-2">
                <Plane className="w-4 h-4" />
                <span>Travel</span>
              </TabsTrigger>
              <TabsTrigger value="family" className="flex items-center space-x-2">
                <Users className="w-4 h-4" />
                <span>Family</span>
              </TabsTrigger>
              <TabsTrigger value="hobbies" className="flex items-center space-x-2">
                <Palette className="w-4 h-4" />
                <span>Hobbies</span>
              </TabsTrigger>
            </TabsList>

            {Object.entries(dreamContent).map(([key, content]) => (
              <TabsContent key={key} value={key} className="space-y-4">
                <Card className="dream-card">
                  <CardContent className="pt-6">
                    <div className="text-center mb-6">
                      <div className="text-6xl mb-4">{content.image}</div>
                      <blockquote className="text-lg italic text-financial-aspirational font-medium">
                        "{content.quote}"
                      </blockquote>
                    </div>
                    
                    {getDreamsByCategory(key as keyof typeof dreamContent) ? (
                      <div className="space-y-4">
                        <div className="p-4 bg-financial-success/10 rounded-lg border border-financial-success/20">
                          <h4 className="font-semibold text-financial-success mb-2">Your Plan</h4>
                          <p className="text-foreground/80">{content.timeline}</p>
                        </div>
                        
                        <div className="p-4 bg-financial-aspirational/10 rounded-lg border border-financial-aspirational/20">
                          <h4 className="font-semibold text-financial-aspirational mb-2">Timeline Projection</h4>
                          <p className="text-foreground/80">
                            Based on your financial plan, you'll be able to pursue this dream starting at retirement.
                          </p>
                        </div>
                      </div>
                    ) : (
                      <div className="p-4 bg-muted/50 rounded-lg border border-muted">
                        <p className="text-muted-foreground text-center">
                          You haven't selected this dream yet. 
                          <Link to="/retirewell/dreams" className="text-financial-aspirational hover:underline ml-1">
                            Update your dreams
                          </Link>
                        </p>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </TabsContent>
            ))}
          </Tabs>
        </motion.div>

        {/* Navigation */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="mt-8 text-center"
        >
          <Link to="/retirewell/profile">
            <motion.button 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="button-financial px-8 py-3"
            >
              View Your Profile
            </motion.button>
          </Link>
        </motion.div>
      </div>
    </div>
  );
};

export default DreamVisualization;
