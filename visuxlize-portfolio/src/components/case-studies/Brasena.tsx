import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, Github, ExternalLink, ShoppingCart, CheckCircle2, Truck as TruckIcon, MapPin, PackageCheck } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const ACCENT = '#15803d';

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

const fulfillmentSteps = [
  { n: '01', color: '#4ade80', Icon: ShoppingCart, title: 'Customer Orders',  desc: 'B2C or B2B. Automatic 15% wholesale pricing for restaurants.' },
  { n: '02', color: '#94a3b8', Icon: CheckCircle2,  title: 'Vendor Confirms', desc: 'Under 2 minutes. Inventory check and order acknowledgment.' },
  { n: '03', color: '#94a3b8', Icon: TruckIcon,     title: 'Driver Dispatched', desc: 'Routing logic assigns nearest available driver.' },
  { n: '04', color: '#94a3b8', Icon: MapPin,        title: 'Live Tracking',   desc: 'Real-time map. Same UX as a consumer app, wholesale volume.' },
  { n: '05', color: '#86efac', Icon: PackageCheck,  title: 'Delivered',       desc: 'Receipt sent. Order history logged. Net 30 available for B2B.' },
];

function FulfillmentDiagram() {
  return (
    <DiagramWrap title="Order Fulfillment Loop">
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-5">
        {fulfillmentSteps.map(({ n, color, Icon, title, desc }) => (
          <div key={n} className="rounded-xl p-4" style={{ background: `${color}14`, border: `1px solid ${color}40` }}>
            <div className="flex items-center gap-2 mb-2">
              <Icon size={15} style={{ color }} strokeWidth={2} />
              <p className="text-[10px] font-bold" style={{ color }}>{n}</p>
            </div>
            <p className="text-xs font-semibold text-white/85 leading-snug mb-1">{title}</p>
            <p className="text-[10.5px] text-white/45 leading-snug">{desc}</p>
          </div>
        ))}
      </div>
    </DiagramWrap>
  );
}

const entryLadder = [
  { action: 'Join the waitlist',        entries: '+1' },
  { action: 'Complete the survey',      entries: '+2' },
  { action: 'Refer a friend',           entries: '+3 each' },
  { action: '5 referrals milestone',    entries: '+10 bonus' },
  { action: '25 referrals milestone',   entries: '+75 bonus' },
];

const messagingTriggers = [
  { trigger: 'Signup', detail: 'Email + SMS: "You\'re on the waitlist" + referral link' },
  { trigger: 'Survey submitted', detail: 'Email: "Survey complete, bonus entries added"' },
  { trigger: 'Referral used', detail: 'Email: "Someone used your referral link"' },
  { trigger: 'Milestone hit', detail: 'Email: "You hit a referral milestone" at 5/10/25' },
];

