
import { motion } from "framer-motion";
import { Book, Heart } from "lucide-react";

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
  return (
    <motion.div
      className="health-card"
      whileHover={{ scale: 1.02 }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
    >
      <div className="flex justify-between items-start">
        <div className="flex-1">
          <h3 className="text-lg font-medium text-foreground">{content.title}</h3>
          <p className="text-muted-foreground mt-1 text-sm">{content.description}</p>
          
          <div className="mt-4 flex items-center space-x-4 text-sm text-muted-foreground">
            <span className="flex items-center">
              <Book className="w-4 h-4 mr-1" />
              {content.duration}
            </span>
            <span className="px-2 py-1 rounded-full bg-secondary text-xs">
              {content.difficulty}
            </span>
          </div>

          {content.progress !== undefined && content.progress > 0 && (
            <div className="mt-4">
              <div className="flex justify-between text-sm mb-1">
                <span className="text-muted-foreground">Progress</span>
                <span className="text-primary">{content.progress}%</span>
              </div>
              <div className="h-2 bg-secondary rounded-full">
                <motion.div
                  className="h-full bg-primary rounded-full"
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
          className={`ml-4 p-2 rounded-full transition-colors ${
            content.isBookmarked
              ? "text-red-500 bg-red-50 hover:bg-red-100"
              : "text-muted-foreground hover:text-foreground hover:bg-secondary"
          }`}
        >
          <Heart className="w-5 h-5" />
        </button>
      </div>

      <motion.button
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        className="mt-4 w-full py-2 px-4 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors"
      >
        {content.progress ? "Continue" : "Start"} {content.type}
      </motion.button>
    </motion.div>
  );
};
