"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { 
  ArrowRight, 
  ExternalLink,
  User, 
  Briefcase, 
  RotateCcw,
  ChevronRight,
  ChevronLeft,
  Boxes,
  Brain,
  Zap,
  FolderGit2,
  Download
} from "lucide-react";

// Inline SVGs for Github and Linkedin to prevent import errors
function GithubIcon({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
      <path d="M9 18c-4.51 2-5-2-7-2" />
    </svg>
  );
}



// Tech stack brand icon SVGs
function PythonLogo({ className = "w-3.5 h-3.5" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M14.25.18c.9 0 1.66.73 1.66 1.65v1.32h-3.32v-.83a.83.83 0 0 0-.83-.83H6.8a.83.83 0 0 0-.83.83v2.49c0 .46.37.83.83.83h5.81c.9 0 1.66.74 1.66 1.66v3.32h-3.32v-.83a.83.83 0 0 0-.83-.83H5.14c-.9 0-1.66-.74-1.66-1.66V5.16c0-.9.76-1.66 1.66-1.66h5.8c.47 0 .83-.37.83-.83V1c0-.46.37-.82.82-.82h1.66zm-4.98 2.49a.62.62 0 1 0 0 1.24.62.62 0 0 0 0-1.24zm8.3 8.3c.9 0 1.66.74 1.66 1.66v3.32c0 .9-.76 1.66-1.66 1.66h-5.8a.83.83 0 0 1-.83-.83V14.3c0-.46-.37-.83-.83-.83H4.31c-.9 0-1.66-.74-1.66-1.66v-3.32H5.97v.83c0 .46.37.83.83.83h4.98c.9 0 1.66.74 1.66 1.66v3.32h3.32v-.83c0-.46.37-.83.83-.83h2.08zM14.25 18a.62.62 0 1 0 0 1.24.62.62 0 0 0 0-1.24z" fill="#3776AB" />
    </svg>
  );
}

function TensorFlowLogo({ className = "w-3.5 h-3.5" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 1.5L3.5 6.4v11.2l8.5 4.9 8.5-4.9V6.4L12 1.5zm6.8 14.8l-6.8 3.9-6.8-3.9V7.7l6.8-3.9 6.8 3.9v8.6zM12 6.8L6.8 9.8v4.4L12 17.2l5.2-3v-4.4L12 6.8z" fill="#FF6F00" />
    </svg>
  );
}

function PyTorchLogo({ className = "w-3.5 h-3.5" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 2C8.5 2 6 4.5 6 9c0 4.5 6 13 6 13s6-8.5 6-13c0-4.5-2.5-7-6-7zm0 10.5c-1.9 0-3.5-1.6-3.5-3.5S10.1 5.5 12 5.5s3.5 1.6 3.5 3.5-1.6 3.5-3.5 3.5z" fill="#EE4C2C" />
    </svg>
  );
}

function ReactLogo({ className = "w-3.5 h-3.5" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M22 12c0-1.33-.8-2.61-2.22-3.55-1.83-1.2-4.32-1.89-7.03-1.89h-.03C11.57 4.19 10 2 8 2c-.67 0-1.28.21-1.77.58-.69.52-1.1 1.34-1.15 2.3-.08 1.58.55 3.4 1.73 5.09-1.2 1.83-1.89 4.32-1.89 7.03 0 .67.21 1.28.58 1.77.52.69 1.34 1.1 2.3 1.15 1.58.08 3.4-.55 5.09-1.73 1.83 1.2 4.32 1.89 7.03 1.89.67 0 1.28-.21 1.77-.58.69-.52 1.1-1.34 1.15-2.3.08-1.58-.55-3.4-1.73-5.09 1.2-1.83 1.89-4.32 1.89-7.03zM12 9.5a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5z" fill="#00D8FF" />
    </svg>
  );
}

