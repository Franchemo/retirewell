
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowLeft, User, DollarSign, Target, Settings } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const Profile = () => {
  const [userProData, setUserData] = useState<any>({});
  const [riskTolerance, setRiskTolerance] = useState([5]);
  const [investmentFocus, setInvestmentFocus] = useState("balanced");
  const [legacyPlanning, setLegacyPlanning] = useState([3]);

  useEffect(() => {
    const savedOnboarding = localStorage.getItem("retirewell-onboarding");
    const savedDreams = localStorage.getItem("retirewell-dreams");
    
    if (savedOnboarding) {
      setUserData(JSON.parse(savedOnboarding));
    }
  }, []);

  const formatCurrency = (value: string | number) => {
    const num = typeof value === 'string' ? parseFloat(value) : value;
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(num || 0);
  };

  const totalSavings = 
    (parseFloat(userProData.savings?.retirement401k || '0') +
     parseFloat(userProData.savings?.ira || '0') +
     parseFloat(userProData.savings?.other || '0'));

  const monthlyIncome = parseFloat(userProData.employment?.monthlyIncome || '0');
  const yearsToRetirement = 65 - parseFloat(userProData.demographics?.age || '35');

  return (
    <div className="mobile-full bg-gradient-to-br from-background via-primary/5 to-financial-secure/10">
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
            <h1 className="text-2xl font-bold ml-3">Your Profile</h1>
          </div>
          <p className="text-foreground/70">
            Manage your retirement planning profile
          </p>
        </motion.div>

        {/* Personal Info */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mb-6"
        >
          <Card className="financial-card">
            <CardHeader>
              <CardTitle className="flex items-center">
                <User className="w-5 h-5 mr-2 text-financial-secure" />
                Personal Information
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Age</label>
                  <p className="text-lg font-semibold">{userProData.demographics?.age || 'Not set'}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Marital Status</label>
                  <p className="text-lg font-semibold capitalize">{userProData.demographics?.maritalStatus || 'Not set'}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Dependents</label>
                  <p className="text-lg font-semibold">{userProData.demographics?.dependents || '0'}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Retirement Age</label>
                  <p className="text-lg font-semibold">65</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Financial Overview */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mb-6"
        >
          <Card className="progress-card">
            <CardHeader>
              <CardTitle className="flex items-center">
                <DollarSign className="w-5 h-5 mr-2 text-financial-growth" />
                Financial Overview
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 gap-6">
                <div className="text-center p-4 bg-financial-success/10 rounded-lg border border-financial-success/20">
                  <div className="text-2xl font-bold text-success-gradient mb-1">
                    {formatCurrency(totalSavings)}
                  </div>
                  <div className="text-sm text-muted-foreground">Total Saved</div>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center">
                    <div className="text-xl font-bold text-financial-gradient">
                      {formatCurrency(monthlyIncome)}
                    </div>
                    <div className="text-sm text-muted-foreground">Monthly Income</div>
                  </div>
                  <div className="text-center">
                    <div className="text-xl font-bold text-financial-aspirational">
                      {yearsToRetirement}
                    </div>
                    <div className="text-sm text-muted-foreground">Years to Retirement</div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Preferences */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mb-6"
        >
          <Card className="scenario-card">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Settings className="w-5 h-5 mr-2 text-financial-secure" />
                Investment Preferences
              </CardTitle>
              <CardDescription>
                Customize your investment strategy
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <div className="flex justify-between items-center mb-3">
                  <label className="font-medium">Risk Tolerance</label>
                  <span className="text-sm font-semibold">
                    {riskTolerance[0] <= 3 ? 'Conservative' : 
                     riskTolerance[0] <= 7 ? 'Moderate' : 'Aggressive'}
                  </span>
                </div>
                <Slider
                  value={riskTolerance}
                  onValueChange={setRiskTolerance}
                  min={1}
                  max={10}
                  step={1}
                  className="w-full"
                />
                <div className="flex justify-between text-xs text-muted-foreground mt-1">
                  <span>Low Risk</span>
                  <span>High Risk</span>
                </div>
              </div>

              <div>
                <label className="font-medium mb-3 block">Investment Focus</label>
                <Select value={investmentFocus} onValueChange={setInvestmentFocus}>
                  <SelectTrigger className="financial-input">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="growth">Growth Focused</SelectItem>
                    <SelectItem value="income">Income Focused</SelectItem>
                    <SelectItem value="balanced">Balanced Approach</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <div className="flex justify-between items-center mb-3">
                  <label className="font-medium">Legacy Planning Importance</label>
                  <span className="text-sm font-semibold">{legacyPlanning[0]}/5</span>
                </div>
                <Slider
                  value={legacyPlanning}
                  onValueChange={setLegacyPlanning}
                  min={1}
                  max={5}
                  step={1}
                  className="w-full"
                />
                <div className="flex justify-between text-xs text-muted-foreground mt-1">
                  <span>Not Important</span>
                  <span>Very Important</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Action Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="space-y-4 mb-24"
        >
          <Link to="/retirewell/dreams">
            <Button variant="outline" className="w-full py-6 text-base">
              Update Dreams & Goals
            </Button>
          </Link>
          
          <Link to="/retirewell/scenarios">
            <Button variant="outline" className="w-full py-6 text-base">
              Revise Financial Plan
            </Button>
          </Link>
        </motion.div>
      </div>
    </div>
  );
};

export default Profile;
