"use client";

import React from "react";
import { Brain, Code2, Database, Layers } from "lucide-react";

const skillGroups = [
  {
    icon: Code2,
    title: "Programming Languages & Web Engineering",
    summary: "Languages and frameworks for building responsive web applications, interactive layouts, and cross-platform developer tools.",
    tools: ["C", "C++", "C#", "Python", "Java", "JavaScript", "HTML", "CSS", "Tailwind CSS", "Dart", "MERN (MongoDB, Express, React, Node)", "Next.Js"],
    featured: true,
  },
  {
    icon: Brain,
    title: "AI, Machine Learning & Data Science",
    summary: "Building predictive ML models, regression analytics, training computer vision surveillance systems, transfer learning, and deep neural networks.",
    tools: ["Python", "Tensorflow", "Matplotlib", "Pandas", "Jupyter Notebook", "OpenCV", "Regression Analysis", "Transfer Learning"],
    featured: true,
  },
  {
    icon: Layers,
    title: "Tools, Technologies & Environments",
    summary: "Mobile app frameworks, game engines, version control platforms, web automation utilities, and native operating environments.",
    tools: ["Android Studio", "Git", "Visual Studio Code", "Antigravity IDE", "Unreal Engine", "Flutter", "My SQL Workbench", "Selenium (Basics)", "Windows", "Linux", "Mac OS", "Android"],
  },
  {
    icon: Database,
    title: "Cloud, Databases & Integrations",
    summary: "Relational database schema modeling, cloud platforms, custom REST web APIs, chat bots, and payment gateway gateways.",
    tools: ["My SQL", "AWS", "RESTful API", "YouTube API", "Discord API", "Discord.Js", "Payment Gateways"],
  }
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
            My engineering tools and specializations — featuring data science pipelines, deep learning computer vision, and high-performance web interfaces.
          </p>
        </div>

        {/* ── Skills Grid ─────────────────────────── */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {skillGroups.map((skill, i) => {
            const Icon = skill.icon;
            const isFeatured = skill.featured;
            return (
              <div
                key={i}
                className={`group flex flex-col gap-5 p-6 md:p-8 rounded-xl border transition-all duration-300 hover-lift relative overflow-hidden ${
                  isFeatured
                    ? "border-[#2E54FE]/40 bg-gradient-to-br from-[#2E54FE]/[0.04] to-transparent shadow-[0_0_25px_rgba(46,84,254,0.08)] hover:bg-[#2E54FE]/[0.08]"
                    : "border-white/5 hover:border-[#2E54FE]/30 hover:bg-[#2E54FE]/[0.02]"
                }`}
              >
                {/* Glowing Background Overlay for Highlights */}
                {isFeatured && (
                  <div className="absolute top-0 right-0 w-24 h-24 bg-[#2E54FE]/5 rounded-full filter blur-xl pointer-events-none" />
                )}

                {/* Highlight Badge */}
                {isFeatured && (
                  <span className="absolute top-6 right-6 px-2.5 py-0.5 rounded-full text-[9px] font-mono font-bold uppercase tracking-wider bg-[#2E54FE]/10 border border-[#2E54FE]/20 text-[#2E54FE]">
                    Highlight
                  </span>
                )}

                {/* Icon */}
                <div className={`w-9 h-9 rounded-lg flex items-center justify-center transition-colors ${
                  isFeatured
                    ? "bg-[#2E54FE]/20 text-[#2E54FE] group-hover:bg-[#2E54FE]/30"
                    : "bg-white/5 text-[#cbd5e1]/70 group-hover:bg-[#2E54FE]/10 group-hover:text-[#2E54FE]"
                }`}>
                  <Icon className="w-[18px] h-[18px]" strokeWidth={1.75} />
                </div>

                {/* Text */}
                <div className="flex flex-col gap-1.5">
                  <h3 className="text-[16px] font-bold text-white leading-snug">{skill.title}</h3>
                  <p className="text-xs text-[#cbd5e1]/55 leading-relaxed">{skill.summary}</p>
                </div>

                {/* Tools */}
                <div className={`flex flex-wrap gap-1.5 pt-4 border-t mt-auto ${
                  isFeatured ? "border-[#2E54FE]/15" : "border-white/5"
                }`}>
                  {skill.tools.map((tool, ti) => (
                    <span
                      key={ti}
                      className={`px-2 py-0.5 rounded text-[10px] font-mono transition-all ${
                        isFeatured
                          ? "text-[#cbd5e1]/80 border border-[#2E54FE]/15 bg-[#2E54FE]/5 group-hover:border-[#2E54FE]/30"
                          : "text-[#cbd5e1]/50 border border-white/5 group-hover:border-[#2E54FE]/15 group-hover:text-[#cbd5e1]/70"
                      }`}
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
          <span className="text-[10px] font-mono font-bold uppercase tracking-[0.2em] text-[#cbd5e1]/30">Productivity, Media & Soft Skills</span>
          <div className="flex flex-wrap gap-2">
            {["MS Word", "MS Excel", "PowerPoint", "Adobe Premier Pro", "Adobe Illustrator", "Communication Skills", "Team Management", "Public Speaking", "Leadership"].map((t, i) => (
              <span key={i} className="px-3 py-1 rounded-md text-[10px] font-mono text-[#cbd5e1]/40 border border-white/5 hover:border-[#2E54FE]/15 transition-all">
                {t}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
