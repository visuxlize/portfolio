import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  ArrowLeft, Github, ExternalLink,
  Type, Palette, Smartphone, Target, LayoutGrid, Eye,
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const ACCENT = '#0284c7';

const fade = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] } },
};
const stagger = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.1 } },
};

function SectionLabel({ children }: { children: React.ReactNode }) {
  return <p className="text-xs font-semibold uppercase tracking-widest text-primary mb-2">{children}</p>;
}

function StatCard({ value, label, sub }: { value: string; label: string; sub?: string }) {
  return (
    <div className="card-base p-5 text-center">
      <div className="font-display text-3xl font-bold text-slate-900 dark:text-white">{value}</div>
      <div className="mt-1 text-sm font-medium text-slate-700 dark:text-slate-300">{label}</div>
      {sub && <div className="mt-1 text-xs text-slate-500">{sub}</div>}
    </div>
  );
}

function DiagramWrap({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="rounded-2xl overflow-hidden" style={{ background: '#0d1117', border: '1px solid rgba(255,255,255,0.08)' }}>
      <div className="px-6 pt-5 pb-0">
        <p style={{ color: 'rgba(255,255,255,0.25)', fontSize: '10px', fontWeight: 700, letterSpacing: '0.14em', textTransform: 'uppercase' }}>{title}</p>
      </div>
      <div className="p-6 pt-4">{children}</div>
    </div>
  );
}

const before = [
  'Single flat page — no clear service breakdown',
  'Roofing systems, wall panels, and fabrication all blended together',
  'No project gallery — no visual proof of past installations',
  'No clear "request a quote" path',
  'Not mobile-responsive',
  'No manufacturer-partner credibility signals',
];

const after = [
  'Home with hero + "Request a Quote" CTA',
  'Services split: Standing Seam Roofing, Perimeter Metal Systems, Wall Panels, Custom Fabrication',
  'Project gallery organized by region and building type',
  'Manufacturer partner strip — Drexel Metals, Pac-Clad, Versico, Una-Clad, VMZinc',
  '1 unified nav, sticky on scroll',
  'Mobile-first, fully responsive',
];

