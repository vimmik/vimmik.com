'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { NAV_LINKS } from '@/lib/constants';

function FalconLogo() {
  return (
    <svg width="28" height="28" viewBox="0 0 28 28" fill="none" aria-hidden="true">
      {/* Low-poly falcon silhouette */}
      <polygon points="14,2 22,10 18,12 26,20 14,16 2,20 10,12 6,10" fill="none" stroke="#3BA3E8" strokeWidth="1.2" strokeLinejoin="round"/>
      <polygon points="14,2 18,12 14,10 10,12" fill="rgba(59,163,232,0.3)" strokeLinejoin="round"/>
      <polygon points="14,10 18,12 14,16 10,12" fill="rgba(59,163,232,0.15)" strokeLinejoin="round"/>
      <circle cx="18" cy="7" r="1.2" fill="#3BA3E8"/>
    </svg>
  );
}

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const handleNavClick = (href: string) => {
    setMenuOpen(false);
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-[#080F17]/90 backdrop-blur-md border-b border-[#3BA3E8]/10'
          : 'bg-transparent'
      }`}
    >
      <nav className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        {/* Logo */}
        <a
          href="#"
          className="flex items-center gap-2.5 group"
          onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
        >
          <FalconLogo />
          <span
            className="text-white font-bold tracking-[0.2em] text-lg"
            style={{ fontFamily: 'var(--font-orbitron)' }}
          >
            VIMMIK
          </span>
        </a>

        {/* Desktop links */}
        <div className="hidden md:flex items-center gap-8">
          {NAV_LINKS.map((link) => (
            <button
              key={link.href}
              onClick={() => handleNavClick(link.href)}
              className="relative text-sm text-slate-300 hover:text-white transition-colors duration-200 group cursor-none"
              style={{ fontFamily: 'var(--font-ibm-plex-mono)' }}
            >
              {link.label}
              <span className="absolute -bottom-0.5 left-0 w-0 h-px bg-[#3BA3E8] transition-all duration-300 group-hover:w-full" />
            </button>
          ))}
        </div>

        {/* CTA + hamburger */}
        <div className="flex items-center gap-4">
          <button
            onClick={() => handleNavClick('#contact')}
            className="hidden md:block glow-btn px-4 py-1.5 text-sm text-[#3BA3E8] border border-[#3BA3E8]/60 hover:bg-[#3BA3E8]/10 transition-colors duration-200 cursor-none"
            style={{ fontFamily: 'var(--font-ibm-plex-mono)' }}
          >
            Get a Quote
          </button>

          {/* Hamburger */}
          <button
            className="md:hidden flex flex-col gap-1.5 cursor-none p-1"
            onClick={() => setMenuOpen((v) => !v)}
            aria-label="Toggle menu"
          >
            <motion.span
              animate={menuOpen ? { rotate: 45, y: 8 } : { rotate: 0, y: 0 }}
              className="block w-6 h-px bg-[#3BA3E8]"
              transition={{ duration: 0.2 }}
            />
            <motion.span
              animate={menuOpen ? { opacity: 0 } : { opacity: 1 }}
              className="block w-6 h-px bg-[#3BA3E8]"
              transition={{ duration: 0.2 }}
            />
            <motion.span
              animate={menuOpen ? { rotate: -45, y: -8 } : { rotate: 0, y: 0 }}
              className="block w-6 h-px bg-[#3BA3E8]"
              transition={{ duration: 0.2 }}
            />
          </button>
        </div>
      </nav>

      {/* Mobile menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="md:hidden overflow-hidden bg-[#080F17]/95 backdrop-blur-md border-b border-[#3BA3E8]/10"
          >
            <div className="px-6 py-4 flex flex-col gap-4">
              {NAV_LINKS.map((link) => (
                <button
                  key={link.href}
                  onClick={() => handleNavClick(link.href)}
                  className="text-left text-slate-300 hover:text-white text-sm transition-colors cursor-none"
                  style={{ fontFamily: 'var(--font-ibm-plex-mono)' }}
                >
                  {link.label}
                </button>
              ))}
              <button
                onClick={() => handleNavClick('#contact')}
                className="text-left text-[#3BA3E8] text-sm cursor-none"
                style={{ fontFamily: 'var(--font-ibm-plex-mono)' }}
              >
                Get a Quote →
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
