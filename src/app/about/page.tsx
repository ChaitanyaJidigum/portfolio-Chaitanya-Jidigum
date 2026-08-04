import { Sparkles, MapPin, Calendar } from "lucide-react";
import Link from "next/link";

export default function AboutPage() {
  return (
    <section className="relative min-h-screen py-20 md:py-28 w-full">
      <div className="mx-auto max-w-5xl px-5 sm:px-8 flex flex-col gap-16 animate-slide-up w-full">

        {/* ── Page Header ─────────────────────────── */}
        <div className="flex flex-col gap-3 border-b border-border pb-10">
          <span className="text-[10px] font-mono font-bold uppercase tracking-[0.2em] text-[#2E54FE]">Who I Am</span>
          <h1 className="text-4xl md:text-6xl font-black text-foreground tracking-tighter leading-none">About Me</h1>
          <div className="flex flex-wrap items-center gap-4 mt-2 text-xs text-foreground/50 font-mono">
            <span className="flex items-center gap-1.5"><MapPin className="w-3 h-3" /> Hyderabad, India</span>
            <span className="flex items-center gap-1.5"><Calendar className="w-3 h-3" /> B.Tech CSE (8.69 CGPA)</span>
          </div>
        </div>

        {/* ── Content Grid ────────────────────────── */}
        <div className="grid grid-cols-1 lg:grid-cols-11 gap-12 lg:gap-16 items-start">

          {/* Bio Column */}
          <div className="lg:col-span-5 flex flex-col gap-8">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-[11px] font-mono uppercase tracking-wider border border-[#2E54FE]/20 text-[#2E54FE] bg-[#2E54FE]/5 w-fit">
              <Sparkles className="w-3 h-3" />
              <span>CSE Student & Coordinator</span>
            </div>

            <div className="flex flex-col gap-5">
              <p className="text-[15px] text-foreground/90 leading-[1.8]">
                I am a dedicated Computer Science and Engineering student at Sri Indu Institute of Engineering and Technology. Passionate about exploring new technologies emerging in the industry, I am a committed continuous learner, goal-oriented, and focused on building professional software solutions.
              </p>
              <p className="text-sm text-foreground/65 leading-[1.9]">
                My primary focus spans Machine Learning, computer vision networks, and high-performance web development. As the Computer Science (Internet of Things) Club Coordinator, I lead technical initiatives, organize campus events, and collaborate on building predictive pipelines and data-driven systems.
              </p>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 border border-border rounded-xl overflow-hidden mt-2">
              <div className="flex flex-col gap-1.5 p-5 border-r border-border">
                <span className="text-3xl font-black text-foreground">8.69</span>
                <span className="text-[10px] font-mono uppercase tracking-widest text-foreground/40">B.Tech CGPA</span>
              </div>
              <div className="flex flex-col gap-1.5 p-5">
                <span className="text-3xl font-black text-[#2E54FE]">500+</span>
                <span className="text-[10px] font-mono uppercase tracking-widest text-foreground/40">Event Attendees</span>
              </div>
            </div>

            {/* Languages Known */}
            <div className="flex flex-col gap-5 p-6 rounded-xl border border-border bg-white dark:bg-transparent mt-5">
              <div className="flex flex-col gap-1.5">
                <span className="text-[10px] font-mono font-bold uppercase tracking-[0.2em] text-[#2E54FE]">Languages</span>
                <h3 className="text-sm font-bold text-foreground tracking-tight">Languages Known</h3>
              </div>
              <div className="flex flex-wrap gap-2">
                {[
                  { name: "English", level: "Fluent" },
                  { name: "Telugu", level: "Native" },
                  { name: "Hindi", level: "Conversational" },
                  { name: "German", level: "Elementary (A1)" }
                ].map((lang, lIdx) => (
                  <span 
                    key={lIdx} 
                    className="px-2.5 py-1 rounded bg-[#2E54FE]/5 border border-[#2E54FE]/15 text-xs text-foreground flex items-center gap-1.5"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-[#2E54FE]" />
                    <span>{lang.name}</span>
                    <span className="text-[10px] text-foreground/40">({lang.level})</span>
                  </span>
                ))}
              </div>

              {/* Duolingo Learning Streak Widget */}
              <div className="flex items-center gap-4 pt-4 border-t border-border mt-1 bg-gradient-to-r from-emerald-500/[0.02] to-transparent p-3 rounded-lg border border-emerald-500/10">
                <div className="w-10 h-10 rounded-lg bg-emerald-500/10 border border-emerald-500/25 flex items-center justify-center shrink-0 animate-[pulse_2s_infinite]" title="Duolingo">
                  <img src="/duolingo.png" alt="Duolingo" className="w-6 h-6 object-contain" />
                </div>
                <div className="flex flex-col gap-0.5 grow">
                  <span className="text-xs font-bold text-foreground flex items-center gap-1.5">
                    German · Elementary Proficiency
                    <span className="inline-flex items-center gap-0.5 px-1.5 py-0.5 rounded-full text-[9px] font-mono bg-amber-500/10 border border-amber-500/20 text-amber-400">
                      🔥 250+ Day Streak
                    </span>
                  </span>
                  <span className="text-[10px] text-foreground/50 font-mono">
                    Duolingo Score: 22 · Daily Active Practice
                  </span>
                </div>
              </div>

              {/* Hobbies Widget */}
              <div className="flex items-center gap-4 pt-4 border-t border-border mt-1 bg-gradient-to-r from-[#2E54FE]/[0.02] to-transparent p-3 rounded-lg border border-border">
                <div className="w-10 h-10 rounded-lg bg-[#2E54FE]/10 border border-[#2E54FE]/25 flex items-center justify-center text-indigo-400 shrink-0 text-lg" title="Hobbies">
                  🎮
                </div>
                <div className="flex flex-col gap-0.5 grow">
                  <span className="text-xs font-bold text-foreground">
                    Hobbies & Interests
                  </span>
                  <span className="text-[10px] text-foreground/55 font-mono">
                    Reading · Music · Games · Gym
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Timeline Link Column */}
          <div className="lg:col-span-6 flex flex-col gap-6">
            <div className="flex flex-col gap-5 p-8 rounded-xl border border-border bg-gradient-to-br from-white dark:from-transparent to-[#2E54FE]/[0.01] hover:border-[#2E54FE]/30 transition-all duration-300">
              <div className="flex flex-col gap-1.5">
                <span className="text-[10px] font-mono font-bold uppercase tracking-[0.2em] text-[#2E54FE]">Academic timeline</span>
                <h3 className="text-xl font-black text-foreground tracking-tight">Education & Achievements</h3>
              </div>
              <p className="text-sm text-foreground/65 leading-relaxed">
                I coordinate CSE (IoT) activities and campus events while maintaining academic performance in computer science engineering.
              </p>
              <p className="text-xs text-foreground/50 leading-relaxed">
                Check out the dedicated Experience page for a detailed chronological map of my academic background, intermediate milestones, school achievements, and leadership roles.
              </p>
              <Link
                href="/experience"
                className="mt-2 inline-flex h-11 items-center justify-center rounded-lg bg-[#2E54FE] hover:bg-[#1d3dbd] text-white font-semibold text-sm transition-all active:scale-[0.98] w-full text-center"
              >
                Explore Full Experience &rarr;
              </Link>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