function IADiagram() {
  return (
    <DiagramWrap title="Information Architecture Overhaul">
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
        <div>
          <p className="text-[10px] font-bold uppercase tracking-widest text-rose-400 mb-3">Before — Original Site</p>
          <ul className="space-y-2">
            {before.map((b) => (
              <li key={b} className="flex items-start gap-2.5 rounded-lg border border-rose-500/20 bg-rose-500/[0.06] px-3 py-2 text-[11.5px] text-white/60 leading-snug">
                <span className="mt-1 h-1 w-1 shrink-0 rounded-full bg-rose-400" />
                {b}
              </li>
            ))}
          </ul>
        </div>
        <div>
          <p className="text-[10px] font-bold uppercase tracking-widest text-emerald-400 mb-3">After — Redesigned IA</p>
          <ul className="space-y-2">
            {after.map((a) => (
              <li key={a} className="flex items-start gap-2.5 rounded-lg border border-emerald-500/20 bg-emerald-500/[0.06] px-3 py-2 text-[11.5px] text-white/60 leading-snug">
                <span className="mt-1 h-1 w-1 shrink-0 rounded-full bg-emerald-400" />
                {a}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </DiagramWrap>
  );
}

const designDecisions = [
  { Icon: Type,       title: 'Typography',       desc: 'Proxima Nova — an industrial-clean sans-serif that stays legible at a glance for spec sheets and mobile job-site viewing.' },
  { Icon: Palette,    title: 'Color',             desc: 'Steel gray with a blue accent — institutional credibility, high contrast for outdoor and jobsite viewing conditions.' },
  { Icon: Smartphone, title: 'Mobile First',      desc: 'Most contractors and facility managers check specs and project photos on a phone, on site. The redesign starts there.' },
  { Icon: Target,     title: 'Single CTA',        desc: 'Every service page funnels to one primary action — Request a Quote. No competing CTAs.' },
  { Icon: LayoutGrid, title: 'Project Gallery',   desc: 'Real installed-project photography organized by roofing system and building type, not stock imagery.' },
  { Icon: Eye,        title: 'Accessibility',     desc: 'WCAG AA color contrast, semantic HTML, ARIA labels on all interactive elements — credibility for institutional and municipal clients.' },
];

const NCMRedesign: React.FC = () => {
  const navigate = useNavigate();
  useEffect(() => { window.scrollTo({ top: 0 }); }, []);

  return (
    <div className="min-h-screen pt-24 pb-24">
      <div className="mx-auto max-w-4xl px-6">

        <motion.button
          initial={{ opacity: 0, x: -8 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.4 }}
          onClick={() => navigate('/case-studies')}
          className="mb-10 flex items-center gap-2 text-sm text-slate-500 transition-colors hover:text-primary dark:text-slate-400"
        >
          <ArrowLeft size={15} strokeWidth={2} aria-hidden />
          Case Studies
        </motion.button>

        <motion.div initial="hidden" animate="show" variants={stagger}>
          <motion.div variants={fade}>
            <div className="mb-4 flex flex-wrap items-center gap-3">
              <span className="rounded-full px-3 py-1 text-xs font-semibold" style={{ color: ACCENT, background: `${ACCENT}1a`, border: `1px solid ${ACCENT}4d` }}>
                Design Concept
              </span>
              <span className="rounded-full border border-teal-500/40 bg-teal-950/40 px-3 py-1 text-xs font-semibold text-teal-400">Live Demo</span>
            </div>
            <SectionLabel>Case Study</SectionLabel>
            <h1 className="font-display text-4xl font-extrabold tracking-tight text-slate-900 dark:text-white md:text-5xl">
              New Castle Metal Redesign
            </h1>
            <p className="mt-4 text-lg leading-relaxed text-slate-600 dark:text-slate-400 max-w-2xl">
              A front-end redesign concept for New Castle Metal, the Northeast's metal roofing and fabrication
              provider — clearer service categorization, a real project gallery, and a single path to request
              a quote.
            </p>
            <div className="mt-6 flex flex-wrap gap-4">
              <a href="https://visuxlize.github.io/NCMRedesign/" target="_blank" rel="noopener noreferrer"
                className="flex items-center gap-2 rounded-lg px-4 py-2.5 text-sm font-semibold text-white transition-opacity hover:opacity-90"
                style={{ background: ACCENT }}>
                <ExternalLink size={15} strokeWidth={2} aria-hidden />
                View Live Demo
              </a>
              <a href="https://github.com/visuxlize/NCMRedesign" target="_blank" rel="noopener noreferrer"
                className="flex items-center gap-2 rounded-lg border border-[var(--border)] bg-[var(--card)] px-4 py-2.5 text-sm font-medium text-slate-700 transition-colors hover:border-primary/50 hover:text-primary dark:text-slate-300">
                <Github size={15} strokeWidth={2} aria-hidden />
                GitHub
              </a>
            </div>
          </motion.div>

          <motion.div variants={fade} className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-4">
            <StatCard value="5"     label="Core Pages"   sub="Redesigned" />
            <StatCard value="3"     label="User Flows"   sub="Mapped + rebuilt" />
            <StatCard value="1"     label="Unified Nav"  sub="vs 4 disconnected" />
            <StatCard value="A11y"  label="Compliant"    sub="WCAG AA target" />
          </motion.div>
        </motion.div>

        <div className="my-14 h-px bg-[var(--border)]" />

        {/* ── The Problem ── */}
        <motion.section initial="hidden" whileInView="show" viewport={{ once: true }} variants={stagger} className="mb-14">
          <motion.div variants={fade}>
            <SectionLabel>The Problem</SectionLabel>
            <h2 className="font-display text-2xl font-bold text-slate-900 dark:text-white mb-4">A trade site that didn't reflect the trade</h2>
            <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
              New Castle Metal fabricates and installs standing seam roofing, perimeter metal systems, wall
              panels, and custom fabrication work for commercial and institutional buildings across the
              Northeast — but the original site presented all of it as one undifferentiated page. Contractors
              and architects had no organized way to browse services, no project gallery to build confidence
              in the work, and no clear path to request a quote. The redesign focused on three things: clarity
              of navigation, a single conversion path, and a visual identity that earns the trust of the
              commercial clients this business actually serves.
            </p>
          </motion.div>
        </motion.section>

        <div className="my-14 h-px bg-[var(--border)]" />

        {/* ── IA Overhaul ── */}
        <motion.section initial="hidden" whileInView="show" viewport={{ once: true }} variants={stagger} className="mb-14">
          <motion.div variants={fade}>
            <SectionLabel>The Solution</SectionLabel>
            <h2 className="font-display text-2xl font-bold text-slate-900 dark:text-white mb-6">Information architecture, rebuilt around the trade</h2>
          </motion.div>
          <motion.div variants={fade}>
            <IADiagram />
          </motion.div>
        </motion.section>

        <div className="my-14 h-px bg-[var(--border)]" />

        {/* ── Design System Decisions ── */}
        <motion.section initial="hidden" whileInView="show" viewport={{ once: true }} variants={stagger} className="mb-14">
          <motion.div variants={fade}>
            <SectionLabel>Design Decisions</SectionLabel>
            <h2 className="font-display text-2xl font-bold text-slate-900 dark:text-white mb-6">Six decisions that shaped the redesign</h2>
          </motion.div>
          <motion.div variants={stagger} className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {designDecisions.map(({ Icon, title, desc }) => (
              <motion.div key={title} variants={fade} className="card-base p-5">
                <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-xl" style={{ background: `${ACCENT}14`, border: `1px solid ${ACCENT}33` }}>
                  <Icon size={18} style={{ color: ACCENT }} strokeWidth={1.8} />
                </div>
                <h4 className="font-display text-sm font-bold text-slate-900 dark:text-white mb-1.5">{title}</h4>
                <p className="text-xs text-slate-500 leading-relaxed">{desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </motion.section>

        <div className="my-14 h-px bg-[var(--border)]" />

        {/* ── Tech Stack ── */}
        <motion.section initial="hidden" whileInView="show" viewport={{ once: true }} variants={stagger} className="mb-14">
          <motion.div variants={fade}>
            <SectionLabel>Tech Stack</SectionLabel>
            <h2 className="font-display text-2xl font-bold text-slate-900 dark:text-white mb-6">What it's built with</h2>
          </motion.div>
          <motion.div variants={fade} className="flex flex-wrap gap-2">
            {['React', 'Vite', 'TypeScript', 'Tailwind CSS', 'HashRouter', 'Figma (wireframes)', 'WCAG AA'].map(t => (
              <span key={t} className="chip">{t}</span>
            ))}
          </motion.div>
        </motion.section>

        {/* ── Footer CTA ── */}
        <motion.section initial="hidden" whileInView="show" viewport={{ once: true }} variants={stagger}>
          <motion.div variants={fade} className="card-base p-8 text-center border-l-2" style={{ borderLeftColor: ACCENT }}>
            <h3 className="font-display text-xl font-bold text-slate-900 dark:text-white mb-2">See the redesign live</h3>
            <p className="text-sm text-slate-600 dark:text-slate-400 mb-5 max-w-md mx-auto">
              A static front-end concept deployed to GitHub Pages — no live backend or lead capture.
            </p>
            <div className="flex flex-wrap justify-center gap-3">
              <a href="https://visuxlize.github.io/NCMRedesign/" target="_blank" rel="noopener noreferrer"
                className="flex items-center gap-2 rounded-lg px-5 py-2.5 text-sm font-semibold text-white transition-opacity hover:opacity-90"
                style={{ background: ACCENT }}>
                <ExternalLink size={15} strokeWidth={2} aria-hidden />
                View Live Demo
              </a>
              <a href="https://github.com/visuxlize/NCMRedesign" target="_blank" rel="noopener noreferrer"
                className="flex items-center gap-2 rounded-lg border border-[var(--border)] bg-[var(--card)] px-5 py-2.5 text-sm font-medium text-slate-700 transition-colors hover:border-primary/50 hover:text-primary dark:text-slate-300">
                <Github size={15} strokeWidth={2} aria-hidden />
                View on GitHub
              </a>
            </div>
          </motion.div>
        </motion.section>

      </div>
    </div>
  );
};

export default NCMRedesign;
