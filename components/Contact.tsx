'use client';

import { useRef, useState } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import { CONTACT_PROJECT_TYPES, CONTACT_INFO, CONTACT_EMAIL, SOCIAL_LINKS } from '@/lib/constants';
import { SocialIcon } from './SocialIcon';

const CONTACT_ICONS: Record<string, React.ReactNode> = {
  email: (
    <svg viewBox="0 0 20 20" fill="none" className="w-5 h-5">
      <rect x="2" y="4" width="16" height="12" rx="2" stroke="#0094EE" strokeWidth="1.2"/>
      <path d="M2 7 L10 12 L18 7" stroke="#0094EE" strokeWidth="1.2"/>
    </svg>
  ),
  phone: (
    <svg viewBox="0 0 20 20" fill="none" className="w-5 h-5">
      <path d="M4 3 Q4 3 6 3 L7 7 L5 8.5 C5.5 10 8 14.5 10 15 L11.5 13 L15.5 14 Q16 16 16 16 Q16 17 14 17 Q6 16 3 8 Q3 3 4 3Z"
        stroke="#0094EE" strokeWidth="1.2" strokeLinejoin="round"/>
    </svg>
  ),
  location: (
    <svg viewBox="0 0 20 20" fill="none" className="w-5 h-5">
      <path d="M10 2 C7 2 4 4.5 4 8 C4 13 10 18 10 18 C10 18 16 13 16 8 C16 4.5 13 2 10 2Z"
        stroke="#0094EE" strokeWidth="1.2"/>
      <circle cx="10" cy="8" r="2.5" stroke="#0094EE" strokeWidth="1"/>
    </svg>
  ),
};

