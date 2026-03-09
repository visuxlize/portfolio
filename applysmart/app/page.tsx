import WaitlistForm from '@/components/waitlist/WaitlistForm'

export default function LandingPage() {
  return (
    <main className="min-h-screen bg-[#080f1e] text-white">

      {/* NAV */}
      <nav className="flex items-center justify-between px-6 py-5 max-w-5xl mx-auto">
        <span className="text-lg font-black tracking-tight">
          Apply<span className="text-blue-500">Smart</span>
        </span>
        <span className="text-xs text-slate-500 bg-white/5 border border-white/10 px-3 py-1.5 rounded-full">
          Coming soon
        </span>
      </nav>

      {/* HERO */}
      <section className="max-w-2xl mx-auto px-6 pt-20 pb-16 text-center">
        <div className="inline-flex items-center gap-2 rounded-full border border-blue-500/20
                        bg-blue-500/10 px-4 py-2 text-xs font-semibold text-blue-400 mb-8">
          <span className="h-1.5 w-1.5 rounded-full bg-blue-400 animate-pulse" />
          Building in public — early access open
        </div>

        <h1 className="text-5xl sm:text-6xl font-black tracking-tight leading-[1.02] mb-5">
          Stop applying<br />
          <span className="text-blue-500">manually.</span>
        </h1>

        <p className="text-slate-400 text-lg leading-relaxed mb-10 max-w-lg mx-auto">
          ApplySmart fetches jobs matched to your resume, generates tailored
          cover letters in seconds, and tracks every application — all in one place.
        </p>

        <WaitlistForm />

        <p className="mt-4 text-xs text-slate-700">
          No spam. No credit card. Unsubscribe anytime.
        </p>
      </section>

      {/* STATS */}
      <div className="border-y border-white/5 py-8">
        <div className="max-w-lg mx-auto flex justify-center gap-16 text-center">
          {[
            ['5 sec', 'to generate a cover letter'],
            ['100%', 'tailored to each job'],
            ['Free', 'early access tier'],
          ].map(([stat, label]) => (
            <div key={stat}>
              <p className="text-2xl font-black text-blue-500">{stat}</p>
              <p className="text-xs text-slate-600 mt-1 max-w-[80px] mx-auto leading-tight">{label}</p>
            </div>
          ))}
        </div>
      </div>

      {/* HOW IT WORKS */}
      <section className="max-w-xl mx-auto px-6 py-20">
        <h2 className="text-xl font-bold text-slate-400 text-center mb-12">
          How it works
        </h2>
        <div className="space-y-10">
          {[
            ['01', 'Upload your resume', 'We parse your skills and experience once. No re-entering anything.'],
            ['02', 'Browse matched jobs', 'A curated feed scored against your actual background. No noise.'],
            ['03', 'Generate and apply', 'One click writes the cover letter. Review it, copy it, submit.'],
          ].map(([num, title, desc]) => (
            <div key={num} className="flex gap-6 items-start">
              <span className="text-4xl font-black text-white/10 w-12 shrink-0 leading-none">{num}</span>
              <div>
                <h3 className="font-bold text-white mb-1">{title}</h3>
                <p className="text-slate-500 text-sm leading-relaxed">{desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-white/5 py-8 text-center">
        <p className="text-xs text-slate-700">
          Built by{' '}
          <a href="https://github.com/visuxlize" className="text-slate-500 hover:text-white transition-colors">
            @visuxlize
          </a>
          {' '}· ApplySmart 2025
        </p>
      </footer>
    </main>
  )
}
