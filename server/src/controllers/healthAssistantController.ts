
import { Request, Response } from 'express';
import * as HealthAssistantService from '../services/healthAssistantService';

// Initialize the knowledge base
export const initializeKnowledgeBase = async (req: Request, res: Response): Promise<void> => {
  try {
    await HealthAssistantService.initializeKnowledgeBase();
    res.status(200).json({ message: 'Knowledge base initialized successfully' });
  } catch (error) {
    console.error('Error initializing knowledge base:', error);
    res.status(500).json({ error: 'Failed to initialize knowledge base' });
  }
};

// Get a response from the Health Assistant
export const getAssistantResponse = async (req: Request, res: Response): Promise<void> => {
  try {
    const { message } = req.body;
    
    if (!message) {
      res.status(400).json({ error: 'Message is required' });
      return;
    }
    
    const response = await HealthAssistantService.generateResponse(message);
    res.status(200).json({ 
      response,
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    console.error('Error generating response:', error);
    res.status(500).json({ error: 'Failed to generate response' });
  }
};

// Get suggested questions
export const getSuggestedQuestions = async (req: Request, res: Response): Promise<void> => {
  try {
    const questions = await HealthAssistantService.getSuggestedQuestions();
    res.status(200).json({ questions });
  } catch (error) {
    console.error('Error getting suggested questions:', error);
    res.status(500).json({ error: 'Failed to get suggested questions' });
  }
};
