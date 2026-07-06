import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  ArrowLeft, Github, ExternalLink,
  Home, Music2, Image as ImageIcon, CalendarCheck,
  FileCode, Map as MapIcon, Share2, Zap,
  Package, Clock3, ClipboardList, CreditCard,
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const ACCENT = '#7c3aed';

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

const publicPages = [
  { Icon: Home,          path: '/',         desc: 'Hero video loop · services · about · social proof', accent: false },
  { Icon: Music2,        path: '/services', desc: 'DJ · hospitality · event planning packages', accent: false },
  { Icon: ImageIcon,     path: '/gallery',  desc: 'Event photography · past performances', accent: false },
  { Icon: CalendarCheck, path: '/book',     desc: 'Service → date → info → Square payment', accent: true },
];

const seoItems = [
  { Icon: FileCode, title: 'Structured Data',   desc: 'LocalBusiness · Event · MusicGroup JSON-LD schema' },
  { Icon: MapIcon,  title: 'Sitemap + Robots',  desc: 'Auto-generated, submitted to Google Search Console' },
  { Icon: Share2,   title: 'Open Graph',        desc: 'Rich previews on Instagram / Twitter / iMessage' },
  { Icon: Zap,      title: 'Core Web Vitals',   desc: 'Image optimization · font display swap · lazy loading' },
];

