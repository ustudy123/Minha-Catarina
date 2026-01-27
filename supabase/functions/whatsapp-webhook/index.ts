import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type, x-webhook-secret',
};

// Validate phone number format (E.164)
const isValidPhoneNumber = (phone: string): boolean => {
  const phoneRegex = /^\+?[1-9]\d{1,14}$/;
  return phoneRegex.test(phone.replace(/\s/g, ''));
};

// Validate and sanitize message
const validateMessage = (message: unknown): { valid: boolean; sanitized: string; error?: string } => {
  if (typeof message !== 'string') {
    return { valid: false, sanitized: '', error: 'Message must be a string' };
  }
  
  const trimmed = message.trim();
  
  if (trimmed.length === 0) {
    return { valid: false, sanitized: '', error: 'Message cannot be empty' };
  }
  
  if (trimmed.length > 1000) {
    return { valid: false, sanitized: '', error: 'Message too long (max 1000 characters)' };
  }
  
  return { valid: true, sanitized: trimmed };
};

// Webhook secret verification - REQUIRED
const verifyWebhookRequest = (req: Request): { valid: boolean; error?: string } => {
  const webhookSecret = Deno.env.get('WEBHOOK_SECRET');
  
  // If no secret is configured, reject all requests for security
  if (!webhookSecret) {
    console.error('WEBHOOK_SECRET not configured - webhook disabled for security');
    return { valid: false, error: 'Webhook not configured' };
  }
  
  const providedSecret = req.headers.get('x-webhook-secret');
  
  if (!providedSecret) {
    console.error('No webhook secret provided in request');
    return { valid: false, error: 'Missing webhook secret' };
  }
  
  if (providedSecret !== webhookSecret) {
    console.error('Invalid webhook secret provided');
    return { valid: false, error: 'Invalid webhook secret' };
  }
  
  return { valid: true };
};

interface WebhookPayload {
  text?: { message?: string };
  message?: { text?: string };
  phone?: string;
  from?: string;
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    // Verify webhook authenticity - REQUIRED
    const verification = verifyWebhookRequest(req);
    if (!verification.valid) {
      return new Response(
        JSON.stringify({ error: `Unauthorized: ${verification.error}` }),
        { status: 401, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Parse and validate JSON payload
    let webhookData: WebhookPayload;
    try {
      const rawData = await req.json();
      
      // Validate it's an object
      if (typeof rawData !== 'object' || rawData === null || Array.isArray(rawData)) {
        return new Response(
          JSON.stringify({ error: 'Invalid payload: expected object' }),
          { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );
      }
      
      webhookData = rawData as WebhookPayload;
    } catch {
      return new Response(
        JSON.stringify({ error: 'Invalid JSON payload' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Extract and validate message
    const rawMessage = webhookData.text?.message || webhookData.message?.text;
    const messageValidation = validateMessage(rawMessage);
    
    if (!messageValidation.valid) {
      console.log(`Message validation failed: ${messageValidation.error}`);
      return new Response(
        JSON.stringify({ status: 'ignored', reason: messageValidation.error }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    const message = messageValidation.sanitized;

    // Extract and validate phone number
    const phone = webhookData.phone || webhookData.from;
    
    if (!phone || typeof phone !== 'string') {
      console.log('No phone found in webhook');
      return new Response(
        JSON.stringify({ status: 'ignored', reason: 'Missing phone number' }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    if (!isValidPhoneNumber(phone)) {
      console.log('Invalid phone number format');
      return new Response(
        JSON.stringify({ status: 'ignored', reason: 'Invalid phone number format' }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Log only metadata, no personal data
    console.log('Processing webhook message', { messageLength: message.length });

    // Call OpenAI for conversational response
    const openAIResponse = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${Deno.env.get('OPENAI_API_KEY')}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'gpt-4o-mini',
        messages: [
          {
            role: 'system',
            content: 'Você é a Catarina, uma boneca virtual carinhosa e amigável que conversa com crianças. Responda de forma afetuosa, educada e apropriada para crianças. Use linguagem simples e seja encorajadora.'
          },
          {
            role: 'user',
            content: message
          }
        ],
        max_tokens: 150,
        temperature: 0.7,
      }),
    });

    if (!openAIResponse.ok) {
      const error = await openAIResponse.text();
      console.error('OpenAI error:', error);
      return new Response(
        JSON.stringify({ error: 'Failed to generate response' }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    const aiData = await openAIResponse.json();
    const reply = aiData.choices[0].message.content;
    console.log('Reply generated', { replyLength: reply.length });

    // Send response via Z-API (only if credentials are configured)
    const zapiInstanceId = Deno.env.get('ZAPI_INSTANCE_ID');
    const zapiToken = Deno.env.get('ZAPI_TOKEN');

    if (zapiInstanceId && zapiToken) {
      const sendResponse = await fetch(
        `https://api.z-api.io/instances/${zapiInstanceId}/token/${zapiToken}/send-text`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            phone: phone,
            message: reply,
          }),
        }
      );

      if (!sendResponse.ok) {
        const error = await sendResponse.text();
        console.error('Z-API send error:', error);
      } else {
        console.log('Message sent successfully via Z-API');
      }
    } else {
      console.log('Z-API credentials not configured, reply not sent');
    }

    return new Response(
      JSON.stringify({ 
        status: 'processed',
        reply: reply 
      }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    );
  } catch (error) {
    console.error('Error in whatsapp-webhook:', error);
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    return new Response(
      JSON.stringify({ error: errorMessage }),
      {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    );
  }
});
