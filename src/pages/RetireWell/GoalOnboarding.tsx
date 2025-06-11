
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import { ArrowLeft, ArrowRight, Users, Briefcase, PiggyBank, Target } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";

interface OnboardingData {
  demographics: {
    age: string;
    maritalStatus: string;
    dependents: string;
  };
  employment: {
    type: string;
    monthlyIncome: string;
  };
  savings: {
    retirement401k: string;
    ira: string;
    other: string;
  };
  priorities: string[];
}

const GoalOnboarding = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [data, setData] = useState<OnboardingData>({
    demographics: { age: "", maritalStatus: "", dependents: "" },
    employment: { type: "", monthlyIncome: "" },
    savings: { retirement401k: "", ira: "", other: "" },
    priorities: ["retirement", "kids", "debt", "care", "health"]
  });

  const navigate = useNavigate();
  const { toast } = useToast();

  const steps = [
    {
      title: "About You",
      icon: Users,
      description: "Tell us a bit about yourself"
    },
    {
      title: "Employment & Income",
      icon: Briefcase,
      description: "Your current work situation"
    },
    {
      title: "Current Savings",
      icon: PiggyBank,
      description: "What you've saved so far"
    },
    {
      title: "Priorities",
      icon: Target,
      description: "Rank your financial goals"
    }
  ];

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      handleComplete();
    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleComplete = () => {
    // Save to localStorage
    localStorage.setItem("retirewell-onboarding", JSON.stringify({
      ...data,
      timestamp: Date.now()
    }));

    toast({
      title: "Profile completed!",
      description: "Your financial profile has been saved.",
    });

    navigate("/retirewell/scenarios");
  };

  const updateData = (section: string, field: string, value: string) => {
    setData(prev => ({
      ...prev,
      [section]: {
        ...prev[section as keyof OnboardingData],
        [field]: value
      }
    }));
  };

  const movePriority = (fromIndex: number, toIndex: number) => {
    const newPriorities = [...data.priorities];
    const [movedItem] = newPriorities.splice(fromIndex, 1);
    newPriorities.splice(toIndex, 0, movedItem);
    setData(prev => ({ ...prev, priorities: newPriorities }));
  };

  const renderStep = () => {
    switch (currentStep) {
      case 0:
        return (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="space-y-6"
          >
            <div>
              <Label htmlFor="age" className="text-base font-medium">Age</Label>
              <Input
                id="age"
                type="number"
                placeholder="35"
                value={data.demographics.age}
                onChange={(e) => updateData("demographics", "age", e.target.value)}
                className="financial-input mt-2"
              />
            </div>
            <div>
              <Label htmlFor="marital" className="text-base font-medium">Marital Status</Label>
              <Select onValueChange={(value) => updateData("demographics", "maritalStatus", value)}>
                <SelectTrigger className="financial-input mt-2">
                  <SelectValue placeholder="Select status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="single">Single</SelectItem>
                  <SelectItem value="married">Married</SelectItem>
                  <SelectItem value="divorced">Divorced</SelectItem>
                  <SelectItem value="widowed">Widowed</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="dependents" className="text-base font-medium">Number of Dependents</Label>
              <Input
                id="dependents"
                type="number"
                placeholder="0"
                value={data.demographics.dependents}
                onChange={(e) => updateData("demographics", "dependents", e.target.value)}
                className="financial-input mt-2"
              />
            </div>
          </motion.div>
        );

      case 1:
        return (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="space-y-6"
          >
            <div>
              <Label className="text-base font-medium">Employment Type</Label>
              <Select onValueChange={(value) => updateData("employment", "type", value)}>
                <SelectTrigger className="financial-input mt-2">
                  <SelectValue placeholder="Select employment type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="full-time">Full-time Employee</SelectItem>
                  <SelectItem value="part-time">Part-time Employee</SelectItem>
                  <SelectItem value="self-employed">Self-employed</SelectItem>
                  <SelectItem value="contractor">Contractor</SelectItem>
                  <SelectItem value="retired">Retired</SelectItem>
                  <SelectItem value="unemployed">Unemployed</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="income" className="text-base font-medium">Monthly Income (before taxes)</Label>
              <Input
                id="income"
                type="number"
                placeholder="5000"
                value={data.employment.monthlyIncome}
                onChange={(e) => updateData("employment", "monthlyIncome", e.target.value)}
                className="financial-input mt-2"
              />
            </div>
          </motion.div>
        );

      case 2:
        return (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="space-y-6"
          >
            <div>
              <Label htmlFor="401k" className="text-base font-medium">401(k) Balance</Label>
              <Input
                id="401k"
                type="number"
                placeholder="25000"
                value={data.savings.retirement401k}
                onChange={(e) => updateData("savings", "retirement401k", e.target.value)}
                className="financial-input mt-2"
              />
            </div>
            <div>
              <Label htmlFor="ira" className="text-base font-medium">IRA Balance</Label>
              <Input
                id="ira"
                type="number"
                placeholder="10000"
                value={data.savings.ira}
                onChange={(e) => updateData("savings", "ira", e.target.value)}
                className="financial-input mt-2"
              />
            </div>
            <div>
              <Label htmlFor="other" className="text-base font-medium">Other Savings</Label>
              <Input
                id="other"
                type="number"
                placeholder="15000"
                value={data.savings.other}
                onChange={(e) => updateData("savings", "other", e.target.value)}
                className="financial-input mt-2"
              />
            </div>
          </motion.div>
        );

      case 3:
        const priorityLabels = {
          retirement: "Retirement Planning",
          kids: "Children's Education",
          debt: "Debt Payment",
          care: "Healthcare Costs",
          health: "Health & Wellness"
        };

        return (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="space-y-4"
          >
            <p className="text-foreground/70 mb-6">
              Drag to reorder your financial priorities from most to least important:
            </p>
            {data.priorities.map((priority, index) => (
              <motion.div
                key={priority}
                layout
                className="financial-card cursor-move"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <div className="flex items-center space-x-4">
                  <div className="w-8 h-8 rounded-full bg-financial-secure/20 flex items-center justify-center text-sm font-semibold text-financial-secure">
                    {index + 1}
                  </div>
                  <div className="flex-1">
                    <h3 className="font-medium">{priorityLabels[priority as keyof typeof priorityLabels]}</h3>
                  </div>
                  <div className="text-muted-foreground">
                    ⋮⋮
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        );

      default:
        return null;
    }
  };

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
            <button 
              onClick={currentStep === 0 ? () => navigate("/retirewell/dreams") : handleBack}
              className="p-2 rounded-lg hover:bg-white/20 transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
            <h1 className="text-2xl font-bold ml-3">{steps[currentStep].title}</h1>
          </div>
          <p className="text-foreground/70">{steps[currentStep].description}</p>
        </motion.div>

        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex justify-between mb-2">
            {steps.map((step, index) => (
              <div key={index} className="flex items-center">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center transition-all ${
                  index <= currentStep 
                    ? 'bg-financial-secure text-white' 
                    : 'bg-muted text-muted-foreground'
                }`}>
                  <step.icon className="w-4 h-4" />
                </div>
                {index < steps.length - 1 && (
                  <div className={`w-16 h-1 mx-2 transition-all ${
                    index < currentStep ? 'bg-financial-secure' : 'bg-muted'
                  }`} />
                )}
              </div>
            ))}
          </div>
          <div className="text-sm text-muted-foreground text-center">
            Step {currentStep + 1} of {steps.length}
          </div>
        </div>

        {/* Step Content */}
        <div className="financial-card mb-8 min-h-96">
          <AnimatePresence mode="wait">
            {renderStep()}
          </AnimatePresence>
        </div>

        {/* Navigation */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="fixed bottom-6 left-1/2 transform -translate-x-1/2 w-full max-w-md px-4"
        >
          <Button 
            onClick={handleNext}
            className="w-full button-financial text-lg py-4"
          >
            {currentStep === steps.length - 1 ? "Complete Setup" : "Continue"}
            <ArrowRight className="w-5 h-5 ml-2" />
          </Button>
        </motion.div>

        {/* Safe area */}
        <div className="h-24"></div>
      </div>
    </div>
  );
};

export default GoalOnboarding;
