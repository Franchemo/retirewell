
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { DailyPrompt } from "@/components/reflection/DailyPrompt";
import { ReflectionCalendar } from "@/components/reflection/ReflectionCalendar";
import { ReflectionHistory } from "@/components/reflection/ReflectionHistory";
import { ReflectionDetail } from "@/components/reflection/ReflectionDetail";
import { Reflection } from "@/types/reflection";
import { v4 as uuidv4 } from "uuid";
import { Book, ChevronLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

const ReflectionJournal = () => {
  const navigate = useNavigate();
  const [reflections, setReflections] = useState<Reflection[]>([]);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedReflection, setSelectedReflection] = useState<Reflection | null>(null);
  
  // Load reflections from localStorage on component mount
  useEffect(() => {
    const savedReflections = localStorage.getItem("reflections");
    if (savedReflections) {
      setReflections(JSON.parse(savedReflections));
    }
  }, []);

  // Save reflections to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem("reflections", JSON.stringify(reflections));
  }, [reflections]);

  const handleSaveReflection = (newReflection: { text: string, mood: string, date: Date }) => {
    // Check if a reflection for this date already exists
    const existingIndex = reflections.findIndex(r => 
      new Date(r.date).toDateString() === newReflection.date.toDateString()
    );
    
    if (existingIndex >= 0) {
      // Update existing reflection
      const updatedReflections = [...reflections];
      updatedReflections[existingIndex] = {
        ...updatedReflections[existingIndex],
        text: newReflection.text,
        mood: newReflection.mood,
        updatedAt: new Date().toISOString()
      };
      setReflections(updatedReflections);
    } else {
      // Create new reflection
      const reflectionToAdd: Reflection = {
        id: uuidv4(),
        text: newReflection.text,
        mood: newReflection.mood,
        date: newReflection.date.toISOString(),
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      };
      setReflections([...reflections, reflectionToAdd]);
    }
  };

  const handleEditReflection = (editedReflection: Reflection) => {
    const updatedReflections = reflections.map(reflection => 
      reflection.id === editedReflection.id 
        ? { ...editedReflection, updatedAt: new Date().toISOString() } 
        : reflection
    );
    setReflections(updatedReflections);
    setSelectedReflection(editedReflection);
  };

  const handleDeleteReflection = (id: string) => {
    setReflections(reflections.filter(reflection => reflection.id !== id));
    setSelectedReflection(null);
  };

  // Find if there's a reflection for the currently selected date
  const reflectionForSelectedDate = reflections.find(reflection => 
    new Date(reflection.date).toDateString() === selectedDate.toDateString()
  );

  return (
    <div className="min-h-screen bg-gradient-to-b from-background via-background to-secondary/20">
      {/* Top Navigation */}
      <motion.nav 
        className="fixed top-0 left-0 right-0 z-50 glassmorphism border-b border-white/20"
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <button 
                onClick={() => navigate('/')}
                className="mr-4 p-2 rounded-full frosted-glass"
                aria-label="Go back"
              >
                <ChevronLeft className="w-5 h-5 text-foreground/70" />
              </button>
              <h1 className="text-xl font-semibold text-gradient flex items-center">
                <Book className="w-5 h-5 mr-2" />
                Reflection Journal
              </h1>
            </div>
          </div>
        </div>
      </motion.nav>

      {/* Main Content */}
      <main className="pt-24 pb-16 px-4 sm:px-6 lg:px-8 max-w-screen-xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            {selectedReflection ? (
              <ReflectionDetail
                reflection={selectedReflection}
                onEdit={handleEditReflection}
                onDelete={handleDeleteReflection}
                onClose={() => setSelectedReflection(null)}
              />
            ) : (
              <DailyPrompt 
                date={selectedDate}
                onSave={handleSaveReflection}
              />
            )}
            
            <ReflectionHistory
              reflections={reflections}
              onSelectReflection={setSelectedReflection}
            />
          </div>
          
          <div className="space-y-6">
            <ReflectionCalendar
              reflectionDates={reflections.map(r => new Date(r.date))}
              selectedDate={selectedDate}
              onSelectDate={(date) => {
                setSelectedDate(date);
                // If there's a reflection for this date, show it
                const reflection = reflections.find(r => 
                  new Date(r.date).toDateString() === date.toDateString()
                );
                setSelectedReflection(reflection || null);
              }}
            />
            
            {/* Additional stats or info could go here */}
          </div>
        </div>
      </main>
    </div>
  );
};

export default ReflectionJournal;
