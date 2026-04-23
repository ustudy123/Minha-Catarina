import { describe, it, expect, vi, beforeEach } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { useFavorites } from './useFavorites';
import { supabase } from '@/integrations/supabase/client';
import React from 'react';

const mockQueryBuilder = {
  select: vi.fn().mockReturnThis(),
  insert: vi.fn().mockReturnThis(),
  update: vi.fn().mockReturnThis(),
  delete: vi.fn().mockReturnThis(),
  eq: vi.fn().mockReturnThis(),
  order: vi.fn().mockReturnThis(),
  single: vi.fn().mockReturnThis(),
  maybeSingle: vi.fn().mockReturnThis(),
};

vi.mock('@/integrations/supabase/client', () => ({
  supabase: {
    from: vi.fn(() => mockQueryBuilder)
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

  it('should initialize correctly', () => {
    const { result } = renderHook(() => useFavorites());
    expect(result.current.isLoading).toBe(true);
  });

  it('should add a new favorite', async () => {
    mockQueryBuilder.order.mockResolvedValue({ data: [], error: null });
    mockQueryBuilder.maybeSingle.mockResolvedValueOnce({ data: null, error: null });
    mockQueryBuilder.single.mockResolvedValueOnce({ data: { id: '2', text: 'New', category: 'cat' }, error: null });

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
