
import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import {
  Heart,
  Send,
  ChevronLeft,
  Bot,
  AlertCircle,
  Info,
  PanelRight,
  X,
  Trash2,
} from "lucide-react";
import {
  ChatMessage,
  Message,
  MessageType,
} from "@/components/health-assistant/ChatMessage";
import { SuggestedQuestions } from "@/components/health-assistant/SuggestedQuestions";
import { useToast } from "@/hooks/use-toast";

const INITIAL_MESSAGES: Message[] = [
  {
    id: "welcome",
    type: "assistant",
    content:
      "Hello! I'm your AI Health Assistant. I can help answer questions about general health topics, wellness, and lifestyle. How can I help you today?",
    timestamp: new Date().toISOString(),
  },
];

const SUGGESTED_QUESTIONS = [
  "How can I improve my sleep quality?",
  "What are good foods for heart health?",
  "How much exercise is recommended weekly?",
  "What can help with stress reduction?",
  "How can I stay hydrated throughout the day?",
];

const KNOWLEDGE_BASE: Record<string, string> = {
  // Sleep
  "sleep": "For better sleep quality: establish a regular sleep schedule, avoid caffeine and electronics before bedtime, create a comfortable sleep environment, and aim for 7-9 hours of sleep each night.",
  "insomnia": "Insomnia can be addressed by maintaining regular sleep hours, creating a relaxing bedtime routine, limiting screen time before bed, and trying relaxation techniques like deep breathing or meditation.",
  
  // Nutrition
  "nutrition": "A balanced diet includes a variety of fruits, vegetables, whole grains, lean proteins, and healthy fats. Aim to eat a rainbow of colors to ensure you're getting diverse nutrients.",
  "hydration": "Proper hydration is essential for health. Most adults should aim for about 2-3 liters (8-10 cups) of water daily, adjusting based on activity level, climate, and individual needs.",
  "heart health": "Foods that support heart health include those rich in omega-3 fatty acids (like salmon and walnuts), fiber-rich foods (like oats and beans), plenty of fruits and vegetables, and foods low in sodium and saturated fats.",
  
  // Exercise
  "exercise": "The general recommendation is at least 150 minutes of moderate-intensity or 75 minutes of vigorous-intensity aerobic activity per week, plus muscle-strengthening activities at least twice weekly.",
  "stretching": "Regular stretching improves flexibility, prevents injuries, enhances physical performance, and can reduce stress. Aim to stretch major muscle groups for 30-60 seconds each, at least 2-3 times per week.",
  
  // Stress Management
  "stress": "Effective stress management techniques include regular physical activity, mindfulness meditation, deep breathing exercises, adequate sleep, connecting with others, and setting realistic goals and boundaries.",
  "meditation": "Meditation can reduce stress, improve focus, and promote emotional well-being. Start with just 5 minutes daily of focused breathing, gradually increasing the duration as it becomes more comfortable.",
  
  // General Wellness
  "immune system": "Support your immune system with a balanced diet rich in fruits and vegetables, regular exercise, adequate sleep, stress management, and staying hydrated. Vitamin C, D, and zinc are particularly important nutrients.",
  "headache": "Common headache triggers include stress, dehydration, poor posture, eye strain, and certain foods. Management strategies include staying hydrated, practicing stress-relief techniques, and maintaining regular sleep patterns."
};

