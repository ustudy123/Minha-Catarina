import { describe, it, expect, vi, beforeEach } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { useFavorites } from './useFavorites';
import { supabase } from '@/integrations/supabase/client';
import React from 'react';

// persistent mocks
const orderMock = vi.fn().mockImplementation(() => Promise.resolve({ data: [], error: null }));
const maybeSingleMock = vi.fn().mockImplementation(() => Promise.resolve({ data: null, error: null }));
const singleMock = vi.fn().mockImplementation(() => Promise.resolve({ data: { id: '1', text: 'Test' }, error: null }));

const mockQueryBuilder = {
  select: vi.fn().mockReturnThis(),
  insert: vi.fn().mockReturnThis(),
  update: vi.fn().mockReturnThis(),
  delete: vi.fn().mockReturnThis(),
  eq: vi.fn().mockReturnThis(),
  order: orderMock,
  single: singleMock,
  maybeSingle: maybeSingleMock,
};

// Mock Supabase
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
    orderMock.mockResolvedValue({ data: [], error: null });
  });

  it('should initialize and load favorites', async () => {
    const mockData = [{ id: '1', text: 'Hello', category: 'daily', is_favorite: true, created_at: '2023-01-01' }];
    orderMock.mockResolvedValueOnce({ data: mockData, error: null });

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
});
