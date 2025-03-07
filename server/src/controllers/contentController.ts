
import { Request, Response } from 'express';
import * as contentService from '../services/contentService';

export const getAllContent = async (req: Request, res: Response): Promise<void> => {
  try {
    const content = await contentService.getAllContent();
    res.status(200).json(content);
  } catch (error) {
    console.error('Error in getAllContent controller:', error);
    res.status(500).json({ message: 'Error fetching content' });
  }
};

export const getContentById = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const content = await contentService.getContentById(id);
    
    if (!content) {
      res.status(404).json({ message: 'Content not found' });
      return;
    }
    
    res.status(200).json(content);
  } catch (error) {
    console.error('Error in getContentById controller:', error);
    res.status(500).json({ message: 'Error fetching content' });
  }
};

export const getContentByCategory = async (req: Request, res: Response): Promise<void> => {
  try {
    const { category } = req.params;
    const content = await contentService.getContentByCategory(category);
    res.status(200).json(content);
  } catch (error) {
    console.error('Error in getContentByCategory controller:', error);
    res.status(500).json({ message: 'Error fetching content by category' });
  }
};

export const toggleBookmark = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const updatedContent = await contentService.toggleBookmark(id);
    
    if (!updatedContent) {
      res.status(404).json({ message: 'Content not found' });
      return;
    }
    
    res.status(200).json(updatedContent);
  } catch (error) {
    console.error('Error in toggleBookmark controller:', error);
    res.status(500).json({ message: 'Error toggling bookmark' });
  }
};

export const updateProgress = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const { progress } = req.body;
    
    if (typeof progress !== 'number' || progress < 0 || progress > 100) {
      res.status(400).json({ message: 'Invalid progress value' });
      return;
    }
    
    const updatedContent = await contentService.updateProgress(id, progress);
    
    if (!updatedContent) {
      res.status(404).json({ message: 'Content not found' });
      return;
    }
    
    res.status(200).json(updatedContent);
  } catch (error) {
    console.error('Error in updateProgress controller:', error);
    res.status(500).json({ message: 'Error updating progress' });
  }
};
