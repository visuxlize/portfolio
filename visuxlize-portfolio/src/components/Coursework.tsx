import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ArrowLeft, CheckCircle, Clock, ChevronDown,
  ClipboardList, Search, Layers, Hammer, Code2, FlaskConical, Trophy,
} from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const fade = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] } },
};

type WeekMilestone = {
  week: number;
  phase: string;
  icon: LucideIcon;
  dueDate: string;
  title: string;
  summary: string;
  deliverables: string[];
};

type Course = {
  number: string;
  title: string;
  period: string;
  status: 'completed' | 'in-progress';
  gradient: string;
  description: string;
  whatIBuilt: string;
  keySkills: string[];
  concepts: string[];
  highlight: string;
  githubPath: string;
  weeks?: WeekMilestone[];
};

const ceis400Weeks: WeekMilestone[] = [
  {
    week: 1,
    phase: 'Planning',
    icon: ClipboardList,
    dueDate: 'Due May 8, 2026',
    title: 'Requirements & Project Plan',
    summary: 'Defined the business problem from GB Manufacturing\'s case study and wrote the initial specification for the MMMS (Maintenance Management System).',
    deliverables: [
      'Business Problem Scenario -- scope, objectives, and stakeholders',
      'IEEE-830 Software Requirements Specification -- 8 functional groups, 43 requirements',
      '30 use cases (UC-01 -- UC-30) mapped back to the SRS for traceability',
      'MS Project Plan -- 24 tasks across 4 SDLC phases',
    ],
  },
  {
    week: 2,
    phase: 'Analysis',
    icon: Search,
    dueDate: 'Due May 15, 2026',
    title: 'Use Case & Class Analysis',
    summary: 'Selected 5 high-priority use cases and modeled the system\'s structure and behavior before any code was written.',
    deliverables: [
      'Full use case descriptions for 5 priority flows (auth, checkout, return, employee management)',
      'Use case diagram -- Employee and Supervisor actors against the MMMS boundary',
      'Class diagram -- Employee, Equipment, Transaction, and Supervisor classes',
      'VOPC matrix confirming every use case maps to at least one class',
    ],
  },
  {
    week: 3,
    phase: 'Design (Architecture)',
    icon: Layers,
    dueDate: 'Due May 22, 2026',
    title: 'System Architecture',
    summary: 'Chose a hybrid three-tier + object-oriented architecture and mapped it against every non-functional requirement.',
    deliverables: [
      'SRS updated with 5 non-functional requirements (usability, performance, reliability, security, maintainability)',
      'Architecture Description -- React presentation layer, Django REST business logic, SQLite/PostgreSQL data layer',
      'Static architecture diagram with FR coverage per component',
      'Sequence diagram -- 14-step equipment checkout flow',
    ],
  },
  {
    week: 4,
    phase: 'Design & Construction',
    icon: Hammer,
    dueDate: 'Due May 29, 2026',
    title: 'Software Design Description & Build Begins',
    summary: 'The biggest week of the project -- a full IEEE-1016 SDD plus a working application skeleton across the entire stack.',
    deliverables: [
      'IEEE-1016 Software Design Description -- all 9 sections, Singleton and Factory patterns documented',
      'GitHub repository set up for the 5-person team',
      'Django backend skeleton -- 5 models, 14 REST endpoints, serializers',
      'React frontend skeleton -- 6 pages, JWT auth context, mock API layer',
    ],
  },
  {
    week: 5,
    phase: 'Construction',
    icon: Code2,
    dueDate: 'Due June 5, 2026',
    title: 'Component Construction',
    summary: 'Completed the core build -- refactored the backend into proper Django models and finished a fully functional React frontend running on mock data.',
    deliverables: [
      'Backend refactor -- guard clauses, consistent success/message response shape across all 14 endpoints',
      'Employee model on AbstractBaseUser with secure password hashing',
      'Standalone React app runnable end-to-end against a mock API',
      'Singleton (JWT session) and Factory (role-based access) patterns implemented in code',
    ],
  },
  {
    week: 6,
    phase: 'Testing',
    icon: FlaskConical,
    dueDate: 'Due June 12, 2026',
    title: 'Test Case Design',
    summary: 'Wrote a formal IEEE-829 test suite so any team member -- not just the original developer -- could execute and verify each feature.',
    deliverables: [
      '12 IEEE-829 test cases (TC-01 -- TC-12) covering auth, checkout, return, and supervisor functions',
      'SQL injection sub-test built into the login test case',
      'Prerequisite, input, and expected-result criteria defined for every test',
      'Run instructions for executing backend + frontend together',
    ],
  },
  {
    week: 7,
    phase: 'Testing & Final Submission',
    icon: Trophy,
    dueDate: 'Due June 20, 2026',
    title: 'Test Execution & Project Close-Out',
    summary: 'Executed all 12 test cases against the live system, fixed defects, re-tested, and closed out the capstone.',
    deliverables: [
      'Initial test report -- all 12 tests run against the live app, results and severity ratings logged',
      'Defect corrections followed by an updated test report re-confirming all 12 passed',
      'Team charter -- roles, communication norms, and conflict resolution, signed by all 5 members',
      'Final system: 6 React pages, 14 REST endpoints, 5 Django models, JWT auth with role-based access',
    ],
  },
];

