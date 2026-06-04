"use client";

import { useState } from "react";
import { ArrowUpRight } from "lucide-react";

interface Project {
  title: string;
  description: string;
  tags: string[];
  category: "all" | "frontend" | "fullstack" | "ml_ai";
  github: string;
  live: string;
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

export default function ProjectsPage() {
  const [activeProjectTab, setActiveProjectTab] = useState<"all" | "frontend" | "fullstack" | "ml_ai">("all");

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
    <section className="py-20 w-full min-h-screen bg-black flex flex-col items-center">
      <div className="mx-auto max-w-7xl px-6 flex flex-col gap-12 animate-slide-up w-full">
        {/* Header Block */}
        <div className="flex flex-col md:flex-row items-start md:items-end justify-between gap-6">
          <div className="flex flex-col gap-2">
            <span className="text-xs font-mono font-bold uppercase tracking-widest text-[#2E54FE]">[ PORTFOLIO ]</span>
            <h1 className="text-4xl md:text-5xl font-extrabold text-white tracking-tight">Projects</h1>
            <p className="text-sm text-[#cbd5e1]/80 max-w-xl leading-relaxed mt-2">
              A gallery of software products, automated systems, and predictive tools built with high responsiveness and attention to visual consistency.
            </p>
          </div>

          {/* Project Filters */}
          <div className="flex border border-white/5 bg-[#0b0b0b] p-1.5 rounded-xl gap-1 shrink-0">
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
  );
}
