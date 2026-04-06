import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const focusAreas = [
  {
    chip: 'Full-Stack Developer',
    gradientWord: 'thoughtful',
    typingText: 'React, TypeScript, Node — full-stack with a design eye.',
  },
  {
    chip: 'UX/UI Designer',
    gradientWord: 'beautiful',
    typingText: 'Figma, design systems, UX research — interfaces that delight.',
  },
  {
    chip: 'Photographer',
    gradientWord: 'visual',
    typingText: 'Composition, light, and story — through the lens.',
  },
];

/** Tagline typing speed (unchanged). */
const TYPE_MS = 42;
/** Headline gradient word — slower so it reads clearly. */
const GRADIENT_TYPE_MS = 105;
/** After the gradient word finishes, blink the caret for this long, then auto-advance (does not wait for tagline). */
const GRADIENT_POST_TYPE_MS = 2500;

const Hero: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [gradientText, setGradientText] = useState('');
  const [isTypingGradient, setIsTypingGradient] = useState(true);
  const [displayText, setDisplayText] = useState('');
  const [isTyping, setIsTyping] = useState(true);

  /** Typewriter for the headline gradient word (thoughtful / beautiful / visual). */
  useEffect(() => {
    setGradientText('');
    setIsTypingGradient(true);
    const word = focusAreas[activeIndex].gradientWord;
    let i = 0;
    let cancelled = false;
    let tid: number | undefined;

    const typeNext = () => {
      if (cancelled) return;
      i += 1;
      setGradientText(word.slice(0, i));
      if (i < word.length) {
        tid = window.setTimeout(typeNext, GRADIENT_TYPE_MS) as unknown as number;
      } else {
        setIsTypingGradient(false);
      }
    };

    if (word.length === 0) {
      setIsTypingGradient(false);
      return;
    }
    typeNext();

    return () => {
      cancelled = true;
      if (tid !== undefined) window.clearTimeout(tid);
    };
  }, [activeIndex]);

  /** Typewriter: tagline one character at a time; resets whenever the active focus area changes. */
  useEffect(() => {
    setDisplayText('');
    setIsTyping(true);
    const text = focusAreas[activeIndex].typingText;
    let i = 0;
    let cancelled = false;
    let tid: number | undefined;

    const typeNext = () => {
      if (cancelled) return;
      i += 1;
      setDisplayText(text.slice(0, i));
      if (i < text.length) {
        tid = window.setTimeout(typeNext, TYPE_MS) as unknown as number;
      } else {
        setIsTyping(false);
      }
    };

    if (text.length === 0) {
      setIsTyping(false);
      return;
    }
    typeNext();

    return () => {
      cancelled = true;
      if (tid !== undefined) window.clearTimeout(tid);
    };
  }, [activeIndex]);

  /** Auto-advance when the headline word is done + blink pause — independent of tagline typing. */
  useEffect(() => {
    const word = focusAreas[activeIndex].gradientWord;
    if (word.length === 0) return;
    if (isTypingGradient) return;
    if (gradientText !== word) return;

    const t = window.setTimeout(() => {
      setActiveIndex((prev) => (prev + 1) % focusAreas.length);
    }, GRADIENT_POST_TYPE_MS);
    return () => window.clearTimeout(t);
  }, [activeIndex, gradientText, isTypingGradient]);

  return (
    <section
      id="home"
      className="relative flex min-h-screen items-center overflow-hidden bg-[#090d0c]"
    >
      <div
        className="pointer-events-none absolute inset-0 z-0"
        style={{
          backgroundImage: 'radial-gradient(rgba(255,255,255,0.07) 1px, transparent 1px)',
          backgroundSize: '32px 32px',
        }}
        aria-hidden
      />

      <motion.div
        className="pointer-events-none absolute top-[-100px] right-[-100px] z-[1] h-[500px] w-[500px] rounded-full blur-3xl"
        style={{
          background:
            'radial-gradient(circle, rgba(20,184,166,0.12) 0%, rgba(139,92,246,0.06) 50%, transparent 70%)',
        }}
        animate={{ scale: [1, 1.08, 1], opacity: [0.6, 0.9, 0.6] }}
        transition={{ duration: 11, ease: 'easeInOut', repeat: Infinity }}
        aria-hidden
      />

      <div className="relative z-10 mx-auto w-full max-w-5xl px-8 py-24 md:px-16">
        <p className="mb-6 text-sm font-normal tracking-wide text-slate-400">
          Hi, I&apos;m <strong className="font-semibold text-white">Andres Marte</strong> ·{' '}
          <a
            href="https://github.com/visuxlize"
            target="_blank"
            rel="noopener noreferrer"
            className="text-cyan-400 transition-colors hover:text-cyan-300"
          >
            @visuxlize
          </a>
        </p>

        <h1 className="max-w-4xl font-display text-[clamp(3rem,7vw,6rem)] font-extrabold leading-[1.05] tracking-[-0.03em] text-white">
          <span className="block">Software developer</span>
          <span className="block">
            who builds{' '}
            <span className="relative inline-block min-w-[10ch]">
              <span
                className="absolute inset-0 rounded-lg bg-gradient-to-r from-cyan-500 to-purple-500 opacity-30 blur-2xl"
                aria-hidden
              />
              <span className="relative z-10 inline-flex items-baseline font-display">
                <span className="bg-gradient-to-r from-cyan-400 via-teal-300 to-purple-400 bg-clip-text text-transparent">
                  {gradientText}
                </span>
                <span
                  className={`ml-[3px] inline-block translate-y-[0.02em] font-light text-teal-300 leading-none ${
                    isTypingGradient
                      ? 'opacity-100'
                      : 'animate-pulse opacity-95'
                  }`}
                  aria-hidden
                >
                  |
                </span>
              </span>
            </span>
          </span>
          <span className="block">digital experiences.</span>
        </h1>

        <div className="mt-8 flex flex-wrap items-center gap-3">
          <span className="text-xs font-semibold tracking-[0.18em] text-slate-500 uppercase">
            Focus Areas
          </span>

          {focusAreas.map((area, i) => (
            <button
              key={area.chip}
              type="button"
              onClick={() => setActiveIndex(i)}
              className={
                i === activeIndex
                  ? 'rounded-full border border-teal-500/70 bg-teal-950/60 px-5 py-2 text-sm font-medium text-teal-300 shadow-[0_0_16px_rgba(20,184,166,0.25)] transition-all duration-300'
                  : 'rounded-full border border-white/10 px-5 py-2 text-sm font-medium text-slate-400 transition-all duration-300 hover:border-white/25 hover:text-slate-300'
              }
            >
              {area.chip}
            </button>
          ))}
        </div>

        <p
          className="mt-8 min-h-[4.5rem] font-mono text-base leading-relaxed tracking-wide text-slate-400"
          aria-busy={isTyping}
        >
          <span className="text-slate-300">{displayText}</span>
          <span
            className={`ml-[3px] inline-block h-[1.05em] w-[2px] translate-y-[0.05em] rounded-[1px] bg-teal-400 align-middle ${
              isTyping ? 'animate-none opacity-100' : 'animate-pulse opacity-90'
            }`}
            aria-hidden
          />
        </p>
      </div>
    </section>
  );
};

export default Hero;
