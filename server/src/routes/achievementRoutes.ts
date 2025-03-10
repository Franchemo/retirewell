
import express from 'express';
import AchievementController from '../controllers/AchievementController';
import UserAchievementController from '../controllers/UserAchievementController';
import authMiddleware from '../middleware/authMiddleware';

const router = express.Router();

// Achievement routes
router.get('/', authMiddleware.authenticate, AchievementController.getAllAchievements);
router.get('/categories', authMiddleware.authenticate, AchievementController.getCategories);
router.get('/category/:category', authMiddleware.authenticate, AchievementController.getAchievementsByCategory);
router.get('/:id', authMiddleware.authenticate, AchievementController.getAchievementById);

// Admin routes for achievement management
router.post('/', authMiddleware.authenticate, AchievementController.createAchievement);
router.put('/:id', authMiddleware.authenticate, AchievementController.updateAchievement);
router.delete('/:id', authMiddleware.authenticate, AchievementController.deleteAchievement);

// User achievement routes
router.get('/user/all', authMiddleware.authenticate, UserAchievementController.getUserAchievements);
router.get('/user/completed', authMiddleware.authenticate, UserAchievementController.getCompletedAchievements);
router.get('/user/recent', authMiddleware.authenticate, UserAchievementController.getRecentlyCompleted);

export default router;
