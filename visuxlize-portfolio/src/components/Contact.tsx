import React from 'react';
import { motion } from 'framer-motion';
import { Mail, Linkedin, Github } from 'lucide-react';

const Contact: React.FC = () => {
  return (
    <section id="contact" className="section-container" aria-label="Contact">
      <motion.div
        className="mx-auto max-w-xl text-center"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      >
        <p className="text-xs font-semibold uppercase tracking-widest text-primary">
          LET&apos;S TALK
        </p>
        <h2 className="mt-4 font-display text-3xl font-bold text-slate-900 dark:text-white md:text-4xl">
          Get In Touch
        </h2>
        <p className="mt-4 text-base leading-relaxed text-slate-600 dark:text-slate-400">
          I&apos;m always open to new projects, collaborations, or just a good conversation about
          tech and design. Reach out however works best for you.
        </p>

        <div className="mt-10 flex flex-col justify-center gap-4 sm:flex-row sm:flex-wrap">
          <a
            href="mailto:mAndres1994@gmail.com"
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-primary px-6 py-3 font-medium text-white transition-colors hover:bg-primary-dark"
          >
            <Mail size={16} strokeWidth={2} aria-hidden />
            Email Me
          </a>
          <a
            href="https://linkedin.com/in/andres-marte"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 rounded-xl border border-[var(--border)] bg-[var(--card)] px-6 py-3 font-medium text-slate-600 transition-colors hover:border-primary/50 dark:text-slate-400"
          >
            <Linkedin size={16} strokeWidth={2} aria-hidden />
            LinkedIn
          </a>
          <a
            href="https://github.com/visuxlize"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 rounded-xl border border-[var(--border)] bg-[var(--card)] px-6 py-3 font-medium text-slate-600 transition-colors hover:border-primary/50 dark:text-slate-400"
          >
            <Github size={16} strokeWidth={2} aria-hidden />
            GitHub
          </a>
        </div>
      </motion.div>
    </section>
  );
};

export default Contact;
