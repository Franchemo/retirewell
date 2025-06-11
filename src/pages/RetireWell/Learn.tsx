
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowLeft, BookOpen, Users, Calculator, Sparkles } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const Learn = () => {
  const learningModules = [
    {
      title: "Financial Guides",
      description: "Learn the fundamentals of retirement planning",
      icon: BookOpen,
      color: "financial-secure",
      topics: [
        "Understanding 401(k) vs IRA",
        "Investment Portfolio Basics",
        "Social Security Planning",
        "Healthcare Cost Planning"
      ]
    },
    {
      title: "Community Support",
      description: "Connect with others on their retirement journey",
      icon: Users,
      color: "financial-aspirational",
      topics: [
        "Discussion Forums",
        "Success Stories",
        "Q&A with Experts",
        "Local Meetups"
      ]
    },
    {
      title: "Planning Tools",
      description: "Interactive calculators and worksheets",
      icon: Calculator,
      color: "financial-growth",
      topics: [
        "Retirement Calculator",
        "Savings Goal Tracker",
        "Risk Assessment Tool",
        "Budget Planner"
      ]
    },
    {
      title: "Personalized Experience",
      description: "AI-powered insights tailored to your situation",
      icon: Sparkles,
      color: "financial-success",
      topics: [
        "Custom Recommendations",
        "Progress Tracking",
        "Goal Adjustments",
        "Market Updates"
      ]
    }
  ];

  return (
    <div className="mobile-full bg-gradient-to-br from-background via-primary/5 to-financial-aspirational/10">
      <div className="mobile-container py-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <div className="flex items-center mb-4">
            <Link to="/retirewell" className="p-2 rounded-lg hover:bg-white/20 transition-colors">
              <ArrowLeft className="w-5 h-5" />
            </Link>
            <h1 className="text-2xl font-bold ml-3">Learn & Grow</h1>
          </div>
          <p className="text-foreground/70">
            Expand your financial knowledge and connect with others
          </p>
        </motion.div>

        {/* Featured Article */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mb-8"
        >
          <Card className="dream-card bg-gradient-to-br from-financial-aspirational/10 via-white/80 to-financial-secure/10">
            <CardHeader>
              <CardTitle className="text-financial-aspirational">Featured This Week</CardTitle>
              <CardDescription className="text-lg font-medium">
                "5 Common Retirement Planning Mistakes to Avoid"
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-foreground/70 mb-4">
                Learn from the most common pitfalls that can derail your retirement dreams and how to avoid them.
              </p>
              <Button className="button-financial">
                Read Article
              </Button>
            </CardContent>
          </Card>
        </motion.div>

        {/* Learning Modules */}
        <div className="grid grid-cols-1 gap-6 mb-8">
          {learningModules.map((module, index) => (
            <motion.div
              key={module.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 + index * 0.1 }}
            >
              <Card className="financial-card hover:shadow-lg transition-all duration-300 cursor-pointer group">
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <div className={`p-2 rounded-lg bg-${module.color}/10 mr-3 group-hover:bg-${module.color}/20 transition-colors`}>
                      <module.icon className={`w-5 h-5 text-${module.color}`} />
                    </div>
                    {module.title}
                  </CardTitle>
                  <CardDescription>{module.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    {module.topics.map((topic, topicIndex) => (
                      <div 
                        key={topicIndex}
                        className="flex items-center text-sm text-foreground/70"
                      >
                        <div className={`w-2 h-2 rounded-full bg-${module.color}/60 mr-3`}></div>
                        {topic}
                      </div>
                    ))}
                  </div>
                  <Button 
                    variant="outline" 
                    className="w-full mt-4 group-hover:border-primary group-hover:text-primary transition-colors"
                  >
                    Explore {module.title}
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Quick Resources */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="mb-8"
        >
          <Card className="scenario-card">
            <CardHeader>
              <CardTitle>Quick Resources</CardTitle>
              <CardDescription>Helpful links and tools</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-4">
                <Button variant="outline" className="h-auto py-4 flex flex-col items-center space-y-2">
                  <Calculator className="w-5 h-5" />
                  <span className="text-sm">Calculator</span>
                </Button>
                <Button variant="outline" className="h-auto py-4 flex flex-col items-center space-y-2">
                  <BookOpen className="w-5 h-5" />
                  <span className="text-sm">Guides</span>
                </Button>
                <Button variant="outline" className="h-auto py-4 flex flex-col items-center space-y-2">
                  <Users className="w-5 h-5" />
                  <span className="text-sm">Community</span>
                </Button>
                <Button variant="outline" className="h-auto py-4 flex flex-col items-center space-y-2">
                  <Sparkles className="w-5 h-5" />
                  <span className="text-sm">AI Insights</span>
                </Button>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
};

export default Learn;
