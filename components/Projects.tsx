'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { PROJECTS } from '@/lib/constants';

/* Unique geometric placeholder visual per project */
function ProjectVisual({ id, accent }: { id: string; accent: string }) {
  if (id === 'agrierp') {
    return (
      <svg viewBox="0 0 320 180" fill="none" className="w-full h-full" aria-hidden="true">
        {/* Terrain / estate contour lines */}
        <rect width="320" height="180" fill="#0D1B2A"/>
        <path d="M0 140 Q40 120 80 130 Q120 140 160 110 Q200 80 240 90 Q280 100 320 80 L320 180 L0 180Z" fill="rgba(59,163,232,0.06)"/>
        <path d="M0 155 Q60 135 110 145 Q160 155 200 125 Q240 95 280 108 Q300 115 320 100 L320 180 L0 180Z" fill="rgba(59,163,232,0.04)"/>
        {/* Grid */}
        {[0,40,80,120,160,200,240,280,320].map(x => (
          <line key={x} x1={x} y1="0" x2={x} y2="180" stroke="rgba(59,163,232,0.06)" strokeWidth="1"/>
        ))}
        {[0,36,72,108,144,180].map(y => (
          <line key={y} x1="0" y1={y} x2="320" y2={y} stroke="rgba(59,163,232,0.06)" strokeWidth="1"/>
        ))}
        {/* Data points */}
        {[[80,130],[160,110],[240,90],[40,120]].map(([cx,cy],i) => (
          <circle key={i} cx={cx} cy={cy} r="3" fill={accent} opacity="0.7"/>
        ))}
        <path d="M40 120 L80 130 L160 110 L240 90" stroke={accent} strokeWidth="1" strokeDasharray="4 3" opacity="0.4"/>
        {/* Label */}
        <text x="12" y="20" fill="rgba(59,163,232,0.4)" fontSize="9" fontFamily="monospace">AGRIERP // ESTATE MGMT</text>
      </svg>
    );
  }
  if (id === 'pharmacare') {
    return (
      <svg viewBox="0 0 320 180" fill="none" className="w-full h-full" aria-hidden="true">
        <rect width="320" height="180" fill="#0D1B2A"/>
        {/* Grid */}
        {[0,40,80,120,160,200,240,280,320].map(x => (
          <line key={x} x1={x} y1="0" x2={x} y2="180" stroke="rgba(76,205,196,0.06)" strokeWidth="1"/>
        ))}
        {[0,36,72,108,144,180].map(y => (
          <line key={y} x1="0" y1={y} x2="320" y2={y} stroke="rgba(76,205,196,0.06)" strokeWidth="1"/>
        ))}
        {/* Bar chart */}
        {[[60,60],[100,100],[140,40],[180,90],[220,70],[260,120]].map(([x,h],i) => (
          <rect key={i} x={x-12} y={140-h} width="24" height={h} fill={`rgba(76,205,196,${0.1 + i*0.04})`} stroke="rgba(76,205,196,0.4)" strokeWidth="0.8"/>
        ))}
        {/* Pharmacy cross */}
        <rect x="140" y="30" width="40" height="12" rx="1" fill="none" stroke="rgba(76,205,196,0.5)" strokeWidth="1"/>
        <rect x="154" y="16" width="12" height="40" rx="1" fill="none" stroke="rgba(76,205,196,0.5)" strokeWidth="1"/>
        <text x="12" y="20" fill="rgba(76,205,196,0.4)" fontSize="9" fontFamily="monospace">PHARMACARE // SAAS</text>
      </svg>
    );
  }
  // retailpos
  return (
    <svg viewBox="0 0 320 180" fill="none" className="w-full h-full" aria-hidden="true">
      <rect width="320" height="180" fill="#0D1B2A"/>
      {/* Grid */}
      {[0,40,80,120,160,200,240,280,320].map(x => (
        <line key={x} x1={x} y1="0" x2={x} y2="180" stroke="rgba(168,85,247,0.06)" strokeWidth="1"/>
      ))}
      {[0,36,72,108,144,180].map(y => (
        <line key={y} x1="0" y1={y} x2="320" y2={y} stroke="rgba(168,85,247,0.06)" strokeWidth="1"/>
      ))}
      {/* Barcode lines */}
      {[60,64,70,73,79,84,88,94,97,101,107,110,116,120,124].map((x,i) => (
        <rect key={i} x={x} y="60" width={i % 3 === 0 ? 3 : 1.5} height={i % 5 === 0 ? 60 : 50} fill={`rgba(168,85,247,${0.3 + (i%3)*0.1})`}/>
      ))}
      {/* POS terminal */}
      <rect x="180" y="50" width="90" height="70" rx="3" stroke="rgba(168,85,247,0.4)" strokeWidth="1" fill="rgba(168,85,247,0.05)"/>
      <rect x="192" y="60" width="66" height="40" rx="1" stroke="rgba(168,85,247,0.3)" strokeWidth="0.8"/>
      <rect x="205" y="108" width="40" height="6" rx="1" fill="rgba(168,85,247,0.3)"/>
      <text x="12" y="20" fill="rgba(168,85,247,0.4)" fontSize="9" fontFamily="monospace">RETAILPOS // MULTI-BRANCH</text>
    </svg>
  );
}

