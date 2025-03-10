
import AchievementRepository from '../repositories/AchievementRepository';
import { IAchievement } from '../models/Achievement';

class AchievementService {
  // Get all available achievements, hiding the ones marked as hidden
  async getAllAchievements(includeHidden: boolean = false): Promise<IAchievement[]> {
    const filter = includeHidden ? {} : { isHidden: false };
    return AchievementRepository.getAll(filter);
  }

  // Get detailed achievement info
  async getAchievementDetails(id: string): Promise<IAchievement | null> {
    return AchievementRepository.getById(id);
  }

  // Get achievements by category
  async getAchievementsByCategory(category: string, includeHidden: boolean = false): Promise<IAchievement[]> {
    return AchievementRepository.getByCategory(category, includeHidden);
  }

  // Admin methods for managing achievements
  async createAchievement(achievementData: Partial<IAchievement>): Promise<IAchievement> {
    return AchievementRepository.create(achievementData);
  }

  async updateAchievement(id: string, achievementData: Partial<IAchievement>): Promise<IAchievement | null> {
    return AchievementRepository.update(id, achievementData);
  }

  async deleteAchievement(id: string): Promise<IAchievement | null> {
    return AchievementRepository.delete(id);
  }

  // Get all available categories (distinct values)
  async getCategories(): Promise<string[]> {
    const achievements = await AchievementRepository.getAll();
    const categories = new Set(achievements.map(a => a.category));
    return Array.from(categories);
  }
}

export default new AchievementService();
