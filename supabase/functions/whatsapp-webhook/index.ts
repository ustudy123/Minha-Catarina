import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type, x-webhook-secret',
};

// Simple webhook secret verification
// In production, use Z-API's actual signature verification if available
const verifyWebhookRequest = (req: Request): boolean => {
  const webhookSecret = Deno.env.get('WEBHOOK_SECRET');
  
  // If no secret is configured, allow the request but log a warning
  if (!webhookSecret) {
    console.warn('WEBHOOK_SECRET not configured - webhook verification disabled');
    return true;
  }
  
  const providedSecret = req.headers.get('x-webhook-secret');
  
  if (!providedSecret || providedSecret !== webhookSecret) {
    console.error('Invalid webhook secret provided');
    return false;
  }
  
  return true;
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    // Verify webhook authenticity
    if (!verifyWebhookRequest(req)) {
      return new Response(
        JSON.stringify({ error: 'Unauthorized: Invalid webhook secret' }),
        { status: 401, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    const webhookData = await req.json();
    console.log('Received webhook:', JSON.stringify(webhookData, null, 2));

    // Extract message data from Z-API webhook
    const message = webhookData.text?.message || webhookData.message?.text || '';
    const phone = webhookData.phone || webhookData.from;

    if (!message || !phone) {
      console.log('No message or phone found in webhook');
      return new Response(JSON.stringify({ status: 'ignored' }), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    console.log(`Processing message from ${phone}: ${message.substring(0, 50)}...`);

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
    console.log('Generated reply:', reply.substring(0, 50) + '...');

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