function NodeLogo({ className = "w-3.5 h-3.5" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 2L3.5 7v10L12 22l8.5-5V7L12 2zm-1.5 15.5l-5-2.9V9.4l5 2.9v5.7zm1.5-8.4l-5-2.9 5-2.9 5 2.9-5 2.9zm6.5 5.5l-5 2.9v-5.7l5-2.9v5.7z" fill="#339933" />
    </svg>
  );
}

function AWSLogo({ className = "w-3.5 h-3.5" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10 10-4.5 10-10S17.5 2 12 2zm3.5 14.5c-3.5 2-8.5 2-11.5 0-.4-.2-.5-.7-.2-1s.7-.5 1-.2c2.5 1.5 6.8 1.5 9.7 0 .4-.2.9 0 1.1.4.3.4.1.8-.1.8zm3.5-3.5c-.3 0-.6-.1-.8-.3C14.7 9.2 8.3 9.2 4.8 12.7c-.4.4-1 .4-1.4 0s-.4-1 0-1.4c4.3-4.3 12.1-4.3 16.4 0 .4.4.4 1 0 1.4-.2.2-.5.3-.8.3z" fill="#FF9900" />
    </svg>
  );
}

function DockerLogo({ className = "w-3.5 h-3.5" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M2 12.5c0 1.9 1.3 3.5 3.1 4l1.2-.8c.7-.5 1.6-.7 2.5-.7h6.4c1.1 0 2-.9 2-2V9.5c0-1.1-.9-2-2-2H8.8c-.9 0-1.8.2-2.5.7l-1.2.8C3.3 9 2 10.6 2 12.5zm16.5-4h2.5c.3 0 .5-.2.5-.5s-.2-.5-.5-.5h-2.5c-.3 0-.5.2-.5.5s.2.5.5.5zm-3-2.5h2.5c.3 0 .5-.2.5-.5s-.2-.5-.5-.5h-2.5c-.3 0-.5.2-.5.5s.2.5.5.5z" fill="#2496ED" />
    </svg>
  );
}

function SqlLogo({ className = "w-3.5 h-3.5" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <ellipse cx="12" cy="5" rx="9" ry="3" />
      <path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5" />
      <path d="M3 12c0 1.66 4 3 9 3s9-1.34 9-3" />
    </svg>
  );
}

function MLLogo({ className = "w-3.5 h-3.5" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="3" />
      <circle cx="12" cy="5" r="2" />
      <circle cx="5" cy="12" r="2" />
      <circle cx="19" cy="12" r="2" />
      <circle cx="12" cy="19" r="2" />
      <path d="M12 7v2" />
      <path d="M7 12h2" />
      <path d="M15 12h2" />
      <path d="M12 15v2" />
    </svg>
  );
}

