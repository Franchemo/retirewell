
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

export interface SleepData {
  date: string;
  hoursSlept: number;
  quality: number; // 1-10 scale
}

export interface MeditationSession {
  date: string;
  duration: number; // in minutes
  type: string; // guided, unguided, etc.
}

export interface WellnessStats {
  breathingStats: BreathingStats;
  averageSleepHours: number;
  totalMeditationMinutes: number;
  moodTrend: string;
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

// Record sleep data
export const recordSleepData = async (hoursSlept: number, quality: number): Promise<boolean> => {
  try {
    await api.post(`${RESOURCE_URL}/sleep`, {
      hoursSlept,
      quality,
      date: new Date().toISOString().split('T')[0] // YYYY-MM-DD format
    });
    return true;
  } catch (error) {
    console.error('Error recording sleep data:', error);
    return false;
  }
};

// Get sleep history
export const getSleepHistory = async (days: number = 7): Promise<SleepData[]> => {
  try {
    const response = await api.get(`${RESOURCE_URL}/sleep/history?days=${days}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching sleep history:', error);
    return [];
  }
};

// Record meditation session
export const recordMeditationSession = async (
  duration: number,
  type: string
): Promise<boolean> => {
  try {
    await api.post(`${RESOURCE_URL}/meditation`, {
      duration,
      type,
      date: new Date().toISOString()
    });
    return true;
  } catch (error) {
    console.error('Error recording meditation session:', error);
    return false;
  }
};

// Get meditation history
export const getMeditationHistory = async (limit: number = 10): Promise<MeditationSession[]> => {
  try {
    const response = await api.get(`${RESOURCE_URL}/meditation/history?limit=${limit}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching meditation history:', error);
    return [];
  }
};

// Get overall wellness stats
export const getWellnessStats = async (): Promise<WellnessStats> => {
  try {
    const response = await api.get(`${RESOURCE_URL}/stats`);
    return response.data;
  } catch (error) {
    console.error('Error fetching wellness stats:', error);
    return {
      breathingStats: {
        totalSessions: 0,
        totalMinutes: 0,
        totalBreaths: 0
      },
      averageSleepHours: 0,
      totalMeditationMinutes: 0,
      moodTrend: 'neutral'
    };
  }
};
