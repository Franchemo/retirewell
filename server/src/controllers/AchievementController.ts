
import { Request, Response, NextFunction } from 'express';
import AchievementService from '../services/AchievementService';
import UserAchievementService from '../services/UserAchievementService';
import logger from '../config/logger';

class AchievementController {
  // Get all achievements
  async getAllAchievements(req: Request, res: Response, next: NextFunction) {
    try {
      const isAdmin = req.user?.role === 'admin';
      const includeHidden = isAdmin && req.query.includeHidden === 'true';
      
      const achievements = await AchievementService.getAllAchievements(includeHidden);
      
      return res.status(200).json(achievements);
    } catch (error) {
      logger.error('Error in getAllAchievements controller:', error);
      next(error);
    }
  }
  
  // Get achievement by ID
  async getAchievementById(req: Request, res: Response, next: NextFunction) {
    try {
      const achievementId = req.params.id;
      const achievement = await AchievementService.getAchievementDetails(achievementId);
      
      if (!achievement) {
        return res.status(404).json({ message: 'Achievement not found' });
      }
      
      // Only admins can see hidden achievements directly
      if (achievement.isHidden && req.user?.role !== 'admin') {
        return res.status(403).json({ message: 'Unauthorized to view this achievement' });
      }
      
      return res.status(200).json(achievement);
    } catch (error) {
      logger.error('Error in getAchievementById controller:', error);
      next(error);
    }
  }
  
  // Get achievement categories
  async getCategories(req: Request, res: Response, next: NextFunction) {
    try {
      const categories = await AchievementService.getCategories();
      return res.status(200).json(categories);
    } catch (error) {
      logger.error('Error in getCategories controller:', error);
      next(error);
    }
  }
  
  // Create new achievement (admin only)
  async createAchievement(req: Request, res: Response, next: NextFunction) {
    try {
      // Only admins can create achievements
      if (req.user?.role !== 'admin') {
        return res.status(403).json({ message: 'Unauthorized' });
      }
      
      const achievementData = req.body;
      const newAchievement = await AchievementService.createAchievement(achievementData);
      
      return res.status(201).json(newAchievement);
    } catch (error) {
      logger.error('Error in createAchievement controller:', error);
      next(error);
    }
  }
  
  // Update achievement (admin only)
  async updateAchievement(req: Request, res: Response, next: NextFunction) {
    try {
      // Only admins can update achievements
      if (req.user?.role !== 'admin') {
        return res.status(403).json({ message: 'Unauthorized' });
      }
      
      const achievementId = req.params.id;
      const achievementData = req.body;
      
      const updatedAchievement = await AchievementService.updateAchievement(achievementId, achievementData);
      
      if (!updatedAchievement) {
        return res.status(404).json({ message: 'Achievement not found' });
      }
      
      return res.status(200).json(updatedAchievement);
    } catch (error) {
      logger.error('Error in updateAchievement controller:', error);
      next(error);
    }
  }
  
  // Delete achievement (admin only)
  async deleteAchievement(req: Request, res: Response, next: NextFunction) {
    try {
      // Only admins can delete achievements
      if (req.user?.role !== 'admin') {
        return res.status(403).json({ message: 'Unauthorized' });
      }
      
      const achievementId = req.params.id;
      const deletedAchievement = await AchievementService.deleteAchievement(achievementId);
      
      if (!deletedAchievement) {
        return res.status(404).json({ message: 'Achievement not found' });
      }
      
      return res.status(200).json({ message: 'Achievement deleted successfully' });
    } catch (error) {
      logger.error('Error in deleteAchievement controller:', error);
      next(error);
    }
  }
  
  // Get achievements by category
  async getAchievementsByCategory(req: Request, res: Response, next: NextFunction) {
    try {
      const category = req.params.category;
      const isAdmin = req.user?.role === 'admin';
      const includeHidden = isAdmin && req.query.includeHidden === 'true';
      
      const achievements = await AchievementService.getAchievementsByCategory(category, includeHidden);
      
      return res.status(200).json(achievements);
    } catch (error) {
      logger.error('Error in getAchievementsByCategory controller:', error);
      next(error);
    }
  }
}

export default new AchievementController();
