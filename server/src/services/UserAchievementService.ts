
import UserAchievementRepository from '../repositories/UserAchievementRepository';
import AchievementRepository from '../repositories/AchievementRepository';
import ReflectionRepository from '../repositories/ReflectionRepository';
import { IUserAchievement } from '../models/UserAchievement';
import { IAchievement } from '../models/Achievement';
import { IReflection } from '../models/Reflection';
import { differenceInDays, isAfter, subDays } from 'date-fns';

class UserAchievementService {
  // Get user's achievements with progress
  async getUserAchievements(userId: string): Promise<Array<IUserAchievement & { achievement?: IAchievement }>> {
    // Get all achievements
    const allAchievements = await AchievementRepository.getAll({ isHidden: false });
    // Get user's achievement records
    const userAchievements = await UserAchievementRepository.getByUserId(userId);
    
    // Map achievements to include progress
    const achievementsWithProgress = allAchievements.map(achievement => {
      const userAchievement = userAchievements.find(ua => 
        ua.achievementId.toString() === achievement._id.toString()
      );
      
      if (userAchievement) {
        return {
          ...userAchievement.toObject(),
          achievement: achievement.toObject()
        };
      } else {
        // Create a default entry for achievements the user hasn't started
        return {
          userId,
          achievementId: achievement._id,
          progress: 0,
          isCompleted: false,
          metadata: {},
          achievement: achievement.toObject()
        } as any;
      }
    });
    
    return achievementsWithProgress;
  }

  // Get completed achievements for a user
  async getCompletedAchievements(userId: string): Promise<Array<IUserAchievement & { achievement: IAchievement }>> {
    const completedAchievements = await UserAchievementRepository.getCompletedByUser(userId, true);
    return completedAchievements.map(ua => {
      return {
        ...ua.toObject(),
        achievement: ua.populated('achievementId') ? ua.achievementId as unknown as IAchievement : undefined
      } as any;
    });
  }

  // Get recently completed achievements
  async getRecentlyCompletedAchievements(userId: string, limit: number = 5): Promise<Array<IUserAchievement & { achievement: IAchievement }>> {
    const recentAchievements = await UserAchievementRepository.getRecentlyCompleted(userId, limit);
    return recentAchievements.map(ua => {
      return {
        ...ua.toObject(),
        achievement: ua.populated('achievementId') ? ua.achievementId as unknown as IAchievement : undefined
      } as any;
    });
  }

  // Process user activity to check and update achievements
  async processUserActivity(userId: string, activityType: string, data: any): Promise<IUserAchievement[]> {
    const updatedAchievements: IUserAchievement[] = [];
    
    // Get all achievements that might be affected by this activity
    const relevantAchievements = await AchievementRepository.getAll({
      'criteria.target': activityType
    });
    
    // Process each achievement based on its criteria type
    for (const achievement of relevantAchievements) {
      let userAchievement;
      
      switch (achievement.criteria.type) {
        case 'streak':
          userAchievement = await this.processStreakAchievement(userId, achievement, data);
          break;
        case 'count':
          userAchievement = await this.processCountAchievement(userId, achievement, data);
          break;
        case 'milestone':
          userAchievement = await this.processMilestoneAchievement(userId, achievement, data);
          break;
        case 'combo':
          userAchievement = await this.processComboAchievement(userId, achievement, data);
          break;
      }
      
      if (userAchievement) {
        updatedAchievements.push(userAchievement);
      }
    }
    
    return updatedAchievements;
  }

  // Process reflection-related activities
  async processReflectionActivity(userId: string, reflection: IReflection): Promise<IUserAchievement[]> {
    // First update reflection count achievements
    const countResults = await this.processUserActivity(userId, 'reflection_created', { reflection });
    
    // Then check for streak-related achievements
    const reflections = await ReflectionRepository.getByUserId(userId);
    
    // Sort by date
    reflections.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
    
    // Calculate current streak
    const streakData = this.calculateReflectionStreak(reflections);
    
    // Process streak achievements
    const streakResults = await this.processUserActivity(userId, 'reflection_streak', streakData);
    
    return [...countResults, ...streakResults];
  }

