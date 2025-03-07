
import api from './api';

const RESOURCE_URL = '/wellness';

export interface BreathingSession {
  duration: number; // in seconds
  completedBreaths: number;
}

export interface MoodEntry {
  mood: string;
  timestamp: string;
}

export interface BreathingStats {
  totalSessions: number;
  totalMinutes: number;
  totalBreaths: number;
}

// Record a mood entry
export const recordMood = async (mood: string): Promise<boolean> => {
  try {
    await api.post(`${RESOURCE_URL}/mood`, { mood });
    return true;
  } catch (error) {
    console.error('Error recording mood:', error);
    return false;
  }
};

// Record a breathing session
export const recordBreathingSession = async (
  duration: number,
  completedBreaths: number
): Promise<boolean> => {
  try {
    await api.post(`${RESOURCE_URL}/breathing-session`, {
      duration,
      completedBreaths
    });
    return true;
  } catch (error) {
    console.error('Error recording breathing session:', error);
    return false;
  }
};

// Get recent mood entries
export const getRecentMoods = async (limit: number = 5): Promise<MoodEntry[]> => {
  try {
    const response = await api.get(`${RESOURCE_URL}/moods/recent?limit=${limit}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching recent moods:', error);
    return [];
  }
};

// Get breathing statistics
export const getBreathingStats = async (): Promise<BreathingStats> => {
  try {
    const response = await api.get(`${RESOURCE_URL}/breathing/stats`);
    return response.data;
  } catch (error) {
    console.error('Error fetching breathing stats:', error);
    return {
      totalSessions: 0,
      totalMinutes: 0,
      totalBreaths: 0
    };
  }
};
