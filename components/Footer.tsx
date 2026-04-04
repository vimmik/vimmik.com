'use client';

import { NAV_LINKS } from '@/lib/constants';

function FalconLogo() {
  return (
    <svg width="24" height="24" viewBox="0 0 28 28" fill="none" aria-hidden="true">
      <polygon points="14,2 22,10 18,12 26,20 14,16 2,20 10,12 6,10" fill="none" stroke="#3BA3E8" strokeWidth="1.2" strokeLinejoin="round"/>
      <polygon points="14,2 18,12 14,10 10,12" fill="rgba(59,163,232,0.3)" strokeLinejoin="round"/>
      <polygon points="14,10 18,12 14,16 10,12" fill="rgba(59,163,232,0.15)" strokeLinejoin="round"/>
      <circle cx="18" cy="7" r="1.2" fill="#3BA3E8"/>
    </svg>
  );
}

const QUICK_LINKS = [
  { label: 'Services', href: '#services' },
  { label: 'Our Work', href: '#projects' },
  { label: 'Tech Stack', href: '#stack' },
  { label: 'About', href: '#about' },
  { label: 'Contact', href: '#contact' },
];

const SERVICES_LINKS = [
  { label: 'Enterprise ERP', href: '#services' },
  { label: 'SaaS Platforms', href: '#services' },
  { label: 'Management Systems', href: '#services' },
  { label: 'API & Integrations', href: '#services' },
  { label: 'Data Analytics', href: '#services' },
];

export default function Footer() {
  return (
    <footer className="bg-[#060D13] border-t border-[#3BA3E8]/10">
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-10 mb-16">

          {/* Brand */}
          <div className="lg:col-span-1 flex flex-col gap-4">
            <div className="flex items-center gap-2.5">
              <FalconLogo />
              <span
                className="text-white font-bold tracking-[0.2em] text-base"
                style={{ fontFamily: 'var(--font-orbitron)' }}
              >
                VIMMIK
              </span>
            </div>
            <p className="text-sm text-slate-500 leading-relaxed max-w-[220px]">
              Precision enterprise software engineered in Sri Lanka.
            </p>
            <div
              className="text-xs text-[#3BA3E8]/40 tracking-[0.2em]"
              style={{ fontFamily: 'var(--font-ibm-plex-mono)' }}
            >
              FOR YOUR SMART FUTURE
            </div>
            {/* Phi decoration */}
            <div
              className="text-4xl text-[#3BA3E8]/8 font-bold mt-2 select-none"
              style={{ fontFamily: 'var(--font-orbitron)' }}
              aria-hidden="true"
            >
              φ
            </div>
          </div>

          {/* Quick links */}
          <div>
            <h3
              className="text-xs text-[#3BA3E8]/60 tracking-[0.25em] mb-5 uppercase"
              style={{ fontFamily: 'var(--font-ibm-plex-mono)' }}
            >
              Navigate
            </h3>
            <ul className="flex flex-col gap-3">
              {QUICK_LINKS.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    onClick={(e) => {
                      e.preventDefault();
                      document.querySelector(link.href)?.scrollIntoView({ behavior: 'smooth' });
                    }}
                    className="text-sm text-slate-500 hover:text-[#3BA3E8] transition-colors duration-200 flex items-center gap-2 group cursor-none"
                  >
                    <span className="w-0 h-px bg-[#3BA3E8] transition-all duration-300 group-hover:w-3" />
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3
              className="text-xs text-[#3BA3E8]/60 tracking-[0.25em] mb-5 uppercase"
              style={{ fontFamily: 'var(--font-ibm-plex-mono)' }}
            >
              Services
            </h3>
            <ul className="flex flex-col gap-3">
              {SERVICES_LINKS.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    onClick={(e) => {
                      e.preventDefault();
                      document.querySelector(link.href)?.scrollIntoView({ behavior: 'smooth' });
                    }}
                    className="text-sm text-slate-500 hover:text-[#3BA3E8] transition-colors duration-200 flex items-center gap-2 group cursor-none"
                  >
                    <span className="w-0 h-px bg-[#3BA3E8] transition-all duration-300 group-hover:w-3" />
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact CTA */}
          <div>
            <h3
              className="text-xs text-[#3BA3E8]/60 tracking-[0.25em] mb-5 uppercase"
              style={{ fontFamily: 'var(--font-ibm-plex-mono)' }}
            >
              Start a Project
            </h3>
            <p className="text-sm text-slate-500 mb-4 leading-relaxed">
              Ready to build something precise? Let&apos;s talk.
            </p>
            <a
              href="#contact"
              onClick={(e) => {
                e.preventDefault();
                document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="inline-block px-4 py-2 text-xs text-[#3BA3E8] border border-[#3BA3E8]/40 hover:bg-[#3BA3E8]/5 hover:border-[#3BA3E8]/70 transition-colors duration-200 cursor-none"
              style={{ fontFamily: 'var(--font-ibm-plex-mono)' }}
            >
              Get a Quote →
            </a>

            <div
              className="mt-6 text-xs text-slate-600 leading-loose"
              style={{ fontFamily: 'var(--font-ibm-plex-mono)' }}
            >
              hello@vimmik.com<br/>
              Colombo, Sri Lanka
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-[#3BA3E8]/8 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p
            className="text-xs text-slate-600"
            style={{ fontFamily: 'var(--font-ibm-plex-mono)' }}
          >
            © 2025 VIMMIK. Engineered in Sri Lanka.
          </p>
          <div
            className="text-xs text-[#3BA3E8]/20 tracking-[0.2em]"
            style={{ fontFamily: 'var(--font-ibm-plex-mono)' }}
          >
            φ = 1.618 // FOR YOUR SMART FUTURE
          </div>
        </div>
      </div>
    </footer>
  );
}