function ProjectCard({ project, index }: { project: typeof PROJECTS[0]; index: number }) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.65, delay: index * 0.1, ease: [0.22, 1, 0.36, 1] }}
      className="card-glow bg-[#0D1B2A]/60 flex flex-col overflow-hidden cursor-none"
      style={{ '--accent': project.accent } as React.CSSProperties}
    >
      {/* Visual */}
      <div className="relative h-44 overflow-hidden">
        <ProjectVisual id={project.id} accent={project.accent} />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-[#0D1B2A]/60" />
        {/* Top accent border */}
        <div
          className="absolute top-0 left-0 right-0 h-px"
          style={{ background: `linear-gradient(90deg, ${project.accent}90, transparent)` }}
        />
      </div>

      {/* Content */}
      <div className="p-6 flex flex-col gap-4 flex-1">
        <div>
          <h3
            className="text-lg font-bold text-white mb-2"
            style={{ fontFamily: 'var(--font-orbitron)' }}
          >
            {project.title}
          </h3>
          <p className="text-sm text-slate-400 leading-relaxed">{project.description}</p>
        </div>

        {/* Tags */}
        <div className="flex flex-wrap gap-2">
          {project.tags.map((tag) => (
            <span
              key={tag}
              className="text-[11px] px-2.5 py-0.5 border border-[#3BA3E8]/20 text-[#3BA3E8]/70"
              style={{ fontFamily: 'var(--font-ibm-plex-mono)' }}
            >
              {tag}
            </span>
          ))}
        </div>

        {/* CTA */}
        <div className="mt-auto pt-2">
          <button
            className="group flex items-center gap-2 text-xs text-slate-400 hover:text-white transition-colors duration-200 cursor-none"
            style={{ fontFamily: 'var(--font-ibm-plex-mono)' }}
          >
            <span
              className="h-px w-6 transition-all duration-300 group-hover:w-10"
              style={{ background: project.accent }}
            />
            View Case Study
            <motion.span
              className="inline-block"
              animate={{ x: [0, 3, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            >
              →
            </motion.span>
          </button>
        </div>
      </div>
    </motion.article>
  );
}

export default function Projects() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section id="projects" className="py-24">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div ref={ref} className="mb-16">
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
              FEATURED WORK
            </span>
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-3xl sm:text-4xl font-bold text-white"
            style={{ fontFamily: 'var(--font-orbitron)' }}
          >
            Our Work
          </motion.h2>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-px bg-[#3BA3E8]/8">
          {PROJECTS.map((project, i) => (
            <div key={project.id} className="bg-[#080F17]">
              <ProjectCard project={project} index={i} />
            </div>
          ))}
        </div>
      </div>

      {/* PCB divider */}
      <div className="mt-24 pcb-divider" aria-hidden="true">
        <svg viewBox="0 0 1440 24" fill="none" className="w-full">
          <path d="M0 12 H250 L270 20 H450 L470 12 H720 L740 4 H900 L920 12 H1150 L1170 20 H1340 L1360 12 H1440"
            stroke="rgba(59,163,232,0.2)" strokeWidth="1"/>
          <circle cx="250" cy="12" r="2" fill="rgba(59,163,232,0.35)"/>
          <circle cx="720" cy="12" r="2" fill="rgba(59,163,232,0.35)"/>
          <circle cx="1150" cy="12" r="2" fill="rgba(59,163,232,0.35)"/>
        </svg>
      </div>
    </section>
  );
}
