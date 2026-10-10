'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { NAV_LINKS } from '@/lib/constants';
import { LogoLockup } from './Logo';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const scrollTo = (href: string) =>
    document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' });

  const handleNavClick = (href: string) => {
    if (!menuOpen) return scrollTo(href);
    // Collapsing the mobile menu shifts layout, which cancels a smooth scroll
    // started in the same frame: wait for the exit animation to finish.
    setMenuOpen(false);
    setTimeout(() => scrollTo(href), 300);
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-[#050C1A]/90 backdrop-blur-md border-b border-[#0094EE]/10'
          : 'bg-transparent'
      }`}
    >
      <nav className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        {/* Logo */}
        <a
          href="#"
          className="group"
          aria-label="VIMMIK, back to top"
          onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
        >
          <LogoLockup size={30} />
        </a>

        {/* Desktop links */}
        <div className="hidden md:flex items-center gap-8">
          {NAV_LINKS.map((link) => (
            <button
              key={link.href}
              onClick={() => handleNavClick(link.href)}
              className="relative text-sm text-slate-300 hover:text-white transition-colors duration-200 group"
              style={{ fontFamily: 'var(--font-ibm-plex-mono)' }}
            >
              {link.label}
              <span className="absolute -bottom-0.5 left-0 w-0 h-px bg-[#0094EE] transition-all duration-300 group-hover:w-full" />
            </button>
          ))}
        </div>

        {/* CTA + hamburger */}
        <div className="flex items-center gap-4">
          <button
            onClick={() => handleNavClick('#contact')}
            className="hidden md:block glow-btn px-4 py-1.5 text-sm text-[#0094EE] border border-[#0094EE]/60 hover:bg-[#0094EE]/10 transition-colors duration-200"
            style={{ fontFamily: 'var(--font-ibm-plex-mono)' }}
          >
            Get a Quote
          </button>

          {/* Hamburger */}
          <button
            className="md:hidden flex flex-col gap-1.5 p-1"
            onClick={() => setMenuOpen((v) => !v)}
            aria-label="Toggle menu"
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
          >
            <motion.span
              animate={menuOpen ? { rotate: 45, y: 8 } : { rotate: 0, y: 0 }}
              className="block w-6 h-px bg-[#0094EE]"
              transition={{ duration: 0.2 }}
            />
            <motion.span
              animate={menuOpen ? { opacity: 0 } : { opacity: 1 }}
              className="block w-6 h-px bg-[#0094EE]"
              transition={{ duration: 0.2 }}
            />
            <motion.span
              animate={menuOpen ? { rotate: -45, y: -8 } : { rotate: 0, y: 0 }}
              className="block w-6 h-px bg-[#0094EE]"
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
            id="mobile-menu"
            className="md:hidden overflow-hidden bg-[#050C1A]/95 backdrop-blur-md border-b border-[#0094EE]/10"
          >
            <div className="px-6 py-4 flex flex-col gap-4">
              {NAV_LINKS.map((link) => (
                <button
                  key={link.href}
                  onClick={() => handleNavClick(link.href)}
                  className="text-left text-slate-300 hover:text-white text-sm transition-colors"
                  style={{ fontFamily: 'var(--font-ibm-plex-mono)' }}
                >
                  {link.label}
                </button>
              ))}
              <button
                onClick={() => handleNavClick('#contact')}
                className="text-left text-[#0094EE] text-sm"
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
