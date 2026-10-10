'use client';

import { useEffect, useRef } from 'react';
import { motion, useInView, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { STATS } from '@/lib/constants';

function AnimatedNumber({ value, suffix }: { value: number; suffix: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true });
  const motionVal = useMotionValue(0);
  const spring = useSpring(motionVal, { stiffness: 60, damping: 20, restDelta: 0.01 });
  const display = useTransform(spring, (v) => {
    return Number.isInteger(value) ? Math.round(v).toString() : v.toFixed(1);
  });

  useEffect(() => {
    if (inView) motionVal.set(value);
  }, [inView, value, motionVal]);

  return (
    <span ref={ref}>
      <motion.span>{display}</motion.span>
      {suffix}
    </span>
  );
}

export default function Stats() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section className="relative py-16 bg-[#0A1A33]/50 border-y border-[#0094EE]/10 overflow-hidden">
      {/* Background grid */}
      <div
        className="absolute inset-0 opacity-5"
        aria-hidden="true"
        style={{
          backgroundImage:
            'linear-gradient(rgba(0,148,238,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(0,148,238,0.5) 1px, transparent 1px)',
          backgroundSize: '40px 40px',
        }}
      />

      <div ref={ref} className="relative z-10 max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-0 divide-x divide-[#0094EE]/15">
          {STATS.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="flex flex-col items-center text-center px-6 py-4"
            >
              <div
                className="text-4xl sm:text-5xl font-bold text-white mb-2 tabular-nums"
                style={{ fontFamily: 'var(--font-orbitron)' }}
              >
                <span className="text-[#0094EE]">
                  <AnimatedNumber value={stat.value} suffix={stat.suffix} />
                </span>
              </div>
              <div
                className="text-xs text-slate-400 tracking-[0.2em] uppercase"
                style={{ fontFamily: 'var(--font-ibm-plex-mono)' }}
              >
                {stat.label}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
