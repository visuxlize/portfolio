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

/** Public repos from github.com/visuxlize (Feb 2026). Profile readme repo omitted. */
const projects: Project[] = [
  {
    title: 'Portfolio',
    description:
      'Personal portfolio — React, TypeScript, Tailwind, Framer Motion, dark mode, and GitHub Pages deploy.',
    tags: ['TypeScript', 'React', 'Tailwind', 'GitHub Pages'],
    githubUrl: 'https://github.com/visuxlize/portfolio',
    liveUrl: 'https://visuxlize.github.io/portfolio/',
    gradient: 'from-cyan-500/20 to-blue-500/20',
  },
  {
    title: 'Headz Aint Ready',
    description:
      'Redesign of booking and website for a barber shop in Jackson Heights, Queens — deployed on Netlify.',
    tags: ['TypeScript', 'Next.js', 'Netlify'],
    githubUrl: 'https://github.com/visuxlize/Headz-Aint-Ready',
    liveUrl: 'https://headz-aint-ready.netlify.app/',
    gradient: 'from-purple-500/20 to-pink-500/20',
  },
  {
    title: 'Therapick',
    description:
      'Therapist search app that matches users with mental health professionals based on how they feel — less directory fatigue, more relevant matches.',
    tags: ['TypeScript', 'React', 'Vercel'],
    githubUrl: 'https://github.com/visuxlize/therapick-app',
    liveUrl: 'https://therapick-app.vercel.app',
    gradient: 'from-amber-500/20 to-orange-500/20',
  },
  {
    title: 'Brooklinen Backstage',
    description:
      'Internal / backstage tooling for workflows — TypeScript full-stack experience.',
    tags: ['TypeScript', 'Vercel'],
    githubUrl: 'https://github.com/visuxlize/Brooklinen-Backstage',
    liveUrl: 'https://brooklinen-backstage.vercel.app',
    gradient: 'from-cyan-500/20 to-blue-500/20',
  },
  {
    title: 'SaaS Starter Kit',
    description:
      'Boilerplate template to ship apps and projects faster — auth-ready patterns and structure.',
    tags: ['TypeScript', 'Template'],
    githubUrl: 'https://github.com/visuxlize/SaaS-Starter-Kit',
    liveUrl: undefined,
    gradient: 'from-purple-500/20 to-pink-500/20',
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
      'Redesign concept for the New Castle Metal website — front-end exploration.',
    tags: ['JavaScript', 'GitHub Pages'],
    githubUrl: 'https://github.com/visuxlize/NCMRedesign',
    liveUrl: 'https://visuxlize.github.io/NCMRedesign/',
    gradient: 'from-cyan-500/20 to-blue-500/20',
  },
  {
    title: 'Software Development Assignments',
    description:
      'Coursework and assignments from my software development degree — C# and related exercises.',
    tags: ['C#', 'Coursework'],
    githubUrl: 'https://github.com/visuxlize/Software-development-assignments',
    liveUrl: undefined,
    gradient: 'from-amber-500/20 to-orange-500/20',
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
