import type { Metadata } from 'next';
import { Orbitron, IBM_Plex_Mono, DM_Sans } from 'next/font/google';
import './globals.css';
import CursorRig from '@/components/CursorRig';
import { Analytics } from '@vercel/analytics/next';

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

export const metadata: Metadata = {
  title: 'VIMMIK — For Your Smart Future',
  description:
    'VIMMIK builds precision enterprise software, SaaS platforms, and management systems for businesses that demand excellence. Based in Sri Lanka.',
  keywords: ['enterprise software', 'SaaS', 'ERP', 'Sri Lanka', 'software company', 'VIMMIK'],
  authors: [{ name: 'VIMMIK' }],
  openGraph: {
    title: 'VIMMIK — For Your Smart Future',
    description: 'Precision enterprise software engineered in Sri Lanka.',
    type: 'website',
  },
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
