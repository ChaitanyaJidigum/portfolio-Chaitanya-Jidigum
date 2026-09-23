"use client";

import { useState, useRef, useEffect } from "react";
import { Terminal, ChevronRight, RotateCcw } from "lucide-react";
import { HUMOR_CONFIG } from "@/lib/humorConfig";

interface TerminalEntry {
  text: string;
  type: "command" | "output" | "error";
}

const INIT_HISTORY: TerminalEntry[] = [
  { text: "Chaitanya Jidigum's workspace console — v1.0.0", type: "output" },
  { text: "CONNECTION ESTABLISHED. Human operator detected.", type: "output" },
  { text: "Type 'help' to see available commands.", type: "output" },
];

export default function ConsolePage() {
  const [input, setInput] = useState("");
  const [history, setHistory] = useState<TerminalEntry[]>(INIT_HISTORY);
  const [commandHistory, setCommandHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState<number>(-1);

  const logContainerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const isInitialMount = useRef(true);
  const isNearBottomRef = useRef(true);

  // Track if user is near bottom of the terminal output
  const handleLogScroll = () => {
    const el = logContainerRef.current;
    if (!el) return;
    const distanceFromBottom = el.scrollHeight - el.scrollTop - el.clientHeight;
    isNearBottomRef.current = distanceFromBottom < 48;
  };

  // Auto-scroll only when user is already near the bottom
  useEffect(() => {
    if (isInitialMount.current) {
      isInitialMount.current = false;
      return;
    }
    const el = logContainerRef.current;
    if (el && isNearBottomRef.current) {
      el.scrollTo({ top: el.scrollHeight, behavior: "smooth" });
    }
  }, [history]);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" });
    inputRef.current?.focus({ preventScroll: true });
  }, []);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "ArrowUp") {
      e.preventDefault();
      if (commandHistory.length === 0) return;
      const newIndex = historyIndex === -1 ? commandHistory.length - 1 : Math.max(0, historyIndex - 1);
      setHistoryIndex(newIndex);
      setInput(commandHistory[newIndex]);
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      if (historyIndex === -1) return;
      const newIndex = historyIndex + 1;
      if (newIndex >= commandHistory.length) {
        setHistoryIndex(-1);
        setInput("");
      } else {
        setHistoryIndex(newIndex);
        setInput(commandHistory[newIndex]);
      }
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmedInput = input.trim();
    if (!trimmedInput) return;

    const cmd = trimmedInput.toLowerCase();

    // Record in history buffer for arrow-up / arrow-down navigation
    setCommandHistory((prev) => [...prev, trimmedInput]);
    setHistoryIndex(-1);

    // When the user executes a command, ensure the new output is scrolled into view
    isNearBottomRef.current = true;

    const next: TerminalEntry[] = [...history, { text: `visitor@cj:~$ ${input}`, type: "command" }];

    switch (cmd) {
      case "help":
        next.push({
          text: HUMOR_CONFIG.console.helpExtension,
          type: "output",
        });
        break;
      case "about":
        next.push({
          text: `BIOGRAPHY

  Name       → Chaitanya Jidigum
  Role       → Computer Science & Engineering Student
  Focus      → Machine Learning & Computer Vision
  Position   → Coordinator, CSE (IoT) Department
  Location   → Hyderabad, India
  Academics  → B.Tech CSE (8.69 CGPA)`,
          type: "output",
        });
        break;
      case "skills":
        next.push({
          text: `TECH STACK & CAPABILITIES

  Languages   → C, C++, C#, Python, Java, JavaScript, HTML, CSS, Tailwind CSS, Dart
  Frameworks  → MongoDB, Express.js, React.js, Node.js, Next.js, Discord.js, TensorFlow, Pandas
  Tools/Tech  → Android Studio, Git, VS Code, Antigravity IDE, Unreal Engine, Flutter, MySQL Workbench
  Cloud/API   → AWS, RESTful API, YouTube API, Discord API, Payment Gateways
  Environments→ Windows, Linux, macOS, Android`,
          type: "output",
        });
        break;
      case "projects":
        next.push({
          text: `FEATURED PROJECTS

  1. Agent-Forge — AI Engineering Workspace
     Category: AI / Systems  ·  FastAPI, LangGraph, Gemini, Next.js  ·  GitHub

  2. Atlas-go — Map Exploration & Territory Game
     Category: Fullstack / Geo  ·  MapLibre GL, Uber H3, Next.js  ·  GitHub

  3. C_GAINS — Performance & Workout Intelligence
     Category: Mobile / App  ·  Flutter, Dart, AI Foundation  ·  GitHub

  4. Developer Portfolio & Telemetry Terminal
     Category: Frontend / System  ·  Next.js, TypeScript, Three.js  ·  Live & GitHub

  5. E-Commerce QA Automation & Test Suite
     Category: Automation / Testing  ·  Selenium, Pytest, Python  ·  GitHub

  6. Airfare Prices Prediction Using Machine Learning
     Category: ML / Regression  ·  Python, Scikit-Learn  ·  Academic Research

  7. Existing CCTV Network for Crowd Management & Surveillance
     Category: AI / Computer Vision  ·  TensorFlow, OpenCV  ·  Academic Research`,
          type: "output",
        });
        break;
      case "contact":
        next.push({
          text: `CONTACT INFORMATION

  Email      → chaitanyajidigum@gmail.com
  GitHub     → github.com/ChaitanyaJidigum
  LinkedIn   → linkedin.com/in/chaitanya-jidigum-082091268`,
          type: "output",
        });
        break;
      case "scan":
        next.push({
          text: HUMOR_CONFIG.console.scan,
          type: "output",
        });
        break;
      case "whoami":
        next.push({
          text: HUMOR_CONFIG.console.whoami,
          type: "output",
        });
        break;
      case "status":
        next.push({
          text: HUMOR_CONFIG.console.status,
          type: "output",
        });
        break;
      case "orb":
        next.push({
          text: HUMOR_CONFIG.console.orb,
          type: "output",
        });
        break;
      case "hello":
        next.push({
          text: HUMOR_CONFIG.console.hello,
          type: "output",
        });
        break;
      case "sudo":
        next.push({
          text: HUMOR_CONFIG.console.sudo,
          type: "output",
        });
        break;
      case "coffee":
        next.push({
          text: HUMOR_CONFIG.console.coffee,
          type: "output",
        });
        break;
      case "clear":
        setHistory([]);
        setInput("");
        return;
      default:
        next.push({
          text: `bash: ${cmd}: command not found. Type 'help' for available commands.`,
          type: "error",
        });
    }

    setHistory(next);
    setInput("");
  };

  const handleReset = () => {
    setHistory(INIT_HISTORY);
    setInput("");
    setCommandHistory([]);
    setHistoryIndex(-1);
    isNearBottomRef.current = true;
    inputRef.current?.focus({ preventScroll: true });
  };

  return (
    <section className="py-20 md:py-28 w-full min-h-screen">
      <div className="mx-auto max-w-5xl px-5 sm:px-8 flex flex-col gap-10 animate-slide-up w-full">

        {/* ── Header ──────────────────────────────── */}
        <div className="flex flex-col gap-3 border-b border-border pb-10">
          <span className="text-[10px] font-mono font-bold uppercase tracking-[0.2em] text-[#2E54FE]">Sandbox</span>
          <h1 className="text-4xl md:text-6xl font-black text-foreground tracking-tighter leading-none">Console</h1>
          <p className="text-sm text-foreground/55 max-w-md leading-relaxed mt-1">
            An interactive terminal to query my resume details in real-time. Type <code className="font-mono text-[#2E54FE]">help</code> to get started.
          </p>
        </div>

        {/* ── Terminal Widget ──────────────────────── */}
        <div
          data-lenis-prevent
          className="w-full rounded-xl border border-border bg-white dark:bg-transparent hover:border-[#2E54FE]/25 overflow-hidden transition-all duration-300 shadow-lg flex flex-col"
        >

          {/* Toolbar */}
          <div className="flex items-center justify-between px-4 py-3 border-b border-border bg-muted/40 select-none">
            <div className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-rose-500/80" />
              <span className="w-2.5 h-2.5 rounded-full bg-amber-500/80" />
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/80" />
              <span className="text-[11px] font-mono text-foreground/35 ml-3">chaitanya_workspace — bash</span>
            </div>
            <div className="flex items-center gap-3">
              <Terminal className="w-3.5 h-3.5 text-foreground/30" />
              <button
                type="button"
                onClick={handleReset}
                className="text-foreground/30 hover:text-[#2E54FE] transition-colors cursor-pointer"
                title="Reset terminal"
                aria-label="Reset terminal"
              >
                <RotateCcw className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Log area — Independent scroll viewport, lenis-prevented, overscroll-contained */}
          <div
            ref={logContainerRef}
            data-lenis-prevent
            tabIndex={0}
            onScroll={handleLogScroll}
            onClick={(e) => {
              // If user clicked inside the log background (not selecting text), refocus the input
              if (window.getSelection()?.toString().length === 0 && e.target === logContainerRef.current) {
                inputRef.current?.focus({ preventScroll: true });
              }
            }}
            className="p-5 h-72 md:h-[26rem] overflow-y-auto overscroll-contain font-mono text-[13px] flex flex-col gap-3 leading-relaxed focus:outline-none select-text cursor-text"
            style={{
              scrollbarWidth: "thin",
              scrollbarColor: "rgba(46, 84, 254, 0.25) transparent",
            }}
          >
            {history.map((entry, i) => (
              <div
                key={i}
                className={`whitespace-pre-wrap break-words leading-relaxed select-text ${
                  entry.type === "command"
                    ? "text-[#2E54FE] font-bold"
                    : entry.type === "error"
                    ? "text-rose-400/90"
                    : "text-foreground/80"
                }`}
              >
                {entry.text}
              </div>
            ))}
          </div>

          {/* Input row */}
          <form
            onSubmit={handleSubmit}
            className="flex items-center border-t border-border bg-muted/20 px-5 py-3 gap-2"
          >
            <ChevronRight className="w-3.5 h-3.5 text-[#2E54FE] shrink-0" />
            <input
              ref={inputRef}
              type="text"
              value={input}
              onKeyDown={handleKeyDown}
              onChange={(e) => setInput(e.target.value)}
              placeholder="enter command..."
              className="w-full bg-transparent border-none outline-none font-mono text-[13px] text-foreground placeholder:text-foreground/20 focus:outline-none"
              autoCapitalize="none"
              autoComplete="off"
              spellCheck="false"
            />
          </form>
        </div>

        {/* Quick hints */}
        <div className="flex flex-wrap gap-2">
          {["help", "about", "skills", "projects", "contact", "status", "whoami", "clear"].map((cmd) => (
            <button
              key={cmd}
              type="button"
              onClick={() => {
                setInput(cmd);
                inputRef.current?.focus({ preventScroll: true });
              }}
              className="px-3 py-1 rounded-md text-[10px] font-mono text-foreground/35 border border-border hover:border-[#2E54FE]/25 hover:text-[#2E54FE] transition-all cursor-pointer select-none active:scale-95"
            >
              {cmd}
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
