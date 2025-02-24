
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
      {/* Welcome Section with Today's Focus */}
      <motion.div variants={item} className="bg-gradient-to-r from-teal-500 to-teal-600 rounded-xl p-6 text-white">
        <div className="flex justify-between items-start">
          <div>
            <h2 className="text-2xl font-semibold">Welcome Back</h2>
            <p className="mt-2 opacity-90">Your journey continues with strength and resilience</p>
          </div>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="p-2 bg-white/20 rounded-full backdrop-blur-sm"
          >
            <Calendar className="w-5 h-5" />
          </motion.button>
        </div>
        
        <div className="mt-6">
          <h3 className="text-lg font-medium mb-3">Today's Focus</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {suggestedContent.map((content, index) => (
              <motion.div
                key={index}
                whileHover={{ scale: 1.02 }}
                className="bg-white/10 backdrop-blur-sm rounded-lg p-4 cursor-pointer"
              >
                <div className="flex items-center">
                  <content.icon className="w-5 h-5 mr-3" />
                  <div>
                    <h4 className="font-medium">{content.title}</h4>
                    <p className="text-sm opacity-90">{content.duration}</p>
                  </div>
                  <ArrowRight className="w-4 h-4 ml-auto" />
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>

      {/* Charts Section */}
      <motion.div variants={item} className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Treatment Progress Chart */}
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Treatment Progress</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={progressData}>
                <defs>
                  <linearGradient id="progressColor" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#14b8a6" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#14b8a6" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip content={<CustomTooltip />} />
                <Area 
                  type="monotone" 
                  dataKey="progress" 
                  stroke="#14b8a6" 
                  fillOpacity={1} 
                  fill="url(#progressColor)" 
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Wellness Score Chart */}
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-medium text-gray-900">Wellness Score</h3>
            <div className="flex space-x-2">
              <button
                onClick={() => setTimeframe("daily")}
                className={`px-3 py-1 rounded-full text-sm ${
                  timeframe === "daily"
                    ? "bg-teal-500 text-white"
                    : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                }`}
              >
                Daily
              </button>
              <button
                onClick={() => setTimeframe("weekly")}
                className={`px-3 py-1 rounded-full text-sm ${
                  timeframe === "weekly"
                    ? "bg-teal-500 text-white"
                    : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                }`}
              >
                Weekly
              </button>
            </div>
          </div>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={wellnessData[timeframe]}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="day" />
                <YAxis domain={[0, 100]} />
                <Tooltip content={<CustomTooltip />} />
                <Line 
                  type="monotone" 
                  dataKey="score" 
                  stroke="#14b8a6" 
                  strokeWidth={2}
                  dot={{ fill: '#14b8a6' }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </motion.div>

      {/* Key Metrics */}
      <motion.div variants={item} className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <motion.div
          whileHover={{ scale: 1.02 }}
          className="bg-white rounded-xl p-6 shadow-sm border border-gray-100"
        >
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-teal-100 rounded-lg">
              <TrendingUp className="w-6 h-6 text-teal-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Weekly Progress</p>
              <h4 className="text-xl font-semibold text-gray-900">85%</h4>
            </div>
          </div>
        </motion.div>

        <motion.div
          whileHover={{ scale: 1.02 }}
          className="bg-white rounded-xl p-6 shadow-sm border border-gray-100"
        >
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-teal-100 rounded-lg">
              <Calendar className="w-6 h-6 text-teal-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Streak</p>
              <h4 className="text-xl font-semibold text-gray-900">7 days</h4>
            </div>
          </div>
        </motion.div>

        <motion.div
          whileHover={{ scale: 1.02 }}
          className="bg-white rounded-xl p-6 shadow-sm border border-gray-100"
        >
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-teal-100 rounded-lg">
              <Target className="w-6 h-6 text-teal-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Goals Met</p>
              <h4 className="text-xl font-semibold text-gray-900">12/15</h4>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </motion.div>
  );
};
