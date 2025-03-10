
import api, { handleApiError } from './api';
import { Achievement, UserAchievement } from '@/types/achievement';
import { useToast } from '@/hooks/use-toast';

const RESOURCE_URL = '/achievements';

// Function to fetch all achievements
export const fetchAchievements = async (): Promise<Achievement[]> => {
  try {
    const response = await api.get(RESOURCE_URL);
    
    // Transform the backend data to match our frontend model
    return response.data.map((achievement: any) => ({
      id: achievement._id,
      title: achievement.title,
      description: achievement.description,
      icon: achievement.icon,
      category: achievement.category,
      isHidden: achievement.isHidden,
      criteria: achievement.criteria,
      createdAt: achievement.createdAt,
      updatedAt: achievement.updatedAt
    }));
  } catch (error) {
    console.error('Error fetching achievements:', error);
    throw new Error(handleApiError(error));
  }
};

// Function to fetch achievements by category
export const fetchAchievementsByCategory = async (category: string): Promise<Achievement[]> => {
  try {
    const response = await api.get(`${RESOURCE_URL}/category/${category}`);
    
    return response.data.map((achievement: any) => ({
      id: achievement._id,
      title: achievement.title,
      description: achievement.description,
      icon: achievement.icon,
      category: achievement.category,
      isHidden: achievement.isHidden,
      criteria: achievement.criteria,
      createdAt: achievement.createdAt,
      updatedAt: achievement.updatedAt
    }));
  } catch (error) {
    console.error(`Error fetching achievements for category ${category}:`, error);
    throw new Error(handleApiError(error));
  }
};

// Function to fetch achievement categories
export const fetchAchievementCategories = async (): Promise<string[]> => {
  try {
    const response = await api.get(`${RESOURCE_URL}/categories`);
    return response.data;
  } catch (error) {
    console.error('Error fetching achievement categories:', error);
    throw new Error(handleApiError(error));
  }
};

// Function to fetch user's achievements
export const fetchUserAchievements = async (): Promise<UserAchievement[]> => {
  try {
    const response = await api.get(`${RESOURCE_URL}/user/all`);
    
    return response.data.map((userAchievement: any) => ({
      id: userAchievement._id || userAchievement.id,
      userId: userAchievement.userId,
      achievementId: userAchievement.achievementId,
      progress: userAchievement.progress,
      isCompleted: userAchievement.isCompleted,
      completedAt: userAchievement.completedAt,
      metadata: userAchievement.metadata,
      achievement: userAchievement.achievement ? {
        id: userAchievement.achievement._id,
        title: userAchievement.achievement.title,
        description: userAchievement.achievement.description,
        icon: userAchievement.achievement.icon,
        category: userAchievement.achievement.category,
        isHidden: userAchievement.achievement.isHidden,
        criteria: userAchievement.achievement.criteria,
        createdAt: userAchievement.achievement.createdAt,
        updatedAt: userAchievement.achievement.updatedAt
      } : undefined,
      createdAt: userAchievement.createdAt,
      updatedAt: userAchievement.updatedAt
    }));
  } catch (error) {
    console.error('Error fetching user achievements:', error);
    
    // Show toast notification
    const { toast } = useToast();
    toast({
      title: "Failed to load achievements",
      description: "Please try again later.",
      variant: "destructive"
    });
    
    return [];
  }
};

// Function to fetch user's completed achievements
export const fetchCompletedAchievements = async (): Promise<UserAchievement[]> => {
  try {
    const response = await api.get(`${RESOURCE_URL}/user/completed`);
    
    return response.data.map((userAchievement: any) => ({
      id: userAchievement._id,
      userId: userAchievement.userId,
      achievementId: userAchievement.achievementId,
      progress: userAchievement.progress,
      isCompleted: userAchievement.isCompleted,
      completedAt: userAchievement.completedAt,
      metadata: userAchievement.metadata,
      achievement: userAchievement.achievement ? {
        id: userAchievement.achievement._id,
        title: userAchievement.achievement.title,
        description: userAchievement.achievement.description,
        icon: userAchievement.achievement.icon,
        category: userAchievement.achievement.category,
        isHidden: userAchievement.achievement.isHidden,
        criteria: userAchievement.achievement.criteria,
        createdAt: userAchievement.achievement.createdAt,
        updatedAt: userAchievement.achievement.updatedAt
      } : undefined,
      createdAt: userAchievement.createdAt,
      updatedAt: userAchievement.updatedAt
    }));
  } catch (error) {
    console.error('Error fetching completed achievements:', error);
    throw new Error(handleApiError(error));
  }
};

// Function to fetch recently completed achievements
export const fetchRecentAchievements = async (limit: number = 5): Promise<UserAchievement[]> => {
  try {
    const response = await api.get(`${RESOURCE_URL}/user/recent?limit=${limit}`);
    
    return response.data.map((userAchievement: any) => ({
      id: userAchievement._id,
      userId: userAchievement.userId,
      achievementId: userAchievement.achievementId,
      progress: userAchievement.progress,
      isCompleted: userAchievement.isCompleted,
      completedAt: userAchievement.completedAt,
      metadata: userAchievement.metadata,
      achievement: userAchievement.achievement ? {
        id: userAchievement.achievement._id,
        title: userAchievement.achievement.title,
        description: userAchievement.achievement.description,
        icon: userAchievement.achievement.icon,
        category: userAchievement.achievement.category,
        isHidden: userAchievement.achievement.isHidden,
        criteria: userAchievement.achievement.criteria,
        createdAt: userAchievement.achievement.createdAt,
        updatedAt: userAchievement.achievement.updatedAt
      } : undefined,
      createdAt: userAchievement.createdAt,
      updatedAt: userAchievement.updatedAt
    }));
  } catch (error) {
    console.error('Error fetching recent achievements:', error);
    
    // Return empty array instead of throwing
    return [];
  }
};