function SignalWave() {
  return (
    <div className="relative flex items-center justify-center w-20 h-20">
      <div className="absolute w-6 h-6 rounded-full bg-[#0094EE]/20 border border-[#0094EE]/40" />
      <div className="ripple-ring absolute w-6 h-6 rounded-full border border-[#0094EE]/40" />
      <div className="ripple-ring absolute w-6 h-6 rounded-full border border-[#0094EE]/30" />
      <div className="ripple-ring absolute w-6 h-6 rounded-full border border-[#0094EE]/20" />
      <div className="w-2 h-2 rounded-full bg-[#0094EE] z-10" />
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

type Status = 'idle' | 'loading' | 'success' | 'mailto' | 'error';

const EMPTY_FORM: FormState = { name: '', email: '', company: '', projectType: '', message: '' };
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function mailtoHref(form: FormState) {
  const subject = `Project enquiry from ${form.name}${form.company ? ` (${form.company})` : ''}`;
  const body = [
    `Name: ${form.name}`,
    `Email: ${form.email}`,
    form.company && `Company: ${form.company}`,
    form.projectType && `Project type: ${form.projectType}`,
    '',
    form.message,
  ].filter((l) => l !== '').join('\n');
  return `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
}

const INPUT_BASE =
  'w-full bg-[#0A1A33]/60 border border-[#0094EE]/20 text-slate-200 text-sm px-4 py-3 outline-none focus:border-[#0094EE]/60 focus:bg-[#0094EE]/5 transition-all duration-200 placeholder:text-slate-600';

export default function Contact() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  const [form, setForm] = useState<FormState>(EMPTY_FORM);
  const [status, setStatus] = useState<Status>('idle');
  const [error, setError] = useState('');
  const [honeypot, setHoneypot] = useState('');

  const update = (field: keyof FormState) => (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => setForm((prev) => ({ ...prev, [field]: e.target.value }));

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (status === 'loading') return;
    if (!form.name.trim() || !form.email.trim() || !form.message.trim()) {
      setError('// Please fill in name, email, and message.');
      setStatus('error');
      return;
    }
    if (!EMAIL_RE.test(form.email.trim())) {
      setError('// Please enter a valid email address.');
      setStatus('error');
      return;
    }

    setStatus('loading');
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...form, website: honeypot }),
      });
      const json = await res.json().catch(() => ({}));
      if (res.ok) {
        setStatus('success');
        setForm(EMPTY_FORM);
        return;
      }
      if (json.fallback === 'mailto') {
        // Server can't deliver email: hand the message to the visitor's mail app instead.
        window.location.href = mailtoHref(form);
        setStatus('mailto');
        return;
      }
      setError(`// ${json.error ?? 'Something went wrong. Please try again.'}`);
      setStatus('error');
    } catch {
      setError(`// Network error. Please try again or email ${CONTACT_EMAIL}.`);
      setStatus('error');
    }
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
            <span className="h-px w-12 bg-[#0094EE]/50" />
            <span
              className="text-xs text-[#0094EE] tracking-[0.3em] uppercase"
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

          {/* Left: form */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          >
          <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-5" aria-describedby="contact-status">
            {/* Honeypot: hidden from people, tempting to bots */}
            <div className="absolute -left-[9999px]" aria-hidden="true">
              <label htmlFor="contact-website">Website</label>
              <input id="contact-website" name="website" tabIndex={-1} autoComplete="off" value={honeypot} onChange={(e) => setHoneypot(e.target.value)} />
            </div>
            <div className="grid sm:grid-cols-2 gap-4">
              <div className="flex flex-col gap-1.5">
                <label
                  htmlFor="contact-name"
                  className="text-xs text-slate-400 tracking-[0.2em]"
                  style={{ fontFamily: 'var(--font-ibm-plex-mono)' }}
                >
                  NAME <span aria-hidden="true">*</span>
                </label>
                <input
                  type="text"
                  id="contact-name"
                  name="name"
                  required
                  autoComplete="name"
                  value={form.name}
                  onChange={update('name')}
                  placeholder="John Smith"
                  className={INPUT_BASE}
                  style={{ fontFamily: 'var(--font-dm-sans)' }}
                />
              </div>
              <div className="flex flex-col gap-1.5">
                <label
                  htmlFor="contact-email"
                  className="text-xs text-slate-400 tracking-[0.2em]"
                  style={{ fontFamily: 'var(--font-ibm-plex-mono)' }}
                >
                  EMAIL <span aria-hidden="true">*</span>
                </label>
                <input
                  type="email"
                  id="contact-email"
                  name="email"
                  required
                  autoComplete="email"
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
                  htmlFor="contact-company"
                  className="text-xs text-slate-400 tracking-[0.2em]"
                  style={{ fontFamily: 'var(--font-ibm-plex-mono)' }}
                >
                  COMPANY
                </label>
                <input
                  type="text"
                  id="contact-company"
                  name="company"
                  autoComplete="organization"
                  value={form.company}
                  onChange={update('company')}
                  placeholder="Acme Corporation"
                  className={INPUT_BASE}
                  style={{ fontFamily: 'var(--font-dm-sans)' }}
                />
              </div>
              <div className="flex flex-col gap-1.5">
                <label
                  htmlFor="contact-projectType"
                  className="text-xs text-slate-400 tracking-[0.2em]"
                  style={{ fontFamily: 'var(--font-ibm-plex-mono)' }}
                >
                  PROJECT TYPE
                </label>
                <select
                  id="contact-projectType"
                  name="projectType"
                  value={form.projectType}
                  onChange={update('projectType')}
                  className={`${INPUT_BASE} appearance-none`}
                  style={{ fontFamily: 'var(--font-dm-sans)' }}
                >
                  <option value="" className="bg-[#0A1A33]">Select a type</option>
                  {CONTACT_PROJECT_TYPES.map((t) => (
                    <option key={t} value={t} className="bg-[#0A1A33]">{t}</option>
                  ))}
                </select>
              </div>
            </div>

            <div className="flex flex-col gap-1.5">
              <label
                htmlFor="contact-message"
                className="text-xs text-slate-400 tracking-[0.2em]"
                style={{ fontFamily: 'var(--font-ibm-plex-mono)' }}
              >
                MESSAGE <span aria-hidden="true">*</span>
              </label>
              <textarea
                id="contact-message"
                name="message"
                required
                  value={form.message}
                onChange={update('message')}
                placeholder="Describe your project, goals, and timeline..."
                rows={5}
                className={`${INPUT_BASE} resize-none`}
                style={{ fontFamily: 'var(--font-dm-sans)' }}
              />
            </div>

            {/* Status: announced to screen readers */}
            <div id="contact-status" role="status" aria-live="polite">
            <AnimatePresence>
              {status === 'error' && (
                <motion.p
                  initial={{ opacity: 0, y: -8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className="text-xs text-red-400/80"
                  style={{ fontFamily: 'var(--font-ibm-plex-mono)' }}
                >
                  {error}
                </motion.p>
              )}
              {status === 'mailto' && (
                <motion.p
                  initial={{ opacity: 0, y: -8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className="text-xs text-slate-300"
                  style={{ fontFamily: 'var(--font-ibm-plex-mono)' }}
                >
                  {'// Your email app should open with the message ready to send. If it didn\'t, write to '}
                  <a href={mailtoHref(form)} className="text-[#0094EE] underline">{CONTACT_EMAIL}</a>.
                </motion.p>
              )}
            </AnimatePresence>
            </div>

            {/* Submit */}
            <AnimatePresence mode="wait">
              {status === 'success' ? (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex items-center gap-3 text-sm text-[#0094EE] border border-[#0094EE]/30 bg-[#0094EE]/5 px-5 py-3"
                  style={{ fontFamily: 'var(--font-ibm-plex-mono)' }}
                >
                  <svg viewBox="0 0 20 20" fill="none" className="w-5 h-5 shrink-0">
                    <circle cx="10" cy="10" r="8" stroke="#0094EE" strokeWidth="1.2"/>
                    <path d="M6 10 L9 13 L14 7" stroke="#0094EE" strokeWidth="1.5" strokeLinecap="round"/>
                  </svg>
                  Message sent. Thank you, we&apos;ll reply by email.
                </motion.div>
              ) : (
                <motion.div key="btn">
                  <button
                    type="submit"
                    disabled={status === 'loading'}
                    className={`inline-flex items-center gap-3 px-6 py-3 text-sm font-semibold transition-all duration-200 ${
                      status === 'loading'
                        ? 'bg-[#0094EE]/50 text-[#050C1A]/70 cursor-not-allowed'
                        : 'bg-[#0094EE] hover:bg-[#0080D6] text-[#050C1A]'
                    }`}
                    style={{ fontFamily: 'var(--font-ibm-plex-mono)' }}
                  >
                    {status === 'loading' ? (
                      <>
                        <motion.span
                          animate={{ rotate: 360 }}
                          transition={{ duration: 0.8, repeat: Infinity, ease: 'linear' }}
                          className="inline-block w-4 h-4 border-2 border-[#050C1A]/30 border-t-[#050C1A] rounded-full"
                        />
                        Transmitting...
                      </>
                    ) : (
                      'Send Message →'
                    )}
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </form>
          </motion.div>

          {/* Right: contact info + signal */}
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
                  className="text-xs text-[#0094EE]/60 tracking-[0.25em] mb-1"
                  style={{ fontFamily: 'var(--font-ibm-plex-mono)' }}
                >
                  TRANSMISSION READY
                </div>
                <p className="text-sm text-slate-400">
                  We read every enquiry and reply by email.
                </p>
              </div>
            </div>

            {/* Contact cards */}
            <div className="flex flex-col gap-3">
              {CONTACT_INFO.map((info) => {
                const Tag = info.href ? 'a' : 'div';
                return (
                <Tag
                  key={info.label}
                  {...(info.href ? { href: info.href } : {})}
                  className="flex items-center gap-4 p-4 border border-[#0094EE]/15 bg-[#0A1A33]/40 transition-colors duration-200 hover:border-[#0094EE]/50"
                >
                  <div className="shrink-0">{CONTACT_ICONS[info.icon]}</div>
                  <div>
                    <div
                      className="text-[10px] text-[#0094EE]/70 tracking-[0.25em] mb-0.5"
                      style={{ fontFamily: 'var(--font-ibm-plex-mono)' }}
                    >
                      {info.label.toUpperCase()}
                    </div>
                    <div className="text-sm text-slate-300">{info.value}</div>
                  </div>
                </Tag>
                );
              })}
            </div>

            {/* Social */}
            <div className="flex flex-wrap gap-3">
              {SOCIAL_LINKS.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-3 py-2 text-xs text-slate-400 border border-[#0094EE]/15 hover:text-[#0094EE] hover:border-[#0094EE]/50 transition-colors duration-200"
                  style={{ fontFamily: 'var(--font-ibm-plex-mono)' }}
                >
                  <SocialIcon name={social.icon} size={14} />
                  {social.label}
                  <span className="sr-only">(opens in a new tab)</span>
                </a>
              ))}
            </div>

            {/* Tagline */}
            <div
              className="text-xs text-[#0094EE]/25 tracking-[0.2em] leading-relaxed border-t border-[#0094EE]/10 pt-6"
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
