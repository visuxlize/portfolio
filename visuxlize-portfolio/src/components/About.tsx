import React from 'react';
import { motion } from 'framer-motion';
import type { LucideIcon } from 'lucide-react';
import { Code2, Layers, Server, Palette, Shield, Wrench, Cloud } from 'lucide-react';

const languages = [
  { label: 'Spanish', level: 'Native' },
  { label: 'English', level: 'Native' },
];

const softSkills = [
  'Communication',
  'Leadership',
  'Systems Thinking',
  'E2E Ownership',
  'Bias for Action',
  'Influence w/o Authority',
  'Dealing with Ambiguity',
];

/** Your stack — same structure as the reference UI (category cards + bullet rows). */
const techCategories: { title: string; icon: LucideIcon; items: string[] }[] = [
  {
    title: 'Frontend',
    icon: Layers,
    items: ['React', 'TypeScript', 'Tailwind CSS', 'Next.js', 'Framer Motion'],
  },
  {
    title: 'Backend',
    icon: Server,
    items: ['Node.js', 'Express', 'PostgreSQL', 'REST APIs', 'Python'],
  },
  {
    title: 'Design',
    icon: Palette,
    items: ['Figma', 'UX Research', 'Wireframing', 'Design Systems', 'Prototyping'],
  },
  {
    title: 'Security',
    icon: Shield,
    items: ['Network Security', 'OWASP', 'Secure Coding', 'Linux', 'Ethical Hacking'],
  },
  {
    title: 'Dev & tooling',
    icon: Wrench,
    items: ['Git', 'VS Code', 'npm', 'Chrome DevTools', 'Testing basics'],
  },
  {
    title: 'Deploy',
    icon: Cloud,
    items: ['Vercel', 'Netlify', 'GitHub Pages'],
  },
];

const gridContainerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.06 },
  },
};

const skillCardVariants = {
  hidden: { opacity: 0, y: 16 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, ease: [0.22, 1, 0.36, 1] },
  },
};

function TechCard({
  title,
  icon: Icon,
  children,
}: {
  title: string;
  icon: LucideIcon;
  children: React.ReactNode;
}) {
  return (
    <motion.article
      variants={skillCardVariants}
      className="skills-dot-panel rounded-2xl border border-white/10 bg-[#0a1010]/90 p-5 shadow-[inset_0_1px_0_rgba(255,255,255,0.04)]"
    >
      <p className="mb-4 flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.22em] text-cyan-400">
        <Icon className="h-3.5 w-3.5 text-cyan-400/90" strokeWidth={2} aria-hidden />
        {title}
      </p>
      <div className="space-y-3 text-sm text-slate-300">{children}</div>
    </motion.article>
  );
}

const portraitSrc = `${process.env.PUBLIC_URL}/images/andres-portrait.png`;

const About: React.FC = () => {
  return (
    <section id="about" className="px-6 py-24" aria-label="About me">
      <div className="mx-auto max-w-6xl">
        <motion.div
          className="flex flex-col items-stretch gap-8 sm:flex-row sm:items-center sm:gap-10 lg:gap-14"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
        >
          <figure className="mx-auto shrink-0 sm:mx-0">
            <div className="relative h-60 w-48 overflow-hidden rounded-2xl bg-slate-200 ring-1 ring-black/5 dark:bg-slate-900 dark:ring-white/10 sm:h-72 sm:w-56 md:h-80 md:w-64">
              <img
                src={portraitSrc}
                alt="Andres Marte"
                width={512}
                height={683}
                loading="lazy"
                decoding="async"
                className="h-full w-full object-cover object-[center_18%]"
              />
              <div
                className="pointer-events-none absolute inset-y-0 right-0 w-[36%] bg-gradient-to-r from-transparent to-[var(--bg)]"
                aria-hidden
              />
            </div>
            <figcaption className="sr-only">Portrait photo</figcaption>
          </figure>

          <div className="min-w-0 flex-1 space-y-5 text-left md:space-y-6">
            <header>
              <p className="text-sm font-semibold uppercase tracking-widest text-primary">
                ABOUT ME
              </p>
              <h2 className="mt-2 font-display text-3xl font-bold text-slate-900 dark:text-white md:text-4xl lg:text-[2.75rem] lg:leading-tight">
                Who I Am
              </h2>
            </header>
            <p className="text-lg leading-relaxed text-slate-600 dark:text-slate-400 md:text-xl md:leading-relaxed">
              I&apos;m a software engineering student at DeVry University with a background in
              architecture and UX/UI design. I transitioned from designing physical spaces to
              building digital ones — which means I approach every project thinking about structure,
              usability, and the people who will use it. I&apos;m particularly interested in the
              intersection of cybersecurity and frontend development.
            </p>
          </div>
        </motion.div>
      </div>

      <div className="mx-auto mt-16 max-w-6xl">
        <div className="rounded-3xl border border-white/10 bg-[#090d0c] p-8 shadow-[0_0_0_1px_rgba(255,255,255,0.04)] dark:bg-[#090d0c] md:p-10">
          <div className="mb-10 flex items-center gap-4">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border border-white/10 bg-white/[0.04]">
              <Code2 className="h-6 w-6 text-cyan-400" strokeWidth={2} aria-hidden />
            </div>
            <h3 className="font-display text-3xl font-bold tracking-tight text-white md:text-4xl">
              Skills
            </h3>
          </div>

          <div className="grid gap-10 lg:grid-cols-[minmax(0,260px)_1fr] lg:gap-12">
            <div className="space-y-10">
              <div>
                <h4 className="mb-4 text-sm font-semibold uppercase tracking-wide text-slate-400">
                  Languages
                </h4>
                <ul className="space-y-3 text-sm">
                  {languages.map((lang) => (
                    <li
                      key={lang.label}
                      className="flex flex-wrap items-baseline justify-between gap-2 border-b border-white/10 pb-3 last:border-0 last:pb-0"
                    >
                      <span className="font-medium text-white">{lang.label}</span>
                      <span className="text-cyan-400">{lang.level}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h4 className="mb-4 text-sm font-semibold uppercase tracking-wide text-slate-400">
                  Soft Skills
                </h4>
                <div className="flex flex-wrap gap-2">
                  {softSkills.map((skill) => (
                    <span
                      key={skill}
                      className="rounded-full border border-purple-500/35 bg-transparent px-3 py-1.5 text-xs font-medium text-slate-300"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <div>
              <h4 className="mb-6 text-[10px] font-bold uppercase tracking-[0.2em] text-slate-500">
                Tech Stack
              </h4>
              <motion.div
                className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3"
                variants={gridContainerVariants}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, margin: '-40px' }}
              >
                {techCategories.map((cat) => (
                  <TechCard key={cat.title} title={cat.title} icon={cat.icon}>
                    <ul className="space-y-2.5">
                      {cat.items.map((item) => (
                        <li
                          key={item}
                          className="flex items-start gap-2.5 leading-snug text-slate-200"
                        >
                          <span
                            className="mt-2 h-1 w-1 shrink-0 rounded-full bg-cyan-400/80"
                            aria-hidden
                          />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </TechCard>
                ))}
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
