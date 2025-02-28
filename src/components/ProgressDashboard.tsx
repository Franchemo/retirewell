
import { motion } from "framer-motion";
import { LineChart, Line, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, TooltipProps } from 'recharts';
import { Brain, Calendar, TrendingUp, Target, ArrowRight } from 'lucide-react';
import { useState, useEffect } from "react";
import { useIsMobile } from "@/hooks/use-mobile";

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
  const [isLoading, setIsLoading] = useState(true);
  const [progressData, setProgressData] = useState([]);
  const [wellnessData, setWellnessData] = useState({
    daily: [],
    weekly: []
  });
  const [suggestedContent, setSuggestedContent] = useState([]);
  const isMobile = useIsMobile();

  // Simulate data loading with improved error handling
  useEffect(() => {
    const loadDashboardData = async () => {
      try {
        // Simulate API fetch with timeout
        await new Promise(resolve => setTimeout(resolve, 500));
        
        // Progress data
        setProgressData([
          { date: 'Week 1', progress: 30 },
          { date: 'Week 2', progress: 45 },
          { date: 'Week 3', progress: 65 },
          { date: 'Week 4', progress: 85 },
        ]);
        
        // Wellness data
        setWellnessData({
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
        });
        
        // Suggested content
        setSuggestedContent([
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
        ]);
        
        setIsLoading(false);
      } catch (error) {
        console.error("Error loading dashboard data:", error);
        setIsLoading(false);
        // In a real app, you would handle the error properly here
      }
    };

    loadDashboardData();
  }, []);

  // Loading state with skeleton UI
  if (isLoading) {
    return (
      <div className="space-y-8 animate-pulse">
        <div className="bg-gradient-to-r from-secondary/50 to-secondary/30 h-48 rounded-xl w-full"></div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white h-64 rounded-xl border border-gray-100"></div>
          <div className="bg-white h-64 rounded-xl border border-gray-100"></div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-white h-24 rounded-xl border border-gray-100"></div>
          <div className="bg-white h-24 rounded-xl border border-gray-100"></div>
          <div className="bg-white h-24 rounded-xl border border-gray-100"></div>
        </div>
      </div>
    );
  }

  return (
    <motion.div
      variants={container}
      initial="hidden"
      animate="show"
      className="space-y-6"
    >
      {/* Welcome Section with Today's Focus */}
      <motion.div 
        variants={item} 
        className="bg-gradient-to-r from-[#4B4E8E] to-[#6E72C7] rounded-xl p-4 sm:p-6 text-white shadow-lg shadow-[#4B4E8E]/15"
      >
        <div className="flex justify-between items-start">
          <div>
            <h2 className="text-xl sm:text-2xl font-semibold tracking-tight">Welcome Back</h2>
            <p className="mt-2 opacity-90 text-sm sm:text-base">Your journey continues with strength and resilience</p>
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
          <h3 className="text-lg font-medium mb-3 tracking-tight">Today's Focus</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {suggestedContent.map((content, index) => (
              <motion.div
                key={index}
                whileHover={{ scale: 1.02, y: -2 }}
                className="bg-white/10 backdrop-blur-sm rounded-lg p-4 cursor-pointer border border-white/10 shadow-md shadow-black/5 transition-all duration-300 touch-target"
              >
                <div className="flex items-center">
                  <content.icon className="w-5 h-5 mr-3 flex-shrink-0" />
                  <div className="flex-grow min-w-0">
                    <h4 className="font-medium tracking-tight text-sm sm:text-base truncate">{content.title}</h4>
                    <p className="text-xs sm:text-sm opacity-90 truncate">{content.duration}</p>
                  </div>
                  <ArrowRight className="w-4 h-4 ml-auto flex-shrink-0" />
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>

      {/* Charts Section */}
      <motion.div variants={item} className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Treatment Progress Chart */}
        <div className="bg-white rounded-xl p-4 sm:p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow duration-300">
          <h3 className="text-lg font-medium text-gray-900 mb-4 tracking-tight">Treatment Progress</h3>
          <div className={isMobile ? "h-52" : "h-64"}>
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={progressData} margin={{ top: 5, right: 5, bottom: 5, left: isMobile ? -15 : 0 }}>
                <defs>
                  <linearGradient id="progressColor" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#4B4E8E" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#4B4E8E" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis 
                  dataKey="date" 
                  tick={{ fill: '#666', fontSize: isMobile ? 10 : 12 }} 
                  tickMargin={5}
                />
                <YAxis 
                  tick={{ fill: '#666', fontSize: isMobile ? 10 : 12 }} 
                  width={isMobile ? 25 : 35}
                />
                <Tooltip content={<CustomTooltip />} />
                <Area 
                  type="monotone" 
                  dataKey="progress" 
                  stroke="#4B4E8E" 
                  strokeWidth={2}
                  fillOpacity={1} 
                  fill="url(#progressColor)" 
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Wellness Score Chart */}
        <div className="bg-white rounded-xl p-4 sm:p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow duration-300">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 gap-2 sm:gap-0">
            <h3 className="text-lg font-medium text-gray-900 tracking-tight">Wellness Score</h3>
            <div className="flex space-x-2">
              <button
                onClick={() => setTimeframe("daily")}
                className={`px-2 sm:px-3 py-1 rounded-full text-xs sm:text-sm ${
                  timeframe === "daily"
                    ? "bg-[#4B4E8E] text-white shadow-md"
                    : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                } transition-all duration-300 touch-target`}
              >
                Daily
              </button>
              <button
                onClick={() => setTimeframe("weekly")}
                className={`px-2 sm:px-3 py-1 rounded-full text-xs sm:text-sm ${
                  timeframe === "weekly"
                    ? "bg-[#4B4E8E] text-white shadow-md"
                    : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                } transition-all duration-300 touch-target`}
              >
                Weekly
              </button>
            </div>
          </div>
          <div className={isMobile ? "h-52" : "h-64"}>
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={wellnessData[timeframe]} margin={{ top: 5, right: 5, bottom: 5, left: isMobile ? -15 : 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis 
                  dataKey="day" 
                  tick={{ fill: '#666', fontSize: isMobile ? 10 : 12 }} 
                  tickMargin={5}
                />
                <YAxis 
                  domain={[0, 100]} 
                  tick={{ fill: '#666', fontSize: isMobile ? 10 : 12 }} 
                  width={isMobile ? 25 : 35}
                />
                <Tooltip content={<CustomTooltip />} />
                <Line 
                  type="monotone" 
                  dataKey="score" 
                  stroke="#4B4E8E" 
                  strokeWidth={2}
                  dot={{ fill: '#4B4E8E', strokeWidth: 2, r: isMobile ? 3 : 4, strokeDasharray: '' }}
                  activeDot={{ fill: '#4B4E8E', strokeWidth: 0, r: isMobile ? 5 : 6 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </motion.div>

      {/* Key Metrics */}
      <motion.div variants={item} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        <motion.div
          whileHover={{ scale: 1.02, y: -2 }}
          className="bg-white rounded-xl p-4 shadow-sm border border-gray-100 hover:shadow-md transition-all duration-300"
        >
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-[#4B4E8E]/10 rounded-lg">
              <TrendingUp className="w-5 h-5 text-[#4B4E8E]" />
            </div>
            <div>
              <p className="text-xs sm:text-sm text-gray-600">Weekly Progress</p>
              <h4 className="text-lg sm:text-xl font-semibold text-gray-900">85%</h4>
            </div>
          </div>
        </motion.div>

        <motion.div
          whileHover={{ scale: 1.02, y: -2 }}
          className="bg-white rounded-xl p-4 shadow-sm border border-gray-100 hover:shadow-md transition-all duration-300"
        >
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-[#4B4E8E]/10 rounded-lg">
              <Calendar className="w-5 h-5 text-[#4B4E8E]" />
            </div>
            <div>
              <p className="text-xs sm:text-sm text-gray-600">Streak</p>
              <h4 className="text-lg sm:text-xl font-semibold text-gray-900">7 days</h4>
            </div>
          </div>
        </motion.div>

        <motion.div
          whileHover={{ scale: 1.02, y: -2 }}
          className="bg-white rounded-xl p-4 shadow-sm border border-gray-100 hover:shadow-md transition-all duration-300"
        >
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-[#4B4E8E]/10 rounded-lg">
              <Target className="w-5 h-5 text-[#4B4E8E]" />
            </div>
            <div>
              <p className="text-xs sm:text-sm text-gray-600">Goals Met</p>
              <h4 className="text-lg sm:text-xl font-semibold text-gray-900">12/15</h4>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

export default ProgressDashboard;
