
import api from './api';
import { Message, MessageType } from '@/components/health-assistant/ChatMessage';
import { v4 as uuidv4 } from 'uuid';

const RESOURCE_URL = '/health-assistant';

// Function to get a response from the Health Assistant
export const getAssistantResponse = async (message: string): Promise<Message> => {
  try {
    const response = await api.post(`${RESOURCE_URL}/chat`, { message });
    
    return {
      id: uuidv4(),
      type: 'assistant' as MessageType,
      content: response.data.response,
      timestamp: response.data.timestamp || new Date().toISOString()
    };
  } catch (error) {
    console.error('Error getting assistant response:', error);
    
    // Fallback logic for when API is unavailable
    // Simple local logic to generate a response
    const generateFallbackResponse = (input: string): string => {
      if (input.toLowerCase().includes('emergency') || 
          input.toLowerCase().includes('heart attack') || 
          input.toLowerCase().includes('suicide')) {
        return 'This appears to be an emergency situation. I am not capable of providing emergency assistance. Please call your local emergency number (like 911) immediately.';
      }
      
      return 'I apologize, but I\'m currently unable to connect to the server. Please try again later or check your internet connection.\n\nFor emergency assistance, please contact emergency services.';
    };
    
    // Return a fallback response
    return {
      id: uuidv4(),
      type: 'assistant' as MessageType,
      content: generateFallbackResponse(message),
      timestamp: new Date().toISOString()
    };
  }
};

// Function to get suggested questions from the Health Assistant
export const getSuggestedQuestions = async (): Promise<string[]> => {
  try {
    const response = await api.get(`${RESOURCE_URL}/suggested-questions`);
    return response.data.questions;
  } catch (error) {
    console.error('Error getting suggested questions:', error);
    
    // Default questions as fallback
    return [
      'How can I improve my sleep quality?',
      'What are good foods for heart health?',
      'How much exercise is recommended weekly?',
      'What can help with stress reduction?',
      'How can I stay hydrated throughout the day?'
    ];
  }
};