// Helper function to simulate AI responses
const generateResponse = (input: string): string => {
  input = input.toLowerCase();
  
  // Check for emergency-related keywords
  if (input.includes("emergency") || 
      input.includes("heart attack") || 
      input.includes("stroke") || 
      input.includes("suicide") ||
      input.includes("dying")) {
    return "This appears to be an emergency situation. I am not capable of providing emergency assistance. Please call your local emergency number (like 911) immediately, or go to the nearest emergency room.";
  }
  
  // Check for medical diagnosis attempts
  if (input.includes("do i have") || 
      input.includes("diagnose") || 
      input.includes("diagnosis")) {
    return "I cannot provide medical diagnoses or replace professional medical advice. Please consult with a healthcare professional for proper evaluation of your symptoms and concerns.";
  }
  
  // Search knowledge base for relevant information
  let response = "I don't have specific information on that topic. For personalized health advice, please consult with a healthcare professional.";
  
  for (const keyword in KNOWLEDGE_BASE) {
    if (input.includes(keyword)) {
      response = KNOWLEDGE_BASE[keyword];
      break;
    }
  }
  
  return response + "\n\nRemember, I provide general information only. For personalized advice, please consult with a healthcare professional.";
};

const HealthAssistant = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [messages, setMessages] = useState<Message[]>(INITIAL_MESSAGES);
  const [inputValue, setInputValue] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [showInfo, setShowInfo] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to the bottom when messages update
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping]);

  const handleSendMessage = () => {
    if (!inputValue.trim()) return;

    const userMessage: Message = {
      id: uuidv4(),
      type: "user",
      content: inputValue,
      timestamp: new Date().toISOString(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputValue("");
    setIsTyping(true);

    // Simulate AI processing time
    setTimeout(() => {
      const aiResponse: Message = {
        id: uuidv4(),
        type: "assistant",
        content: generateResponse(userMessage.content),
        timestamp: new Date().toISOString(),
      };

      setMessages((prev) => [...prev, aiResponse]);
      setIsTyping(false);
    }, 1500);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const handleClearChat = () => {
    if (window.confirm("Are you sure you want to clear the entire chat history?")) {
      setMessages(INITIAL_MESSAGES);
      toast({
        title: "Chat cleared",
        description: "Your conversation history has been cleared."
      });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-background via-background to-secondary/20 flex flex-col">
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
                onClick={() => navigate("/")}
                className="mr-4 p-2 rounded-full frosted-glass"
                aria-label="Go back"
              >
                <ChevronLeft className="w-5 h-5 text-foreground/70" />
              </button>
              <h1 className="text-xl font-semibold text-gradient flex items-center">
                <Bot className="w-5 h-5 mr-2" />
                Health Assistant
              </h1>
            </div>
            <div className="flex items-center space-x-2">
              <button
                onClick={() => setShowInfo(!showInfo)}
                className="p-2 rounded-full frosted-glass"
                aria-label="Information"
              >
                <Info className="w-5 h-5 text-foreground/70" />
              </button>
              <button
                onClick={handleClearChat}
                className="p-2 rounded-full frosted-glass"
                aria-label="Clear chat"
              >
                <Trash2 className="w-5 h-5 text-foreground/70" />
              </button>
            </div>
          </div>
        </div>
      </motion.nav>

      {/* Main Content */}
      <div className="flex-1 flex pt-16 pb-20 relative">
        {/* Chat Messages */}
        <div className="flex-1 overflow-hidden relative">
          <div className="px-4 py-6 h-full overflow-y-auto">
            <div className="max-w-3xl mx-auto space-y-6">
              {messages.map((message) => (
                <ChatMessage key={message.id} message={message} />
              ))}
              {isTyping && (
                <ChatMessage
                  message={{
                    id: "typing",
                    type: "assistant",
                    content: "",
                    timestamp: new Date().toISOString(),
                  }}
                  isTyping
                />
              )}
              <div ref={messagesEndRef} />
            </div>
          </div>
        </div>

        {/* Info Panel */}
        {showInfo && (
          <motion.div
            initial={{ x: 300, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: 300, opacity: 0 }}
            className="fixed right-0 top-16 bottom-0 w-full sm:w-96 bg-background/95 backdrop-blur-sm border-l border-border shadow-lg z-30 overflow-y-auto"
          >
            <div className="p-6">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-medium">About Health Assistant</h3>
                <button 
                  onClick={() => setShowInfo(false)}
                  className="p-1.5 rounded-full hover:bg-secondary/80"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
              
              <div className="space-y-4">
                <div className="p-4 bg-secondary/40 rounded-lg border border-border">
                  <div className="flex items-start">
                    <AlertCircle className="w-5 h-5 text-caution mr-2 flex-shrink-0 mt-0.5" />
                    <div>
                      <h4 className="font-medium mb-1">Medical Disclaimer</h4>
                      <p className="text-sm">
                        This AI assistant provides general information only, not personalized medical advice. Always consult qualified healthcare professionals for specific health concerns.
                      </p>
                    </div>
                  </div>
                </div>
                
                <div>
                  <h4 className="font-medium mb-2">What I can help with:</h4>
                  <ul className="text-sm space-y-2">
                    <li className="flex items-start">
                      <Heart className="w-4 h-4 text-primary mr-2 mt-0.5" />
                      General wellness information
                    </li>
                    <li className="flex items-start">
                      <Heart className="w-4 h-4 text-primary mr-2 mt-0.5" />
                      Healthy lifestyle suggestions
                    </li>
                    <li className="flex items-start">
                      <Heart className="w-4 h-4 text-primary mr-2 mt-0.5" />
                      Nutrition and exercise guidance
                    </li>
                    <li className="flex items-start">
                      <Heart className="w-4 h-4 text-primary mr-2 mt-0.5" />
                      Stress management techniques
                    </li>
                    <li className="flex items-start">
                      <Heart className="w-4 h-4 text-primary mr-2 mt-0.5" />
                      Sleep improvement tips
                    </li>
                  </ul>
                </div>
                
                <div>
                  <h4 className="font-medium mb-2">What I cannot help with:</h4>
                  <ul className="text-sm space-y-2">
                    <li className="flex items-start">
                      <X className="w-4 h-4 text-destructive mr-2 mt-0.5" />
                      Medical diagnoses
                    </li>
                    <li className="flex items-start">
                      <X className="w-4 h-4 text-destructive mr-2 mt-0.5" />
                      Treatment recommendations
                    </li>
                    <li className="flex items-start">
                      <X className="w-4 h-4 text-destructive mr-2 mt-0.5" />
                      Emergency medical advice
                    </li>
                    <li className="flex items-start">
                      <X className="w-4 h-4 text-destructive mr-2 mt-0.5" />
                      Prescription medication guidance
                    </li>
                    <li className="flex items-start">
                      <X className="w-4 h-4 text-destructive mr-2 mt-0.5" />
                      Personal health record access
                    </li>
                  </ul>
                </div>
                
                <p className="text-sm text-muted-foreground">
                  In case of emergency, please contact your local emergency services immediately.
                </p>
              </div>
            </div>
          </motion.div>
        )}
      </div>

      {/* Input Area (fixed at bottom) */}
      <div className="fixed bottom-0 left-0 right-0 bg-background/80 backdrop-blur-md border-t border-border p-4">
        <div className="max-w-3xl mx-auto">
          <SuggestedQuestions
            questions={SUGGESTED_QUESTIONS}
            onSelectQuestion={(question) => setInputValue(question)}
          />
          
          <div className="relative">
            <textarea
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Type your health question..."
              className="input-minimal w-full pr-12 min-h-[50px] max-h-32 resize-none"
              rows={1}
            />
            <button
              onClick={handleSendMessage}
              disabled={!inputValue.trim() || isTyping}
              className={`absolute right-2 top-1/2 -translate-y-1/2 p-2 rounded-full ${
                !inputValue.trim() || isTyping
                  ? "text-muted-foreground bg-secondary/50"
                  : "text-primary-foreground bg-primary hover:bg-primary/90"
              } transition-colors`}
              aria-label="Send message"
            >
              <Send className="h-4 w-4" />
            </button>
          </div>
          
          <p className="text-xs text-muted-foreground mt-2 text-center">
            For medical emergencies, please call your local emergency number or visit the nearest emergency room.
          </p>
        </div>
      </div>
    </div>
  );
};

export default HealthAssistant;
