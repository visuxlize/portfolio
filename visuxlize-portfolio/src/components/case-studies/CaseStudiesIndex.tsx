import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  ArrowLeft, ArrowRight, BarChart3, LayoutDashboard, Truck,
  Scissors, Music2, Layout, GraduationCap,
} from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

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

type CaseStudy = {
  number: string;
  title: string;
  category: string;
  description: string;
  tags: string[];
  path: string;
  icon: LucideIcon;
  accent: string;
};

const featured: CaseStudy = {
  number: '01',
  title: 'MLB Edge Pro',
  category: 'Featured',
  description:
    'Solo-built MLB prediction platform — iOS app and web SaaS, statistical edge modeling, and a live paid subscriber base.',
  tags: ['Startup · Co-Founder', 'Live · Paying subscribers'],
  path: '/mlb-edge-pro',
  icon: BarChart3,
  accent: '#FF7828',
};

const caseStudies: CaseStudy[] = [
  {
    number: '02',
    title: 'Brooklinen Backstage',
    category: 'Retail Operations',
    description: 'Proof-of-concept multi-store scheduling, RTO approvals, traffic analytics, and daily ops, prototyped for an 8-store retail team.',
    tags: ['Next.js', 'Supabase', 'Drizzle'],
    path: '/brooklinen',
    icon: LayoutDashboard,
    accent: '#2563eb',
  },
  {
    number: '03',
    title: 'Brasena',
    category: 'Wholesale Startup',
    description: 'Wholesale meat delivery connecting distributors directly to restaurants and families in The Bronx.',
    tags: ['Next.js', 'tRPC', 'Twilio'],
    path: '/brasena',
    icon: Truck,
    accent: '#15803d',
  },
  {
    number: '04',
    title: "Headz Ain't Ready",
    category: 'Booking Platform',
    description: 'Luxury barbershop booking flow and staff dashboard for a Jackson Heights shop with a loyal following.',
    tags: ['Next.js', 'Supabase', 'Square POS'],
    path: '/headz',
    icon: Scissors,
    accent: '#dc2626',
  },
  {
    number: '05',
    title: 'Savage Entertainment',
    category: 'Events & Hospitality',
    description: 'Cinematic booking and payments platform turning word-of-mouth DJ bookings into a real online funnel.',
    tags: ['Next.js', 'Square POS', 'SEO'],
    path: '/savage',
    icon: Music2,
    accent: '#7c3aed',
  },
  {
    number: '06',
    title: 'NCM Redesign',
    category: 'Design Concept',
    description: "A full front-end redesign of New Castle Metal's site — clearer IA, unified nav, and a single conversion path.",
    tags: ['React', 'Vite', 'Accessibility'],
    path: '/ncm',
    icon: Layout,
    accent: '#0284c7',
  },
];

const coursework: CaseStudy = {
  number: '07',
  title: 'Academic Projects — Coursework',
  category: 'B.S. Software Development',
  description:
    'Four DeVry courses from Python OOP through a 5-person capstone team shipping a full-stack maintenance system with IEEE documentation.',
  tags: ['Python', 'C#', 'SQL', 'React + Django'],
  path: '/coursework',
  icon: GraduationCap,
  accent: '#d97706',
};

function FeaturedCard({ cs }: { cs: CaseStudy }) {
  const navigate = useNavigate();
  const Icon = cs.icon;
  return (
    <motion.div variants={fade}>
      <div
        className="relative rounded-3xl overflow-hidden border border-white/10 p-8 sm:p-10"
        style={{ background: 'linear-gradient(135deg, #0A0E14 0%, #0D1525 50%, #0A0E14 100%)' }}
      >
        <div
          className="absolute -top-24 -right-24 w-80 h-80 rounded-full opacity-30 pointer-events-none"
          style={{ background: `radial-gradient(circle, ${cs.accent}4d 0%, transparent 70%)` }}
        />
        <div className="relative z-10">
          <div className="flex flex-wrap items-center gap-3 mb-4">
            <span
              className="rounded-full px-3 py-1 text-[10px] font-bold uppercase tracking-widest"
              style={{ color: cs.accent, background: `${cs.accent}1a`, border: `1px solid ${cs.accent}4d` }}
            >
              {cs.category}
            </span>
            <span className="text-[11px] font-semibold text-white/30">Case Study {cs.number} / 07</span>
          </div>
          <div className="flex flex-col sm:flex-row sm:items-center gap-6">
            <div
              className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl"
              style={{ background: `${cs.accent}1a`, border: `1px solid ${cs.accent}40` }}
            >
              <Icon size={24} style={{ color: cs.accent }} strokeWidth={1.8} />
            </div>
            <div className="flex-1">
              <h3 className="font-display text-2xl sm:text-3xl font-bold text-white mb-2">{cs.title}</h3>
              <p className="text-sm text-white/60 leading-relaxed max-w-2xl">{cs.description}</p>
            </div>
          </div>
          <div className="mt-6 flex flex-wrap items-center gap-2">
            {cs.tags.map((t) => (
              <span key={t} className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-[11px] font-medium text-white/60">
                {t}
              </span>
            ))}
          </div>
          <button
            type="button"
            onClick={() => navigate(cs.path)}
            className="mt-6 inline-flex items-center gap-1.5 text-sm font-semibold transition-opacity hover:opacity-80"
            style={{ color: cs.accent }}
          >
            View Case Study
            <ArrowRight size={14} strokeWidth={2.5} aria-hidden />
          </button>
        </div>
      </div>
    </motion.div>
  );
}

