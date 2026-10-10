<div align="center">

<img src="public/brand/vimmik-mark.png" alt="VIMMIK logo" width="96" height="96" />

# VIMMIK

**For Your Smart Future**

Company website for VIMMIK, a software company in Colombo, Sri Lanka.
Live at [vimmik.vercel.app](https://vimmik.vercel.app).

</div>

## Stack

Next.js 16 (App Router), React 19, TypeScript, Tailwind CSS v4 and Framer Motion, deployed on Vercel.

## Development

```bash
pnpm install
cp .env.example .env.local   # optional, see below
pnpm dev                     # http://localhost:3000
pnpm lint
pnpm build
```

## Contact form

The form posts to `app/api/contact/route.ts`, which emails each enquiry through [Resend](https://resend.com).

| Variable | Purpose |
| --- | --- |
| `RESEND_API_KEY` | Resend API key. Without it the form opens the visitor's email app, pre-filled to `info@vimmik.com`. |
| `CONTACT_TO_EMAIL` | Inbox that receives enquiries. Defaults to `info@vimmik.com`. |
| `CONTACT_FROM_EMAIL` | Sender on a domain verified in Resend, e.g. `VIMMIK Website <web@vimmik.com>`. |
| `NEXT_PUBLIC_SITE_URL` | Public URL used for canonical links, the sitemap and social previews. |

Set these in Vercel under Project Settings, Environment Variables.

## Content

Most copy lives in `lib/constants.ts`: services, stats, tech stack, projects, contact details and social links.
Projects are taken from the public repositories at [github.com/vimmik](https://github.com/vimmik).

## Brand

- Mark: `components/Logo.tsx` (SVG traced from `public/mainlogo.jpeg`)
- Colours: blue `#0094EE`, navy `#002D68`, site background `#050C1A`
- PNG exports: `public/brand/`; favicon, app icons and social image: `app/`
