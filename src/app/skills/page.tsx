"use client";

import { Cpu, Eye, Code2, Database } from "lucide-react";

const skillGroups = [
  {
    icon: Cpu,
    title: "Python & Machine Learning",
    summary: "Regression models, data manipulation, feature scaling, and predictive analytics pipelines.",
    tools: ["Python", "Pandas", "NumPy", "Scikit-Learn", "Jupyter Notebook", "Regression Analysis"],
  },
  {
    icon: Eye,
    title: "Computer Vision & AI",
    summary: "CCTV-based monitoring systems, object tracking, crowd density analysis via convolutional networks.",
    tools: ["OpenCV", "Transfer Learning", "CNNs", "Image Classification", "Object Detection"],
  },
  {
    icon: Code2,
    title: "Programming Languages",
    summary: "Proficient across systems and scripting languages with emphasis on clean, maintainable code.",
    tools: ["Python", "Java", "C++", "C", "JavaScript (ES6)", "HTML5", "CSS3"],
  },
  {
    icon: Database,
    title: "Databases & Automation",
    summary: "Relational schema design, query optimization, and Selenium-based browser automation workflows.",
    tools: ["MySQL", "MySQL Workbench", "Selenium", "Web Scraping", "Test Automation"],
  },
];

export default function SkillsPage() {
  return (
    <section className="py-20 md:py-28 w-full min-h-screen">
      <div className="mx-auto max-w-5xl px-5 sm:px-8 flex flex-col gap-12 animate-slide-up w-full">

        {/* ── Header ──────────────────────────────── */}
        <div className="flex flex-col gap-3 border-b border-white/5 pb-10">
          <span className="text-[10px] font-mono font-bold uppercase tracking-[0.2em] text-[#2E54FE]">Expertise</span>
          <h1 className="text-4xl md:text-6xl font-black text-white tracking-tighter leading-none">Tech Stack</h1>
          <p className="text-sm text-[#cbd5e1]/55 max-w-md leading-relaxed mt-1">
            A focused set of technologies I use in production — from data science pipelines to web interfaces and automation frameworks.
          </p>
        </div>

        {/* ── Skills Grid ─────────────────────────── */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {skillGroups.map((skill, i) => {
            const Icon = skill.icon;
            return (
              <div
                key={i}
                className="group flex flex-col gap-5 p-6 rounded-xl border border-white/5 hover:border-[#2E54FE]/30 transition-all duration-300 hover-lift hover:bg-[#2E54FE]/[0.02]"
              >
                {/* Icon */}
                <div className="w-9 h-9 rounded-lg bg-[#2E54FE]/10 flex items-center justify-center text-[#2E54FE] group-hover:bg-[#2E54FE]/20 transition-colors">
                  <Icon className="w-4.5 h-4.5" strokeWidth={1.75} />
                </div>

                {/* Text */}
                <div className="flex flex-col gap-1.5">
                  <h3 className="text-[15px] font-bold text-white leading-snug">{skill.title}</h3>
                  <p className="text-xs text-[#cbd5e1]/55 leading-relaxed">{skill.summary}</p>
                </div>

                {/* Tools */}
                <div className="flex flex-wrap gap-1.5 pt-3 border-t border-white/5 mt-auto">
                  {skill.tools.map((tool, ti) => (
                    <span
                      key={ti}
                      className="px-2 py-0.5 rounded text-[10px] font-mono text-[#cbd5e1]/50 border border-white/5 group-hover:border-[#2E54FE]/15 group-hover:text-[#cbd5e1]/70 transition-all"
                    >
                      {tool}
                    </span>
                  ))}
                </div>
              </div>
            );
          })}
        </div>

        {/* ── Additional tools row ────────────────── */}
        <div className="flex flex-col gap-4 pt-2">
          <span className="text-[10px] font-mono font-bold uppercase tracking-[0.2em] text-[#cbd5e1]/30">Also familiar with</span>
          <div className="flex flex-wrap gap-2">
            {["Eclipse IDE", "Ubuntu", "Windows", "Git", "VS Code", "REST APIs", "OOP Principles", "Agile"].map((t, i) => (
              <span key={i} className="px-3 py-1 rounded-md text-[10px] font-mono text-[#cbd5e1]/40 border border-white/5">
                {t}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
