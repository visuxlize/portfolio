import React, { useState, useEffect, useRef } from 'react';
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

type SnakeDotGridProps = {
  /** Content column — snakes stay out of this rect (canvas coordinates). */
  excludeRef: React.RefObject<HTMLElement | null>;
};

function cellCenterPx(x: number, y: number, cell: number) {
  return { px: x * cell + cell / 2, py: y * cell + cell / 2 };
}

function cellInExcludeRect(
  x: number,
  y: number,
  cell: number,
  rect: { left: number; top: number; width: number; height: number } | null,
  pad: number
) {
  if (!rect || rect.width <= 0 || rect.height <= 0) return false;
  const { px, py } = cellCenterPx(x, y, cell);
  return (
    px >= rect.left - pad &&
    px <= rect.left + rect.width + pad &&
    py >= rect.top - pad &&
    py <= rect.top + rect.height + pad
  );
}

function SnakeDotGrid({ excludeRef }: SnakeDotGridProps) {
  const canvasRef = React.useRef<HTMLCanvasElement>(null);
  const excludeRectRef = React.useRef<{ left: number; top: number; width: number; height: number } | null>(
    null
  );

  React.useLayoutEffect(() => {
    const canvas = canvasRef.current;
    const parent = canvas?.parentElement;
    const el = excludeRef.current;
    if (!canvas || !parent || !el) return;

    const updateExclude = () => {
      const p = parent.getBoundingClientRect();
      const e = el.getBoundingClientRect();
      excludeRectRef.current = {
        left: e.left - p.left,
        top: e.top - p.top,
        width: e.width,
        height: e.height,
      };
    };

    updateExclude();
    const ro = new ResizeObserver(updateExclude);
    ro.observe(parent);
    ro.observe(el);
    window.addEventListener('resize', updateExclude);
    return () => {
      ro.disconnect();
      window.removeEventListener('resize', updateExclude);
    };
  }, [excludeRef]);

  React.useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const parent = canvas.parentElement;
    if (!parent) return;

    // Constants (exact values from reference)
    const CELL = 24; // grid cell size in px
    const NUM_SNAKES = 3; // number of snakes
    const TRAIL_LEN = 8; // max dots per snake trail
    const INTERVAL = 180; // ms per step
    const EXCLUDE_PAD = 12; // keep trails off the text block
    const DIRS = [
      [1, 0],
      [-1, 0],
      [0, 1],
      [0, -1],
    ] as const;

    const resize = () => {
      canvas.width = parent.clientWidth;
      canvas.height = parent.clientHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    const cols = () => Math.max(1, Math.floor(canvas.width / CELL));
    const rows = () => Math.max(1, Math.floor(canvas.height / CELL));

    const randomOpenCell = (): [number, number] => {
      const g = cols();
      const r = rows();
      for (let attempt = 0; attempt < 80; attempt++) {
        const cx = Math.floor(Math.random() * g);
        const cy = Math.floor(Math.random() * r);
        if (!cellInExcludeRect(cx, cy, CELL, excludeRectRef.current, EXCLUDE_PAD)) {
          return [cx, cy];
        }
      }
      return [0, 0];
    };

    // Initialize snakes at random grid positions (outside text column)
    const snakes = Array.from({ length: NUM_SNAKES }, () => ({
      trail: [randomOpenCell()] as [number, number][],
      dir: DIRS[Math.floor(Math.random() * 4)] as [number, number],
    }));

    const sameDir = (a: readonly [number, number], b: readonly [number, number]) =>
      a[0] === b[0] && a[1] === b[1];

    const tryStep = (snake: (typeof snakes)[0], g: number, r: number) => {
      const [hx, hy] = snake.trail[snake.trail.length - 1];
      const dirsToTry: [number, number][] = [snake.dir];
      for (const d of DIRS) {
        if (!sameDir(d, snake.dir)) dirsToTry.push([d[0], d[1]]);
      }
      for (const dir of dirsToTry) {
        let nx = hx + dir[0];
        let ny = hy + dir[1];
        if (nx < 0) nx = g - 1;
        if (nx >= g) nx = 0;
        if (ny < 0) ny = r - 1;
        if (ny >= r) ny = 0;
        if (!cellInExcludeRect(nx, ny, CELL, excludeRectRef.current, EXCLUDE_PAD)) {
          snake.dir = dir;
          snake.trail.push([nx, ny]);
          if (snake.trail.length > TRAIL_LEN) snake.trail.shift();
          return;
        }
      }
      snake.trail.push([hx, hy]);
      if (snake.trail.length > TRAIL_LEN) snake.trail.shift();
    };

    const interval = setInterval(() => {
      const g = cols();
      const r = rows();

      for (const snake of snakes) {
        if (Math.random() < 0.3) {
          snake.dir = DIRS[Math.floor(Math.random() * 4)] as [number, number];
        }
        tryStep(snake, g, r);
      }

      const ctx = canvas.getContext('2d');
      if (!ctx) return;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const ex = excludeRectRef.current;

      for (const snake of snakes) {
        for (let i = 0; i < snake.trail.length; i++) {
          const [x, y] = snake.trail[i];
          if (cellInExcludeRect(x, y, CELL, ex, EXCLUDE_PAD)) continue;
          const opacity = ((i + 1) / snake.trail.length) * 0.5;
          ctx.beginPath();
          ctx.arc(x * CELL + CELL / 2, y * CELL + CELL / 2, 1.5, 0, Math.PI * 2);
          const isDark = document.documentElement.classList.contains('dark');
          // Light: saturated blue for contrast; dark: cyan reference
          ctx.fillStyle = isDark
            ? `rgba(0, 217, 255, ${opacity})`
            : `rgba(37, 99, 235, ${opacity})`;
          ctx.fill();
        }
      }
    }, INTERVAL);

    return () => {
      clearInterval(interval);
      window.removeEventListener('resize', resize);
    };
  }, [excludeRef]);

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none absolute inset-0 z-0"
    />
  );
}

