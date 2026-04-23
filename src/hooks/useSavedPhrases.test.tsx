import { describe, it, expect, vi, beforeEach } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { useSavedPhrases } from './useSavedPhrases';
import { supabase } from '@/integrations/supabase/client';
import React from 'react';

const mockQueryBuilder = {
  select: vi.fn().mockReturnThis(),
  insert: vi.fn().mockReturnThis(),
  update: vi.fn().mockReturnThis(),
  delete: vi.fn().mockReturnThis(),
  eq: vi.fn().mockReturnThis(),
  order: vi.fn().mockReturnThis(),
  single: vi.fn().mockImplementation(() => Promise.resolve({ data: { id: '1', text: 'Test', created_at: '2023-01-01' }, error: null })),
  maybeSingle: vi.fn().mockImplementation(() => Promise.resolve({ data: null, error: null })),
};

vi.mock('@/integrations/supabase/client', () => ({
  supabase: {
    from: vi.fn(() => mockQueryBuilder)
  }
}));

vi.mock('@/contexts/AuthContext', () => ({
  useAuth: () => ({ user: { id: 'user-123' } })
}));

describe('useSavedPhrases', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    mockQueryBuilder.order.mockImplementation(() => Promise.resolve({ data: [], error: null }));
  });

  it('should fetch phrases on mount', async () => {
    const mockPhrases = [
      { id: '1', text: 'Hello', language: 'pt', created_at: '2023-01-01', is_favorite: false }
    ];
    
    mockQueryBuilder.order.mockImplementationOnce(() => Promise.resolve({ data: mockPhrases, error: null }));

    const { result } = renderHook(() => useSavedPhrases());

    await act(async () => {
      // useEffect
    });

    expect(result.current.phrases).toHaveLength(1);
    expect(result.current.phrases[0].text).toBe('Hello');
  });

  it('should add a phrase', async () => {
    const { result } = renderHook(() => useSavedPhrases());

    await act(async () => {
      await result.current.addPhrase({
        text: 'New Phrase',
        language: 'pt',
        category: 'general'
      });
    });

    expect(supabase.from).toHaveBeenCalledWith('saved_phrases');
  });
});
