import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  ArrowLeft, Github, ExternalLink,
  CalendarDays, Clock, UserCheck, TrendingUp, Sun, Shield,
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const ACCENT = '#2563eb';

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

function BrowserFrame({ url = 'app.brooklinenbackstage.com', title, children }: { url?: string; title?: string; children: React.ReactNode }) {
  return (
    <div className="w-full overflow-hidden rounded-2xl border border-white/10 shadow-2xl" style={{ background: '#0A0E14' }}>
      <div className="flex items-center gap-3 border-b border-white/10 px-4 py-2.5">
        <div className="flex gap-1.5">
          <span className="h-2.5 w-2.5 rounded-full bg-[#FF5F57]" />
          <span className="h-2.5 w-2.5 rounded-full bg-[#FEBC2E]" />
          <span className="h-2.5 w-2.5 rounded-full bg-[#28C840]" />
        </div>
        <div className="flex-1 rounded-md bg-white/[0.05] px-3 py-1 text-center text-[11px] text-white/35">{url}</div>
      </div>
      {title && (
        <div className="px-5 pt-4">
          <p className="text-[10px] font-bold uppercase tracking-widest text-white/25">{title}</p>
        </div>
      )}
      <div className="p-5">{children}</div>
    </div>
  );
}

// ── Diagram: Architecture (SVG, forced dark) ──────────────────────────────────