const Hero: React.FC = () => {
  const heroBodyRef = useRef<HTMLDivElement>(null);
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
      className="relative flex min-h-screen items-center overflow-hidden bg-slate-100 dark:bg-[#090d0c]"
    >
      <div
        className="hero-dot-grid pointer-events-none absolute inset-0 z-0"
        aria-hidden
      />

      <motion.div
        className="pointer-events-none absolute top-[-100px] right-[-100px] z-[1] h-[500px] w-[500px] rounded-full opacity-50 blur-3xl dark:opacity-100"
        style={{
          background:
            'radial-gradient(circle, rgba(20,184,166,0.18) 0%, rgba(139,92,246,0.1) 50%, transparent 70%)',
        }}
        animate={{ scale: [1, 1.08, 1], opacity: [0.45, 0.75, 0.45] }}
        transition={{ duration: 11, ease: 'easeInOut', repeat: Infinity }}
        aria-hidden
      />

      <div
        ref={heroBodyRef}
        className="relative z-10 mx-auto w-full max-w-5xl px-8 py-24 md:px-16"
      >
        <p className="mb-6 text-sm font-normal tracking-wide text-slate-600 dark:text-slate-400">
          Hi, I&apos;m{' '}
          <strong className="font-semibold text-slate-900 dark:text-white">Andres Marte</strong> ·{' '}
          <a
            href="https://github.com/visuxlize"
            target="_blank"
            rel="noopener noreferrer"
            className="text-cyan-600 transition-colors hover:text-cyan-500 dark:text-cyan-400 dark:hover:text-cyan-300"
          >
            @visuxlize
          </a>
        </p>

        <h1 className="max-w-4xl font-display text-[clamp(3rem,7vw,6rem)] font-extrabold leading-[1.05] tracking-[-0.03em] text-slate-900 dark:text-white">
          <span className="block">Software developer</span>
          <span className="block">
            who builds{' '}
            <span className="relative inline-block min-w-[10ch]">
              <span
                className="absolute inset-0 rounded-lg bg-gradient-to-r from-cyan-500 to-purple-500 opacity-20 blur-2xl dark:opacity-30"
                aria-hidden
              />
              <span className="relative z-10 inline-flex items-baseline font-display">
                <span className="bg-gradient-to-r from-cyan-400 via-teal-300 to-purple-400 bg-clip-text text-transparent">
                  {gradientText}
                </span>
                <span
                  className={`ml-[3px] inline-block translate-y-[0.02em] font-light leading-none text-teal-600 dark:text-teal-300 ${
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
          <span className="block">
            digital{' '}
            <span className="beam-pill relative inline-block">experiences.</span>
          </span>
        </h1>

        <div className="mt-8 flex flex-wrap items-center gap-3">
          <span className="text-xs font-semibold tracking-[0.18em] text-slate-500 uppercase dark:text-slate-500">
            Focus Areas
          </span>

          {focusAreas.map((area, i) => (
            <button
              key={area.chip}
              type="button"
              onClick={() => setActiveIndex(i)}
              className={
                i === activeIndex
                  ? 'px-5 py-2 rounded-full border text-sm font-medium transition-all duration-300 border-teal-500/70 bg-teal-950/60 text-teal-300'
                  : 'px-5 py-2 rounded-full border text-sm font-medium transition-all duration-300 border-white/10 text-slate-400 hover:border-white/25 hover:text-slate-300'
              }
            >
              {area.chip}
            </button>
          ))}
        </div>

        <p
          className="mt-8 min-h-[4.5rem] font-mono text-base leading-relaxed tracking-wide text-slate-600 dark:text-slate-400"
          aria-busy={isTyping}
        >
          <span className="text-slate-800 dark:text-slate-300">{displayText}</span>
          <span
            className={`ml-[3px] inline-block h-[1.05em] w-[2px] translate-y-[0.05em] rounded-[1px] bg-teal-600 align-middle dark:bg-teal-400 ${
              isTyping ? 'animate-none opacity-100' : 'animate-pulse opacity-90'
            }`}
            aria-hidden
          />
        </p>
      </div>

      <SnakeDotGrid excludeRef={heroBodyRef} />
    </section>
  );
};

export default Hero;
