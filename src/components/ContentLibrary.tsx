
import { useState } from "react";
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

export const ContentLibrary = () => {
  const [activeFilter, setActiveFilter] = useState("all");

  const categories = [
    { id: "all", name: "All" },
    { id: "coping", name: "Coping Strategies" },
    { id: "education", name: "Mental Health" },
    { id: "exercises", name: "Exercises" }
  ];

  const content = [
    {
      id: 1,
      title: "Understanding Anxiety",
      category: "education",
      duration: "10 min read",
      description: "Learn about the basics of anxiety and its effects on your body and mind."
    },
    {
      id: 2,
      title: "Deep Breathing Techniques",
      category: "exercises",
      duration: "5 min read",
      description: "Simple breathing exercises to help manage stress and anxiety."
    },
    {
      id: 3,
      title: "Challenging Negative Thoughts",
      category: "coping",
      duration: "15 min read",
      description: "Practical strategies for identifying and reframing negative thought patterns."
    }
  ];

  const filteredContent = activeFilter === "all" 
    ? content 
    : content.filter(item => item.category === activeFilter);

  return (
    <motion.div
      variants={container}
      initial="hidden"
      animate="show"
      className="space-y-6"
    >
      {/* Header */}
      <motion.div variants={item} className="text-left">
        <h2 className="text-2xl font-semibold text-gray-900">Content Library</h2>
        <p className="text-gray-600 mt-2">Explore educational resources and exercises</p>
      </motion.div>

      {/* Category Filters */}
      <motion.div variants={item} className="flex overflow-x-auto py-2 -mx-4 px-4 space-x-2 scrollbar-none">
        {categories.map((category) => (
          <button
            key={category.id}
            onClick={() => setActiveFilter(category.id)}
            className={`flex-none px-4 py-2 rounded-full text-sm font-medium transition-colors duration-200 ${
              activeFilter === category.id
                ? "bg-teal-100 text-teal-800"
                : "bg-gray-100 text-gray-600 hover:bg-gray-200"
            }`}
          >
            {category.name}
          </button>
        ))}
      </motion.div>

      {/* Content Grid */}
      <motion.div variants={item} className="grid gap-4">
        {filteredContent.map((item) => (
          <motion.div
            key={item.id}
            className="bg-white rounded-lg p-4 shadow-sm border border-gray-100"
            whileHover={{ scale: 1.02 }}
            transition={{ duration: 0.2 }}
          >
            <div className="flex justify-between items-start mb-2">
              <h3 className="font-medium text-gray-900">{item.title}</h3>
              <span className="text-sm text-gray-500">{item.duration}</span>
            </div>
            <p className="text-sm text-gray-600 mb-3">{item.description}</p>
            <div className="flex justify-between items-center">
              <span className="text-xs text-teal-600 bg-teal-50 px-2 py-1 rounded-full">
                {categories.find(cat => cat.id === item.category)?.name}
              </span>
              <button className="text-sm text-teal-600 hover:text-teal-700 font-medium">
                Read More →
              </button>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </motion.div>
  );
};
