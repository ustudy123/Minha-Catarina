import { useState, useEffect, useCallback } from 'react';
import { useAuth } from '@/contexts/AuthContext';

export interface FavoritePhrase {
  id: string;
  text: string;
  category: string;
  source: 'library' | 'saved';
  durationMinutes: number; // duração individual em minutos (padrão: 1)
}

const FAVORITES_KEY = 'catarina_favorites';

export function useFavorites() {
  const { user } = useAuth();
  const [favorites, setFavorites] = useState<FavoritePhrase[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [playRandom, setPlayRandom] = useState(false);
  const [intervalMinutes, setIntervalMinutes] = useState(1);

  // Load favorites from localStorage (user-specific)
  useEffect(() => {
    if (user) {
      const storageKey = `${FAVORITES_KEY}_${user.id}`;
      const stored = localStorage.getItem(storageKey);
      if (stored) {
        try {
          const parsed = JSON.parse(stored);
          setFavorites(parsed.favorites || []);
          setPlayRandom(parsed.playRandom || false);
          setIntervalMinutes(parsed.intervalMinutes || 1);
        } catch (e) {
          console.error('Error parsing favorites:', e);
        }
      }
    }
    setIsLoading(false);
  }, [user]);

  // Save to localStorage whenever favorites change
  const saveFavorites = useCallback((newFavorites: FavoritePhrase[], random?: boolean, interval?: number) => {
    if (!user) return;
    
    const storageKey = `${FAVORITES_KEY}_${user.id}`;
    const data = {
      favorites: newFavorites,
      playRandom: random ?? playRandom,
      intervalMinutes: interval ?? intervalMinutes,
    };
    localStorage.setItem(storageKey, JSON.stringify(data));
  }, [user, playRandom, intervalMinutes]);

  const addFavorite = useCallback((phrase: Omit<FavoritePhrase, 'durationMinutes'> & { durationMinutes?: number }) => {
    setFavorites(prev => {
      // Check if already exists
      if (prev.some(f => f.id === phrase.id)) {
        return prev;
      }
      const newPhrase: FavoritePhrase = {
        ...phrase,
        durationMinutes: phrase.durationMinutes ?? 1, // default 1 minuto
      };
      const updated = [...prev, newPhrase];
      saveFavorites(updated);
      return updated;
    });
  }, [saveFavorites]);

  const removeFavorite = useCallback((phraseId: string) => {
    setFavorites(prev => {
      const updated = prev.filter(f => f.id !== phraseId);
      saveFavorites(updated);
      return updated;
    });
  }, [saveFavorites]);

  const isFavorite = useCallback((phraseId: string) => {
    return favorites.some(f => f.id === phraseId);
  }, [favorites]);

  const toggleFavorite = useCallback((phrase: FavoritePhrase) => {
    if (isFavorite(phrase.id)) {
      removeFavorite(phrase.id);
      return false;
    } else {
      addFavorite(phrase);
      return true;
    }
  }, [isFavorite, addFavorite, removeFavorite]);

  const reorderFavorites = useCallback((newOrder: FavoritePhrase[]) => {
    setFavorites(newOrder);
    saveFavorites(newOrder);
  }, [saveFavorites]);

  const updateSettings = useCallback((random: boolean, interval: number) => {
    setPlayRandom(random);
    setIntervalMinutes(interval);
    saveFavorites(favorites, random, interval);
  }, [favorites, saveFavorites]);

  const updatePhraseDuration = useCallback((phraseId: string, minutes: number) => {
    setFavorites(prev => {
      const updated = prev.map(f => 
        f.id === phraseId ? { ...f, durationMinutes: minutes } : f
      );
      saveFavorites(updated);
      return updated;
    });
  }, [saveFavorites]);

  return {
    favorites,
    isLoading,
    playRandom,
    intervalMinutes,
    addFavorite,
    removeFavorite,
    isFavorite,
    toggleFavorite,
    reorderFavorites,
    updateSettings,
    updatePhraseDuration,
  };
}
