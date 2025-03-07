
import express from 'express';
import * as contentController from '../controllers/contentController';

const router = express.Router();

// Get all content
router.get('/', contentController.getAllContent);

// Get content by ID
router.get('/:id', contentController.getContentById);

// Get content by category
router.get('/category/:category', contentController.getContentByCategory);

// Toggle bookmark status
router.put('/:id/bookmark', contentController.toggleBookmark);

// Update progress
router.put('/:id/progress', contentController.updateProgress);

export default router;