function ArchitectureDiagram() {
  function cx(count: number, nw: number, g: number, i: number) {
    const total = count * nw + (count - 1) * g;
    const startX = (744 - total) / 2 + 8;
    return startX + i * (nw + g) + nw / 2;
  }

  function Connector({ x, y1, y2 }: { x: number; y1: number; y2: number }) {
    return (
      <line x1={x} y1={y1} x2={x} y2={y2}
        stroke="rgba(100,116,139,0.4)" strokeWidth="1.2" strokeDasharray="4 3"
        markerEnd="url(#bb-arrow)" />
    );
  }

  const bandH = 72;
  const layers = [
    {
      label: 'PRESENTATION LAYER', sub: 'Next.js 15 App Router',
      labelColor: 'rgba(200,210,225,0.75)', fill: 'rgba(255,255,255,0.04)', stroke: 'rgba(255,255,255,0.11)',
      y: 8,
      nodes: [
        { label: 'Dashboard',  sub: 'overview' },
        { label: 'Schedule',   sub: 'weekly grid' },
        { label: 'Daily Ops',  sub: 'wakeup + recap' },
        { label: 'Traffic',    sub: 'analytics' },
        { label: 'RTO',        sub: 'time-off' },
        { label: 'Admin',      sub: 'users + roles' },
      ],
      nw: 115, ng: 10,
    },
    {
      label: 'BUSINESS LOGIC', sub: 'Server actions + domain modules',
      labelColor: '#4ade80', fill: 'rgba(74,222,128,0.08)', stroke: 'rgba(74,222,128,0.28)',
      y: 96,
      nodes: [
        { label: 'ScheduleGrid',        sub: 'shifts + budget' },
        { label: 'RTOApprovalSync',     sub: 'atomic writes' },
        { label: 'AvailabilityEngine',  sub: 'per-employee' },
        { label: 'TrafficParser',       sub: 'xlsx ingest' },
        { label: 'DailyOpsState',       sub: 'KPI + zoning' },
      ],
      nw: 138, ng: 10,
    },
    {
      label: 'SHARED SERVICES', sub: '',
      labelColor: '#fbbf24', fill: 'rgba(251,191,36,0.07)', stroke: 'rgba(251,191,36,0.25)',
      y: 184,
      nodes: [
        { label: 'Store Context',                  sub: 'multi-tenant scope' },
        { label: 'Supabase Auth + Role Guard',      sub: 'OPS vs Store Leader' },
        { label: 'Middleware + Layout',             sub: 'route protection' },
      ],
      nw: 228, ng: 12,
    },
    {
      label: 'DATA LAYER', sub: '',
      labelColor: 'rgba(45,212,191,0.85)', fill: 'rgba(20,184,166,0.07)', stroke: 'rgba(20,184,166,0.25)',
      y: 272,
      nodes: [
        { label: 'Drizzle ORM',   sub: 'type-safe queries' },
        { label: 'Supabase PostgreSQL', sub: '14 tables' },
        { label: 'Vercel',        sub: 'hosting + deploy' },
        { label: 'Resend / html2canvas / xlsx', sub: 'email · export · import' },
      ],
      nw: 172, ng: 10,
    },
  ];

  const nodeCX = layers.map(l => l.nodes.map((_, i) => cx(l.nodes.length, l.nw, l.ng, i)));

  return (
    <DiagramWrap title="System Architecture Diagram">
      <svg viewBox="0 0 760 380" className="w-full" style={{ minWidth: 480, fontFamily: 'DM Sans, sans-serif' }}>
        <defs>
          <marker id="bb-arrow" markerWidth="7" markerHeight="7" refX="5.5" refY="3" orient="auto">
            <path d="M0,0 L0,6 L7,3 z" fill="rgba(100,116,139,0.55)" />
          </marker>
        </defs>

        {layers.map((layer, li) => {
          const nodeY = layer.y + 20;
          const nodeH = bandH - 26;
          return (
            <g key={layer.label}>
              <rect x="8" y={layer.y} width="744" height={bandH} rx="10"
                fill={layer.fill} stroke={layer.stroke} strokeWidth="1.2" />
              <text x="22" y={layer.y + 14} fontSize="9" fontWeight="700" letterSpacing="1.4" fill={layer.labelColor}>
                {layer.label}
                {layer.sub && <tspan fill="rgba(255,255,255,0.25)" fontWeight="400"> — {layer.sub}</tspan>}
              </text>
              {layer.nodes.map((node, ni) => {
                const nx = nodeCX[li][ni] - layer.nw / 2;
                return (
                  <g key={node.label}>
                    <rect x={nx} y={nodeY} width={layer.nw} height={nodeH} rx="7"
                      fill="rgba(255,255,255,0.05)" stroke={layer.stroke} strokeWidth="1" />
                    <text x={nodeCX[li][ni]} y={nodeY + nodeH / 2 - 4} textAnchor="middle"
                      fill="rgba(255,255,255,0.88)" fontSize="10.5" fontWeight="600">{node.label}</text>
                    <text x={nodeCX[li][ni]} y={nodeY + nodeH / 2 + 11} textAnchor="middle"
                      fill="rgba(255,255,255,0.38)" fontSize="8.5">{node.sub}</text>
                  </g>
                );
              })}
              {li < layers.length - 1 && (
                <>
                  <Connector x={nodeCX[li][0]} y1={layer.y + bandH} y2={layers[li + 1].y - 1} />
                  {layer.nodes.length >= 2 && (
                    <Connector x={nodeCX[li][layer.nodes.length - 1]} y1={layer.y + bandH} y2={layers[li + 1].y - 1} />
                  )}
                </>
              )}
            </g>
          );
        })}
        <text x="380" y="366" textAnchor="middle" fontSize="9" fill="rgba(255,255,255,0.18)">
          Data flows from server actions through Drizzle into Supabase PostgreSQL, scoped per store
        </text>
      </svg>
    </DiagramWrap>
  );
}

// ── Diagram: RTO → Schedule Sync flow ─────────────────────────────────────────