function PlatformStructureDiagram() {
  return (
    <DiagramWrap title="Platform Structure">
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
        <div>
          <p className="text-[10px] font-bold uppercase tracking-widest text-white/40 mb-3">Public Pages</p>
          <div className="space-y-2">
            {publicPages.map((p) => (
              <div key={p.path} className="flex items-start gap-3 rounded-lg border px-3 py-2.5"
                style={{
                  borderColor: p.accent ? 'rgba(124,58,237,0.4)' : 'rgba(255,255,255,0.1)',
                  background: p.accent ? 'rgba(124,58,237,0.1)' : 'rgba(255,255,255,0.03)',
                }}>
                <p.Icon size={15} style={{ color: p.accent ? ACCENT : 'rgba(255,255,255,0.5)' }} strokeWidth={1.8} className="mt-0.5 shrink-0" />
                <div>
                  <p className="text-xs font-mono font-semibold" style={{ color: p.accent ? '#c4b5fd' : 'rgba(255,255,255,0.8)' }}>{p.path}</p>
                  <p className="text-[10.5px] text-white/45 leading-snug mt-0.5">{p.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div>
          <p className="text-[10px] font-bold uppercase tracking-widest text-white/40 mb-3">SEO + Discoverability</p>
          <div className="space-y-2">
            {seoItems.map((s) => (
              <div key={s.title} className="flex items-start gap-3 rounded-lg border border-white/10 bg-white/[0.03] px-3 py-2.5">
                <s.Icon size={15} className="mt-0.5 shrink-0 text-teal-400" strokeWidth={1.8} />
                <div>
                  <p className="text-xs font-semibold text-white/80">{s.title}</p>
                  <p className="text-[10.5px] text-white/45 leading-snug mt-0.5">{s.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </DiagramWrap>
  );
}

const bookingSteps = [
  { n: 'SERVICE', color: ACCENT, Icon: Package,        title: 'Package Select', desc: 'DJ Set · Hospitality · Event Package. Price shown.' },
  { n: 'DATE',    color: '#94a3b8', Icon: Clock3,       title: 'Date + Time',    desc: 'Calendar picker. Unavailable dates blocked.' },
  { n: 'DETAILS', color: '#94a3b8', Icon: ClipboardList, title: 'Event Info',     desc: 'Name · venue · guest count · special requests.' },
  { n: 'PAYMENT', color: '#4ade80', Icon: CreditCard,   title: 'Square POS',     desc: 'Deposit or full amount. Confirmed instantly.' },
];

function BookingFlowDiagram() {
  return (
    <DiagramWrap title="Booking + Payment Flow">
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-4">
        {bookingSteps.map(({ n, color, Icon, title, desc }) => (
          <div key={n} className="rounded-xl p-4" style={{ background: `${color}14`, border: `1px solid ${color}40` }}>
            <div className="flex items-center gap-2 mb-2">
              <Icon size={15} style={{ color }} strokeWidth={2} />
              <p className="text-[10px] font-bold tracking-wider" style={{ color }}>{n}</p>
            </div>
            <p className="text-xs font-semibold text-white/85 leading-snug mb-1">{title}</p>
            <p className="text-[10.5px] text-white/45 leading-snug">{desc}</p>
          </div>
        ))}
      </div>
    </DiagramWrap>
  );
}

const SavageEntertainment: React.FC = () => {
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
                Events & Hospitality
              </span>
              <span className="rounded-full border border-teal-500/40 bg-teal-950/40 px-3 py-1 text-xs font-semibold text-teal-400">Live</span>
            </div>
            <SectionLabel>Case Study</SectionLabel>
            <h1 className="font-display text-4xl font-extrabold tracking-tight text-slate-900 dark:text-white md:text-5xl">
              Savage Entertainment
            </h1>
            <p className="mt-4 text-lg leading-relaxed text-slate-600 dark:text-slate-400 max-w-2xl">
              A cinematic, high-contrast booking platform for a DJ and events brand that previously ran
              entirely on word of mouth and social DMs — now discoverable, bookable, and payable online.
            </p>
            <div className="mt-6 flex flex-wrap gap-4">
              <a href="https://savage-entertainment-and-hospitalit.vercel.app" target="_blank" rel="noopener noreferrer"
                className="flex items-center gap-2 rounded-lg px-4 py-2.5 text-sm font-semibold text-white transition-opacity hover:opacity-90"
                style={{ background: ACCENT }}>
                <ExternalLink size={15} strokeWidth={2} aria-hidden />
                Visit Live Site
              </a>
              <a href="https://github.com/visuxlize/Savage-Entertainment-and-Hospitality" target="_blank" rel="noopener noreferrer"
                className="flex items-center gap-2 rounded-lg border border-[var(--border)] bg-[var(--card)] px-4 py-2.5 text-sm font-medium text-slate-700 transition-colors hover:border-primary/50 hover:text-primary dark:text-slate-300">
                <Github size={15} strokeWidth={2} aria-hidden />
                GitHub
              </a>
            </div>
          </motion.div>

          <motion.div variants={fade} className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-4">
            <StatCard value="#1"   label="Google Rank"     sub="Brand name queries" />
            <StatCard value="3"    label="Service Types"   sub="DJ · Hospitality · Events" />
            <StatCard value="100%" label="Online Bookings" sub="End-to-end paid" />
            <StatCard value="GSC"  label="Verified"        sub="Sitemap + schema" />
          </motion.div>
        </motion.div>

        <div className="my-14 h-px bg-[var(--border)]" />

        {/* ── The Problem ── */}
        <motion.section initial="hidden" whileInView="show" viewport={{ once: true }} variants={stagger} className="mb-14">
          <motion.div variants={fade}>
            <SectionLabel>The Problem</SectionLabel>
            <h2 className="font-display text-2xl font-bold text-slate-900 dark:text-white mb-4">All word of mouth, no way to book</h2>
            <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
              Savage Entertainment Group was landing bookings entirely through word of mouth and social DMs.
              No website, no pricing, no online booking. Every potential client hit a dead end. The goal: a
              site that matches the brand's energy — high-contrast, cinematic, confident — while doing real
              business work: taking bookings, collecting payments, and showing up in search results.
            </p>
          </motion.div>
        </motion.section>

        <div className="my-14 h-px bg-[var(--border)]" />

        {/* ── Platform Structure ── */}
        <motion.section initial="hidden" whileInView="show" viewport={{ once: true }} variants={stagger} className="mb-14">
          <motion.div variants={fade}>
            <SectionLabel>The Solution</SectionLabel>
            <h2 className="font-display text-2xl font-bold text-slate-900 dark:text-white mb-6">Brand energy, backed by real infrastructure</h2>
          </motion.div>
          <motion.div variants={fade}>
            <PlatformStructureDiagram />
          </motion.div>
        </motion.section>

        <div className="my-14 h-px bg-[var(--border)]" />

        {/* ── Booking + Payment Flow ── */}
        <motion.section initial="hidden" whileInView="show" viewport={{ once: true }} variants={stagger} className="mb-14">
          <motion.div variants={fade}>
            <SectionLabel>Booking</SectionLabel>
            <h2 className="font-display text-2xl font-bold text-slate-900 dark:text-white mb-6">From package to paid, four steps</h2>
          </motion.div>
          <motion.div variants={fade}>
            <BookingFlowDiagram />
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
            {['Next.js', 'TypeScript', 'Supabase', 'Square POS', 'Tailwind CSS',
              'Google Search Console', 'JSON-LD Schema', 'Vercel'].map(t => (
              <span key={t} className="chip">{t}</span>
            ))}
          </motion.div>
        </motion.section>

        {/* ── Footer CTA ── */}
        <motion.section initial="hidden" whileInView="show" viewport={{ once: true }} variants={stagger}>
          <motion.div variants={fade} className="card-base p-8 text-center border-l-2" style={{ borderLeftColor: ACCENT }}>
            <h3 className="font-display text-xl font-bold text-slate-900 dark:text-white mb-2">Book the next event</h3>
            <p className="text-sm text-slate-600 dark:text-slate-400 mb-5 max-w-md mx-auto">
              Live booking flow, real payments, discoverable on Google.
            </p>
            <div className="flex flex-wrap justify-center gap-3">
              <a href="https://savage-entertainment-and-hospitalit.vercel.app" target="_blank" rel="noopener noreferrer"
                className="flex items-center gap-2 rounded-lg px-5 py-2.5 text-sm font-semibold text-white transition-opacity hover:opacity-90"
                style={{ background: ACCENT }}>
                <ExternalLink size={15} strokeWidth={2} aria-hidden />
                Visit Live Site
              </a>
              <a href="https://github.com/visuxlize/Savage-Entertainment-and-Hospitality" target="_blank" rel="noopener noreferrer"
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

export default SavageEntertainment;
