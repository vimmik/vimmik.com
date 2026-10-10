'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { PROJECTS, GITHUB_ORG_URL, type Project } from '@/lib/constants';

/* Unique geometric placeholder visual per project */
function ProjectVisual({ id, accent }: { id: string; accent: string }) {
  if (id === 'kotasa') {
    return (
      <svg viewBox="0 0 320 180" fill="none" preserveAspectRatio="xMidYMid slice" className="w-full h-full" aria-hidden="true">
        <rect width="320" height="180" fill="#0A1A33"/>
        {/* Grid */}
        {[0,40,80,120,160,200,240,280,320].map(x => (
          <line key={x} x1={x} y1="0" x2={x} y2="180" stroke="rgba(0,148,238,0.06)" strokeWidth="1"/>
        ))}
        {[0,36,72,108,144,180].map(y => (
          <line key={y} x1="0" y1={y} x2="320" y2={y} stroke="rgba(0,148,238,0.06)" strokeWidth="1"/>
        ))}
        {/* Split: one bill fanning out to members, netted into a single settlement */}
        <rect x="40" y="70" width="56" height="40" rx="2" stroke={accent} strokeWidth="1" fill="rgba(0,148,238,0.08)"/>
        <line x1="50" y1="84" x2="86" y2="84" stroke={accent} strokeWidth="1" opacity="0.6"/>
        <line x1="50" y1="94" x2="76" y2="94" stroke={accent} strokeWidth="1" opacity="0.4"/>
        {[46,90,134].map((cy, i) => (
          <g key={i}>
            <path d={`M96 90 C130 90 140 ${cy} 172 ${cy}`} stroke={accent} strokeWidth="1" strokeDasharray="4 3" opacity="0.45"/>
            <circle cx="182" cy={cy} r="10" stroke={accent} strokeWidth="1" fill="rgba(0,148,238,0.12)"/>
          </g>
        ))}
        <path d="M192 46 C230 46 230 90 252 90 M192 134 C230 134 230 90 252 90 M192 90 H252" stroke={accent} strokeWidth="1" opacity="0.35"/>
        <rect x="252" y="78" width="40" height="24" rx="2" stroke={accent} strokeWidth="1" fill="rgba(0,148,238,0.18)"/>
        <path d="M262 90 L269 97 L282 83" stroke={accent} strokeWidth="1.5" strokeLinecap="round"/>
      </svg>
    );
  }
  // medichainlk
  return (
    <svg viewBox="0 0 320 180" fill="none" preserveAspectRatio="xMidYMid slice" className="w-full h-full" aria-hidden="true">
      <rect width="320" height="180" fill="#0A1A33"/>
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
      <rect x="276" y="44" width="40" height="12" rx="1" fill="none" stroke="rgba(76,205,196,0.5)" strokeWidth="1"/>
      <rect x="290" y="30" width="12" height="40" rx="1" fill="none" stroke="rgba(76,205,196,0.5)" strokeWidth="1"/>
    </svg>
  );
}

function ProjectCard({ project, index }: { project: Project; index: number }) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.65, delay: index * 0.1, ease: [0.22, 1, 0.36, 1] }}
      className="card-glow bg-[#0A1A33]/60 flex flex-col overflow-hidden h-full"
      style={{ '--accent': project.accent } as React.CSSProperties}
    >
      {/* Visual */}
      <div className="relative h-44 overflow-hidden">
        <ProjectVisual id={project.id} accent={project.accent} />
        <span
          className="absolute top-3 left-4 z-10 text-[10px] tracking-[0.15em]"
          style={{ fontFamily: 'var(--font-ibm-plex-mono)', color: project.accent, opacity: 0.75 }}
        >
          {project.label}
        </span>
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-[#0A1A33]/60" />
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
              className="text-[11px] px-2.5 py-0.5 border border-[#0094EE]/20 text-[#0094EE]/70"
              style={{ fontFamily: 'var(--font-ibm-plex-mono)' }}
            >
              {tag}
            </span>
          ))}
        </div>

        {/* Links */}
        {project.links.length > 0 && (
          <div className="mt-auto pt-2 flex flex-wrap gap-x-6 gap-y-2">
            {project.links.map((link) => (
              <a
                key={link.href}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center gap-2 text-xs text-slate-400 hover:text-white transition-colors duration-200"
                style={{ fontFamily: 'var(--font-ibm-plex-mono)' }}
              >
                <span
                  className="h-px w-6 transition-all duration-300 group-hover:w-10"
                  style={{ background: project.accent }}
                />
                {link.label}
                <span aria-hidden="true">↗</span>
                <span className="sr-only">(opens in a new tab)</span>
              </a>
            ))}
          </div>
        )}
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
            <span className="h-px w-12 bg-[#0094EE]/50" />
            <span
              className="text-xs text-[#0094EE] tracking-[0.3em] uppercase"
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
          <motion.a
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            href={GITHUB_ORG_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block mt-4 text-xs text-slate-400 hover:text-[#0094EE] transition-colors"
            style={{ fontFamily: 'var(--font-ibm-plex-mono)' }}
          >
            {'// github.com/vimmik ↗'}
          </motion.a>
        </div>

        <div className="grid md:grid-cols-2 gap-px bg-[#0094EE]/8">
          {PROJECTS.map((project, i) => (
            <div
              key={project.id}
              /* An odd last card spans the full row in the 2-column layout so the grid has no hole */
              className={`bg-[#050C1A] ${i === PROJECTS.length - 1 && PROJECTS.length % 2 === 1 ? 'md:col-span-2' : ''}`}
            >
              <ProjectCard project={project} index={i} />
            </div>
          ))}
        </div>
      </div>

      {/* PCB divider */}
      <div className="mt-24 pcb-divider" aria-hidden="true">
        <svg viewBox="0 0 1440 24" fill="none" className="w-full">
          <path d="M0 12 H250 L270 20 H450 L470 12 H720 L740 4 H900 L920 12 H1150 L1170 20 H1340 L1360 12 H1440"
            stroke="rgba(0,148,238,0.2)" strokeWidth="1"/>
          <circle cx="250" cy="12" r="2" fill="rgba(0,148,238,0.35)"/>
          <circle cx="720" cy="12" r="2" fill="rgba(0,148,238,0.35)"/>
          <circle cx="1150" cy="12" r="2" fill="rgba(0,148,238,0.35)"/>
        </svg>
      </div>
    </section>
  );
}
