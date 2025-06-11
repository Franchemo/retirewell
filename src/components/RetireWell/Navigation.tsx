
import { motion } from "framer-motion";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Home, Heart, TrendingUp, BookOpen, User, Lock } from "lucide-react";
import { useRetireWell } from "@/contexts/RetireWellContext";
import { useToast } from "@/hooks/use-toast";

const Navigation = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { userProgress, canAccessPage } = useRetireWell();
  const { toast } = useToast();
  
  const navItems = [
    { 
      title: "Home", 
      href: "/retirewell/home", 
      icon: Home, 
      page: "home",
      progress: false 
    },
    { 
      title: "Dreams", 
      href: "/retirewell/dreams", 
      icon: Heart, 
      page: "dreams",
      progress: userProgress.hasCompletedDreams 
    },
    { 
      title: "Scenarios", 
      href: "/retirewell/scenarios", 
      icon: TrendingUp, 
      page: "scenarios",
      progress: userProgress.hasCompletedScenarios 
    },
    { 
      title: "Learn", 
      href: "/retirewell/learn", 
      icon: BookOpen, 
      page: "learn",
      progress: false 
    },
    { 
      title: "Profile", 
      href: "/retirewell/profile", 
      icon: User, 
      page: "profile",
      progress: userProgress.hasCompletedOnboarding 
    },
  ];

  const handleNavClick = (item: typeof navItems[0], e: React.MouseEvent) => {
    const canAccess = canAccessPage(item.page);
    
    if (!canAccess) {
      e.preventDefault();
      toast({
        title: "Complete previous steps first",
        description: `Please complete your ${getPreviousStepName(item.page)} before accessing ${item.title}.`,
      });
      return;
    }
  };

  const getPreviousStepName = (page: string) => {
    switch (page) {
      case 'scenarios':
        return 'dreams and goals setup';
      case 'profile':
        return 'basic setup';
      default:
        return 'previous steps';
    }
  };

  return (
    <motion.nav
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="fixed bottom-0 left-0 right-0 bg-white/95 backdrop-blur-sm border-t border-border/50 z-50"
      style={{
        background: "rgba(255, 255, 255, 0.9)",
        backdropFilter: "blur(10px)",
        borderTop: "1px solid rgba(255, 255, 255, 0.2)"
      }}
    >
      <div className="flex justify-around items-center py-2 px-4 max-w-md mx-auto">
        {navItems.map((item, index) => {
          const isActive = location.pathname === item.href || 
            (item.href === "/retirewell/home" && location.pathname === "/retirewell");
          const canAccess = canAccessPage(item.page);
          const isCompleted = item.progress;
          
          return (
            <Link 
              key={item.title} 
              to={item.href}
              onClick={(e) => handleNavClick(item, e)}
            >
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                whileTap={{ scale: 0.95 }}
                className={`flex flex-col items-center space-y-1 px-3 py-2 rounded-lg transition-all duration-200 relative ${
                  isActive
                    ? "bg-financial-secure/10 text-financial-secure scale-105"
                    : canAccess
                    ? "text-muted-foreground hover:text-financial-secure hover:scale-105"
                    : "text-muted-foreground/50 cursor-not-allowed"
                }`}
              >
                <div className="relative">
                  <motion.div
                    animate={isActive ? { 
                      scale: [1, 1.2, 1],
                      rotateY: [0, 360, 0]
                    } : {}}
                    transition={{ duration: 0.6 }}
                  >
                    <item.icon className={`w-5 h-5 ${
                      isActive ? "text-financial-secure" : 
                      canAccess ? "" : "text-muted-foreground/50"
                    }`} />
                  </motion.div>
                  
                  {/* Progress indicator with glow effect */}
                  {isCompleted && (
                    <motion.div 
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className="absolute -top-1 -right-1 w-3 h-3 bg-green-500 rounded-full border-2 border-white shadow-lg"
                      style={{
                        boxShadow: "0 0 10px rgba(34, 197, 94, 0.5)"
                      }}
                    />
                  )}
                  
                  {/* Lock indicator */}
                  {!canAccess && (
                    <Lock className="absolute -top-1 -right-1 w-3 h-3 text-muted-foreground/50" />
                  )}
                </div>
                
                <span className={`text-xs font-medium ${
                  canAccess ? "" : "text-muted-foreground/50"
                }`}>{item.title}</span>
                
                {/* Active indicator */}
                {isActive && (
                  <motion.div
                    layoutId="activeTab"
                    className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-financial-secure rounded-full"
                  />
                )}
              </motion.div>
            </Link>
          );
        })}
      </div>
    </motion.nav>
  );
};

export default Navigation;
