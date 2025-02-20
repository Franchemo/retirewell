
import { motion } from "framer-motion";

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

export const ProgressDashboard = () => {
  const recentSessions = [
    {
      id: 1,
      date: "March 15, 2024",
      topic: "Anxiety Management",
      duration: "45 min",
      progress: 85
    },
    {
      id: 2,
      date: "March 12, 2024",
      topic: "Stress Reduction",
      duration: "30 min",
      progress: 70
    }
  ];

  const recommendedContent = [
    {
      id: 1,
      title: "Understanding Thought Patterns",
      category: "CBT Basics",
      duration: "10 min read"
    },
    {
      id: 2,
      title: "Daily Mindfulness Exercises",
      category: "Practical Tips",
      duration: "15 min read"
    }
  ];

  return (
    <motion.div
      variants={container}
      initial="hidden"
      animate="show"
      className="space-y-8"
    >
      {/* Welcome Section */}
      <motion.div variants={item} className="text-left">
        <h2 className="text-2xl font-semibold text-gray-900">Welcome Back</h2>
        <p className="text-gray-600 mt-2">Continue your healing journey</p>
      </motion.div>

      {/* Progress Overview */}
      <motion.div variants={item} className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
        <h3 className="text-lg font-medium text-gray-900 mb-4">Weekly Progress</h3>
        <div className="grid grid-cols-3 gap-4">
          <div className="text-center">
            <div className="text-2xl font-semibold text-teal-600">3</div>
            <div className="text-sm text-gray-600">Sessions</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-semibold text-teal-600">85%</div>
            <div className="text-sm text-gray-600">Completion</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-semibold text-teal-600">45m</div>
            <div className="text-sm text-gray-600">Avg. Time</div>
          </div>
        </div>
      </motion.div>

      {/* Recent Sessions */}
      <motion.section variants={item} className="space-y-4">
        <h3 className="text-lg font-medium text-gray-900">Recent Sessions</h3>
        <div className="space-y-4">
          {recentSessions.map((session) => (
            <div
              key={session.id}
              className="bg-white rounded-lg p-4 shadow-sm border border-gray-100"
            >
              <div className="flex justify-between items-center">
                <div>
                  <h4 className="font-medium text-gray-900">{session.topic}</h4>
                  <p className="text-sm text-gray-600">{session.date}</p>
                </div>
                <div className="text-right">
                  <div className="text-sm font-medium text-teal-600">
                    {session.duration}
                  </div>
                  <div className="text-sm text-gray-600">
                    {session.progress}% Complete
                  </div>
                </div>
              </div>
              <div className="mt-2 bg-gray-200 rounded-full h-2">
                <div
                  className="bg-teal-500 h-2 rounded-full transition-all duration-500"
                  style={{ width: `${session.progress}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </motion.section>

      {/* Recommended Content */}
      <motion.section variants={item} className="space-y-4">
        <h3 className="text-lg font-medium text-gray-900">Recommended for You</h3>
        <div className="grid grid-cols-1 gap-4">
          {recommendedContent.map((content) => (
            <div
              key={content.id}
              className="bg-white rounded-lg p-4 shadow-sm border border-gray-100"
            >
              <div className="flex justify-between items-start">
                <div>
                  <h4 className="font-medium text-gray-900">{content.title}</h4>
                  <p className="text-sm text-gray-600">{content.category}</p>
                </div>
                <span className="text-sm text-gray-500">{content.duration}</span>
              </div>
            </div>
          ))}
        </div>
      </motion.section>
    </motion.div>
  );
};
