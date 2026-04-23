import { describe, it, expect, vi, beforeEach } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { useRoutines } from './useRoutines';
import { supabase } from '@/integrations/supabase/client';

vi.mock('@/integrations/supabase/client', () => ({
  supabase: {
    from: vi.fn(() => ({
      select: vi.fn().mockReturnThis(),
      insert: vi.fn().mockReturnThis(),
      update: vi.fn().mockReturnThis(),
      delete: vi.fn().mockReturnThis(),
      eq: vi.fn().mockReturnThis(),
      order: vi.fn().mockImplementation(() => Promise.resolve({ data: [], error: null })),
      single: vi.fn().mockImplementation(() => Promise.resolve({ data: { id: '1', name: 'Test' }, error: null })),
    }))
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
    
    (supabase.from as any).mockReturnValue({
      select: vi.fn().mockReturnThis(),
      eq: vi.fn().mockReturnThis(),
      order: vi.fn().mockImplementation(() => Promise.resolve({ data: mockRoutines, error: null }))
    });

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

  it('should delete a routine', async () => {
    const { result } = renderHook(() => useRoutines());

    await act(async () => {
      await result.current.deleteRoutine('1');
    });

    expect(supabase.from).toHaveBeenCalledWith('routines');
  });
});
