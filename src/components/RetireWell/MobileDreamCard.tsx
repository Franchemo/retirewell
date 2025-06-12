
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Heart } from "lucide-react";

interface MobileDreamCardProps {
  dream: {
    title: string;
    description: string;
    category: string;
    icon: string;
  };
  isSelected: boolean;
  onClick: () => void;
  index: number;
}

const MobileDreamCard = ({ dream, isSelected, onClick, index }: MobileDreamCardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05 }}
      whileTap={{ scale: 0.98 }}
      className="w-full"
    >
      <Card 
        className={`cursor-pointer transition-all duration-300 shadow-sm hover:shadow-md active:shadow-lg ${
          isSelected 
            ? "border-2 border-financial-secure bg-financial-secure/8 shadow-md" 
            : "border border-border/30 hover:border-financial-secure/30 bg-white"
        }`}
        onClick={onClick}
      >
        <CardContent className="p-4">
          <div className="flex items-start space-x-4">
            {/* Icon */}
            <div className={`flex-shrink-0 w-12 h-12 rounded-full flex items-center justify-center text-2xl ${
              isSelected ? 'bg-financial-secure/15' : 'bg-gray-50'
            }`}>
              {dream.icon}
            </div>
            
            {/* Content */}
            <div className="flex-1 min-w-0">
              <div className="flex items-start justify-between">
                <div className="flex-1 min-w-0">
                  <h3 className={`font-semibold text-lg leading-tight mb-1 ${
                    isSelected ? 'text-financial-secure' : 'text-gray-900'
                  }`}>
                    {dream.title}
                  </h3>
                  <p className="text-sm text-gray-600 leading-relaxed mb-2 line-clamp-2">
                    {dream.description}
                  </p>
                  <span className={`inline-block text-xs font-medium px-2 py-1 rounded-full ${
                    isSelected 
                      ? 'bg-financial-secure/20 text-financial-secure' 
                      : 'bg-gray-100 text-gray-600'
                  }`}>
                    {dream.category}
                  </span>
                </div>
                
                {/* Selection indicator */}
                <div className="flex-shrink-0 ml-3">
                  {isSelected ? (
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className="w-6 h-6 bg-financial-secure rounded-full flex items-center justify-center shadow-sm"
                    >
                      <Heart className="w-3.5 h-3.5 text-white fill-white" />
                    </motion.div>
                  ) : (
                    <div className="w-6 h-6 border-2 border-gray-300 rounded-full" />
                  )}
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default MobileDreamCard;
