
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
        <p className="text-sm text-teal-600">
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
      className="space-y-8"
    >
      {/* Health Summary Cards */}
      <motion.div variants={item} className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Biological Age Card */}
        <motion.div 
          whileHover={{ scale: 1.02 }}
          className="rounded-xl overflow-hidden relative"
        >
          <div className="bg-gradient-to-br from-amber-400 to-amber-600 p-6 text-white h-full">
            <h3 className="text-lg font-medium opacity-90 mb-1">Biological Age</h3>
            <div className="flex items-end mb-1">
              <span className="text-4xl font-bold">28</span>
              <span className="ml-2 mb-1 opacity-90">years old</span>
            </div>
            <div className="flex items-center mt-2 rounded-full bg-white/20 px-3 py-1 w-fit">
              <div className="w-2 h-2 rounded-full bg-optimal mr-2"></div>
              <span className="text-sm">4 yrs younger than calendar age</span>
            </div>
          </div>
        </motion.div>
        
        {/* Health Score Card */}
        <motion.div 
          whileHover={{ scale: 1.02 }}
          className="rounded-xl overflow-hidden"
        >
          <div className="bg-gradient-to-br from-emerald-500 to-emerald-700 p-6 text-white h-full">
            <h3 className="text-lg font-medium opacity-90 mb-1">AugMend Score</h3>
            <div className="flex items-end mb-1">
              <span className="text-4xl font-bold">93</span>
              <span className="ml-2 mb-1 opacity-90">out of 100</span>
            </div>
            <p className="text-sm mt-2 opacity-90">You're very healthy. Keep going!</p>
          </div>
        </motion.div>
        
        {/* Results Summary Card */}
        <motion.div 
          whileHover={{ scale: 1.02 }}
          className="rounded-xl overflow-hidden"
        >
          <div className="bg-gradient-to-br from-gray-800 to-gray-900 p-6 text-white h-full">
            <h3 className="text-lg font-medium opacity-90 mb-1">Results Summary</h3>
            <div className="space-y-2 mt-3">
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
      <motion.div variants={item} className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-xl font-medium text-gray-900">Biomarkers</h3>
          <button className="text-sm text-primary font-medium">View All</button>
        </div>
        
        <div className="space-y-4">
          {/* Biomarker Items */}
          <div className="p-4 border border-gray-100 rounded-lg hover:shadow-sm transition-all">
            <div className="flex justify-between items-center">
              <div>
                <h4 className="font-medium">Total Cholesterol</h4>
                <div className="flex items-center mt-1">
                  <div className="w-2 h-2 rounded-full bg-optimal mr-2"></div>
                  <span className="text-sm text-gray-600">Optimal</span>
                </div>
              </div>
              <span className="text-lg font-semibold">159 <span className="text-sm text-gray-500">mg/dL</span></span>
            </div>
          </div>
          
          <div className="p-4 border border-gray-100 rounded-lg hover:shadow-sm transition-all">
            <div className="flex justify-between items-center">
              <div>
                <h4 className="font-medium">Testosterone</h4>
                <div className="flex items-center mt-1">
                  <div className="w-2 h-2 rounded-full bg-optimal mr-2"></div>
                  <span className="text-sm text-gray-600">Optimal</span>
                </div>
              </div>
              <span className="text-lg font-semibold">26 <span className="text-sm text-gray-500">ng/dL</span></span>
            </div>
          </div>
          
          <div className="p-4 border border-gray-100 rounded-lg hover:shadow-sm transition-all">
            <div className="flex justify-between items-center">
              <div>
                <h4 className="font-medium">Glucose</h4>
                <div className="flex items-center mt-1">
                  <div className="w-2 h-2 rounded-full bg-optimal mr-2"></div>
                  <span className="text-sm text-gray-600">Optimal</span>
                </div>
              </div>
              <span className="text-lg font-semibold">96 <span className="text-sm text-gray-500">mg/dL</span></span>
            </div>
          </div>
          
          <div className="p-4 border border-gray-100 rounded-lg hover:shadow-sm transition-all">
            <div className="flex justify-between items-center">
              <div>
                <h4 className="font-medium">Cortisol</h4>
                <div className="flex items-center mt-1">
                  <div className="w-2 h-2 rounded-full bg-critical mr-2"></div>
                  <span className="text-sm text-gray-600">Out of range</span>
                </div>
              </div>
              <span className="text-lg font-semibold">22 <span className="text-sm text-gray-500">μg/dL</span></span>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Doctor Recommendations */}
      <motion.div variants={item} className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
        <div className="flex items-start mb-4">
          <div className="w-12 h-12 rounded-full overflow-hidden bg-gray-200 flex-shrink-0 mr-4">
            <img src="public/lovable-uploads/39d91bd3-ff69-4641-b263-097141ccd5ea.png" alt="Doctor" className="w-full h-full object-cover" />
          </div>
          <div>
            <h3 className="text-lg font-medium text-gray-900">Health goals selected by Dr. Matthews</h3>
            <p className="text-gray-600 mt-1">Hello! I've pinpointed these specific health goals to optimize your wellness journey. Feel free to book an advisor call if you have any questions.</p>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
          <div className="p-4 border border-gray-100 rounded-lg flex items-center">
            <div className="w-10 h-10 rounded-lg bg-blue-100 flex items-center justify-center mr-4">
              <img src="public/lovable-uploads/4d947460-a7e1-49d4-9a79-c171b36825e9.png" className="w-6 h-6" alt="NMN supplement" />
            </div>
            <div>
              <h4 className="font-medium">NMN</h4>
              <p className="text-sm text-gray-500">500mg daily</p>
            </div>
          </div>
          
          <div className="p-4 border border-gray-100 rounded-lg flex items-center">
            <div className="w-10 h-10 rounded-lg bg-green-100 flex items-center justify-center mr-4">
              <img src="public/lovable-uploads/df77e48d-ebc3-4d6d-9a13-45289081f953.png" className="w-6 h-6" alt="Vitamin D" />
            </div>
            <div>
              <h4 className="font-medium">Vitamin D3</h4>
              <p className="text-sm text-gray-500">5000 IU daily</p>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Advanced Testing Section */}
      <motion.div variants={item} className="bg-white rounded-xl overflow-hidden">
        <div className="relative">
          <img src="public/lovable-uploads/4488840d-9890-40cb-84b0-90a3a9f2ea3f.png" alt="Advanced Testing" className="w-full h-48 object-cover" />
          <div className="absolute inset-0 bg-black/30 flex flex-col justify-end p-6">
            <h3 className="text-2xl font-medium text-white mb-2">Access to advanced testing</h3>
            <p className="text-white/90 max-w-md">Unlock deeper insights with our comprehensive testing services</p>
            <button className="mt-4 bg-white text-gray-900 px-6 py-2 rounded-full inline-block max-w-max">
              Explore Tests
            </button>
          </div>
        </div>
        <div className="p-6 grid grid-cols-2 gap-4">
          <div className="p-4 bg-gray-50 rounded-lg text-center">
            <div className="mb-2 h-20 flex items-center justify-center">
              <div className="w-16 h-16 bg-orange-300 rounded-md"></div>
            </div>
            <h4 className="font-medium">Gut Microbiome Test</h4>
          </div>
          <div className="p-4 bg-gray-50 rounded-lg text-center">
            <div className="mb-2 h-20 flex items-center justify-center">
              <div className="w-16 h-16 bg-red-400 rounded-md"></div>
            </div>
            <h4 className="font-medium">Omega-3 Index</h4>
          </div>
        </div>
      </motion.div>

      {/* Data Tracking Section */}
      <motion.div variants={item} className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
        <h3 className="text-2xl font-medium text-gray-900 mb-6">Track your data over a lifetime</h3>
        
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={wellnessData[timeframe]}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="day" tick={{fontSize: 12}} stroke="#9ca3af" />
              <YAxis domain={[0, 100]} tick={{fontSize: 12}} stroke="#9ca3af" />
              <Tooltip content={<CustomTooltip />} />
              <Line 
                type="monotone" 
                dataKey="score" 
                stroke="#00A86B" 
                strokeWidth={2}
                dot={{ fill: '#00A86B', r: 4 }}
                activeDot={{ r: 6, fill: '#00A86B', stroke: 'white', strokeWidth: 2 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
        
        <div className="flex justify-end mt-4 space-x-2">
          <button 
            onClick={() => setTimeframe("daily")}
            className={`px-3 py-1 rounded-full text-sm ${
              timeframe === "daily"
                ? "bg-primary text-white"
                : "bg-gray-100 text-gray-600 hover:bg-gray-200"
            }`}
          >
            Daily
          </button>
          <button 
            onClick={() => setTimeframe("weekly")}
            className={`px-3 py-1 rounded-full text-sm ${
              timeframe === "weekly"
                ? "bg-primary text-white"
                : "bg-gray-100 text-gray-600 hover:bg-gray-200"
            }`}
          >
            Weekly
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
};
