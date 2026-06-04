"use client";

import { Cpu, Palette, Code2, Layers } from "lucide-react";

export default function SkillsPage() {
  return (
    <section className="py-16 md:py-20 w-full min-h-screen flex flex-col items-center">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 flex flex-col gap-10 md:gap-12 animate-slide-up w-full">
        {/* Title Block */}
        <div className="flex flex-col gap-2 max-w-2xl">
          <span className="text-xs font-mono font-bold uppercase tracking-widest text-[#2E54FE]">[ CORE COMPETENCY ]</span>
          <h1 className="text-4xl md:text-5xl font-extrabold text-white tracking-tight">Technical Stack</h1>
          <p className="text-sm text-[#cbd5e1]/80 leading-relaxed mt-2">
            A comprehensive matrix of programming languages, machine learning frameworks, data management systems, and automated test libraries that I work with daily.
          </p>
        </div>

        {/* Competencies Matrix */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-8 mt-4">
          <div className="p-6 sm:p-8 rounded-2xl border border-white/5 bg-[#0b0b0b] hover:border-[#2E54FE]/30 transition-all group hover-lift flex flex-col justify-between">
            <div>
              <div className="w-10 h-10 rounded-xl bg-[#2E54FE]/10 flex items-center justify-center text-[#2E54FE] mb-4 group-hover:scale-105 transition-transform">
                <Cpu className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-white text-lg mb-2">Python & Machine Learning</h3>
              <p className="text-sm text-[#cbd5e1]/80 leading-relaxed mb-6">
                Specialized in training regression models, data manipulation, and feature scaling. Skilled at interpreting dataset variance to construct highly accurate predictive curves.
              </p>
            </div>
            <div className="text-xs font-mono text-[#cbd5e1]/50 border-t border-white/5 pt-4">
              Libraries: Pandas, NumPy, Scikit-Learn, Regression Analysis
            </div>
          </div>

          <div className="p-6 sm:p-8 rounded-2xl border border-white/5 bg-[#0b0b0b] hover:border-[#2E54FE]/30 transition-all group hover-lift flex flex-col justify-between">
            <div>
              <div className="w-10 h-10 rounded-xl bg-[#2E54FE]/10 flex items-center justify-center text-[#2E54FE] mb-4 group-hover:scale-105 transition-transform">
                <Palette className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-white text-lg mb-2">Computer Vision & AI</h3>
              <p className="text-sm text-[#cbd5e1]/80 leading-relaxed mb-6">
                Experienced in designing monitoring systems using CCTV feeds. Leveraging transfer learning models and convolutional structures to parse crowd densities and active objects.
              </p>
            </div>
            <div className="text-xs font-mono text-[#cbd5e1]/50 border-t border-white/5 pt-4">
              Libraries: OpenCV, Neural Networks, Image Classification, Object Tracking
            </div>
          </div>

          <div className="p-6 sm:p-8 rounded-2xl border border-white/5 bg-[#0b0b0b] hover:border-[#2E54FE]/30 transition-all group hover-lift flex flex-col justify-between">
            <div>
              <div className="w-10 h-10 rounded-xl bg-[#2E54FE]/10 flex items-center justify-center text-[#2E54FE] mb-4 group-hover:scale-105 transition-transform">
                <Code2 className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-white text-lg mb-2">Programming Languages</h3>
              <p className="text-sm text-[#cbd5e1]/80 leading-relaxed mb-6">
                Fluent across both low-level system designs and modern high-level script architectures. Emphasizing clean structure, object-oriented concepts, and memory efficiency.
              </p>
            </div>
            <div className="text-xs font-mono text-[#cbd5e1]/50 border-t border-white/5 pt-4">
              Languages: Python, Java, C++, C, HTML5, CSS3, JavaScript (ES6)
            </div>
          </div>

          <div className="p-6 sm:p-8 rounded-2xl border border-white/5 bg-[#0b0b0b] hover:border-[#2E54FE]/30 transition-all group hover-lift flex flex-col justify-between">
            <div>
              <div className="w-10 h-10 rounded-xl bg-[#2E54FE]/10 flex items-center justify-center text-[#2E54FE] mb-4 group-hover:scale-105 transition-transform">
                <Layers className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-white text-lg mb-2">Database & Automation</h3>
              <p className="text-sm text-[#cbd5e1]/80 leading-relaxed mb-6">
                Specialized in configuring relational schemas with MySQL, optimizing indexes, and writing browser driver scrapers with Selenium to automate regression workflows.
              </p>
            </div>
            <div className="text-xs font-mono text-[#cbd5e1]/50 border-t border-white/5 pt-4">
              Tools: MySQL Workbench, Relational Modeling, Selenium, Web Scraping
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
