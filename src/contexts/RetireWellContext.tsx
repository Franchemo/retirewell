
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

export interface UserProgress {
  hasCompletedDreams: boolean;
  hasCompletedOnboarding: boolean;
  hasCompletedScenarios: boolean;
  currentStep: 'dreams' | 'onboarding' | 'scenarios' | 'visualization' | 'completed';
  dreamsCount: number;
  onboardingData: any;
}

interface RetireWellContextType {
  userProgress: UserProgress;
  updateProgress: (updates: Partial<UserProgress>) => void;
  resetProgress: () => void;
  getNextStep: () => string;
  canAccessPage: (page: string) => boolean;
}

const defaultProgress: UserProgress = {
  hasCompletedDreams: false,
  hasCompletedOnboarding: false,
  hasCompletedScenarios: false,
  currentStep: 'dreams',
  dreamsCount: 0,
  onboardingData: null
};

const RetireWellContext = createContext<RetireWellContextType | undefined>(undefined);

export const RetireWellProvider = ({ children }: { children: ReactNode }) => {
  const [userProgress, setUserProgress] = useState<UserProgress>(defaultProgress);

  // Load progress from localStorage on mount
  useEffect(() => {
    const savedProgress = localStorage.getItem('retirewell-progress');
    const savedOnboarding = localStorage.getItem('retirewell-onboarding');
    
    if (savedProgress) {
      const progress = JSON.parse(savedProgress);
      setUserProgress(prev => ({
        ...prev,
        ...progress,
        onboardingData: savedOnboarding ? JSON.parse(savedOnboarding) : null,
        hasCompletedOnboarding: !!savedOnboarding
      }));
    }
  }, []);

  // Save progress to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('retirewell-progress', JSON.stringify(userProgress));
  }, [userProgress]);

  const updateProgress = (updates: Partial<UserProgress>) => {
    setUserProgress(prev => ({ ...prev, ...updates }));
  };

  const resetProgress = () => {
    setUserProgress(defaultProgress);
    localStorage.removeItem('retirewell-progress');
    localStorage.removeItem('retirewell-onboarding');
  };

  const getNextStep = (): string => {
    if (!userProgress.hasCompletedDreams) {
      return '/retirewell/dreams';
    }
    if (!userProgress.hasCompletedOnboarding) {
      return '/retirewell/onboarding';
    }
    if (!userProgress.hasCompletedScenarios) {
      return '/retirewell/scenarios';
    }
    return '/retirewell/visualization';
  };

  const canAccessPage = (page: string): boolean => {
    switch (page) {
      case 'dreams':
        return true; // Always accessible
      case 'onboarding':
        return userProgress.hasCompletedDreams;
      case 'scenarios':
        return userProgress.hasCompletedDreams && userProgress.hasCompletedOnboarding;
      case 'visualization':
        return userProgress.hasCompletedDreams && userProgress.hasCompletedOnboarding;
      case 'learn':
      case 'profile':
        return true; // Always accessible
      default:
        return true;
    }
  };

  return (
    <RetireWellContext.Provider value={{
      userProgress,
      updateProgress,
      resetProgress,
      getNextStep,
      canAccessPage
    }}>
      {children}
    </RetireWellContext.Provider>
  );
};

export const useRetireWell = () => {
  const context = useContext(RetireWellContext);
  if (context === undefined) {
    throw new Error('useRetireWell must be used within a RetireWellProvider');
  }
  return context;
};
