'use client';

import { useState } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import { useRef } from 'react';
import { CONTACT_PROJECT_TYPES, CONTACT_INFO } from '@/lib/constants';

const CONTACT_ICONS: Record<string, React.ReactNode> = {
  email: (
    <svg viewBox="0 0 20 20" fill="none" className="w-5 h-5">
      <rect x="2" y="4" width="16" height="12" rx="2" stroke="#3BA3E8" strokeWidth="1.2"/>
      <path d="M2 7 L10 12 L18 7" stroke="#3BA3E8" strokeWidth="1.2"/>
    </svg>
  ),
  phone: (
    <svg viewBox="0 0 20 20" fill="none" className="w-5 h-5">
      <path d="M4 3 Q4 3 6 3 L7 7 L5 8.5 C5.5 10 8 14.5 10 15 L11.5 13 L15.5 14 Q16 16 16 16 Q16 17 14 17 Q6 16 3 8 Q3 3 4 3Z"
        stroke="#3BA3E8" strokeWidth="1.2" strokeLinejoin="round"/>
    </svg>
  ),
  location: (
    <svg viewBox="0 0 20 20" fill="none" className="w-5 h-5">
      <path d="M10 2 C7 2 4 4.5 4 8 C4 13 10 18 10 18 C10 18 16 13 16 8 C16 4.5 13 2 10 2Z"
        stroke="#3BA3E8" strokeWidth="1.2"/>
      <circle cx="10" cy="8" r="2.5" stroke="#3BA3E8" strokeWidth="1"/>
    </svg>
  ),
};

function SignalWave() {
  return (
    <div className="relative flex items-center justify-center w-20 h-20">
      <div className="absolute w-6 h-6 rounded-full bg-[#3BA3E8]/20 border border-[#3BA3E8]/40" />
      <div className="ripple-ring absolute w-6 h-6 rounded-full border border-[#3BA3E8]/40" />
      <div className="ripple-ring absolute w-6 h-6 rounded-full border border-[#3BA3E8]/30" />
      <div className="ripple-ring absolute w-6 h-6 rounded-full border border-[#3BA3E8]/20" />
      <div className="w-2 h-2 rounded-full bg-[#3BA3E8] z-10" />
    </div>
  );
}

interface FormState {
  name: string;
  email: string;
  company: string;
  projectType: string;
  message: string;
}

type Status = 'idle' | 'loading' | 'success' | 'error';

const INPUT_BASE =
  'w-full bg-[#0D1B2A]/60 border border-[#3BA3E8]/20 text-slate-200 text-sm px-4 py-3 outline-none focus:border-[#3BA3E8]/60 focus:bg-[#3BA3E8]/5 transition-all duration-200 placeholder:text-slate-600 cursor-none';

