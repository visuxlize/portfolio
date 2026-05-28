import React, { useState, useEffect } from 'react';
import { Menu, X, Sun, Moon } from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';

export type HeaderProps = {
  isDark: boolean;
  toggleDark: () => void;
};

const scrollTo = (id: string) => {
  document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
};

const Header: React.FC<HeaderProps> = ({ isDark, toggleDark }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const isHome = location.pathname === '/';

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY >= 60);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => { setMobileOpen(false); }, [location.pathname]);

  const goHome = () => {
    if (isHome) scrollTo('home');
    else navigate('/');
  };

  const goSection = (id: string) => {
    setMobileOpen(false);
    if (isHome) {
      scrollTo(id);
    } else {
      navigate('/');
      setTimeout(() => scrollTo(id), 120);
    }
  };

  const NAV = [
    { label: 'My Path',      action: () => goSection('experience') },
    { label: 'What I Build', action: () => goSection('projects') },
    { label: 'MLB Edge Pro', action: () => { setMobileOpen(false); navigate('/mlb-edge-pro'); } },
    { label: 'Coursework',   action: () => { setMobileOpen(false); navigate('/coursework'); } },
    { label: "Let's Talk",   action: () => goSection('contact') },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50">
      <div className="flex justify-center px-4 pt-4">
        <div className={`flex w-full max-w-4xl items-center justify-between gap-4 rounded-full px-4 py-3 transition-all duration-300 ${
          isScrolled
            ? 'border-b border-[var(--border)] bg-[var(--bg)]/90 backdrop-blur-xl'
            : 'border border-transparent bg-transparent'
        }`}>
          <button
            type="button"
            onClick={goHome}
            className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-gradient-to-br from-primary to-purple text-sm font-bold text-white"
            aria-label="Home"
          >
            AM
          </button>

          <nav className="hidden flex-1 items-center justify-center gap-8 md:flex" aria-label="Primary">
            {NAV.map(({ label, action }) => (
              <button
                key={label}
                type="button"
                onClick={action}
                className={`font-sans text-sm font-medium transition-colors hover:text-primary ${
                  (label === 'MLB Edge Pro' && location.pathname === '/mlb-edge-pro') ||
                  (label === 'Coursework'   && location.pathname === '/coursework')
                    ? 'text-primary'
                    : 'text-slate-600 dark:text-slate-400'
                }`}
              >
                {label}
              </button>
            ))}
          </nav>

          <div className="flex shrink-0 items-center gap-2">
            <button
              type="button"
              onClick={() => setMobileOpen((o) => !o)}
              className="rounded-full p-2 text-slate-600 transition-colors hover:text-primary md:hidden dark:text-slate-400"
              aria-expanded={mobileOpen}
              aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
            >
              {mobileOpen ? <X size={22} strokeWidth={2} /> : <Menu size={22} strokeWidth={2} />}
            </button>
            <button
              type="button"
              onClick={toggleDark}
              aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
              className="rounded-full border border-[var(--border)] bg-[var(--card)] p-2 text-slate-600 transition-colors hover:border-primary/50 dark:text-slate-300"
            >
              {isDark ? <Sun size={20} strokeWidth={2} /> : <Moon size={20} strokeWidth={2} />}
            </button>
          </div>
        </div>
      </div>

      <div className={`w-full overflow-hidden border-t border-[var(--border)] bg-[var(--bg)] transition-[max-height] duration-300 ease-out md:hidden ${
        mobileOpen ? 'max-h-96' : 'max-h-0 border-t-0'
      }`}>
        <nav className="flex flex-col">
          {NAV.map(({ label, action }) => (
            <button
              key={label}
              type="button"
              onClick={action}
              className="w-full py-4 px-6 text-left font-sans text-sm font-medium text-slate-600 transition-colors hover:text-primary dark:text-slate-400"
            >
              {label}
            </button>
          ))}
        </nav>
      </div>
    </header>
  );
};

export default Header;
