import type { Metadata, Viewport } from 'next';
import { Orbitron, IBM_Plex_Mono, DM_Sans } from 'next/font/google';
import './globals.css';
import CursorRig from '@/components/CursorRig';
import { Analytics } from '@vercel/analytics/next';
import { SITE_URL } from '@/lib/site';

const orbitron = Orbitron({
  subsets: ['latin'],
  variable: '--font-orbitron',
  display: 'swap',
});

const ibmPlexMono = IBM_Plex_Mono({
  subsets: ['latin'],
  weight: ['400', '500'],
  variable: '--font-ibm-plex-mono',
  display: 'swap',
});

const dmSans = DM_Sans({
  subsets: ['latin'],
  variable: '--font-dm-sans',
  display: 'swap',
});


const DESCRIPTION =
  'VIMMIK is a software company in Colombo, Sri Lanka building web platforms, SaaS products and mobile apps, including MediChainLK and Kotasa.';

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: 'VIMMIK | For Your Smart Future',
  description: DESCRIPTION,
  keywords: ['software company', 'Sri Lanka', 'Colombo', 'SaaS', 'web development', 'mobile apps', 'MediChainLK', 'Kotasa', 'VIMMIK'],
  authors: [{ name: 'VIMMIK', url: 'https://github.com/vimmik' }],
  alternates: { canonical: '/' },
  openGraph: {
    title: 'VIMMIK | For Your Smart Future',
    description: DESCRIPTION,
    url: '/',
    siteName: 'VIMMIK',
    locale: 'en_LK',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'VIMMIK | For Your Smart Future',
    description: DESCRIPTION,
  },
};

export const viewport: Viewport = {
  themeColor: '#050C1A',
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      className={`${orbitron.variable} ${ibmPlexMono.variable} ${dmSans.variable}`}
    >
      <body className="hex-bg antialiased">
        <CursorRig />
        {children}
        <Analytics />
      </body>
    </html>
  );
}