const courses: Course[] = [
  {
    number: 'CEIS150',
    title: 'Programming with Objects',
    period: 'Completed August 2025',
    status: 'completed',
    gradient: 'from-emerald-500/20 to-teal-600/20',
    description: 'Object-oriented and functional programming in Python. Introduces OOP concepts, complex algorithms, and libraries for data manipulation and visualization.',
    whatIBuilt: 'Business-oriented Python applications using classes, inheritance, and polymorphism. Data processing pipelines with pandas and matplotlib.',
    keySkills: ['Python', 'OOP', 'Pandas', 'Matplotlib', 'Algorithms'],
    concepts: ['Class design and encapsulation', 'Inheritance and polymorphism', 'Functional programming patterns', 'Data manipulation with libraries', 'Algorithm complexity basics'],
    highlight: 'This course is where I stopped writing scripts and started designing systems. The shift from procedural to OOP thinking directly carried into how I structure FastAPI backends today.',
    githubPath: 'https://github.com/visuxlize/Software-development-assignments/tree/main/Python%20Course',
  },
  {
    number: 'C# Course',
    title: 'Structured and Object-Oriented Development',
    period: 'Completed October 2025',
    status: 'completed',
    gradient: 'from-purple-500/20 to-pink-500/20',
    description: 'C# and .NET -- structured and OOP development. Language syntax, control structures, functions, debugger tools, classes, encapsulation, polymorphism, and inheritance.',
    whatIBuilt: 'Structured and OOP applications in C# using Visual Studio. Console apps through class-hierarchy programs demonstrating encapsulation and polymorphism.',
    keySkills: ['C#', '.NET', 'Visual Studio', 'OOP', 'Debugging'],
    concepts: ['C# type system and syntax', 'Selection and iteration structures', 'Encapsulation and access modifiers', 'Class hierarchies and inheritance', 'IDE debugging and testing'],
    highlight: 'Working in a statically typed language with a full IDE debugger sharpened my understanding of types in a way that made TypeScript feel natural.',
    githubPath: 'https://github.com/visuxlize/Software-development-assignments/tree/main/C%23%20Course',
  },
  {
    number: 'SQL / CEIS',
    title: 'Database Systems and Programming Fundamentals',
    period: 'Completed November 2025',
    status: 'completed',
    gradient: 'from-blue-500/20 to-cyan-600/20',
    description: 'Database design and normalization, ERDs, DDL and DML statements, foreign key constraints, complex SQL queries with JOINs, and aggregate functions.',
    whatIBuilt: 'A comprehensive coffee shop database management system -- full schema design with ERD, normalized tables, complex JOIN queries, and aggregate reporting.',
    keySkills: ['SQL', 'MySQL', 'PostgreSQL', 'ERD', 'Normalization', 'JOINs'],
    concepts: ['Database design and 3NF normalization', 'ERD entity-relationship modeling', 'DDL: CREATE, ALTER, DROP', 'DML: SELECT, INSERT, UPDATE, DELETE', 'Complex JOINs and subqueries', 'Aggregate functions and GROUP BY', 'Foreign key constraints'],
    highlight: 'Designing the coffee shop schema from scratch -- ERD first, normalization second, queries third -- gave me a mental model I now apply to every project. SQLite in MLB Edge Pro, PostgreSQL in Brasena.',
    githubPath: 'https://github.com/visuxlize/Software-development-assignments/tree/main/SQL',
  },
  {
    number: 'CEIS400',
    title: 'Software Engineering -- GB Maintenance Management System',
    period: 'Completed June 2026',
    status: 'completed',
    gradient: 'from-rose-500/20 to-amber-500/20',
    description: 'Full software development lifecycle -- requirements gathering, architecture design, OO analysis and design, iterative construction. Team-based capstone with IEEE documentation.',
    whatIBuilt: 'GB Maintenance Management System (MMMS) -- a full-stack web app for GB Manufacturing. Barcode scanning for equipment checkout/return, cross-warehouse materials search, supervisor dashboard.',
    keySkills: ['React 18', 'Django REST', 'PostgreSQL', 'JWT', 'IEEE-830 SRS', 'IEEE-1016 SDD'],
    concepts: ['Requirements gathering and IEEE-830 SRS', 'IEEE-1016 Software Design Documents', 'Object-oriented analysis and design', 'REST API design with Django REST Framework', 'JWT authentication flow', 'Iterative construction and sprint planning', 'Collaborative Git workflow across a team'],
    highlight: 'This is the course where coursework became real software engineering. Writing IEEE-830 SRS documents, designing architecture before touching code, and building across a 5-person team all parallel professional work.',
    githubPath: 'https://github.com/visuxlize/Software-development-assignments/tree/main/CEIS400%20-%20Maintenance%20System',
    weeks: ceis400Weeks,
  },
];

