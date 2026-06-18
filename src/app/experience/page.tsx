"use client";

import React from "react";
import { Briefcase, MapPin, Award } from "lucide-react";

export default function ExperiencePage() {
  const timeline = [
    {
      period: "2024 — Present",
      role: "Software Developer & IoT Club Coordinator",
      org: "Sri Indu Institute & Freelance",
      location: "Hyderabad, India",
      desc: "Coordinating CSE (IoT) department portals and club databases. Building freelance automation pipelines and custom Next.js portfolio sites for clients.",
      active: true,
      milestones: [
        "Architected department databases improving query speeds by 30%.",
        "Coordinated technical events with 500+ participants.",
        "Delivered 3+ freelance production Next.js apps with optimized lighthouse scores."
      ]
    },
    {
      period: "2022 — Present",
      role: "AI/ML Developer Intern",
      org: "Decibel Systems & Contract Work",
      location: "Bengaluru, India (Remote)",
      desc: "Trained supervised regression models for price forecasting. Designed computer vision surveillance tracking systems using transfer learning.",
      active: true,
      milestones: [
        "Implemented supervised learning pipelines yielding 94% prediction accuracy.",
        "Optimized CNN image classification layers using PyTorch/TensorFlow.",
        "Architected real-time vehicle monitoring dashboards."
      ]
    },
    {
      period: "2020 — Present",
      role: "Web Automation & Software Developer",
      org: "Independent / Academic Projects",
      location: "Hyderabad, India",
      desc: "Built browser automation scrapers with Selenium, configured MySQL relational databases, and developed responsive frontend layouts.",
      active: false,
      milestones: [
        "Engineered web scraper scraping 10,000+ data points daily with rotation proxies.",
        "Designed schemas for CSE database courses using MySQL Workbench.",
        "Created portfolio templates featuring hardware-accelerated animations."
      ]
    },
  ];

  return (
    <section className="relative min-h-screen py-20 md:py-28 w-full">
      <div className="mx-auto max-w-4xl px-5 sm:px-8 flex flex-col gap-16 animate-slide-up w-full">

        {/* ── Page Header ─────────────────────────── */}
        <div className="flex flex-col gap-3 border-b border-white/5 pb-10">
          <span className="text-[10px] font-mono font-bold uppercase tracking-[0.2em] text-[#2E54FE]">My Journey</span>
          <h1 className="text-4xl md:text-6xl font-black text-white tracking-tighter leading-none">Experience</h1>
          <p className="text-sm text-[#cbd5e1]/55 max-w-lg leading-relaxed mt-1">
            A chronological overview of my professional roles, academic coordination, and freelance engineering projects.
          </p>
        </div>

        {/* ── Main Timeline ────────────────────────── */}
        <div className="relative flex flex-col gap-10">
          {/* Vertical central tracking line (aligned to left on mobile, center on md+) */}
          <div className="absolute left-[18px] md:left-1/2 top-4 bottom-4 w-px bg-white/5 md:-translate-x-1/2" />

          {timeline.map((item, idx) => {
            const isEven = idx % 2 === 0;
            return (
              <div 
                key={idx} 
                className={`relative flex flex-col md:flex-row items-stretch gap-6 md:gap-0 ${
                  isEven ? "md:flex-row-reverse" : ""
                }`}
              >
                {/* Timeline node marker */}
                <div className="absolute left-0 md:left-1/2 top-4 z-10 flex h-9 w-9 items-center justify-center -translate-x-[0px] md:-translate-x-1/2">
                  <div className={`flex h-6 w-6 items-center justify-center rounded-full border-2 transition-all duration-300 ${
                    item.active
                      ? "bg-black border-[#2E54FE] shadow-[0_0_15px_rgba(46,84,254,0.6)]"
                      : "bg-[#0b0b0b] border-white/10"
                  }`}>
                    <div className={`h-2 w-2 rounded-full ${item.active ? "bg-[#2E54FE]" : "bg-white/20"}`} />
                  </div>
                </div>

                {/* Content Card (Left or Right side) */}
                <div className="w-full md:w-[45%] pl-10 md:pl-0">
                  <div className="flex flex-col gap-4 p-6 rounded-xl border border-white/5 bg-white/[0.01] hover:border-[#2E54FE]/20 hover:bg-[#2E54FE]/[0.01] transition-all duration-300 group hover:shadow-[0_8px_30px_rgba(0,0,0,0.5)]">
                    <div className="flex flex-col gap-1.5">
                      <span className={`inline-block text-[9px] font-mono font-bold uppercase tracking-wider px-2 py-0.5 rounded border w-fit ${
                        item.active
                          ? "text-[#2E54FE] bg-[#2E54FE]/5 border-[#2E54FE]/15"
                          : "text-[#cbd5e1]/40 bg-white/3 border-white/8"
                      }`}>
                        {item.period}
                      </span>
                      <h3 className="text-base font-bold text-white group-hover:text-[#2E54FE] transition-colors leading-snug">
                        {item.role}
                      </h3>
                      <div className="flex flex-wrap gap-x-3 gap-y-1 text-xs text-[#cbd5e1]/45 font-mono">
                        <span className="flex items-center gap-1"><Briefcase className="w-3 h-3 text-[#cbd5e1]/30" /> {item.org}</span>
                        <span className="flex items-center gap-1"><MapPin className="w-3 h-3 text-[#cbd5e1]/30" /> {item.location}</span>
                      </div>
                    </div>

                    <p className="text-xs text-[#cbd5e1]/65 leading-relaxed border-t border-white/5 pt-3 mt-1">
                      {item.desc}
                    </p>

                    {/* Milestones / Achievements */}
                    <div className="flex flex-col gap-2 mt-2">
                      <span className="text-[9px] font-mono uppercase tracking-widest text-[#2E54FE] font-bold flex items-center gap-1">
                        <Award className="w-3 h-3" /> Key Accomplishments
                      </span>
                      <ul className="flex flex-col gap-1.5 pl-1.5 text-xs text-[#cbd5e1]/55 list-none">
                        {item.milestones.map((m, mIdx) => (
                          <li key={mIdx} className="relative pl-3.5 leading-relaxed">
                            <span className="absolute left-0 top-1.5 w-1 h-1 rounded-full bg-[#2E54FE]" />
                            {m}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>

                {/* Empty Spacer Column for Desktop */}
                <div className="hidden md:block w-[10%]" />
                <div className="hidden md:block w-[45%]" />
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
