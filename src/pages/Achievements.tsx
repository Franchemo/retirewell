
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { ChevronLeft, Award, Trophy, Star } from "lucide-react";
import { AchievementsDisplay } from "@/components/AchievementsDisplay";
import { fetchRecentAchievements, fetchCompletedAchievements } from "@/services/achievementService";
import { UserAchievement } from "@/types/achievement";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";

const Achievements = () => {
  const navigate = useNavigate();
  const [recentAchievements, setRecentAchievements] = useState<UserAchievement[]>([]);
  const [stats, setStats] = useState({
    total: 0,
    completed: 0,
    percentComplete: 0
  });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      try {
        setIsLoading(true);
        
        // Fetch recent achievements
        const recentData = await fetchRecentAchievements(3);
        setRecentAchievements(recentData);
        
        // Fetch completed achievements for stats
        const completedData = await fetchCompletedAchievements();
        
        // Calculate stats (total will be filled in later from allAchievements)
        setStats(prevStats => ({
          ...prevStats,
          completed: completedData.length
        }));
      } catch (error) {
        console.error("Error loading achievement data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    loadData();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-background via-background to-secondary/20">
      {/* Top Navigation */}
      <motion.nav 
        className="fixed top-0 left-0 right-0 z-50 glassmorphism border-b border-white/20"
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <button 
                onClick={() => navigate('/')}
                className="mr-4 p-2 rounded-full frosted-glass"
                aria-label="Go back"
              >
                <ChevronLeft className="w-5 h-5 text-foreground/70" />
              </button>
              <h1 className="text-xl font-semibold text-gradient flex items-center">
                <Trophy className="w-5 h-5 mr-2" />
                Achievements & Milestones
              </h1>
            </div>
          </div>
        </div>
      </motion.nav>

      {/* Main Content */}
      <main className="pt-24 pb-16 px-4 sm:px-6 lg:px-8 max-w-screen-xl mx-auto">
        {isLoading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
          </div>
        ) : (
          <div className="space-y-8">
            {/* Summary Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="flex items-center">
                    <Trophy className="w-5 h-5 mr-2 text-yellow-500" />
                    Recently Earned
                  </CardTitle>
                  <CardDescription>Your latest achievements</CardDescription>
                </CardHeader>
                <CardContent>
                  {recentAchievements.length === 0 ? (
                    <p className="text-sm text-gray-500">No achievements earned yet. Keep going!</p>
                  ) : (
                    <ul className="space-y-2">
                      {recentAchievements.map(achievement => (
                        <li key={achievement.id} className="flex items-center text-sm">
                          <span className="mr-2">{achievement.achievement?.icon}</span>
                          <span>{achievement.achievement?.title}</span>
                        </li>
                      ))}
                    </ul>
                  )}
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="flex items-center">
                    <Star className="w-5 h-5 mr-2 text-blue-500" />
                    Progress
                  </CardTitle>
                  <CardDescription>Your achievement journey</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Completed</span>
                      <span>{stats.completed}</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
                      <div 
                        className="bg-primary h-2.5 rounded-full" 
                        style={{ width: `${stats.percentComplete}%` }}
                      ></div>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="flex items-center">
                    <Award className="w-5 h-5 mr-2 text-green-500" />
                    Next Goals
                  </CardTitle>
                  <CardDescription>What to aim for next</CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 text-sm">
                    <li className="flex items-center">
                      <span className="w-4 h-4 rounded-full bg-gray-200 dark:bg-gray-700 mr-2"></span>
                      Complete 5 reflections in a row
                    </li>
                    <li className="flex items-center">
                      <span className="w-4 h-4 rounded-full bg-gray-200 dark:bg-gray-700 mr-2"></span>
                      Try a mindfulness exercise
                    </li>
                    <li className="flex items-center">
                      <span className="w-4 h-4 rounded-full bg-gray-200 dark:bg-gray-700 mr-2"></span>
                      Complete your profile
                    </li>
                  </ul>
                </CardContent>
              </Card>
            </div>
            
            {/* Main Achievements List */}
            <AchievementsDisplay />
          </div>
        )}
      </main>
    </div>
  );
};

export default Achievements;
