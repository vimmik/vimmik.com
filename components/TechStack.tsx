'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { TECH_STACK } from '@/lib/constants';

// Duplicated for seamless infinite loop
const ITEMS = [...TECH_STACK, ...TECH_STACK];

export default function TechStack() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section id="stack" className="py-20 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 mb-12" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="flex items-center gap-3 mb-4"
        >
          <span className="h-px w-12 bg-[#3BA3E8]/50" />
          <span
            className="text-xs text-[#3BA3E8] tracking-[0.3em] uppercase"
            style={{ fontFamily: 'var(--font-ibm-plex-mono)' }}
          >
            TECHNOLOGY
          </span>
        </motion.div>
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="text-3xl sm:text-4xl font-bold text-white"
          style={{ fontFamily: 'var(--font-orbitron)' }}
        >
          Built With
        </motion.h2>
      </div>

      {/* Fade edges */}
      <div className="relative">
        <div className="absolute left-0 top-0 bottom-0 w-24 z-10 bg-gradient-to-r from-[#080F17] to-transparent pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-24 z-10 bg-gradient-to-l from-[#080F17] to-transparent pointer-events-none" />

        <div className="overflow-hidden">
          <div className="marquee-track flex gap-4 w-max">
            {ITEMS.map((tech, i) => (
              <div
                key={`${tech.name}-${i}`}
                className="flex items-center gap-2.5 px-4 py-2 rounded-full border border-[#3BA3E8]/25 bg-[#0D1B2A]/60 whitespace-nowrap hover:border-[#3BA3E8]/60 hover:bg-[#3BA3E8]/5 hover:scale-105 transition-all duration-200 cursor-none"
                style={{ boxShadow: '0 0 8px rgba(59,163,232,0.06)' }}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={tech.icon}
                  alt={tech.name}
                  width={20}
                  height={20}
                  loading="lazy"
                  className="w-5 h-5"
                />
                <span
                  className="text-sm text-slate-300 font-medium"
                  style={{ fontFamily: 'var(--font-ibm-plex-mono)' }}
                >
                  {tech.name}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* PCB divider */}
      <div className="mt-20 pcb-divider" aria-hidden="true">
        <svg viewBox="0 0 1440 24" fill="none" className="w-full">
          <path d="M0 12 H180 L200 4 H400 L420 12 H680 L700 20 H880 L900 12 H1100 L1120 4 H1280 L1300 12 H1440"
            stroke="rgba(59,163,232,0.2)" strokeWidth="1"/>
          <circle cx="180" cy="12" r="1.5" fill="rgba(59,163,232,0.4)"/>
          <circle cx="680" cy="12" r="1.5" fill="rgba(59,163,232,0.4)"/>
          <circle cx="1100" cy="12" r="1.5" fill="rgba(59,163,232,0.4)"/>
        </svg>
      </div>
    </section>
  );
}
