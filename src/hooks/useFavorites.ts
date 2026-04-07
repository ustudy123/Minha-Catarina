import { useState, useEffect, useCallback } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';

export interface FavoritePhrase {
  id: string;
  text: string;
  category: string;
  source: 'library' | 'saved';
  durationMinutes: number;
}

export function useFavorites() {
  const { user } = useAuth();
  const [favorites, setFavorites] = useState<FavoritePhrase[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [playRandom, setPlayRandom] = useState(false);
  const [intervalMinutes, setIntervalMinutes] = useState(3);

  // Load favorites from Supabase (saved_phrases where is_favorite = true)
  useEffect(() => {
    if (!user) {
      setIsLoading(false);
      return;
    }

    const loadFavorites = async () => {
      setIsLoading(true);
      try {
        const { data, error } = await supabase
          .from('saved_phrases')
          .select('*')
          .eq('user_id', user.id)
          .eq('is_favorite', true)
          .order('created_at', { ascending: true });

        if (error) {
          console.error('Error loading favorites:', error);
        } else if (data) {
          setFavorites(data.map(p => ({
            id: p.id,
            text: p.text,
            category: p.category || 'general',
            source: 'saved' as const,
            durationMinutes: 1,
          })));
        }
      } catch (e) {
        console.error('Error loading favorites:', e);
      }
      setIsLoading(false);
    };

    loadFavorites();
  }, [user]);

  const addFavorite = useCallback(async (phrase: Omit<FavoritePhrase, 'durationMinutes'> & { durationMinutes?: number }) => {
    if (!user) return;
    if (favorites.some(f => f.id === phrase.id)) return;

    // Check if this phrase already exists in saved_phrases
    const { data: existing } = await supabase
      .from('saved_phrases')
      .select('id')
      .eq('user_id', user.id)
      .eq('text', phrase.text)
      .maybeSingle();

    if (existing) {
      // Update existing to mark as favorite
      await supabase
        .from('saved_phrases')
        .update({ is_favorite: true })
        .eq('id', existing.id);

      const newPhrase: FavoritePhrase = {
        id: existing.id,
        text: phrase.text,
        category: phrase.category,
        source: phrase.source,
        durationMinutes: phrase.durationMinutes ?? 1,
      };
      setFavorites(prev => [...prev, newPhrase]);
    } else {
      // Insert new phrase as favorite
      const { data: inserted, error } = await supabase
        .from('saved_phrases')
        .insert({
          user_id: user.id,
          text: phrase.text,
          category: phrase.category,
          is_favorite: true,
          language: 'pt',
        })
        .select()
        .single();

      if (!error && inserted) {
        const newPhrase: FavoritePhrase = {
          id: inserted.id,
          text: inserted.text,
          category: inserted.category || 'general',
          source: phrase.source,
          durationMinutes: phrase.durationMinutes ?? 1,
        };
        setFavorites(prev => [...prev, newPhrase]);
      }
    }
  }, [user, favorites]);

  const removeFavorite = useCallback(async (phraseId: string) => {
    if (!user) return;

    await supabase
      .from('saved_phrases')
      .update({ is_favorite: false })
      .eq('id', phraseId)
      .eq('user_id', user.id);

    setFavorites(prev => prev.filter(f => f.id !== phraseId));
  }, [user]);

  const isFavorite = useCallback((phraseId: string) => {
    return favorites.some(f => f.id === phraseId || f.text === phraseId);
  }, [favorites]);

  const toggleFavorite = useCallback((phrase: FavoritePhrase) => {
    const existing = favorites.find(f => f.id === phrase.id || f.text === phrase.text);
    if (existing) {
      removeFavorite(existing.id);
      return false;
    } else {
      addFavorite(phrase);
      return true;
    }
  }, [favorites, addFavorite, removeFavorite]);

  const reorderFavorites = useCallback((newOrder: FavoritePhrase[]) => {
    setFavorites(newOrder);
  }, []);

  const updateSettings = useCallback((random: boolean, interval: number) => {
    setPlayRandom(random);
    setIntervalMinutes(interval);
  }, []);

  const updatePhraseDuration = useCallback((phraseId: string, minutes: number) => {
    setFavorites(prev => prev.map(f =>
      f.id === phraseId ? { ...f, durationMinutes: minutes } : f
    ));
  }, []);

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
