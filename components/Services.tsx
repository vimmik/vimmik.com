'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { SERVICES } from '@/lib/constants';

const ICONS: Record<string, React.ReactNode> = {
  erp: (
    <svg viewBox="0 0 40 40" fill="none" className="w-8 h-8">
      <rect x="4" y="8" width="14" height="10" stroke="#3BA3E8" strokeWidth="1.2" rx="1"/>
      <rect x="22" y="8" width="14" height="10" stroke="#3BA3E8" strokeWidth="1.2" rx="1"/>
      <rect x="13" y="22" width="14" height="10" stroke="#3BA3E8" strokeWidth="1.2" rx="1"/>
      <path d="M11 18 L11 26 L13 26" stroke="#3BA3E8" strokeWidth="1" opacity="0.6"/>
      <path d="M29 18 L29 26 L27 26" stroke="#3BA3E8" strokeWidth="1" opacity="0.6"/>
      <circle cx="11" cy="18" r="1.5" fill="#3BA3E8" opacity="0.6"/>
      <circle cx="29" cy="18" r="1.5" fill="#3BA3E8" opacity="0.6"/>
    </svg>
  ),
  saas: (
    <svg viewBox="0 0 40 40" fill="none" className="w-8 h-8">
      <ellipse cx="20" cy="14" rx="12" ry="6" stroke="#3BA3E8" strokeWidth="1.2"/>
      <path d="M8 14 L8 26 Q8 32 20 32 Q32 32 32 26 L32 14" stroke="#3BA3E8" strokeWidth="1.2"/>
      <ellipse cx="20" cy="20" rx="12" ry="6" stroke="#3BA3E8" strokeWidth="1" opacity="0.4"/>
      <path d="M14 10 L14 28" stroke="#3BA3E8" strokeWidth="0.6" opacity="0.3"/>
      <path d="M20 8 L20 32" stroke="#3BA3E8" strokeWidth="0.6" opacity="0.3"/>
      <path d="M26 10 L26 28" stroke="#3BA3E8" strokeWidth="0.6" opacity="0.3"/>
    </svg>
  ),
  mgmt: (
    <svg viewBox="0 0 40 40" fill="none" className="w-8 h-8">
      <rect x="6" y="6" width="28" height="28" rx="2" stroke="#3BA3E8" strokeWidth="1.2"/>
      <path d="M6 14 H34" stroke="#3BA3E8" strokeWidth="1"/>
      <path d="M14 14 L14 34" stroke="#3BA3E8" strokeWidth="0.8" opacity="0.5"/>
      <rect x="17" y="18" width="8" height="3" rx="0.5" fill="rgba(59,163,232,0.3)" stroke="#3BA3E8" strokeWidth="0.6"/>
      <rect x="17" y="24" width="12" height="3" rx="0.5" fill="rgba(59,163,232,0.2)" stroke="#3BA3E8" strokeWidth="0.6"/>
      <circle cx="10" cy="10" r="1.5" fill="#3BA3E8" opacity="0.6"/>
    </svg>
  ),
  api: (
    <svg viewBox="0 0 40 40" fill="none" className="w-8 h-8">
      <circle cx="8" cy="20" r="4" stroke="#3BA3E8" strokeWidth="1.2"/>
      <circle cx="32" cy="20" r="4" stroke="#3BA3E8" strokeWidth="1.2"/>
      <circle cx="20" cy="8" r="4" stroke="#3BA3E8" strokeWidth="1.2"/>
      <circle cx="20" cy="32" r="4" stroke="#3BA3E8" strokeWidth="1.2"/>
      <path d="M12 20 H28" stroke="#3BA3E8" strokeWidth="1" opacity="0.6"/>
      <path d="M20 12 V28" stroke="#3BA3E8" strokeWidth="1" opacity="0.6"/>
      <circle cx="20" cy="20" r="3" fill="rgba(59,163,232,0.2)" stroke="#3BA3E8" strokeWidth="1"/>
    </svg>
  ),
  data: (
    <svg viewBox="0 0 40 40" fill="none" className="w-8 h-8">
      <path d="M6 32 L6 20 L14 20 L14 32" stroke="#3BA3E8" strokeWidth="1.2"/>
      <path d="M16 32 L16 14 L24 14 L24 32" stroke="#3BA3E8" strokeWidth="1.2"/>
      <path d="M26 32 L26 8 L34 8 L34 32" stroke="#3BA3E8" strokeWidth="1.2"/>
      <path d="M4 32 H36" stroke="#3BA3E8" strokeWidth="1"/>
      <path d="M8 20 L18 14 L26 10 L34 10" stroke="#3BA3E8" strokeWidth="0.8" strokeDasharray="2 2" opacity="0.5"/>
      <circle cx="34" cy="10" r="2" fill="#3BA3E8" opacity="0.8"/>
    </svg>
  ),
  mobile: (
    <svg viewBox="0 0 40 40" fill="none" className="w-8 h-8">
      <rect x="12" y="4" width="16" height="32" rx="3" stroke="#3BA3E8" strokeWidth="1.2"/>
      <path d="M17 8 H23" stroke="#3BA3E8" strokeWidth="1.2" strokeLinecap="round"/>
      <circle cx="20" cy="33" r="1.5" stroke="#3BA3E8" strokeWidth="1"/>
      <rect x="15" y="12" width="10" height="14" rx="1" fill="rgba(59,163,232,0.1)" stroke="#3BA3E8" strokeWidth="0.6"/>
      <path d="M17 15 H23 M17 18 H21 M17 21 H23" stroke="#3BA3E8" strokeWidth="0.6" opacity="0.6"/>
    </svg>
  ),
};

