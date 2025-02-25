
import { motion } from "framer-motion";
import { LineChart, Line, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, TooltipProps } from 'recharts';
import { Brain, Calendar, TrendingUp, Target, ArrowRight } from 'lucide-react';
import { useState } from "react";

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 }
};

const CustomTooltip = ({
  active,
  payload,
  label,
}: TooltipProps<number, string>) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white p-3 rounded-lg shadow-lg border border-gray-100">
        <p className="text-sm font-medium text-gray-900">{label}</p>
        <p className="text-sm text-optimal2">
          Score: {payload[0].value}
        </p>
      </div>
    );
  }
  return null;
};

export const ProgressDashboard = () => {
  const [timeframe, setTimeframe] = useState<"daily" | "weekly">("daily");

  const progressData = [
    { date: 'Week 1', progress: 30 },
    { date: 'Week 2', progress: 45 },
    { date: 'Week 3', progress: 65 },
    { date: 'Week 4', progress: 85 },
  ];

  const wellnessData = {
    daily: [
      { day: 'Mon', score: 75 },
      { day: 'Tue', score: 82 },
      { day: 'Wed', score: 78 },
      { day: 'Thu', score: 85 },
      { day: 'Fri', score: 80 },
      { day: 'Sat', score: 88 },
      { day: 'Sun', score: 85 },
    ],
    weekly: [
      { day: 'Week 1', score: 72 },
      { day: 'Week 2', score: 78 },
      { day: 'Week 3', score: 82 },
      { day: 'Week 4', score: 85 },
    ]
  };

  const suggestedContent = [
    {
      title: "Morning Mindfulness",
      type: "meditation",
      duration: "10 min",
      icon: Brain,
    },
    {
      title: "Stress Relief Exercise",
      type: "exercise",
      duration: "15 min",
      icon: Target,
    }
  ];

  return (
    <motion.div
      variants={container}
      initial="hidden"
      animate="show"
      className="space-y-6 max-w-4xl mx-auto"
    >
      {/* Health Summary Cards */}
      <motion.div variants={item} className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {/* Biological Age Card */}
        <motion.div 
          whileHover={{ scale: 1.01 }}
          transition={{ duration: 0.2 }}
          className="rounded-xl overflow-hidden relative shadow-card"
        >
          <div className="bg-gradient-to-br from-amber-400 to-amber-600 p-6 text-white h-full">
            <h3 className="text-lg font-medium opacity-90 mb-2">Biological Age</h3>
            <div className="flex items-end mb-2">
              <span className="text-4xl font-bold">28</span>
              <span className="ml-2 mb-1 opacity-90">years old</span>
            </div>
            <div className="flex items-center mt-3 rounded-full bg-white/20 px-3 py-1 w-fit">
              <div className="w-2 h-2 rounded-full bg-white mr-2"></div>
              <span className="text-sm font-medium">4 yrs younger than calendar age</span>
            </div>
          </div>
        </motion.div>
        
        {/* Health Score Card */}
        <motion.div 
          whileHover={{ scale: 1.01 }}
          transition={{ duration: 0.2 }}
          className="rounded-xl overflow-hidden shadow-card"
        >
          <div className="bg-gradient-to-br from-optimal2 to-optimal p-6 text-white h-full">
            <h3 className="text-lg font-medium opacity-90 mb-2">AugMend Score</h3>
            <div className="flex items-end mb-2">
              <span className="text-4xl font-bold">93</span>
              <span className="ml-2 mb-1 opacity-90">out of 100</span>
            </div>
            <p className="text-sm mt-3 opacity-90 font-medium">You're very healthy. Keep going!</p>
          </div>
        </motion.div>
        
        {/* Results Summary Card */}
        <motion.div 
          whileHover={{ scale: 1.01 }}
          transition={{ duration: 0.2 }}
          className="rounded-xl overflow-hidden shadow-card"
        >
          <div className="bg-gradient-to-br from-gray-800 to-gray-900 p-6 text-white h-full">
            <h3 className="text-lg font-medium opacity-90 mb-2">Results Summary</h3>
            <div className="space-y-3 mt-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <div className="w-2 h-2 rounded-full bg-optimal mr-2"></div>
                  <span className="text-sm">Optimal</span>
                </div>
                <span className="font-semibold">8</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <div className="w-2 h-2 rounded-full bg-caution mr-2"></div>
                  <span className="text-sm">Out of range</span>
                </div>
                <span className="font-semibold">2</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <div className="w-2 h-2 rounded-full bg-gray-400 mr-2"></div>
                  <span className="text-sm">Limited data</span>
                </div>
                <span className="font-semibold">4</span>
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>

      {/* Biomarkers Section */}
      <motion.div variants={item} className="bg-white rounded-xl p-6 shadow-card border border-gray-100">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-xl font-medium text-gray-900">Biomarkers</h3>
          <button className="text-sm text-optimal2 font-medium hover:underline transition-all flex items-center">
            View All
            <ArrowRight className="ml-1 w-3.5 h-3.5" />
          </button>
        </div>
        
        <div className="space-y-3">
          {/* Biomarker Items */}
          <div className="p-4 border border-gray-100 rounded-lg hover:shadow-sm transition-all bg-gray-50/50">
            <div className="flex justify-between items-center">
              <div>
                <h4 className="font-medium text-gray-900">Total Cholesterol</h4>
                <div className="flex items-center mt-1">
                  <div className="w-2 h-2 rounded-full bg-optimal mr-2"></div>
                  <span className="text-sm text-gray-600">Optimal</span>
                </div>
              </div>
              <span className="text-lg font-semibold text-gray-900">159 <span className="text-sm text-gray-500">mg/dL</span></span>
            </div>
          </div>
          
          <div className="p-4 border border-gray-100 rounded-lg hover:shadow-sm transition-all bg-gray-50/50">
            <div className="flex justify-between items-center">
              <div>
                <h4 className="font-medium text-gray-900">Testosterone</h4>
                <div className="flex items-center mt-1">
                  <div className="w-2 h-2 rounded-full bg-optimal mr-2"></div>
                  <span className="text-sm text-gray-600">Optimal</span>
                </div>
              </div>
              <span className="text-lg font-semibold text-gray-900">26 <span className="text-sm text-gray-500">ng/dL</span></span>
            </div>
          </div>
          
          <div className="p-4 border border-gray-100 rounded-lg hover:shadow-sm transition-all bg-gray-50/50">
            <div className="flex justify-between items-center">
              <div>
                <h4 className="font-medium text-gray-900">Glucose</h4>
                <div className="flex items-center mt-1">
                  <div className="w-2 h-2 rounded-full bg-optimal mr-2"></div>
                  <span className="text-sm text-gray-600">Optimal</span>
                </div>
              </div>
              <span className="text-lg font-semibold text-gray-900">96 <span className="text-sm text-gray-500">mg/dL</span></span>
            </div>
          </div>
          
          <div className="p-4 border border-gray-100 rounded-lg hover:shadow-sm transition-all bg-gray-50/50">
            <div className="flex justify-between items-center">
              <div>
                <h4 className="font-medium text-gray-900">Cortisol</h4>
                <div className="flex items-center mt-1">
                  <div className="w-2 h-2 rounded-full bg-critical mr-2"></div>
                  <span className="text-sm text-gray-600">Out of range</span>
                </div>
              </div>
              <span className="text-lg font-semibold text-gray-900">22 <span className="text-sm text-gray-500">μg/dL</span></span>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Doctor Recommendations */}
      <motion.div variants={item} className="bg-white rounded-xl p-6 shadow-card border border-gray-100">
        <div className="flex items-start mb-5">
          <div className="w-12 h-12 rounded-full overflow-hidden bg-gray-200 flex-shrink-0 mr-4 shadow-sm border border-gray-100">
            <img src="public/lovable-uploads/39d91bd3-ff69-4641-b263-097141ccd5ea.png" alt="Doctor" className="w-full h-full object-cover" />
          </div>
          <div>
            <h3 className="text-lg font-medium text-gray-900">Health goals selected by Dr. Matthews</h3>
            <p className="text-gray-600 mt-1">Hello! I've pinpointed these specific health goals to optimize your wellness journey. Feel free to book an advisor call if you have any questions.</p>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-5">
          <motion.div 
            whileHover={{ scale: 1.01 }}
            transition={{ duration: 0.2 }}
            className="p-4 border border-gray-100 rounded-lg flex items-center bg-gray-50/50 hover:shadow-sm"
          >
            <div className="w-10 h-10 rounded-lg bg-blue-100 flex items-center justify-center mr-4">
              <img src="public/lovable-uploads/4d947460-a7e1-49d4-9a79-c171b36825e9.png" className="w-6 h-6" alt="NMN supplement" />
            </div>
            <div>
              <h4 className="font-medium text-gray-900">NMN</h4>
              <p className="text-sm text-gray-500">500mg daily</p>
            </div>
          </motion.div>
          
          <motion.div 
            whileHover={{ scale: 1.01 }}
            transition={{ duration: 0.2 }}
            className="p-4 border border-gray-100 rounded-lg flex items-center bg-gray-50/50 hover:shadow-sm"
          >
            <div className="w-10 h-10 rounded-lg bg-green-100 flex items-center justify-center mr-4">
              <img src="public/lovable-uploads/df77e48d-ebc3-4d6d-9a13-45289081f953.png" className="w-6 h-6" alt="Vitamin D" />
            </div>
            <div>
              <h4 className="font-medium text-gray-900">Vitamin D3</h4>
              <p className="text-sm text-gray-500">5000 IU daily</p>
            </div>
          </motion.div>
        </div>
      </motion.div>

      {/* Advanced Testing Section */}
      <motion.div variants={item} className="bg-white rounded-xl overflow-hidden shadow-card">
        <div className="relative">
          <img src="public/lovable-uploads/4488840d-9890-40cb-84b0-90a3a9f2ea3f.png" alt="Advanced Testing" className="w-full h-56 object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-black/20 flex flex-col justify-end p-6">
            <h3 className="text-2xl font-medium text-white mb-2">Access to advanced testing</h3>
            <p className="text-white/90 max-w-md">Unlock deeper insights with our comprehensive testing services</p>
            <motion.button 
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="mt-4 bg-white text-gray-900 px-6 py-2.5 rounded-full inline-block max-w-max font-medium shadow-sm"
            >
              Explore Tests
            </motion.button>
          </div>
        </div>
        <div className="p-6 grid grid-cols-2 gap-4">
          <motion.div 
            whileHover={{ scale: 1.01 }}
            transition={{ duration: 0.2 }}
            className="p-5 bg-gray-50 rounded-lg text-center hover:shadow-sm transition-all"
          >
            <div className="mb-3 h-20 flex items-center justify-center">
              <div className="w-16 h-16 bg-orange-300 rounded-lg flex items-center justify-center shadow-sm">
                <TrendingUp className="w-8 h-8 text-white" />
              </div>
            </div>
            <h4 className="font-medium text-gray-900">Gut Microbiome Test</h4>
          </motion.div>
          <motion.div 
            whileHover={{ scale: 1.01 }}
            transition={{ duration: 0.2 }}
            className="p-5 bg-gray-50 rounded-lg text-center hover:shadow-sm transition-all"
          >
            <div className="mb-3 h-20 flex items-center justify-center">
              <div className="w-16 h-16 bg-red-400 rounded-lg flex items-center justify-center shadow-sm">
                <Brain className="w-8 h-8 text-white" />
              </div>
            </div>
            <h4 className="font-medium text-gray-900">Omega-3 Index</h4>
          </motion.div>
        </div>
      </motion.div>

      {/* Data Tracking Section */}
      <motion.div variants={item} className="bg-white rounded-xl p-6 shadow-card border border-gray-100">
        <h3 className="text-xl font-medium text-gray-900 mb-6">Track your data over a lifetime</h3>
        
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={wellnessData[timeframe]} margin={{ top: 5, right: 10, left: 0, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="day" tick={{fontSize: 12}} stroke="#9ca3af" />
              <YAxis domain={[0, 100]} tick={{fontSize: 12}} stroke="#9ca3af" />
              <Tooltip content={<CustomTooltip />} />
              <Line 
                type="monotone" 
                dataKey="score" 
                stroke="#00A86B" 
                strokeWidth={2.5}
                dot={{ fill: '#00A86B', r: 4, strokeWidth: 0 }}
                activeDot={{ r: 6, fill: '#00A86B', stroke: 'white', strokeWidth: 2 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
        
        <div className="flex justify-end mt-5 space-x-2">
          <motion.button 
            whileTap={{ scale: 0.97 }}
            onClick={() => setTimeframe("daily")}
            className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all ${
              timeframe === "daily"
                ? "bg-optimal2 text-white shadow-sm"
                : "bg-gray-100 text-gray-600 hover:bg-gray-200"
            }`}
          >
            Daily
          </motion.button>
          <motion.button 
            whileTap={{ scale: 0.97 }}
            onClick={() => setTimeframe("weekly")}
            className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all ${
              timeframe === "weekly"
                ? "bg-optimal2 text-white shadow-sm"
                : "bg-gray-100 text-gray-600 hover:bg-gray-200"
            }`}
          >
            Weekly
          </motion.button>
        </div>
      </motion.div>
    </motion.div>
  );
};