function CaseCard({ cs }: { cs: CaseStudy }) {
  const navigate = useNavigate();
  const Icon = cs.icon;
  return (
    <motion.div variants={fade} className="card-base flex h-full flex-col p-6">
      <div className="flex items-start justify-between gap-3 mb-4">
        <div
          className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl"
          style={{ background: `${cs.accent}14`, border: `1px solid ${cs.accent}33` }}
        >
          <Icon size={19} style={{ color: cs.accent }} strokeWidth={1.8} />
        </div>
        <span className="text-[11px] font-semibold text-slate-400">{cs.number} / 07</span>
      </div>
      <p className="text-[10px] font-bold uppercase tracking-widest mb-1.5" style={{ color: cs.accent }}>{cs.category}</p>
      <h3 className="font-display text-base font-bold text-slate-900 dark:text-white mb-2">{cs.title}</h3>
      <p className="text-sm leading-relaxed text-slate-600 dark:text-slate-400 mb-4 flex-1">{cs.description}</p>
      <div className="flex flex-wrap gap-1.5 mb-4">
        {cs.tags.map((t) => <span key={t} className="chip">{t}</span>)}
      </div>
      <button
        type="button"
        onClick={() => navigate(cs.path)}
        className="inline-flex items-center gap-1.5 text-sm font-semibold transition-opacity hover:opacity-80 mt-auto"
        style={{ color: cs.accent }}
      >
        View Case Study
        <ArrowRight size={13} strokeWidth={2.5} aria-hidden />
      </button>
    </motion.div>
  );
}

const CaseStudiesIndex: React.FC = () => {
  const navigate = useNavigate();
  useEffect(() => { window.scrollTo({ top: 0 }); }, []);

  return (
    <div className="min-h-screen pt-24 pb-24">
      <div className="mx-auto max-w-5xl px-6">

        <motion.button
          initial={{ opacity: 0, x: -8 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.4 }}
          onClick={() => navigate('/')}
          className="mb-10 flex items-center gap-2 text-sm text-slate-500 transition-colors hover:text-primary dark:text-slate-400"
        >
          <ArrowLeft size={15} strokeWidth={2} aria-hidden />
          Back to portfolio
        </motion.button>

        <motion.div initial="hidden" animate="show" variants={stagger}>
          <motion.div variants={fade}>
            <SectionLabel>Case Study</SectionLabel>
            <h1 className="font-display text-4xl font-extrabold tracking-tight text-slate-900 dark:text-white md:text-5xl">
              Case Studies
            </h1>
            <p className="mt-4 text-lg leading-relaxed text-slate-600 dark:text-slate-400 max-w-2xl">
              Full-stack developer building production tools — from internal retail ops to consumer booking apps,
              analytics platforms, and wholesale delivery startups.
            </p>
          </motion.div>

          <div className="my-10 h-px bg-[var(--border)]" />

          <motion.div variants={fade}>
            <FeaturedCard cs={featured} />
          </motion.div>

          <motion.div variants={stagger} className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2">
            {caseStudies.slice(0, 2).map((cs) => <CaseCard key={cs.number} cs={cs} />)}
          </motion.div>

          <motion.div variants={stagger} className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-3">
            {caseStudies.slice(2, 5).map((cs) => <CaseCard key={cs.number} cs={cs} />)}
          </motion.div>

          <motion.div variants={fade} className="mt-6">
            <div className="card-base p-6 sm:p-8">
              <div className="flex flex-col sm:flex-row sm:items-center gap-6">
                <div
                  className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl"
                  style={{ background: `${coursework.accent}14`, border: `1px solid ${coursework.accent}33` }}
                >
                  <GraduationCap size={24} style={{ color: coursework.accent }} strokeWidth={1.8} />
                </div>
                <div className="flex-1">
                  <p className="text-[10px] font-bold uppercase tracking-widest mb-1.5" style={{ color: coursework.accent }}>
                    {coursework.category}
                  </p>
                  <h3 className="font-display text-xl font-bold text-slate-900 dark:text-white mb-2">{coursework.title}</h3>
                  <p className="text-sm leading-relaxed text-slate-600 dark:text-slate-400 max-w-2xl">{coursework.description}</p>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {coursework.tags.map((t) => <span key={t} className="chip">{t}</span>)}
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => navigate(coursework.path)}
                  className="inline-flex shrink-0 items-center gap-1.5 text-sm font-semibold transition-opacity hover:opacity-80"
                  style={{ color: coursework.accent }}
                >
                  View Case Study
                  <ArrowRight size={13} strokeWidth={2.5} aria-hidden />
                </button>
              </div>
            </div>
          </motion.div>
        </motion.div>

      </div>
    </div>
  );
};

export default CaseStudiesIndex;
