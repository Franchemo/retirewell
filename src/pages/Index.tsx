
import { motion } from "framer-motion";
import { useState } from "react";
import { Heart } from "lucide-react"; 
import { BookmarkedContent } from "@/components/BookmarkedContent";
import { ProgressDashboard } from "@/components/ProgressDashboard";
import { ContentLibrary } from "@/components/ContentLibrary";
import { Notifications } from "@/components/Notifications";
import { WellnessToolkit } from "@/components/WellnessToolkit";

const Index = () => {
  const [activeTab, setActiveTab] = useState("dashboard");

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-secondary/20">
      {/* Top Navigation */}
      <motion.nav 
        className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-lg border-b border-border"
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex-shrink-0">
              <h1 className="text-xl font-semibold bg-gradient-to-r from-primary to-primary/80 bg-clip-text text-transparent">
                AugMend Health
              </h1>
            </div>
            <div className="flex items-center space-x-4">
              <Notifications />
            </div>
          </div>
        </div>
      </motion.nav>

      {/* Main Content */}
      <main className="pt-20 pb-16 px-4 sm:px-6 lg:px-8 max-w-screen-xl mx-auto">
        {activeTab === "dashboard" && <ProgressDashboard />}
        {activeTab === "toolkit" && <WellnessToolkit />}
        {activeTab === "library" && <ContentLibrary />}
        {activeTab === "bookmarks" && <BookmarkedContent />}
      </main>

      {/* Bottom Navigation */}
      <motion.div 
        className="fixed bottom-0 left-0 right-0 bg-background/90 backdrop-blur-sm border-t border-border"
        initial={{ y: 100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="grid grid-cols-4 h-16">
          <button
            onClick={() => setActiveTab("dashboard")}
            className={`flex flex-col items-center justify-center space-y-1 ${
              activeTab === "dashboard"
                ? "text-primary"
                : "text-muted-foreground hover:text-primary"
            }`}
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
              />
            </svg>
            <span className="text-xs">Dashboard</span>
          </button>

          <button
            onClick={() => setActiveTab("toolkit")}
            className={`flex flex-col items-center justify-center space-y-1 ${
              activeTab === "toolkit"
                ? "text-primary"
                : "text-muted-foreground hover:text-primary"
            }`}
          >
            <Heart className="w-6 h-6" />
            <span className="text-xs">Toolkit</span>
          </button>

          <button
            onClick={() => setActiveTab("library")}
            className={`flex flex-col items-center justify-center space-y-1 ${
              activeTab === "library"
                ? "text-primary"
                : "text-muted-foreground hover:text-primary"
            }`}
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
              />
            </svg>
            <span className="text-xs">Library</span>
          </button>

          <button
            onClick={() => setActiveTab("bookmarks")}
            className={`flex flex-col items-center justify-center space-y-1 ${
              activeTab === "bookmarks"
                ? "text-primary"
                : "text-muted-foreground hover:text-primary"
            }`}
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z"
              />
            </svg>
            <span className="text-xs">Bookmarks</span>
          </button>
        </div>
      </motion.div>
    </div>
  );
};

export default Index;
