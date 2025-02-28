
import { motion } from "framer-motion";
import { Book, Heart } from "lucide-react";
import { useIsSafari } from "@/hooks/use-mobile";

export interface ContentItem {
  id: string;
  title: string;
  description: string;
  type: "exercise" | "article" | "video" | "audio";
  duration: string;
  difficulty: "Beginner" | "Intermediate" | "Advanced";
  progress?: number;
  isBookmarked: boolean;
}

interface ContentCardProps {
  content: ContentItem;
  onBookmark: (id: string) => void;
}

export const ContentCard = ({ content, onBookmark }: ContentCardProps) => {
  const isSafari = useIsSafari();
  
  // Apply Safari-specific class if needed
  const cardClass = `content-card ${isSafari ? 'safari-backdrop-fix' : ''}`;
  
  return (
    <motion.div
      className={cardClass}
      whileHover={{ scale: 1.02 }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
    >
      <div className="flex justify-between items-start">
        <div className="flex-1">
          <h3 className="text-lg font-medium text-gradient">{content.title}</h3>
          <p className="text-muted-foreground mt-1 text-sm">{content.description}</p>
          
          <div className="mt-4 flex items-center space-x-4 text-sm text-muted-foreground">
            <span className="flex items-center">
              <Book className="w-4 h-4 mr-1" />
              {content.duration}
            </span>
            <span className={`px-3 py-1 rounded-full frosted-glass text-xs font-medium ${isSafari ? 'safari-backdrop-fix' : ''}`}>
              {content.difficulty}
            </span>
          </div>

          {content.progress !== undefined && content.progress > 0 && (
            <div className="mt-4">
              <div className="flex justify-between text-sm mb-2">
                <span className="text-muted-foreground">Progress</span>
                <span className="text-primary font-medium">{content.progress}%</span>
              </div>
              <div className="h-2 bg-secondary/50 rounded-full overflow-hidden backdrop-blur-sm">
                <motion.div
                  className="h-full bg-gradient-to-r from-primary to-primary/80"
                  initial={{ width: 0 }}
                  animate={{ width: `${content.progress}%` }}
                  transition={{ duration: 0.5 }}
                />
              </div>
            </div>
          )}
        </div>

        <button
          onClick={() => onBookmark(content.id)}
          className={`ml-4 p-2 rounded-full transition-all duration-300 ${
            content.isBookmarked
              ? "bg-red-50 text-red-500 hover:bg-red-100 hover:shadow-lg"
              : `frosted-glass text-muted-foreground hover:text-foreground hover:shadow-lg ${isSafari ? 'safari-backdrop-fix' : ''}`
          }`}
        >
          <Heart className="w-5 h-5" />
        </button>
      </div>

      <motion.button
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        className="button-primary mt-4 w-full"
      >
        {content.progress ? "Continue" : "Start"} {content.type}
      </motion.button>
    </motion.div>
  );
};
