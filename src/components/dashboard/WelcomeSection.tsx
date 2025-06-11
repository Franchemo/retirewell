
import { motion } from "framer-motion";
import { Calendar, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { TodaysFocus } from "./TodaysFocus";
import { FocusItem } from "@/services/dashboardService";

interface WelcomeSectionProps {
  focusItems: FocusItem[];
}

export const WelcomeSection = ({ focusItems }: WelcomeSectionProps) => {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-gradient-to-r from-teal-500 to-teal-600 rounded-xl p-6 text-white"
    >
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
      
      <TodaysFocus focusItems={focusItems} />

      {/* AugMend Health Preview */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="mt-6 p-4 bg-white/20 rounded-xl backdrop-blur-sm"
      >
        <div className="flex items-center justify-between">
          <div>
            <h3 className="font-semibold text-lg">AugMend Health</h3>
            <p className="text-sm opacity-90">Your original wellness companion</p>
          </div>
          <Link to="/augmend">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center space-x-2 bg-white/30 hover:bg-white/40 px-4 py-2 rounded-lg transition-colors"
            >
              <span className="text-sm font-medium">Visit</span>
              <ArrowRight className="w-4 h-4" />
            </motion.button>
          </Link>
        </div>
      </motion.div>
    </motion.div>
  );
};