function RtoSyncDiagram() {
  const steps = [
    { n: '01', title: 'Associate Submits',   desc: '/rto/submit · public route',              color: '#94a3b8' },
    { n: '02', title: 'Pending State',       desc: 'rto_requests table · nav badge shows count', color: '#94a3b8' },
    { n: '03', title: 'Leader Reviews',      desc: 'in-app dashboard · optional leader note',  color: '#94a3b8' },
    { n: '04', title: 'Approve → Sync Runs', desc: 'rtoAvailabilitySync() writes schedule + availability atomically', color: '#4ade80' },
    { n: '05', title: 'Everywhere Updated',  desc: 'OFF/PTO shows on grid + availability, zero manual steps', color: '#86efac' },
  ];
  return (
    <DiagramWrap title="RTO → Schedule Sync">
      <div className="grid grid-cols-1 sm:grid-cols-5 gap-3">
        {steps.map((s, i) => (
          <React.Fragment key={s.n}>
            <div className="rounded-xl p-3" style={{ background: `${s.color}14`, border: `1px solid ${s.color}40` }}>
              <p className="text-[10px] font-bold mb-1.5" style={{ color: s.color }}>{s.n}</p>
              <p className="text-xs font-semibold text-white/85 leading-snug mb-1">{s.title}</p>
              <p className="text-[10.5px] text-white/45 leading-snug">{s.desc}</p>
            </div>
            {i < steps.length - 1 && (
              <div className="hidden sm:flex items-center justify-center text-white/20">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none"><path d="M9 6l6 6-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
              </div>
            )}
          </React.Fragment>
        ))}
      </div>
    </DiagramWrap>
  );
}

// ── Schedule grid mockup ──────────────────────────────────────────────────────

function ScheduleGridMockup() {
  const days = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];
  const budget = ['$412', '$580', '$540', '$560', '$610', '$720', '$690'];
  return (
    <BrowserFrame url="app.brooklinenbackstage.com/schedule" title="Weekly Schedule Grid">
      <div className="overflow-x-auto">
        <table className="w-full border-collapse text-left" style={{ minWidth: 640 }}>
          <thead>
            <tr>
              <th className="text-[10px] font-bold uppercase tracking-wider text-white/35 pb-2 pr-3">Employee</th>
              <th className="text-[10px] font-bold uppercase tracking-wider text-white/35 pb-2 px-2">WTD</th>
              {days.map(d => (
                <th key={d} className="text-[10px] font-bold uppercase tracking-wider text-white/35 pb-2 px-2 text-center">{d}</th>
              ))}
            </tr>
          </thead>
          <tbody className="text-xs">
            <tr>
              <td className="py-1.5 pr-3 text-white/40 font-semibold">Budget</td>
              <td className="px-2" />
              {budget.map((b, i) => (
                <td key={i} className="px-2 py-1.5 text-center rounded-md" style={{ background: 'rgba(37,99,235,0.12)', color: '#93c5fd' }}>{b}</td>
              ))}
            </tr>
            <tr>
              <td className="py-1.5 pr-3">
                <div className="flex items-center gap-2">
                  <span className="flex h-5 w-5 items-center justify-center rounded-full bg-white/10 text-[9px] font-bold text-white/70">JM</span>
                  <span className="text-white/80">Jamie M.</span>
                </div>
              </td>
              <td className="px-2 text-white/50">32h</td>
              <td className="px-2 py-1.5 text-center text-white/70">10–6</td>
              <td className="px-2 py-1.5 text-center text-white/70">10–6</td>
              <td className="px-2 py-1.5 text-center rounded-md" style={{ background: 'rgba(255,255,255,0.04)', color: 'rgba(255,255,255,0.3)' }}>OFF</td>
              <td className="px-2 py-1.5 text-center text-white/70">12–8</td>
              <td className="px-2 py-1.5 text-center text-white/70">10–6</td>
              <td className="px-2 py-1.5 text-center text-white/70">9–5</td>
              <td className="px-2 py-1.5 text-center text-white/70">11–7</td>
            </tr>
            <tr>
              <td className="py-1.5 pr-3">
                <div className="flex items-center gap-2">
                  <span className="flex h-5 w-5 items-center justify-center rounded-full bg-white/10 text-[9px] font-bold text-white/70">RS</span>
                  <span className="text-white/80">Ray S.</span>
                </div>
              </td>
              <td className="px-2 text-white/50">24h</td>
              <td className="px-2 py-1.5 text-center text-white/70">–</td>
              <td className="px-2 py-1.5 text-center rounded-md" style={{ background: 'rgba(251,191,36,0.15)', color: '#fcd34d' }}>PTO</td>
              <td className="px-2 py-1.5 text-center text-white/70">1–9</td>
              <td className="px-2 py-1.5 text-center text-white/70">1–9</td>
              <td className="px-2 py-1.5 text-center text-white/70">–</td>
              <td className="px-2 py-1.5 text-center text-white/70">12–8</td>
              <td className="px-2 py-1.5 text-center text-white/70">10–6</td>
            </tr>
            <tr>
              <td className="py-1.5 pr-3 text-white/40 font-semibold">Power Hour</td>
              <td className="px-2" />
              {['—', '—', '2–3p', '2–3p', '4–5p', '5–7p', '5–7p'].map((p, i) => (
                <td key={i} className="px-2 py-1.5 text-center rounded-md" style={{ background: 'rgba(251,191,36,0.1)', color: '#fbbf24' }}>{p}</td>
              ))}
            </tr>
          </tbody>
        </table>
      </div>
    </BrowserFrame>
  );
}

