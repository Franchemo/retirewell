
import UserAchievement, { IUserAchievement } from '../models/UserAchievement';
import { FilterQuery } from 'mongoose';

class UserAchievementRepository {
  async getByUserId(userId: string, populated: boolean = false): Promise<IUserAchievement[]> {
    const query = UserAchievement.find({ userId });
    
    if (populated) {
      query.populate('achievementId');
    }
    
    return query.exec();
  }

  async getByUserAndAchievement(userId: string, achievementId: string): Promise<IUserAchievement | null> {
    return UserAchievement.findOne({ userId, achievementId }).exec();
  }

  async getCompletedByUser(userId: string, populated: boolean = false): Promise<IUserAchievement[]> {
    const query = UserAchievement.find({ userId, isCompleted: true });
    
    if (populated) {
      query.populate('achievementId');
    }
    
    return query.sort({ completedAt: -1 }).exec();
  }

  async updateProgress(
    userId: string,
    achievementId: string,
    progress: number,
    metadata: Record<string, any> = {}
  ): Promise<IUserAchievement | null> {
    // First try to update existing record
    const existingRecord = await UserAchievement.findOneAndUpdate(
      { userId, achievementId, isCompleted: false },
      { 
        $set: { progress, 'metadata': { ...metadata } }
      },
      { new: true }
    ).exec();

    if (existingRecord) {
      return existingRecord;
    }

    // If no record exists, create a new one
    if (!existingRecord) {
      const newUserAchievement = new UserAchievement({
        userId,
        achievementId,
        progress,
        metadata
      });
      return newUserAchievement.save();
    }

    return null;
  }

  async completeAchievement(
    userId: string,
    achievementId: string,
    metadata: Record<string, any> = {}
  ): Promise<IUserAchievement | null> {
    const now = new Date();
    
    // First try to update existing record
    const existingRecord = await UserAchievement.findOneAndUpdate(
      { userId, achievementId },
      { 
        $set: { 
          progress: 100, 
          isCompleted: true, 
          completedAt: now,
          'metadata': { ...metadata }
        } 
      },
      { new: true, upsert: true }
    ).exec();

    return existingRecord;
  }

  async getRecentlyCompleted(userId: string, limit: number = 5): Promise<IUserAchievement[]> {
    return UserAchievement.find({ userId, isCompleted: true })
      .sort({ completedAt: -1 })
      .limit(limit)
      .populate('achievementId')
      .exec();
  }
}

export default new UserAchievementRepository();
