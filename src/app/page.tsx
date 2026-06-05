"use client";

import Link from "next/link";
import { 
  ArrowRight, 
  User, 
  Layers, 
  Cpu, 
  Terminal, 
  Mail
} from "lucide-react";

function GithubIcon({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
      <path d="M9 18c-4.51 2-5-2-7-2" />
    </svg>
  );
}

function LinkedinIcon({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
      <rect x="2" y="9" width="4" height="12" />
      <circle cx="4" cy="4" r="2" />
    </svg>
  );
}

export default function Home() {
  const portalCards = [
    {
      title: "About Me",
      subtitle: "Background & Timeline",
      desc: "My journey as a Software Engineer and IoT Coordinator — academic background, professional roles, and core values.",
      link: "/about",
      icon: User,
      badge: "Bio"
    },
    {
      title: "Projects",
      subtitle: "Engineering Portfolio",
      desc: "Machine learning platforms, computer vision systems, and frontend dashboards built for real-world problems.",
      link: "/projects",
      icon: Layers,
      badge: "Work"
    },
    {
      title: "Tech Stack",
      subtitle: "Skills & Tools",
      desc: "Languages, frameworks, libraries, and databases I use daily — from Python to MySQL to OpenCV.",
      link: "/skills",
      icon: Cpu,
      badge: "Skills"
    },
    {
      title: "Console",
      subtitle: "Interactive Terminal",
      desc: "Query my resume in real-time using a custom-built developer terminal right in the browser.",
      link: "/console",
      icon: Terminal,
      badge: "Live"
    },
    {
      title: "Contact",
      subtitle: "Get in Touch",
      desc: "Open to freelance contracts, collaborations, and project discussions. Let's build something.",
      link: "/contact",
      icon: Mail,
      badge: "Hire"
    }
  ];

  const stats = [
    { value: "4+", label: "Years Experience", color: "text-white" },
    { value: "40+", label: "Projects Built", color: "text-[#2E54FE]" },
    { value: "12k+", label: "GitHub Commits", color: "text-white" },
    { value: "100%", label: "Client Satisfaction", color: "text-[#2E54FE]" },
  ];

  return (
    <div className="flex flex-col grow">

      {/* ── Hero ──────────────────────────────────────────── */}
      <section className="relative pt-24 pb-20 md:pt-36 md:pb-28 w-full border-b border-white/5">
        <div className="mx-auto max-w-5xl px-5 sm:px-8 flex flex-col items-center text-center gap-7 animate-slide-up">

          {/* Status badge */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-[11px] font-mono uppercase tracking-wider border border-[#2E54FE]/25 text-[#2E54FE] bg-[#2E54FE]/5">
            <span className="w-1.5 h-1.5 rounded-full bg-[#2E54FE] animate-pulse" />
            Available for new projects
          </div>

          {/* Headline */}
          <h1 className="text-[2.6rem] sm:text-5xl md:text-[5.5rem] font-black tracking-tighter leading-[0.95] max-w-4xl text-white">
            Engineering intelligent,{" "}
            <span className="text-[#2E54FE]">scalable</span>{" "}
            software systems.
          </h1>

          {/* Sub-headline */}
          <p className="text-base sm:text-lg text-[#cbd5e1]/70 max-w-xl leading-relaxed">
            Software engineer focused on AI/ML solutions, predictive modeling, computer vision, and automated data systems. Based in Hyderabad, India.
          </p>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row gap-3 mt-1">
            <Link
              href="/projects"
              className="inline-flex h-11 items-center justify-center gap-2 rounded-lg bg-[#2E54FE] hover:bg-[#1d3dbd] px-7 text-sm font-semibold text-white transition-all duration-200 active:scale-95 glow-blue"
            >
              View Projects
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              href="/contact"
              className="inline-flex h-11 items-center justify-center rounded-lg border border-white/10 hover:border-[#2E54FE]/50 hover:text-[#2E54FE] px-7 text-sm font-semibold text-[#cbd5e1]/80 transition-all duration-200"
            >
              Get in Touch
            </Link>
          </div>

          {/* Socials row */}
          <div className="flex items-center gap-5 mt-1 text-[#cbd5e1]/40">
            <a href="https://github.com/ChaitanyaJidigum" target="_blank" rel="noopener noreferrer" className="hover:text-[#2E54FE] transition-colors" aria-label="GitHub">
              <GithubIcon className="w-4 h-4" />
            </a>
            <span className="w-px h-4 bg-white/10" />
            <a href="https://www.linkedin.com/in/chaitanya-jidigum-082091268/" target="_blank" rel="noopener noreferrer" className="hover:text-[#2E54FE] transition-colors" aria-label="LinkedIn">
              <LinkedinIcon className="w-4 h-4" />
            </a>
            <span className="w-px h-4 bg-white/10" />
            <span className="text-xs font-mono">chaitanyajidigum@gmail.com</span>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 w-full max-w-3xl mt-6 border border-white/5 rounded-2xl overflow-hidden">
            {stats.map((s, i) => (
              <div
                key={i}
                className={`flex flex-col items-center justify-center gap-1.5 py-7 px-4 ${
                  i < stats.length - 1 ? "border-r border-white/5" : ""
                } ${i >= 2 ? "border-t border-white/5 md:border-t-0" : ""}`}
              >
                <span className={`text-3xl md:text-4xl font-black tracking-tight ${s.color}`}>{s.value}</span>
                <span className="text-[10px] font-mono uppercase tracking-widest text-[#cbd5e1]/40">{s.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Portal Navigator ──────────────────────────────── */}
      <section className="py-20 md:py-28 w-full">
        <div className="mx-auto max-w-5xl px-5 sm:px-8 flex flex-col gap-12">

          <div className="flex flex-col gap-3">
            <span className="text-[10px] font-mono font-bold uppercase tracking-[0.2em] text-[#2E54FE]">Navigate</span>
            <h2 className="text-3xl md:text-4xl font-black text-white tracking-tight leading-tight">
              Explore the workspace
            </h2>
            <p className="text-sm text-[#cbd5e1]/60 max-w-md leading-relaxed">
              Each section of this portfolio is independently navigable. Jump to any area below.
            </p>
          </div>

          {/* Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {portalCards.map((portal, idx) => {
              const Icon = portal.icon;
              return (
                <Link
                  key={idx}
                  href={portal.link}
                  className="group relative flex flex-col gap-5 p-6 rounded-xl border border-white/5 hover:border-[#2E54FE]/30 transition-all duration-300 hover:bg-[#2E54FE]/[0.03] hover-lift"
                >
                  {/* Top row: icon + badge */}
                  <div className="flex items-center justify-between">
                    <div className="w-9 h-9 rounded-lg bg-[#2E54FE]/10 flex items-center justify-center text-[#2E54FE] group-hover:bg-[#2E54FE]/20 transition-colors">
                      <Icon className="w-4.5 h-4.5" strokeWidth={1.75} />
                    </div>
                    <span className="text-[9px] font-mono font-bold uppercase tracking-[0.15em] text-[#2E54FE]/60 border border-[#2E54FE]/15 px-2 py-0.5 rounded">
                      {portal.badge}
                    </span>
                  </div>

                  {/* Text */}
                  <div className="flex flex-col gap-1.5">
                    <span className="text-[10px] font-mono text-[#cbd5e1]/35 uppercase tracking-widest">{portal.subtitle}</span>
                    <h3 className="text-base font-bold text-white group-hover:text-[#2E54FE] transition-colors leading-snug">{portal.title}</h3>
                    <p className="text-xs text-[#cbd5e1]/55 leading-relaxed">{portal.desc}</p>
                  </div>

                  {/* CTA */}
                  <div className="flex items-center gap-1.5 text-xs font-semibold text-[#2E54FE]/70 group-hover:text-[#2E54FE] group-hover:gap-2.5 transition-all mt-auto pt-2 border-t border-white/5">
                    <span>Open</span>
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