function GrowthEngineDiagram() {
  return (
    <DiagramWrap title="Waitlist Growth Engine">
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
        <div>
          <p className="text-[10px] font-bold uppercase tracking-widest text-white/40 mb-3">Entry Ladder</p>
          <div className="space-y-2">
            {entryLadder.map((e) => (
              <div key={e.action} className="flex items-center justify-between rounded-lg border border-white/10 bg-white/[0.03] px-3 py-2">
                <span className="text-xs text-white/70">{e.action}</span>
                <span className="text-xs font-bold text-emerald-400">{e.entries}</span>
              </div>
            ))}
          </div>
        </div>
        <div>
          <p className="text-[10px] font-bold uppercase tracking-widest text-white/40 mb-3">Messaging Triggers</p>
          <div className="space-y-2">
            {messagingTriggers.map((m) => (
              <div key={m.trigger} className="rounded-lg border border-white/10 bg-white/[0.03] px-3 py-2">
                <p className="text-xs font-semibold text-white/80">{m.trigger}</p>
                <p className="text-[10.5px] text-white/45 mt-0.5 leading-snug">{m.detail}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="mt-5 rounded-xl border px-4 py-3" style={{ borderColor: 'rgba(74,222,128,0.35)', background: 'rgba(74,222,128,0.08)' }}>
        <p className="text-xs font-bold text-emerald-400 mb-1">Grand Opening Raffle</p>
        <p className="text-xs text-white/60">$500 Meat Bundle · $250 Freezer Box · $100 + 20×$25. Weighted draw.</p>
      </div>
    </DiagramWrap>
  );
}

const timeline = [
  { phase: 'Marketing Landing Page', desc: "Hero with Brasena brand (forest green, parchment, Playfair Display), product catalog preview, how it works, audience sections for B2C and B2B, animated background with preloader." },
  { phase: 'Waitlist + Referral Engine', desc: '4-step flow (type → info → survey → share), full referral tracking with entry ladder, tRPC procedures for all waitlist logic, weighted raffle draw in admin.' },
  { phase: 'SMS + Email Automation', desc: 'Resend with React Email templates (forest green header, parchment body, Playfair headings). Twilio 10DLC-registered (+1 929) for SMS. 4 event types trigger automated messages.' },
  { phase: 'Admin Dashboard', desc: 'Waitlist command center (browse, filter, export), growth analytics with time-series charts, raffle draw, product management, order tracking infrastructure.' },
];

const Brasena: React.FC = () => {
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
                Wholesale Startup
              </span>
              <span className="rounded-full border border-amber-500/40 bg-amber-950/40 px-3 py-1 text-xs font-semibold text-amber-400">Pre-Launch · Waitlist Live</span>
            </div>
            <SectionLabel>Case Study</SectionLabel>
            <h1 className="font-display text-4xl font-extrabold tracking-tight text-slate-900 dark:text-white md:text-5xl">
              Brasena
            </h1>
            <p className="mt-4 text-lg leading-relaxed text-slate-600 dark:text-slate-400 max-w-2xl">
              Wholesale meat delivery connecting distributors directly to restaurants and families in The
              Bronx — cutting out the retail markup, starting with a referral-driven waitlist.
            </p>
            <div className="mt-6 flex flex-wrap gap-4">
              <a href="https://brasenabx.com" target="_blank" rel="noopener noreferrer"
                className="flex items-center gap-2 rounded-lg px-4 py-2.5 text-sm font-semibold text-white transition-opacity hover:opacity-90"
                style={{ background: ACCENT }}>
                <ExternalLink size={15} strokeWidth={2} aria-hidden />
                Visit Brasena
              </a>
              <a href="https://github.com/BrasenaInc/Brasena" target="_blank" rel="noopener noreferrer"
                className="flex items-center gap-2 rounded-lg border border-[var(--border)] bg-[var(--card)] px-4 py-2.5 text-sm font-medium text-slate-700 transition-colors hover:border-primary/50 hover:text-primary dark:text-slate-300">
                <Github size={15} strokeWidth={2} aria-hidden />
                GitHub
              </a>
            </div>
          </motion.div>

          <motion.div variants={fade} className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-4">
            <StatCard value="B2C + B2B" label="Pricing model"     sub="Dual audience" />
            <StatCard value="4"         label="Email Types"      sub="Resend + React Email" />
            <StatCard value="+3"        label="Entries / Referral" sub="Growth engine" />
            <StatCard value="929"       label="Bronx Number"     sub="10DLC SMS registered" />
          </motion.div>
        </motion.div>

        <div className="my-14 h-px bg-[var(--border)]" />

        {/* ── The Problem ── */}
        <motion.section initial="hidden" whileInView="show" viewport={{ once: true }} variants={stagger} className="mb-14">
          <motion.div variants={fade}>
            <SectionLabel>The Problem</SectionLabel>
            <h2 className="font-display text-2xl font-bold text-slate-900 dark:text-white mb-4">Retail markup at every layer</h2>
            <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
              Families in The Bronx pay $8–12/lb for meat at retail when the same product costs $4–5/lb at
              wholesale. Restaurants order through distributors who add markup at every layer. There was no
              direct channel connecting wholesale suppliers to the people who actually needed the product.
              Brasena cuts out the middleman — connecting wholesale distributors directly to restaurants
              ordering by the case and families buying bulk at real prices, starting in The Bronx.
            </p>
          </motion.div>
        </motion.section>

        <div className="my-14 h-px bg-[var(--border)]" />

        {/* ── Order Fulfillment Loop ── */}
        <motion.section initial="hidden" whileInView="show" viewport={{ once: true }} variants={stagger} className="mb-14">
          <motion.div variants={fade}>
            <SectionLabel>The Solution</SectionLabel>
            <h2 className="font-display text-2xl font-bold text-slate-900 dark:text-white mb-6">Order to delivery, consumer-grade UX at wholesale volume</h2>
          </motion.div>
          <motion.div variants={fade}>
            <FulfillmentDiagram />
          </motion.div>
        </motion.section>

        <div className="my-14 h-px bg-[var(--border)]" />

        {/* ── Waitlist Growth Engine ── */}
        <motion.section initial="hidden" whileInView="show" viewport={{ once: true }} variants={stagger} className="mb-14">
          <motion.div variants={fade}>
            <SectionLabel>Growth</SectionLabel>
            <h2 className="font-display text-2xl font-bold text-slate-900 dark:text-white mb-4">A waitlist that grows itself</h2>
            <p className="text-slate-600 dark:text-slate-400 leading-relaxed mb-8">
              Before day one, the product is the waitlist. Every action earns entries toward a grand opening
              raffle, and every milestone triggers an automated message that pulls the next referral.
            </p>
          </motion.div>
          <motion.div variants={fade}>
            <GrowthEngineDiagram />
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
            {['Next.js 15', 'TypeScript', 'tRPC v11', 'Drizzle ORM', 'Supabase PostgreSQL', 'Resend + React Email',
              'Twilio (10DLC SMS)', 'Stripe', 'Vercel', 'Tailwind CSS', 'Playfair Display'].map(t => (
              <span key={t} className="chip">{t}</span>
            ))}
          </motion.div>
        </motion.section>

        <div className="my-14 h-px bg-[var(--border)]" />

        {/* ── Build Timeline ── */}
        <motion.section initial="hidden" whileInView="show" viewport={{ once: true }} variants={stagger} className="mb-14">
          <motion.div variants={fade}>
            <SectionLabel>Build Timeline</SectionLabel>
            <h2 className="font-display text-2xl font-bold text-slate-900 dark:text-white mb-8">How it came together</h2>
          </motion.div>
          <div className="relative">
            <div className="absolute top-0 bottom-0 left-[7px] w-px bg-[var(--border)]" aria-hidden />
            <ul className="relative list-none p-0 space-y-8">
              {timeline.map((item, i) => (
                <motion.li key={item.phase} variants={fade} className="relative pl-8">
                  <div className="absolute top-1 left-0 h-4 w-4 rounded-full border-2" style={{ borderColor: ACCENT, background: `${ACCENT}33` }} aria-hidden />
                  <h4 className="font-display text-base font-semibold text-slate-900 dark:text-white">Phase {i + 1} — {item.phase}</h4>
                  <p className="mt-1 text-sm text-slate-600 dark:text-slate-400 leading-relaxed">{item.desc}</p>
                </motion.li>
              ))}
            </ul>
          </div>
        </motion.section>

        {/* ── Footer CTA ── */}
        <motion.section initial="hidden" whileInView="show" viewport={{ once: true }} variants={stagger}>
          <motion.div variants={fade} className="card-base p-8 text-center border-l-2" style={{ borderLeftColor: ACCENT }}>
            <h3 className="font-display text-xl font-bold text-slate-900 dark:text-white mb-2">Join the waitlist</h3>
            <p className="text-sm text-slate-600 dark:text-slate-400 mb-5 max-w-md mx-auto">
              Early entries get first access and the best odds in the grand opening raffle.
            </p>
            <div className="flex flex-wrap justify-center gap-3">
              <a href="https://brasenabx.com" target="_blank" rel="noopener noreferrer"
                className="flex items-center gap-2 rounded-lg px-5 py-2.5 text-sm font-semibold text-white transition-opacity hover:opacity-90"
                style={{ background: ACCENT }}>
                <ExternalLink size={15} strokeWidth={2} aria-hidden />
                Visit Brasena
              </a>
              <a href="https://github.com/BrasenaInc/Brasena" target="_blank" rel="noopener noreferrer"
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

export default Brasena;
