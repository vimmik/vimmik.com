'use client';

import { useRef } from 'react';
import { motion, useInView, type Variants } from 'framer-motion';
import FalconSVG from './FalconSVG';

/* Blueprint grid background SVG */
function BlueprintGrid() {
  return (
    <svg
      className="absolute inset-0 w-full h-full opacity-[0.04]"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <defs>
        <pattern id="bp-small" width="20" height="20" patternUnits="userSpaceOnUse">
          <path d="M 20 0 L 0 0 0 20" fill="none" stroke="#3BA3E8" strokeWidth="0.5"/>
        </pattern>
        <pattern id="bp-large" width="100" height="100" patternUnits="userSpaceOnUse">
          <rect width="100" height="100" fill="url(#bp-small)"/>
          <path d="M 100 0 L 0 0 0 100" fill="none" stroke="#3BA3E8" strokeWidth="1"/>
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#bp-large)"/>
    </svg>
  );
}


const PILLARS = [
  { label: 'PRECISION', desc: 'Every line of code is deliberate — no waste, no shortcuts.' },
  { label: 'VELOCITY', desc: 'We move fast without sacrificing quality or stability.' },
  { label: 'ALTITUDE', desc: 'We build for the long game — systems that outlast trends.' },
];

export default function About() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  const containerVariants: Variants = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.12 } },
  };
  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 24 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' as const } },
  };

  return (
    <section id="about" className="py-24 relative overflow-hidden">
      <BlueprintGrid />

      <div className="relative z-10 max-w-7xl mx-auto px-6">
        {/* Header */}
        <div ref={ref} className="mb-16">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.5 }}
            className="flex items-center gap-3 mb-4"
          >
            <span className="h-px w-12 bg-sky/50" />
            <span
              className="text-xs text-sky tracking-[0.3em] uppercase"
              style={{ fontFamily: 'var(--font-ibm-plex-mono)' }}
            >
              WHO WE ARE
            </span>
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-3xl sm:text-4xl font-bold text-white"
            style={{ fontFamily: 'var(--font-orbitron)' }}
          >
            About VIMMIK
          </motion.h2>
        </div>

        {/* 61.8 / 38.2 golden ratio split */}
        <div className="grid lg:grid-cols-[61.8fr_38.2fr] gap-16 items-start">

          {/* Left — text */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-60px' }}
            className="flex flex-col gap-8"
          >
            <motion.p variants={itemVariants} className="text-lg text-slate-300 leading-relaxed">
              VIMMIK is a Sri Lankan software engineering company specialising in enterprise-grade solutions
              that power business operations at scale. Founded on the principle that software should be
              as reliable as it is innovative, we partner with organisations to build the systems their
              futures depend on.
            </motion.p>

            {/* Falcon quote */}
            <motion.blockquote
              variants={itemVariants}
              className="border-l-2 border-sky/60 pl-6 py-2"
            >
              <p className="text-xl text-white font-medium leading-relaxed italic">
                "Like the falcon — the fastest animal on earth — we deliver with
                unmatched speed and precision."
              </p>
              <footer
                className="mt-3 text-xs text-sky/60 tracking-[0.2em]"
                style={{ fontFamily: 'var(--font-ibm-plex-mono)' }}
              >
                — THE VIMMIK PRINCIPLE
              </footer>
            </motion.blockquote>

            <motion.p variants={itemVariants} className="text-slate-400 leading-relaxed">
              The falcon is not merely our symbol — it is our operating philosophy. The Peregrine Falcon
              reaches 390 km/h in a dive, combining aerodynamic engineering with biological precision.
              We apply that same fusion of structure and speed to every platform we ship.
            </motion.p>

            {/* Pillars */}
            <motion.div variants={itemVariants} className="grid sm:grid-cols-3 gap-4">
              {PILLARS.map((p) => (
                <div
                  key={p.label}
                  className="p-4 border border-sky/15 bg-navy/40"
                >
                  <div
                    className="text-xs font-bold text-sky tracking-[0.25em] mb-2"
                    style={{ fontFamily: 'var(--font-orbitron)' }}
                  >
                    {p.label}
                  </div>
                  <p className="text-xs text-slate-500 leading-relaxed">{p.desc}</p>
                </div>
              ))}
            </motion.div>
          </motion.div>

          {/* Right — falcon */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
            className="relative flex items-center justify-center falcon-float"
            style={{
              background: 'radial-gradient(ellipse 60% 70% at center, rgba(59,163,232,0.08) 0%, transparent 70%)',
            }}
          >
            <FalconSVG size={380} />

            {/* Phi label */}
            <div
              className="absolute bottom-0 right-0 text-[10px] text-sky/25 tracking-[0.3em]"
              style={{ fontFamily: 'var(--font-ibm-plex-mono)' }}
            >
              φ = 1.6180339887...
            </div>
          </motion.div>
        </div>
      </div>

      {/* PCB divider */}
      <div className="mt-24 pcb-divider" aria-hidden="true">
        <svg viewBox="0 0 1440 24" fill="none" className="w-full">
          <path d="M0 12 H220 L240 4 H420 L440 12 H700 L720 20 H860 L880 12 H1080 L1100 4 H1260 L1280 12 H1440"
            stroke="rgba(59,163,232,0.2)" strokeWidth="1"/>
          <circle cx="220" cy="12" r="2" fill="rgba(59,163,232,0.35)"/>
          <circle cx="700" cy="12" r="2" fill="rgba(59,163,232,0.35)"/>
          <circle cx="1080" cy="12" r="2" fill="rgba(59,163,232,0.35)"/>
        </svg>
      </div>
    </section>
  );
}
