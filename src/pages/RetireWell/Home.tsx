
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Heart, Target, TrendingUp, BookOpen, User, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import Navigation from "@/components/RetireWell/Navigation";

const RetireWellHome = () => {
  const navItems = [
    { title: "Dreams", href: "/retirewell/dreams", icon: Heart, description: "Set your retirement vision" },
    { title: "Scenarios", href: "/retirewell/scenarios", icon: TrendingUp, description: "Plan your financial future" },
    { title: "Visualization", href: "/retirewell/visualization", icon: Target, description: "See your dreams come to life" },
    { title: "Learn", href: "/retirewell/learn", icon: BookOpen, description: "Financial education & tools" },
    { title: "Profile", href: "/retirewell/profile", icon: User, description: "Your retirement profile" },
  ];

  return (
    <div className="mobile-full bg-gradient-to-br from-background via-background to-primary/5 pb-20">
      <div className="mobile-container py-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <h1 className="text-4xl font-bold text-financial-gradient mb-4">
            RetireWell
          </h1>
          <p className="text-lg text-muted-foreground leading-relaxed">
            Your journey to financial wellness and retirement clarity starts here
          </p>
        </motion.div>

        {/* Welcome Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="financial-card mb-8"
        >
          <div className="text-center">
            <h2 className="text-2xl font-semibold mb-3">Welcome to Your Future</h2>
            <p className="text-foreground/70 mb-6">
              Transform your retirement dreams into actionable plans with our emotionally intelligent financial tools.
            </p>
            <Link to="/retirewell/dreams">
              <Button className="button-financial">
                Start Your Journey
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </Link>
          </div>
        </motion.div>

        {/* Navigation Grid */}
        <div className="grid grid-cols-1 gap-4 mb-8">
          {navItems.map((item, index) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 + index * 0.1 }}
            >
              <Link to={item.href}>
                <div className="financial-card group cursor-pointer">
                  <div className="flex items-center space-x-4">
                    <div className="p-3 rounded-xl bg-gradient-to-br from-financial-secure/10 to-financial-aspirational/10 group-hover:from-financial-secure/20 group-hover:to-financial-aspirational/20 transition-all duration-300">
                      <item.icon className="w-6 h-6 text-financial-secure" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-lg">{item.title}</h3>
                      <p className="text-sm text-muted-foreground">{item.description}</p>
                    </div>
                    <ArrowRight className="w-5 h-5 text-muted-foreground group-hover:text-financial-secure transition-colors" />
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

        {/* Quick Stats Preview */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
          className="progress-card"
        >
          <h3 className="font-semibold mb-4">Your Progress at a Glance</h3>
          <div className="grid grid-cols-2 gap-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-success-gradient">$0</div>
              <div className="text-sm text-muted-foreground">Total Saved</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-financial-gradient">0</div>
              <div className="text-sm text-muted-foreground">Dreams Set</div>
            </div>
          </div>
        </motion.div>
      </div>
      
      {/* Bottom Navigation */}
      <Navigation />
    </div>
  );
};

export default RetireWellHome;
