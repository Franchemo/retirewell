
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

export const BookmarkedContent = () => {
  const bookmarkedItems = [
    {
      id: 1,
      title: "Managing Anxiety in Social Situations",
      category: "Anxiety Management",
      progress: 60,
      lastRead: "2 days ago"
    },
    {
      id: 2,
      title: "Building Healthy Sleep Habits",
      category: "Wellness",
      progress: 30,
      lastRead: "1 week ago"
    }
  ];

  return (
    <motion.div
      variants={container}
      initial="hidden"
      animate="show"
      className="space-y-6"
    >
      <motion.div variants={item} className="text-left">
        <h2 className="text-2xl font-semibold text-gray-900">Bookmarks</h2>
        <p className="text-gray-600 mt-2">Your saved content for easy access</p>
      </motion.div>

      {bookmarkedItems.length > 0 ? (
        <motion.div variants={item} className="space-y-4">
          {bookmarkedItems.map((item) => (
            <div
              key={item.id}
              className="bg-white rounded-lg p-4 shadow-sm border border-gray-100"
            >
              <div className="flex justify-between items-start mb-2">
                <div>
                  <h3 className="font-medium text-gray-900">{item.title}</h3>
                  <p className="text-sm text-gray-600">{item.category}</p>
                </div>
                <button className="text-gray-400 hover:text-gray-500">
                  <svg
                    className="w-5 h-5"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      d="M5 4a2 2 0 012-2h6a2 2 0 012 2v14l-5-2.5L5 18V4z"
                    />
                  </svg>
                </button>
              </div>
              <div className="mt-2">
                <div className="flex justify-between text-sm text-gray-600 mb-1">
                  <span>Progress</span>
                  <span>{item.progress}%</span>
                </div>
                <div className="bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-teal-500 h-2 rounded-full transition-all duration-500"
                    style={{ width: `${item.progress}%` }}
                  />
                </div>
              </div>
              <p className="text-xs text-gray-500 mt-2">
                Last read: {item.lastRead}
              </p>
            </div>
          ))}
        </motion.div>
      ) : (
        <motion.div
          variants={item}
          className="text-center py-12 bg-gray-50 rounded-lg"
        >
          <p className="text-gray-600">No bookmarked content yet</p>
          <p className="text-sm text-gray-500 mt-1">
            Save content from the library to access it here
          </p>
        </motion.div>
      )}
    </motion.div>
  );
};
