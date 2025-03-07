
import express from 'express';
import * as HealthAssistantController from '../controllers/healthAssistantController';

const router = express.Router();

// Initialize knowledge base (admin route)
router.post('/initialize', HealthAssistantController.initializeKnowledgeBase);

// Get a response from the Health Assistant
router.post('/chat', HealthAssistantController.getAssistantResponse);

// Get suggested questions
router.get('/suggested-questions', HealthAssistantController.getSuggestedQuestions);

export default router;
