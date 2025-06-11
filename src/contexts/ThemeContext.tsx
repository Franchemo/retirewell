
import React, { createContext, useState, useEffect, useContext, type ReactNode } from "react";

type ThemeType = "default" | "dark" | "high-contrast" | "purple" | "green";
type FontSizeType = "small" | "medium" | "large" | "xlarge";
type DensityType = "compact" | "default" | "spacious";

interface ThemeContextType {
  theme: ThemeType;
  fontSize: FontSizeType;
  density: DensityType;
  setTheme: (theme: ThemeType) => void;
  setFontSize: (size: FontSizeType) => void;
  setDensity: (density: DensityType) => void;
  resetToDefaults: () => void;
  isSettingsPanelOpen: boolean;
  toggleSettingsPanel: () => void;
}

const defaultValues: ThemeContextType = {
  theme: "default",
  fontSize: "medium",
  density: "default",
  setTheme: () => {},
  setFontSize: () => {},
  setDensity: () => {},
  resetToDefaults: () => {},
  isSettingsPanelOpen: false,
  toggleSettingsPanel: () => {},
};

export const ThemeContext = createContext<ThemeContextType>(defaultValues);

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
};

interface ThemeProviderProps {
  children: ReactNode;
}

export const ThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => {
  // Initialize state from localStorage or defaults
  const [theme, setThemeState] = useState<ThemeType>(() => {
    try {
      const savedTheme = localStorage.getItem("theme") as ThemeType;
      return savedTheme || "default";
    } catch {
      return "default";
    }
  });
  
  const [fontSize, setFontSizeState] = useState<FontSizeType>(() => {
    try {
      const savedFontSize = localStorage.getItem("fontSize") as FontSizeType;
      return savedFontSize || "medium";
    } catch {
      return "medium";
    }
  });
  
  const [density, setDensityState] = useState<DensityType>(() => {
    try {
      const savedDensity = localStorage.getItem("density") as DensityType;
      return savedDensity || "default";
    } catch {
      return "default";
    }
  });
  
  const [isSettingsPanelOpen, setIsSettingsPanelOpen] = useState(false);

  // Apply theme to document
  useEffect(() => {
    try {
      // Remove all theme classes
      document.documentElement.classList.remove(
        "theme-dark", 
        "theme-high-contrast", 
        "theme-purple", 
        "theme-green"
      );
      
      // Add the current theme class (except for default which doesn't need a class)
      if (theme !== "default") {
        document.documentElement.classList.add(`theme-${theme}`);
      }
      
      localStorage.setItem("theme", theme);
    } catch (error) {
      console.warn("Error applying theme:", error);
    }
  }, [theme]);

  // Apply font size to document
  useEffect(() => {
    try {
      // Remove all font size classes
      document.documentElement.classList.remove(
        "text-size-small",
        "text-size-medium",
        "text-size-large",
        "text-size-xlarge"
      );
      
      // Add the current font size class
      document.documentElement.classList.add(`text-size-${fontSize}`);
      
      localStorage.setItem("fontSize", fontSize);
    } catch (error) {
      console.warn("Error applying font size:", error);
    }
  }, [fontSize]);

  // Apply density to document
  useEffect(() => {
    try {
      // Remove all density classes
      document.documentElement.classList.remove(
        "density-compact",
        "density-default",
        "density-spacious"
      );
      
      // Add the current density class
      document.documentElement.classList.add(`density-${density}`);
      
      localStorage.setItem("density", density);
    } catch (error) {
      console.warn("Error applying density:", error);
    }
  }, [density]);

  // Setter functions
  const setTheme = (newTheme: ThemeType) => {
    setThemeState(newTheme);
  };

  const setFontSize = (newSize: FontSizeType) => {
    setFontSizeState(newSize);
  };

  const setDensity = (newDensity: DensityType) => {
    setDensityState(newDensity);
  };

  const resetToDefaults = () => {
    setThemeState("default");
    setFontSizeState("medium");
    setDensityState("default");
  };

  const toggleSettingsPanel = () => {
    setIsSettingsPanelOpen(prev => !prev);
  };

  return (
    <ThemeContext.Provider
      value={{
        theme,
        fontSize,
        density,
        setTheme,
        setFontSize,
        setDensity,
        resetToDefaults,
        isSettingsPanelOpen,
        toggleSettingsPanel,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
};
