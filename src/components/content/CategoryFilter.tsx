
import { motion } from "framer-motion";

type ContentCategory = "All" | "Exercises" | "Articles" | "Videos" | "Audio";

interface CategoryFilterProps {
  activeCategory: ContentCategory;
  setActiveCategory: (category: ContentCategory) => void;
  categories: ContentCategory[];
}

export const CategoryFilter = ({ 
  activeCategory, 
  setActiveCategory, 
  categories 
}: CategoryFilterProps) => {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex overflow-x-auto space-x-4 pb-2"
    >
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
  );
};
