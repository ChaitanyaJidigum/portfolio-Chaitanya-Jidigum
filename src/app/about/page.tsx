import { Sparkles } from "lucide-react";

export default function AboutPage() {
  return (
    <section className="relative min-h-screen py-16 md:py-20 w-full overflow-hidden border-b border-white/5 flex flex-col items-center">

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 flex flex-col gap-10 md:gap-16 animate-slide-up w-full">
        {/* Page Title */}
        <div className="flex flex-col gap-2 text-center md:text-left">
          <span className="text-xs font-mono font-bold uppercase tracking-widest text-[#2E54FE]">[ WHO I AM ]</span>
          <h1 className="text-4xl md:text-6xl font-extrabold text-white tracking-tight leading-none">About Me</h1>
        </div>

        {/* Content Columns */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
          {/* Bio Column */}
          <div className="lg:col-span-6 flex flex-col gap-8">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono uppercase tracking-wider bg-[#0b0b0b] border border-white/10 text-[#2E54FE] w-fit">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Coordinator & Developer</span>
            </div>

            <p className="text-base sm:text-lg text-[#cbd5e1]/95 leading-relaxed">
              I am a Software Engineer specializing in machine learning solutions, computer vision networks, and lightweight automation utilities. Currently coordinating B.Tech CSE (Internet of Things) activities, I design and oversee campus event dashboards while developing automated web scraping suites for academic and contract-based workflows.
            </p>

            <p className="text-sm text-[#cbd5e1]/80 leading-relaxed">
              My core focus lies in building clean interfaces backed by robust data pipelines. Whether training predictive regression models in Python or architecting complex SQL databases with MySQL Workbench, I strive to make web assets feel premium, visually cohesive, and intuitive to use.
            </p>

            {/* Stats Grid */}
            <div className="grid grid-cols-2 gap-4 md:gap-6 border border-white/5 p-5 md:p-6 rounded-2xl bg-[#0b0b0b]/60 backdrop-blur-xs text-[#cbd5e1] hover-lift">
              <div className="flex flex-col gap-1">
                <span className="text-2xl sm:text-3xl font-extrabold text-white">4+</span>
                <span className="text-xs font-mono uppercase tracking-wider text-[#cbd5e1]/60 font-semibold">Years Exp.</span>
              </div>
              <div className="flex flex-col gap-1">
                <span className="text-2xl sm:text-3xl font-extrabold text-[#2E54FE]">40+</span>
                <span className="text-xs font-mono uppercase tracking-wider text-[#cbd5e1]/60 font-semibold">Projects Built</span>
              </div>
            </div>
          </div>

          {/* Timeline Column */}
          <div className="lg:col-span-6 flex flex-col gap-8">
            <h3 className="text-xl font-bold text-white tracking-tight">Professional Timeline</h3>
            
            <div className="relative pl-6 border-l border-white/5 flex flex-col gap-8">
              <div className="relative animate-slide-up">
                <div className="absolute -left-[9px] top-1.5 w-4 h-4 rounded-full bg-[#2E54FE] border-4 border-black shadow-[0_0_10px_rgba(46,84,254,0.3)]" />
                <div>
                  <span className="text-xs font-bold font-mono text-[#2E54FE] bg-[#2E54FE]/5 px-2 py-0.5 rounded border border-[#2E54FE]/10">[ 2024 &mdash; Present ]</span>
                  <h4 className="text-base font-bold text-white mt-2">Software Developer & IoT Club Coordinator</h4>
                  <span className="text-xs text-[#cbd5e1]/60">Sri Indu Institute & Freelance</span>
                  <p className="text-xs text-[#cbd5e1]/80 leading-relaxed mt-2">
                    Coordinating CSE (Internet of Things) department portals and club databases. Developing freelance automation scripts and custom Next.js portfolios.
                  </p>
                </div>
              </div>

              <div className="relative animate-slide-up animation-delay-100">
                <div className="absolute -left-[9px] top-1.5 w-4 h-4 rounded-full bg-[#2E54FE] border-4 border-black shadow-[0_0_10px_rgba(46,84,254,0.4)]" />
                <div>
                  <span className="text-xs font-bold font-mono text-[#2E54FE] bg-[#2E54FE]/5 px-2 py-0.5 rounded border border-[#2E54FE]/10">[ 2022 &mdash; 2024 ]</span>
                  <h4 className="text-base font-bold text-white mt-2">AI/ML Developer Intern</h4>
                  <span className="text-xs text-[#cbd5e1]/60">Decibel Systems & Contract</span>
                  <p className="text-xs text-[#cbd5e1]/80 leading-relaxed mt-2">
                    Trained supervised machine learning models to forecast price changes and worked on computer vision surveillance tracking setups.
                  </p>
                </div>
              </div>

              <div className="relative animate-slide-up animation-delay-200">
                <div className="absolute -left-[9px] top-1.5 w-4 h-4 rounded-full bg-white border-4 border-black shadow-[0_0_10px_rgba(255,255,255,0.2)]" />
                <div>
                  <span className="text-xs font-bold font-mono text-white bg-white/5 px-2 py-0.5 rounded border border-white/10">[ 2020 &mdash; 2022 ]</span>
                  <h4 className="text-base font-bold text-white mt-2">Web Automation & Software Developer</h4>
                  <span className="text-xs text-[#cbd5e1]/60">Independent / Academic Projects</span>
                  <p className="text-xs text-[#cbd5e1]/80 leading-relaxed mt-2">
                    Wrote browser automation scrapers using Selenium, configured relational databases with MySQL, and built responsive frontend web layouts.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
