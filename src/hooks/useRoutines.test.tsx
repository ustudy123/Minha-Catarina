import { describe, it, expect, vi, beforeEach } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { useRoutines } from './useRoutines';
import { supabase } from '@/integrations/supabase/client';

const orderMock = vi.fn().mockImplementation(() => Promise.resolve({ data: [], error: null }));
const singleMock = vi.fn().mockImplementation(() => Promise.resolve({ data: { id: '1', name: 'Test' }, error: null }));

const mockQueryBuilder = {
  select: vi.fn().mockReturnThis(),
  insert: vi.fn().mockReturnThis(),
  update: vi.fn().mockReturnThis(),
  delete: vi.fn().mockReturnThis(),
  eq: vi.fn().mockReturnThis(),
  order: orderMock,
  single: singleMock,
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
    orderMock.mockResolvedValue({ data: [], error: null });
  });

  it('should fetch routines on mount', async () => {
    const mockRoutines = [{ id: '1', name: 'Morning', play_random: false, interval_minutes: 5 }];
    orderMock.mockResolvedValueOnce({ data: mockRoutines, error: null });

    const { result } = renderHook(() => useRoutines());

    await act(async () => {
      // useEffect
    });

    expect(result.current.routines).toHaveLength(1);
    expect(result.current.routines[0].name).toBe('Morning');
  });

  it('should create a routine', async () => {
    const { result } = renderHook(() => useRoutines());

    await act(async () => {
      const routine = await result.current.createRoutine('Night');
      expect(routine?.name).toBe('Night');
    });

    expect(result.current.routines).toHaveLength(1);
  });
});
