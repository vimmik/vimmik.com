/*
 * Contact form endpoint. Delivers enquiries by email through Resend's HTTP API.
 *
 * Required env (set in Vercel → Project → Settings → Environment Variables):
 *   RESEND_API_KEY     : API key from resend.com
 * Optional:
 *   CONTACT_TO_EMAIL   : inbox that receives enquiries (default info@vimmik.com)
 *   CONTACT_FROM_EMAIL : verified sender, e.g. "VIMMIK Website <web@vimmik.com>"
 *                         (default Resend's onboarding sender, which only works for testing)
 *
 * Without RESEND_API_KEY the route answers 503 { fallback: 'mailto' } and the
 * form falls back to opening the visitor's mail app, so no enquiry is lost.
 */

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const LIMITS = { name: 120, email: 200, company: 160, projectType: 120, message: 5000 };

type Payload = Record<keyof typeof LIMITS, string> & { website?: string };

const escapeHtml = (s: string) =>
  s.replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c]!);

export async function POST(request: Request) {
  let body: Partial<Payload>;
  try {
    body = await request.json();
  } catch {
    return Response.json({ error: 'Invalid request.' }, { status: 400 });
  }

  // Honeypot: real visitors never fill the hidden "website" field.
  if (body.website) return Response.json({ ok: true });

  const data = Object.fromEntries(
    Object.entries(LIMITS).map(([k, max]) => [k, String(body[k as keyof typeof LIMITS] ?? '').trim().slice(0, max)])
  ) as Record<keyof typeof LIMITS, string>;

  if (!data.name || !data.message || !EMAIL_RE.test(data.email)) {
    return Response.json({ error: 'Please provide your name, a valid email and a message.' }, { status: 422 });
  }

  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    return Response.json({ error: 'Email delivery is not configured.', fallback: 'mailto' }, { status: 503 });
  }

  const rows = [
    ['Name', data.name],
    ['Email', data.email],
    ['Company', data.company || '-'],
    ['Project type', data.projectType || '-'],
  ];
  const html = `
    <h2>New enquiry from vimmik website</h2>
    <table cellpadding="6">${rows.map(([k, v]) => `<tr><td><b>${k}</b></td><td>${escapeHtml(v)}</td></tr>`).join('')}</table>
    <p style="white-space:pre-wrap">${escapeHtml(data.message)}</p>`;

  const res = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: { Authorization: `Bearer ${apiKey}`, 'Content-Type': 'application/json' },
    body: JSON.stringify({
      from: process.env.CONTACT_FROM_EMAIL ?? 'VIMMIK Website <onboarding@resend.dev>',
      to: [process.env.CONTACT_TO_EMAIL ?? 'info@vimmik.com'],
      reply_to: data.email,
      subject: `New enquiry: ${data.name}${data.company ? ` (${data.company})` : ''}`,
      html,
      text: `${rows.map(([k, v]) => `${k}: ${v}`).join('\n')}\n\n${data.message}`,
    }),
  });

  if (!res.ok) {
    console.error('Resend error', res.status, await res.text());
    return Response.json({ error: 'Could not send your message.', fallback: 'mailto' }, { status: 502 });
  }

  return Response.json({ ok: true });
}
