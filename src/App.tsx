
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

// Configure query client with optimized settings and error handling
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: 2,
      staleTime: 5 * 60 * 1000,
      onError: (err) => {
        console.error('Query error:', err);
      }
    },
    mutations: {
      retry: 1,
      onError: (err) => {
        console.error('Mutation error:', err);
      }
    }
  },
});

// Browser capability detection
const detectBrowserCapabilities = () => {
  const capabilities = {
    isSafari: false,
    isIOS: false,
    isOldBrowser: false,
    hasLocalStorage: false,
    supportsPromises: false
  };
  
  try {
    // Detect Safari
    const ua = navigator.userAgent.toLowerCase();
    capabilities.isSafari = ua.indexOf('safari') !== -1 && ua.indexOf('chrome') === -1;
    
    // Detect iOS
    capabilities.isIOS = /iphone|ipad|ipod/.test(ua) || (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1);
    
    // Check if browser is old (lacks modern features)
    capabilities.isOldBrowser = !window.Promise || !window.fetch || !window.localStorage;
    
    // Check localStorage availability
    try {
      localStorage.setItem('test', 'test');
      localStorage.removeItem('test');
      capabilities.hasLocalStorage = true;
    } catch (e) {
      capabilities.hasLocalStorage = false;
    }
    
    // Check Promise support
    capabilities.supportsPromises = typeof Promise !== 'undefined';
    
    return capabilities;
  } catch (error) {
    console.error('Error detecting browser capabilities:', error);
    return capabilities;
  }
};

const App = () => {
  const [hasCheckedWelcome, setHasCheckedWelcome] = useState(false);
  const [showWelcome, setShowWelcome] = useState(false);
  const [browserCapabilities, setBrowserCapabilities] = useState({
    isSafari: false,
    isIOS: false,
    isOldBrowser: false,
    hasLocalStorage: true,
    supportsPromises: true
  });
  const [isError, setIsError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  // Detect browser capabilities
  useEffect(() => {
    try {
      const capabilities = detectBrowserCapabilities();
      setBrowserCapabilities(capabilities);
      
      // If old browser detected, load polyfills
      if (capabilities.isOldBrowser) {
        // This would ideally load polyfills dynamically
        console.log('Loading polyfills for older browser');
      }
    } catch (error) {
      console.error('Error in browser detection:', error);
      setIsError(true);
      setErrorMessage("Unable to detect browser capabilities. Some features may not work correctly.");
    }
  }, []);

  // Apply browser-specific fixes
  useEffect(() => {
    const { isSafari, isIOS } = browserCapabilities;
    
    if (isSafari) {
      // Add Safari class to body for specific CSS targeting
      document.body.classList.add('safari-browser');
      
      // Fix for Safari height issues
      document.documentElement.classList.add('safari-height-fix');
      document.body.classList.add('safari-height-fix');
    }
    
    if (isIOS) {
      // Add iOS specific classes
      document.body.classList.add('ios-device');
      
      // Fix for iOS scrolling and touch handling
      document.documentElement.style.WebkitOverflowScrolling = 'touch';
      
      // Fix for iOS vh units
      const fixVh = () => {
        const vh = window.innerHeight * 0.01;
        document.documentElement.style.setProperty('--vh', `${vh}px`);
      };
      
      window.addEventListener('resize', fixVh);
      fixVh();
      
      return () => {
        window.removeEventListener('resize', fixVh);
      };
    }
    
    return () => {
      if (isSafari) {
        document.body.classList.remove('safari-browser');
        document.documentElement.classList.remove('safari-height-fix');
        document.body.classList.remove('safari-height-fix');
      }
      if (isIOS) {
        document.body.classList.remove('ios-device');
      }
    };
  }, [browserCapabilities]);

  // Check if user has seen welcome screen
  useEffect(() => {
    try {
      // Check if localStorage is available
      if (!browserCapabilities.hasLocalStorage) {
        console.warn('localStorage not available, welcome screen will always show');
        setShowWelcome(true);
        setHasCheckedWelcome(true);
        return;
      }
      
      const hasSeenWelcome = localStorage.getItem("hasSeenWelcome");
      setShowWelcome(!hasSeenWelcome);
      setHasCheckedWelcome(true);
    } catch (error) {
      console.error('Error checking welcome status:', error);
      setShowWelcome(true);
      setHasCheckedWelcome(true);
    }
  }, [browserCapabilities.hasLocalStorage]);

  // Error fallback component
  if (isError) {
    return (
      <div className="min-h-screen w-full flex items-center justify-center bg-background p-4">
        <div className="max-w-md p-6 bg-white rounded-lg shadow-lg">
          <h2 className="text-xl font-semibold text-red-600 mb-4">Something went wrong</h2>
          <p className="text-gray-700 mb-4">{errorMessage}</p>
          <p className="text-sm text-gray-500">Please try refreshing the page or using a different browser.</p>
        </div>
      </div>
    );
  }

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
          <ErrorBoundary>
            <BrowserRouter>
              <Suspense fallback={<PageLoader />}>
                <Routes>
                  <Route path="/" element={<Index browserCapabilities={browserCapabilities} />} />
                  <Route path="/dashboard" element={<Navigate to="/" replace />} />
                  <Route path="/reflection-journal" element={<ReflectionJournal />} />
                  <Route path="/health-assistant" element={<HealthAssistant />} />
                  {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
                  <Route path="*" element={<NotFound />} />
                </Routes>
              </Suspense>
            </BrowserRouter>
          </ErrorBoundary>
        </TooltipProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
};

// Simple Error Boundary Component
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error('Application error:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen w-full flex items-center justify-center bg-background p-4">
          <div className="max-w-md p-6 bg-white rounded-lg shadow-lg">
            <h2 className="text-xl font-semibold text-red-600 mb-4">Something went wrong</h2>
            <p className="text-gray-700 mb-4">The application encountered an unexpected error.</p>
            <button
              className="px-4 py-2 bg-primary text-white rounded-lg"
              onClick={() => window.location.reload()}
            >
              Reload Application
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default App;
