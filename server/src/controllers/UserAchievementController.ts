
import { Request, Response, NextFunction } from 'express';
import UserAchievementService from '../services/UserAchievementService';
import logger from '../config/logger';

class UserAchievementController {
  // Get user's achievements
  async getUserAchievements(req: Request, res: Response, next: NextFunction) {
    try {
      const userId = req.user?._id;
      
      if (!userId) {
        return res.status(401).json({ message: 'Unauthorized' });
      }
      
      const achievements = await UserAchievementService.getUserAchievements(userId);
      
      return res.status(200).json(achievements);
    } catch (error) {
      logger.error('Error in getUserAchievements controller:', error);
      next(error);
    }
  }
  
  // Get user's completed achievements
  async getCompletedAchievements(req: Request, res: Response, next: NextFunction) {
    try {
      const userId = req.user?._id;
      
      if (!userId) {
        return res.status(401).json({ message: 'Unauthorized' });
      }
      
      const completedAchievements = await UserAchievementService.getCompletedAchievements(userId);
      
      return res.status(200).json(completedAchievements);
    } catch (error) {
      logger.error('Error in getCompletedAchievements controller:', error);
      next(error);
    }
  }
  
  // Get recently completed achievements
  async getRecentlyCompleted(req: Request, res: Response, next: NextFunction) {
    try {
      const userId = req.user?._id;
      
      if (!userId) {
        return res.status(401).json({ message: 'Unauthorized' });
      }
      
      const limit = req.query.limit ? parseInt(req.query.limit as string) : 5;
      
      const recentAchievements = await UserAchievementService.getRecentlyCompletedAchievements(userId, limit);
      
      return res.status(200).json(recentAchievements);
    } catch (error) {
      logger.error('Error in getRecentlyCompleted controller:', error);
      next(error);
    }
  }
}

export default new UserAchievementController();
