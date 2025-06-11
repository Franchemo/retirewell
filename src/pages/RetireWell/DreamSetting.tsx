
import { motion } from "framer-motion";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Heart, Plus, Trash2 } from "lucide-react";
import Navigation from "@/components/RetireWell/Navigation";

interface Dream {
  id: string;
  title: string;
  description: string;
  estimatedCost: number;
  timeframe: string;
}

const DreamSetting = () => {
  const [dreams, setDreams] = useState<Dream[]>([]);
  const [newDream, setNewDream] = useState({
    title: "",
    description: "",
    estimatedCost: "",
    timeframe: "",
  });

  const addDream = () => {
    if (newDream.title.trim()) {
      const dream: Dream = {
        id: Date.now().toString(),
        title: newDream.title,
        description: newDream.description,
        estimatedCost: parseFloat(newDream.estimatedCost) || 0,
        timeframe: newDream.timeframe,
      };
      setDreams([...dreams, dream]);
      setNewDream({ title: "", description: "", estimatedCost: "", timeframe: "" });
    }
  };

  const removeDream = (id: string) => {
    setDreams(dreams.filter(dream => dream.id !== id));
  };

  return (
    <div className="mobile-full bg-gradient-to-br from-background via-background to-primary/5 pb-20">
      <div className="mobile-container py-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <div className="flex items-center justify-center space-x-2 mb-4">
            <Heart className="w-8 h-8 text-financial-secure" />
            <h1 className="text-3xl font-bold text-financial-gradient">
              Dream Setting
            </h1>
          </div>
          <p className="text-lg text-muted-foreground leading-relaxed">
            Define your retirement dreams and give them shape
          </p>
        </motion.div>

        {/* Add New Dream Form */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <Card className="financial-card mb-6">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Plus className="w-5 h-5 text-financial-secure" />
                <span>Add New Dream</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="title">Dream Title</Label>
                <Input
                  id="title"
                  placeholder="e.g., Travel to Europe"
                  value={newDream.title}
                  onChange={(e) => setNewDream({...newDream, title: e.target.value})}
                />
              </div>
              <div>
                <Label htmlFor="description">Description</Label>
                <Input
                  id="description"
                  placeholder="Describe your dream in detail..."
                  value={newDream.description}
                  onChange={(e) => setNewDream({...newDream, description: e.target.value})}
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="cost">Estimated Cost ($)</Label>
                  <Input
                    id="cost"
                    type="number"
                    placeholder="10000"
                    value={newDream.estimatedCost}
                    onChange={(e) => setNewDream({...newDream, estimatedCost: e.target.value})}
                  />
                </div>
                <div>
                  <Label htmlFor="timeframe">Timeframe</Label>
                  <Input
                    id="timeframe"
                    placeholder="5 years"
                    value={newDream.timeframe}
                    onChange={(e) => setNewDream({...newDream, timeframe: e.target.value})}
                  />
                </div>
              </div>
              <Button onClick={addDream} className="button-financial w-full">
                <Plus className="w-4 h-4 mr-2" />
                Add Dream
              </Button>
            </CardContent>
          </Card>
        </motion.div>

        {/* Dreams List */}
        <div className="space-y-4">
          {dreams.map((dream, index) => (
            <motion.div
              key={dream.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 + index * 0.1 }}
            >
              <Card className="financial-card">
                <CardContent className="pt-6">
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <h3 className="font-semibold text-lg text-financial-secure mb-2">
                        {dream.title}
                      </h3>
                      <p className="text-muted-foreground mb-3">{dream.description}</p>
                      <div className="flex justify-between text-sm">
                        <span className="text-success-gradient font-medium">
                          ${dream.estimatedCost.toLocaleString()}
                        </span>
                        <span className="text-muted-foreground">
                          {dream.timeframe}
                        </span>
                      </div>
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => removeDream(dream.id)}
                      className="text-destructive hover:text-destructive"
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {dreams.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="text-center py-12 text-muted-foreground"
          >
            <Heart className="w-12 h-12 mx-auto mb-4 opacity-50" />
            <p>No dreams added yet. Start by adding your first retirement dream!</p>
          </motion.div>
        )}
      </div>
      
      {/* Bottom Navigation */}
      <Navigation />
    </div>
  );
};

export default DreamSetting;
