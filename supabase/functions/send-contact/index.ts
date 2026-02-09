const RESEND_API_KEY = Deno.env.get('RESEND_API_KEY') ?? '';
const CONTACT_TO = Deno.env.get('CONTACT_TO') ?? '';
const CONTACT_FROM = Deno.env.get('CONTACT_FROM') ?? 'Portfolio <onboarding@resend.dev>';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type'
};

type ContactPayload = {
  fullName: string;
  email: string;
  phone?: string;
  profile: string;
  projectType: string;
  message: string;
};

Deno.serve(async (request) => {
  if (request.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders });
  }

  if (request.method !== 'POST') {
    return new Response('Method not allowed', { status: 405, headers: corsHeaders });
  }

  if (!RESEND_API_KEY || !CONTACT_TO) {
    return new Response('Missing email configuration.', { status: 500, headers: corsHeaders });
  }

  try {
    const payload = (await request.json()) as ContactPayload;
    if (!payload?.email || !payload?.fullName || !payload?.message) {
      return new Response('Invalid payload.', { status: 400, headers: corsHeaders });
    }

    const subject = `Nouveau message portfolio — ${payload.fullName}`;
    const text = [
      `Nom: ${payload.fullName}`,
      `Email: ${payload.email}`,
      payload.phone ? `Téléphone: ${payload.phone}` : null,
      `Profil: ${payload.profile}`,
      `Type de projet: ${payload.projectType}`,
      '',
      'Message:',
      payload.message
    ]
      .filter(Boolean)
      .join('\n');

    const html = `
      <h2>Nouveau message portfolio</h2>
      <p><strong>Nom:</strong> ${payload.fullName}</p>
      <p><strong>Email:</strong> ${payload.email}</p>
      ${payload.phone ? `<p><strong>Téléphone:</strong> ${payload.phone}</p>` : ''}
      <p><strong>Profil:</strong> ${payload.profile}</p>
      <p><strong>Type de projet:</strong> ${payload.projectType}</p>
      <p><strong>Message:</strong></p>
      <p>${payload.message.replaceAll('\n', '<br />')}</p>
    `;

    const response = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${RESEND_API_KEY}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        from: CONTACT_FROM,
        to: CONTACT_TO,
        reply_to: payload.email,
        subject,
        text,
        html
      })
    });

    if (!response.ok) {
      const errorBody = await response.text();
      console.error('Resend error:', response.status, errorBody);
      return new Response(
        JSON.stringify({ error: 'ResendError', status: response.status, details: errorBody }),
        { status: 502, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    const replySubject = `Merci pour votre message, ${payload.fullName}`;
    const replyText = [
      `Bonjour ${payload.fullName},`,
      '',
      'Merci pour votre message. Je reviens vers vous rapidement.',
      '',
      'Résumé de votre demande :',
      `Profil : ${payload.profile}`,
      `Type de projet : ${payload.projectType}`,
      '',
      '—',
      'Carnelle Nguepi'
    ].join('\n');

    await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${RESEND_API_KEY}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        from: CONTACT_FROM,
        to: payload.email,
        subject: replySubject,
        text: replyText
      })
    });

    return new Response(JSON.stringify({ ok: true }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' }
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Unexpected error';
    return new Response(message, { status: 500, headers: corsHeaders });
  }
});
