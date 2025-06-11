
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Heart, Target, TrendingUp, BookOpen, User, ArrowRight, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import Navigation from "@/components/RetireWell/Navigation";
import { useRetireWell } from "@/contexts/RetireWellContext";

const RetireWellHome = () => {
  const { userProgress, getNextStep } = useRetireWell();

  const getWelcomeMessage = () => {
    if (!userProgress.hasCompletedDreams) {
      return {
        title: "Welcome to Your Future",
        subtitle: "Transform your retirement dreams into actionable plans with our emotionally intelligent financial tools.",
        cta: "Start Your Journey",
        nextStep: "/retirewell/dreams"
      };
    } else if (!userProgress.hasCompletedOnboarding) {
      return {
        title: "Great Start!",
        subtitle: `You've added ${userProgress.dreamsCount} retirement dream${userProgress.dreamsCount > 1 ? 's' : ''}. Now let's set up your financial profile.`,
        cta: "Complete Your Profile",
        nextStep: getNextStep()
      };
    } else if (!userProgress.hasCompletedScenarios) {
      return {
        title: "Profile Complete!",
        subtitle: "Now let's create scenarios to see how you can achieve your dreams.",
        cta: "Plan Your Scenarios",
        nextStep: getNextStep()
      };
    } else {
      return {
        title: "Ready to Visualize!",
        subtitle: "Everything is set up. Let's see your retirement dreams come to life.",
        cta: "Visualize Your Future",
        nextStep: getNextStep()
      };
    }
  };

  const navItems = [
    { 
      title: "Dreams", 
      href: "/retirewell/dreams", 
      icon: Heart, 
      description: "Set your retirement vision",
      completed: userProgress.hasCompletedDreams
    },
    { 
      title: "Profile", 
      href: "/retirewell/onboarding", 
      icon: User, 
      description: "Your financial profile",
      completed: userProgress.hasCompletedOnboarding
    },
    { 
      title: "Scenarios", 
      href: "/retirewell/scenarios", 
      icon: TrendingUp, 
      description: "Plan your financial future",
      completed: userProgress.hasCompletedScenarios
    },
    { 
      title: "Visualization", 
      href: "/retirewell/visualization", 
      icon: Target, 
      description: "See your dreams come to life",
      completed: false
    },
    { 
      title: "Learn", 
      href: "/retirewell/learn", 
      icon: BookOpen, 
      description: "Financial education & tools",
      completed: false
    },
  ];

  const welcomeData = getWelcomeMessage();

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
            Your journey to financial wellness and retirement clarity
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
            <h2 className="text-2xl font-semibold mb-3">{welcomeData.title}</h2>
            <p className="text-foreground/70 mb-6">
              {welcomeData.subtitle}
            </p>
            <Link to={welcomeData.nextStep}>
              <Button className="button-financial">
                {welcomeData.cta}
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </Link>
          </div>
        </motion.div>

        {/* Progress Tracker */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="financial-card mb-8"
        >
          <h3 className="font-semibold text-lg mb-4">Your Journey Progress</h3>
          <div className="space-y-3">
            {navItems.slice(0, 4).map((item, index) => (
              <div key={index} className="flex items-center">
                <div className={`w-6 h-6 rounded-full flex items-center justify-center ${
                  item.completed ? "bg-green-500 text-white" : "bg-muted text-muted-foreground"
                }`}>
                  {item.completed ? (
                    <CheckCircle className="w-4 h-4" />
                  ) : (
                    <span className="text-xs">{index + 1}</span>
                  )}
                </div>
                <div className="ml-3 flex-1">
                  <p className="text-sm font-medium">{item.title}</p>
                </div>
                <div className={`text-xs ${
                  item.completed ? "text-green-500" : "text-muted-foreground"
                }`}>
                  {item.completed ? "Completed" : "Pending"}
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Navigation Grid */}
        <div className="grid grid-cols-1 gap-4 mb-8">
          {navItems.map((item, index) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 + index * 0.1 }}
            >
              <Link to={item.href}>
                <div className="financial-card group cursor-pointer relative">
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
                  
                  {item.completed && (
                    <div className="absolute top-0 right-0 mt-1 mr-1 bg-green-500 text-white rounded-full w-5 h-5 flex items-center justify-center">
                      <CheckCircle className="w-3 h-3" />
                    </div>
                  )}
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
          <div className="grid grid-cols-3 gap-2">
            <div className="text-center">
              <div className="text-2xl font-bold text-success-gradient">{userProgress.dreamsCount}</div>
              <div className="text-xs text-muted-foreground">Dreams Set</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-financial-gradient">
                {userProgress.onboardingData ? userProgress.onboardingData.demographics?.age || '0' : '0'}
              </div>
              <div className="text-xs text-muted-foreground">Age</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-success-gradient">
                {userProgress.hasCompletedOnboarding && userProgress.onboardingData?.savings ? 
                  '$' + (
                    parseFloat(userProgress.onboardingData.savings.retirement401k || '0') + 
                    parseFloat(userProgress.onboardingData.savings.ira || '0') + 
                    parseFloat(userProgress.onboardingData.savings.other || '0')
                  ).toLocaleString() : 
                  '$0'
                }
              </div>
              <div className="text-xs text-muted-foreground">Total Saved</div>
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
