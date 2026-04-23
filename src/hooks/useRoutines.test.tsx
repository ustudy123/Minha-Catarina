import { describe, it, expect, vi, beforeEach } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { useRoutines } from './useRoutines';
import { supabase } from '@/integrations/supabase/client';

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

describe('useRoutines', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should fetch routines on mount', async () => {
    const mockRoutines = [{ id: '1', name: 'Morning', play_random: false, interval_minutes: 5 }];
    mockQueryBuilder.order.mockResolvedValueOnce({ data: mockRoutines, error: null });

    const { result } = renderHook(() => useRoutines());
    await act(async () => {
        await new Promise(resolve => setTimeout(resolve, 0));
    });

    expect(result.current.routines).toHaveLength(1);
    expect(result.current.routines[0].name).toBe('Morning');
  });

  it('should create a routine', async () => {
    mockQueryBuilder.order.mockResolvedValue({ data: [], error: null });
    mockQueryBuilder.single.mockResolvedValueOnce({ data: { id: '2', name: 'Night' }, error: null });

    const { result } = renderHook(() => useRoutines());

    await act(async () => {
      const routine = await result.current.createRoutine('Night');
      expect(routine?.name).toBe('Night');
    });
  });
});
