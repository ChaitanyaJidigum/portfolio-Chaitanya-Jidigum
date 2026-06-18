import { Sparkles, MapPin, Calendar } from "lucide-react";

export default function AboutPage() {
  return (
    <section className="relative min-h-screen py-20 md:py-28 w-full">
      <div className="mx-auto max-w-5xl px-5 sm:px-8 flex flex-col gap-16 animate-slide-up w-full">

        {/* ── Page Header ─────────────────────────── */}
        <div className="flex flex-col gap-3 border-b border-white/5 pb-10">
          <span className="text-[10px] font-mono font-bold uppercase tracking-[0.2em] text-[#2E54FE]">Who I Am</span>
          <h1 className="text-4xl md:text-6xl font-black text-white tracking-tighter leading-none">About Me</h1>
          <div className="flex flex-wrap items-center gap-4 mt-2 text-xs text-[#cbd5e1]/50 font-mono">
            <span className="flex items-center gap-1.5"><MapPin className="w-3 h-3" /> Hyderabad, India</span>
            <span className="flex items-center gap-1.5"><Calendar className="w-3 h-3" /> B.Tech CSE (IoT)</span>
          </div>
        </div>

        {/* ── Content Grid ────────────────────────── */}
        <div className="grid grid-cols-1 lg:grid-cols-11 gap-12 lg:gap-16 items-start">

          {/* Bio Column */}
          <div className="lg:col-span-5 flex flex-col gap-8">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-[11px] font-mono uppercase tracking-wider border border-[#2E54FE]/20 text-[#2E54FE] bg-[#2E54FE]/5 w-fit">
              <Sparkles className="w-3 h-3" />
              <span>Coordinator & Developer</span>
            </div>

            <div className="flex flex-col gap-5">
              <p className="text-[15px] text-[#cbd5e1]/90 leading-[1.8]">
                I am a Software Engineer specializing in machine learning solutions, computer vision networks, and lightweight automation utilities. Currently coordinating B.Tech CSE (Internet of Things) activities, I design and oversee campus event dashboards while developing automated web scraping suites for academic and contract-based workflows.
              </p>
              <p className="text-sm text-[#cbd5e1]/65 leading-[1.9]">
                My core focus lies in building clean interfaces backed by robust data pipelines. Whether training predictive regression models in Python or architecting complex SQL databases with MySQL Workbench, I strive to make web assets feel premium, visually cohesive, and intuitive to use.
              </p>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 border border-white/5 rounded-xl overflow-hidden mt-2">
              <div className="flex flex-col gap-1.5 p-5 border-r border-white/5">
                <span className="text-3xl font-black text-white">4+</span>
                <span className="text-[10px] font-mono uppercase tracking-widest text-[#cbd5e1]/40">Years Experience</span>
              </div>
              <div className="flex flex-col gap-1.5 p-5">
                <span className="text-3xl font-black text-[#2E54FE]">40+</span>
                <span className="text-[10px] font-mono uppercase tracking-widest text-[#cbd5e1]/40">Projects Built</span>
              </div>
            </div>

            {/* Languages Known & Duolingo */}
            <div className="flex flex-col gap-5 p-6 rounded-xl border border-white/5 bg-white/[0.01] mt-5">
              <div className="flex flex-col gap-1.5">
                <span className="text-[10px] font-mono font-bold uppercase tracking-[0.2em] text-[#2E54FE]">Languages</span>
                <h3 className="text-sm font-bold text-white tracking-tight">Languages Known</h3>
              </div>
              <div className="flex flex-wrap gap-2">
                {[
                  { name: "English", level: "Fluent" },
                  { name: "Hindi", level: "Conversational" },
                  { name: "Telugu", level: "Native" },
                  { name: "German", level: "Elementary (A1)" }
                ].map((lang, lIdx) => (
                  <span 
                    key={lIdx} 
                    className="px-2.5 py-1 rounded bg-[#2E54FE]/5 border border-[#2E54FE]/15 text-xs text-[#cbd5e1] flex items-center gap-1.5"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-[#2E54FE]" />
                    <span>{lang.name}</span>
                    <span className="text-[10px] text-[#cbd5e1]/40">({lang.level})</span>
                  </span>
                ))}
              </div>

              {/* Duolingo Learning Streak Widget */}
              <div className="flex items-center gap-4 pt-4 border-t border-white/5 mt-1 bg-gradient-to-r from-emerald-500/[0.02] to-transparent p-3 rounded-lg border border-emerald-500/10">
                <div className="w-10 h-10 rounded-lg bg-emerald-500/10 border border-emerald-500/25 flex items-center justify-center text-emerald-400 shrink-0 font-black text-xl animate-[pulse_2s_infinite]" title="Duolingo">
                  🦉
                </div>
                <div className="flex flex-col gap-0.5 grow">
                  <span className="text-xs font-bold text-white flex items-center gap-1.5">
                    German learning on Duolingo
                    <span className="inline-flex items-center gap-0.5 px-1.5 py-0.5 rounded-full text-[9px] font-mono bg-amber-500/10 border border-amber-500/20 text-amber-400">
                      🔥 150+ Day Streak
                    </span>
                  </span>
                  <span className="text-[10px] text-[#cbd5e1]/50 font-mono">
                    XP: 4,820 · Level: A1 · Daily Active Practice
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Timeline Link Column */}
          <div className="lg:col-span-6 flex flex-col gap-6">
            <div className="flex flex-col gap-5 p-8 rounded-xl border border-white/5 bg-gradient-to-br from-white/[0.01] to-[#2E54FE]/[0.02] hover:border-[#2E54FE]/30 transition-all duration-300">
              <div className="flex flex-col gap-1.5">
                <span className="text-[10px] font-mono font-bold uppercase tracking-[0.2em] text-[#2E54FE]">Professional Experience</span>
                <h3 className="text-xl font-black text-white tracking-tight">Career & Timeline</h3>
              </div>
              <p className="text-sm text-[#cbd5e1]/65 leading-relaxed">
                I coordinate CSE (IoT) activities and portals, design prediction pipelines for pricing algorithms, and build responsive frontend web applications.
              </p>
              <p className="text-xs text-[#cbd5e1]/50 leading-relaxed">
                Check out the dedicated Experience page for a detailed chronological map of my software development roles, internship milestones, and key academic and commercial achievements.
              </p>
              <a
                href="/experience"
                className="mt-2 inline-flex h-11 items-center justify-center rounded-lg bg-[#2E54FE] hover:bg-[#1d3dbd] text-white font-semibold text-sm transition-all active:scale-[0.98] w-full"
              >
                Explore Full Experience &rarr;
              </a>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