const moduleMap = [
  { Icon: CalendarDays, color: '#3b82f6', title: 'Schedule',
    desc: 'Weekly grid, shifts, budget/LY rows, Power Hour from traffic, PNG export for email.' },
  { Icon: Clock, color: '#f59e0b', title: 'RTO / PTO',
    desc: 'Public form, approval flow, auto-sync to schedule and availability on approve.' },
  { Icon: UserCheck, color: '#22c55e', title: 'Availability',
    desc: 'Per-employee, per-day. Ongoing or week-specific scope. Approved RTO overlaid.' },
  { Icon: TrendingUp, color: '#14b8a6', title: 'Traffic',
    desc: 'Upload Excel, view hourly/weekly breakdown. Peak windows feed Power Hour on schedule.' },
  { Icon: Sun, color: '#a855f7', title: 'Daily Ops',
    desc: 'Morning wakeup, KPI goals, employee zoning chart. Nightly recap exported as PNG.' },
  { Icon: Shield, color: '#64748b', title: 'Admin',
    desc: 'User creation, role assignment, store scoping. OPS see all; Store Leaders see one.' },
];

const timeline = [
  { phase: 'Schema + Auth', desc: 'Supabase auth, Drizzle schema for all 14 tables, admin-only user creation. No public signup by design.' },
  { phase: 'Schedule Module', desc: 'Weekly grid with shift cell editing, paid-hours calc with break deduction, budget/LY rows, Power Hour row, PNG export via html2canvas.' },
  { phase: 'RTO System', desc: 'Public /rto/submit form, in-app approval dashboard, rtoAvailabilitySync — schedule and availability rows updated atomically on approval.' },
  { phase: 'Traffic Analytics', desc: 'Excel upload, weekly/hourly traffic tables, peak window calculation — peak windows drive the Power Hour row on the schedule.' },
  { phase: 'Daily Ops + Nightly Recap', desc: 'Morning wakeup with KPI goal cards, employee zoning chart (15-min blocks per employee 8am–9pm), nightly recap form with PNG export.' },
  { phase: 'Showcase Mode', desc: 'Fully static GitHub Pages demo with fictional data — same design system, same layouts, deployed automatically on push to main.' },
];

