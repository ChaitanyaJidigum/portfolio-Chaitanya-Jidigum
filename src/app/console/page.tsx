"use client";

import { useState, useRef, useEffect } from "react";
import { Terminal, ChevronRight } from "lucide-react";

interface TerminalHistory {
  text: string;
  type: "command" | "output" | "error";
}

export default function ConsolePage() {
  const [terminalInput, setTerminalInput] = useState("");
  const [terminalHistory, setTerminalHistory] = useState<TerminalHistory[]>([
    { text: "System initialized. Welcome to Chaitanya Jidigum's workspace console.", type: "output" },
    { text: "Type 'help' to see list of available commands.", type: "output" }
  ]);
  const terminalEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const isInitialMount = useRef(true);

  // Auto scroll terminal log to bottom on entries (preventing jump on mount)
  useEffect(() => {
    if (isInitialMount.current) {
      isInitialMount.current = false;
      return;
    }
    terminalEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [terminalHistory]);

  // Focus terminal input without scrolling the page down on load
  useEffect(() => {
    inputRef.current?.focus({ preventScroll: true });
  }, []);

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
          text: "Reach out via email: chaitanyajidigum@gmail.com or navigate to the contact page to send a form message.",
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

  return (
    <section className="py-20 w-full min-h-screen bg-black flex flex-col items-center">
      <div className="mx-auto max-w-7xl px-6 flex flex-col gap-8 animate-slide-up w-full">
        {/* Title block */}
        <div className="flex flex-col gap-2 max-w-2xl">
          <span className="text-xs font-mono font-bold uppercase tracking-widest text-[#2E54FE]">[ SANDBOX ]</span>
          <h1 className="text-4xl md:text-5xl font-extrabold text-white tracking-tight">Developer Console</h1>
          <p className="text-sm text-[#cbd5e1]/80 leading-relaxed mt-2">
            Interact directly with my workspace. Type commands in the terminal widget below to query my resume details in real-time.
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
          <div className="p-5 h-80 overflow-y-auto font-mono text-sm flex flex-col gap-2.5">
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
              ref={inputRef}
              type="text"
              value={terminalInput}
              onChange={(e) => setTerminalInput(e.target.value)}
              placeholder="Type 'help' and press Enter..."
              className="w-full bg-transparent border-0 outline-hidden font-mono text-sm text-white placeholder:text-[#cbd5e1]/30 focus:outline-hidden"
            />
          </form>
        </div>
      </div>
    </section>
  );
}
