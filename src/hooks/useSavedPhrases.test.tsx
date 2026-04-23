import { describe, it, expect, vi, beforeEach } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { useSavedPhrases } from './useSavedPhrases';
import { supabase } from '@/integrations/supabase/client';
import React from 'react';

const createMockQueryBuilder = (mockData: any = []) => {
  const builder = {
    select: vi.fn().mockReturnThis(),
    insert: vi.fn().mockReturnThis(),
    update: vi.fn().mockReturnThis(),
    delete: vi.fn().mockReturnThis(),
    eq: vi.fn().mockReturnThis(),
    order: vi.fn().mockImplementation(() => Promise.resolve({ data: mockData, error: null })),
    single: vi.fn().mockImplementation(() => Promise.resolve({ data: { id: '1', text: 'Test', created_at: '2023-01-01' }, error: null })),
    maybeSingle: vi.fn().mockReturnThis(),
  };
  return builder;
};

vi.mock('@/integrations/supabase/client', () => ({
  supabase: {
    from: vi.fn()
  }
}));

vi.mock('@/contexts/AuthContext', () => ({
  useAuth: () => ({ user: { id: 'user-123' } })
}));

describe('useSavedPhrases', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should fetch phrases on mount', async () => {
    const mockPhrases = [
      { id: '1', text: 'Hello', language: 'pt', created_at: '2023-01-01', is_favorite: false }
    ];
    (supabase.from as any).mockReturnValue(createMockQueryBuilder(mockPhrases));

    const { result } = renderHook(() => useSavedPhrases());
    await act(async () => {});

    expect(result.current.phrases).toHaveLength(1);
    expect(result.current.phrases[0].text).toBe('Hello');
  });

  it('should add a phrase', async () => {
    (supabase.from as any).mockReturnValue(createMockQueryBuilder());
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
