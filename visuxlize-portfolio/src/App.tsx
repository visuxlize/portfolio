import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Hero from './components/Hero';
import Experience from './components/Experience';
import Projects from './components/Projects';
import About from './components/About';
import Contact from './components/Contact';
import Footer from './components/Footer';
import MLBEdgePro from './components/MLBEdgePro';
import Coursework from './components/Coursework';

function SectionDivider() {
  return (
    <div className="mx-auto max-w-4xl px-6">
      <div className="h-px bg-[var(--border)]" />
    </div>
  );
}

function Home() {
  return (
    <main>
      <Hero />
      <SectionDivider />
      <Experience />
      <SectionDivider />
      <Projects />
      <SectionDivider />
      <About />
      <SectionDivider />
      <Contact />
    </main>
  );
}

function AppShell({ children }: { children: React.ReactNode }) {
  const [isDark, setIsDark] = React.useState(() => {
    if (typeof window === 'undefined') return false;
    const theme = localStorage.getItem('theme');
    if (theme === 'dark') return true;
    if (theme === 'light') return false;
    return window.matchMedia('(prefers-color-scheme: dark)').matches;
  });

  React.useEffect(() => {
    document.documentElement.classList.toggle('dark', isDark);
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
  }, [isDark]);

  return (
    <div className="portfolio-page-bg min-h-screen text-[var(--fg)] transition-colors duration-300">
      <Header isDark={isDark} toggleDark={() => setIsDark((d) => !d)} />
      {children}
      <Footer />
    </div>
  );
}

function App() {
  return (
    <BrowserRouter basename="/portfolio">
      <AppShell>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/mlb-edge-pro" element={<MLBEdgePro />} />
          <Route path="/coursework" element={<Coursework />} />
        </Routes>
      </AppShell>
    </BrowserRouter>
  );
}

export default App;
