import { motion } from "framer-motion";
import { useState } from "react";
import { Heart, Settings, BookOpen, Award, MessageCircle, Activity } from "lucide-react";
import { Link } from "react-router-dom";
import { ProgressDashboard } from "@/components/ProgressDashboard";
import { ContentLibrary } from "@/components/ContentLibrary";
import { WellnessToolkit } from "@/components/WellnessToolkit";
import { BookmarkedContent } from "@/components/BookmarkedContent";

const MobileAppMockup = () => {
  const [activeTab, setActiveTab] = useState("dashboard");

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 p-4">
      <div className="relative w-[390px] h-[844px] bg-black rounded-[55px] overflow-hidden shadow-2xl border-[14px] border-black">
        {/* iPhone Notch */}
        <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-[160px] h-[34px] bg-black rounded-b-3xl z-50"></div>
        
        {/* Status Bar */}
        <div className="relative h-12 bg-background flex items-center justify-between px-6 pt-2 z-40">
          <span className="text-xs font-medium text-foreground">9:41</span>
          <div className="flex items-center space-x-2">
            <svg width="18" height="12" viewBox="0 0 18 12" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M1 4.5C1 2.84315 2.34315 1.5 4 1.5H14C15.6569 1.5 17 2.84315 17 4.5V7.5C17 9.15685 15.6569 10.5 14 10.5H4C2.34315 10.5 1 9.15685 1 7.5V4.5Z" stroke="currentColor" strokeWidth="1.5"/>
              <path d="M17 5.5H18.5V6.5H17V5.5Z" fill="currentColor"/>
            </svg>
            <svg width="17" height="12" viewBox="0 0 17 12" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path fillRule="evenodd" clipRule="evenodd" d="M8.5 0C9.94118 0 11.3529 0.352941 12.6471 1.05882C13.9412 1.76471 15 2.70588 15.8235 3.88235C16.6471 5.05882 17 6.47059 17 8C17 9.52941 16.6471 10.9412 15.8235 12.1176C15 13.2941 13.9412 14.2353 12.6471 14.9412C11.3529 15.6471 9.94118 16 8.5 16C7.05882 16 5.64706 15.6471 4.35294 14.9412C3.05882 14.2353 2 13.2941 1.17647 12.1176C0.352941 10.9412 0 9.52941 0 8C0 6.47059 0.352941 5.05882 1.17647 3.88235C2 2.70588 3.05882 1.76471 4.35294 1.05882C5.64706 0.352941 7.05882 0 8.5 0ZM8.5 1.41176C7.29412 1.41176 6.11765 1.70588 5.05882 2.29412C4 2.88235 3.11765 3.70588 2.47059 4.70588C1.82353 5.70588 1.5 6.82353 1.5 8C1.5 9.17647 1.82353 10.2941 2.47059 11.2941C3.11765 12.2941 4 13.1176 5.05882 13.7059C6.11765 14.2941 7.29412 14.5882 8.5 14.5882C9.70588 14.5882 10.8824 14.2941 11.9412 13.7059C13 13.1176 13.8824 12.2941 14.5294 11.2941C15.1765 10.2941 15.5 9.17647 15.5 8C15.5 6.82353 15.1765 5.70588 14.5294 4.70588C13.8824 3.70588 13 2.88235 11.9412 2.29412C10.8824 1.70588 9.70588 1.41176 8.5 1.41176Z" fill="currentColor"/>
              <path d="M8.5 3.5C10.7091 3.5 12.5 5.29086 12.5 7.5C12.5 9.70914 10.7091 11.5 8.5 11.5C6.29086 11.5 4.5 9.70914 4.5 7.5C4.5 5.29086 6.29086 3.5 8.5 3.5Z" fill="currentColor"/>
            </svg>
            <svg width="27" height="12" viewBox="0 0 27 12" fill="none" xmlns="http://www.w3.org/2000/svg">
              <rect x="0.5" y="0.5" width="25" height="11" rx="2.5" stroke="currentColor"/>
              <rect x="2" y="2" width="21" height="8" rx="1.5" fill="currentColor"/>
              <path d="M26.5 4V8C27.167 7.33333 27.167 4.66667 26.5 4Z" fill="currentColor"/>
            </svg>
          </div>
        </div>
        
        {/* App Content */}
        <div className="h-[calc(100%-96px)] overflow-y-auto bg-gradient-to-b from-background via-background to-secondary/20 pb-16">
          <div className="px-4 pt-4">
            {/* Top Navigation */}
            <div className="flex justify-between items-center mb-6">
              <h1 className="text-xl font-semibold text-gradient">
                AugMend Health
              </h1>
              <div className="flex items-center space-x-2">
                <button className="p-2 rounded-full frosted-glass">
                  <Settings className="w-4 h-4 text-foreground/70" />
                </button>
              </div>
            </div>
            
            {/* Main Content */}
            <div className="pb-16">
              {activeTab === "dashboard" && <ProgressDashboard />}
              {activeTab === "toolkit" && <WellnessToolkit />}
              {activeTab === "library" && <ContentLibrary />}
              {activeTab === "bookmarks" && <BookmarkedContent />}
            </div>
          </div>
        </div>
        
        {/* Bottom Navigation */}
        <div className="absolute bottom-0 left-0 right-0 h-20 glassmorphism border-t border-white/20">
          <div className="grid grid-cols-4 h-full">
            <button
              onClick={() => setActiveTab("dashboard")}
              className={`flex flex-col items-center justify-center ${
                activeTab === "dashboard"
                  ? "text-primary"
                  : "text-muted-foreground"
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
              <span className="text-xs mt-1">Home</span>
            </button>

            <button
              onClick={() => setActiveTab("toolkit")}
              className={`flex flex-col items-center justify-center ${
                activeTab === "toolkit"
                  ? "text-primary"
                  : "text-muted-foreground"
              }`}
            >
              <Heart className="w-6 h-6" />
              <span className="text-xs mt-1">Toolkit</span>
            </button>

            <button
              onClick={() => setActiveTab("library")}
              className={`flex flex-col items-center justify-center ${
                activeTab === "library"
                  ? "text-primary"
                  : "text-muted-foreground"
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
              <span className="text-xs mt-1">Library</span>
            </button>

            <button
              onClick={() => setActiveTab("bookmarks")}
              className={`flex flex-col items-center justify-center ${
                activeTab === "bookmarks"
                  ? "text-primary"
                  : "text-muted-foreground"
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
              <span className="text-xs mt-1">Saved</span>
            </button>
          </div>
        </div>
        
        {/* iPhone Home Indicator */}
        <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 w-32 h-1 bg-white/30 rounded-full"></div>
      </div>
    </div>
  );
};

export default MobileAppMockup;