import { http, HttpResponse } from 'msw';

export const handlers = [
  // Mock Supabase Auth
  http.post('*/auth/v1/token', () => {
    return HttpResponse.json({
      access_token: 'mock-token',
      user: { id: 'mock-user-id' },
    });
  }),
  
  // Mock Text-to-Speech Edge Function
  http.post('*/functions/v1/text-to-speech', async ({ request }) => {
    const body = await request.json() as { text: string };
    
    if (body.text === 'error') {
      return HttpResponse.json({ error: 'Failed to generate speech' }, { status: 500 });
    }

    if (body.text === 'cached') {
      return HttpResponse.json({
        cached: true,
        audioUrl: 'https://example.com/audio.mp3'
      });
    }

    return HttpResponse.json({
      audioContent: btoa('mock-audio-content'),
      cached: false
    });
  }),

  // Mock Audio fetching
  http.get('https://example.com/audio.mp3', () => {
    // Return a simple Response instead of HttpResponse with Blob to avoid undici stream issue
    return new Response(new Uint8Array([1, 2, 3]), {
      headers: { 'Content-Type': 'audio/mpeg' }
    });
  }),
];
