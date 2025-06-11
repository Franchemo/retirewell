
import { motion } from "framer-motion";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Heart, Target, TrendingUp, BookOpen, User, Lock } from "lucide-react";
import { useRetireWell } from "@/contexts/RetireWellContext";
import { useToast } from "@/hooks/use-toast";

const Navigation = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { userProgress, canAccessPage } = useRetireWell();
  const { toast } = useToast();
  
  const navItems = [
    { 
      title: "Dreams", 
      href: "/retirewell/dreams", 
      icon: Heart, 
      page: "dreams",
      progress: userProgress.hasCompletedDreams 
    },
    { 
      title: "Profile", 
      href: "/retirewell/onboarding", 
      icon: User, 
      page: "onboarding",
      progress: userProgress.hasCompletedOnboarding 
    },
    { 
      title: "Scenarios", 
      href: "/retirewell/scenarios", 
      icon: TrendingUp, 
      page: "scenarios",
      progress: userProgress.hasCompletedScenarios 
    },
    { 
      title: "Vision", 
      href: "/retirewell/visualization", 
      icon: Target, 
      page: "visualization",
      progress: false 
    },
    { 
      title: "Learn", 
      href: "/retirewell/learn", 
      icon: BookOpen, 
      page: "learn",
      progress: false 
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
      case 'onboarding':
        return 'dreams';
      case 'scenarios':
        return 'profile setup';
      case 'visualization':
        return 'scenario planning';
      default:
        return 'previous steps';
    }
  };

  return (
    <motion.nav
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="fixed bottom-0 left-0 right-0 bg-white/95 backdrop-blur-sm border-t border-border/50 z-50"
    >
      <div className="flex justify-around items-center py-2 px-4 max-w-md mx-auto">
        {navItems.map((item, index) => {
          const isActive = location.pathname === item.href;
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
                className={`flex flex-col items-center space-y-1 px-3 py-2 rounded-lg transition-all duration-200 relative ${
                  isActive
                    ? "bg-financial-secure/10 text-financial-secure"
                    : canAccess
                    ? "text-muted-foreground hover:text-financial-secure"
                    : "text-muted-foreground/50 cursor-not-allowed"
                }`}
              >
                <div className="relative">
                  <item.icon className={`w-5 h-5 ${
                    isActive ? "text-financial-secure" : 
                    canAccess ? "" : "text-muted-foreground/50"
                  }`} />
                  
                  {/* Progress indicator */}
                  {isCompleted && (
                    <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></div>
                  )}
                  
                  {/* Lock indicator */}
                  {!canAccess && (
                    <Lock className="absolute -top-1 -right-1 w-3 h-3 text-muted-foreground/50" />
                  )}
                </div>
                
                <span className={`text-xs font-medium ${
                  canAccess ? "" : "text-muted-foreground/50"
                }`}>{item.title}</span>
              </motion.div>
            </Link>
          );
        })}
      </div>
    </motion.nav>
  );
};

export default Navigation;