const WeekJourney: React.FC<{ weeks: WeekMilestone[] }> = ({ weeks }) => {
  const [openWeek, setOpenWeek] = useState<number | null>(1);

  return (
    <div className="mt-4 card-base p-6 sm:p-8">
      <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-500 mb-1">7-Week Project Journey</p>
      <h3 className="font-display text-lg font-bold text-slate-900 dark:text-white mb-6">
        From requirements to a shipped capstone, week by week
      </h3>

      <div className="relative">
        <div className="absolute left-[15px] top-2 bottom-2 w-px bg-[var(--border)]" aria-hidden />
        <ol className="space-y-2">
          {weeks.map((w) => {
            const isOpen = openWeek === w.week;
            const Icon = w.icon;
            return (
              <li key={w.week} className="relative pl-10">
                <span
                  className={
                    'absolute left-0 top-1 flex h-8 w-8 items-center justify-center rounded-full border-2 transition-colors ' +
                    (isOpen
                      ? 'border-primary bg-primary text-white'
                      : 'border-[var(--border)] bg-[var(--card)] text-slate-500')
                  }
                  aria-hidden
                >
                  <Icon size={14} strokeWidth={2.5} />
                </span>

                <button
                  type="button"
                  onClick={() => setOpenWeek(isOpen ? null : w.week)}
                  aria-expanded={isOpen}
                  className="flex w-full flex-wrap items-center gap-x-3 gap-y-1 rounded-lg py-1.5 text-left transition-colors hover:text-primary"
                >
                  <span className="text-xs font-semibold uppercase tracking-widest text-slate-500">Week {w.week}</span>
                  <span className="text-xs font-medium text-primary">{w.phase}</span>
                  <span className="text-sm font-semibold text-slate-900 dark:text-white">{w.title}</span>
                  <span className="ml-auto flex items-center gap-2 text-[11px] text-slate-500">
                    {w.dueDate}
                    <ChevronDown
                      size={14}
                      strokeWidth={2.5}
                      className={'transition-transform ' + (isOpen ? 'rotate-180' : '')}
                    />
                  </span>
                </button>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                      className="overflow-hidden"
                    >
                      <div className="pb-4 pt-1">
                        <p className="text-sm leading-relaxed text-slate-600 dark:text-slate-400 mb-3">{w.summary}</p>
                        <ul className="space-y-1.5">
                          {w.deliverables.map((d) => (
                            <li key={d} className="flex items-start gap-2.5 text-[13px] text-slate-600 dark:text-slate-400">
                              <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-primary" aria-hidden />
                              {d}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </li>
            );
          })}
        </ol>
      </div>
    </div>
  );
};

const Coursework: React.FC = () => {
  const navigate = useNavigate();
  useEffect(() => { window.scrollTo({ top: 0 }); }, []);

  return (
    <div className="min-h-screen pt-24 pb-24">
      <div className="mx-auto max-w-4xl px-6">

        <motion.button
          initial={{ opacity: 0, x: -8 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.4 }}
          onClick={() => navigate('/')}
          className="mb-10 flex items-center gap-2 text-sm text-slate-500 transition-colors hover:text-primary dark:text-slate-400"
        >
          <ArrowLeft size={15} strokeWidth={2} aria-hidden />
          Back to portfolio
        </motion.button>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
          <p className="text-xs font-semibold uppercase tracking-widest text-primary mb-2">Education</p>
          <h1 className="font-display text-4xl font-extrabold tracking-tight text-slate-900 dark:text-white md:text-5xl">
            Software Engineering Coursework
          </h1>
          <p className="mt-4 text-lg leading-relaxed text-slate-600 dark:text-slate-400 max-w-2xl">
            B.S. Software Development at DeVry University. Four courses that built the foundation I apply
            in every project -- from OOP in Python to a full-stack team capstone with IEEE documentation.
          </p>
          <div className="mt-8 card-base p-5">
            <div className="flex flex-wrap items-center gap-6 text-sm">
              <div className="flex items-center gap-2">
                <CheckCircle size={16} className="text-teal-500" strokeWidth={2} />
                <span className="text-slate-700 dark:text-slate-300 font-medium">4 courses completed</span>
              </div>
              <div className="flex items-center gap-2">
                <Trophy size={16} className="text-amber-400" strokeWidth={2} />
                <span className="text-slate-700 dark:text-slate-300 font-medium">7-week capstone, shipped</span>
              </div>
              <div className="ml-auto text-xs text-slate-500">B.S. Software Development · DeVry University · 2024 – Present</div>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
          transition={{ duration: 0.45 }}
          className="my-10 card-base border-l-2 border-l-primary p-6"
        >
          <p className="text-sm leading-relaxed text-slate-600 dark:text-slate-400">
            Each course built on the last. Python introduced OOP -- C# deepened types and static analysis --
            SQL taught data modeling -- CEIS400 brought it together in a real team project with architecture
            documents, sprint planning, and a production-grade full-stack application.
          </p>
        </motion.div>

        <div className="space-y-16">
          {courses.map((course, i) => (
            <motion.article
              key={course.number}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            >
              <div className="card-base overflow-hidden">
                <div className={"h-1.5 w-full bg-gradient-to-r " + course.gradient} aria-hidden />
                <div className="p-6 sm:p-8">
                  <div className="flex flex-wrap items-start justify-between gap-3 mb-1">
                    <span className="text-xs font-semibold uppercase tracking-widest text-slate-500">{course.number} · Course {i + 1} of {courses.length}</span>
                    {course.status === 'completed' ? (
                      <span className="flex items-center gap-1.5 rounded-full border border-teal-500/40 bg-teal-950/40 px-2.5 py-1 text-[10px] font-semibold text-teal-400">
                        <CheckCircle size={10} strokeWidth={2.5} /> Completed
                      </span>
                    ) : (
                      <span className="flex items-center gap-1.5 rounded-full border border-amber-500/40 bg-amber-950/40 px-2.5 py-1 text-[10px] font-semibold text-amber-400">
                        <Clock size={10} strokeWidth={2.5} /> In Progress
                      </span>
                    )}
                  </div>
                  <h2 className="font-display text-xl font-bold text-slate-900 dark:text-white mt-1 mb-1">{course.title}</h2>
                  <p className="text-xs text-slate-500 mb-4">{course.period}</p>
                  <p className="text-sm leading-relaxed text-slate-600 dark:text-slate-400 mb-5">{course.description}</p>
                  <div className="flex flex-wrap gap-2">
                    {course.keySkills.map(s => <span key={s} className="chip">{s}</span>)}
                  </div>
                </div>
              </div>

              <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div className="card-base p-5">
                  <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-500 mb-3">What I Built</p>
                  <p className="text-sm leading-relaxed text-slate-600 dark:text-slate-400 mb-4">{course.whatIBuilt}</p>
                  <a href={course.githubPath} target="_blank" rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-sm font-medium text-primary hover:text-primary/80 transition-colors">
                    View on GitHub
                  </a>
                </div>
                <div className="card-base p-5">
                  <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-500 mb-3">Concepts Covered</p>
                  <ul className="space-y-2">
                    {course.concepts.map(c => (
                      <li key={c} className="flex items-start gap-2.5 text-sm text-slate-600 dark:text-slate-400">
                        <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-primary" aria-hidden />
                        {c}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="mt-4 card-base border-l-2 border-l-primary p-5">
                <p className="text-sm leading-relaxed text-slate-600 dark:text-slate-400 italic">"{course.highlight}"</p>
              </div>

              {course.weeks && <WeekJourney weeks={course.weeks} />}
            </motion.article>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
          transition={{ duration: 0.45 }}
          className="mt-20 card-base p-8 text-center"
        >
          <p className="text-xs font-semibold uppercase tracking-widest text-primary mb-2">What's Next</p>
          <h3 className="font-display text-2xl font-bold text-slate-900 dark:text-white mb-3">Applying it in the real world</h3>
          <p className="text-sm leading-relaxed text-slate-600 dark:text-slate-400 max-w-xl mx-auto">
            Every concept from these courses has a direct line to real projects.
            Python OOP maps to FastAPI. SQL normalization maps to MLB Edge database design.
            C# type discipline maps to TypeScript. IEEE documentation maps to product specs for Brasena and client work.
          </p>
          <div className="mt-6 flex flex-wrap justify-center gap-3">
            <button onClick={() => navigate('/')}
              className="rounded-lg border border-[var(--border)] bg-[var(--card)] px-5 py-2.5 text-sm font-medium text-slate-700 transition-colors hover:border-primary/50 hover:text-primary dark:text-slate-300">
              View all projects
            </button>
            <button onClick={() => navigate('/mlb-edge-pro')}
              className="rounded-lg bg-primary px-5 py-2.5 text-sm font-medium text-white transition-opacity hover:opacity-90">
              MLB Edge Pro case study
            </button>
          </div>
        </motion.div>

      </div>
    </div>
  );
};

export default Coursework;
