import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, ExternalLink, ShoppingCart, Repeat, PackagePlus, LineChart } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import monarcaHome from '../../Images/monarca-home.jpg';

const ACCENT = '#c98a2b';
const PROPOSAL_URL = process.env.PUBLIC_URL + '/case-studies/monarca-pdp-toolkit/';

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

const capabilities = [
  { Icon: ShoppingCart, title: 'PDP CRO', desc: 'Buy box, price, and social proof above the fold. Objection handling with a trust row, founder story, and FAQ.' },
  { Icon: Repeat, title: 'Subscribe & Save', desc: 'Framed as the default option, discount calculated live, wired in through a standard Shopify subscriptions app.' },
  { Icon: PackagePlus, title: 'Bundle Upsell', desc: 'A "Starter Ritual" bundle to raise order value without discounting the hero product into the ground.' },
  { Icon: LineChart, title: 'Analytics + Testing', desc: 'GA4 and Meta pixel events split by one-time vs. subscription, plus a documented A/B test on the subscribe default.' },
];

const matrix = [
  { need: 'High-converting Shopify builds', have: 'Custom Online Store 2.0 section built from scratch on Dawn, portable across products and editable without touching code.' },
  { need: 'Subscriptions and bundles', have: 'Subscribe and save plus a bundle upsell, both live and integrated through standard Shopify apps.' },
  { need: 'Testing optimization', have: 'A documented A/B test on the subscribe default, with a hypothesis, primary metric, guardrails, and a stopping rule.' },
  { need: 'Analytics and tracking', have: 'GA4 and Meta pixel setup with clean events for one-time versus subscription, so every test is measurable.' },
  { need: 'Mobile UX', have: 'Mobile-first layout with a sticky add-to-cart that keeps the CTA one tap away through the whole page.' },
];

