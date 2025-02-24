
import { useState } from "react";
import { motion } from "framer-motion";
import { Moon, Sun, Type, Layout } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface PersonalizationSettings {
  theme: "light" | "dark" | "system";
  fontSize: "small" | "medium" | "large";
  layout: "comfortable" | "compact";
  colorScheme: "teal" | "purple" | "blue" | "green";
}

export const PersonalizationSettings = () => {
  const [settings, setSettings] = useState<PersonalizationSettings>({
    theme: "system",
    fontSize: "medium",
    layout: "comfortable",
    colorScheme: "teal"
  });
  
  const { toast } = useToast();

  const handleSettingChange = (key: keyof PersonalizationSettings, value: string) => {
    setSettings(prev => ({ ...prev, [key]: value }));
    toast({
      title: "Settings updated",
      description: `Your ${key} preference has been saved.`
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-lg shadow-sm border border-gray-100 p-6 space-y-6"
    >
      <div>
        <h3 className="text-lg font-medium text-gray-900 mb-4">Personalization</h3>
        
        {/* Theme Selection */}
        <div className="space-y-4">
          <div>
            <label className="text-sm font-medium text-gray-700">Theme</label>
            <div className="mt-2 grid grid-cols-3 gap-3">
              {["light", "dark", "system"].map((theme) => (
                <button
                  key={theme}
                  onClick={() => handleSettingChange("theme", theme)}
                  className={`flex items-center justify-center px-4 py-2 border rounded-lg ${
                    settings.theme === theme
                      ? "border-teal-500 bg-teal-50 text-teal-700"
                      : "border-gray-200 hover:border-teal-500"
                  }`}
                >
                  {theme === "light" ? <Sun className="w-4 h-4 mr-2" /> :
                   theme === "dark" ? <Moon className="w-4 h-4 mr-2" /> :
                   <Layout className="w-4 h-4 mr-2" />}
                  {theme.charAt(0).toUpperCase() + theme.slice(1)}
                </button>
              ))}
            </div>
          </div>

          {/* Font Size */}
          <div>
            <label className="text-sm font-medium text-gray-700">Font Size</label>
            <div className="mt-2 grid grid-cols-3 gap-3">
              {["small", "medium", "large"].map((size) => (
                <button
                  key={size}
                  onClick={() => handleSettingChange("fontSize", size)}
                  className={`flex items-center justify-center px-4 py-2 border rounded-lg ${
                    settings.fontSize === size
                      ? "border-teal-500 bg-teal-50 text-teal-700"
                      : "border-gray-200 hover:border-teal-500"
                  }`}
                >
                  <Type className="w-4 h-4 mr-2" />
                  {size.charAt(0).toUpperCase() + size.slice(1)}
                </button>
              ))}
            </div>
          </div>

          {/* Color Scheme */}
          <div>
            <label className="text-sm font-medium text-gray-700">Color Scheme</label>
            <div className="mt-2 grid grid-cols-2 sm:grid-cols-4 gap-3">
              {["teal", "purple", "blue", "green"].map((color) => (
                <button
                  key={color}
                  onClick={() => handleSettingChange("colorScheme", color)}
                  className={`px-4 py-2 border rounded-lg ${
                    settings.colorScheme === color
                      ? "border-teal-500 bg-teal-50 text-teal-700"
                      : "border-gray-200 hover:border-teal-500"
                  }`}
                >
                  <div className={`w-full h-2 rounded-full bg-${color}-500 mb-1`} />
                  {color.charAt(0).toUpperCase() + color.slice(1)}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};
