import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, Github } from 'lucide-react';
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

function StatCard({ value, label, sub }: { value: string; label: string; sub?: string }) {
  return (
    <div className="card-base p-5 text-center">
      <div className="font-display text-3xl font-bold text-slate-900 dark:text-white">{value}</div>
      <div className="mt-1 text-sm font-medium text-slate-700 dark:text-slate-300">{label}</div>
      {sub && <div className="mt-1 text-xs text-slate-500">{sub}</div>}
    </div>
  );
}

function FeatureCard({ title, desc, tags }: { title: string; desc: string; tags: string[] }) {
  return (
    <motion.div variants={fade} className="card-base p-5">
      <h4 className="font-display text-base font-semibold text-slate-900 dark:text-white mb-2">{title}</h4>
      <p className="text-sm leading-relaxed text-slate-600 dark:text-slate-400 mb-3">{desc}</p>
      <div className="flex flex-wrap gap-1.5">
        {tags.map(t => <span key={t} className="chip">{t}</span>)}
      </div>
    </motion.div>
  );
}

const MLBEdgePro: React.FC = () => {
  const navigate = useNavigate();
  useEffect(() => { window.scrollTo({ top: 0 }); }, []);

  const features = [
    { title: 'Game winner prediction', desc: 'Weighted model using pitcher ERA (30%), WHIP (15%), K/9 (10%), lineup OPS (25%), home field (10%), and weather (10%). Capped at 72% max.', tags: ['Python', 'Weighted scoring', 'Regression to mean'] },
    { title: 'HR probability model', desc: 'Blends batter OPS-based HR rate with pitcher HR/9 using binomial distribution over 4 PA. Wind direction and speed applied as boost or suppress.', tags: ['Binomial distribution', 'OPS', 'Wind adjustment'] },
    { title: 'Strikeout prediction', desc: 'Poisson model: Expected Ks = (K/9 / 9) x estimated innings x lineup K-rate. Compared against FanDuel K line to surface over/under probability.', tags: ['Poisson distribution', 'FanDuel props', 'K/9'] },
    { title: 'Prop edge detection', desc: 'Converts FanDuel American odds to implied probability. Where model probability exceeds implied by 3%+, the prop is flagged as an edge and ranked on the Today dashboard.', tags: ['Implied probability', 'American odds', 'Edge %'] },
    { title: 'Historical accuracy tracker', desc: 'Game-first dropdown flow pulls confirmed lineups from MLB Stats API. Log results after games. Model accuracy compounds over time.', tags: ['SQLite', 'MLB Stats API', 'Accuracy tracking'] },
    { title: 'Bet slip builder', desc: 'Select props from analysis using smart dropdowns filtered by game. Auto-calculates combined parlay odds, payout on any stake, and combined probability.', tags: ['Parlay math', 'FanDuel odds', 'Payout calculator'] },
  ];

  const stack = [
    { label: 'Backend', items: ['Python 3.14', 'FastAPI', 'SQLite + SQLModel', 'APScheduler'] },
    { label: 'Frontend', items: ['Next.js 14', 'TypeScript', 'Tailwind CSS', 'React'] },
    { label: 'APIs', items: ['MLB Stats API', 'The Odds API (FanDuel)', 'Open-Meteo weather', 'Anthropic Claude'] },
    { label: 'Models', items: ['Binomial distribution', 'Poisson distribution', 'Weighted scoring', 'Isotonic calibration'] },
  ];

  const timeline = [
    { phase: 'Foundation', desc: 'FastAPI backend, MLB Stats API integration, SQLite schema, game listing with weather data.' },
    { phase: 'Analysis engine', desc: 'HR probability model (binomial), hit probability, K predictions (Poisson), pitcher grades, game winner model.' },
    { phase: 'FanDuel integration', desc: 'The Odds API integration, prop edge detection, implied probability math, bet slip builder.' },
    { phase: 'Carbon Dark UI', desc: 'Full dark mode redesign with pastel red accent palette, card system, all pages rebuilt.' },
    { phase: 'Historical tracker', desc: 'Game-first dropdown flow, auto-save predictions from analysis, accuracy compounding.' },
    { phase: 'Daily leaders', desc: 'Cross-game leaderboards for HR, hits, pitcher Ks, and edges. Date-keyed cache, auto-clears at midnight.' },
  ];

  return (
    <div className="min-h-screen pt-24 pb-24">
      <div className="mx-auto max-w-4xl px-6">

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
            <div className="mb-4 flex flex-wrap items-center gap-3">
              <span className="rounded-full border border-rose-500/40 bg-rose-950/40 px-3 py-1 text-xs font-semibold text-rose-400">Personal project</span>
              <span className="rounded-full border border-teal-500/40 bg-teal-950/40 px-3 py-1 text-xs font-semibold text-teal-400">In Progress</span>
            </div>
            <SectionLabel>Case Study</SectionLabel>
            <h1 className="font-display text-4xl font-extrabold tracking-tight text-slate-900 dark:text-white md:text-5xl">
              MLB Edge Pro
            </h1>
            <p className="mt-4 text-lg leading-relaxed text-slate-600 dark:text-slate-400 max-w-2xl">
              A personal MLB prediction tool combining sports analytics, statistical modeling, and real-time
              prop edge detection. Built from scratch as a full-stack local app with a proprietary win/HR/K
              prediction model that calibrates with real results I log.
            </p>
            <div className="mt-6 flex flex-wrap gap-4">
              <a href="https://github.com/visuxlize/MLBEdgePro" target="_blank" rel="noopener noreferrer"
                className="flex items-center gap-2 rounded-lg border border-[var(--border)] bg-[var(--card)] px-4 py-2.5 text-sm font-medium text-slate-700 transition-colors hover:border-primary/50 hover:text-primary dark:text-slate-300">
                <Github size={15} strokeWidth={2} aria-hidden />
                View on GitHub
              </a>
            </div>
          </motion.div>

          <motion.div variants={fade} className="mt-10 grid grid-cols-2 gap-4 sm:grid-cols-4">
            <StatCard value="261" label="Players loaded" sub="from today's lineups" />
            <StatCard value="30" label="Pitchers daily" sub="probable starters" />
            <StatCard value="6" label="Weighted factors" sub="in win prediction" />
            <StatCard value="3" label="Stat models" sub="Binomial, Poisson, Weighted" />
          </motion.div>
        </motion.div>

        <div className="my-14 h-px bg-[var(--border)]" />

        <motion.section initial="hidden" whileInView="show" viewport={{ once: true }} variants={stagger} className="mb-14">
          <motion.div variants={fade}>
            <SectionLabel>The Problem</SectionLabel>
            <h2 className="font-display text-2xl font-bold text-slate-900 dark:text-white mb-4">Sports betting tools are black boxes</h2>
            <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
              Most sports analytics tools either give raw stats with no signal, or a pick with no explanation.
              I wanted to understand why a bet has value and how accurate those signals have been historically.
            </p>
          </motion.div>
          <motion.div variants={fade} className="mt-6 card-base p-6 border-l-2 border-l-primary">
            <p className="text-slate-700 dark:text-slate-300 leading-relaxed text-sm">
              The goal is to build a tool that explains its reasoning, tracks its own accuracy,
              and gets smarter every time I log a real result.
            </p>
          </motion.div>
        </motion.section>

        <motion.section initial="hidden" whileInView="show" viewport={{ once: true, margin: '-40px' }} variants={stagger} className="mb-14">
          <motion.div variants={fade}>
            <SectionLabel>What It Does</SectionLabel>
            <h2 className="font-display text-2xl font-bold text-slate-900 dark:text-white mb-6">Six core capabilities</h2>
          </motion.div>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            {features.map(f => <FeatureCard key={f.title} {...f} />)}
          </div>
        </motion.section>

        <motion.section initial="hidden" whileInView="show" viewport={{ once: true }} variants={stagger} className="mb-14">
          <motion.div variants={fade}>
            <SectionLabel>Architecture</SectionLabel>
            <h2 className="font-display text-2xl font-bold text-slate-900 dark:text-white mb-6">Local-first full stack</h2>
          </motion.div>
          <motion.div variants={fade} className="card-base p-6 mb-6">
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
              {stack.map(s => (
                <div key={s.label}>
                  <p className="text-xs font-bold uppercase tracking-widest text-slate-500 mb-3">{s.label}</p>
                  <ul className="space-y-2">
                    {s.items.map(item => (
                      <li key={item} className="flex items-center gap-2.5 text-sm text-slate-700 dark:text-slate-300">
                        <span className="h-1 w-1 shrink-0 rounded-full bg-primary" aria-hidden />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </motion.div>
        </motion.section>

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
                  <div className="absolute top-1 left-0 h-4 w-4 rounded-full border-2 border-primary bg-primary/20" aria-hidden />
                  <h4 className="font-display text-base font-semibold text-slate-900 dark:text-white">Phase {i + 1} — {item.phase}</h4>
                  <p className="mt-1 text-sm text-slate-600 dark:text-slate-400 leading-relaxed">{item.desc}</p>
                </motion.li>
              ))}
            </ul>
          </div>
        </motion.section>

        <motion.section initial="hidden" whileInView="show" viewport={{ once: true }} variants={stagger} className="mb-14">
          <motion.div variants={fade}>
            <SectionLabel>What I Learned</SectionLabel>
            <h2 className="font-display text-2xl font-bold text-slate-900 dark:text-white mb-6">Key takeaways</h2>
          </motion.div>
          <motion.div variants={fade} className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            {[
              { title: 'Statistical modeling is a design problem', desc: 'Choosing the right distribution matters less than understanding what question you are asking. HR probability is a per-PA event -- binomial. K totals are a rate over time -- Poisson.' },
              { title: 'Stale data kills trust immediately', desc: 'The biggest source of bugs was yesterday\'s data appearing as today\'s. Date-keyed caches, UNIQUE constraints, and check-before-insert are now defaults in every project.' },
              { title: 'Regression to the mean is underrated', desc: 'Raw scores had teams at 80%+ win probability. Capping at 72% and regressing toward 50% made predictions more accurate and more honest about real variance.' },
              { title: 'UX and dev cannot be separate passes', desc: 'Building the Carbon Dark theme and data model together forced better decisions. The UI shaped which fields the backend needed to return, and vice versa.' },
            ].map(item => (
              <div key={item.title} className="card-base p-5">
                <h4 className="font-display text-sm font-semibold text-slate-900 dark:text-white mb-2">{item.title}</h4>
                <p className="text-sm leading-relaxed text-slate-600 dark:text-slate-400">{item.desc}</p>
              </div>
            ))}
          </motion.div>
        </motion.section>

        <motion.section initial="hidden" whileInView="show" viewport={{ once: true }} variants={stagger}>
          <motion.div variants={fade}>
            <SectionLabel>What's Next</SectionLabel>
            <h2 className="font-display text-2xl font-bold text-slate-900 dark:text-white mb-4">Still building</h2>
            <p className="text-slate-600 dark:text-slate-400 leading-relaxed mb-6">
              This project is actively in development. The prediction model improves as more real results are logged.
              Planned additions include isotonic regression for probability calibration and a performance tracking page with Brier score and ROI.
            </p>
            <div className="flex flex-wrap gap-3">
              {['Isotonic regression calibrator', 'Brier score tracking', 'ROI dashboard', 'NBA model'].map(item => (
                <span key={item} className="chip">{item}</span>
              ))}
            </div>
          </motion.div>
        </motion.section>

      </div>
    </div>
  );
};

export default MLBEdgePro;
