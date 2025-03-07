
import HealthTopic, { IHealthTopic } from '../models/HealthAssistant';

// Function to initialize the health knowledge base with default topics
export const initializeKnowledgeBase = async (): Promise<void> => {
  const topics = [
    // Sleep
    {
      keyword: 'sleep',
      content: 'For better sleep quality: establish a regular sleep schedule, avoid caffeine and electronics before bedtime, create a comfortable sleep environment, and aim for 7-9 hours of sleep each night.',
      category: 'sleep'
    },
    {
      keyword: 'insomnia',
      content: 'Insomnia can be addressed by maintaining regular sleep hours, creating a relaxing bedtime routine, limiting screen time before bed, and trying relaxation techniques like deep breathing or meditation.',
      category: 'sleep'
    },
    
    // Nutrition
    {
      keyword: 'nutrition',
      content: 'A balanced diet includes a variety of fruits, vegetables, whole grains, lean proteins, and healthy fats. Aim to eat a rainbow of colors to ensure you\'re getting diverse nutrients.',
      category: 'nutrition'
    },
    {
      keyword: 'hydration',
      content: 'Proper hydration is essential for health. Most adults should aim for about 2-3 liters (8-10 cups) of water daily, adjusting based on activity level, climate, and individual needs.',
      category: 'nutrition'
    },
    {
      keyword: 'heart health',
      content: 'Foods that support heart health include those rich in omega-3 fatty acids (like salmon and walnuts), fiber-rich foods (like oats and beans), plenty of fruits and vegetables, and foods low in sodium and saturated fats.',
      category: 'nutrition'
    },
    
    // Exercise
    {
      keyword: 'exercise',
      content: 'The general recommendation is at least 150 minutes of moderate-intensity or 75 minutes of vigorous-intensity aerobic activity per week, plus muscle-strengthening activities at least twice weekly.',
      category: 'exercise'
    },
    {
      keyword: 'stretching',
      content: 'Regular stretching improves flexibility, prevents injuries, enhances physical performance, and can reduce stress. Aim to stretch major muscle groups for 30-60 seconds each, at least 2-3 times per week.',
      category: 'exercise'
    },
    
    // Stress Management
    {
      keyword: 'stress',
      content: 'Effective stress management techniques include regular physical activity, mindfulness meditation, deep breathing exercises, adequate sleep, connecting with others, and setting realistic goals and boundaries.',
      category: 'stress'
    },
    {
      keyword: 'meditation',
      content: 'Meditation can reduce stress, improve focus, and promote emotional well-being. Start with just 5 minutes daily of focused breathing, gradually increasing the duration as it becomes more comfortable.',
      category: 'stress'
    },
    
    // General Wellness
    {
      keyword: 'immune system',
      content: 'Support your immune system with a balanced diet rich in fruits and vegetables, regular exercise, adequate sleep, stress management, and staying hydrated. Vitamin C, D, and zinc are particularly important nutrients.',
      category: 'general'
    },
    {
      keyword: 'headache',
      content: 'Common headache triggers include stress, dehydration, poor posture, eye strain, and certain foods. Management strategies include staying hydrated, practicing stress-relief techniques, and maintaining regular sleep patterns.',
      category: 'general'
    }
  ];

  // For each topic, update if exists or create if doesn't
  for (const topic of topics) {
    await HealthTopic.findOneAndUpdate(
      { keyword: topic.keyword },
      topic,
      { upsert: true, new: true }
    );
  }
};

export const generateResponse = async (input: string): Promise<string> => {
  // Convert input to lowercase for case-insensitive matching
  input = input.toLowerCase();
  
  // Check for emergency-related keywords
  if (input.includes('emergency') || 
      input.includes('heart attack') || 
      input.includes('stroke') || 
      input.includes('suicide') ||
      input.includes('dying')) {
    return 'This appears to be an emergency situation. I am not capable of providing emergency assistance. Please call your local emergency number (like 911) immediately, or go to the nearest emergency room.';
  }
  
  // Check for medical diagnosis attempts
  if (input.includes('do i have') || 
      input.includes('diagnose') || 
      input.includes('diagnosis')) {
    return 'I cannot provide medical diagnoses or replace professional medical advice. Please consult with a healthcare professional for proper evaluation of your symptoms and concerns.';
  }
  
  // Search knowledge base for relevant information
  let response = 'I don\'t have specific information on that topic. For personalized health advice, please consult with a healthcare professional.';
  
  // Get all topics from the database
  const allTopics = await HealthTopic.find({});
  
  // Find a matching topic
  for (const topic of allTopics) {
    if (input.includes(topic.keyword)) {
      response = topic.content;
      break;
    }
  }
  
  return response + '\n\nRemember, I provide general information only. For personalized advice, please consult with a healthcare professional.';
};

export const getSuggestedQuestions = async (): Promise<string[]> => {
  // Default suggested questions
  const defaultQuestions = [
    'How can I improve my sleep quality?',
    'What are good foods for heart health?',
    'How much exercise is recommended weekly?',
    'What can help with stress reduction?',
    'How can I stay hydrated throughout the day?'
  ];
  
  return defaultQuestions;
};
