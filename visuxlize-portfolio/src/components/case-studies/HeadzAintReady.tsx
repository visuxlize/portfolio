import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, Github, ExternalLink, Scissors, Users, CalendarClock, User } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const ACCENT = '#dc2626';

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

const bookingSteps = [
  { n: '01', color: '#f87171', Icon: Scissors, title: 'Pick a Service',
    desc: 'Haircut, beard trim, kids cut — with price + duration shown upfront.' },
  { n: '02', color: '#94a3b8', Icon: User, title: 'Choose a Barber',
    desc: 'Photo, name, specialty — or "any available" for fastest slot.' },
  { n: '03', color: '#94a3b8', Icon: CalendarClock, title: 'Date + Time',
    desc: 'Real-time slot availability within business hours. No double booking.' },
  { n: '04', color: '#4ade80', Icon: Users, title: 'Name + Phone',
    desc: 'No account required. Appointment confirmed. Slot blocked in the staff dashboard.' },
];

function BookingFlowDiagram() {
  return (
    <DiagramWrap title="Customer Booking Flow">
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-4">
        {bookingSteps.map(({ n, color, Icon, title, desc }) => (
          <div key={n} className="rounded-xl p-4" style={{ background: `${color}14`, border: `1px solid ${color}40` }}>
            <div className="flex items-center gap-2 mb-2">
              <Icon size={15} style={{ color }} strokeWidth={2} />
              <p className="text-[10px] font-bold" style={{ color }}>Step {n}</p>
            </div>
            <p className="text-xs font-semibold text-white/85 leading-snug mb-1">{title}</p>
            <p className="text-[10.5px] text-white/45 leading-snug">{desc}</p>
          </div>
        ))}
      </div>
    </DiagramWrap>
  );
}

function SystemArchitectureDiagram() {
  return (
    <DiagramWrap title="System Architecture">
      <svg viewBox="0 0 760 300" className="w-full" style={{ minWidth: 480, fontFamily: 'DM Sans, sans-serif' }}>
        <defs>
          <marker id="hz-arrow" markerWidth="7" markerHeight="7" refX="5.5" refY="3" orient="auto">
            <path d="M0,0 L0,6 L7,3 z" fill="rgba(100,116,139,0.6)" />
          </marker>
        </defs>

        {/* Public Site panel */}
        <rect x="8" y="8" width="350" height="182" rx="12" fill="rgba(248,113,113,0.07)" stroke="rgba(248,113,113,0.28)" strokeWidth="1.2" />
        <text x="26" y="30" fontSize="9.5" fontWeight="700" letterSpacing="1.4" fill="#f87171">PUBLIC SITE</text>
        <rect x="24" y="42" width="318" height="62" rx="8" fill="rgba(255,255,255,0.05)" stroke="rgba(248,113,113,0.25)" strokeWidth="1" />
        <text x="183" y="62" textAnchor="middle" fontSize="11" fontWeight="600" fill="rgba(255,255,255,0.88)">Marketing Site</text>
        <text x="183" y="78" textAnchor="middle" fontSize="8.5" fill="rgba(255,255,255,0.4)">Hero · Team · Services · Reviews · Contact · "Book Now" CTAs</text>
        <rect x="24" y="112" width="318" height="62" rx="8" fill="rgba(255,255,255,0.05)" stroke="rgba(248,113,113,0.25)" strokeWidth="1" />
        <text x="183" y="132" textAnchor="middle" fontSize="11" fontWeight="600" fill="rgba(255,255,255,0.88)">Booking Flow</text>
        <text x="183" y="148" textAnchor="middle" fontSize="8.5" fill="rgba(255,255,255,0.4)">Service → Barber → Date → Time → Confirm</text>

        {/* Staff Dashboard panel */}
        <rect x="402" y="8" width="350" height="182" rx="12" fill="rgba(96,165,250,0.07)" stroke="rgba(96,165,250,0.28)" strokeWidth="1.2" />
        <text x="420" y="30" fontSize="9.5" fontWeight="700" letterSpacing="1.4" fill="#60a5fa">STAFF DASHBOARD</text>
        <rect x="418" y="42" width="318" height="62" rx="8" fill="rgba(255,255,255,0.05)" stroke="rgba(96,165,250,0.25)" strokeWidth="1" />
        <text x="577" y="62" textAnchor="middle" fontSize="11" fontWeight="600" fill="rgba(255,255,255,0.88)">Day View</text>
        <text x="577" y="78" textAnchor="middle" fontSize="8.5" fill="rgba(255,255,255,0.4)">All barbers + slots · booked vs walk-in · add walk-in manually</text>
        <rect x="418" y="112" width="318" height="62" rx="8" fill="rgba(255,255,255,0.05)" stroke="rgba(96,165,250,0.25)" strokeWidth="1" />
        <text x="577" y="132" textAnchor="middle" fontSize="11" fontWeight="600" fill="rgba(255,255,255,0.88)">POS Integration</text>
        <text x="577" y="148" textAnchor="middle" fontSize="8.5" fill="rgba(255,255,255,0.4)">Square POS sync · transaction tracking · service reconciliation</text>

        {/* connecting arrow */}
        <line x1="358" y1="99" x2="396" y2="99" stroke="rgba(148,163,184,0.5)" strokeWidth="1.4" markerEnd="url(#hz-arrow)" />

        {/* Data layer */}
        <rect x="8" y="212" width="744" height="72" rx="12" fill="rgba(20,184,166,0.07)" stroke="rgba(45,212,191,0.25)" strokeWidth="1.2" />
        <text x="26" y="234" fontSize="9.5" fontWeight="700" letterSpacing="1.4" fill="rgba(45,212,191,0.85)">DATA LAYER</text>
        <text x="380" y="262" textAnchor="middle" fontSize="10.5" fill="rgba(255,255,255,0.6)">
          barbers table · appointments table · services table · staff + POS transactions
        </text>

        <line x1="183" y1="190" x2="183" y2="212" stroke="rgba(45,212,191,0.4)" strokeWidth="1.2" strokeDasharray="4 3" markerEnd="url(#hz-arrow)" />
        <line x1="577" y1="190" x2="577" y2="212" stroke="rgba(45,212,191,0.4)" strokeWidth="1.2" strokeDasharray="4 3" markerEnd="url(#hz-arrow)" />
      </svg>
    </DiagramWrap>
  );
}