export default function Contact() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  const [form, setForm] = useState<FormState>({
    name: '', email: '', company: '', projectType: '', message: '',
  });
  const [status, setStatus] = useState<Status>('idle');

  const update = (field: keyof FormState) => (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => setForm((prev) => ({ ...prev, [field]: e.target.value }));

  const handleSubmit = () => {
    if (!form.name || !form.email || !form.message) {
      setStatus('error');
      return;
    }
    setStatus('loading');
    setTimeout(() => {
      setStatus('success');
      setForm({ name: '', email: '', company: '', projectType: '', message: '' });
    }, 1400);
  };

  return (
    <section id="contact" className="py-24 relative">
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
              INITIATE
            </span>
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-3xl sm:text-4xl font-bold text-white"
            style={{ fontFamily: 'var(--font-orbitron)' }}
          >
            Start Your Project
          </motion.h2>
        </div>

        <div className="grid lg:grid-cols-[61.8fr_38.2fr] gap-16">

          {/* Left — form */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="flex flex-col gap-5"
          >
            <div className="grid sm:grid-cols-2 gap-4">
              <div className="flex flex-col gap-1.5">
                <label
                  className="text-xs text-slate-500 tracking-[0.2em]"
                  style={{ fontFamily: 'var(--font-ibm-plex-mono)' }}
                >
                  NAME *
                </label>
                <input
                  type="text"
                  value={form.name}
                  onChange={update('name')}
                  placeholder="John Smith"
                  className={INPUT_BASE}
                  style={{ fontFamily: 'var(--font-dm-sans)' }}
                />
              </div>
              <div className="flex flex-col gap-1.5">
                <label
                  className="text-xs text-slate-500 tracking-[0.2em]"
                  style={{ fontFamily: 'var(--font-ibm-plex-mono)' }}
                >
                  EMAIL *
                </label>
                <input
                  type="email"
                  value={form.email}
                  onChange={update('email')}
                  placeholder="you@company.com"
                  className={INPUT_BASE}
                  style={{ fontFamily: 'var(--font-dm-sans)' }}
                />
              </div>
            </div>

            <div className="grid sm:grid-cols-2 gap-4">
              <div className="flex flex-col gap-1.5">
                <label
                  className="text-xs text-slate-500 tracking-[0.2em]"
                  style={{ fontFamily: 'var(--font-ibm-plex-mono)' }}
                >
                  COMPANY
                </label>
                <input
                  type="text"
                  value={form.company}
                  onChange={update('company')}
                  placeholder="Acme Corporation"
                  className={INPUT_BASE}
                  style={{ fontFamily: 'var(--font-dm-sans)' }}
                />
              </div>
              <div className="flex flex-col gap-1.5">
                <label
                  className="text-xs text-slate-500 tracking-[0.2em]"
                  style={{ fontFamily: 'var(--font-ibm-plex-mono)' }}
                >
                  PROJECT TYPE
                </label>
                <select
                  value={form.projectType}
                  onChange={update('projectType')}
                  className={`${INPUT_BASE} appearance-none`}
                  style={{ fontFamily: 'var(--font-dm-sans)' }}
                >
                  <option value="" className="bg-[#0D1B2A]">Select a type</option>
                  {CONTACT_PROJECT_TYPES.map((t) => (
                    <option key={t} value={t} className="bg-[#0D1B2A]">{t}</option>
                  ))}
                </select>
              </div>
            </div>

            <div className="flex flex-col gap-1.5">
              <label
                className="text-xs text-slate-500 tracking-[0.2em]"
                style={{ fontFamily: 'var(--font-ibm-plex-mono)' }}
              >
                MESSAGE *
              </label>
              <textarea
                value={form.message}
                onChange={update('message')}
                placeholder="Describe your project, goals, and timeline..."
                rows={5}
                className={`${INPUT_BASE} resize-none`}
                style={{ fontFamily: 'var(--font-dm-sans)' }}
              />
            </div>

            {/* Error */}
            <AnimatePresence>
              {status === 'error' && (
                <motion.p
                  initial={{ opacity: 0, y: -8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className="text-xs text-red-400/80"
                  style={{ fontFamily: 'var(--font-ibm-plex-mono)' }}
                >
                  // Please fill in name, email, and message.
                </motion.p>
              )}
            </AnimatePresence>

            {/* Submit */}
            <AnimatePresence mode="wait">
              {status === 'success' ? (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex items-center gap-3 text-sm text-[#3BA3E8] border border-[#3BA3E8]/30 bg-[#3BA3E8]/5 px-5 py-3"
                  style={{ fontFamily: 'var(--font-ibm-plex-mono)' }}
                >
                  <svg viewBox="0 0 20 20" fill="none" className="w-5 h-5 shrink-0">
                    <circle cx="10" cy="10" r="8" stroke="#3BA3E8" strokeWidth="1.2"/>
                    <path d="M6 10 L9 13 L14 7" stroke="#3BA3E8" strokeWidth="1.5" strokeLinecap="round"/>
                  </svg>
                  Transmission received. We&apos;ll be in touch shortly.
                </motion.div>
              ) : (
                <motion.div key="btn">
                  <div
                    onClick={status !== 'loading' ? handleSubmit : undefined}
                    className={`inline-flex items-center gap-3 px-6 py-3 text-sm font-semibold transition-all duration-200 cursor-none ${
                      status === 'loading'
                        ? 'bg-[#3BA3E8]/50 text-[#080F17]/70 cursor-not-allowed'
                        : 'bg-[#3BA3E8] hover:bg-[#2d8fd4] text-[#080F17]'
                    }`}
                    style={{ fontFamily: 'var(--font-ibm-plex-mono)' }}
                  >
                    {status === 'loading' ? (
                      <>
                        <motion.span
                          animate={{ rotate: 360 }}
                          transition={{ duration: 0.8, repeat: Infinity, ease: 'linear' }}
                          className="inline-block w-4 h-4 border-2 border-[#080F17]/30 border-t-[#080F17] rounded-full"
                        />
                        Transmitting...
                      </>
                    ) : (
                      'Send Message →'
                    )}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>

          {/* Right — contact info + signal */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.7, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
            className="flex flex-col gap-8"
          >
            {/* Signal wave */}
            <div className="flex items-center gap-6">
              <SignalWave />
              <div>
                <div
                  className="text-xs text-[#3BA3E8]/60 tracking-[0.25em] mb-1"
                  style={{ fontFamily: 'var(--font-ibm-plex-mono)' }}
                >
                  TRANSMISSION READY
                </div>
                <p className="text-sm text-slate-400">
                  Our team responds within 24 hours on business days.
                </p>
              </div>
            </div>

            {/* Contact cards */}
            <div className="flex flex-col gap-3">
              {CONTACT_INFO.map((info) => (
                <div
                  key={info.label}
                  className="flex items-center gap-4 p-4 border border-[#3BA3E8]/15 bg-[#0D1B2A]/40"
                >
                  <div className="shrink-0">{CONTACT_ICONS[info.icon]}</div>
                  <div>
                    <div
                      className="text-[10px] text-[#3BA3E8]/50 tracking-[0.25em] mb-0.5"
                      style={{ fontFamily: 'var(--font-ibm-plex-mono)' }}
                    >
                      {info.label.toUpperCase()}
                    </div>
                    <div className="text-sm text-slate-300">{info.value}</div>
                  </div>
                </div>
              ))}
            </div>

            {/* Tagline */}
            <div
              className="text-xs text-[#3BA3E8]/25 tracking-[0.2em] leading-relaxed border-t border-[#3BA3E8]/10 pt-6"
              style={{ fontFamily: 'var(--font-ibm-plex-mono)' }}
            >
              VIMMIK // SRI LANKA<br/>
              FOR YOUR SMART FUTURE<br/>
              EST. COLOMBO
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
