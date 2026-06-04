"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import GhostCursor from "@/components/GhostCursor";
import { 
  Sparkles, 
  ArrowUpRight, 
  Layers, 
  CheckCircle2, 
  Copy, 
  Terminal, 
  Cpu, 
  Palette, 
  Mail, 
  FileText, 
  Send, 
  Code2,
  ChevronRight,
  ArrowUp
} from "lucide-react";

interface Project {
  title: string;
  description: string;
  tags: string[];
  category: "all" | "frontend" | "fullstack" | "ml_ai";
  github: string;
  live: string;
}

interface TerminalHistory {
  text: string;
  type: "command" | "output" | "error";
}

function GithubIcon({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
      <path d="M9 18c-4.51 2-5-2-7-2" />
    </svg>
  );
}

function LinkedinIcon({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
      <rect x="2" y="9" width="4" height="12" />
      <circle cx="4" cy="4" r="2" />
    </svg>
  );
}

export default function Home() {
  // Navigation & Tab States
  const [activeProjectTab, setActiveProjectTab] = useState<"all" | "frontend" | "fullstack" | "ml_ai">("all");
  const [contactSuccess, setContactSuccess] = useState(false);
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    let rafId: number;
    const updateMousePos = (e: MouseEvent) => {
      rafId = requestAnimationFrame(() => {
        setMousePos({ x: e.clientX, y: e.clientY });
      });
    };
    window.addEventListener("pointermove", updateMousePos, { passive: true });
    return () => {
      window.removeEventListener("pointermove", updateMousePos);
      cancelAnimationFrame(rafId);
    };
  }, []);

  // Monitor scroll for Scroll-to-Top button
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 400) {
        setShowScrollTop(true);
      } else {
        setShowScrollTop(false);
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Contact Form State
  const [formState, setFormState] = useState({ name: "", email: "", message: "" });

  // Terminal State
  const [terminalInput, setTerminalInput] = useState("");
  const [terminalHistory, setTerminalHistory] = useState<TerminalHistory[]>([
    { text: "System initialized. Welcome to Chaitanya Jidigum's workspace console.", type: "output" },
    { text: "Type 'help' to see list of available commands.", type: "output" }
  ]);
  const terminalEndRef = useRef<HTMLDivElement>(null);

  // Auto scroll terminal to bottom (preventing jump on mount)
  const isInitialMount = useRef(true);
  useEffect(() => {
    if (isInitialMount.current) {
      isInitialMount.current = false;
      return;
    }
    terminalEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [terminalHistory]);

  // Ensure page scroll starts at top on initial mount
  useEffect(() => {
    if (typeof window !== "undefined") {
      if (window.history) {
        window.history.scrollRestoration = "manual";
      }
      window.scrollTo(0, 0);

      const handleScrollRestoration = () => {
        window.scrollTo(0, 0);
      };
      // Run immediately and after a short timeout to bypass browser rendering cycles
      const timer = setTimeout(handleScrollRestoration, 0);
      const timerLong = setTimeout(handleScrollRestoration, 150);

      window.addEventListener("load", handleScrollRestoration);
      return () => {
        clearTimeout(timer);
        clearTimeout(timerLong);
        window.removeEventListener("load", handleScrollRestoration);
      };
    }
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const copyEmailAddress = () => {
    navigator.clipboard.writeText("chaitanyajidigum@gmail.com");
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2000);
  };

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formState.name || !formState.email || !formState.message) return;
    setContactSuccess(true);
    setFormState({ name: "", email: "", message: "" });
    setTimeout(() => setContactSuccess(false), 3000);
  };

  const handleTerminalSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const cmd = terminalInput.trim().toLowerCase();
    if (!cmd) return;

    const newHistory = [...terminalHistory, { text: `visitor@chaitanya:~ $ ${terminalInput}`, type: "command" as const }];

    switch (cmd) {
      case "help":
        newHistory.push({
          text: "Available commands:\n  about     - Displays biographical info\n  skills    - Lists core tech stack and libraries\n  projects  - Lists recent coding projects\n  contact   - Shows direct contact methods\n  clear     - Clears the terminal screen",
          type: "output"
        });
        break;
      case "about":
        newHistory.push({
          text: "Chaitanya Jidigum is a Software Engineer specializing in AI/ML solutions, Python automation, and web technologies. Experienced in building predictive models, computer vision systems, and databases.",
          type: "output"
        });
        break;
      case "skills":
        newHistory.push({
          text: "Tech Stack:\n  Languages  : Python, Java, C++, C, HTML5, CSS3, JavaScript\n  Tools/Libs : Pandas, NumPy, Scikit-Learn, OpenCV, Selenium\n  Databases  : MySQL\n  Environments: Windows, Ubuntu, Jupyter Notebook, Eclipse",
          type: "output"
        });
        break;
      case "projects":
        newHistory.push({
          text: "Featured Projects:\n  1. Airfare Prices Prediction - Machine learning cost estimation (Category: Fullstack)\n  2. AI Crowd Analytics - CCTV computer vision monitor (Category: AI/ML)\n  3. IoT Campus Event Portal - Event registration system (Category: Frontend)",
          type: "output"
        });
        break;
      case "contact":
        newHistory.push({
          text: "Reach out via email: chaitanyajidigum@gmail.com or use the contact form below.",
          type: "output"
        });
        break;
      case "clear":
        setTerminalHistory([]);
        setTerminalInput("");
        return;
      default:
        newHistory.push({
          text: `Command not found: '${cmd}'. Type 'help' to see list of available commands.`,
          type: "error"
        });
    }

    setTerminalHistory(newHistory);
    setTerminalInput("");
  };

  const projects: Project[] = [
    {
      title: "Airfare Prices Prediction System",
      description: "A machine learning platform built to forecast flight ticket rates. Implements advanced preprocessing and feature engineering to address pricing uncertainties.",
      tags: ["Python", "Pandas", "Scikit-Learn", "Jupyter Notebook", "Regression"],
      category: "fullstack",
      github: "https://github.com/ChaitanyaJidigum",
      live: "https://github.com/ChaitanyaJidigum"
    },
    {
      title: "AI Crowd Analytics & CCTV Monitor",
      description: "A computer vision visual monitoring system using transfer learning and deep neural networks to optimize crowd management and security tracking.",
      tags: ["AI/ML", "Computer Vision", "Python", "Transfer Learning", "OpenCV"],
      category: "ml_ai",
      github: "https://github.com/ChaitanyaJidigum",
      live: "https://github.com/ChaitanyaJidigum"
    },
    {
      title: "IoT Campus Events Dashboard",
      description: "A central event management dashboard designed to register and coordinate IoT club activities and track 200+ event attendees.",
      tags: ["Python", "MySQL", "HTML5", "CSS3", "JavaScript"],
      category: "frontend",
      github: "https://github.com/ChaitanyaJidigum",
      live: "https://github.com/ChaitanyaJidigum"
    },
    {
      title: "Web Automation & Scraping Suite",
      description: "A lightweight web automation engine built with Selenium to scrape web data, validate page states, and automate repetitive testing tasks.",
      tags: ["Python", "Selenium", "Web Automation", "MySQL Workbench", "Testing"],
      category: "ml_ai",
      github: "https://github.com/ChaitanyaJidigum",
      live: "https://github.com/ChaitanyaJidigum"
    }
  ];

  const filteredProjects = activeProjectTab === "all" 
    ? projects 
    : projects.filter(p => p.category === activeProjectTab);

  return (
    <div className="min-h-screen flex flex-col bg-black text-[#cbd5e1] selection:bg-[#2E54FE]/20 selection:text-[#2E54FE] relative dot-grid-blue">
      <GhostCursor
        trailLength={35}
        inertia={0.7}
        grainIntensity={0.03}
        bloomStrength={0.8}
        bloomRadius={2.5}
        brightness={2.5}
        color="#2E54FE"
        className="absolute inset-0 pointer-events-none"
        style={{ opacity: 0.65 }}
        zIndex={0}
      />
      
      {/* Dynamic Cursor Spotlight Effect */}
      <div 
        className="pointer-events-none fixed inset-0 z-30"
        style={{
          background: `radial-gradient(400px circle at ${mousePos.x}px ${mousePos.y}px, rgba(46, 84, 254, 0.12), transparent 80%)`
        }}
      />
      
      <div className="relative z-10 flex flex-col grow">
        {/* Navbar */}
        <header className="sticky top-0 z-50 w-full border-b border-white/5 bg-black/85 backdrop-blur-md text-white animate-fade-in">
          <div className="mx-auto max-w-7xl px-6 h-16 flex items-center justify-between">
            <a href="#" className="flex items-center gap-2.5 group">
              <div className="w-8 h-8 rounded-lg bg-[#2E54FE] flex items-center justify-center text-white font-extrabold text-sm group-hover:scale-105 transition-transform duration-200">
                CJ
              </div>
              <span className="font-bold text-white tracking-tight group-hover:text-[#2E54FE] transition-colors">Chaitanya Jidigum</span>
            </a>

            {/* Desktop Nav Links */}
            <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-[#cbd5e1]/70">
              <a href="#about" className="hover:text-[#2E54FE] transition-colors">About</a>
              <a href="#projects" className="hover:text-[#2E54FE] transition-colors">Projects</a>
              <a href="#skills" className="hover:text-[#2E54FE] transition-colors">Skills</a>
              <a href="#console" className="hover:text-[#2E54FE] transition-colors">Console</a>
              <a href="#contact" className="hover:text-[#2E54FE] transition-colors">Contact</a>
            </nav>

            {/* Social Icons & CTA */}
            <div className="flex items-center gap-4">
              <a href="https://github.com/ChaitanyaJidigum" target="_blank" rel="noopener noreferrer" className="text-[#cbd5e1]/70 hover:text-[#2E54FE] transition-colors" aria-label="GitHub">
                <GithubIcon className="w-4 h-4" />
              </a>
              <a href="https://www.linkedin.com/in/chaitanya-jidigum-082091268/" target="_blank" rel="noopener noreferrer" className="text-[#cbd5e1]/70 hover:text-[#2E54FE] transition-colors" aria-label="LinkedIn">
                <LinkedinIcon className="w-4 h-4" />
              </a>
              <a 
                href="#contact" 
                className="hidden sm:inline-flex h-9 items-center justify-center rounded-lg border border-[#2E54FE] hover:bg-[#2E54FE] hover:text-white px-4 text-xs font-semibold text-[#2E54FE] transition-all"
              >
                Get in Touch
              </a>
            </div>
          </div>
        </header>

        {/* Hero Section */}
        <section id="about" className="relative pt-20 pb-16 md:py-32 w-full overflow-hidden border-b border-white/5">
          {/* Background Image Layer */}
          <div className="absolute inset-0 z-0">
            <Image 
              src="/background.png" 
              alt="Background Character" 
              fill
              priority
              className="object-cover object-center opacity-25 md:opacity-30" 
            />
            {/* Dark mask overlay to guarantee text contrast */}
            <div className="absolute inset-0 bg-black/60" />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_20%,#000000_90%)]" />
          </div>

          <div className="relative z-10 mx-auto max-w-7xl px-6 flex flex-col items-center text-center gap-8 animate-slide-up">
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
              <a 
                href="#projects" 
                className="flex h-12 items-center justify-center rounded-lg bg-[#2E54FE] hover:bg-[#1d3dbd] px-6 font-semibold text-white transition-all active:scale-98 glow-blue hover-lift"
              >
                Explore Projects
              </a>
              <a 
                href="#contact" 
                className="flex h-12 items-center justify-center rounded-lg border border-[#2E54FE] hover:bg-[#2E54FE]/10 px-6 font-semibold text-[#2E54FE] transition-all active:scale-98"
              >
                Contact Me
              </a>
            </div>

            {/* Statistics Grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 w-full max-w-4xl border border-white/5 p-6 md:p-8 rounded-2xl bg-[#0b0b0b]/60 backdrop-blur-xs mt-12 text-[#cbd5e1] hover-lift">
              <div className="flex flex-col gap-1 border-r border-white/5 last:border-0 pr-4">
                <span className="text-2xl md:text-3xl font-extrabold text-white">4+</span>
                <span className="text-xs font-mono uppercase tracking-wider text-[#cbd5e1]/60 font-semibold">Years Experience</span>
              </div>
              <div className="flex flex-col gap-1 border-r border-white/5 last:border-0 md:pr-4">
                <span className="text-2xl md:text-3xl font-extrabold text-[#2E54FE]">40+</span>
                <span className="text-xs font-mono uppercase tracking-wider text-[#cbd5e1]/60 font-semibold">Projects Built</span>
              </div>
              <div className="flex flex-col gap-1 border-r border-white/5 last:border-0 pr-4">
                <span className="text-2xl md:text-3xl font-extrabold text-white">12k+</span>
                <span className="text-xs font-mono uppercase tracking-wider text-[#cbd5e1]/60 font-semibold">GitHub Commits</span>
              </div>
              <div className="flex flex-col gap-1 last:border-0">
                <span className="text-2xl md:text-3xl font-extrabold text-[#2E54FE]">100%</span>
                <span className="text-xs font-mono uppercase tracking-wider text-[#cbd5e1]/60 font-semibold">Client Love</span>
              </div>
            </div>
          </div>
        </section>

        {/* Projects Section */}
        <section id="projects" className="py-20 w-full bg-black border-b border-white/5 relative z-10">
          <div className="mx-auto max-w-7xl px-6 flex flex-col gap-12 animate-slide-up animation-delay-100">
            
            <div className="flex flex-col md:flex-row items-start md:items-end justify-between gap-6">
              <div className="flex flex-col gap-2">
                <span className="text-xs font-mono font-bold uppercase tracking-widest text-[#2E54FE]">[ PROJECTS ]</span>
                <h2 className="text-3xl md:text-4xl font-extrabold text-white tracking-tight">Recent Projects</h2>
              </div>

              {/* Project Filters */}
              <div className="flex border border-white/5 bg-[#0b0b0b] p-1.5 rounded-xl gap-1">
                {(["all", "frontend", "fullstack", "ml_ai"] as const).map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveProjectTab(tab)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-semibold capitalize transition-all ${
                      activeProjectTab === tab 
                        ? "bg-[#2E54FE] text-white shadow-sm" 
                        : "text-[#cbd5e1]/60 hover:text-white"
                    }`}
                  >
                    {tab === "ml_ai" ? "AI/ML" : tab}
                  </button>
                ))}
              </div>
            </div>

            {/* Project Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {filteredProjects.map((project, idx) => (
                <div 
                  key={idx} 
                  className="group flex flex-col justify-between p-6 md:p-8 rounded-2xl border border-white/5 bg-[#0b0b0b] hover:border-[#2E54FE]/40 hover:bg-[#0b0b0b]/80 hover:shadow-[0_0_30px_rgba(46,84,254,0.05)] transition-all duration-300 hover-lift"
                >
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-xs font-mono text-[#2E54FE] tracking-wider font-semibold uppercase">{project.category}</span>
                      <div className="flex gap-2">
                        <a 
                          href={project.github} 
                          target="_blank" 
                          rel="noopener noreferrer" 
                          className="p-1.5 rounded-md hover:bg-black text-[#cbd5e1]/60 hover:text-[#2E54FE] transition-colors"
                          title="GitHub Repository"
                        >
                          <GithubIcon className="w-4 h-4" />
                        </a>
                        <a 
                          href={project.live} 
                          target="_blank" 
                          rel="noopener noreferrer" 
                          className="p-1.5 rounded-md hover:bg-black text-[#cbd5e1]/60 hover:text-[#2E54FE] transition-colors"
                          title="Live Site"
                        >
                          <ArrowUpRight className="w-4 h-4" />
                        </a>
                      </div>
                    </div>

                    <h3 className="text-xl font-bold text-white group-hover:text-[#2E54FE] transition-colors mb-2">
                      {project.title}
                    </h3>
                    
                    <p className="text-sm text-[#cbd5e1]/80 leading-relaxed mb-6">
                      {project.description}
                    </p>
                  </div>

                  <div className="flex flex-wrap gap-2 mt-auto">
                    {project.tags.map((tag, tagIdx) => (
                      <span 
                        key={tagIdx} 
                        className="px-2.5 py-1 rounded-md text-xs font-mono bg-black text-[#cbd5e1]/80 border border-white/5 group-hover:border-[#2E54FE]/20 group-hover:text-white transition-colors"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Skills & Experience Section */}
        <section id="skills" className="py-20 w-full bg-black border-b border-white/5 relative z-10">
          <div className="mx-auto max-w-7xl px-6 grid grid-cols-1 lg:grid-cols-12 gap-16 animate-slide-up animation-delay-200">
            
            {/* Tech Matrix / Left Column */}
            <div className="lg:col-span-6 flex flex-col gap-8">
              <div className="flex flex-col gap-2">
                <span className="text-xs font-mono font-bold uppercase tracking-widest text-[#2E54FE]">[ COMPETENCIES ]</span>
                <h2 className="text-3xl md:text-4xl font-extrabold text-white tracking-tight">Technical Stack</h2>
                <p className="text-sm text-[#cbd5e1]/80 leading-relaxed mt-2">
                  A selection of technologies and libraries I leverage to build robust frontend client apps and resilient backend services.
                </p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="p-4 rounded-xl border border-white/5 bg-[#0b0b0b] hover:border-[#2E54FE]/30 transition-all group hover-lift">
                  <div className="w-8 h-8 rounded-lg bg-[#2E54FE]/10 flex items-center justify-center text-[#2E54FE] mb-3 group-hover:scale-105 transition-transform">
                    <Cpu className="w-4 h-4" />
                  </div>
                  <h4 className="font-semibold text-white text-sm">Python & ML</h4>
                  <span className="text-xs text-[#cbd5e1]/60">Pandas, NumPy, Scikit-Learn, Regression</span>
                </div>

                <div className="p-4 rounded-xl border border-white/5 bg-[#0b0b0b] hover:border-[#2E54FE]/30 transition-all group hover-lift">
                  <div className="w-8 h-8 rounded-lg bg-[#2E54FE]/10 flex items-center justify-center text-[#2E54FE] mb-3 group-hover:scale-105 transition-transform">
                    <Palette className="w-4 h-4" />
                  </div>
                  <h4 className="font-semibold text-white text-sm">Computer Vision & AI</h4>
                  <span className="text-xs text-[#cbd5e1]/60">OpenCV, Transfer Learning, CCTV</span>
                </div>

                <div className="p-4 rounded-xl border border-white/5 bg-[#0b0b0b] hover:border-[#2E54FE]/30 transition-all group hover-lift">
                  <div className="w-8 h-8 rounded-lg bg-[#2E54FE]/10 flex items-center justify-center text-[#2E54FE] mb-3 group-hover:scale-105 transition-transform">
                    <Code2 className="w-4 h-4" />
                  </div>
                  <h4 className="font-semibold text-white text-sm">Languages</h4>
                  <span className="text-xs text-[#cbd5e1]/60">Python, Java, C++, C, HTML/CSS, JS</span>
                </div>

                <div className="p-4 rounded-xl border border-white/5 bg-[#0b0b0b] hover:border-[#2E54FE]/30 transition-all group hover-lift">
                  <div className="w-8 h-8 rounded-lg bg-[#2E54FE]/10 flex items-center justify-center text-[#2E54FE] mb-3 group-hover:scale-105 transition-transform">
                    <Layers className="w-4 h-4" />
                  </div>
                  <h4 className="font-semibold text-white text-sm">Databases & Tools</h4>
                  <span className="text-xs text-[#cbd5e1]/60">MySQL Workbench, SQL, Selenium</span>
                </div>
              </div>
            </div>

            {/* Timeline / Right Column */}
            <div className="lg:col-span-6 flex flex-col gap-8">
              <div className="flex flex-col gap-2">
                <span className="text-xs font-mono font-bold uppercase tracking-widest text-[#2E54FE]">[ TIMELINE ]</span>
                <h2 className="text-3xl md:text-4xl font-extrabold text-white tracking-tight">Work History</h2>
              </div>

              {/* Experience Timeline */}
              <div className="relative pl-6 border-l border-white/5 flex flex-col gap-8">
                
                <div className="relative">
                  {/* Connector Node */}
                  <div className="absolute -left-[30px] top-1.5 w-4 h-4 rounded-full bg-[#2E54FE] border-4 border-black shadow-[0_0_10px_rgba(46,84,254,0.3)]" />
                  <div>
                    <span className="text-xs font-bold font-mono text-[#2E54FE] bg-[#2E54FE]/5 px-2 py-0.5 rounded border border-[#2E54FE]/10">[ 2024 &mdash; Present ]</span>
                    <h4 className="text-base font-bold text-white mt-2">Software Developer & IoT Club Coordinator</h4>
                    <span className="text-xs text-[#cbd5e1]/60">Sri Indu Institute & Freelance</span>
                    <p className="text-xs text-[#cbd5e1]/80 leading-relaxed mt-2">
                      Coordinating B.Tech CSE (Internet of Things) activities, managing team pipelines, and designing IoT campus registration suites. Developing freelance automation scripts.
                    </p>
                  </div>
                </div>

                <div className="relative">
                  {/* Connector Node */}
                  <div className="absolute -left-[30px] top-1.5 w-4 h-4 rounded-full bg-[#2E54FE] border-4 border-black shadow-[0_0_10px_rgba(46,84,254,0.4)]" />
                  <div>
                    <span className="text-xs font-bold font-mono text-[#2E54FE] bg-[#2E54FE]/5 px-2 py-0.5 rounded border border-[#2E54FE]/10">[ 2022 &mdash; 2024 ]</span>
                    <h4 className="text-base font-bold text-white mt-2">AI/ML Developer Intern</h4>
                    <span className="text-xs text-[#cbd5e1]/60">Decibel Systems & Contract</span>
                    <p className="text-xs text-[#cbd5e1]/80 leading-relaxed mt-2">
                      Trained supervised machine learning models to forecast pricing patterns and engineered transfer-learning algorithms for CCTV camera monitoring networks.
                    </p>
                  </div>
                </div>

                <div className="relative">
                  {/* Connector Node */}
                  <div className="absolute -left-[30px] top-1.5 w-4 h-4 rounded-full bg-white border-4 border-black shadow-[0_0_10px_rgba(255,255,255,0.2)]" />
                  <div>
                    <span className="text-xs font-bold font-mono text-white bg-white/5 px-2 py-0.5 rounded border border-white/10">[ 2020 &mdash; 2022 ]</span>
                    <h4 className="text-base font-bold text-white mt-2">Web Automation & Software Developer</h4>
                    <span className="text-xs text-[#cbd5e1]/60">Independent / Academic Projects</span>
                    <p className="text-xs text-[#cbd5e1]/80 leading-relaxed mt-2">
                      Wrote custom automation scrapers using Selenium, designed structured databases with MySQL Workbench, and built initial frontend client websites with HTML/CSS.
                    </p>
                  </div>
                </div>

              </div>
            </div>
          </div>
        </section>

        {/* Interactive Developer Console Section */}
        <section id="console" className="py-20 w-full bg-black border-b border-white/5 relative z-10">
          <div className="mx-auto max-w-7xl px-6 flex flex-col gap-8 animate-slide-up animation-delay-300">
            <div className="flex flex-col gap-2 max-w-2xl">
              <span className="text-xs font-mono font-bold uppercase tracking-widest text-[#2E54FE]">[ SANDBOX ]</span>
              <h2 className="text-3xl md:text-4xl font-extrabold text-white tracking-tight">Developer Console</h2>
              <p className="text-sm text-[#cbd5e1]/80 leading-relaxed">
                Interact directly with my workspace. Type commands in the terminal widget below to query information in real-time.
              </p>
            </div>

            {/* Terminal Widget */}
            <div className="w-full max-w-3xl mx-auto rounded-xl border border-white/5 bg-[#0b0b0b] shadow-2xl overflow-hidden hover:border-[#2E54FE]/40 transition-all duration-300">
              {/* Header */}
              <div className="flex items-center justify-between bg-black/60 px-4 py-3 border-b border-white/5">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-rose-500" />
                  <div className="w-3 h-3 rounded-full bg-amber-500" />
                  <div className="w-3 h-3 rounded-full bg-emerald-500" />
                  <span className="text-xs font-mono text-[#cbd5e1]/60 ml-2">chaitanya_workspace.sh</span>
                </div>
                <Terminal className="w-4 h-4 text-[#cbd5e1]/50" />
              </div>

              {/* Console Log */}
              <div className="p-5 h-64 overflow-y-auto font-mono text-sm flex flex-col gap-2.5">
                {terminalHistory.map((item, idx) => (
                  <div 
                    key={idx} 
                    className={`whitespace-pre-line leading-relaxed ${
                      item.type === "command" 
                        ? "text-[#2E54FE] font-bold" 
                        : item.type === "error" 
                          ? "text-rose-400" 
                          : "text-[#cbd5e1]"
                    }`}
                  >
                    {item.text}
                  </div>
                ))}
                <div ref={terminalEndRef} />
              </div>

              {/* Input Line */}
              <form onSubmit={handleTerminalSubmit} className="flex items-center border-t border-white/5 bg-black px-5 py-3">
                <ChevronRight className="w-4 h-4 text-[#2E54FE] shrink-0 mr-1.5" />
                <input
                  type="text"
                  value={terminalInput}
                  onChange={(e) => setTerminalInput(e.target.value)}
                  placeholder="Type 'help' and press Enter..."
                  className="w-full bg-transparent border-0 outline-hidden font-mono text-sm text-white placeholder:text-[#cbd5e1]/30"
                />
              </form>
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section id="contact" className="py-20 w-full bg-black relative overflow-hidden z-10">
          <div className="mx-auto max-w-7xl px-6 grid grid-cols-1 lg:grid-cols-12 gap-16 animate-slide-up animation-delay-500">
            
            {/* Info Details / Left Column */}
            <div className="lg:col-span-5 flex flex-col justify-between gap-12">
              <div className="flex flex-col gap-6">
                <div className="flex flex-col gap-2">
                  <span className="text-xs font-mono font-bold uppercase tracking-widest text-[#2E54FE]">[ COLLABORATION ]</span>
                  <h2 className="text-3xl md:text-4xl font-extrabold text-white tracking-tight">Let&apos;s build something</h2>
                </div>
                <p className="text-sm text-[#cbd5e1]/80 leading-relaxed">
                  If you have an upcoming project, a freelance contract, or just want to chat about dev stack details, get in touch!
                </p>
              </div>

              {/* Interactive Email Copy Button */}
              <div className="flex flex-col gap-4">
                <span className="text-xs font-mono font-semibold text-[#cbd5e1]/60 uppercase tracking-widest">Direct Contact</span>
                <div className="flex items-center gap-2 p-1.5 pl-4 rounded-xl border border-white/5 bg-[#0b0b0b] shadow-sm max-w-xs w-full">
                  <Mail className="w-4 h-4 text-[#cbd5e1]/60 shrink-0" />
                  <code className="text-xs font-mono text-white select-all grow text-left">chaitanyajidigum@gmail.com</code>
                  <button 
                    onClick={copyEmailAddress}
                    className="flex items-center justify-center p-1.5 rounded-lg text-xs font-medium bg-black hover:bg-neutral-900 text-[#cbd5e1] border border-white/10 transition-all active:scale-95 shrink-0"
                    title="Copy Email Address"
                  >
                    {copiedEmail ? (
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
                    ) : (
                      <Copy className="w-3.5 h-3.5" />
                    )}
                  </button>
                </div>

                {/* Resume download link */}
                <a 
                  href="/resume.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-xs font-semibold text-[#cbd5e1]/75 hover:text-[#2E54FE] transition-colors w-fit mt-1"
                >
                  <FileText className="w-4 h-4" />
                  <span>Download Resume (PDF)</span>
                </a>
              </div>
            </div>

            {/* Direct Message Form / Right Column */}
            <div className="lg:col-span-7">
              <form 
                onSubmit={handleContactSubmit}
                className="p-6 md:p-8 rounded-2xl border border-white/5 bg-[#0b0b0b] flex flex-col gap-5 hover:border-[#2E54FE]/20 transition-all duration-300"
              >
                <h3 className="text-lg font-bold text-white mb-1">Send a Message</h3>
                
                <div className="flex flex-col gap-1.5">
                  <label htmlFor="form-name" className="text-xs font-mono font-semibold text-[#cbd5e1]/60 uppercase tracking-wider">Your Name</label>
                  <input
                    id="form-name"
                    type="text"
                    required
                    value={formState.name}
                    onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                    placeholder="John Doe"
                    className="w-full rounded-lg border border-white/10 bg-black px-4 py-2.5 text-sm text-white placeholder:text-[#cbd5e1]/30 focus:border-[#2E54FE] focus:outline-hidden focus:ring-1 focus:ring-[#2E54FE]/25 transition-all"
                  />
                </div>

                <div className="flex flex-col gap-1.5">
                  <label htmlFor="form-email" className="text-xs font-mono font-semibold text-[#cbd5e1]/60 uppercase tracking-wider">Email Address</label>
                  <input
                    id="form-email"
                    type="email"
                    required
                    value={formState.email}
                    onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                    placeholder="john@example.com"
                    className="w-full rounded-lg border border-white/10 bg-black px-4 py-2.5 text-sm text-white placeholder:text-[#cbd5e1]/30 focus:border-[#2E54FE] focus:outline-hidden focus:ring-1 focus:ring-[#2E54FE]/25 transition-all"
                  />
                </div>

                <div className="flex flex-col gap-1.5">
                  <label htmlFor="form-message" className="text-xs font-mono font-semibold text-[#cbd5e1]/60 uppercase tracking-wider">Message</label>
                  <textarea
                    id="form-message"
                    required
                    rows={4}
                    value={formState.message}
                    onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                    placeholder="Hello, I would like to discuss..."
                    className="w-full rounded-lg border border-white/10 bg-black px-4 py-2.5 text-sm text-white placeholder:text-[#cbd5e1]/30 focus:border-[#2E54FE] focus:outline-hidden focus:ring-1 focus:ring-[#2E54FE]/25 transition-all resize-none"
                  />
                </div>

                <button 
                  type="submit"
                  className="flex items-center justify-center gap-2 h-11 w-full rounded-lg bg-[#2E54FE] hover:bg-[#1d3dbd] text-white font-semibold text-sm transition-all active:scale-98 glow-blue"
                >
                  {contactSuccess ? (
                    <>
                      <CheckCircle2 className="w-4 h-4 text-white" />
                      <span>Message Sent Successfully!</span>
                    </>
                  ) : (
                    <>
                      <Send className="w-4 h-4" />
                      <span>Send Message</span>
                    </>
                  )}
                </button>
              </form>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="mt-auto border-t border-white/5 bg-black py-8 text-[#cbd5e1]/50 relative z-10 animate-fade-in">
          <div className="mx-auto max-w-7xl px-6 flex flex-col md:flex-row items-center justify-between gap-4 text-xs">
            <div>
              &copy; {new Date().getFullYear()} Chaitanya Jidigum. All rights reserved.
            </div>
            <div className="flex gap-4">
              <a href="https://nextjs.org" className="hover:underline transition-all">Next.js</a>
              <a href="https://tailwindcss.com" className="hover:underline transition-all">Tailwind CSS</a>
              <a href="https://typescriptlang.org" className="hover:underline transition-all">TypeScript</a>
            </div>
          </div>
        </footer>

        {/* Floating Scroll-to-Top Button */}
        {showScrollTop && (
          <button
            onClick={scrollToTop}
            className="fixed bottom-6 right-6 z-50 flex h-10 w-10 items-center justify-center rounded-full bg-black/85 text-[#cbd5e1] border border-white/10 hover:border-[#2E54FE] hover:text-[#2E54FE] shadow-[0_0_15px_rgba(46,84,254,0.15)] transition-all duration-300 hover:scale-110 active:scale-95 animate-fade-in group cursor-pointer"
            aria-label="Scroll to Top"
          >
            <ArrowUp className="w-5 h-5 group-hover:-translate-y-0.5 transition-transform" />
          </button>
        )}
      </div>
    </div>
  );
}
