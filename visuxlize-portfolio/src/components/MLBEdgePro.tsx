import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import {
  ArrowLeft, Github, Globe, Smartphone, ExternalLink, Sparkles,
  UserPlus, CircleDot, Zap, Flame, BarChart3, TrendingUp, Cloud, Target, Activity,
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

// Screenshots
import img01 from '../Images/01-today-dashboard.png';
import img02 from '../Images/02-scores-tab.png';
import img03 from '../Images/03-game-detail-pitchers-weather.png';
import img04 from '../Images/04-game-detail-edge-analysis-batter-props.png';
import img05 from '../Images/05-player-profile-dominic-smith.png';
import img06 from '../Images/06-analysis-matchups.png';
import img07 from '../Images/07-analysis-edge-report.png';
import img08 from '../Images/08-analysis-props.png';
import img09 from '../Images/09-prop-builder-home-run.png';
import img10 from '../Images/10-prop-builder-select-game.png';
import img11 from '../Images/11-prop-builder-add-to-slip.png';
import img12 from '../Images/12-prop-builder-your-slip.png';
import img13 from '../Images/13-settings-account-bet-history.png';
import img14 from '../Images/14-settings-parlay-detail.png';
import img15 from '../Images/15-onboarding-choose-team.png';
import img16 from '../Images/16-auth-sign-in.png';
import img17 from '../Images/17-onboarding-01-intro.png';
import img18 from '../Images/18-onboarding-02-responsible-gaming.png';
import img19 from '../Images/19-onboarding-03-smarter.png';
import img20 from '../Images/20-auth-create-account.png';

// ── Motion variants ───────────────────────────────────────────────────────────

const fade = {
  hidden: { opacity: 0, y: 20 },
  show:   { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] } },
};
const stagger = {
  hidden: { opacity: 0 },
  show:   { opacity: 1, transition: { staggerChildren: 0.1 } },
};
const fadeLeft = {
  hidden: { opacity: 0, x: -20 },
  show:   { opacity: 1, x: 0, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] } },
};
const fadeRight = {
  hidden: { opacity: 0, x: 20 },
  show:   { opacity: 1, x: 0, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] } },
};

// ── Shared primitives ─────────────────────────────────────────────────────────

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

// ── SVG icon set (stroke-based, Lucide-style) ─────────────────────────────────

const SW = 1.6;
function Ic({ size = 20, children, color = 'currentColor' }: { size?: number; children: React.ReactNode; color?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none"
      stroke={color} strokeWidth={SW} strokeLinecap="round" strokeLinejoin="round">
      {children}
    </svg>
  );
}

const IconToday    = ({ size=20, color='currentColor' }: {size?:number;color?:string}) => <Ic size={size} color={color}><path d="M12 3L21 12L12 21L3 12Z"/><circle cx="12" cy="12" r="2"/><path d="M12 3v9M12 15v6M3 12h9M15 12h6" strokeWidth="1"/></Ic>;
const IconScores   = ({ size=20, color='currentColor' }: {size?:number;color?:string}) => <Ic size={size} color={color}><rect x="3" y="5" width="18" height="3" rx="1"/><rect x="3" y="10.5" width="18" height="3" rx="1"/><rect x="3" y="16" width="12" height="3" rx="1"/></Ic>;
const IconAnalysis = ({ size=20, color='currentColor' }: {size?:number;color?:string}) => <Ic size={size} color={color}><path d="M18 20V10"/><path d="M12 20V4"/><path d="M6 20v-6"/></Ic>;
const IconBuilder  = ({ size=20, color='currentColor' }: {size?:number;color?:string}) => <Ic size={size} color={color}><path d="M12 2L19 7v10l-7 5-7-5V7Z"/><path d="M12 2v20" strokeWidth="1"/><path d="M5 7l14 0" strokeWidth="1"/><path d="M5 17l14 0" strokeWidth="1"/></Ic>;
const IconSettings = ({ size=20, color='currentColor' }: {size?:number;color?:string}) => <Ic size={size} color={color}><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"/></Ic>;
const IconLock     = ({ size=20, color='currentColor' }: {size?:number;color?:string}) => <Ic size={size} color={color}><rect x="5" y="11" width="14" height="11" rx="2"/><path d="M8 11V7a4 4 0 0 1 8 0v4"/></Ic>;
const IconCalendar = ({ size=20, color='currentColor' }: {size?:number;color?:string}) => <Ic size={size} color={color}><rect x="3" y="4" width="18" height="18" rx="2"/><path d="M16 2v4M8 2v4M3 10h18"/></Ic>;
const IconTarget   = ({ size=20, color='currentColor' }: {size?:number;color?:string}) => <Ic size={size} color={color}><circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="6"/><circle cx="12" cy="12" r="2"/></Ic>;
const IconCheck    = ({ size=20, color='currentColor' }: {size?:number;color?:string}) => <Ic size={size} color={color}><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></Ic>;
const IconWind     = ({ size=20, color='currentColor' }: {size?:number;color?:string}) => <Ic size={size} color={color}><path d="M9.59 4.59A2 2 0 1 1 11 8H2"/><path d="M12.59 19.41A2 2 0 1 0 14 16H2"/><path d="M6.91 12.49A2 2 0 1 0 8 16h10"/></Ic>;
const IconPitcher  = ({ size=20, color='currentColor' }: {size?:number;color?:string}) => <Ic size={size} color={color}><circle cx="12" cy="5" r="2"/><path d="M12 7L9 14L7 20"/><path d="M12 7L15 14L17 20"/><path d="M9 11h6"/><circle cx="19" cy="8" r="2.5"/><path d="M17.2 6.5Q18 8 17.2 9.5M20.8 6.5Q20 8 20.8 9.5" strokeWidth="1"/></Ic>;
const IconTrend    = ({ size=20, color='currentColor' }: {size?:number;color?:string}) => <Ic size={size} color={color}><polyline points="23 6 13.5 15.5 8.5 10.5 1 18"/><polyline points="17 6 23 6 23 12"/></Ic>;

// ── Phone frame components ────────────────────────────────────────────────────

function PhoneFrame({ src, alt, caption }: { src: string; alt: string; caption?: string }) {
  return (
    <div className="flex flex-col items-center gap-3">
      <div className="relative overflow-hidden rounded-[2.6rem] border border-white/10 shadow-2xl"
        style={{ background: '#0A0E14', padding: '10px', width: '100%', maxWidth: 220 }}>
        <div className="absolute top-[18px] left-1/2 -translate-x-1/2 z-10 rounded-full bg-black"
          style={{ width: 80, height: 22 }} />
        <img src={src} alt={alt} className="w-full rounded-[2.2rem] block" loading="lazy" />
      </div>
      {caption && <p className="text-xs text-slate-500 text-center leading-snug max-w-[200px]">{caption}</p>}
    </div>
  );
}

function PhoneFrameSm({ src, alt, caption }: { src: string; alt: string; caption?: string }) {
  return (
    <div className="flex flex-col items-center gap-2">
      <div className="relative overflow-hidden rounded-[2.2rem] border border-white/10 shadow-xl"
        style={{ background: '#0A0E14', padding: '8px', width: '100%', maxWidth: 160 }}>
        <div className="absolute top-[14px] left-1/2 -translate-x-1/2 z-10 rounded-full bg-black"
          style={{ width: 60, height: 18 }} />
        <img src={src} alt={alt} className="w-full rounded-[1.8rem] block" loading="lazy" />
      </div>
      {caption && <p className="text-[11px] text-slate-500 text-center leading-snug max-w-[150px]">{caption}</p>}
    </div>
  );
}

// ── Browser chrome frame — wraps coded UI mockups for the web app (no screenshot files) ─────────

