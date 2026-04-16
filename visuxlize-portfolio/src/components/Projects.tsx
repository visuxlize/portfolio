import React from 'react';
import { motion } from 'framer-motion';
import { Github, ExternalLink } from 'lucide-react';

type Project = {
  title: string;
  description: string;
  tags: string[];
  githubUrl: string;
  liveUrl?: string;
  gradient: string;
};

/**
 * Curated highlights — visuxlize + BrasenaInc org (Apr 2026).
 * Omitted: profile readme, SaaS template, coursework, small one-offs.
 */
const projects: Project[] = [
  {
    title: 'Brasena',
    description:
      'Wholesale meat logistics for the Bronx and beyond — marketing site, waitlist, and platform story for B2B and B2C. Ongoing product and engineering.',
    tags: ['TypeScript', 'Next.js', 'Supabase'],
    githubUrl: 'https://github.com/BrasenaInc/Brasena',
    liveUrl: 'https://brasenabx.com/marketing',
    gradient: 'from-emerald-500/20 to-green-600/20',
  },
  {
    title: 'Headz Aint Ready',
    description:
      'Booking and marketing site for a Jackson Heights barbershop — public site, client booking, and shop operations. Live on a custom domain.',
    tags: ['TypeScript', 'Next.js', 'Supabase'],
    githubUrl: 'https://github.com/visuxlize/Headz-Aint-Ready',
    liveUrl: 'https://headzaintready.com/',
    gradient: 'from-purple-500/20 to-pink-500/20',
  },
  {
    title: 'Savage Entertainment & Hospitality',
    description:
      'Luxury events brand platform — cinematic marketing site, inquiries, booking flow, and an admin workspace for bookings, media, and content.',
    tags: ['TypeScript', 'Next.js', 'Supabase', 'tRPC'],
    githubUrl: 'https://github.com/visuxlize/Savage-Entertainment-and-Hospitality',
    liveUrl: 'https://savage-entertainment-and-hospitalit.vercel.app',
    gradient: 'from-rose-500/20 to-amber-500/20',
  },
  {
    title: 'Brooklinen Backstage',
    description:
      'Internal scheduling and retail operations app — daily workflows and tooling for the team.',
    tags: ['TypeScript', 'Next.js', 'Vercel'],
    githubUrl: 'https://github.com/visuxlize/Brooklinen-Backstage',
    liveUrl: 'https://brooklinen-backstage.vercel.app',
    gradient: 'from-cyan-500/20 to-blue-500/20',
  },
  {
    title: 'Therapick',
    description:
      'Therapist search that matches you with mental health professionals based on how you feel — less directory fatigue, more relevant matches.',
    tags: ['TypeScript', 'React', 'Vercel'],
    githubUrl: 'https://github.com/visuxlize/therapick-app',
    liveUrl: 'https://therapick-app.vercel.app',
    gradient: 'from-amber-500/20 to-orange-500/20',
  },
  {
    title: 'Portfolio',
    description:
      'This site — React, TypeScript, Tailwind, Framer Motion, theme toggle, deployed to GitHub Pages.',
    tags: ['TypeScript', 'React', 'Tailwind', 'GitHub Pages'],
    githubUrl: 'https://github.com/visuxlize/portfolio',
    liveUrl: 'https://visuxlize.github.io/portfolio/',
    gradient: 'from-cyan-500/20 to-blue-500/20',
  },
  {
    title: 'Ostome',
    description:
      'Mood tracking for children — feelings, symptoms, and appointment awareness with a colorful, intuitive UI.',
    tags: ['JavaScript', 'GitHub Pages'],
    githubUrl: 'https://github.com/visuxlize/ostome-app',
    liveUrl: 'https://visuxlize.github.io/ostome-app/',
    gradient: 'from-amber-500/20 to-orange-500/20',
  },
  {
    title: 'NCM Redesign',
    description:
      'Redesign concept for the New Castle Metal website — front-end exploration and static deploy.',
    tags: ['JavaScript', 'GitHub Pages'],
    githubUrl: 'https://github.com/visuxlize/NCMRedesign',
    liveUrl: 'https://visuxlize.github.io/NCMRedesign/',
    gradient: 'from-slate-500/20 to-cyan-500/20',
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 24 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.45, ease: [0.22, 1, 0.36, 1] },
  },
};

const Projects: React.FC = () => {
  return (
    <section
      id="projects"
      className="section-container"
      aria-label="Projects"
    >
      <motion.header
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="mb-0"
      >
        <p className="text-xs font-semibold uppercase tracking-widest text-primary">
          WHAT I BUILD
        </p>
        <h2 className="mt-2 font-display text-3xl font-bold text-slate-900 dark:text-white md:text-4xl">
          Projects
        </h2>
        <p className="mt-3 text-sm text-slate-600 dark:text-slate-400">
          From{' '}
          <a
            href="https://github.com/visuxlize"
            target="_blank"
            rel="noopener noreferrer"
            className="font-medium text-primary underline-offset-2 hover:underline"
          >
            github.com/visuxlize
          </a>
          — live demos where deployed.
        </p>
      </motion.header>

      <motion.div
        className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-2"
        variants={containerVariants}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: '-60px' }}
      >
        {projects.map((project) => (
          <motion.article
            key={project.title}
            variants={cardVariants}
            className="card-base group flex flex-col overflow-hidden transition-all duration-300 hover:border-primary/30"
          >
            <div
              className={`h-2 w-full bg-gradient-to-r ${project.gradient}`}
              aria-hidden
            />
            <div className="flex flex-col p-6">
              <h3 className="font-display text-lg font-semibold text-slate-900 dark:text-white">
                {project.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-slate-600 dark:text-slate-400">
                {project.description}
              </p>
              <div className="mt-4 flex flex-wrap gap-2">
                {project.tags.map((tag) => (
                  <span key={tag} className="chip">
                    {tag}
                  </span>
                ))}
              </div>
              <div className="mt-6 flex flex-wrap items-center gap-4">
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 text-sm text-slate-500 transition-colors hover:text-primary dark:text-slate-400"
                >
                  <Github size={14} strokeWidth={2} aria-hidden />
                  GitHub
                </a>
                {project.liveUrl ? (
                  <a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1.5 text-sm text-slate-500 transition-colors hover:text-primary dark:text-slate-400"
                  >
                    <ExternalLink size={14} strokeWidth={2} aria-hidden />
                    Live
                  </a>
                ) : null}
              </div>
            </div>
          </motion.article>
        ))}
      </motion.div>
    </section>
  );
};

export default Projects;