export default function Home() {
  // Terminal commands and answers state matching the reference terminal mockup
  const [terminalInput, setTerminalInput] = useState("");
  const [terminalHistory, setTerminalHistory] = useState<Array<{ text: string; type: "input" | "output" }>>([
    { text: "whoami", type: "input" },
    { text: "Chaitanya Jidigum\nAI Engineer | ML Developer | Software Engineer", type: "output" },
    { text: "skills", type: "input" },
    { text: "Python, Machine Learning, Deep Learning, NLP, React, Node.js, SQL, AWS, Docker, Git", type: "output" },
    { text: "passion", type: "input" },
    { text: "Building intelligent systems that make a difference.", type: "output" },
    { text: "ls projects", type: "input" },
    { text: "Dense Passage Retrieval  Stock Price Prediction  Samsung Device Care Clone  And more...", type: "output" },
  ]);
  const terminalEndRef = useRef<HTMLDivElement>(null);
  const terminalInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    terminalEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [terminalHistory]);

  const handleTerminalSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const cmd = terminalInput.trim().toLowerCase();
    if (!cmd) return;

    const newHistory = [...terminalHistory, { text: cmd, type: "input" as const }];

    switch (cmd) {
      case "help":
        newHistory.push({
          text: "Available commands: help, whoami, skills, passion, ls projects, clear",
          type: "output",
        });
        break;
      case "whoami":
        newHistory.push({
          text: "Chaitanya Jidigum\nAI Engineer | ML Developer | Software Engineer",
          type: "output",
        });
        break;
      case "skills":
        newHistory.push({
          text: "Python, Machine Learning, Deep Learning, NLP, React, Node.js, SQL, AWS, Docker, Git",
          type: "output",
        });
        break;
      case "passion":
        newHistory.push({
          text: "Building intelligent systems that make a difference.",
          type: "output",
        });
        break;
      case "ls projects":
        newHistory.push({
          text: "Dense Passage Retrieval  Stock Price Prediction  Samsung Device Care Clone  And more...",
          type: "output",
        });
        break;
      case "clear":
        setTerminalHistory([]);
        setTerminalInput("");
        return;
      default:
        newHistory.push({
          text: `Command not found: ${cmd}. Type 'help' for available commands.`,
          type: "output",
        });
    }

    setTerminalHistory(newHistory);
    setTerminalInput("");
  };

  const projectCarousel = [
    {
      title: "Dense Passage Retrieval",
      badge: "NLP / AI",
      img: "/project1.png",
      desc: "Built a DPR system for efficient information retrieval using transformer models.",
      live: "https://github.com/ChaitanyaJidigum",
      github: "https://github.com/ChaitanyaJidigum",
    },
    {
      title: "Stock Price Prediction",
      badge: "ML",
      img: "/project2.png",
      desc: "Developed ML models to predict stock prices using historical data and LSTM.",
      live: "https://github.com/ChaitanyaJidigum",
      github: "https://github.com/ChaitanyaJidigum",
    },
    {
      title: "Samsung Device Care Clone",
      badge: "Full Stack",
      img: "/project3.png",
      desc: "Full-stack web application inspired by Samsung Device Care, built with modern technologies.",
      live: "https://github.com/ChaitanyaJidigum",
      github: "https://github.com/ChaitanyaJidigum",
    }
  ];

  return (
    <div className="flex flex-col grow gap-24 py-16 md:py-24 animate-slide-up">
      {/* ── 1. Hero Section ──────────────────────────────── */}
      <section className="mx-auto max-w-5xl px-5 sm:px-8 w-full">
        <div className="flex flex-col md:flex-row items-center justify-between gap-12">
          {/* Left Text Column */}
          <div className="flex flex-col gap-6 md:w-[58%] text-left items-start">
            <div className="flex flex-col gap-1.5">
              <span className="text-sm font-semibold text-[#cbd5e1]/50 tracking-wide">Hello, I&apos;m</span>
              <h1 className="text-5xl sm:text-6xl md:text-7xl font-black tracking-tighter leading-[1.05] text-white">
                Chaitanya <br />
                <span className="text-[#2E54FE]">Jidigum</span>
              </h1>
            </div>

            <div className="flex flex-col gap-3">
              <p className="text-sm md:text-base font-bold text-white/90 font-mono tracking-tight">
                AI Engineer • ML Developer • Software Engineer
              </p>
              <p className="text-xs md:text-sm text-[#cbd5e1]/60 leading-relaxed max-w-lg">
                I build intelligent systems and immersive digital experiences that solve real-world problems.
              </p>
            </div>

            {/* CTAs */}
            <div className="flex items-center gap-4 mt-2">
              <Link
                href="/projects"
                className="inline-flex h-11 items-center justify-center gap-2 rounded-lg bg-[#2E54FE] hover:bg-[#1d3dbd] px-6 text-sm font-semibold text-white transition-all duration-200 active:scale-95 glow-blue"
              >
                Explore Projects
                <ArrowRight className="w-4 h-4" />
              </Link>
              <a
                href="/resume.pdf"
                download="Chaitanya_Jidigum_Resume.pdf"
                className="inline-flex h-11 items-center justify-center gap-2 rounded-lg border border-white/10 bg-white/[0.01] hover:bg-white/[0.05] hover:border-[#2E54FE]/50 px-6 text-sm font-semibold text-white transition-all duration-200"
              >
                Download Resume
                <Download className="w-4 h-4" />
              </a>
            </div>

            {/* Tech Stack Row */}
            <div className="flex flex-col gap-3 mt-6 w-full">
              <span className="text-[10px] font-mono font-bold tracking-[0.2em] text-[#cbd5e1]/40 uppercase">Tech Stack</span>
              <div className="flex flex-wrap gap-2.5">
                {[
                  { name: "Python", logo: PythonLogo },
                  { name: "TensorFlow", logo: TensorFlowLogo },
                  { name: "PyTorch", logo: PyTorchLogo },
                  { name: "React", logo: ReactLogo },
                  { name: "Node.js", logo: NodeLogo },
                  { name: "AWS", logo: AWSLogo },
                  { name: "Docker", logo: DockerLogo }
                ].map((tech, idx) => {
                  const LogoComponent = tech.logo;
                  return (
                    <div
                      key={idx}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-white/5 bg-white/[0.02] text-xs text-[#cbd5e1] hover:border-[#2E54FE]/20 hover:bg-[#2E54FE]/[0.02] transition-colors font-mono"
                    >
                      <LogoComponent className="w-3.5 h-3.5 shrink-0" />
                      <span>{tech.name}</span>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Right Profile Circle Column */}
          <div className="md:w-[42%] flex justify-center items-center relative py-6">
            <div className="relative w-64 h-64 sm:w-72 sm:h-72 md:w-80 md:h-80 flex items-center justify-center">
              {/* Outer pulsing glow rings */}
              <div className="absolute inset-0 rounded-full border border-[#2E54FE]/25 animate-pulse opacity-40" />
              <div className="absolute -inset-4 rounded-full border border-[#2E54FE]/10 opacity-20" />
              <div className="absolute -inset-8 rounded-full border border-[#2E54FE]/5 opacity-10" />
              
              {/* Main Avatar Container */}
              <div className="relative w-56 h-56 sm:w-64 sm:h-64 md:w-72 md:h-72 rounded-full overflow-hidden border border-[#2E54FE] bg-[#0b0b0b] shadow-[0_0_60px_rgba(46,84,254,0.25)] flex items-center justify-center">
                <img 
                  src="/profile.png" 
                  alt="Chaitanya Jidigum Profile" 
                  className="w-full h-full object-cover scale-[1.03] object-center"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── 2. Stats Section ─────────────────────────────── */}
      <section className="mx-auto max-w-5xl px-5 sm:px-8 w-full">
        <div className="w-full rounded-2xl border border-white/5 bg-white/[0.015] shadow-xl shadow-black/40 overflow-hidden">
          <div className="grid grid-cols-2 md:grid-cols-4 w-full">
            {[
              { val: "15+", label: "Projects Built", icon: FolderGit2 },
              { val: "8+", label: "Technologies", icon: Boxes },
              { val: "3+", label: "AI Models Developed", icon: Brain },
              { val: "100%", label: "Passion Driven", icon: Zap }
            ].map((stat, i) => {
              const Icon = stat.icon;
              return (
                <div
                  key={i}
                  className={`flex items-center gap-4 py-6 px-6 sm:px-8 ${
                    i < 3 ? "md:border-r border-white/5" : ""
                  } ${i % 2 === 0 ? "border-r md:border-r-0" : ""} ${
                    i >= 2 ? "border-t border-white/5 md:border-t-0" : ""
                  }`}
                >
                  <div className="w-10 h-10 rounded-xl border border-white/10 bg-white/[0.02] flex items-center justify-center text-[#2E54FE] shrink-0">
                    <Icon className="w-4.5 h-4.5" strokeWidth={1.5} />
                  </div>
                  <div className="flex flex-col gap-0.5">
                    <span className="text-xl sm:text-2xl font-black text-white leading-none tracking-tight">{stat.val}</span>
                    <span className="text-[10px] font-mono uppercase tracking-wider text-[#cbd5e1]/40">{stat.label}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── 3. About Me & Timeline Side-by-Side ─────────── */}
      <section className="mx-auto max-w-5xl px-5 sm:px-8 w-full">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
          {/* About Me Card */}
          <div className="flex flex-col gap-5 p-6 md:p-8 rounded-2xl border border-white/5 bg-white/[0.015] hover:border-[#2E54FE]/20 transition-all duration-300">
            <div className="flex items-center gap-3 border-b border-white/5 pb-4">
              <User className="w-4.5 h-4.5 text-[#2E54FE]" />
              <h2 className="text-base font-bold text-white uppercase tracking-wider font-mono">About Me</h2>
            </div>
            <div className="flex flex-col gap-4 text-xs md:text-sm text-[#cbd5e1]/75 leading-relaxed">
              <p>
                I am a software engineer specializing in AI/ML solutions, automated systems, and clean web applications. I love transforming ideas into impactful products using data, code, and creativity.
              </p>
            </div>
            <Link 
              href="/about"
              className="inline-flex h-9 items-center justify-center gap-1.5 rounded-lg border border-white/10 bg-white/[0.02] hover:border-[#2E54FE]/50 hover:text-[#2E54FE] px-4 text-xs font-semibold text-[#cbd5e1] transition-all w-fit mt-2"
            >
              Know More About Me
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          {/* Experience Timeline Card */}
          <div className="flex flex-col gap-5 p-6 md:p-8 rounded-2xl border border-white/5 bg-white/[0.015] hover:border-[#2E54FE]/20 transition-all duration-300">
            <div className="flex items-center gap-3 border-b border-white/5 pb-4">
              <Briefcase className="w-4.5 h-4.5 text-[#2E54FE]" />
              <h2 className="text-base font-bold text-white uppercase tracking-wider font-mono">Experience Timeline</h2>
            </div>

            <div className="flex flex-col gap-5 relative pl-4 border-l border-white/5">
              {[
                {
                  year: "2025",
                  role: "QA Testing Intern",
                  company: "Samsung Research India",
                  desc: "Working on device care applications and automated testing frameworks."
                },
                {
                  year: "2025",
                  role: "AI/ML Projects",
                  company: "Personal & Academic",
                  desc: "Building ML models and intelligent systems to solve real-world problems."
                },
                {
                  year: "2024",
                  role: "Computer Science Student",
                  company: "B.Tech in CSE",
                  desc: "Passionate about software development, and developing scalable applications."
                }
              ].map((item, idx) => (
                <div key={idx} className="relative flex flex-col gap-1 text-xs">
                  {/* Circle Indicator on vertical line */}
                  <div className="absolute -left-[20.5px] top-1 w-2.5 h-2.5 rounded-full border-2 border-[#2E54FE] bg-black" />
                  
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-mono font-bold text-[#2E54FE] bg-[#2E54FE]/5 border border-[#2E54FE]/15 px-1.5 py-0.5 rounded">
                      {item.year}
                    </span>
                    <h3 className="font-bold text-white">{item.role}</h3>
                  </div>
                  <span className="text-[10px] font-mono text-[#cbd5e1]/40">{item.company}</span>
                  <p className="text-[#cbd5e1]/60 leading-relaxed text-[11px] mt-0.5">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── 4. Featured Projects Section ────────────────── */}
      <section className="mx-auto max-w-5xl px-5 sm:px-8 w-full flex flex-col gap-8 relative">
        <div className="flex items-center justify-between border-b border-white/5 pb-4">
          <div className="flex items-center gap-3">
            <FolderGit2 className="w-4.5 h-4.5 text-[#2E54FE]" />
            <h2 className="text-base font-bold text-white uppercase tracking-wider font-mono">Featured Projects</h2>
          </div>
          <Link 
            href="/projects" 
            className="text-xs font-semibold text-[#2E54FE] hover:underline flex items-center gap-1"
          >
            View All Projects
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        {/* Carousel Grid with Arrow navigation (pure visual layout representing carousel) */}
        <div className="relative w-full group">
          {/* Navigation Arrows positioned on borders */}
          <button 
            className="absolute -left-4 sm:-left-6 top-1/2 -translate-y-1/2 z-10 w-8 h-8 rounded-full border border-white/5 bg-black hover:border-[#2E54FE] text-[#cbd5e1] flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity pointer-events-auto cursor-pointer"
            aria-label="Previous Projects"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          <button 
            className="absolute -right-4 sm:-right-6 top-1/2 -translate-y-1/2 z-10 w-8 h-8 rounded-full border border-white/5 bg-black hover:border-[#2E54FE] text-[#cbd5e1] flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity pointer-events-auto cursor-pointer"
            aria-label="Next Projects"
          >
            <ChevronRight className="w-4 h-4" />
          </button>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {projectCarousel.map((proj, idx) => (
              <div 
                key={idx}
                className="flex flex-col rounded-2xl border border-white/5 bg-white/[0.015] hover:border-[#2E54FE]/20 transition-all duration-300 overflow-hidden"
              >
                {/* Project Image */}
                <div className="w-full h-40 bg-black border-b border-white/5 relative overflow-hidden flex items-center justify-center">
                  <img 
                    src={proj.img} 
                    alt={proj.title}
                    className="w-full h-full object-cover select-none object-center"
                  />
                </div>

                {/* Project Info */}
                <div className="flex flex-col gap-3 p-5 grow">
                  <div className="flex items-center justify-between">
                    <span className="text-[9px] font-mono font-bold uppercase tracking-wider text-[#2E54FE] bg-[#2E54FE]/5 border border-[#2E54FE]/15 px-2 py-0.5 rounded">
                      {proj.badge}
                    </span>
                  </div>
                  
                  <div className="flex flex-col gap-1.5">
                    <h3 className="text-sm font-bold text-white leading-snug">{proj.title}</h3>
                    <p className="text-xs text-[#cbd5e1]/55 leading-relaxed">{proj.desc}</p>
                  </div>

                  <div className="flex items-center gap-4 mt-auto pt-4 border-t border-white/5 text-[11px] font-semibold text-[#cbd5e1]/50">
                    <a 
                      href={proj.live} 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="hover:text-[#2E54FE] inline-flex items-center gap-1"
                    >
                      Live Demo
                      <ExternalLink className="w-3 h-3" />
                    </a>
                    <a 
                      href={proj.github} 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="hover:text-[#2E54FE] inline-flex items-center gap-1"
                    >
                      GitHub
                      <GithubIcon className="w-3 h-3" />
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 5. Skills & Terminal Side-by-Side ────────────── */}
      <section className="mx-auto max-w-5xl px-5 sm:px-8 w-full">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
          {/* Skills Categorized Card */}
          <div className="flex flex-col gap-5 p-6 md:p-8 rounded-2xl border border-white/5 bg-white/[0.015] hover:border-[#2E54FE]/20 transition-all duration-300">
            <div className="flex items-center gap-3 border-b border-white/5 pb-4">
              <Boxes className="w-4.5 h-4.5 text-[#2E54FE]" />
              <h2 className="text-base font-bold text-white uppercase tracking-wider font-mono">Skills</h2>
            </div>
            
            <div className="flex flex-col gap-4">
              {[
                {
                  row: [
                    { name: "Python", logo: PythonLogo },
                    { name: "Machine Learning", logo: MLLogo },
                    { name: "Deep Learning", logo: Brain }
                  ]
                },
                {
                  row: [
                    { name: "SQL", logo: SqlLogo },
                    { name: "React", logo: ReactLogo },
                    { name: "Node.js", logo: NodeLogo },
                    { name: "Docker", logo: DockerLogo }
                  ]
                },
                {
                  row: [
                    { name: "AWS", logo: AWSLogo },
                    { name: "and more...", logo: null }
                  ]
                }
              ].map((category, rIdx) => (
                <div key={rIdx} className="flex flex-wrap gap-2">
                  {category.row.map((skill, sIdx) => {
                    const LogoComponent = skill.logo;
                    return (
                      <div
                        key={sIdx}
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-white/5 bg-white/[0.02] text-xs text-[#cbd5e1] hover:border-[#2E54FE]/20 hover:bg-[#2E54FE]/[0.02] transition-colors"
                      >
                        {LogoComponent && <LogoComponent className="w-3.5 h-3.5 text-[#2E54FE]" />}
                        <span>{skill.name}</span>
                      </div>
                    );
                  })}
                </div>
              ))}
            </div>
          </div>

          {/* Interactive macOS Terminal Mockup */}
          <div className="flex flex-col rounded-2xl border border-white/5 bg-[#050505] overflow-hidden transition-all duration-300 hover:border-[#2E54FE]/20 shadow-xl shadow-black/50">
            {/* Terminal Title Bar */}
            <div className="flex items-center justify-between px-4 py-3 border-b border-white/5 bg-white/[0.015]">
              <div className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-rose-500/80" />
                <span className="w-2.5 h-2.5 rounded-full bg-amber-500/80" />
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/80" />
                <span className="text-[10px] font-mono text-[#cbd5e1]/30 ml-3">visitor@cj: ~</span>
              </div>
              <button 
                onClick={() => setTerminalHistory([
                  { text: "whoami", type: "input" },
                  { text: "Chaitanya Jidigum\nAI Engineer | ML Developer | Software Engineer", type: "output" },
                  { text: "skills", type: "input" },
                  { text: "Python, Machine Learning, Deep Learning, NLP, React, Node.js, SQL, AWS, Docker, Git", type: "output" },
                ])}
                className="text-[#cbd5e1]/30 hover:text-[#2E54FE] transition-colors"
                title="Reset log"
              >
                <RotateCcw className="w-3 h-3" />
              </button>
            </div>

            {/* Terminal Log Area */}
            <div 
              onClick={() => terminalInputRef.current?.focus()}
              className="p-5 h-52 overflow-y-auto font-mono text-[11px] leading-relaxed text-[#cbd5e1]/85 flex flex-col gap-2 cursor-text"
            >
              {terminalHistory.map((entry, idx) => (
                <div key={idx} className="whitespace-pre-line">
                  {entry.type === "input" ? (
                    <div className="flex items-start gap-1">
                      <span className="text-[#2E54FE]">&gt;</span>
                      <span className="text-white">{entry.text}</span>
                    </div>
                  ) : (
                    <div className="text-[#cbd5e1]/65 pl-3">{entry.text}</div>
                  )}
                </div>
              ))}
              <form onSubmit={handleTerminalSubmit} className="flex items-center gap-1">
                <span className="text-[#2E54FE]">&gt;</span>
                <input
                  ref={terminalInputRef}
                  type="text"
                  value={terminalInput}
                  onChange={(e) => setTerminalInput(e.target.value)}
                  className="bg-transparent border-none outline-none text-white grow caret-[#2E54FE]"
                  autoFocus
                  placeholder="type command..."
                />
              </form>
              <div ref={terminalEndRef} />
            </div>

            {/* Quick-command chips */}
            <div className="flex flex-wrap gap-1.5 p-3.5 border-t border-white/5 bg-white/[0.005]">
              {["whoami", "skills", "passion", "ls projects", "clear"].map((cmd) => (
                <button
                  key={cmd}
                  onClick={() => {
                    setTerminalInput(cmd);
                    terminalInputRef.current?.focus();
                  }}
                  className="px-2.5 py-1 rounded-md text-[9px] font-mono text-[#cbd5e1]/40 border border-white/5 hover:border-[#2E54FE]/30 hover:text-[#2E54FE] transition-all cursor-pointer"
                >
                  {cmd}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
