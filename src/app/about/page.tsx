import { Sparkles, MapPin, Calendar } from "lucide-react";

export default function AboutPage() {
  const timeline = [
    {
      period: "2024 — Present",
      role: "Software Developer & IoT Club Coordinator",
      org: "Sri Indu Institute & Freelance",
      desc: "Coordinating CSE (IoT) department portals and club databases. Building freelance automation pipelines and custom Next.js portfolio sites for clients.",
      active: true,
    },
    {
      period: "2022 — 2024",
      role: "AI/ML Developer Intern",
      org: "Decibel Systems & Contract Work",
      desc: "Trained supervised regression models for price forecasting. Designed computer vision surveillance tracking systems using transfer learning.",
      active: true,
    },
    {
      period: "2020 — 2022",
      role: "Web Automation & Software Developer",
      org: "Independent / Academic Projects",
      desc: "Built browser automation scrapers with Selenium, configured MySQL relational databases, and developed responsive frontend layouts.",
      active: false,
    },
  ];

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
          </div>

          {/* Timeline Column */}
          <div className="lg:col-span-6 flex flex-col gap-6">
            <div className="flex flex-col gap-1">
              <span className="text-[10px] font-mono font-bold uppercase tracking-[0.2em] text-[#2E54FE]">Career</span>
              <h2 className="text-xl font-bold text-white tracking-tight">Professional Timeline</h2>
            </div>

            <div className="flex flex-col gap-0">
              {timeline.map((item, i) => (
                <div key={i} className="relative flex gap-5 pb-8 last:pb-0">
                  {/* Vertical line */}
                  {i < timeline.length - 1 && (
                    <div className="absolute left-[9px] top-5 bottom-0 w-px bg-white/5" />
                  )}

                  {/* Dot */}
                  <div className="relative mt-1.5 shrink-0">
                    <div className={`w-4.5 h-4.5 rounded-full border-2 ${
                      item.active
                        ? "bg-[#2E54FE] border-[#2E54FE] shadow-[0_0_12px_rgba(46,84,254,0.5)]"
                        : "bg-[#0b0b0b] border-white/20"
                    }`} />
                  </div>

                  {/* Content */}
                  <div className="flex flex-col gap-2 pt-0.5">
                    <span className={`inline-block text-[10px] font-mono font-bold uppercase tracking-wider px-2 py-0.5 rounded border w-fit ${
                      item.active
                        ? "text-[#2E54FE] bg-[#2E54FE]/5 border-[#2E54FE]/15"
                        : "text-[#cbd5e1]/40 bg-white/3 border-white/8"
                    }`}>
                      {item.period}
                    </span>
                    <h3 className="text-sm font-bold text-white leading-snug">{item.role}</h3>
                    <span className="text-[11px] text-[#cbd5e1]/45 font-mono">{item.org}</span>
                    <p className="text-xs text-[#cbd5e1]/65 leading-relaxed">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
