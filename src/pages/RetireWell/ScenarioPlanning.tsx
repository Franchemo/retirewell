
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowLeft, TrendingUp, Settings, Target } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Slider } from "@/components/ui/slider";
import { Button } from "@/components/ui/button";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import Navigation from "@/components/RetireWell/Navigation";

const ScenarioPlanning = () => {
  const [retirementAge, setRetirementAge] = useState([65]);
  const [monthlyContribution, setMonthlyContribution] = useState([500]);
  const [incomeGoal, setIncomeGoal] = useState([50000]);
  const [projectionData, setProjectionData] = useState<any[]>([]);

  // Load saved data
  useEffect(() => {
    const savedOnboarding = localStorage.getItem("retirewell-onboarding");
    if (savedOnboarding) {
      const data = JSON.parse(savedOnboarding);
      // Use saved data to initialize calculations
    }
    
    // Generate projection data
    generateProjection();
  }, [retirementAge, monthlyContribution]);

  const generateProjection = () => {
    const currentAge = 35; // Default or from saved data
    const years = retirementAge[0] - currentAge;
    const data = [];
    
    let totalSavings = 50000; // Starting amount from saved data
    
    for (let i = 0; i <= years; i++) {
      const age = currentAge + i;
      data.push({
        age,
        savings: Math.round(totalSavings),
        contributions: monthlyContribution[0] * 12 * i,
      });
      
      // Simple compound interest calculation (7% annually)
      totalSavings = totalSavings * 1.07 + (monthlyContribution[0] * 12);
    }
    
    setProjectionData(data);
  };

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value);
  };

  const finalSavings = projectionData[projectionData.length - 1]?.savings || 0;
  const feasibilityScore = Math.min(100, (finalSavings / (incomeGoal[0] * 25)) * 100);

  return (
    <div className="mobile-full bg-gradient-to-br from-background via-primary/5 to-financial-growth/10 pb-20">
      <div className="mobile-container py-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <div className="flex items-center mb-4">
            <Link to="/retirewell/goals" className="p-2 rounded-lg hover:bg-white/20 transition-colors">
              <ArrowLeft className="w-5 h-5" />
            </Link>
            <h1 className="text-2xl font-bold ml-3">Scenario Planning</h1>
          </div>
          <p className="text-foreground/70">
            Visualize your financial future and adjust your strategy
          </p>
        </motion.div>

        {/* Chart */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <Card className="scenario-card mb-6">
            <CardHeader>
              <CardTitle className="flex items-center">
                <TrendingUp className="w-5 h-5 mr-2 text-financial-growth" />
                Savings Projection
              </CardTitle>
              <CardDescription>
                Your projected savings over time
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-64 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={projectionData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                    <XAxis 
                      dataKey="age" 
                      stroke="#666"
                      fontSize={12}
                    />
                    <YAxis 
                      stroke="#666"
                      fontSize={12}
                      tickFormatter={(value) => `$${(value / 1000).toFixed(0)}k`}
                    />
                    <Tooltip 
                      formatter={(value) => [formatCurrency(value as number), "Savings"]}
                      labelFormatter={(age) => `Age ${age}`}
                    />
                    <Line 
                      type="monotone" 
                      dataKey="savings" 
                      stroke="#4B4E8E" 
                      strokeWidth={3}
                      dot={{ fill: "#4B4E8E", strokeWidth: 2, r: 4 }}
                      activeDot={{ r: 6, stroke: "#4B4E8E", strokeWidth: 2 }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Controls */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="space-y-4 mb-6"
        >
          <Card className="scenario-card">
            <CardHeader>
              <CardTitle className="flex items-center text-lg">
                <Settings className="w-5 h-5 mr-2" />
                Adjust Your Plan
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <div className="flex justify-between items-center mb-3">
                  <label className="font-medium">Retirement Age</label>
                  <span className="text-lg font-bold text-financial-secure">{retirementAge[0]}</span>
                </div>
                <Slider
                  value={retirementAge}
                  onValueChange={setRetirementAge}
                  min={55}
                  max={75}
                  step={1}
                  className="w-full"
                />
              </div>

              <div>
                <div className="flex justify-between items-center mb-3">
                  <label className="font-medium">Monthly Contribution</label>
                  <span className="text-lg font-bold text-financial-growth">{formatCurrency(monthlyContribution[0])}</span>
                </div>
                <Slider
                  value={monthlyContribution}
                  onValueChange={setMonthlyContribution}
                  min={100}
                  max={2000}
                  step={50}
                  className="w-full"
                />
              </div>

              <div>
                <div className="flex justify-between items-center mb-3">
                  <label className="font-medium">Annual Income Goal</label>
                  <span className="text-lg font-bold text-financial-aspirational">{formatCurrency(incomeGoal[0])}</span>
                </div>
                <Slider
                  value={incomeGoal}
                  onValueChange={setIncomeGoal}
                  min={20000}
                  max={100000}
                  step={5000}
                  className="w-full"
                />
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Results */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="space-y-4 mb-24"
        >
          {/* Projected Total */}
          <Card className="progress-card">
            <CardContent className="pt-6">
              <div className="text-center">
                <div className="text-3xl font-bold text-success-gradient mb-2 animate-number">
                  {formatCurrency(finalSavings)}
                </div>
                <p className="text-muted-foreground">Projected Total at Retirement</p>
              </div>
            </CardContent>
          </Card>

          {/* Feasibility */}
          <Card className={`scenario-card ${feasibilityScore >= 80 ? 'border-financial-success/40' : feasibilityScore >= 60 ? 'border-financial-warning/40' : 'border-financial-critical/40'}`}>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Target className="w-5 h-5 mr-2" />
                Goal Feasibility
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center space-x-4">
                <div className="flex-1">
                  <div className="flex justify-between mb-2">
                    <span className="text-sm font-medium">Achievement Likelihood</span>
                    <span className="text-sm font-bold">{Math.round(feasibilityScore)}%</span>
                  </div>
                  <div className="w-full bg-muted rounded-full h-3">
                    <div 
                      className={`h-3 rounded-full transition-all duration-500 ${
                        feasibilityScore >= 80 ? 'bg-financial-success' : 
                        feasibilityScore >= 60 ? 'bg-financial-warning' : 'bg-financial-critical'
                      }`}
                      style={{ width: `${Math.min(feasibilityScore, 100)}%` }}
                    />
                  </div>
                </div>
              </div>
              {feasibilityScore < 80 && (
                <div className="mt-4 p-3 bg-financial-warning/10 rounded-lg border border-financial-warning/20">
                  <p className="text-sm text-financial-warning font-medium">
                    💡 Try increasing your monthly contributions or retirement age to improve your outlook
                  </p>
                </div>
              )}
            </CardContent>
          </Card>
        </motion.div>

        {/* Fixed Bottom Button */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="fixed bottom-20 left-1/2 transform -translate-x-1/2 w-full max-w-md px-4"
        >
          <Link to="/retirewell/dreams/visualization">
            <Button className="w-full button-financial text-lg py-4">
              Visualize Your Dreams
              <ArrowLeft className="w-5 h-5 ml-2 rotate-180" />
            </Button>
          </Link>
        </motion.div>
      </div>
      
      {/* Bottom Navigation */}
      <Navigation />
    </div>
  );
};

export default ScenarioPlanning;
