
import { Request, Response } from 'express';
import * as healthAssistantService from '../services/healthAssistantService';

export const chatWithAssistant = async (req: Request, res: Response) => {
  try {
    const { message } = req.body;
    
    if (!message) {
      return res.status(400).json({ error: 'Message is required' });
    }
    
    // Generate a response to the user's message
    const response = await healthAssistantService.generateResponse(message);
    
    // Save the conversation in the database (optional)
    await healthAssistantService.saveChat(message, response);
    
    // Return the response to the client
    return res.status(200).json({
      response,
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    console.error('Error in health assistant chat:', error);
    return res.status(500).json({ error: 'Failed to process request' });
  }
};

export const getSuggestedQuestions = async (_req: Request, res: Response) => {
  try {
    const questions = await healthAssistantService.getSuggestedQuestions();
    
    return res.status(200).json({
      questions
    });
  } catch (error) {
    console.error('Error getting suggested questions:', error);
    return res.status(500).json({ error: 'Failed to fetch suggested questions' });
  }
};