const Monarca: React.FC = () => {
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
                Shopify CRO
              </span>
              <span className="rounded-full border border-amber-500/40 bg-amber-950/40 px-3 py-1 text-xs font-semibold text-amber-400">Client Proposal · Working Demo</span>
            </div>
            <SectionLabel>Case Study</SectionLabel>
            <h1 className="font-display text-4xl font-extrabold tracking-tight text-slate-900 dark:text-white md:text-5xl">
              Monarca Shopify CRO
            </h1>
            <p className="mt-4 text-lg leading-relaxed text-slate-600 dark:text-slate-400 max-w-2xl">
              A working Shopify build and conversion proposal for a DTC supplement brand, prepared for Alex
              Gonzalez, co-founder of Monarca Ulje. Instead of pitching the role, I built the store.
            </p>
            <div className="mt-6 flex flex-wrap gap-4">
              <a href={PROPOSAL_URL} target="_blank" rel="noopener noreferrer"
                className="flex items-center gap-2 rounded-lg px-4 py-2.5 text-sm font-semibold text-white transition-opacity hover:opacity-90"
                style={{ background: ACCENT }}>
                <ExternalLink size={15} strokeWidth={2} aria-hidden />
                View Proposal
              </a>
            </div>
          </motion.div>

          <motion.div variants={fade} className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-4">
            <StatCard value="Dawn Theme" label="Platform" sub="Custom OS 2.0 section" />
            <StatCard value="Default On" label="Subscribe & Save" sub="Live discount calc" />
            <StatCard value="Starter Ritual" label="Bundle Upsell" sub="AOV lever" />
            <StatCard value="GA4 + Meta" label="Tracking" sub="One-time vs. subscription" />
          </motion.div>
        </motion.div>

        <div className="my-14 h-px bg-[var(--border)]" />

        {/* ── The Ask ── */}
        <motion.section initial="hidden" whileInView="show" viewport={{ once: true }} variants={stagger} className="mb-14">
          <motion.div variants={fade}>
            <SectionLabel>The Ask</SectionLabel>
            <h2 className="font-display text-2xl font-bold text-slate-900 dark:text-white mb-4">Proof, not a pitch</h2>
            <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
              Alex posted that he was bringing Shopify in-house and building the team from the ground up, with
              a specific list of what the role needed to own: high-converting builds, PDP and landing page CRO,
              testing, subscriptions and bundles, AOV, analytics, app integration, and mobile UX. Rather than
              send a message claiming I could do it, I built a working Shopify store that demonstrates it,
              scoped to Monarca Ulje's natural hair and scalp care brand and its adjacent supplement business.
            </p>
          </motion.div>
        </motion.section>

        <div className="my-14 h-px bg-[var(--border)]" />

        {/* ── The Build ── */}
        <motion.section initial="hidden" whileInView="show" viewport={{ once: true }} variants={stagger} className="mb-14">
          <motion.div variants={fade}>
            <SectionLabel>The Solution</SectionLabel>
            <h2 className="font-display text-2xl font-bold text-slate-900 dark:text-white mb-6">A real store, not a mockup</h2>
          </motion.div>
          <motion.div variants={fade} className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            {capabilities.map(({ Icon, title, desc }) => (
              <div key={title} className="card-base p-5">
                <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-xl" style={{ background: `${ACCENT}1a`, border: `1px solid ${ACCENT}40` }}>
                  <Icon size={18} style={{ color: ACCENT }} strokeWidth={1.8} />
                </div>
                <h4 className="font-display text-sm font-semibold text-slate-900 dark:text-white mb-1">{title}</h4>
                <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">{desc}</p>
              </div>
            ))}
          </motion.div>
        </motion.section>

        <div className="my-14 h-px bg-[var(--border)]" />

        {/* ── Showcase ── */}
        <motion.section initial="hidden" whileInView="show" viewport={{ once: true }} variants={stagger} className="mb-14">
          <motion.div variants={fade}>
            <SectionLabel>The Demo</SectionLabel>
            <h2 className="font-display text-2xl font-bold text-slate-900 dark:text-white mb-4">Built on a live Shopify store</h2>
            <p className="text-slate-600 dark:text-slate-400 leading-relaxed mb-6">
              A palette pulled from the wellness and monarch-butterfly world sets the theme once, so the whole
              store reads as one coherent brand rather than a stock template. The full proposal walks through
              the product page, the bundle, and the reasoning behind each decision.
            </p>
          </motion.div>
          <motion.div variants={fade}>
            <img src={monarcaHome} alt="Homepage of the demo Shopify supplement store" className="w-full rounded-2xl border border-[var(--border)] block" loading="lazy" />
          </motion.div>
        </motion.section>

        <div className="my-14 h-px bg-[var(--border)]" />

        {/* ── Capability Matrix ── */}
        <motion.section initial="hidden" whileInView="show" viewport={{ once: true }} variants={stagger} className="mb-14">
          <motion.div variants={fade}>
            <SectionLabel>The Match</SectionLabel>
            <h2 className="font-display text-2xl font-bold text-slate-900 dark:text-white mb-6">The list, line by line</h2>
          </motion.div>
          <motion.div variants={fade} className="rounded-2xl border border-[var(--border)] overflow-hidden">
            {matrix.map((row, i) => (
              <div key={row.need} className={`grid grid-cols-1 gap-2 p-5 sm:grid-cols-[220px_1fr] sm:gap-6 ${i > 0 ? 'border-t border-[var(--border)]' : ''}`}>
                <span className="text-sm font-semibold" style={{ color: ACCENT }}>{row.need}</span>
                <span className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">{row.have}</span>
              </div>
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
            {['Shopify (Dawn theme)', 'Online Store 2.0 sections', 'Liquid', 'Subscriptions app', 'Bundle app',
              'GA4', 'Meta Pixel', 'Google UX Design', 'MIT UX/UI'].map(t => (
              <span key={t} className="chip">{t}</span>
            ))}
          </motion.div>
        </motion.section>

        {/* ── Footer CTA ── */}
        <motion.section initial="hidden" whileInView="show" viewport={{ once: true }} variants={stagger}>
          <motion.div variants={fade} className="card-base p-8 text-center border-l-2" style={{ borderLeftColor: ACCENT }}>
            <h3 className="font-display text-xl font-bold text-slate-900 dark:text-white mb-2">Read the full proposal</h3>
            <p className="text-sm text-slate-600 dark:text-slate-400 mb-5 max-w-md mx-auto">
              The research, the design concept, the full capability matrix, and the demo screenshots, in the
              document as it was delivered.
            </p>
            <div className="flex flex-wrap justify-center gap-3">
              <a href={PROPOSAL_URL} target="_blank" rel="noopener noreferrer"
                className="flex items-center gap-2 rounded-lg px-5 py-2.5 text-sm font-semibold text-white transition-opacity hover:opacity-90"
                style={{ background: ACCENT }}>
                <ExternalLink size={15} strokeWidth={2} aria-hidden />
                View Proposal
              </a>
            </div>
          </motion.div>
        </motion.section>

      </div>
    </div>
  );
};

export default Monarca;
