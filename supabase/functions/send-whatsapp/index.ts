import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { phone, message } = await req.json();

    if (!phone || !message) {
      throw new Error('Phone and message are required');
    }

    const zapiInstanceId = Deno.env.get('ZAPI_INSTANCE_ID');
    const zapiToken = Deno.env.get('ZAPI_TOKEN');

    if (!zapiInstanceId || !zapiToken) {
      throw new Error('Z-API credentials not configured. Please add ZAPI_INSTANCE_ID and ZAPI_TOKEN secrets.');
    }

    console.log(`Sending message to ${phone}`);

    const response = await fetch(
      `https://api.z-api.io/instances/${zapiInstanceId}/token/${zapiToken}/send-text`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          phone: phone,
          message: message,
        }),
      }
    );

    if (!response.ok) {
      const error = await response.text();
      console.error('Z-API error:', error);
      throw new Error(`Failed to send message: ${error}`);
    }

    const data = await response.json();
    console.log('Message sent successfully:', data);

    return new Response(
      JSON.stringify({ 
        success: true,
        data: data 
      }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    );
  } catch (error) {
    console.error('Error in send-whatsapp:', error);
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
