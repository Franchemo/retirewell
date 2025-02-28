
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
  <div className="min-h-screen w-full flex items-center justify-center bg-background">
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

const App = () => {
  const [hasCheckedWelcome, setHasCheckedWelcome] = useState(false);
  const [showWelcome, setShowWelcome] = useState(false);

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
                <Route path="/" element={<Index />} />
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
