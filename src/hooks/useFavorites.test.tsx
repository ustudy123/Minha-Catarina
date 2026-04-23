import { describe, it, expect, vi, beforeEach } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { useFavorites } from './useFavorites';
import { supabase } from '@/integrations/supabase/client';
import { AuthProvider } from '@/contexts/AuthContext';
import React from 'react';

// Mock Supabase
vi.mock('@/integrations/supabase/client', () => ({
  supabase: {
    from: vi.fn(() => ({
      select: vi.fn().mockReturnThis(),
      insert: vi.fn().mockReturnThis(),
      update: vi.fn().mockReturnThis(),
      delete: vi.fn().mockReturnThis(),
      eq: vi.fn().mockReturnThis(),
      order: vi.fn().mockReturnThis(),
      single: vi.fn().mockImplementation(() => Promise.resolve({ data: { id: '1', text: 'Test' }, error: null })),
      maybeSingle: vi.fn().mockImplementation(() => Promise.resolve({ data: null, error: null })),
    }))
  }
}));

vi.mock('@/contexts/AuthContext', () => ({
  useAuth: () => ({ user: { id: 'user-123' } }),
  AuthProvider: ({ children }: { children: React.ReactNode }) => <div>{children}</div>
}));

describe('useFavorites', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should initialize and load favorites', async () => {
    const mockData = [{ id: '1', text: 'Hello', category: 'daily', is_favorite: true }];
    (supabase.from as any).mockReturnValue({
      select: vi.fn().mockReturnThis(),
      eq: vi.fn().mockReturnThis(),
      order: vi.fn().mockImplementation(() => Promise.resolve({ data: mockData, error: null }))
    });

    const { result } = renderHook(() => useFavorites());

    await act(async () => {
      // Wait for useEffect
    });

    expect(result.current.favorites).toHaveLength(1);
    expect(result.current.favorites[0].text).toBe('Hello');
  });

  it('should add a new favorite', async () => {
    const { result } = renderHook(() => useFavorites());

    await act(async () => {
      await result.current.addFavorite({
        id: 'new-id',
        text: 'New Favorite',
        category: 'daily',
        source: 'library'
      });
    });

    expect(supabase.from).toHaveBeenCalledWith('saved_phrases');
  });

  it('should remove a favorite', async () => {
    const { result } = renderHook(() => useFavorites());

    await act(async () => {
      await result.current.removeFavorite('1');
    });

    expect(supabase.from).toHaveBeenCalledWith('saved_phrases');
    expect(result.current.favorites).toHaveLength(0);
  });
});
