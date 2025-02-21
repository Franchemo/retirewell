
import { motion } from "framer-motion";
import { useState } from "react";
import { Book, Heart } from "lucide-react";

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.1 }
  }
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 }
};

type ContentCategory = "All" | "Exercises" | "Articles" | "Videos" | "Audio";
type ContentItem = {
  id: string;
  title: string;
  description: string;
  type: "exercise" | "article" | "video" | "audio";
  duration: string;
  difficulty: "Beginner" | "Intermediate" | "Advanced";
  progress?: number;
  isBookmarked: boolean;
};

export const ContentLibrary = () => {
  const [activeCategory, setActiveCategory] = useState<ContentCategory>("All");
  const [searchQuery, setSearchQuery] = useState("");

  const categories: ContentCategory[] = ["All", "Exercises", "Articles", "Videos", "Audio"];

  const contentItems: ContentItem[] = [
    {
      id: "1",
      title: "Understanding Anxiety",
      description: "Learn about the root causes of anxiety and effective coping mechanisms.",
      type: "article",
      duration: "10 min read",
      difficulty: "Beginner",
      progress: 75,
      isBookmarked: false
    },
    {
      id: "2",
      title: "Guided Meditation",
      description: "A calming meditation session for stress relief.",
      type: "audio",
      duration: "15 min",
      difficulty: "Beginner",
      progress: 0,
      isBookmarked: true
    },
    {
      id: "3",
      title: "Cognitive Behavioral Exercises",
      description: "Interactive exercises to challenge negative thought patterns.",
      type: "exercise",
      duration: "20 min",
      difficulty: "Intermediate",
      progress: 30,
      isBookmarked: false
    },
    {
      id: "4",
      title: "Stress Management Techniques",
      description: "Video demonstration of effective stress management techniques.",
      type: "video",
      duration: "12 min",
      difficulty: "Beginner",
      progress: 0,
      isBookmarked: false
    }
  ];

  const filteredContent = contentItems.filter(item => {
    const matchesCategory = activeCategory === "All" || item.type === activeCategory.toLowerCase();
    const matchesSearch = item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         item.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const toggleBookmark = (id: string) => {
    // In a real app, this would update the backend
    console.log(`Toggled bookmark for item ${id}`);
  };

  return (
    <motion.div
      variants={container}
      initial="hidden"
      animate="show"
      className="space-y-8"
    >
      {/* Search Bar */}
      <motion.div variants={item} className="relative">
        <input
          type="text"
          placeholder="Search content..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:ring-2 focus:ring-teal-500 focus:border-transparent"
        />
      </motion.div>

      {/* Categories */}
      <motion.div variants={item} className="flex overflow-x-auto space-x-4 pb-2">
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => setActiveCategory(category)}
            className={`px-4 py-2 rounded-full whitespace-nowrap transition-colors ${
              activeCategory === category
                ? "bg-teal-500 text-white"
                : "bg-gray-100 text-gray-600 hover:bg-gray-200"
            }`}
          >
            {category}
          </button>
        ))}
      </motion.div>

      {/* Content Grid */}
      <motion.div variants={item} className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredContent.map((content) => (
          <motion.div
            key={content.id}
            className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-all"
            whileHover={{ scale: 1.02 }}
            variants={item}
          >
            <div className="flex justify-between items-start">
              <div className="flex-1">
                <h3 className="text-lg font-medium text-gray-900">{content.title}</h3>
                <p className="text-gray-600 mt-1">{content.description}</p>
                
                <div className="mt-4 flex items-center space-x-4 text-sm text-gray-500">
                  <span className="flex items-center">
                    <Book className="w-4 h-4 mr-1" />
                    {content.duration}
                  </span>
                  <span className="px-2 py-1 rounded-full bg-gray-100 text-xs">
                    {content.difficulty}
                  </span>
                </div>

                {content.progress !== undefined && content.progress > 0 && (
                  <div className="mt-4">
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-gray-600">Progress</span>
                      <span className="text-teal-600">{content.progress}%</span>
                    </div>
                    <div className="h-2 bg-gray-100 rounded-full">
                      <motion.div
                        className="h-full bg-teal-500 rounded-full"
                        initial={{ width: 0 }}
                        animate={{ width: `${content.progress}%` }}
                        transition={{ duration: 0.5 }}
                      />
                    </div>
                  </div>
                )}
              </div>

              <button
                onClick={() => toggleBookmark(content.id)}
                className={`ml-4 p-2 rounded-full transition-colors ${
                  content.isBookmarked
                    ? "text-red-500 bg-red-50 hover:bg-red-100"
                    : "text-gray-400 hover:text-gray-600"
                }`}
              >
                <Heart className="w-5 h-5" />
              </button>
            </div>

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="mt-4 w-full py-2 px-4 bg-teal-500 text-white rounded-lg hover:bg-teal-600 transition-colors"
            >
              {content.progress ? "Continue" : "Start"} {content.type}
            </motion.button>
          </motion.div>
        ))}
      </motion.div>

      {filteredContent.length === 0 && (
        <motion.div
          variants={item}
          className="text-center py-12 text-gray-500"
        >
          No content found matching your criteria
        </motion.div>
      )}
    </motion.div>
  );
};
