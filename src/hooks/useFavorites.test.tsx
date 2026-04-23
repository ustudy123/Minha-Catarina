import { describe, it, expect, vi, beforeEach } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { useFavorites } from './useFavorites';
import { supabase } from '@/integrations/supabase/client';
import React from 'react';

// Create fresh mock implementations for each test
const createMockQueryBuilder = (mockData: any = []) => {
  const builder = {
    select: vi.fn().mockReturnThis(),
    insert: vi.fn().mockReturnThis(),
    update: vi.fn().mockReturnThis(),
    delete: vi.fn().mockReturnThis(),
    eq: vi.fn().mockReturnThis(),
    order: vi.fn().mockImplementation(() => Promise.resolve({ data: mockData, error: null })),
    single: vi.fn().mockImplementation(() => Promise.resolve({ data: { id: '1', text: 'Test' }, error: null })),
    maybeSingle: vi.fn().mockImplementation(() => Promise.resolve({ data: null, error: null })),
  };
  return builder;
};

// Mock Supabase
vi.mock('@/integrations/supabase/client', () => ({
  supabase: {
    from: vi.fn()
  }
}));

vi.mock('@/contexts/AuthContext', () => ({
  useAuth: () => ({ user: { id: 'user-123' } }),
  AuthProvider: ({ children }: { children: React.ReactNode }) => <>{children}</>
}));

describe('useFavorites', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should initialize and load favorites', async () => {
    const mockData = [{ id: '1', text: 'Hello', category: 'daily', is_favorite: true, created_at: '2023-01-01' }];
    (supabase.from as any).mockReturnValue(createMockQueryBuilder(mockData));

    const { result } = renderHook(() => useFavorites());

    // Trigger effect
    await act(async () => {});

    expect(result.current.favorites).toHaveLength(1);
    expect(result.current.favorites[0].text).toBe('Hello');
  });

  it('should add a new favorite', async () => {
    (supabase.from as any).mockReturnValue(createMockQueryBuilder());
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
});
