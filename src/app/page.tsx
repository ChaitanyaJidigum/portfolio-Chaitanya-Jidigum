"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

// Custom typewriter effect component
function TypewriterEffect() {
  const [text, setText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const [loopNum, setLoopNum] = useState(0);
  const [typingSpeed, setTypingSpeed] = useState(120);

  useEffect(() => {
    const phrases = [
      "an AI ENGINEER",
      "a SOFTWARE ENGINEER",
      "a FULLSTACK DEVELOPER",
      "a WEB DEVELOPER",
      "an APP DEVELOPER",
      "a GAME DEVELOPER",
      "a VIDEO EDITOR",
      "a PHOTO EDITOR"
    ];
    const currentPhrase = phrases[loopNum % phrases.length];

    const handleType = () => {
      if (!isDeleting) {
        // Typing
        setText(currentPhrase.substring(0, text.length + 1));
        setTypingSpeed(100 + Math.random() * 40);

        if (text === currentPhrase) {
          // Pause when word is complete
          setTypingSpeed(1800);
          setIsDeleting(true);
        }
      } else {
        // Deleting
        setText(currentPhrase.substring(0, text.length - 1));
        setTypingSpeed(45); // faster backspacing

        if (text === "") {
          setIsDeleting(false);
          setLoopNum(loopNum + 1);
          setTypingSpeed(600); // pause before next word
        }
      }
    };

    const timer = setTimeout(handleType, typingSpeed);
    return () => clearTimeout(timer);
  }, [text, isDeleting, loopNum, typingSpeed]);

  return (
    <span className="relative font-bold text-white">
      <span>{text}</span>
      <span className="ml-1 inline-block w-[2.5px] h-4 sm:h-5 bg-[#2E54FE] animate-[pulse_0.75s_infinite] align-middle" />
    </span>
  );
}

export default function Home() {
  const portalLinks = [
    {
      name: "About Me",
      desc: "Academic background, role highlights, and professional journey timeline.",
      href: "/about"
    },
    {
      name: "Projects",
      desc: "Portfolio of ML platforms, automated test scrapers, and frontend applications.",
      href: "/projects"
    },
    {
      name: "Skills",
      desc: "Categorized overview of engineering toolsets, languages, and frameworks.",
      href: "/skills"
    },
    {
      name: "Console",
      desc: "Interactive developer terminal to query resume data live in browser.",
      href: "/console"
    },
    {
      name: "Contact",
      desc: "Freelance contracts, collaborations, and contact channels.",
      href: "/contact"
    }
  ];

  return (
    <div className="flex flex-col grow justify-center items-center py-12 sm:py-20 animate-slide-up">
      {/* ── Landing Page Main Hero (Minimal Layout) ──────── */}
      <section className="mx-auto max-w-5xl px-5 sm:px-8 w-full flex flex-col items-center text-center gap-10">
        
        {/* Centered square C logo (9th image layout) */}
        <div className="flex flex-col items-center gap-5">
          <div 
            className="w-24 h-24 sm:w-28 sm:h-28 flex items-center justify-center text-white relative"
            style={{ filter: "drop-shadow(0 0 25px rgba(46, 84, 254, 0.4))" }}
          >
            <svg viewBox="0 0 100 100" className="w-full h-full fill-white">
              <path d="M 10 10 H 90 V 30 H 30 V 70 H 90 V 90 H 10 Z" />
            </svg>
          </div>

          <div className="flex flex-col items-center gap-1 text-center tracking-[0.35em] mt-1">
            <h2 className="text-lg sm:text-xl font-black uppercase tracking-[0.45em] text-white">Chaitanya</h2>
            <span className="text-[9px] font-mono text-[#cbd5e1]/45 uppercase tracking-[0.25em]">Engineer &bull; Developer</span>
          </div>
        </div>

        {/* Centered Name and Typewriter Profession */}
        <div className="flex flex-col gap-3 max-w-xl">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-white tracking-tighter leading-none">
            Chaitanya Jidigum
          </h1>
          <p className="text-sm sm:text-base font-mono text-[#cbd5e1]/60 leading-relaxed">
            I am <TypewriterEffect />
          </p>
        </div>

        {/* Portal Navigator Links */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5 w-full max-w-4xl mt-6">
          {portalLinks.map((link, idx) => (
            <Link
              key={idx}
              href={link.href}
              className="group relative flex flex-col gap-3 p-5 rounded-xl border border-white/5 bg-white/[0.015] hover:border-[#2E54FE]/30 transition-all duration-300 hover:bg-[#2E54FE]/[0.02] hover-lift text-left"
            >
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-bold text-white group-hover:text-[#2E54FE] transition-colors leading-snug">
                  {link.name}
                </h3>
                <ArrowRight className="w-3.5 h-3.5 text-[#cbd5e1]/40 group-hover:text-[#2E54FE] group-hover:translate-x-1 transition-all" />
              </div>
              <p className="text-xs text-[#cbd5e1]/55 leading-relaxed">
                {link.desc}
              </p>
            </Link>
          ))}
        </div>

      </section>
    </div>
  );
}
