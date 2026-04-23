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
  single: vi.fn().mockReturnThis(),
  maybeSingle: vi.fn().mockReturnThis(),
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
    mockQueryBuilder.order.mockResolvedValue({ data: [], error: null });
  });

  it('should initialize correctly', async () => {
    const { result } = renderHook(() => useSavedPhrases());
    expect(result.current.isLoading).toBe(true);
    await act(async () => {
        await new Promise(resolve => setTimeout(resolve, 0));
    });
  });

  it('should add a phrase', async () => {
    mockQueryBuilder.single.mockResolvedValueOnce({ data: { id: '2', text: 'New', created_at: '2023-01-01' }, error: null });
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
