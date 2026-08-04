"use client";

import { useState } from "react";
import { ArrowUpRight } from "lucide-react";

function GithubIcon({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
      <path d="M9 18c-4.51 2-5-2-7-2" />
    </svg>
  );
}

interface Project {
  title: string;
  description: string;
  tags: string[];
  category: "all" | "frontend" | "fullstack" | "ml_ai";
  github: string;
  live: string;
  year: string;
}

const CATEGORIES = [
  { key: "all", label: "All Projects" },
  { key: "ml_ai", label: "AI / ML" },
  { key: "fullstack", label: "Full-Stack" },
  { key: "frontend", label: "Frontend" },
 ] as const;

export default function ProjectsPage() {
  const [activeTab, setActiveTab] = useState<"all" | "frontend" | "fullstack" | "ml_ai">("all");

  const projects: Project[] = [
    {
      title: "Airfare Prices Prediction Using Machine Learning",
      description: "Developed a machine learning model to predict airfare prices, providing a solution to uncertainty in flight pricing. Implemented data preprocessing techniques and feature engineering to improve prediction accuracy.",
      tags: ["Python", "Pandas", "NumPy", "Scikit-Learn", "ML / Regression"],
      category: "ml_ai",
      github: "https://github.com/ChaitanyaJidigum",
      live: "https://github.com/ChaitanyaJidigum",
      year: "2024",
    },
    {
      title: "Using Existing CCTV Network for Crowd Management, Crime Prevention & Work Monitoring Using AI & ML",
      description: "Designed a system monitoring CCTV networks using Machine Learning. Improved model performance by optimizing hyperparameters and utilizing transfer learning techniques for security-related applications.",
      tags: ["Python", "TensorFlow", "OpenCV", "Transfer Learning", "AI & ML"],
      category: "ml_ai",
      github: "https://github.com/ChaitanyaJidigum",
      live: "https://github.com/ChaitanyaJidigum",
      year: "2023",
    },
    {
      title: "IoT Campus Events Dashboard",
      description: "Centralized event management portal for coordinating IoT club activities across the department, tracking 500+ event attendees and streamlining registrations.",
      tags: ["HTML5", "CSS3", "JavaScript", "MySQL", "Event Coordination"],
      category: "frontend",
      github: "https://github.com/ChaitanyaJidigum",
      live: "https://github.com/ChaitanyaJidigum",
      year: "2024",
    },
    {
      title: "Web Automation & Scraping Suite",
      description: "Lightweight automation engine using Selenium to scrape structured web data, validate page states, and execute repetitive testing workflows.",
      tags: ["Python", "Selenium", "MySQL Workbench", "Web Scraping", "Basics"],
      category: "frontend",
      github: "https://github.com/ChaitanyaJidigum",
      live: "https://github.com/ChaitanyaJidigum",
      year: "2022",
    },
  ];

  const filtered = activeTab === "all" ? projects : projects.filter(p => p.category === activeTab);

  return (
    <section className="py-20 md:py-28 w-full min-h-screen">
      <div className="mx-auto max-w-5xl px-5 sm:px-8 flex flex-col gap-12 animate-slide-up w-full">

        {/* ── Header ──────────────────────────────── */}
        <div className="flex flex-col gap-3 border-b border-border pb-10">
          <span className="text-[10px] font-mono font-bold uppercase tracking-[0.2em] text-[#2E54FE]">Portfolio</span>
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div className="flex flex-col gap-2">
              <h1 className="text-4xl md:text-6xl font-black text-foreground tracking-tighter leading-none">Projects</h1>
              <p className="text-sm text-foreground/55 max-w-md leading-relaxed mt-1">
                A selection of software systems, automated pipelines, and predictive models built for real-world use cases.
              </p>
            </div>

            {/* Filter tabs */}
            <div className="flex items-center gap-1 p-1 rounded-lg border border-border bg-white dark:bg-transparent shrink-0 overflow-x-auto">
              {CATEGORIES.map(({ key, label }) => (
                <button
                  key={key}
                  onClick={() => setActiveTab(key as typeof activeTab)}
                  className={`px-3.5 py-1.5 rounded-md text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
                    activeTab === key
                      ? "bg-[#2E54FE] text-white"
                      : "text-foreground/50 hover:text-foreground"
                  }`}
                >
                  {label}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* ── Project Grid ────────────────────────── */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {filtered.map((project, idx) => (
            <div
              key={idx}
              className="group flex flex-col justify-between p-6 rounded-xl border border-border bg-white dark:bg-transparent hover:border-[#2E54FE]/30 transition-all duration-300 hover-lift hover:bg-[#2E54FE]/[0.02]"
            >
              <div className="flex flex-col gap-4">
                {/* Top row */}
                <div className="flex items-center justify-between">
                  <span className="text-[9px] font-mono font-bold uppercase tracking-[0.15em] text-[#2E54FE]/60 border border-[#2E54FE]/15 px-2 py-0.5 rounded">
                    {project.year}
                  </span>
                  <div className="flex gap-1">
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-1.5 rounded-md text-foreground/40 hover:text-[#2E54FE] hover:bg-[#2E54FE]/5 transition-all"
                      title="GitHub"
                    >
                      <GithubIcon className="w-3.5 h-3.5" />
                    </a>
                    <a
                      href={project.live}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-1.5 rounded-md text-foreground/40 hover:text-[#2E54FE] hover:bg-[#2E54FE]/5 transition-all"
                      title="Live"
                    >
                      <ArrowUpRight className="w-3.5 h-3.5" />
                    </a>
                  </div>
                </div>

                {/* Text */}
                <div className="flex flex-col gap-2">
                  <h3 className="text-[15px] font-bold text-foreground group-hover:text-[#2E54FE] transition-colors leading-snug">
                    {project.title}
                  </h3>
                  <p className="text-xs text-foreground/55 leading-relaxed">
                    {project.description}
                  </p>
                </div>
              </div>

              {/* Tags */}
              <div className="flex flex-wrap gap-1.5 mt-5 pt-4 border-t border-border">
                {project.tags.map((tag, ti) => (
                  <span
                    key={ti}
                    className="px-2 py-0.5 rounded text-[10px] font-mono text-foreground/50 border border-border group-hover:border-[#2E54FE]/15 group-hover:text-foreground/70 transition-all"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Count note */}
        <p className="text-[11px] font-mono text-foreground/30 text-center">
          Showing {filtered.length} of {projects.length} projects
        </p>
      </div>
    </section>
  );
}
