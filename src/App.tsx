
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ThemeProvider } from "@/contexts/ThemeContext";
import { RetireWellProvider } from "@/contexts/RetireWellContext";
import { Toaster } from "@/components/ui/toaster";
import { ErrorBoundary } from "@/components/ErrorBoundary";

// RetireWell Pages
import RetireWellHome from "@/pages/RetireWell/Home";
import DreamSetting from "@/pages/RetireWell/DreamSetting";
import GoalOnboarding from "@/pages/RetireWell/GoalOnboarding";
import ScenarioPlanning from "@/pages/RetireWell/ScenarioPlanning";
import DreamVisualization from "@/pages/RetireWell/DreamVisualization";
import Profile from "@/pages/RetireWell/Profile";
import Learn from "@/pages/RetireWell/Learn";

// Original AugMend Health Pages
import Index from "@/pages/Index";
import HealthAssistant from "@/pages/HealthAssistant";
import ReflectionJournal from "@/pages/ReflectionJournal";
import WellnessCenter from "@/pages/WellnessCenter";
import Achievements from "@/pages/Achievements";
import NotFound from "@/pages/NotFound";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5, // 5 minutes
      retry: 1,
    },
  },
});

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        <RetireWellProvider>
          <ErrorBoundary>
            <Router>
              <div className="min-h-screen bg-background text-foreground">
                <Routes>
                  {/* Default route redirects to RetireWell */}
                  <Route path="/" element={<Navigate to="/retirewell" replace />} />
                  
                  {/* RetireWell Routes */}
                  <Route path="/retirewell" element={<RetireWellHome />} />
                  <Route path="/retirewell/dreams" element={<DreamSetting />} />
                  <Route path="/retirewell/onboarding" element={<GoalOnboarding />} />
                  <Route path="/retirewell/scenarios" element={<ScenarioPlanning />} />
                  <Route path="/retirewell/visualization" element={<DreamVisualization />} />
                  <Route path="/retirewell/profile" element={<Profile />} />
                  <Route path="/retirewell/learn" element={<Learn />} />
                  
                  {/* Original AugMend Health Routes */}
                  <Route path="/augmend" element={<Index />} />
                  <Route path="/augmend/health-assistant" element={<HealthAssistant />} />
                  <Route path="/augmend/reflection" element={<ReflectionJournal />} />
                  <Route path="/augmend/wellness" element={<WellnessCenter />} />
                  <Route path="/augmend/achievements" element={<Achievements />} />
                  <Route path="*" element={<NotFound />} />
                </Routes>
                <Toaster />
              </div>
            </Router>
          </ErrorBoundary>
        </RetireWellProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
}

export default App;
