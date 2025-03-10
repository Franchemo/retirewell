
export interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: string;
  category: 'Consistency' | 'Mindfulness' | 'Exercise' | 'Reflection' | 'Social' | 'General';
  isHidden: boolean;
  criteria: {
    type: 'streak' | 'count' | 'milestone' | 'combo';
    threshold: number;
    target?: string;
    frequency?: 'daily' | 'weekly' | 'monthly';
    duration?: number;
  };
  createdAt: string;
  updatedAt: string;
}

export interface UserAchievement {
  id: string;
  userId: string;
  achievementId: string;
  progress: number;
  isCompleted: boolean;
  completedAt?: string;
  metadata: Record<string, any>;
  achievement?: Achievement;
  createdAt: string;
  updatedAt: string;
}
