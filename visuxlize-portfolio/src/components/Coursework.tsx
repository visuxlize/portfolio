import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, CheckCircle, Clock } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const fade = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] } },
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
};

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
    period: 'In Progress -- Spring 2026',
    status: 'in-progress',
    gradient: 'from-rose-500/20 to-amber-500/20',
    description: 'Full software development lifecycle -- requirements gathering, architecture design, OO analysis and design, iterative construction. Team-based capstone with IEEE documentation.',
    whatIBuilt: 'GB Maintenance Management System (MMMS) -- a full-stack web app for GB Manufacturing. Barcode scanning for equipment checkout/return, cross-warehouse materials search, supervisor dashboard.',
    keySkills: ['React 18', 'Django REST', 'PostgreSQL', 'JWT', 'IEEE-830 SRS', 'IEEE-1016 SDD'],
    concepts: ['Requirements gathering and IEEE-830 SRS', 'IEEE-1016 Software Design Documents', 'Object-oriented analysis and design', 'REST API design with Django REST Framework', 'JWT authentication flow', 'Iterative construction and sprint planning', 'Collaborative Git workflow across a team'],
    highlight: 'This is the course where coursework became real software engineering. Writing IEEE-830 SRS documents, designing architecture before touching code, and building across a 5-person team all parallel professional work.',
    githubPath: 'https://github.com/visuxlize/Software-development-assignments/tree/main/CEIS400%20-%20Maintenance%20System',
  },
];

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
                <span className="text-slate-700 dark:text-slate-300 font-medium">3 courses completed</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock size={16} className="text-amber-400" strokeWidth={2} />
                <span className="text-slate-700 dark:text-slate-300 font-medium">1 course in progress</span>
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
