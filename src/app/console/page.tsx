"use client";

import { useState, useRef, useEffect } from "react";
import { Terminal, ChevronRight, RotateCcw } from "lucide-react";

interface TerminalEntry {
  text: string;
  type: "command" | "output" | "error";
}

const INIT_HISTORY: TerminalEntry[] = [
  { text: "Chaitanya Jidigum's workspace console — v1.0.0", type: "output" },
  { text: "Type 'help' to see available commands.", type: "output" },
];

export default function ConsolePage() {
  const [input, setInput] = useState("");
  const [history, setHistory] = useState<TerminalEntry[]>(INIT_HISTORY);
  const endRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const isInitialMount = useRef(true);

  useEffect(() => {
    if (isInitialMount.current) {
      isInitialMount.current = false;
      return;
    }
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [history]);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" });
    inputRef.current?.focus({ preventScroll: true });
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const cmd = input.trim().toLowerCase();
    if (!cmd) return;

    const next: TerminalEntry[] = [...history, { text: `visitor@cj:~$ ${input}`, type: "command" }];

    switch (cmd) {
      case "help":
        next.push({
          text: "Commands:\n  about      Bio and background\n  skills     Tech stack and libraries\n  projects   Portfolio highlights\n  contact    Contact info\n  clear      Reset terminal",
          type: "output",
        });
        break;
      case "about":
        next.push({
          text: "Chaitanya Jidigum — Computer Science & Engineering Student\nSpecializing in Machine Learning and Computer Vision.\nCoordinator for CSE (IoT) Department.\nLocation: Hyderabad, India  ·  B.Tech CSE (8.69 CGPA)",
          type: "output",
        });
        break;
      case "skills":
        next.push({
          text: "Languages  → C, C++, C#, Python, Java, JavaScript, HTML, CSS, Tailwind CSS, Dart\nFrameworks → MongoDB, Express.Js, React.Js, Node.Js, Next.Js, Discord.Js, Tensorflow, Matplotlib, Pandas\nTools/Tech → Android Studio, Git, VS Code, Antigravity IDE, Unreal Engine, Flutter, MySQL Workbench, Jupyter, Selenium\nOther      → AWS, RESTful API, YouTube/Discord API, Windows, Linux, Mac OS, Android",
          type: "output",
        });
        break;
      case "projects":
        next.push({
          text: "1. Airfare Prices Prediction Using Machine Learning   [ML / Regression]\n2. Using Existing CCTV Network for Crowd Management    [AI / Computer Vision]\n3. IoT Campus Events Dashboard                         [Frontend / MySQL]\n4. Web Automation & Scraping Suite                     [Selenium / Python]",
          type: "output",
        });
        break;
      case "contact":
        next.push({
          text: "Email   → chaitanyajidigum@gmail.com\nGitHub  → github.com/ChaitanyaJidigum\nLinkedIn→ linkedin.com/in/chaitanya-jidigum-082091268",
          type: "output",
        });
        break;
      case "clear":
        setHistory([]);
        setInput("");
        return;
      default:
        next.push({
          text: `bash: ${cmd}: command not found. Try 'help'.`,
          type: "error",
        });
    }

    setHistory(next);
    setInput("");
  };

  return (
    <section className="py-20 md:py-28 w-full min-h-screen">
      <div className="mx-auto max-w-5xl px-5 sm:px-8 flex flex-col gap-10 animate-slide-up w-full">

        {/* ── Header ──────────────────────────────── */}
        <div className="flex flex-col gap-3 border-b border-white/5 pb-10">
          <span className="text-[10px] font-mono font-bold uppercase tracking-[0.2em] text-[#2E54FE]">Sandbox</span>
          <h1 className="text-4xl md:text-6xl font-black text-white tracking-tighter leading-none">Console</h1>
          <p className="text-sm text-[#cbd5e1]/55 max-w-md leading-relaxed mt-1">
            An interactive terminal to query my resume details in real-time. Type <code className="font-mono text-[#2E54FE]">help</code> to get started.
          </p>
        </div>

        {/* ── Terminal Widget ──────────────────────── */}
        <div className="w-full rounded-xl border border-white/5 hover:border-[#2E54FE]/25 overflow-hidden transition-all duration-300 shadow-2xl shadow-black/40">

          {/* Toolbar */}
          <div className="flex items-center justify-between px-4 py-3 border-b border-white/5 bg-white/[0.02]">
            <div className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-rose-500/80" />
              <span className="w-2.5 h-2.5 rounded-full bg-amber-500/80" />
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/80" />
              <span className="text-[11px] font-mono text-[#cbd5e1]/35 ml-3">chaitanya_workspace — bash</span>
            </div>
            <div className="flex items-center gap-3">
              <Terminal className="w-3.5 h-3.5 text-[#cbd5e1]/30" />
              <button
                onClick={() => setHistory(INIT_HISTORY)}
                className="text-[#cbd5e1]/30 hover:text-[#2E54FE] transition-colors cursor-pointer"
                title="Reset terminal"
              >
                <RotateCcw className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Log area */}
          <div className="p-5 h-72 md:h-[26rem] overflow-y-auto font-mono text-[13px] flex flex-col gap-3 leading-relaxed">
            {history.map((entry, i) => (
              <div
                key={i}
                className={`whitespace-pre-line ${
                  entry.type === "command"
                    ? "text-[#2E54FE]"
                    : entry.type === "error"
                    ? "text-rose-400/90"
                    : "text-[#cbd5e1]/75"
                }`}
              >
                {entry.text}
              </div>
            ))}
            <div ref={endRef} />
          </div>

          {/* Input row */}
          <form
            onSubmit={handleSubmit}
            className="flex items-center border-t border-white/5 bg-white/[0.015] px-5 py-3 gap-2"
          >
            <ChevronRight className="w-3.5 h-3.5 text-[#2E54FE] shrink-0" />
            <input
              ref={inputRef}
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="enter command..."
              className="w-full bg-transparent border-none outline-none font-mono text-[13px] text-white placeholder:text-[#cbd5e1]/20 focus:outline-none"
            />
          </form>
        </div>

        {/* Quick hints */}
        <div className="flex flex-wrap gap-2">
          {["help", "about", "skills", "projects", "contact", "clear"].map((cmd) => (
            <button
              key={cmd}
              onClick={() => {
                setInput(cmd);
                inputRef.current?.focus({ preventScroll: true });
              }}
              className="px-3 py-1 rounded-md text-[10px] font-mono text-[#cbd5e1]/35 border border-white/5 hover:border-[#2E54FE]/25 hover:text-[#2E54FE] transition-all cursor-pointer"
            >
              {cmd}
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