const timeline = [
  { phase: 'Brand + Marketing Site', desc: 'Hero with cinematic imagery, team profiles with barber headshots, services/pricing, Instagram gallery, Google reviews. Strong "Book Now" CTAs throughout.' },
  { phase: 'Booking Flow', desc: '4-step guided flow: service, barber, real-time date/time slot, customer info. No account required — just name and phone.' },
  { phase: 'Staff Dashboard', desc: 'Day view per barber showing booked appointments and walk-ins in one place. Staff can add walk-ins on the spot, preventing double-booking and clarifying wait times.' },
  { phase: 'Square POS + Barber Management', desc: 'Square POS sync for transaction tracking, services CRUD, barber profile management, time-off blocking, staff account creation and permissions.' },
];

const HeadzAintReady: React.FC = () => {
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
                Booking Platform
              </span>
              <span className="rounded-full border border-teal-500/40 bg-teal-950/40 px-3 py-1 text-xs font-semibold text-teal-400">Live</span>
            </div>
            <SectionLabel>Case Study</SectionLabel>
            <h1 className="font-display text-4xl font-extrabold tracking-tight text-slate-900 dark:text-white md:text-5xl">
              Headz Ain't Ready
            </h1>
            <p className="mt-4 text-lg leading-relaxed text-slate-600 dark:text-slate-400 max-w-2xl">
              A luxury-forward booking platform and staff dashboard for a Jackson Heights barbershop with a
              loyal following — no online booking, no account required, no double bookings.
            </p>
            <div className="mt-6 flex flex-wrap gap-4">
              <a href="https://headzaintready.com" target="_blank" rel="noopener noreferrer"
                className="flex items-center gap-2 rounded-lg px-4 py-2.5 text-sm font-semibold text-white transition-opacity hover:opacity-90"
                style={{ background: ACCENT }}>
                <ExternalLink size={15} strokeWidth={2} aria-hidden />
                Visit Live Site
              </a>
              <a href="https://github.com/visuxlize/Headz-Aint-Ready" target="_blank" rel="noopener noreferrer"
                className="flex items-center gap-2 rounded-lg border border-[var(--border)] bg-[var(--card)] px-4 py-2.5 text-sm font-medium text-slate-700 transition-colors hover:border-primary/50 hover:text-primary dark:text-slate-300">
                <Github size={15} strokeWidth={2} aria-hidden />
                GitHub
              </a>
            </div>
          </motion.div>

          <motion.div variants={fade} className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-4">
            <StatCard value="7" label="Barbers"          sub="On the roster" />
            <StatCard value="4" label="Booking Steps"    sub="Service → Confirm" />
            <StatCard value="2" label="Apps"             sub="Public + Staff" />
            <StatCard value="0" label="Customer Signup"  sub="Name + phone only" />
          </motion.div>
        </motion.div>

        <div className="my-14 h-px bg-[var(--border)]" />

        {/* ── The Problem ── */}
        <motion.section initial="hidden" whileInView="show" viewport={{ once: true }} variants={stagger} className="mb-14">
          <motion.div variants={fade}>
            <SectionLabel>The Problem</SectionLabel>
            <h2 className="font-display text-2xl font-bold text-slate-900 dark:text-white mb-4">A great reputation, no digital front door</h2>
            <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
              Headz Ain't Ready is a well-known barbershop in Jackson Heights, Queens with a loyal following —
              but their digital presence didn't match the quality of their work. Customers had no way to book
              online, walk-in wait times were unpredictable, and staff had no central view of who was coming
              in. The goal: a luxury-forward digital experience that tells the brand story, removes booking
              friction, and gives barbers clarity on their day.
            </p>
          </motion.div>
        </motion.section>

        <div className="my-14 h-px bg-[var(--border)]" />

        {/* ── Booking Flow ── */}
        <motion.section initial="hidden" whileInView="show" viewport={{ once: true }} variants={stagger} className="mb-14">
          <motion.div variants={fade}>
            <SectionLabel>Customer Experience</SectionLabel>
            <h2 className="font-display text-2xl font-bold text-slate-900 dark:text-white mb-6">Four steps, no account needed</h2>
          </motion.div>
          <motion.div variants={fade}>
            <BookingFlowDiagram />
          </motion.div>
        </motion.section>

        <div className="my-14 h-px bg-[var(--border)]" />

        {/* ── System Architecture ── */}
        <motion.section initial="hidden" whileInView="show" viewport={{ once: true }} variants={stagger} className="mb-14">
          <motion.div variants={fade}>
            <SectionLabel>Architecture</SectionLabel>
            <h2 className="font-display text-2xl font-bold text-slate-900 dark:text-white mb-6">Public booking, staff dashboard, one data layer</h2>
          </motion.div>
          <motion.div variants={fade}>
            <SystemArchitectureDiagram />
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
            {['Next.js 15', 'TypeScript', 'Supabase Auth + PostgreSQL', 'Drizzle ORM', 'Tailwind CSS',
              'Square POS', 'Vercel', 'Framer Motion'].map(t => (
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
            <h3 className="font-display text-xl font-bold text-slate-900 dark:text-white mb-2">Book a cut, or see the code</h3>
            <p className="text-sm text-slate-600 dark:text-slate-400 mb-5 max-w-md mx-auto">
              The live site is fully booking-enabled today.
            </p>
            <div className="flex flex-wrap justify-center gap-3">
              <a href="https://headzaintready.com" target="_blank" rel="noopener noreferrer"
                className="flex items-center gap-2 rounded-lg px-5 py-2.5 text-sm font-semibold text-white transition-opacity hover:opacity-90"
                style={{ background: ACCENT }}>
                <ExternalLink size={15} strokeWidth={2} aria-hidden />
                Visit Live Site
              </a>
              <a href="https://github.com/visuxlize/Headz-Aint-Ready" target="_blank" rel="noopener noreferrer"
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

export default HeadzAintReady;
