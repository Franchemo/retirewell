
import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { SearchBar } from "./content/SearchBar";
import { CategoryFilter } from "./content/CategoryFilter";
import { ContentCard, ContentItem } from "./content/ContentCard";
import { fetchContent, toggleBookmark } from "@/services/contentService";
import { useToast } from "@/hooks/use-toast";

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
  const [contentItems, setContentItems] = useState<ContentItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();

  const categories: ContentCategory[] = ["All", "Exercises", "Articles", "Videos", "Audio"];

  useEffect(() => {
    const loadContent = async () => {
      try {
        setIsLoading(true);
        const data = await fetchContent();
        setContentItems(data);
      } catch (error) {
        console.error("Error loading content:", error);
        toast({
          title: "Failed to load content",
          description: "Please try again later.",
          variant: "destructive"
        });
      } finally {
        setIsLoading(false);
      }
    };

    loadContent();
  }, [toast]);

  const filteredContent = contentItems.filter(item => {
    const matchesCategory = activeCategory === "All" || 
                           item.type.toLowerCase() === activeCategory.toLowerCase().slice(0, -1);
    const matchesSearch = item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         item.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const handleToggleBookmark = async (id: string) => {
    try {
      const result = await toggleBookmark(id);
      if (result) {
        // Update the content items to reflect the bookmark change
        setContentItems(prevItems => 
          prevItems.map(item => 
            item.id === id ? { ...item, isBookmarked: !item.isBookmarked } : item
          )
        );
        toast({
          title: result.isBookmarked ? "Content bookmarked" : "Bookmark removed",
          description: `"${result.title}" has been ${result.isBookmarked ? 'added to' : 'removed from'} your bookmarks.`
        });
      }
    } catch (error) {
      console.error(`Error toggling bookmark for item ${id}:`, error);
      toast({
        title: "Bookmark update failed",
        description: "Please try again later.",
        variant: "destructive"
      });
    }
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

      {isLoading ? (
        <div className="flex justify-center items-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
        </div>
      ) : (
        <>
          <motion.div variants={item} className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {filteredContent.map((content) => (
              <ContentCard
                key={content.id}
                content={content}
                onBookmark={handleToggleBookmark}
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
        </>
      )}
    </motion.div>
  );
};
