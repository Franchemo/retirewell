
import api from './api';
import { Reflection } from '@/types/reflection';

const RESOURCE_URL = '/reflections';

export const fetchReflections = async (): Promise<Reflection[]> => {
  try {
    const response = await api.get(RESOURCE_URL);
    return response.data;
  } catch (error) {
    console.error('Error fetching reflections:', error);
    // Fallback to localStorage during transition
    const savedReflections = localStorage.getItem("reflections");
    return savedReflections ? JSON.parse(savedReflections) : [];
  }
};

export const fetchReflectionById = async (id: string): Promise<Reflection | null> => {
  try {
    const response = await api.get(`${RESOURCE_URL}/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching reflection ${id}:`, error);
    // Fallback to localStorage during transition
    const savedReflections = localStorage.getItem("reflections");
    if (savedReflections) {
      const reflections: Reflection[] = JSON.parse(savedReflections);
      return reflections.find(r => r.id === id) || null;
    }
    return null;
  }
};

export const createReflection = async (reflection: Reflection): Promise<Reflection> => {
  try {
    const response = await api.post(RESOURCE_URL, reflection);
    return response.data;
  } catch (error) {
    console.error('Error creating reflection:', error);
    // Fallback to localStorage during transition
    const savedReflections = localStorage.getItem("reflections");
    const reflections: Reflection[] = savedReflections ? JSON.parse(savedReflections) : [];
    reflections.push(reflection);
    localStorage.setItem("reflections", JSON.stringify(reflections));
    return reflection;
  }
};

export const updateReflection = async (id: string, reflection: Partial<Reflection>): Promise<Reflection | null> => {
  try {
    const response = await api.put(`${RESOURCE_URL}/${id}`, reflection);
    return response.data;
  } catch (error) {
    console.error(`Error updating reflection ${id}:`, error);
    // Fallback to localStorage during transition
    const savedReflections = localStorage.getItem("reflections");
    if (savedReflections) {
      const reflections: Reflection[] = JSON.parse(savedReflections);
      const index = reflections.findIndex(r => r.id === id);
      if (index >= 0) {
        reflections[index] = { ...reflections[index], ...reflection, updatedAt: new Date().toISOString() };
        localStorage.setItem("reflections", JSON.stringify(reflections));
        return reflections[index];
      }
    }
    return null;
  }
};

export const deleteReflection = async (id: string): Promise<boolean> => {
  try {
    await api.delete(`${RESOURCE_URL}/${id}`);
    return true;
  } catch (error) {
    console.error(`Error deleting reflection ${id}:`, error);
    // Fallback to localStorage during transition
    const savedReflections = localStorage.getItem("reflections");
    if (savedReflections) {
      const reflections: Reflection[] = JSON.parse(savedReflections);
      const filteredReflections = reflections.filter(r => r.id !== id);
      localStorage.setItem("reflections", JSON.stringify(filteredReflections));
      return true;
    }
    return false;
  }
};