  // Calculate the current streak from reflections
  private calculateReflectionStreak(reflections: IReflection[]): { currentStreak: number, longestStreak: number } {
    if (reflections.length === 0) {
      return { currentStreak: 0, longestStreak: 0 };
    }
    
    // Get unique dates (in case of multiple reflections per day)
    const uniqueDates = [...new Set(reflections.map(r => 
      new Date(r.date).toISOString().split('T')[0]
    ))].map(d => new Date(d));
    
    // Sort dates
    uniqueDates.sort((a, b) => a.getTime() - b.getTime());
    
    let currentStreak = 1;
    let longestStreak = 1;
    let streaks = [];
    
    for (let i = 1; i < uniqueDates.length; i++) {
      const prevDate = uniqueDates[i - 1];
      const currDate = uniqueDates[i];
      const daysBetween = differenceInDays(currDate, prevDate);
      
      if (daysBetween === 1) {
        // Continue streak
        currentStreak++;
        longestStreak = Math.max(longestStreak, currentStreak);
      } else if (daysBetween > 1) {
        // Break in streak
        streaks.push(currentStreak);
        currentStreak = 1;
      }
    }
    
    // Check if current streak is still active (within last day)
    const lastReflectionDate = uniqueDates[uniqueDates.length - 1];
    const today = new Date();
    const yesterday = subDays(today, 1);
    
    if (differenceInDays(today, lastReflectionDate) > 1) {
      // Streak is broken if last reflection was before yesterday
      currentStreak = 0;
    }
    
    return { currentStreak, longestStreak };
  }

  // Rules engine methods
  private async processStreakAchievement(userId: string, achievement: IAchievement, data: any): Promise<IUserAchievement | null> {
    const { currentStreak, longestStreak } = data;
    const threshold = achievement.criteria.threshold;
    const userAchievement = await UserAchievementRepository.getByUserAndAchievement(userId, achievement._id);
    
    // If already completed, do nothing
    if (userAchievement?.isCompleted) {
      return userAchievement;
    }
    
    // Calculate progress
    const progress = Math.min(100, Math.floor((currentStreak / threshold) * 100));
    
    // Check if threshold is reached
    if (currentStreak >= threshold) {
      return UserAchievementRepository.completeAchievement(userId, achievement._id, { 
        streak: currentStreak, 
        longestStreak 
      });
    } else {
      return UserAchievementRepository.updateProgress(userId, achievement._id, progress, { 
        streak: currentStreak,
        longestStreak
      });
    }
  }

  private async processCountAchievement(userId: string, achievement: IAchievement, data: any): Promise<IUserAchievement | null> {
    const userAchievement = await UserAchievementRepository.getByUserAndAchievement(userId, achievement._id);
    
    // If already completed, do nothing
    if (userAchievement?.isCompleted) {
      return userAchievement;
    }
    
    // Get current count from metadata or start at 1
    const currentCount = (userAchievement?.metadata?.count || 0) + 1;
    const threshold = achievement.criteria.threshold;
    
    // Calculate progress
    const progress = Math.min(100, Math.floor((currentCount / threshold) * 100));
    
    // Check if threshold is reached
    if (currentCount >= threshold) {
      return UserAchievementRepository.completeAchievement(userId, achievement._id, { count: currentCount });
    } else {
      return UserAchievementRepository.updateProgress(userId, achievement._id, progress, { count: currentCount });
    }
  }

  private async processMilestoneAchievement(userId: string, achievement: IAchievement, data: any): Promise<IUserAchievement | null> {
    const userAchievement = await UserAchievementRepository.getByUserAndAchievement(userId, achievement._id);
    
    // If already completed, do nothing
    if (userAchievement?.isCompleted) {
      return userAchievement;
    }
    
    // Handle different milestone types based on the target
    const target = achievement.criteria.target;
    const threshold = achievement.criteria.threshold;
    
    let currentValue = 0;
    let isCompleted = false;
    
    if (target === 'reflection_count') {
      // Count total reflections
      const reflections = await ReflectionRepository.getByUserId(userId);
      currentValue = reflections.length;
      isCompleted = currentValue >= threshold;
    } else if (target === 'reflection_streak') {
      // Check if longest streak meets threshold
      currentValue = data.longestStreak || 0;
      isCompleted = currentValue >= threshold;
    }
    // Add more milestone types as needed
    
    // Calculate progress
    const progress = Math.min(100, Math.floor((currentValue / threshold) * 100));
    
    if (isCompleted) {
      return UserAchievementRepository.completeAchievement(userId, achievement._id, { value: currentValue });
    } else {
      return UserAchievementRepository.updateProgress(userId, achievement._id, progress, { value: currentValue });
    }
  }

  private async processComboAchievement(userId: string, achievement: IAchievement, data: any): Promise<IUserAchievement | null> {
    // Combo achievements would require checking multiple criteria
    // For simplicity, we'll just return null for now
    // In a real app, this would implement complex combo logic
    return null;
  }
}

export default new UserAchievementService();
