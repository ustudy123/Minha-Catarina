import { useState, useEffect, useCallback } from 'react';

export interface SavedPhrase {
  id: string;
  text: string;
  language: string;
  audioUrl?: string;
  category?: string;
  createdAt: number;
  isFavorite?: boolean;
}

const STORAGE_KEY = 'minha-catarina-saved-phrases';

export const useSavedPhrases = () => {
  const [phrases, setPhrases] = useState<SavedPhrase[]>([]);

  // Load phrases from localStorage on mount
  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        setPhrases(JSON.parse(stored));
      }
    } catch (error) {
      console.error('Error loading saved phrases:', error);
    }
  }, []);

  // Save phrases to localStorage whenever they change
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(phrases));
    } catch (error) {
      console.error('Error saving phrases:', error);
    }
  }, [phrases]);

  const addPhrase = useCallback((phrase: Omit<SavedPhrase, 'id' | 'createdAt'>) => {
    const newPhrase: SavedPhrase = {
      ...phrase,
      id: `phrase-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      createdAt: Date.now(),
    };
    setPhrases(prev => [newPhrase, ...prev]);
    return newPhrase;
  }, []);

  const removePhrase = useCallback((id: string) => {
    setPhrases(prev => prev.filter(p => p.id !== id));
  }, []);

  const toggleFavorite = useCallback((id: string) => {
    setPhrases(prev => 
      prev.map(p => 
        p.id === id ? { ...p, isFavorite: !p.isFavorite } : p
      )
    );
  }, []);

  const updatePhrase = useCallback((id: string, updates: Partial<SavedPhrase>) => {
    setPhrases(prev => 
      prev.map(p => 
        p.id === id ? { ...p, ...updates } : p
      )
    );
  }, []);

  const getPhraseById = useCallback((id: string) => {
    return phrases.find(p => p.id === id);
  }, [phrases]);

  const getFavorites = useCallback(() => {
    return phrases.filter(p => p.isFavorite);
  }, [phrases]);

  return {
    phrases,
    addPhrase,
    removePhrase,
    toggleFavorite,
    updatePhrase,
    getPhraseById,
    getFavorites,
  };
};
