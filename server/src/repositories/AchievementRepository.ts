
import Achievement, { IAchievement } from '../models/Achievement';
import { FilterQuery } from 'mongoose';

class AchievementRepository {
  async getAll(filter: FilterQuery<IAchievement> = {}): Promise<IAchievement[]> {
    return Achievement.find(filter).sort({ category: 1, title: 1 }).exec();
  }

  async getById(id: string): Promise<IAchievement | null> {
    return Achievement.findById(id).exec();
  }

  async getByCategory(category: string, includeHidden: boolean = false): Promise<IAchievement[]> {
    const query: FilterQuery<IAchievement> = { category };
    
    if (!includeHidden) {
      query.isHidden = false;
    }
    
    return Achievement.find(query).sort({ title: 1 }).exec();
  }

  async create(achievementData: Partial<IAchievement>): Promise<IAchievement> {
    const achievement = new Achievement(achievementData);
    return achievement.save();
  }

  async update(id: string, achievementData: Partial<IAchievement>): Promise<IAchievement | null> {
    return Achievement.findByIdAndUpdate(
      id,
      achievementData,
      { new: true, runValidators: true }
    ).exec();
  }

  async delete(id: string): Promise<IAchievement | null> {
    return Achievement.findByIdAndDelete(id).exec();
  }
}

export default new AchievementRepository();
