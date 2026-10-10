'use client';

import { LogoMark } from './Logo';
import { CONTACT_INFO, SOCIAL_LINKS } from '@/lib/constants';
import { SocialIcon } from './SocialIcon';

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
    <footer className="bg-[#040A15] border-t border-[#0094EE]/10">
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-10 mb-16">

          {/* Brand */}
          <div className="lg:col-span-1 flex flex-col gap-4">
            <div className="flex items-center gap-2.5">
              <LogoMark size={26} />
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
              className="text-xs text-[#0094EE]/40 tracking-[0.2em]"
              style={{ fontFamily: 'var(--font-ibm-plex-mono)' }}
            >
              FOR YOUR SMART FUTURE
            </div>
            {/* Phi decoration */}
            <div
              className="text-4xl text-[#0094EE]/8 font-bold mt-2 select-none"
              style={{ fontFamily: 'var(--font-orbitron)' }}
              aria-hidden="true"
            >
              φ
            </div>
          </div>

          {/* Quick links */}
          <div>
            <h3
              className="text-xs text-[#0094EE]/60 tracking-[0.25em] mb-5 uppercase"
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
                    className="text-sm text-slate-500 hover:text-[#0094EE] transition-colors duration-200 flex items-center gap-2 group"
                  >
                    <span className="w-0 h-px bg-[#0094EE] transition-all duration-300 group-hover:w-3" />
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3
              className="text-xs text-[#0094EE]/60 tracking-[0.25em] mb-5 uppercase"
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
                    className="text-sm text-slate-500 hover:text-[#0094EE] transition-colors duration-200 flex items-center gap-2 group"
                  >
                    <span className="w-0 h-px bg-[#0094EE] transition-all duration-300 group-hover:w-3" />
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact CTA */}
          <div>
            <h3
              className="text-xs text-[#0094EE]/60 tracking-[0.25em] mb-5 uppercase"
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
              className="inline-block px-4 py-2 text-xs text-[#0094EE] border border-[#0094EE]/40 hover:bg-[#0094EE]/5 hover:border-[#0094EE]/70 transition-colors duration-200"
              style={{ fontFamily: 'var(--font-ibm-plex-mono)' }}
            >
              Get a Quote →
            </a>

            <ul
              className="mt-6 flex flex-col gap-1.5 text-xs text-slate-500"
              style={{ fontFamily: 'var(--font-ibm-plex-mono)' }}
            >
              {CONTACT_INFO.map((info) => (
                <li key={info.label}>
                  {info.href ? (
                    <a href={info.href} className="hover:text-[#0094EE] transition-colors duration-200">
                      {info.value}
                    </a>
                  ) : (
                    info.value
                  )}
                </li>
              ))}
            </ul>

            <div className="mt-6 flex items-center gap-3">
              {SOCIAL_LINKS.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`VIMMIK on ${social.label}`}
                  className="w-9 h-9 flex items-center justify-center border border-[#0094EE]/20 text-slate-400 hover:text-[#0094EE] hover:border-[#0094EE]/60 transition-colors duration-200"
                >
                  <SocialIcon name={social.icon} />
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-[#0094EE]/8 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p
            className="text-xs text-slate-600"
            style={{ fontFamily: 'var(--font-ibm-plex-mono)' }}
          >
            © {new Date().getFullYear()} VIMMIK. Engineered in Sri Lanka.
          </p>
          <div
            className="text-xs text-[#0094EE]/20 tracking-[0.2em]"
            style={{ fontFamily: 'var(--font-ibm-plex-mono)' }}
          >
            φ = 1.618 // FOR YOUR SMART FUTURE
          </div>
        </div>
      </div>
    </footer>
  );
}
