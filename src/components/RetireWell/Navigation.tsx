
import { motion } from "framer-motion";
import { Link, useLocation } from "react-router-dom";
import { Heart, Target, TrendingUp, BookOpen, User } from "lucide-react";

const Navigation = () => {
  const location = useLocation();
  
  const navItems = [
    { title: "Dreams", href: "/retirewell/dreams", icon: Heart },
    { title: "Scenarios", href: "/retirewell/scenarios", icon: TrendingUp },
    { title: "Visualization", href: "/retirewell/visualization", icon: Target },
    { title: "Learn", href: "/retirewell/learn", icon: BookOpen },
    { title: "Profile", href: "/retirewell/profile", icon: User },
  ];

  return (
    <motion.nav
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="fixed bottom-0 left-0 right-0 bg-white/95 backdrop-blur-sm border-t border-border/50 z-50"
    >
      <div className="flex justify-around items-center py-2 px-4 max-w-md mx-auto">
        {navItems.map((item, index) => {
          const isActive = location.pathname === item.href;
          return (
            <Link key={item.title} to={item.href}>
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className={`flex flex-col items-center space-y-1 px-3 py-2 rounded-lg transition-all duration-200 ${
                  isActive
                    ? "bg-financial-secure/10 text-financial-secure"
                    : "text-muted-foreground hover:text-financial-secure"
                }`}
              >
                <item.icon className={`w-5 h-5 ${isActive ? "text-financial-secure" : ""}`} />
                <span className="text-xs font-medium">{item.title}</span>
              </motion.div>
            </Link>
          );
        })}
      </div>
    </motion.nav>
  );
};

export default Navigation;
