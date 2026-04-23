import { describe, it, expect, vi } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { useTextToSpeech } from './useTextToSpeech';
import React from 'react';

// Mock Supabase
vi.mock('@/integrations/supabase/client', () => ({
  supabase: {
    auth: {
      getSession: vi.fn(() => Promise.resolve({
        data: {
          session: { access_token: 'mock-token' }
        }
      })),
      onAuthStateChange: vi.fn(() => ({
        data: { subscription: { unsubscribe: vi.fn() } }
      }))
    }
  }
}));

// Mock Contexts
vi.mock('@/contexts/VoiceContext', () => ({
  useVoice: () => ({ selectedVoice: { voiceId: 'mock-voice-id' } }),
  VoiceProvider: ({ children }: { children: React.ReactNode }) => <>{children}</>
}));

vi.mock('@/contexts/AuthContext', () => ({
  useAuth: () => ({ user: { id: 'user-123' } }),
  AuthProvider: ({ children }: { children: React.ReactNode }) => <>{children}</>
}));

// Mock sonner
vi.mock('sonner', () => ({
  toast: {
    success: vi.fn(),
    error: vi.fn(),
  }
}));

describe('useTextToSpeech', () => {
  it('should initialize with default state', () => {
    const { result } = renderHook(() => useTextToSpeech());
    
    expect(result.current.isGenerating).toBe(false);
    expect(result.current.error).toBe(null);
    expect(result.current.audioUrl).toBe(null);
  });

  it('should generate audio successfully from content', async () => {
    const { result } = renderHook(() => useTextToSpeech());

    await act(async () => {
      const output = await result.current.generate({ text: 'Hello world' });
      expect(output.cached).toBe(false);
      expect(output.url).toBe('mock-url');
    });

    expect(result.current.isGenerating).toBe(false);
    expect(result.current.audioBlob).toBeInstanceOf(Blob);
    expect(result.current.error).toBe(null);
  });

  it('should handle cached audio correctly', async () => {
    const { result } = renderHook(() => useTextToSpeech());

    await act(async () => {
      const output = await result.current.generate({ text: 'cached' });
      expect(output.cached).toBe(true);
      expect(output.url).toBe('https://example.com/audio.mp3');
    });

    expect(result.current.cached).toBe(true);
  });

  it('should handle errors gracefully', async () => {
    const { result } = renderHook(() => useTextToSpeech());

    await act(async () => {
      try {
        await result.current.generate({ text: 'error' });
      } catch (e) {
        // Expected
      }
    });

    expect(result.current.isGenerating).toBe(false);
    expect(result.current.error).toBe('Failed to generate speech');
  });

  it('should reset state correctly', async () => {
    const { result } = renderHook(() => useTextToSpeech());

    await act(async () => {
      await result.current.generate({ text: 'Hello' });
    });

    act(() => {
      result.current.reset();
    });

    expect(result.current.audioUrl).toBe(null);
    expect(result.current.audioBlob).toBe(null);
  });
});