const BrooklinenBackstage: React.FC = () => {
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
                Retail Operations
              </span>
              <span className="rounded-full border border-teal-500/40 bg-teal-950/40 px-3 py-1 text-xs font-semibold text-teal-400">Live Showcase</span>
            </div>
            <SectionLabel>Case Study</SectionLabel>
            <h1 className="font-display text-4xl font-extrabold tracking-tight text-slate-900 dark:text-white md:text-5xl">
              Brooklinen Backstage
            </h1>
            <p className="mt-4 text-lg leading-relaxed text-slate-600 dark:text-slate-400 max-w-2xl">
              Multi-store retail operations platform — scheduling, time-off, availability, traffic analytics,
              and daily ops for an 8-store team, replacing spreadsheets, group chats, and paper.
            </p>
            <div className="mt-6 flex flex-wrap gap-4">
              <a href="https://visuxlize.github.io/Brooklinen-Backstage" target="_blank" rel="noopener noreferrer"
                className="flex items-center gap-2 rounded-lg px-4 py-2.5 text-sm font-semibold text-white transition-opacity hover:opacity-90"
                style={{ background: ACCENT }}>
                <ExternalLink size={15} strokeWidth={2} aria-hidden />
                Live Showcase
              </a>
              <a href="https://github.com/visuxlize/Brooklinen-Backstage" target="_blank" rel="noopener noreferrer"
                className="flex items-center gap-2 rounded-lg border border-[var(--border)] bg-[var(--card)] px-4 py-2.5 text-sm font-medium text-slate-700 transition-colors hover:border-primary/50 hover:text-primary dark:text-slate-300">
                <Github size={15} strokeWidth={2} aria-hidden />
                GitHub
              </a>
            </div>
          </motion.div>

          <motion.div variants={fade} className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-4">
            <StatCard value="8"  label="Stores"     sub="Multi-tenant" />
            <StatCard value="6"  label="Modules"    sub="Core workflows" />
            <StatCard value="14" label="DB Tables"  sub="PostgreSQL" />
            <StatCard value="13" label="Migrations" sub="Drizzle ORM" />
          </motion.div>
        </motion.div>

        <div className="my-14 h-px bg-[var(--border)]" />

        {/* ── The Problem ── */}
        <motion.section initial="hidden" whileInView="show" viewport={{ once: true }} variants={stagger} className="mb-14">
          <motion.div variants={fade}>
            <SectionLabel>The Problem</SectionLabel>
            <h2 className="font-display text-2xl font-bold text-slate-900 dark:text-white mb-4">Retail ops ran on spreadsheets and text messages</h2>
            <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
              Brooklinen retail stores managed scheduling, time-off requests, and daily walkthroughs across
              spreadsheets, group chats, and paper. Building a weekly schedule meant manually cross-referencing
              budget targets, last year's numbers, and availability — hours of work that still produced conflicts.
              A time-off request meant a text message. Daily goals lived in an email. Nightly recaps were typed
              in a notes app. Traffic data was disconnected from staffing entirely.
            </p>
          </motion.div>
          <motion.div variants={fade} className="mt-6 card-base p-6 border-l-2" style={{ borderLeftColor: ACCENT }}>
            <p className="text-slate-700 dark:text-slate-300 leading-relaxed text-sm">
              "Shaped entirely by what actually slows a store leader down day to day, not by a generic scheduling template."
            </p>
          </motion.div>
        </motion.section>

        <div className="my-14 h-px bg-[var(--border)]" />

        {/* ── The Solution — Module Map ── */}
        <motion.section initial="hidden" whileInView="show" viewport={{ once: true }} variants={stagger} className="mb-14">
          <motion.div variants={fade}>
            <SectionLabel>The Solution</SectionLabel>
            <h2 className="font-display text-2xl font-bold text-slate-900 dark:text-white mb-6">Six modules, one system of record</h2>
          </motion.div>
          <motion.div variants={stagger} className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {moduleMap.map(({ Icon, color, title, desc }) => (
              <motion.div key={title} variants={fade} className="card-base p-5">
                <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-xl" style={{ background: `${color}1a`, border: `1px solid ${color}40` }}>
                  <Icon size={18} style={{ color }} strokeWidth={1.8} />
                </div>
                <h4 className="font-display text-sm font-bold text-slate-900 dark:text-white mb-1.5">{title}</h4>
                <p className="text-xs text-slate-500 leading-relaxed">{desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </motion.section>

        <div className="my-14 h-px bg-[var(--border)]" />

        {/* ── Architecture ── */}
        <motion.section initial="hidden" whileInView="show" viewport={{ once: true }} variants={stagger} className="mb-14">
          <motion.div variants={fade}>
            <SectionLabel>Architecture</SectionLabel>
            <h2 className="font-display text-2xl font-bold text-slate-900 dark:text-white mb-6">Store-scoped, layered, and typed end to end</h2>
          </motion.div>
          <motion.div variants={fade}>
            <ArchitectureDiagram />
          </motion.div>
        </motion.section>

        <div className="my-14 h-px bg-[var(--border)]" />

        {/* ── Deep Dive: RTO Sync ── */}
        <motion.section initial="hidden" whileInView="show" viewport={{ once: true }} variants={stagger} className="mb-14">
          <motion.div variants={fade}>
            <SectionLabel>Deep Dive</SectionLabel>
            <h2 className="font-display text-2xl font-bold text-slate-900 dark:text-white mb-4">RTO approval syncs the schedule automatically</h2>
            <p className="text-slate-600 dark:text-slate-400 leading-relaxed mb-8">
              The hardest part wasn't the RTO form — it was making sure an approved request never has to be
              manually re-entered anywhere else. <code className="text-xs">rtoAvailabilitySync</code> runs
              atomically on approval, writing both the schedule and availability tables in a single transaction
              so the two can never drift out of sync.
            </p>
          </motion.div>
          <motion.div variants={fade}>
            <RtoSyncDiagram />
          </motion.div>
        </motion.section>

        <div className="my-14 h-px bg-[var(--border)]" />

        {/* ── Schedule Grid Mockup ── */}
        <motion.section initial="hidden" whileInView="show" viewport={{ once: true }} variants={stagger} className="mb-14">
          <motion.div variants={fade}>
            <SectionLabel>Interface</SectionLabel>
            <h2 className="font-display text-2xl font-bold text-slate-900 dark:text-white mb-6">The schedule grid</h2>
          </motion.div>
          <motion.div variants={fade}>
            <ScheduleGridMockup />
          </motion.div>
          <motion.div variants={fade}>
            <p className="mt-4 text-xs text-slate-500 leading-relaxed">
              PTO cells shown in amber — auto-populated by the RTO approval flow. Power Hour row pulled from
              uploaded traffic data.
            </p>
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
            {['Next.js 15', 'TypeScript', 'PostgreSQL', 'Supabase Auth', 'Drizzle ORM', 'Tailwind CSS',
              'Vercel', 'Resend', 'html2canvas', 'xlsx', 'date-fns', 'Zod', 'lucide-react'].map(t => (
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
            <h3 className="font-display text-xl font-bold text-slate-900 dark:text-white mb-2">See it in action</h3>
            <p className="text-sm text-slate-600 dark:text-slate-400 mb-5 max-w-md mx-auto">
              The live showcase is read-only and uses fictional data — reach out for a walkthrough of the
              real app. Access code required.
            </p>
            <div className="flex flex-wrap justify-center gap-3">
              <a href="https://visuxlize.github.io/Brooklinen-Backstage" target="_blank" rel="noopener noreferrer"
                className="flex items-center gap-2 rounded-lg px-5 py-2.5 text-sm font-semibold text-white transition-opacity hover:opacity-90"
                style={{ background: ACCENT }}>
                <ExternalLink size={15} strokeWidth={2} aria-hidden />
                View Live Showcase
              </a>
              <a href="https://github.com/visuxlize/Brooklinen-Backstage" target="_blank" rel="noopener noreferrer"
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

export default BrooklinenBackstage;
