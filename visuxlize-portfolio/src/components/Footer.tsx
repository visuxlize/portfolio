import React from 'react';
import { Github, Linkedin, Mail } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="border-t border-[var(--border)] bg-[var(--bg)] px-6 py-8">
      <div className="mx-auto flex max-w-4xl flex-col items-center justify-between gap-4 sm:flex-row">
        <p className="text-sm text-slate-500">© 2026 Andres Marte</p>
        <p className="hidden text-sm text-slate-500 sm:block">
          Built with React & TypeScript
        </p>
        <div className="flex gap-4">
          <a
            href="https://github.com/visuxlize"
            target="_blank"
            rel="noopener noreferrer"
            className="text-slate-400 transition-colors hover:text-primary"
            aria-label="GitHub"
          >
            <Github size={18} strokeWidth={2} />
          </a>
          <a
            href="https://linkedin.com/in/andres-marte"
            target="_blank"
            rel="noopener noreferrer"
            className="text-slate-400 transition-colors hover:text-primary"
            aria-label="LinkedIn"
          >
            <Linkedin size={18} strokeWidth={2} />
          </a>
          <a
            href="mailto:mAndres1994@gmail.com"
            className="text-slate-400 transition-colors hover:text-primary"
            aria-label="Email"
          >
            <Mail size={18} strokeWidth={2} />
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
