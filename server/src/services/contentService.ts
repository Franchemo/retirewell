
import Content, { IContent } from '../models/Content';

export const getAllContent = async (): Promise<IContent[]> => {
  try {
    return await Content.find().sort({ createdAt: -1 });
  } catch (error) {
    throw new Error(`Error fetching content: ${error}`);
  }
};

export const getContentById = async (id: string): Promise<IContent | null> => {
  try {
    return await Content.findOne({ id });
  } catch (error) {
    throw new Error(`Error fetching content by ID: ${error}`);
  }
};

export const getContentByCategory = async (category: string): Promise<IContent[]> => {
  try {
    if (category.toLowerCase() === 'all') {
      return await Content.find().sort({ createdAt: -1 });
    }
    return await Content.find({ 
      type: category.toLowerCase() 
    }).sort({ createdAt: -1 });
  } catch (error) {
    throw new Error(`Error fetching content by category: ${error}`);
  }
};

export const toggleBookmark = async (id: string): Promise<IContent | null> => {
  try {
    const content = await Content.findOne({ id });
    if (!content) return null;
    
    content.isBookmarked = !content.isBookmarked;
    return await content.save();
  } catch (error) {
    throw new Error(`Error toggling bookmark: ${error}`);
  }
};

export const updateProgress = async (id: string, progress: number): Promise<IContent | null> => {
  try {
    const content = await Content.findOne({ id });
    if (!content) return null;
    
    content.progress = progress;
    return await content.save();
  } catch (error) {
    throw new Error(`Error updating progress: ${error}`);
  }
};

// Function to seed initial content if none exists
export const seedInitialContent = async (): Promise<void> => {
  try {
    const count = await Content.countDocuments();
    if (count === 0) {
      const initialContent = [
        {
          id: "1",
          title: "Understanding Anxiety",
          description: "Learn about the root causes of anxiety and effective coping mechanisms.",
          type: "article",
          duration: "10 min read",
          difficulty: "Beginner",
          progress: 0,
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
          isBookmarked: false
        },
        {
          id: "3",
          title: "Cognitive Behavioral Exercises",
          description: "Interactive exercises to challenge negative thought patterns.",
          type: "exercise",
          duration: "20 min",
          difficulty: "Intermediate",
          progress: 0,
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
      
      await Content.insertMany(initialContent);
      console.log('Initial content seeded successfully');
    }
  } catch (error) {
    console.error('Error seeding initial content:', error);
  }
};
