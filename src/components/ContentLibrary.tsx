import { motion } from "framer-motion";
import { useState } from "react";
import { SearchBar } from "./content/SearchBar";
import { CategoryFilter } from "./content/CategoryFilter";
import { ContentCard, ContentItem } from "./content/ContentCard";

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
    console.log(`Toggled bookmark for item ${id}`);
  };

  return (
    <motion.div
      variants={container}
      initial="hidden"
      animate="show"
      className="space-y-8"
    >
      <SearchBar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
      
      <CategoryFilter 
        activeCategory={activeCategory}
        setActiveCategory={setActiveCategory}
        categories={categories}
      />

      <motion.div variants={item} className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredContent.map((content) => (
          <ContentCard
            key={content.id}
            content={content}
            onBookmark={toggleBookmark}
          />
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
