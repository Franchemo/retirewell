
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { ThemeProvider } from "@/contexts/ThemeContext";
import { Suspense, lazy, useEffect, useState } from "react";
import { WelcomeScreen } from "@/components/WelcomeScreen";
import NotFound from "./pages/NotFound";

// Lazy load page components for performance optimization
const Index = lazy(() => import("./pages/Index"));
const ReflectionJournal = lazy(() => import("./pages/ReflectionJournal"));
const HealthAssistant = lazy(() => import("./pages/HealthAssistant"));

// Create a more sophisticated loading component
const PageLoader = () => (
  <div className="min-h-screen w-full flex items-center justify-center bg-background safari-height-fix">
    <div className="flex flex-col items-center">
      <div className="w-12 h-12 rounded-full border-4 border-primary/30 border-t-primary animate-spin mb-4"></div>
      <p className="text-foreground/70 animate-pulse">Loading your content...</p>
    </div>
  </div>
);

// Configure query client with optimized settings
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: 1,
      staleTime: 5 * 60 * 1000,
    },
  },
});

// Safari detection utility
const detectSafari = () => {
  const ua = navigator.userAgent.toLowerCase();
  return ua.indexOf('safari') !== -1 && ua.indexOf('chrome') === -1;
};

const App = () => {
  const [hasCheckedWelcome, setHasCheckedWelcome] = useState(false);
  const [showWelcome, setShowWelcome] = useState(false);
  const [isSafari, setIsSafari] = useState(false);

  // Detect Safari browser
  useEffect(() => {
    setIsSafari(detectSafari());
  }, []);

  // Apply Safari-specific fixes
  useEffect(() => {
    if (isSafari) {
      // Add Safari class to body for specific CSS targeting
      document.body.classList.add('safari-browser');
      
      // Fix for Safari height issues
      document.documentElement.classList.add('safari-height-fix');
      document.body.classList.add('safari-height-fix');
    }
    
    return () => {
      if (isSafari) {
        document.body.classList.remove('safari-browser');
        document.documentElement.classList.remove('safari-height-fix');
        document.body.classList.remove('safari-height-fix');
      }
    };
  }, [isSafari]);

  // Check if user has seen welcome screen
  useEffect(() => {
    const hasSeenWelcome = localStorage.getItem("hasSeenWelcome");
    setShowWelcome(!hasSeenWelcome);
    setHasCheckedWelcome(true);
  }, []);

  if (!hasCheckedWelcome) {
    return <PageLoader />;
  }

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          {showWelcome && <WelcomeScreen />}
          <BrowserRouter>
            <Suspense fallback={<PageLoader />}>
              <Routes>
                <Route path="/" element={<Index isSafari={isSafari} />} />
                <Route path="/dashboard" element={<Navigate to="/" replace />} />
                <Route path="/reflection-journal" element={<ReflectionJournal />} />
                <Route path="/health-assistant" element={<HealthAssistant />} />
                {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
                <Route path="*" element={<NotFound />} />
              </Routes>
            </Suspense>
          </BrowserRouter>
        </TooltipProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
};

export default App;
