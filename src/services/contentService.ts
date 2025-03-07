
import api from './api';
import { ContentItem } from '@/components/content/ContentCard';
import { v4 as uuidv4 } from 'uuid';

const RESOURCE_URL = '/content';

// Function to get all content
export const fetchContent = async (): Promise<ContentItem[]> => {
  try {
    const response = await api.get(RESOURCE_URL);
    return response.data;
  } catch (error) {
    console.error('Error fetching content:', error);
    
    // Fallback data for when API is unavailable
    return [
      {
        id: "1",
        title: "Understanding Anxiety",
        description: "Learn about the root causes of anxiety and effective coping mechanisms.",
        type: "article",
        duration: "10 min read",
        difficulty: "Beginner",
        progress: 75,
        isBookmarked: false
      },
      {
        id: "2",
        title: "Guided Meditation",
        description: "A calming meditation session for stress relief.",
        type: "audio",
        duration: "15 min",
        difficulty: "Beginner",
        progress: 0,
        isBookmarked: true
      },
      {
        id: "3",
        title: "Cognitive Behavioral Exercises",
        description: "Interactive exercises to challenge negative thought patterns.",
        type: "exercise",
        duration: "20 min",
        difficulty: "Intermediate",
        progress: 30,
        isBookmarked: false
      },
      {
        id: "4",
        title: "Stress Management Techniques",
        description: "Video demonstration of effective stress management techniques.",
        type: "video",
        duration: "12 min",
        difficulty: "Beginner",
        progress: 0,
        isBookmarked: false
      }
    ];
  }
};

// Function to get content by category
export const fetchContentByCategory = async (category: string): Promise<ContentItem[]> => {
  try {
    const response = await api.get(`${RESOURCE_URL}/category/${category}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching content for category ${category}:`, error);
    
    // Fall back to fetching all content and filtering client-side
    const allContent = await fetchContent();
    if (category.toLowerCase() === 'all') {
      return allContent;
    }
    return allContent.filter(item => item.type.toLowerCase() === category.toLowerCase());
  }
};

// Function to toggle bookmark status
export const toggleBookmark = async (id: string): Promise<ContentItem | null> => {
  try {
    const response = await api.put(`${RESOURCE_URL}/${id}/bookmark`);
    return response.data;
  } catch (error) {
    console.error(`Error toggling bookmark for content ${id}:`, error);
    return null;
  }
};

// Function to update progress
export const updateProgress = async (id: string, progress: number): Promise<ContentItem | null> => {
  try {
    const response = await api.put(`${RESOURCE_URL}/${id}/progress`, { progress });
    return response.data;
  } catch (error) {
    console.error(`Error updating progress for content ${id}:`, error);
    return null;
  }
};
