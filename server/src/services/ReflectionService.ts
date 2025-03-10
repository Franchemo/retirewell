
import ReflectionRepository from '../repositories/ReflectionRepository';
import UserAchievementService from '../services/UserAchievementService';
import { IReflection } from '../models/Reflection';
import { startOfDay, endOfDay, startOfWeek, endOfWeek, startOfMonth, endOfMonth, subDays } from 'date-fns';

class ReflectionService {
  async createReflection(userId: string, reflectionData: Partial<IReflection>): Promise<IReflection> {
    // Create the reflection
    const reflection = await ReflectionRepository.create({
      ...reflectionData,
      userId
    });

    // Process achievements related to this new reflection
    try {
      await UserAchievementService.processReflectionActivity(userId, reflection);
    } catch (error) {
      console.error('Error processing achievements:', error);
      // Don't fail the reflection creation if achievement processing fails
    }

    return reflection;
  }

  async getReflectionById(id: string): Promise<IReflection | null> {
    return ReflectionRepository.getById(id);
  }

  async updateReflection(id: string, userId: string, reflectionData: Partial<IReflection>): Promise<IReflection | null> {
    // Ensure user owns this reflection
    const existing = await ReflectionRepository.getById(id);
    if (!existing || existing.userId.toString() !== userId) {
      return null;
    }

    return ReflectionRepository.update(id, reflectionData);
  }

  async deleteReflection(id: string, userId: string): Promise<boolean> {
    // Ensure user owns this reflection
    const existing = await ReflectionRepository.getById(id);
    if (!existing || existing.userId.toString() !== userId) {
      return false;
    }

    const result = await ReflectionRepository.delete(id);
    return !!result;
  }

  async getReflections(userId: string, filters: any = {}): Promise<IReflection[]> {
    // Create date range filters if provided
    let dateFilters = {};
    
    if (filters.date) {
      const date = new Date(filters.date);
      dateFilters = {
        date: {
          $gte: startOfDay(date),
          $lte: endOfDay(date)
        }
      };
    } else if (filters.startDate && filters.endDate) {
      dateFilters = {
        date: {
          $gte: new Date(filters.startDate),
          $lte: new Date(filters.endDate)
        }
      };
    } else if (filters.period) {
      const now = new Date();
      switch (filters.period) {
        case 'week':
          dateFilters = {
            date: {
              $gte: startOfWeek(now),
              $lte: endOfWeek(now)
            }
          };
          break;
        case 'month':
          dateFilters = {
            date: {
              $gte: startOfMonth(now),
              $lte: endOfMonth(now)
            }
          };
          break;
        case 'day':
          dateFilters = {
            date: {
              $gte: startOfDay(now),
              $lte: endOfDay(now)
            }
          };
          break;
      }
    }
    
    // Add mood filter if provided
    const moodFilter = filters.mood ? { mood: filters.mood } : {};
    
    // Combine all filters
    const combinedFilters = {
      userId,
      ...dateFilters,
      ...moodFilter
    };
    
    return ReflectionRepository.getFiltered(combinedFilters);
  }

  async getReflectionStreaks(userId: string): Promise<any> {
    const reflections = await ReflectionRepository.getByUserId(userId);
    
    // Sort by date
    reflections.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
    
    // Get unique dates (in case of multiple reflections per day)
    const uniqueDates = [...new Set(reflections.map(r => 
      new Date(r.date).toISOString().split('T')[0]
    ))].map(d => new Date(d));
    
    // Calculate streaks
    const streaks: any[] = [];
    let currentStreak: any = null;
    
    for (let i = 0; i < uniqueDates.length; i++) {
      const currentDate = uniqueDates[i];
      
      if (i === 0) {
        // Start first streak
        currentStreak = {
          start: currentDate.toISOString(),
          end: currentDate.toISOString(),
          length: 1
        };
      } else {
        const prevDate = uniqueDates[i - 1];
        const daysBetween = Math.round((currentDate.getTime() - prevDate.getTime()) / (1000 * 60 * 60 * 24));
        
        if (daysBetween === 1) {
          // Continue streak
          currentStreak.end = currentDate.toISOString();
          currentStreak.length++;
        } else {
          // End previous streak and start a new one
          streaks.push({ ...currentStreak });
          currentStreak = {
            start: currentDate.toISOString(),
            end: currentDate.toISOString(),
            length: 1
          };
        }
      }
    }
    
    // Add the last streak if it exists
    if (currentStreak) {
      streaks.push({ ...currentStreak });
    }
    
    // Calculate current and longest streaks
    const today = new Date();
    const yesterday = subDays(today, 1);
    
    let isCurrentActive = false;
    if (uniqueDates.length > 0) {
      const lastDate = new Date(uniqueDates[uniqueDates.length - 1]);
      const lastDay = new Date(lastDate.toISOString().split('T')[0]);
      
      // Streak is current if last reflection was today or yesterday
      isCurrentActive = (
        lastDay.toISOString().split('T')[0] === today.toISOString().split('T')[0] ||
        lastDay.toISOString().split('T')[0] === yesterday.toISOString().split('T')[0]
      );
    }
    
    const currentStreak = isCurrentActive && streaks.length > 0 
      ? streaks[streaks.length - 1].length 
      : 0;
    
    const longestStreak = streaks.reduce((max, streak) => 
      Math.max(max, streak.length), 0);
    
    return {
      currentStreak,
      longestStreak,
      streaks
    };
  }

  async getMoodStatistics(userId: string, period?: string): Promise<any[]> {
    // Create date filter based on period
    let dateFilter = {};
    
    if (period) {
      const now = new Date();
      let startDate;
      
      switch (period) {
        case 'week':
          startDate = subDays(now, 7);
          break;
        case 'month':
          startDate = subDays(now, 30);
          break;
        case 'year':
          startDate = subDays(now, 365);
          break;
        default:
          startDate = subDays(now, 30); // Default to month
      }
      
      dateFilter = {
        date: {
          $gte: startDate,
          $lte: now
        }
      };
    }
    
    // Get reflections with filter
    const reflections = await ReflectionRepository.getFiltered({
      userId,
      ...dateFilter
    });
    
    // Count occurrences of each mood
    const moodCounts: Record<string, number> = {};
    
    reflections.forEach(reflection => {
      const mood = reflection.mood;
      moodCounts[mood] = (moodCounts[mood] || 0) + 1;
    });
    
    // Convert to array for response
    return Object.entries(moodCounts).map(([mood, count]) => ({
      mood,
      count
    })).sort((a, b) => b.count - a.count);
  }
}

export default new ReflectionService();
