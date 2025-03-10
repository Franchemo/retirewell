
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import confetti from "canvas-confetti";
import { Award, Trophy, Star, Medal, CheckCircle2, Filter } from "lucide-react";
import { fetchUserAchievements, fetchAchievementCategories } from "@/services/achievementService";
import { UserAchievement } from "@/types/achievement";
import { useToast } from "@/hooks/use-toast";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export const AchievementsDisplay = () => {
  const [achievements, setAchievements] = useState<UserAchievement[]>([]);
  const [filteredAchievements, setFilteredAchievements] = useState<UserAchievement[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    const loadAchievements = async () => {
      try {
        setIsLoading(true);
        const data = await fetchUserAchievements();
        setAchievements(data);
        setFilteredAchievements(data);
        
        // Load categories
        const categoryData = await fetchAchievementCategories();
        setCategories(["All", ...categoryData]);
      } catch (error) {
        console.error("Error loading achievements:", error);
        toast({
          title: "Failed to load achievements",
          description: "Please try again later.",
          variant: "destructive"
        });
      } finally {
        setIsLoading(false);
      }
    };

    loadAchievements();
  }, [toast]);

  useEffect(() => {
    if (selectedCategory === "All") {
      setFilteredAchievements(achievements);
    } else {
      setFilteredAchievements(
        achievements.filter(achievement => 
          achievement.achievement?.category === selectedCategory
        )
      );
    }
  }, [selectedCategory, achievements]);

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case "Consistency":
        return <CheckCircle2 className="w-4 h-4 mr-2" />;
      case "Mindfulness":
        return <Star className="w-4 h-4 mr-2" />;
      case "Exercise":
        return <Trophy className="w-4 h-4 mr-2" />;
      case "Reflection":
        return <Award className="w-4 h-4 mr-2" />;
      default:
        return <Medal className="w-4 h-4 mr-2" />;
    }
  };

  const celebrateAchievement = () => {
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 }
    });
  };

  const getProgressColor = (progress: number) => {
    if (progress === 100) return "bg-green-500";
    if (progress > 66) return "bg-yellow-500";
    if (progress > 33) return "bg-blue-500";
    return "bg-gray-500";
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="space-y-6"
    >
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100">Your Achievements</h3>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" size="sm">
              <Filter className="w-4 h-4 mr-2" />
              Filter
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuLabel>Categories</DropdownMenuLabel>
            <DropdownMenuSeparator />
            {categories.map((category) => (
              <DropdownMenuItem 
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={selectedCategory === category ? "bg-muted" : ""}
              >
                {category === "All" ? "All Categories" : (
                  <div className="flex items-center">
                    {getCategoryIcon(category)}
                    {category}
                  </div>
                )}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      <Tabs defaultValue="all" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="all">All</TabsTrigger>
          <TabsTrigger value="completed">Completed</TabsTrigger>
        </TabsList>
        
        <TabsContent value="all" className="mt-4">
          {isLoading ? (
            <div className="flex justify-center items-center h-48">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
            </div>
          ) : filteredAchievements.length === 0 ? (
            <div className="text-center py-8">
              <p className="text-gray-500 dark:text-gray-400">No achievements found in this category.</p>
            </div>
          ) : (
            <div className="grid gap-4">
              {filteredAchievements.map((achievement) => (
                <motion.div
                  key={achievement.id || achievement.achievementId}
                  className={`p-4 rounded-lg border transition-all ${
                    achievement.isCompleted
                      ? "border-green-500 bg-green-50 dark:bg-green-900/20 dark:border-green-700"
                      : "border-gray-200 bg-gray-50 dark:bg-gray-800/50 dark:border-gray-700"
                  }`}
                  whileHover={{ scale: 1.02 }}
                  onClick={() => {
                    if (achievement.isCompleted) celebrateAchievement();
                  }}
                >
                  <div className="flex items-start">
                    <div className="text-2xl mr-3 flex-shrink-0">
                      {achievement.achievement?.icon}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <h4 className="font-medium text-gray-900 dark:text-gray-100">
                          {achievement.achievement?.title || "Loading..."}
                        </h4>
                        <Badge variant={achievement.isCompleted ? "default" : "outline"}>
                          {achievement.achievement?.category || "General"}
                        </Badge>
                      </div>
                      <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">
                        {achievement.achievement?.description || "Loading description..."}
                      </p>
                      
                      {achievement.isCompleted ? (
                        <p className="text-xs text-green-600 dark:text-green-400 mt-2">
                          Completed on {new Date(achievement.completedAt || Date.now()).toLocaleDateString()}
                        </p>
                      ) : (
                        <div className="mt-3">
                          <div className="flex items-center justify-between text-xs mb-1">
                            <span>Progress</span>
                            <span>{achievement.progress}%</span>
                          </div>
                          <Progress value={achievement.progress} className={getProgressColor(achievement.progress)} />
                        </div>
                      )}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </TabsContent>
        
        <TabsContent value="completed" className="mt-4">
          {isLoading ? (
            <div className="flex justify-center items-center h-48">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
            </div>
          ) : (
            <div className="grid gap-4">
              {filteredAchievements
                .filter(achievement => achievement.isCompleted)
                .length === 0 ? (
                <div className="text-center py-8">
                  <p className="text-gray-500 dark:text-gray-400">No completed achievements yet. Keep going!</p>
                </div>
              ) : (
                filteredAchievements
                  .filter(achievement => achievement.isCompleted)
                  .map((achievement) => (
                    <motion.div
                      key={achievement.id || achievement.achievementId}
                      className="p-4 rounded-lg border border-green-500 bg-green-50 dark:bg-green-900/20 dark:border-green-700"
                      whileHover={{ scale: 1.02 }}
                      onClick={celebrateAchievement}
                    >
                      <div className="flex items-start">
                        <div className="text-2xl mr-3 flex-shrink-0">
                          {achievement.achievement?.icon}
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center justify-between">
                            <h4 className="font-medium text-gray-900 dark:text-gray-100">
                              {achievement.achievement?.title || "Loading..."}
                            </h4>
                            <Badge>
                              {achievement.achievement?.category || "General"}
                            </Badge>
                          </div>
                          <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">
                            {achievement.achievement?.description || "Loading description..."}
                          </p>
                          <p className="text-xs text-green-600 dark:text-green-400 mt-2">
                            Completed on {new Date(achievement.completedAt || Date.now()).toLocaleDateString()}
                          </p>
                        </div>
                      </div>
                    </motion.div>
                  ))
              )}
            </div>
          )}
        </TabsContent>
      </Tabs>
    </motion.div>
  );
};
