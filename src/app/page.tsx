"use client";

import Link from "next/link";
import { 
  Sparkles, 
  ArrowRight, 
  User, 
  Layers, 
  Cpu, 
  Terminal, 
  Mail 
} from "lucide-react";

export default function Home() {
  const portalCards = [
    {
      title: "About Me",
      subtitle: "Biographical Profile",
      desc: "Learn about my background as a Software Engineer and IoT Coordinator, and view my professional timeline.",
      link: "/about",
      icon: User,
      badge: "Bio & History"
    },
    {
      title: "Projects",
      subtitle: "Coding Portfolio",
      desc: "Explore my machine learning prediction platforms, computer vision models, and frontend dashboards.",
      link: "/projects",
      icon: Layers,
      badge: "AI/ML & Web"
    },
    {
      title: "Tech Stack",
      subtitle: "Competencies Matrix",
      desc: "Inspect the full list of programming languages, automation packages, and database tools I use.",
      link: "/skills",
      icon: Cpu,
      badge: "Skills & Tools"
    },
    {
      title: "Console",
      subtitle: "Interactive Sandbox",
      desc: "Execute shell commands inside a custom-built developer console terminal simulator.",
      link: "/console",
      icon: Terminal,
      badge: "Shell Sandbox"
    },
    {
      title: "Contact",
      subtitle: "Get in Touch",
      desc: "Send direct messages, copy my email to clipboard, or download my latest PDF resume.",
      link: "/contact",
      icon: Mail,
      badge: "Direct Contact"
    }
  ];

  return (
    <div className="flex flex-col grow">
      {/* Hero Section */}
      <section className="relative pt-16 pb-12 md:py-32 w-full overflow-hidden border-b border-white/5">

        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 flex flex-col items-center text-center gap-6 md:gap-8 animate-slide-up">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono uppercase tracking-wider bg-[#0b0b0b] border border-white/10 text-[#2E54FE]">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Open for new projects</span>
          </div>

          <h1 className="text-4xl sm:text-5xl md:text-7xl font-extrabold tracking-tighter leading-none max-w-4xl text-white">
            Designing and building <span className="text-[#2E54FE] font-black">immersive</span> digital interfaces.
          </h1>

          <p className="text-base sm:text-lg md:text-xl text-[#cbd5e1]/95 max-w-2xl leading-relaxed">
            I am a software engineer specializing in AI/ML solutions, automated systems, and clean web applications. Focused on predictive modeling, computer vision, and structured data systems.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 mt-2 justify-center w-full max-w-xs sm:max-w-none">
            <Link 
              href="/projects" 
              className="flex h-12 items-center justify-center rounded-lg bg-[#2E54FE] hover:bg-[#1d3dbd] px-6 font-semibold text-white transition-all active:scale-98 glow-blue hover-lift"
            >
              Explore Projects
            </Link>
            <Link 
              href="/contact" 
              className="flex h-12 items-center justify-center rounded-lg border border-[#2E54FE] hover:bg-[#2E54FE]/10 px-6 font-semibold text-[#2E54FE] transition-all active:scale-98"
            >
              Contact Me
            </Link>
          </div>

          {/* Statistics Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 w-full max-w-4xl border border-white/5 p-5 md:p-8 rounded-2xl bg-[#0b0b0b]/60 backdrop-blur-xs mt-8 md:mt-12 text-[#cbd5e1] hover-lift">
            <div className="flex flex-col gap-1 md:border-r md:border-white/5 md:pr-4">
              <span className="text-2xl md:text-3xl font-extrabold text-white">4+</span>
              <span className="text-xs font-mono uppercase tracking-wider text-[#cbd5e1]/60 font-semibold">Years Exp.</span>
            </div>
            <div className="flex flex-col gap-1 md:border-r md:border-white/5 md:pr-4">
              <span className="text-2xl md:text-3xl font-extrabold text-[#2E54FE]">40+</span>
              <span className="text-xs font-mono uppercase tracking-wider text-[#cbd5e1]/60 font-semibold">Projects Built</span>
            </div>
            <div className="flex flex-col gap-1 md:border-r md:border-white/5 md:pr-4">
              <span className="text-2xl md:text-3xl font-extrabold text-white">12k+</span>
              <span className="text-xs font-mono uppercase tracking-wider text-[#cbd5e1]/60 font-semibold">GitHub Commits</span>
            </div>
            <div className="flex flex-col gap-1">
              <span className="text-2xl md:text-3xl font-extrabold text-[#2E54FE]">100%</span>
              <span className="text-xs font-mono uppercase tracking-wider text-[#cbd5e1]/60 font-semibold">Client Love</span>
            </div>
          </div>
        </div>
      </section>

      {/* Gateway Portal Section */}
      <section className="py-14 md:py-20 w-full relative z-10">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 flex flex-col gap-10 md:gap-12 animate-slide-up">
          <div className="flex flex-col gap-2 max-w-2xl">
            <span className="text-xs font-mono font-bold uppercase tracking-widest text-[#2E54FE]">[ PORTAL NAVIGATOR ]</span>
            <h2 className="text-3xl md:text-4xl font-extrabold text-white tracking-tight">Explore the Workspace</h2>
            <p className="text-sm text-[#cbd5e1]/80 leading-relaxed">
              Navigate through the different segments of my portfolio to inspect coding highlights, run commands in the terminal shell, or send direct inquiries.
            </p>
          </div>

          {/* Portal Cards Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-8">
            {portalCards.map((portal, idx) => {
              const Icon = portal.icon;
              return (
                <Link
                  key={idx}
                  href={portal.link}
                  className="group p-6 md:p-8 rounded-2xl border border-white/5 bg-[#0b0b0b] hover:border-[#2E54FE]/40 hover:bg-[#0b0b0b]/80 hover:shadow-[0_0_30px_rgba(46,84,254,0.05)] transition-all duration-300 hover-lift flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between mb-6">
                      <div className="w-10 h-10 rounded-xl bg-[#2E54FE]/10 flex items-center justify-center text-[#2E54FE] group-hover:scale-105 transition-transform duration-200">
                        <Icon className="w-5 h-5" />
                      </div>
                      <span className="text-[10px] font-mono bg-[#2E54FE]/5 text-[#2E54FE] border border-[#2E54FE]/15 px-2.5 py-1 rounded-md uppercase font-bold tracking-wider">
                        {portal.badge}
                      </span>
                    </div>

                    <span className="text-[11px] font-mono text-[#cbd5e1]/50 uppercase tracking-widest font-bold block mb-1">
                      {portal.subtitle}
                    </span>
                    <h3 className="text-xl font-bold text-white group-hover:text-[#2E54FE] transition-colors mb-3">
                      {portal.title}
                    </h3>
                    <p className="text-xs text-[#cbd5e1]/70 leading-relaxed mb-6">
                      {portal.desc}
                    </p>
                  </div>

                  <div className="flex items-center gap-1.5 text-xs font-bold text-[#2E54FE] group-hover:gap-2.5 transition-all mt-auto">
                    <span>Enter Page</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
}