function BrowserFrame({ url = 'mlbedgepro.dev', title, children }: { url?: string; title?: string; children: React.ReactNode }) {
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

// ── Diagram dark wrapper — forces consistent dark appearance in light+dark mode ─

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

// ── Diagram: Tab Map ──────────────────────────────────────────────────────────

function TabMapDiagram() {
  const tabs = [
    { Icon: IconToday,    name: 'Today',    desc: 'Games · Weather · Slips' },
    { Icon: IconScores,   name: 'Scores',   desc: 'Results · R/H/E · CTAs' },
    { Icon: IconAnalysis, name: 'Analysis', desc: 'Matchups · Edge Score' },
    { Icon: IconBuilder,  name: 'Builder',  desc: 'Props · Parlay · Odds' },
    { Icon: IconSettings, name: 'Settings', desc: 'History · Win Rate' },
  ];
  return (
    <div className="card-base p-6">
      <p className="text-xs font-bold uppercase tracking-widest text-slate-500 mb-5">App Tab Architecture</p>
      <div className="grid grid-cols-5 gap-2">
        {tabs.map(({ Icon, name, desc }, i) => (
          <div key={name} className="flex flex-col items-center text-center gap-2">
            <div className="w-12 h-12 rounded-2xl flex items-center justify-center border"
              style={{
                background: i === 0 ? 'rgba(255,120,40,0.12)' : 'var(--card)',
                borderColor: i === 0 ? 'rgba(255,120,40,0.35)' : 'var(--border)',
                color: i === 0 ? '#FF7828' : 'rgb(100 116 139)',
              }}>
              <Icon size={18} />
            </div>
            <p className="text-xs font-semibold text-slate-800 dark:text-slate-200">{name}</p>
            <p className="text-[10px] text-slate-500 leading-tight">{desc}</p>
          </div>
        ))}
      </div>
      <div className="mt-5 flex items-center justify-center gap-0">
        {tabs.map(({ name }, i) => (
          <React.Fragment key={name}>
            <div className="h-[3px] rounded-full" style={{ width: 28, background: i === 0 ? '#FF7828' : 'var(--border)' }} />
            {i < tabs.length - 1 && <div className="h-px w-5 bg-[var(--border)]" />}
          </React.Fragment>
        ))}
      </div>
      <p className="text-center text-[10px] text-slate-500 mt-2">Liquid Glass tab bar · iOS 26 native · blur fallback for older iOS</p>
    </div>
  );
}

// ── Diagram: User Journey ─────────────────────────────────────────────────────

function UserJourneyDiagram() {
  const steps = [
    { Icon: IconLock,     title: 'Onboard',  desc: 'Pick team, responsible gaming' },
    { Icon: IconCalendar, title: 'Today',    desc: "Today's slate, weather, featured game" },
    { Icon: IconScores,   title: 'Scores',   desc: 'Results, live scores, pitchers' },
    { Icon: IconAnalysis, title: 'Analysis', desc: 'Edge score, pitcher vs batter' },
    { Icon: IconTarget,   title: 'Builder',  desc: 'Stack props, probability + odds' },
    { Icon: IconCheck,    title: 'Track',    desc: 'Log result, win rate compounds' },
  ];
  return (
    <div className="card-base p-6">
      <p className="text-xs font-bold uppercase tracking-widest text-slate-500 mb-5">User Journey</p>
      <div className="relative">
        <div className="absolute top-6 left-6 right-6 h-px bg-[var(--border)] hidden sm:block" />
        <div className="grid grid-cols-3 sm:grid-cols-6 gap-4 relative">
          {steps.map(({ Icon, title, desc }, i) => (
            <div key={title} className="flex flex-col items-center text-center gap-2">
              <div className="relative z-10 w-12 h-12 rounded-full flex items-center justify-center border-2"
                style={{ background: 'var(--bg)', borderColor: i === 0 ? '#FF7828' : 'var(--border)', color: i === 0 ? '#FF7828' : 'rgb(100 116 139)' }}>
                <Icon size={16} />
              </div>
              <div>
                <p className="text-xs font-semibold text-slate-800 dark:text-slate-200">{title}</p>
                <p className="text-[10px] text-slate-500 leading-tight mt-0.5">{desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ── Diagram: Prediction Pipeline ──────────────────────────────────────────────

function PredictionPipelineDiagram() {
  return (
    <div className="card-base p-6 overflow-x-auto">
      <p className="text-xs font-bold uppercase tracking-widest text-slate-500 mb-5">Prediction Model Pipeline</p>
      <div className="hidden sm:flex items-start gap-2">
        <div className="flex flex-col gap-2 flex-shrink-0">
          <p className="text-[10px] font-bold uppercase tracking-widest text-slate-500 mb-1 text-center">Inputs</p>
          {['Pitcher ERA/WHIP/K9','Lineup OPS','Home field','Wind + Weather','Batter HR rate'].map(s => (
            <div key={s} className="rounded-lg px-3 py-1.5 text-xs text-slate-700 dark:text-slate-300 border border-[var(--border)] bg-[var(--card)] whitespace-nowrap">{s}</div>
          ))}
        </div>
        <div className="flex items-center self-center pt-6 text-slate-400">
          <svg width="24" height="16" viewBox="0 0 24 16" fill="none"><line x1="0" y1="8" x2="20" y2="8" stroke="currentColor" strokeWidth="1.5"/><polyline points="14,3 20,8 14,13" stroke="currentColor" strokeWidth="1.5" fill="none"/></svg>
        </div>
        <div className="flex flex-col gap-2 flex-shrink-0">
          <p className="text-[10px] font-bold uppercase tracking-widest text-slate-500 mb-1 text-center">Models</p>
          {[
            { label: 'Weighted Scoring', color: '#FF7828', bg: 'rgba(255,120,40,0.12)', border: 'rgba(255,120,40,0.35)' },
            { label: 'Binomial Dist.',   color: '#818cf8', bg: 'rgba(99,102,241,0.12)', border: 'rgba(99,102,241,0.35)' },
            { label: 'Poisson Dist.',    color: '#2dd4bf', bg: 'rgba(20,184,166,0.12)', border: 'rgba(20,184,166,0.35)' },
          ].map(m => (
            <div key={m.label} className="rounded-lg px-3 py-1.5 text-xs font-semibold whitespace-nowrap"
              style={{ background: m.bg, border: `1px solid ${m.border}`, color: m.color }}>{m.label}</div>
          ))}
        </div>
        <div className="flex items-center self-center pt-6 text-slate-400">
          <svg width="24" height="16" viewBox="0 0 24 16" fill="none"><line x1="0" y1="8" x2="20" y2="8" stroke="currentColor" strokeWidth="1.5"/><polyline points="14,3 20,8 14,13" stroke="currentColor" strokeWidth="1.5" fill="none"/></svg>
        </div>
        <div className="flex flex-col gap-2 flex-shrink-0">
          <p className="text-[10px] font-bold uppercase tracking-widest text-slate-500 mb-1 text-center">Calibration</p>
          {['72% win cap','Regress → 50%','Implied odds Δ'].map(s => (
            <div key={s} className="rounded-lg px-3 py-1.5 text-xs text-slate-700 dark:text-slate-300 border border-[var(--border)] bg-[var(--card)] whitespace-nowrap">{s}</div>
          ))}
        </div>
        <div className="flex items-center self-center pt-6 text-slate-400">
          <svg width="24" height="16" viewBox="0 0 24 16" fill="none"><line x1="0" y1="8" x2="20" y2="8" stroke="currentColor" strokeWidth="1.5"/><polyline points="14,3 20,8 14,13" stroke="currentColor" strokeWidth="1.5" fill="none"/></svg>
        </div>
        <div className="flex flex-col gap-2 flex-shrink-0">
          <p className="text-[10px] font-bold uppercase tracking-widest text-slate-500 mb-1 text-center">Output</p>
          {[
            { label: 'Win %',   color: '#FF7828', bg: 'rgba(255,120,40,0.12)', border: 'rgba(255,120,40,0.35)' },
            { label: 'HR Prob', color: '#818cf8', bg: 'rgba(99,102,241,0.12)', border: 'rgba(99,102,241,0.35)' },
            { label: 'K Total', color: '#2dd4bf', bg: 'rgba(20,184,166,0.12)', border: 'rgba(20,184,166,0.35)' },
          ].map(m => (
            <div key={m.label} className="rounded-lg px-3 py-2 text-xs font-bold text-center whitespace-nowrap"
              style={{ background: m.bg, border: `1px solid ${m.border}`, color: m.color }}>{m.label}</div>
          ))}
        </div>
        <div className="flex items-center self-center pt-6 text-slate-400">
          <svg width="24" height="16" viewBox="0 0 24 16" fill="none"><line x1="0" y1="8" x2="20" y2="8" stroke="currentColor" strokeWidth="1.5"/><polyline points="14,3 20,8 14,13" stroke="currentColor" strokeWidth="1.5" fill="none"/></svg>
        </div>
        <div className="flex flex-col gap-2 flex-shrink-0 self-center">
          <p className="text-[10px] font-bold uppercase tracking-widest text-slate-500 mb-1 text-center">Edge Check</p>
          <div className="rounded-xl px-4 py-3 text-xs font-bold text-center"
            style={{ background: 'rgba(255,120,40,0.15)', border: '1.5px solid rgba(255,120,40,0.45)', color: '#FF7828' }}>
            Model prob &gt; implied<br />by 3%+ → flag edge
          </div>
        </div>
      </div>
      <div className="sm:hidden space-y-3">
        {[
          'Pitcher ERA · WHIP · K/9 · Lineup OPS → Weighted Score',
          'Batter OPS · Pitcher HR/9 · Wind boost → Binomial HR%',
          'K/9 rate × innings × lineup K-rate → Poisson K total',
          'Model prob vs FanDuel implied → Edge flagged at +3%',
        ].map((s, i) => (
          <div key={i} className="flex items-start gap-3 card-base p-3">
            <span className="text-[10px] font-bold text-primary mt-0.5">Step {i + 1}</span>
            <span className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">{s}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

// ── Diagram: Parlay Math ──────────────────────────────────────────────────────

function ParlayMathDiagram() {
  return (
    <div className="card-base p-5 border-l-2 border-l-primary">
      <p className="text-xs font-bold uppercase tracking-widest text-slate-500 mb-4">Parlay Payout Math — matches FanDuel exactly</p>
      <div className="space-y-3 font-mono text-xs">
        {[
          { step: '01', label: 'Convert American odds → decimal', code: '+odds → (odds / 100) + 1\n−odds → (100 / |odds|) + 1' },
          { step: '02', label: 'Multiply all decimal odds', code: 'product = d₁ × d₂ × d₃ × … × dₙ' },
          { step: '03', label: 'Convert back to American', code: 'Math.floor((product − 1) × 100)\n→ exact FanDuel parlay line' },
        ].map(({ step, label, code }) => (
          <div key={step} className="flex items-start gap-3">
            <span className="text-primary font-bold mt-0.5">{step}</span>
            <div>
              <span className="text-slate-700 dark:text-slate-300 not-italic font-sans text-xs">{label}</span>
              <div className="mt-1 rounded-lg bg-[var(--card)] border border-[var(--border)] px-3 py-2 text-slate-600 dark:text-slate-400 whitespace-pre-line leading-relaxed">{code}</div>
            </div>
          </div>
        ))}
        <div className="rounded-xl border border-primary/30 bg-primary/5 px-4 py-3 mt-1 font-mono text-xs">
          <span className="text-slate-600 dark:text-slate-400">Example: +570 · +520 · +820 · +285 </span>
          <span className="text-primary font-bold">→ +147,034</span>
        </div>
      </div>
    </div>
  );
}

// ── Diagram: Architecture (SVG, forced dark) ──────────────────────────────────
//
// ViewBox: 760 × 448
// 5 horizontal bands, top = Presentation, bottom = External Services
// Node x-positions computed via calcX() — no hardcoded values
//
// Layer y  h   bottom
// [0] UI     8  76  84
// [1] State 96  72 168
// [2] Data  180  72 252
// [3] API   264  72 336
// [4] Ext   348  72 420
// footer text: y=438

function ArchitectureDiagram() {
  // helper: centre-spread n nodes of width nw with gap g inside band width 744 (x 8..752)
  function cx(count: number, nw: number, g: number, i: number) {
    const total = count * nw + (count - 1) * g;
    const startX = (744 - total) / 2 + 8;
    return startX + i * (nw + g) + nw / 2;
  }

  // Arrow connector: draws a short vertical dashed line from y1 to y2 at given x
  function Connector({ x, y1, y2 }: { x: number; y1: number; y2: number }) {
    return (
      <line x1={x} y1={y1} x2={x} y2={y2}
        stroke="rgba(100,116,139,0.4)" strokeWidth="1.2" strokeDasharray="4 3"
        markerEnd="url(#aa)" />
    );
  }

  const bandH = 72;
  const layers = [
    {
      label: 'PRESENTATION LAYER', sub: 'Expo Router v3 · File-based routing',
      labelColor: 'rgba(200,210,225,0.75)', fill: 'rgba(255,255,255,0.04)', stroke: 'rgba(255,255,255,0.11)',
      y: 8,
      nodes: [
        { label: 'Today',    sub: 'games.tsx' },
        { label: 'Scores',   sub: 'scores.tsx' },
        { label: 'Analysis', sub: 'matchups.tsx' },
        { label: 'Builder',  sub: 'props.tsx' },
        { label: 'Settings', sub: 'settings-tab.tsx' },
      ],
      nw: 128, ng: 12,
    },
    {
      label: 'STATE LAYER', sub: 'React Context',
      labelColor: '#FF7828', fill: 'rgba(255,120,40,0.08)', stroke: 'rgba(255,120,40,0.28)',
      y: 96,
      nodes: [
        { label: 'SavedSlipsContext', sub: 'global slip state · all tabs' },
        { label: 'TabScrollContext',  sub: 'scroll-to-top on tab press' },
      ],
      nw: 228, ng: 52,
    },
    {
      label: 'DATA LAYER', sub: 'TanStack React Query v5',
      labelColor: '#818cf8', fill: 'rgba(99,102,241,0.08)', stroke: 'rgba(99,102,241,0.28)',
      y: 180,
      nodes: [
        { label: 'useGames()',    sub: '1 min stale' },
        { label: 'useWeather()', sub: '15 min stale' },
        { label: 'AsyncStorage', sub: 'slip persistence' },
        { label: 'useAuth()',    sub: 'session state' },
      ],
      nw: 160, ng: 12,
    },
    {
      label: 'API LAYER', sub: '',
      labelColor: '#2dd4bf', fill: 'rgba(20,184,166,0.07)', stroke: 'rgba(20,184,166,0.25)',
      y: 264,
      nodes: [
        { label: 'mlb.ts',     sub: 'games · players · pitchers' },
        { label: 'weather.ts', sub: 'conditions · wind · temp' },
      ],
      nw: 228, ng: 52,
    },
    {
      label: 'EXTERNAL SERVICES', sub: '',
      labelColor: 'rgba(45,212,191,0.65)', fill: 'rgba(20,184,166,0.05)', stroke: 'rgba(20,184,166,0.18)',
      y: 348,
      nodes: [
        { label: 'MLB Stats API', sub: 'statsapi.mlb.com · no key required' },
        { label: 'Open-Meteo',    sub: 'api.open-meteo.com · no key required' },
      ],
      nw: 228, ng: 52,
    },
  ];

  // pre-compute node centre-x values for arrow drawing
  const nodeCX = layers.map(l => l.nodes.map((_, i) => cx(l.nodes.length, l.nw, l.ng, i)));

  return (
    <DiagramWrap title="System Architecture Diagram">
      <svg viewBox="0 0 760 448" className="w-full" style={{ minWidth: 480, fontFamily: 'DM Sans, sans-serif' }}>
        <defs>
          <marker id="aa" markerWidth="7" markerHeight="7" refX="5.5" refY="3" orient="auto">
            <path d="M0,0 L0,6 L7,3 z" fill="rgba(100,116,139,0.55)" />
          </marker>
        </defs>

        {layers.map((layer, li) => {
          const nodeY  = layer.y + 20;
          const nodeH  = bandH - 26;

          return (
            <g key={layer.label}>
              {/* Band */}
              <rect x="8" y={layer.y} width="744" height={bandH} rx="10"
                fill={layer.fill} stroke={layer.stroke} strokeWidth="1.2" />

              {/* Band label */}
              <text x="22" y={layer.y + 14} fontSize="9" fontWeight="700" letterSpacing="1.4"
                fill={layer.labelColor}>
                {layer.label}
                {layer.sub && (
                  <tspan fill="rgba(255,255,255,0.25)" fontWeight="400"> — {layer.sub}</tspan>
                )}
              </text>

              {/* Nodes */}
              {layer.nodes.map((node, ni) => {
                const nx = nodeCX[li][ni] - layer.nw / 2;
                return (
                  <g key={node.label}>
                    <rect x={nx} y={nodeY} width={layer.nw} height={nodeH} rx="7"
                      fill="rgba(255,255,255,0.05)" stroke={layer.stroke} strokeWidth="1" />
                    <text x={nodeCX[li][ni]} y={nodeY + nodeH / 2 - 4} textAnchor="middle"
                      fill="rgba(255,255,255,0.88)" fontSize="11" fontWeight="600">{node.label}</text>
                    <text x={nodeCX[li][ni]} y={nodeY + nodeH / 2 + 11} textAnchor="middle"
                      fill="rgba(255,255,255,0.38)" fontSize="9">{node.sub}</text>
                  </g>
                );
              })}

              {/* Connectors to next layer */}
              {li < layers.length - 1 && (
                <>
                  <Connector
                    x={nodeCX[li][0]}
                    y1={layer.y + bandH}
                    y2={layers[li + 1].y - 1}
                  />
                  {layer.nodes.length >= 2 && (
                    <Connector
                      x={nodeCX[li][layer.nodes.length - 1]}
                      y1={layer.y + bandH}
                      y2={layers[li + 1].y - 1}
                    />
                  )}
                </>
              )}
            </g>
          );
        })}

        <text x="380" y="442" textAnchor="middle" fontSize="9" fill="rgba(255,255,255,0.18)">
          Data flows upward through React Query caching → Context → Screens
        </text>
      </svg>
    </DiagramWrap>
  );
}

// ── Diagram: UML Component (SVG, forced dark) ─────────────────────────────────
//
// ViewBox: 760 × 488
//
// Row           y    h    bottom
// Root rect     8   84    92
// gap           92  →  112
// Tab Navigator 112  44   156
// gap          156  →  176
// 5 Screens    176   52   228
// gap          228  →  250
// 4 Modules    250  108   358
// gap          358  →  376
// API box      376   48   424
// Legend (same row as API box, x=294)

function UMLDiagram() {
  // ── layout constants ──────────────────────────────────────────────
  // Band total usable width: 744 (x 8..752)
  // 4 provider pills: w=152, gap=10 → total=638, startX=61
  const PILL_W = 152;
  const pillXs = [61, 223, 385, 547] as const;
  const pillLabels = ['SavedSlipsProvider','QueryClientProvider','TabScrollProvider','Stack.Navigator'] as const;

  // Tab Navigator centre
  const NAV_CX = 380;

  // 5 screens: w=116, gap=11 → total=624, startX=68
  const SCR_W = 116;
  const screenXs = [68, 195, 322, 449, 576] as const;
  const scrCX = screenXs.map(x => x + SCR_W / 2); // 126,253,380,507,634

  // 4 module boxes: w=162, gap=10 → total=678, startX=41
  const MOD_W = 162;
  const modXs = [41, 213, 385, 557] as const;
  const modCX = modXs.map(x => x + MOD_W / 2); // 122,294,466,638

  // module definitions
  const modules = [
    {
      label: '«COMPONENTS»',   lc: 'rgba(129,140,248,0.88)',
      fill: 'rgba(99,102,241,0.09)',  stroke: 'rgba(99,102,241,0.3)',
      items: ['GameCard','PlayerHeadshot','GlassCard','TeamLogo','LiquidGlassTabBar'],
    },
    {
      label: '«HOOKS»',         lc: 'rgba(129,140,248,0.88)',
      fill: 'rgba(99,102,241,0.09)',  stroke: 'rgba(99,102,241,0.3)',
      items: ['useGames()','useWeather()','useSavedSlips()','useAuth()','useSettings()'],
    },
    {
      label: '«CONTEXT»',       lc: 'rgba(255,120,40,0.88)',
      fill: 'rgba(255,120,40,0.08)', stroke: 'rgba(255,120,40,0.28)',
      items: ['SavedSlipsContext','TabScrollContext','','',''],
    },
    {
      label: '«UTILS»',         lc: 'rgba(200,210,225,0.65)',
      fill: 'rgba(255,255,255,0.04)', stroke: 'rgba(255,255,255,0.1)',
      items: ['slipStorage','edgeScore','predictions','weatherImpact',''],
    },
  ];

  return (
    <DiagramWrap title="UML Component Diagram">
      <svg viewBox="0 0 760 488" className="w-full" style={{ minWidth: 480, fontFamily: 'DM Sans, sans-serif' }}>
        <defs>
          {/* solid arrow — composition */}
          <marker id="ua"  markerWidth="7" markerHeight="7" refX="5.5" refY="3" orient="auto"><path d="M0,0 L0,6 L7,3 z" fill="rgba(100,116,139,0.6)"/></marker>
          {/* orange arrow — primary composition */}
          <marker id="uap" markerWidth="7" markerHeight="7" refX="5.5" refY="3" orient="auto"><path d="M0,0 L0,6 L7,3 z" fill="rgba(255,120,40,0.78)"/></marker>
          {/* indigo arrow — dependency */}
          <marker id="uab" markerWidth="7" markerHeight="7" refX="5.5" refY="3" orient="auto"><path d="M0,0 L0,6 L7,3 z" fill="rgba(129,140,248,0.72)"/></marker>
          {/* teal arrow — API call */}
          <marker id="uat" markerWidth="7" markerHeight="7" refX="5.5" refY="3" orient="auto"><path d="M0,0 L0,6 L7,3 z" fill="rgba(45,212,191,0.72)"/></marker>
        </defs>

        {/* ══ ROOT LAYOUT rect ══ */}
        <rect x="8" y="8" width="744" height="84" rx="10"
          fill="rgba(255,120,40,0.08)" stroke="rgba(255,120,40,0.32)" strokeWidth="1.2" />
        {/* title + filename */}
        <text x="380" y="28" textAnchor="middle" fill="rgba(255,120,40,0.78)" fontSize="9" fontWeight="700" letterSpacing="1.5">«ROOT LAYOUT»</text>
        <text x="380" y="44" textAnchor="middle" fill="rgba(255,255,255,0.85)" fontSize="12" fontWeight="600">app/_layout.tsx</text>
        {/* divider */}
        <line x1="24" y1="53" x2="736" y2="53" stroke="rgba(255,120,40,0.16)" strokeWidth="1" />
        {/* provider pills */}
        {pillXs.map((x, i) => (
          <g key={pillLabels[i]}>
            <rect x={x} y="59" width={PILL_W} height="24" rx="6"
              fill="rgba(255,120,40,0.1)" stroke="rgba(255,120,40,0.22)" strokeWidth="1" />
            <text x={x + PILL_W / 2} y="75" textAnchor="middle"
              fill="rgba(255,120,40,0.85)" fontSize="9.5">{pillLabels[i]}</text>
          </g>
        ))}

        {/* ══ ROOT → TAB NAVIGATOR ══ */}
        <line x1={NAV_CX} y1="92" x2={NAV_CX} y2="112"
          stroke="rgba(255,120,40,0.52)" strokeWidth="1.4" markerEnd="url(#uap)" />

        {/* ══ TAB NAVIGATOR ══ */}
        <rect x="220" y="112" width="320" height="44" rx="8"
          fill="rgba(255,255,255,0.05)" stroke="rgba(255,255,255,0.14)" strokeWidth="1.2" />
        <text x={NAV_CX} y="131" textAnchor="middle" fill="rgba(255,255,255,0.38)" fontSize="8.5" fontWeight="700" letterSpacing="1.5">«TAB NAVIGATOR»</text>
        <text x={NAV_CX} y="148" textAnchor="middle" fill="rgba(255,255,255,0.85)" fontSize="11" fontWeight="600">app/(tabs)/_layout.tsx</text>

        {/* ══ TAB NAVIGATOR → SCREENS (fan) ══ */}
        {scrCX.map((cx, i) => (
          <line key={i} x1={NAV_CX} y1="156" x2={cx} y2="176"
            stroke="rgba(100,116,139,0.38)" strokeWidth="1" strokeDasharray="4 3" markerEnd="url(#ua)" />
        ))}

        {/* ══ 5 SCREENS ══ */}
        {([
          { name: 'Today',    file: 'games.tsx' },
          { name: 'Scores',   file: 'scores.tsx' },
          { name: 'Analysis', file: 'matchups.tsx' },
          { name: 'Builder',  file: 'props.tsx' },
          { name: 'Settings', file: 'settings-tab.tsx' },
        ] as const).map(({ name, file }, i) => (
          <g key={name}>
            <rect x={screenXs[i]} y="176" width={SCR_W} height="52" rx="7"
              fill="rgba(255,255,255,0.04)" stroke="rgba(255,255,255,0.12)" strokeWidth="1" />
            <text x={scrCX[i]} y="195" textAnchor="middle" fill="rgba(255,255,255,0.35)" fontSize="8" fontWeight="700" letterSpacing="1">«SCREEN»</text>
            <text x={scrCX[i]} y="212" textAnchor="middle" fill="rgba(255,255,255,0.9)" fontSize="11.5" fontWeight="600">{name}</text>
            <text x={scrCX[i]} y="224" textAnchor="middle" fill="rgba(255,255,255,0.36)" fontSize="8.5">{file}</text>
          </g>
        ))}

        {/* ══ SCREEN → MODULE dependency arrows ══ */}
        {/* Today(126) → Components(122) */}
        <line x1={scrCX[0]} y1="228" x2={modCX[0]} y2="250"
          stroke="rgba(129,140,248,0.42)" strokeWidth="1" strokeDasharray="4 3" markerEnd="url(#uab)" />
        {/* Scores(253) → Hooks(294) */}
        <line x1={scrCX[1]} y1="228" x2={modCX[1]} y2="250"
          stroke="rgba(129,140,248,0.42)" strokeWidth="1" strokeDasharray="4 3" markerEnd="url(#uab)" />
        {/* Builder(507) → Context(466) */}
        <line x1={scrCX[3]} y1="228" x2={modCX[2]} y2="250"
          stroke="rgba(255,120,40,0.38)" strokeWidth="1" strokeDasharray="4 3" markerEnd="url(#uap)" />
        {/* Settings(634) → Utils(638) */}
        <line x1={scrCX[4]} y1="228" x2={modCX[3]} y2="250"
          stroke="rgba(100,116,139,0.38)" strokeWidth="1" strokeDasharray="4 3" markerEnd="url(#ua)" />

        {/* ══ MODULE BOXES ══ */}
        {modules.map((mod, i) => (
          <g key={mod.label}>
            <rect x={modXs[i]} y="250" width={MOD_W} height="108" rx="8"
              fill={mod.fill} stroke={mod.stroke} strokeWidth="1.2" />
            <text x={modCX[i]} y="267" textAnchor="middle"
              fill={mod.lc} fontSize="8.5" fontWeight="700" letterSpacing="1.4">{mod.label}</text>
            <line x1={modXs[i] + 10} y1="273" x2={modXs[i] + MOD_W - 10} y2="273"
              stroke={mod.stroke} strokeWidth="0.8" />
            {mod.items.filter(Boolean).map((item, j) => (
              <text key={item} x={modCX[i]} y={285 + j * 14} textAnchor="middle"
                fill="rgba(255,255,255,0.62)" fontSize="9.5">+ {item}</text>
            ))}
          </g>
        ))}

        {/* ══ API LAYER ══ */}
        <rect x={modXs[0]} y="376" width={MOD_W} height="48" rx="8"
          fill="rgba(20,184,166,0.09)" stroke="rgba(45,212,191,0.28)" strokeWidth="1.2" />
        <text x={modCX[0]} y="396" textAnchor="middle"
          fill="rgba(45,212,191,0.85)" fontSize="8.5" fontWeight="700" letterSpacing="1.4">«API LAYER»</text>
        <text x={modCX[0]} y="413" textAnchor="middle"
          fill="rgba(255,255,255,0.55)" fontSize="9.5">mlb.ts · weather.ts</text>

        {/* Hooks → API */}
        <line x1={modCX[1]} y1="358" x2={modCX[0]} y2="376"
          stroke="rgba(45,212,191,0.42)" strokeWidth="1" strokeDasharray="4 3" markerEnd="url(#uat)" />

        {/* ══ LEGEND ══ */}
        <g transform="translate(294,385)">
          <text x="0" y="10" fill="rgba(255,255,255,0.25)" fontSize="8" fontWeight="700" letterSpacing="1">LEGEND</text>
          <line x1="0" y1="22" x2="26" y2="22" stroke="rgba(255,120,40,0.65)" strokeWidth="1.3" markerEnd="url(#uap)" />
          <text x="32" y="26" fill="rgba(255,255,255,0.42)" fontSize="9">composes / wraps</text>
          <line x1="0" y1="38" x2="26" y2="38" stroke="rgba(100,116,139,0.55)" strokeWidth="1" strokeDasharray="4 3" markerEnd="url(#ua)" />
          <text x="32" y="42" fill="rgba(255,255,255,0.42)" fontSize="9">depends on</text>
          <line x1="0" y1="54" x2="26" y2="54" stroke="rgba(45,212,191,0.55)" strokeWidth="1" strokeDasharray="4 3" markerEnd="url(#uat)" />
          <text x="32" y="58" fill="rgba(255,255,255,0.42)" fontSize="9">calls API</text>
        </g>
      </svg>
    </DiagramWrap>
  );
}

// ── Diagram: Web Architecture (card-based, forced dark) ───────────────────────

function WebArchitectureDiagram() {
  const rows = [
    {
      label: 'PRESENTATION', color: '#FF7828',
      items: ['Next.js 15 App Router', 'React 19 Server Components', 'Tailwind CSS + Framer Motion'],
    },
    {
      label: 'API / DATA', color: '#2dd4bf',
      items: ['tRPC routers (type-safe RPC)', 'Drizzle ORM', 'Supabase Postgres'],
    },
    {
      label: 'AUTH & BILLING', color: '#818cf8',
      items: ['Clerk (auth + session)', 'Stripe (checkout + webhooks)', 'Free / Edge Pro plans'],
    },
    {
      label: 'INTELLIGENCE', color: '#facc15',
      items: ['MLB Stats API + The Odds API', 'Anthropic Claude (Edge AI chat)', 'Poisson · Binomial · Weighted models'],
    },
  ];
  return (
    <DiagramWrap title="Web System Architecture">
      <div className="space-y-3">
        {rows.map((row, i) => (
          <React.Fragment key={row.label}>
            <div className="rounded-xl border p-4" style={{ borderColor: `${row.color}40`, background: `${row.color}0d` }}>
              <p className="text-[10px] font-bold uppercase tracking-widest mb-2.5" style={{ color: row.color }}>{row.label}</p>
              <div className="flex flex-wrap gap-2">
                {row.items.map(item => (
                  <span key={item} className="rounded-lg px-2.5 py-1 text-xs font-medium text-white/80"
                    style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)' }}>{item}</span>
                ))}
              </div>
            </div>
            {i < rows.length - 1 && (
              <div className="flex justify-center">
                <svg width="16" height="14" viewBox="0 0 16 14" fill="none"><path d="M8 0v10M2 6l6 6 6-6" stroke="rgba(255,255,255,0.2)" strokeWidth="1.5" /></svg>
              </div>
            )}
          </React.Fragment>
        ))}
        <p className="text-center text-[10px] text-white/20 pt-2">Deployed on Vercel · same prediction engine as iOS, served over tRPC</p>
      </div>
    </DiagramWrap>
  );
}

// ── Diagram: Pricing Tier Evolution ────────────────────────────────────────────

function PricingIterationDiagram() {
  const stages = [
    { v: 'v1', label: 'Single Pro tier', desc: 'One paywall. Everyone who wanted anything past the schedule had to pay immediately.' },
    { v: 'v2', label: 'Free / Fan / Pro', desc: 'Split into three tiers to let free users feel the product before paying, and let power users pay more for HR Deep Dive.' },
    { v: 'v3', label: 'Free / Edge Pro $4.99', desc: 'Collapsed back to one clear paid plan at $4.99/mo — the three-tier matrix confused more people than it converted.' },
  ];
  return (
    <div className="card-base p-6">
      <p className="text-xs font-bold uppercase tracking-widest text-slate-500 mb-5">Pricing Iteration</p>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {stages.map((s) => (
          <div key={s.v} className="rounded-xl border border-[var(--border)] bg-[var(--card)] p-4">
            <span className="text-[10px] font-bold uppercase tracking-widest text-primary">{s.v}</span>
            <p className="mt-1 text-sm font-semibold text-slate-900 dark:text-white">{s.label}</p>
            <p className="mt-1.5 text-xs text-slate-500 leading-relaxed">{s.desc}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

// ── Main Component ────────────────────────────────────────────────────────────

const MLBEdgePro: React.FC = () => {
  const navigate = useNavigate();
  const [platform, setPlatform] = useState<'ios' | 'web'>('ios');
  useEffect(() => { window.scrollTo({ top: 0 }); }, []);

  const stack = [
    { label: 'Framework',    items: ['Expo SDK 56', 'Expo Router v3', 'React Native 0.85', 'TypeScript'] },
    { label: 'UI & Motion',  items: ['React Native core', 'react-native-reanimated v4', 'Liquid Glass tab bar (iOS 26)', 'expo-linear-gradient'] },
    { label: 'Data & State', items: ['TanStack React Query v5', 'AsyncStorage (slip persistence)', 'MLB Stats API (no key)', 'Open-Meteo weather (no key)'] },
    { label: 'Models',       items: ['Binomial distribution (HR%)', 'Poisson distribution (Ks)', 'Weighted scoring (win%)', 'Regression-to-mean calibration'] },
  ];

  const timeline = [
    { phase: 'Foundation',        desc: 'Expo project, MLB Stats API integration, game listing with stadium photos, weather overlay per game.' },
    { phase: 'Analysis engine',   desc: 'HR probability model (binomial), hit probability, K predictions (Poisson), pitcher grades, game winner model.' },
    { phase: 'Prop Builder',      desc: '2×2 prop type grid, player cards with headshots, combined probability, Save Slip to AsyncStorage.' },
    { phase: 'Bet Tracker',       desc: 'Per-leg FanDuel odds input, exact parlay payout math, Won/Lost check-in, win rate compounding.' },
    { phase: 'Onboarding + Auth', desc: 'Login/signup screens, responsible gaming, choose your team, Terms of Service + Privacy Policy.' },
    { phase: 'Scores redesign',   desc: 'Horizontal compact scoreboard cards, 7-day date chip strip, R/H/E per side, Deep Analysis CTA.' },
  ];

  const webStack = [
    { label: 'Framework',      items: ['Next.js 15 (App Router)', 'React 19', 'TypeScript', 'Tailwind CSS'] },
    { label: 'API & Data',     items: ['tRPC (type-safe RPC)', 'Drizzle ORM', 'Supabase Postgres', 'React Query'] },
    { label: 'Auth & Billing', items: ['Clerk (auth + session)', 'Stripe (checkout + webhooks)', 'Free / Edge Pro plans'] },
    { label: 'Intelligence',   items: ['MLB Stats API', 'The Odds API (live sportsbook lines)', 'OpenWeather', 'Anthropic Claude (Edge AI chat)'] },
  ];

  const webTimeline = [
    { phase: 'Foundation',              desc: 'Next.js 15 scaffold, Clerk auth, Drizzle schema on Supabase Postgres — porting the prediction engine from the mobile app to tRPC procedures.' },
    { phase: 'Prop tools on web',       desc: 'Prop Builder and Edge Report ported to the browser; bet tracker moved off localStorage into Supabase once people needed it to follow them across devices.' },
    { phase: 'Monetization',            desc: 'Stripe checkout wired in, then rebuilt after the first Clerk-billing implementation broke in production; pricing collapsed from a 3-tier matrix to one $4.99/mo Edge Pro plan.' },
    { phase: 'Live odds integration',   desc: 'The Odds API added for real FanDuel lines feeding Pitcher Ks, 1st Inning O/U, and moneyline props, so the model is checked against the real market, not just itself.' },
    { phase: 'Edge AI chat',            desc: 'Claude-powered chat analyst added for natural-language questions about any game, with a Groq fallback tier for reliability.' },
    { phase: 'Retention expansion',     desc: 'FIFA World Cup 2026 coverage (groups, bracket, ELO win probabilities) shipped to keep subscribers engaged through the MLB offseason.' },
  ];

  return (
    <div className="min-h-screen pt-24 pb-24">
      <div className="mx-auto max-w-4xl px-6">

        {/* ── Back ── */}
        <motion.button
          initial={{ opacity: 0, x: -8 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.4 }}
          onClick={() => navigate('/')}
          className="mb-10 flex items-center gap-2 text-sm text-slate-500 transition-colors hover:text-primary dark:text-slate-400"
        >
          <ArrowLeft size={15} strokeWidth={2} aria-hidden />
          Back to portfolio
        </motion.button>

        {/* ── Hero ── */}
        <motion.div initial="hidden" animate="show" variants={stagger}>
          <motion.div variants={fade}>
            <div className="mb-4 flex flex-wrap items-center gap-3">
              <span className="rounded-full border border-rose-500/40 bg-rose-950/40 px-3 py-1 text-xs font-semibold text-rose-400">Personal project</span>
              <span className="rounded-full border border-emerald-500/40 bg-emerald-950/40 px-3 py-1 text-xs font-semibold text-emerald-400">Live · Paying subscribers</span>
              <span className="rounded-full border border-orange-500/40 bg-orange-950/40 px-3 py-1 text-xs font-semibold text-orange-400">iOS · Web</span>
            </div>
            <SectionLabel>Case Study</SectionLabel>
            <h1 className="font-display text-4xl font-extrabold tracking-tight text-slate-900 dark:text-white md:text-5xl">
              MLB Edge Pro
            </h1>
            <p className="mt-4 text-lg leading-relaxed text-slate-600 dark:text-slate-400 max-w-2xl">
              An MLB prediction and prop analysis platform, built solo on two fronts — a React Native + Expo
              app for iOS, and a Next.js subscription web app at mlbedgepro.dev. Same prediction engine,
              two different products, two different sets of lessons.
            </p>
            <div className="mt-6 flex flex-wrap gap-4">
              <a href="https://mlbedgepro.dev" target="_blank" rel="noopener noreferrer"
                className="flex items-center gap-2 rounded-lg bg-primary px-4 py-2.5 text-sm font-semibold text-white transition-opacity hover:opacity-90">
                <Globe size={15} strokeWidth={2} aria-hidden />
                View website
              </a>
              <a href="https://mlbedgepro.dev/sign-up" target="_blank" rel="noopener noreferrer"
                className="flex items-center gap-2 rounded-lg border border-primary/40 bg-primary/10 px-4 py-2.5 text-sm font-semibold text-primary transition-colors hover:bg-primary/15">
                <Sparkles size={15} strokeWidth={2} aria-hidden />
                Sign up today
              </a>
              <a href="https://github.com/visuxlize/MLBEdgePro" target="_blank" rel="noopener noreferrer"
                className="flex items-center gap-2 rounded-lg border border-[var(--border)] bg-[var(--card)] px-4 py-2.5 text-sm font-medium text-slate-700 transition-colors hover:border-primary/50 hover:text-primary dark:text-slate-300">
                <Github size={15} strokeWidth={2} aria-hidden />
                View on GitHub
              </a>
            </div>
          </motion.div>

          {/* Platform tab switcher */}
          <motion.div variants={fade} className="mt-10 inline-flex rounded-xl border border-[var(--border)] bg-[var(--card)] p-1">
            <button
              type="button"
              onClick={() => setPlatform('ios')}
              aria-pressed={platform === 'ios'}
              className={
                'flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-semibold transition-colors ' +
                (platform === 'ios' ? 'bg-primary text-white' : 'text-slate-500 hover:text-primary')
              }
            >
              <Smartphone size={15} strokeWidth={2} aria-hidden />
              iOS App
            </button>
            <button
              type="button"
              onClick={() => setPlatform('web')}
              aria-pressed={platform === 'web'}
              className={
                'flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-semibold transition-colors ' +
                (platform === 'web' ? 'bg-primary text-white' : 'text-slate-500 hover:text-primary')
              }
            >
              <Globe size={15} strokeWidth={2} aria-hidden />
              Web App
            </button>
          </motion.div>
        </motion.div>

        <div className="my-14 h-px bg-[var(--border)]" />

        {platform === 'ios' && (
        <>
        {/* ── iOS Hero banner + Stats ── */}
        <motion.div initial="hidden" whileInView="show" viewport={{ once: true }} variants={stagger} className="mb-14">
          <motion.div variants={fade}>
            <div className="relative rounded-3xl overflow-hidden border border-[var(--border)]"
              style={{ background: 'linear-gradient(135deg, #0A0E14 0%, #0D1525 50%, #0A0E14 100%)' }}>
              <div className="absolute -top-20 -right-20 w-80 h-80 rounded-full opacity-30"
                style={{ background: 'radial-gradient(circle, rgba(255,120,40,0.3) 0%, transparent 70%)' }} />
              <div className="absolute -bottom-20 -left-20 w-64 h-64 rounded-full opacity-20"
                style={{ background: 'radial-gradient(circle, rgba(99,102,241,0.3) 0%, transparent 70%)' }} />
              <div className="relative z-10 flex flex-col sm:flex-row items-center gap-8 p-8 sm:p-12">
                <div className="flex-1">
                  <p className="text-xs font-bold uppercase tracking-widest text-orange-400/80 mb-3">Today Tab</p>
                  <h3 className="font-display text-2xl font-bold text-white mb-3">Every tab is a tool, not a page.</h3>
                  <p className="text-sm text-slate-400 leading-relaxed">
                    The Today tab surfaces your featured team's game instantly — stadium photo, pitcher matchup,
                    live weather, and a bet slip shortcut. Pregame info at a glance, no digging required.
                  </p>
                  <div className="mt-5 flex flex-wrap gap-2">
                    {['Stadium photos','Live weather','Bet slip count','Featured team'].map(t => (
                      <span key={t} className="chip" style={{ borderColor: 'rgba(255,120,40,0.3)', color: '#FF7828' }}>{t}</span>
                    ))}
                  </div>
                </div>
                <div className="flex-shrink-0">
                  <PhoneFrame src={img01} alt="Today dashboard" />
                </div>
              </div>
            </div>
          </motion.div>

          {/* Stats */}
          <motion.div variants={fade} className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-4">
            <StatCard value="5"  label="Core tabs"       sub="each a distinct tool" />
            <StatCard value="3"  label="Stat models"     sub="Binomial · Poisson · Weighted" />
            <StatCard value="2"  label="Free APIs"        sub="MLB Stats · Open-Meteo" />
            <StatCard value="0"  label="API keys needed" sub="fully open data sources" />
          </motion.div>
        </motion.div>

        <div className="my-14 h-px bg-[var(--border)]" />

        {/* ── Onboarding Flow ── */}
        <motion.section initial="hidden" whileInView="show" viewport={{ once: true }} variants={stagger} className="mb-14">
          <motion.div variants={fade}>
            <SectionLabel>First Launch Experience</SectionLabel>
            <h2 className="font-display text-2xl font-bold text-slate-900 dark:text-white mb-3">Onboarding that sets context</h2>
            <p className="text-slate-600 dark:text-slate-400 leading-relaxed mb-8">
              Before any data, the app introduces its purpose, responsible gaming principles, and lets users
              pick their favorite team — which shapes the Today tab's featured game card from the very first open.
            </p>
          </motion.div>
          <motion.div variants={fade} className="grid grid-cols-3 sm:grid-cols-6 gap-4 justify-items-center">
            <PhoneFrameSm src={img17} alt="Intro"              caption="Welcome" />
            <PhoneFrameSm src={img18} alt="Responsible gaming" caption="Responsible gaming" />
            <PhoneFrameSm src={img19} alt="Smarter picks"      caption="Smarter picks" />
            <PhoneFrameSm src={img15} alt="Choose team"        caption="Pick your team" />
            <PhoneFrameSm src={img20} alt="Create account"     caption="Create account" />
            <PhoneFrameSm src={img16} alt="Sign in"            caption="Sign in" />
          </motion.div>
        </motion.section>

        <div className="my-14 h-px bg-[var(--border)]" />

        {/* ── The Problem ── */}
        <motion.section initial="hidden" whileInView="show" viewport={{ once: true }} variants={stagger} className="mb-14">
          <motion.div variants={fade}>
            <SectionLabel>The Problem</SectionLabel>
            <h2 className="font-display text-2xl font-bold text-slate-900 dark:text-white mb-4">Sports tools are black boxes</h2>
            <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
              Most sports analytics apps either dump raw stats with no signal, or give you a pick with no
              explanation. I wanted to understand <em>why</em> a bet has value and how accurate those signals
              have been over time.
            </p>
          </motion.div>
          <motion.div variants={fade} className="mt-6 card-base p-6 border-l-2 border-l-primary">
            <p className="text-slate-700 dark:text-slate-300 leading-relaxed text-sm">
              The goal: a tool that explains its reasoning, tracks its own accuracy, and gets smarter every
              time I log a real result. Every screen has a job in the pregame → analysis → bet → review loop.
            </p>
          </motion.div>
          <motion.div variants={fade} className="mt-6">
            <UserJourneyDiagram />
          </motion.div>
        </motion.section>

        <div className="my-14 h-px bg-[var(--border)]" />

        {/* ── App Design ── */}
        <motion.section initial="hidden" whileInView="show" viewport={{ once: true }} variants={stagger} className="mb-14">
          <motion.div variants={fade}>
            <SectionLabel>App Design</SectionLabel>
            <h2 className="font-display text-2xl font-bold text-slate-900 dark:text-white mb-6">Five tabs · five distinct tools</h2>
          </motion.div>
          <motion.div variants={fade} className="mb-8">
            <TabMapDiagram />
          </motion.div>
          <motion.div variants={stagger} className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <motion.div variants={fadeLeft} className="card-base overflow-hidden">
              <div className="flex justify-center pt-6 px-6"
                style={{ background: 'linear-gradient(180deg, #0D1220 0%, transparent 100%)' }}>
                <div style={{ maxWidth: 200 }}><PhoneFrame src={img01} alt="Today tab" /></div>
              </div>
              <div className="p-5">
                <h4 className="font-display text-sm font-bold text-slate-900 dark:text-white mb-1">Today Tab</h4>
                <p className="text-xs text-slate-500 leading-relaxed">Featured game with stadium photo, pitcher matchup, real-time weather, and active bet slip count.</p>
              </div>
            </motion.div>
            <motion.div variants={fadeRight} className="card-base overflow-hidden">
              <div className="flex justify-center pt-6 px-6"
                style={{ background: 'linear-gradient(180deg, #0D1220 0%, transparent 100%)' }}>
                <div style={{ maxWidth: 200 }}><PhoneFrame src={img02} alt="Scores tab" /></div>
              </div>
              <div className="p-5">
                <h4 className="font-display text-sm font-bold text-slate-900 dark:text-white mb-1">Scores Tab</h4>
                <p className="text-xs text-slate-500 leading-relaxed">Compact horizontal scoreboards with R/H/E, pitcher headshots, 7-day date chips, and one-tap analysis.</p>
              </div>
            </motion.div>
          </motion.div>
        </motion.section>

        <div className="my-14 h-px bg-[var(--border)]" />

        {/* ── Game Detail ── */}
        <motion.section initial="hidden" whileInView="show" viewport={{ once: true }} variants={stagger} className="mb-14">
          <motion.div variants={fade}>
            <SectionLabel>Game Detail</SectionLabel>
            <h2 className="font-display text-2xl font-bold text-slate-900 dark:text-white mb-4">Deep analysis on every game</h2>
            <p className="text-slate-600 dark:text-slate-400 leading-relaxed mb-8">
              Tapping into a game surfaces the full pitcher card — ERA, WHIP, K/9, W/L — plus a weather
              overlay showing wind direction, speed, and temperature. The edge analysis section breaks down
              the prediction score with a per-factor reasoning panel.
            </p>
          </motion.div>
          <motion.div variants={fade} className="flex flex-col sm:flex-row gap-8 items-center">
            <div className="flex gap-4 justify-center flex-1">
              <PhoneFrame src={img03} alt="Game detail pitchers and weather" caption="Pitchers · Weather" />
              <PhoneFrame src={img04} alt="Game detail edge analysis and props" caption="Edge Analysis · Props" />
            </div>
            <div className="flex-1 space-y-4">
              {[
                { Icon: IconWind,    title: 'Wind impact',    desc: "Wind direction and speed applied as HR boost or suppress, using the ballpark's orientation." },
                { Icon: IconPitcher, title: 'Pitcher grades', desc: 'ERA, WHIP, K/9 weighted into a starting pitcher score, compared against opposing lineup OPS.' },
                { Icon: IconTrend,   title: 'Edge score',     desc: 'Weighted prediction score (0–100) shown with a breakdown of which factor contributed most.' },
              ].map(({ Icon, title, desc }) => (
                <div key={title} className="card-base p-4 flex gap-3 items-start">
                  <div className="mt-0.5 text-slate-400 flex-shrink-0"><Icon size={16} /></div>
                  <div>
                    <p className="text-sm font-semibold text-slate-900 dark:text-white">{title}</p>
                    <p className="text-xs text-slate-500 leading-relaxed mt-0.5">{desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </motion.section>

        <div className="my-14 h-px bg-[var(--border)]" />

        {/* ── Analysis Tab ── */}
        <motion.section initial="hidden" whileInView="show" viewport={{ once: true }} variants={stagger} className="mb-14">
          <motion.div variants={fade}>
            <SectionLabel>Analysis Tab</SectionLabel>
            <h2 className="font-display text-2xl font-bold text-slate-900 dark:text-white mb-4">Head-to-head matchup breakdowns</h2>
            <p className="text-slate-600 dark:text-slate-400 leading-relaxed mb-8">
              Select any pitcher vs batter combination. The Analysis tab pulls season stats, surfaces
              head-to-head history from the MLB Stats API when available, and runs the edge model to flag
              over/under opportunities in the day's props.
            </p>
          </motion.div>
          <motion.div variants={fade} className="flex flex-col sm:flex-row-reverse gap-8 items-center">
            <div className="flex gap-4 justify-center flex-1">
              <PhoneFrameSm src={img06} alt="Analysis matchups"   caption="Matchup selector" />
              <PhoneFrameSm src={img07} alt="Analysis edge report" caption="Edge report" />
              <PhoneFrameSm src={img08} alt="Analysis props"       caption="Prop signals" />
            </div>
            <div className="flex-1">
              <div className="card-base p-5 border-l-2 border-l-indigo-500/60">
                <p className="text-sm font-semibold text-slate-900 dark:text-white mb-3">Edge score breakdown</p>
                <ul className="space-y-2">
                  {[
                    ['Pitcher ERA + WHIP + K/9','55%'],
                    ['Batting lineup OPS','25%'],
                    ['Home field advantage','10%'],
                    ['Weather (wind + temp)','10%'],
                  ].map(([factor, weight]) => (
                    <li key={factor} className="flex justify-between items-center">
                      <span className="text-xs text-slate-600 dark:text-slate-400">{factor}</span>
                      <span className="text-xs font-semibold text-slate-900 dark:text-slate-200">{weight}</span>
                    </li>
                  ))}
                </ul>
                <div className="mt-4 h-px bg-[var(--border)]" />
                <p className="mt-3 text-xs text-slate-500">Max capped at 72%. Regressed toward 50% to reflect real variance.</p>
              </div>
            </div>
          </motion.div>
        </motion.section>

        <div className="my-14 h-px bg-[var(--border)]" />

        {/* ── Player Profile ── */}
        <motion.section initial="hidden" whileInView="show" viewport={{ once: true }} variants={stagger} className="mb-14">
          <motion.div variants={fade} className="flex flex-col sm:flex-row gap-8 items-center">
            <div className="flex-shrink-0 flex justify-center">
              <PhoneFrame src={img05} alt="Player profile" caption="Player Profile" />
            </div>
            <div className="flex-1">
              <SectionLabel>Player Profiles</SectionLabel>
              <h2 className="font-display text-2xl font-bold text-slate-900 dark:text-white mb-4">Official MLB headshots + season stats</h2>
              <p className="text-slate-600 dark:text-slate-400 leading-relaxed mb-4">
                Every player card pulls the official MLB headshot. Season stats — AVG, OPS, HR, RBI for
                batters; ERA, WHIP, K/9, W/L for pitchers — sourced live from the MLB Stats API with no
                API key required.
              </p>
              <div className="flex flex-wrap gap-2">
                {['MLB Stats API','Official headshots','Season averages','Live data'].map(t => (
                  <span key={t} className="chip">{t}</span>
                ))}
              </div>
            </div>
          </motion.div>
        </motion.section>

        <div className="my-14 h-px bg-[var(--border)]" />

        {/* ── Prop Builder ── */}
        <motion.section initial="hidden" whileInView="show" viewport={{ once: true }} variants={stagger} className="mb-14">
          <motion.div variants={fade}>
            <SectionLabel>Prop Builder</SectionLabel>
            <h2 className="font-display text-2xl font-bold text-slate-900 dark:text-white mb-4">Build parlays from model predictions</h2>
            <p className="text-slate-600 dark:text-slate-400 leading-relaxed mb-8">
              Pick a prop type (HR · Hit · 2+ Hits · Pitcher K's), select players across games, and watch
              the combined probability and implied American odds update in real time. Save the slip — it
              instantly appears across every tab via shared React Context.
            </p>
          </motion.div>
          <motion.div variants={fade} className="grid grid-cols-2 sm:grid-cols-4 gap-4 justify-items-center mb-8">
            <PhoneFrameSm src={img09} alt="Prop builder home run"    caption="① Pick prop type" />
            <PhoneFrameSm src={img10} alt="Prop builder select game" caption="② Select game" />
            <PhoneFrameSm src={img11} alt="Prop builder add to slip" caption="③ Add players" />
            <PhoneFrameSm src={img12} alt="Prop builder your slip"   caption="④ Review slip" />
          </motion.div>
          <motion.div variants={fade}>
            <ParlayMathDiagram />
          </motion.div>
        </motion.section>

        <div className="my-14 h-px bg-[var(--border)]" />

        {/* ── Bet Tracker ── */}
        <motion.section initial="hidden" whileInView="show" viewport={{ once: true }} variants={stagger} className="mb-14">
          <motion.div variants={fade}>
            <SectionLabel>Bet Tracker</SectionLabel>
            <h2 className="font-display text-2xl font-bold text-slate-900 dark:text-white mb-4">Track results, compound accuracy</h2>
            <p className="text-slate-600 dark:text-slate-400 leading-relaxed mb-8">
              Saved slips persist via AsyncStorage. After games finish, log Won or Lost directly on the detail
              sheet. The Settings tab shows your live win rate, total ROI, and the last three slips at a
              glance — no separate app needed.
            </p>
          </motion.div>
          <motion.div variants={fade} className="flex flex-col sm:flex-row gap-8 items-center">
            <div className="flex gap-6 justify-center flex-1">
              <PhoneFrame src={img13} alt="Settings bet history"  caption="Bet history" />
              <PhoneFrame src={img14} alt="Settings parlay detail" caption="Parlay detail" />
            </div>
            <div className="flex-1 space-y-4">
              {[
                { label: 'Open slips',         desc: 'Active parlays with combined probability and implied break-even odds.' },
                { label: 'Won / Lost tabs',    desc: 'Complete history sorted by date. Tap any slip to see per-leg details.' },
                { label: 'Win rate stat',      desc: 'Compounding accuracy metric — the more you log, the more honest the model gets.' },
                { label: 'FanDuel odds input', desc: 'Enter actual sportsbook odds per leg. Model shows your edge vs. implied probability.' },
              ].map(item => (
                <div key={item.label} className="flex items-start gap-3">
                  <div className="w-1.5 h-1.5 rounded-full bg-primary mt-2 flex-shrink-0" />
                  <div>
                    <p className="text-sm font-semibold text-slate-800 dark:text-slate-200">{item.label}</p>
                    <p className="text-xs text-slate-500 leading-relaxed">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </motion.section>

        <div className="my-14 h-px bg-[var(--border)]" />

        {/* ── Prediction Model ── */}
        <motion.section initial="hidden" whileInView="show" viewport={{ once: true }} variants={stagger} className="mb-14">
          <motion.div variants={fade}>
            <SectionLabel>Under the Hood</SectionLabel>
            <h2 className="font-display text-2xl font-bold text-slate-900 dark:text-white mb-6">Three models, one pipeline</h2>
          </motion.div>
          <motion.div variants={fade} className="mb-6">
            <PredictionPipelineDiagram />
          </motion.div>
          <motion.div variants={fade} className="grid grid-cols-1 gap-4 sm:grid-cols-3">
            {[
              { title: 'Win % — Weighted',   color: '#FF7828', bg: 'rgba(255,120,40,0.08)',  border: 'rgba(255,120,40,0.25)',  desc: 'Six factors scored and weighted. Pitcher ERA (30%), WHIP (15%), K/9 (10%), lineup OPS (25%), home field (10%), weather (10%). Score capped at 72% max.' },
              { title: 'HR Prob — Binomial', color: '#818cf8', bg: 'rgba(99,102,241,0.08)',  border: 'rgba(99,102,241,0.25)',  desc: 'Batter OPS-based HR rate blended with pitcher HR/9 using binomial distribution over 4 plate appearances. Wind direction and speed applied as multiplicative boost.' },
              { title: 'K Total — Poisson',  color: '#2dd4bf', bg: 'rgba(20,184,166,0.08)',  border: 'rgba(20,184,166,0.25)',  desc: 'Expected Ks = (K/9 ÷ 9) × estimated innings × lineup K-rate. Result compared against the FanDuel K line to surface over/under probability.' },
            ].map(m => (
              <div key={m.title} className="rounded-2xl p-5" style={{ background: m.bg, border: `1px solid ${m.border}` }}>
                <p className="text-sm font-bold mb-2" style={{ color: m.color }}>{m.title}</p>
                <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">{m.desc}</p>
              </div>
            ))}
          </motion.div>
        </motion.section>

        <div className="my-14 h-px bg-[var(--border)]" />

        {/* ── Architecture ── */}
        <motion.section initial="hidden" whileInView="show" viewport={{ once: true }} variants={stagger} className="mb-14">
          <motion.div variants={fade}>
            <SectionLabel>Architecture</SectionLabel>
            <h2 className="font-display text-2xl font-bold text-slate-900 dark:text-white mb-6">Local-first mobile stack</h2>
          </motion.div>

          <motion.div variants={fade} className="mb-6">
            <ArchitectureDiagram />
          </motion.div>

          <motion.div variants={fade} className="mb-6">
            <UMLDiagram />
          </motion.div>

          <motion.div variants={fade} className="card-base p-6">
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
                  <div className="absolute top-1 left-0 h-4 w-4 rounded-full border-2 border-primary bg-primary/20" aria-hidden />
                  <h4 className="font-display text-base font-semibold text-slate-900 dark:text-white">Phase {i + 1} — {item.phase}</h4>
                  <p className="mt-1 text-sm text-slate-600 dark:text-slate-400 leading-relaxed">{item.desc}</p>
                </motion.li>
              ))}
            </ul>
          </div>
        </motion.section>

        <div className="my-14 h-px bg-[var(--border)]" />

        {/* ── What I Learned ── */}
        <motion.section initial="hidden" whileInView="show" viewport={{ once: true }} variants={stagger} className="mb-14">
          <motion.div variants={fade}>
            <SectionLabel>What I Learned</SectionLabel>
            <h2 className="font-display text-2xl font-bold text-slate-900 dark:text-white mb-6">Key takeaways</h2>
          </motion.div>
          <motion.div variants={fade} className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            {[
              { title: 'Statistical modeling is a design problem',    desc: 'Choosing the right distribution matters less than understanding what question you are asking. HR probability is a per-PA event — binomial. K totals are a rate over time — Poisson.' },
              { title: 'Stale data kills trust immediately',           desc: "The biggest source of bugs was yesterday's data appearing as today's. Date-keyed caches, UNIQUE constraints, and check-before-insert are now defaults in every project." },
              { title: 'Regression to the mean is underrated',        desc: 'Raw scores had teams at 80%+ win probability. Capping at 72% and regressing toward 50% made predictions more accurate and more honest about real variance.' },
              { title: 'UX and data model cannot be separate passes', desc: 'Building the dark theme and data model together forced better decisions. The UI shaped which fields the backend needed to return, and vice versa.' },
            ].map(item => (
              <div key={item.title} className="card-base p-5">
                <h4 className="font-display text-sm font-semibold text-slate-900 dark:text-white mb-2">{item.title}</h4>
                <p className="text-sm leading-relaxed text-slate-600 dark:text-slate-400">{item.desc}</p>
              </div>
            ))}
          </motion.div>
        </motion.section>

        {/* ── What's Next ── */}
        <motion.section initial="hidden" whileInView="show" viewport={{ once: true }} variants={stagger}>
          <motion.div variants={fade}>
            <SectionLabel>What's Next</SectionLabel>
            <h2 className="font-display text-2xl font-bold text-slate-900 dark:text-white mb-4">Still building</h2>
            <p className="text-slate-600 dark:text-slate-400 leading-relaxed mb-6">
              Active development. The prediction model improves as more real results are logged.
              Planned additions include inning-by-inning box scores, push notifications for slip check-ins,
              Live Activity / Dynamic Island support, and an NBA model.
            </p>
            <div className="flex flex-wrap gap-3">
              {['Box score linescore','Push notifications','Dynamic Island','NBA model','Odds comparison','Historical accuracy by player'].map(item => (
                <span key={item} className="chip">{item}</span>
              ))}
            </div>
          </motion.div>
        </motion.section>
        </>
        )}

        {platform === 'web' && (
        <>
        {/* ── Web Hero banner + Stats ── */}
        <motion.div initial="hidden" whileInView="show" viewport={{ once: true }} variants={stagger} className="mb-14">
          <motion.div variants={fade}>
            <BrowserFrame url="mlbedgepro.dev" title="Landing Page">
              <div className="flex flex-col sm:flex-row items-center gap-8 py-4">
                <div className="flex-1">
                  <span className="inline-flex items-center gap-1.5 rounded-full border border-orange-500/30 bg-orange-500/10 px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-orange-400">
                    <Zap size={10} strokeWidth={2.5} aria-hidden /> AI-Powered MLB Analysis
                  </span>
                  <h3 className="font-display text-2xl sm:text-3xl font-black text-white mt-3 leading-tight">
                    Your MLB betting edge.<br /><span style={{ color: '#FF7828' }}>Every day.</span>
                  </h3>
                  <p className="mt-3 text-sm text-white/50 leading-relaxed max-w-sm">
                    Data-driven game predictions, prop analysis, and edge reports — built for serious MLB bettors who want every advantage.
                  </p>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {['Win Prob 67%','Edge Score 91/100','HR Prop 42%'].map(t => (
                      <span key={t} className="rounded-lg border border-white/10 bg-white/5 px-2.5 py-1 text-[11px] font-semibold text-white/70">{t}</span>
                    ))}
                  </div>
                </div>
                <div className="flex-shrink-0 w-full sm:w-64 space-y-2">
                  {[
                    'Full game schedule — free forever',
                    'Live scores & win predictions',
                    'Stadium weather conditions',
                  ].map(b => (
                    <div key={b} className="flex items-center gap-2.5 rounded-lg border border-white/10 bg-white/[0.03] px-3 py-2">
                      <span className="h-4 w-4 rounded-full bg-emerald-500/15 flex items-center justify-center shrink-0">
                        <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
                      </span>
                      <span className="text-xs text-white/60">{b}</span>
                    </div>
                  ))}
                </div>
              </div>
            </BrowserFrame>
          </motion.div>

          <motion.div variants={fade} className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-4">
            <StatCard value="13"    label="Paying subscribers" sub="Free → Edge Pro funnel" />
            <StatCard value="$4.99" label="Edge Pro / month"   sub="cancel anytime" />
            <StatCard value="2"     label="Sports covered"     sub="MLB + World Cup 2026" />
            <StatCard value="1"     label="Solo developer"     sub="eng, product & support" />
          </motion.div>
        </motion.div>

        <div className="my-14 h-px bg-[var(--border)]" />

        {/* ── How It Works ── */}
        <motion.section initial="hidden" whileInView="show" viewport={{ once: true }} variants={stagger} className="mb-14">
          <motion.div variants={fade}>
            <SectionLabel>First Visit Experience</SectionLabel>
            <h2 className="font-display text-2xl font-bold text-slate-900 dark:text-white mb-3">Up and running in 60 seconds</h2>
            <p className="text-slate-600 dark:text-slate-400 leading-relaxed mb-8">
              No app store, no download. The web funnel is built to get someone from landing page to a
              live prediction in under a minute — free, no credit card required.
            </p>
          </motion.div>
          <motion.div variants={stagger} className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {[
              { Icon: UserPlus,  n: '01', title: 'Create your free account', desc: 'Sign up in seconds with email. No credit card, no commitment — instantly on the free plan.' },
              { Icon: CircleDot, n: '02', title: "See today's full slate",   desc: 'Every game, live score, win prediction, and weather condition — free, every day.' },
              { Icon: Zap,       n: '03', title: 'Upgrade for the full edge', desc: "Unlock the Prop Builder, Edge Report, and full matchup analysis for $4.99/mo." },
            ].map(({ Icon, n, title, desc }) => (
              <motion.div key={n} variants={fade} className="card-base p-5 text-center">
                <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-2xl border border-orange-500/25 bg-orange-500/10">
                  <Icon size={20} className="text-orange-500" strokeWidth={1.8} />
                </div>
                <p className="text-[10px] font-bold text-orange-500 mb-1">{n}</p>
                <h4 className="font-display text-sm font-bold text-slate-900 dark:text-white mb-1.5">{title}</h4>
                <p className="text-xs text-slate-500 leading-relaxed">{desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </motion.section>

        <div className="my-14 h-px bg-[var(--border)]" />

        {/* ── The Problem ── */}
        <motion.section initial="hidden" whileInView="show" viewport={{ once: true }} variants={stagger} className="mb-14">
          <motion.div variants={fade}>
            <SectionLabel>The Problem</SectionLabel>
            <h2 className="font-display text-2xl font-bold text-slate-900 dark:text-white mb-4">A great model trapped in a phone app doesn't pay the bills</h2>
            <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
              The iOS app proved the prediction engine worked, but an App Store listing has no SEO, no
              shareable links, and no way to try before installing. To turn MLB Edge Pro into something
              people would actually pay for, it needed to live on the web — discoverable, linkable, and
              billable without Apple in the loop.
            </p>
          </motion.div>
          <motion.div variants={fade} className="mt-6 card-base p-6 border-l-2 border-l-primary">
            <p className="text-slate-700 dark:text-slate-300 leading-relaxed text-sm">
              The goal: a free tier good enough to prove the model, and a paid tier clear enough that people
              upgrade without a sales pitch. Everything downstream — pricing, billing, feature gating — got
              rebuilt around that one funnel.
            </p>
          </motion.div>
        </motion.section>

        <div className="my-14 h-px bg-[var(--border)]" />

        {/* ── Feature Tiers ── */}
        <motion.section initial="hidden" whileInView="show" viewport={{ once: true }} variants={stagger} className="mb-14">
          <motion.div variants={fade}>
            <SectionLabel>Feature Design</SectionLabel>
            <h2 className="font-display text-2xl font-bold text-slate-900 dark:text-white mb-6">Free proves it, Edge Pro deepens it</h2>
          </motion.div>
          <motion.div variants={fade}>
            <BrowserFrame url="mlbedgepro.dev/games" title="Feature Grid (wireframe)">
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {[
                  { Icon: CircleDot,  title: "Today's Games",   tier: 'free' },
                  { Icon: TrendingUp, title: 'Win Predictions', tier: 'free' },
                  { Icon: Cloud,      title: 'Weather Impact',  tier: 'free' },
                  { Icon: Flame,      title: 'Prop Builder',    tier: 'pro' },
                  { Icon: Zap,        title: 'Edge Report',     tier: 'pro' },
                  { Icon: BarChart3,  title: 'Matchup Analysis',tier: 'pro' },
                  { Icon: Target,     title: 'HR Deep Dive',    tier: 'pro' },
                  { Icon: Activity,   title: 'Daily Picks',     tier: 'pro' },
                ].map(({ Icon, title, tier }) => (
                  <div key={title} className="rounded-xl border p-3"
                    style={{
                      borderColor: tier === 'free' ? 'rgba(80,200,130,0.25)' : 'rgba(255,120,40,0.25)',
                      background: tier === 'free' ? 'rgba(80,200,130,0.06)' : 'rgba(255,120,40,0.06)',
                    }}>
                    <Icon size={16} style={{ color: tier === 'free' ? '#50C882' : '#FF7828' }} strokeWidth={1.8} />
                    <p className="mt-2 text-xs font-semibold text-white/85 leading-tight">{title}</p>
                    <p className="mt-1 text-[9px] font-bold uppercase tracking-wider" style={{ color: tier === 'free' ? '#50C882' : '#FF7828' }}>
                      {tier === 'free' ? 'Free' : 'Edge Pro'}
                    </p>
                  </div>
                ))}
              </div>
            </BrowserFrame>
          </motion.div>
        </motion.section>

        <div className="my-14 h-px bg-[var(--border)]" />

        {/* ── Edge AI Chat ── */}
        <motion.section initial="hidden" whileInView="show" viewport={{ once: true }} variants={stagger} className="mb-14">
          <motion.div variants={fade} className="flex flex-col sm:flex-row gap-8 items-center">
            <div className="flex-1">
              <SectionLabel>Edge AI</SectionLabel>
              <h2 className="font-display text-2xl font-bold text-slate-900 dark:text-white mb-4">A chat analyst, not just a stat table</h2>
              <p className="text-slate-600 dark:text-slate-400 leading-relaxed mb-4">
                Raw stat tables weren't enough for casual users. Edge AI is a Claude-powered chat analyst
                with live game context — ask it about any matchup in plain language and it reasons over
                the same data the model uses, with a Groq fallback tier for reliability.
              </p>
              <div className="flex flex-wrap gap-2">
                {['Anthropic Claude API','Live game context','Groq fallback','Natural language'].map(t => (
                  <span key={t} className="chip">{t}</span>
                ))}
              </div>
            </div>
            <div className="flex-1 w-full">
              <BrowserFrame url="mlbedgepro.dev/ai" title="Edge AI (wireframe)">
                <div className="space-y-2.5">
                  <div className="ml-auto max-w-[80%] rounded-2xl rounded-tr-sm bg-primary/20 px-3.5 py-2 text-xs text-white/90">
                    Is Judge a good HR prop tonight vs a lefty?
                  </div>
                  <div className="max-w-[85%] rounded-2xl rounded-tl-sm bg-white/[0.06] px-3.5 py-2 text-xs text-white/70 leading-relaxed">
                    Yes — his HR/PA vs LHP is well above league average and the starter has a high fly-ball
                    rate. Edge score: 78/100. Wind is blowing out at 8mph, which adds a small boost.
                  </div>
                </div>
              </BrowserFrame>
            </div>
          </motion.div>
        </motion.section>

        <div className="my-14 h-px bg-[var(--border)]" />

        {/* ── Prediction Model (shared engine) ── */}
        <motion.section initial="hidden" whileInView="show" viewport={{ once: true }} variants={stagger} className="mb-14">
          <motion.div variants={fade}>
            <SectionLabel>Under the Hood</SectionLabel>
            <h2 className="font-display text-2xl font-bold text-slate-900 dark:text-white mb-2">Same engine, now over tRPC</h2>
            <p className="text-slate-600 dark:text-slate-400 leading-relaxed mb-6">
              The web app doesn't run a second model — it calls the same weighted-scoring, binomial, and
              Poisson pipeline through type-safe tRPC procedures instead of a React Native hook.
            </p>
          </motion.div>
          <motion.div variants={fade}>
            <PredictionPipelineDiagram />
          </motion.div>
        </motion.section>

        <div className="my-14 h-px bg-[var(--border)]" />

        {/* ── Architecture ── */}
        <motion.section initial="hidden" whileInView="show" viewport={{ once: true }} variants={stagger} className="mb-14">
          <motion.div variants={fade}>
            <SectionLabel>Architecture</SectionLabel>
            <h2 className="font-display text-2xl font-bold text-slate-900 dark:text-white mb-6">Subscription web stack</h2>
          </motion.div>

          <motion.div variants={fade} className="mb-6">
            <WebArchitectureDiagram />
          </motion.div>

          <motion.div variants={fade} className="card-base p-6">
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
              {webStack.map(s => (
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

        <div className="my-14 h-px bg-[var(--border)]" />

        {/* ── Design Iteration ── */}
        <motion.section initial="hidden" whileInView="show" viewport={{ once: true }} variants={stagger} className="mb-14">
          <motion.div variants={fade}>
            <SectionLabel>Design Iteration</SectionLabel>
            <h2 className="font-display text-2xl font-bold text-slate-900 dark:text-white mb-4">Pricing took three tries</h2>
            <p className="text-slate-600 dark:text-slate-400 leading-relaxed mb-6">
              The monetization funnel was the least "designed" and most "iterated" part of the whole
              product — every version shipped, got used, and got simplified.
            </p>
          </motion.div>
          <motion.div variants={fade}>
            <PricingIterationDiagram />
          </motion.div>
          <motion.div variants={fade} className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2">
            {[
              { title: 'Cross-device sync',   desc: 'The bet tracker started in localStorage. Once people asked to check a slip on their phone after building it on desktop, it moved to Supabase.' },
              { title: 'Billing rebuilt once', desc: "The first checkout used Clerk's built-in billing. It broke in production, so the upgrade flow was rebuilt on Stripe checkout directly, with hardened checks to stop false 404s." },
              { title: 'Real odds, not just the model', desc: 'FanDuel lines via The Odds API were added after realizing a model output means nothing without the real sportsbook number next to it.' },
              { title: 'Retention beyond baseball', desc: 'A single-sport product loses subscribers in the offseason — FIFA World Cup 2026 coverage was added specifically to keep Edge Pro useful (and billed) year-round.' },
            ].map(item => (
              <div key={item.title} className="card-base p-5">
                <h4 className="font-display text-sm font-semibold text-slate-900 dark:text-white mb-2">{item.title}</h4>
                <p className="text-sm leading-relaxed text-slate-600 dark:text-slate-400">{item.desc}</p>
              </div>
            ))}
          </motion.div>
        </motion.section>

        <div className="my-14 h-px bg-[var(--border)]" />

        {/* ── Build Timeline ── */}
        <motion.section initial="hidden" whileInView="show" viewport={{ once: true }} variants={stagger} className="mb-14">
          <motion.div variants={fade}>
            <SectionLabel>Build Timeline</SectionLabel>
            <h2 className="font-display text-2xl font-bold text-slate-900 dark:text-white mb-8">How the web app came together</h2>
          </motion.div>
          <div className="relative">
            <div className="absolute top-0 bottom-0 left-[7px] w-px bg-[var(--border)]" aria-hidden />
            <ul className="relative list-none p-0 space-y-8">
              {webTimeline.map((item, i) => (
                <motion.li key={item.phase} variants={fade} className="relative pl-8">
                  <div className="absolute top-1 left-0 h-4 w-4 rounded-full border-2 border-primary bg-primary/20" aria-hidden />
                  <h4 className="font-display text-base font-semibold text-slate-900 dark:text-white">Phase {i + 1} — {item.phase}</h4>
                  <p className="mt-1 text-sm text-slate-600 dark:text-slate-400 leading-relaxed">{item.desc}</p>
                </motion.li>
              ))}
            </ul>
          </div>
        </motion.section>

        <div className="my-14 h-px bg-[var(--border)]" />

        {/* ── What I Learned ── */}
        <motion.section initial="hidden" whileInView="show" viewport={{ once: true }} variants={stagger} className="mb-14">
          <motion.div variants={fade}>
            <SectionLabel>What I Learned</SectionLabel>
            <h2 className="font-display text-2xl font-bold text-slate-900 dark:text-white mb-6">Key takeaways</h2>
          </motion.div>
          <motion.div variants={fade} className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            {[
              { title: 'Billing is a feature, not a checkbox',        desc: "Getting Stripe checkout right — trial states, webhook edge cases, plan changes — took more iteration than any UI screen." },
              { title: 'A simpler price beats a clever one',          desc: 'The 3-tier Free/Fan/Pro matrix looked good on a pricing page and confused people in practice. One paid plan converts better than three.' },
              { title: 'Ship the funnel before the polish',           desc: 'Landing page, sign-up, and paywall shipped before half the dashboard did — you learn faster from who pays than from who looks.' },
              { title: 'Retention is a roadmap decision',             desc: 'Adding a second sport was a business decision disguised as a feature request — churn during the MLB offseason forced it.' },
            ].map(item => (
              <div key={item.title} className="card-base p-5">
                <h4 className="font-display text-sm font-semibold text-slate-900 dark:text-white mb-2">{item.title}</h4>
                <p className="text-sm leading-relaxed text-slate-600 dark:text-slate-400">{item.desc}</p>
              </div>
            ))}
          </motion.div>
        </motion.section>

        {/* ── What's Next + CTA ── */}
        <motion.section initial="hidden" whileInView="show" viewport={{ once: true }} variants={stagger}>
          <motion.div variants={fade}>
            <SectionLabel>What's Next</SectionLabel>
            <h2 className="font-display text-2xl font-bold text-slate-900 dark:text-white mb-4">Still building</h2>
            <p className="text-slate-600 dark:text-slate-400 leading-relaxed mb-6">
              Growing past 13 subscribers means better SEO on the marketing pages, an NBA model reusing the
              same tRPC procedures, and email digests for daily edge picks.
            </p>
            <div className="flex flex-wrap gap-3 mb-8">
              {['NBA model','Email digests','SEO content','Referral program','Historical accuracy by player'].map(item => (
                <span key={item} className="chip">{item}</span>
              ))}
            </div>
          </motion.div>
          <motion.div variants={fade} className="card-base p-8 text-center border-l-2 border-l-primary">
            <h3 className="font-display text-xl font-bold text-slate-900 dark:text-white mb-2">Try the web app free</h3>
            <p className="text-sm text-slate-600 dark:text-slate-400 mb-5 max-w-md mx-auto">
              Full schedule, live scores, and win predictions — free, no credit card required.
            </p>
            <div className="flex flex-wrap justify-center gap-3">
              <a href="https://mlbedgepro.dev" target="_blank" rel="noopener noreferrer"
                className="flex items-center gap-2 rounded-lg bg-primary px-5 py-2.5 text-sm font-semibold text-white transition-opacity hover:opacity-90">
                <Globe size={15} strokeWidth={2} aria-hidden />
                View website
                <ExternalLink size={13} strokeWidth={2} aria-hidden />
              </a>
              <a href="https://mlbedgepro.dev/sign-up" target="_blank" rel="noopener noreferrer"
                className="flex items-center gap-2 rounded-lg border border-primary/40 bg-primary/10 px-5 py-2.5 text-sm font-semibold text-primary transition-colors hover:bg-primary/15">
                <Sparkles size={15} strokeWidth={2} aria-hidden />
                Sign up today
              </a>
            </div>
          </motion.div>
        </motion.section>
        </>
        )}

      </div>
    </div>
  );
};

export default MLBEdgePro;