function ServiceCard({ service, index }: { service: typeof SERVICES[0]; index: number }) {
  const ref = useRef<HTMLDivElement>(null);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.6, delay: index * 0.08, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ rotateX: -4, rotateY: 4, scale: 1.02 }}
      style={{ perspective: 800, transformStyle: 'preserve-3d' }}
      className="card-glow bg-[#0D1B2A]/60 backdrop-blur-sm p-6 flex flex-col gap-4 cursor-none"
    >
      {/* Top accent line */}
      <div className="h-px w-full bg-gradient-to-r from-[#3BA3E8]/60 via-[#3BA3E8]/20 to-transparent -mt-6 -mx-6 w-[calc(100%+48px)]" />

      <div className="flex items-start gap-4 mt-2">
        <div className="shrink-0 p-2 border border-[#3BA3E8]/20 bg-[#3BA3E8]/5">
          {ICONS[service.icon]}
        </div>
        <div className="flex flex-col gap-2">
          <h3
            className="text-sm font-semibold text-white leading-snug"
            style={{ fontFamily: 'var(--font-orbitron)' }}
          >
            {service.title}
          </h3>
          <p className="text-sm text-slate-400 leading-relaxed">{service.description}</p>
        </div>
      </div>

      {/* Bottom label */}
      <div
        className="text-[10px] text-[#3BA3E8]/40 tracking-[0.25em] mt-auto"
        style={{ fontFamily: 'var(--font-ibm-plex-mono)' }}
      >
        SVC_{String(index + 1).padStart(2, '0')}
      </div>
    </motion.div>
  );
}

export default function Services() {
  const titleRef = useRef<HTMLDivElement>(null);
  const inView = useInView(titleRef, { once: true, margin: '-80px' });

  return (
    <section id="services" className="py-24 relative">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div ref={titleRef} className="mb-16">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.5 }}
            className="flex items-center gap-3 mb-4"
          >
            <span className="h-px w-12 bg-[#3BA3E8]/50" />
            <span
              className="text-xs text-[#3BA3E8] tracking-[0.3em] uppercase"
              style={{ fontFamily: 'var(--font-ibm-plex-mono)' }}
            >
              CAPABILITIES
            </span>
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-3xl sm:text-4xl font-bold text-white"
            style={{ fontFamily: 'var(--font-orbitron)' }}
          >
            What We Build
          </motion.h2>
        </div>

        {/* Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-px bg-[#3BA3E8]/10">
          {SERVICES.map((service, i) => (
            <div key={service.id} className="bg-[#080F17]">
              <ServiceCard service={service} index={i} />
            </div>
          ))}
        </div>
      </div>

      {/* PCB divider */}
      <div className="mt-24 pcb-divider" aria-hidden="true">
        <svg viewBox="0 0 1440 24" fill="none" className="w-full">
          <path d="M0 12 H300 L320 4 H480 L500 12 H740 L760 20 H920 L940 12 H1140 L1160 4 H1300 L1320 12 H1440"
            stroke="rgba(59,163,232,0.2)" strokeWidth="1" fill="none"/>
          <circle cx="300" cy="12" r="2" fill="rgba(59,163,232,0.35)"/>
          <circle cx="740" cy="12" r="2" fill="rgba(59,163,232,0.35)"/>
          <circle cx="1140" cy="12" r="2" fill="rgba(59,163,232,0.35)"/>
        </svg>
      </div>
    </section>
  );
}
