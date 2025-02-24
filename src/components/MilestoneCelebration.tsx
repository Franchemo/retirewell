
import { motion, AnimatePresence } from "framer-motion";
import confetti from "canvas-confetti";
import { Award } from "lucide-react";

interface Milestone {
  id: string;
  title: string;
  description: string;
  icon: string;
  achieved: boolean;
  date?: string;
}

export const MilestoneCelebration = () => {
  const milestones: Milestone[] = [
    {
      id: "1",
      title: "First Step",
      description: "Completed your first exercise",
      icon: "🎯",
      achieved: true,
      date: "2024-03-15"
    },
    {
      id: "2",
      title: "Weekly Warrior",
      description: "Completed 5 exercises in a week",
      icon: "⚡",
      achieved: true,
      date: "2024-03-16"
    },
    {
      id: "3",
      title: "Mindfulness Master",
      description: "Completed 10 meditation sessions",
      icon: "🧘",
      achieved: false
    },
    {
      id: "4",
      title: "Consistency Champion",
      description: "Used the app for 30 consecutive days",
      icon: "🏆",
      achieved: false
    }
  ];

  const celebrateMilestone = () => {
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 }
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="space-y-6"
    >
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-medium text-gray-900">Your Milestones</h3>
        <Award className="w-6 h-6 text-teal-600" />
      </div>

      <div className="grid gap-4">
        {milestones.map((milestone) => (
          <motion.div
            key={milestone.id}
            className={`p-4 rounded-lg border ${
              milestone.achieved
                ? "border-teal-500 bg-teal-50"
                : "border-gray-200 bg-gray-50"
            }`}
            whileHover={{ scale: 1.02 }}
            onClick={() => {
              if (milestone.achieved) celebrateMilestone();
            }}
          >
            <div className="flex items-start">
              <span className="text-2xl mr-3">{milestone.icon}</span>
              <div className="flex-1">
                <h4 className="font-medium text-gray-900">{milestone.title}</h4>
                <p className="text-sm text-gray-600">{milestone.description}</p>
                {milestone.achieved && milestone.date && (
                  <p className="text-xs text-teal-600 mt-1">
                    Achieved on {new Date(milestone.date).toLocaleDateString()}
                  </p>
                )}
              </div>
              {milestone.achieved && (
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="ml-2"
                >
                  <span className="text-teal-600">✓</span>
                </motion.div>
              )}
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};
