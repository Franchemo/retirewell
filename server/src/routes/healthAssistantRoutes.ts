
import express from 'express';
import * as healthAssistantController from '../controllers/healthAssistantController';

const router = express.Router();

// Route for chatting with the health assistant
router.post('/chat', healthAssistantController.chatWithAssistant);

// Route for getting suggested questions
router.get('/suggested-questions', healthAssistantController.getSuggestedQuestions);

export default router;
