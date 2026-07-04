import React from 'react';
import { motion } from 'framer-motion';

type TimelineType = 'work' | 'education';

type TimelineItem = {
  type: TimelineType;
  role: string;
  company: string;
  period: string;
  current: boolean;
  bullets: string[];
  tags: string[];
};

const items: TimelineItem[] = [
  {
    type: 'work',
    role: 'Chief Technology Officer',
    company: 'Brasena Inc',
    period: '2025 – Present',
    current: true,
    bullets: [
      'Lead technology strategy and engineering for a wholesale meat logistics platform — Bronx-first launch with plans to scale across NYC and beyond',
      'Ship and iterate the public experience, waitlist, and core platform (ongoing)',
      'Own architecture, delivery, and technical direction alongside product and operations',
    ],
    tags: ['CTO', 'Next.js', 'Supabase', 'Logistics'],
  },
  {
    type: 'work',
    role: 'Founder & Solo Developer',
    company: 'MLBEdgePro.dev',
    period: 'May 2026 – Present',
    current: true,
    bullets: [
      'Solo-built and shipped a subscription MLB analytics platform — win probability models, an AI-ranked "Edge Report," a prop builder, HR spray/exit-velocity breakdowns, and a Claude-powered chat analyst',
      'Own the entire stack alone: Next.js, tRPC, Drizzle + Supabase, Clerk auth, Stripe billing, and the Anthropic API, plus product, pricing, and support',
      'Grew to 13 concurrent paying subscribers by shipping a free tier first and following real usage — moved the bet tracker to Supabase once users needed it to sync across devices, added live FanDuel odds once users wanted the model checked against real sportsbook lines, and rebuilt checkout on Stripe after the initial billing flow broke in production',
      'Recognized a single-sport product loses subscribers in the offseason, so expanded into FIFA World Cup 2026 coverage to keep the platform — and subscriptions — active year-round',
    ],
    tags: ['Next.js', 'tRPC', 'Stripe', 'Clerk', 'Supabase', 'Claude API'],
  },
  {
    type: 'work',
    role: 'Software Engineer (Freelance)',
    company: 'Self-Employed',
    period: '2023 – Present',
    current: true,
    bullets: [
      'Built full-stack web applications for clients using React, TypeScript, and Node.js',
      'Designed UX/UI flows and prototypes in Figma before development',
      'Integrated secure authentication, REST APIs, and third-party services',
    ],
    tags: ['React', 'TypeScript', 'Node.js', 'Figma'],
  },
  {
    type: 'education',
    role: 'B.S. Software Development',
    company: 'DeVry University',
    period: '2024 – Present',
    current: true,
    bullets: [
      'Focusing on cybersecurity, full-stack development, and secure software engineering',
      'Relevant coursework: Data Structures, Algorithms, Network Security, Web Development',
    ],
    tags: ['Cybersecurity', 'Full-Stack', 'Algorithms'],
  },
  {
    type: 'education',
    role: 'MIT UX/UI Design Certificate',
    company: 'MIT xPRO',
    period: '2023',
    current: false,
    bullets: [
      'Comprehensive training in user experience research, interface design, and design thinking',
    ],
    tags: ['UX Research', 'Figma', 'Design Systems'],
  },
  {
    type: 'education',
    role: 'A.S. Information Technology & Networking',
    company: 'DeVry University',
    period: '2024 – 2025',
    current: false,
    bullets: ['Foundation in networking, IT infrastructure, and systems administration'],
    tags: ['Networking', 'IT Infrastructure'],
  },
  {
    type: 'education',
    role: 'B.Tech Architecture',
    company: 'CUNY City Tech',
    period: '2016 – 2020',
    current: false,
    bullets: [
      'Spatial thinking, design principles, and project management that now inform how I approach software design',
    ],
    tags: ['Design Thinking', 'Project Management'],
  },
];

const Experience: React.FC = () => {
  return (
    <section
      id="experience"
      className="section-container"
      aria-label="Experience and education"
    >
      <motion.header
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="mb-12"
      >
        <p className="text-xs font-semibold uppercase tracking-widest text-primary">
          MY PATH
        </p>
        <h2 className="mt-2 font-display text-3xl font-bold text-slate-900 dark:text-white md:text-4xl">
          Experience & Education
        </h2>
      </motion.header>

      <div className="relative">
        <div
          className="absolute top-0 bottom-0 left-[7px] w-px bg-[var(--border)]"
          aria-hidden
        />

        <ul className="relative list-none p-0">
          {items.map((item, index) => (
            <motion.li
              key={`${item.role}-${item.period}`}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.45, delay: index * 0.1 }}
              className={`relative pl-8 pb-10 last:pb-0`}
            >
              <div
                className={`absolute top-1 left-0 h-4 w-4 rounded-full border-2 ${
                  item.current
                    ? 'border-primary bg-primary/20'
                    : 'border-[var(--border)] bg-[var(--bg)]'
                }`}
                aria-hidden
              />
              <h3 className="font-display text-base font-semibold text-slate-900 dark:text-white">
                {item.role}
              </h3>
              <div className="mt-1 flex flex-wrap items-center gap-2 text-sm text-slate-500">
                <span>{item.company}</span>
                <span aria-hidden className="text-slate-400">
                  ·
                </span>
                <span>{item.period}</span>
              </div>
              <ul className="mt-2 space-y-1">
                {item.bullets.map((bullet) => (
                  <li
                    key={bullet}
                    className="text-sm text-slate-600 dark:text-slate-400"
                  >
                    <span className="mr-1.5 text-slate-400">–</span>
                    {bullet}
                  </li>
                ))}
              </ul>
              <div className="mt-3 flex flex-wrap gap-2">
                {item.tags.map((tag) => (
                  <span key={tag} className="chip">
                    {tag}
                  </span>
                ))}
              </div>
            </motion.li>
          ))}
        </ul>
      </div>
    </section>
  );
};

export default Experience;
