'use client';

import { useEffect, useState } from 'react';
import { motion, type Variants } from 'framer-motion';
import dynamic from 'next/dynamic';
import FalconSVG from './FalconSVG';

const ParticleCanvas = dynamic(() => import('./ParticleCanvas'), { ssr: false });

const CYCLE = ['Enterprise Systems', 'SaaS Platforms', 'Smart Solutions', 'Digital Excellence'];

function useTypewriter(words: string[], speed = 60, pause = 1800) {
  const [wordIdx, setWordIdx] = useState(0);
  const [charIdx, setCharIdx] = useState(0);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const current = words[wordIdx];
    let timeout: ReturnType<typeof setTimeout>;

    if (!deleting && charIdx < current.length) {
      timeout = setTimeout(() => setCharIdx((c) => c + 1), speed);
    } else if (!deleting && charIdx === current.length) {
      timeout = setTimeout(() => setDeleting(true), pause);
    } else if (deleting && charIdx > 0) {
      timeout = setTimeout(() => setCharIdx((c) => c - 1), speed / 2);
    } else if (deleting && charIdx === 0) {
      timeout = setTimeout(() => {
        setDeleting(false);
        setWordIdx((w) => (w + 1) % words.length);
      }, 0);
    }

    return () => clearTimeout(timeout);
  }, [charIdx, deleting, wordIdx, words, speed, pause]);

  return words[wordIdx].slice(0, charIdx);
}


/* PCB trace divider */
function PcbDivider() {
  return (
    <div className="pcb-divider" aria-hidden="true">
      <svg viewBox="0 0 1440 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full">
        <path d="M0 12 H200 L220 4 H360 L380 12 H600 L620 20 H760 L780 12 H1000 L1020 4 H1160 L1180 12 H1440"
          stroke="rgba(59,163,232,0.25)" strokeWidth="1" fill="none"/>
        <circle cx="200" cy="12" r="2" fill="rgba(59,163,232,0.4)"/>
        <circle cx="600" cy="12" r="2" fill="rgba(59,163,232,0.4)"/>
        <circle cx="1000" cy="12" r="2" fill="rgba(59,163,232,0.4)"/>
        <circle cx="380" cy="12" r="1.5" fill="rgba(59,163,232,0.3)"/>
        <circle cx="780" cy="12" r="1.5" fill="rgba(59,163,232,0.3)"/>
        <circle cx="1180" cy="12" r="1.5" fill="rgba(59,163,232,0.3)"/>
      </svg>
    </div>
  );
}

export { PcbDivider };

export default function Hero() {
  const typed = useTypewriter(CYCLE);

  const containerVariants: Variants = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.15 } },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 28 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: 'easeOut' as const } },
  };

  const falconVariants: Variants = {
    hidden: { opacity: 0, x: 60, rotate: -8 },
    visible: {
      opacity: 1, x: 0, rotate: 0,
      transition: { duration: 1.1, ease: 'easeOut' as const },
    },
  };

  return (
    <section className="relative min-h-screen flex flex-col justify-center overflow-hidden">
      {/* Particle canvas */}
      <div className="absolute inset-0 z-0">
        <ParticleCanvas />
      </div>

      {/* Scanlines overlay */}
      <div className="absolute inset-0 z-1 scanlines" />

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 pt-24 pb-16 w-full">
        <div className="grid lg:grid-cols-[61.8fr_38.2fr] gap-12 items-center">

          {/* Left — text */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="flex flex-col gap-6"
          >
            {/* Label */}
            <motion.div variants={itemVariants} className="flex items-center gap-3">
              <span
                className="text-xs text-sky tracking-[0.3em] uppercase"
                style={{ fontFamily: 'var(--font-ibm-plex-mono)' }}
              >
                [ VIMMIK SOFTWARE ]
              </span>
              <span className="h-px flex-1 max-w-15 bg-sky/30" />
            </motion.div>

            {/* Headline */}
            <motion.h1
              variants={itemVariants}
              className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-[1.1] text-white"
              style={{ fontFamily: 'var(--font-orbitron)' }}
            >
              Engineering
              <br />
              <span className="text-sky">the Future</span>
            </motion.h1>

            {/* Typewriter */}
            <motion.div variants={itemVariants} className="flex items-center gap-0 h-8">
              <span
                className="text-lg sm:text-xl text-slate-300"
                style={{ fontFamily: 'var(--font-ibm-plex-mono)' }}
              >
                {/* eslint-disable-next-line react/jsx-no-comment-textnodes */}
                <span className="text-sky/60">// </span>
                {typed}
                <span className="typewriter-cursor text-sky">_</span>
              </span>
            </motion.div>

            {/* Subtext */}
            <motion.p variants={itemVariants} className="text-base sm:text-lg text-slate-400 max-w-xl leading-relaxed">
              VIMMIK builds precision software for businesses that demand excellence —
              from enterprise ERP to cloud-native SaaS, engineered to perform at scale.
            </motion.p>

            {/* Golden ratio label */}
            <motion.div
              variants={itemVariants}
              className="text-[10px] text-sky/30 tracking-[0.4em]"
              style={{ fontFamily: 'var(--font-ibm-plex-mono)' }}
            >
              φ = 1.618033... ∞ FOR YOUR SMART FUTURE
            </motion.div>

            {/* CTAs */}
            <motion.div variants={itemVariants} className="flex flex-wrap gap-4">
              <button
                onClick={() => document.querySelector('#projects')?.scrollIntoView({ behavior: 'smooth' })}
                className="px-6 py-3 bg-sky hover:bg-[#2d8fd4] text-void font-semibold text-sm transition-colors duration-200 cursor-none"
                style={{ fontFamily: 'var(--font-ibm-plex-mono)' }}
              >
                View Our Work
              </button>
              <button
                onClick={() => document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' })}
                className="px-6 py-3 border border-sky/50 text-sky hover:border-sky hover:bg-sky/5 text-sm transition-colors duration-200 cursor-none"
                style={{ fontFamily: 'var(--font-ibm-plex-mono)' }}
              >
                Contact Us
              </button>
            </motion.div>
          </motion.div>

          {/* Right — falcon */}
          <motion.div
            variants={falconVariants}
            initial="hidden"
            animate="visible"
            className="relative flex items-center justify-center lg:justify-end falcon-float"
            style={{
              background: 'radial-gradient(ellipse 60% 70% at center, rgba(59,163,232,0.08) 0%, transparent 70%)',
            }}
          >
            <FalconSVG size={420} />
          </motion.div>
        </div>
      </div>

      {/* PCB trace at bottom */}
      <div className="absolute bottom-0 left-0 right-0 z-10">
        <PcbDivider />
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2 opacity-40"
        animate={{ y: [0, 6, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <span className="text-[10px] text-sky tracking-[0.3em]" style={{ fontFamily: 'var(--font-ibm-plex-mono)' }}>SCROLL</span>
        <svg width="12" height="18" viewBox="0 0 12 18" fill="none">
          <path d="M6 0 L6 18 M1 12 L6 18 L11 12" stroke="#3BA3E8" strokeWidth="1"/>
        </svg>
      </motion.div>
    </section>
  );
}
