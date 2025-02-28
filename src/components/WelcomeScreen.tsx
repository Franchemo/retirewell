
import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { X, Loader2 } from "lucide-react";

export const WelcomeScreen = () => {
  const navigate = useNavigate();
  const [mounted, setMounted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isPreloading, setIsPreloading] = useState(true);

  useEffect(() => {
    const hasSeenWelcome = localStorage.getItem("hasSeenWelcome");
    
    // Preload critical dashboard components
    const preloadResources = async () => {
      try {
        // Simulate preloading of resources
        await new Promise(resolve => setTimeout(resolve, 300));
        setIsPreloading(false);
      } catch (error) {
        console.error("Failed to preload resources:", error);
        setIsPreloading(false);
      }
    };

    if (hasSeenWelcome) {
      navigate("/dashboard", { replace: true });
    } else {
      setMounted(true);
      preloadResources();
    }
  }, [navigate]);

  const handleContinue = async () => {
    try {
      setIsLoading(true);
      
      // Simulate asynchronous data loading
      await new Promise(resolve => setTimeout(resolve, 500));
      
      // Store welcome flag and navigate
      localStorage.setItem("hasSeenWelcome", "true");
      
      // Use a small timeout to ensure smooth transition
      setTimeout(() => {
        navigate("/", { replace: true });
      }, 100);
    } catch (error) {
      console.error("Error during transition:", error);
      setIsLoading(false);
    }
  };

  if (!mounted) return null;

  return (
    <AnimatePresence>
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="fixed inset-0 z-50"
      >
        <div 
          className="absolute inset-0 bg-gradient-to-br from-[#4B4E8E] to-[#80BDE7]"
          style={{
            backgroundImage: `
              linear-gradient(135deg, #4B4E8E 0%, #80BDE7 100%),
              url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M11 18c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm48 25c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm-43-7c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm63 31c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM34 90c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm56-76c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM12 86c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm28-65c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm23-11c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-6 60c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm29 22c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zM32 63c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm57-13c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-9-21c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM60 91c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM35 41c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM12 60c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2z' fill='rgba(255,255,255,0.05)' fill-rule='evenodd'/%3E%3C/svg%3E")
            `
          }}
        />

        <motion.button
          onClick={() => handleContinue()}
          className="absolute top-4 right-4 p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          disabled={isLoading || isPreloading}
        >
          <X className="w-5 h-5" />
        </motion.button>

        <div className="relative z-10 h-full flex flex-col items-center justify-between py-20 px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="w-full"
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.8 }}
              className="w-24 h-24 mx-auto mb-8 rounded-xl bg-white/20 backdrop-blur-sm flex items-center justify-center shadow-lg shadow-[#4B4E8E]/20"
            >
              {/* Logo placeholder - replace with actual logo */}
              <div className="text-4xl font-bold text-white">AH</div>
            </motion.div>
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 tracking-tight text-shadow">
              Welcome to AugMend Health
            </h1>
            <p className="text-xl text-white/90 tracking-wide">
              Your journey to better health begins here
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.8 }}
            className="w-full max-w-sm flex flex-col items-center"
          >
            <motion.button
              onClick={handleContinue}
              className="w-full h-14 bg-white rounded-xl text-[#4B4E8E] font-medium shadow-lg shadow-black/30 hover:shadow-xl hover:shadow-black/40 transition-all duration-300 relative overflow-hidden"
              whileHover={{ scale: 1.02, y: -1 }}
              whileTap={{ scale: 0.98 }}
              disabled={isLoading || isPreloading}
            >
              {isLoading ? (
                <div className="flex items-center justify-center space-x-2">
                  <Loader2 className="w-5 h-5 animate-spin" />
                  <span>Loading dashboard...</span>
                </div>
              ) : isPreloading ? (
                "Preparing your experience..."
              ) : (
                "Take me to my dashboard"
              )}
            </motion.button>
            <p className="mt-4 text-white/70 tracking-wide">
              Personalized insights await you
            </p>
          </motion.div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};
