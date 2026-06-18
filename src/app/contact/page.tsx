"use client";

import { useState } from "react";
import { Mail, FileText, CheckCircle2, Copy, Send } from "lucide-react";
import WordClock from "@/components/WordClock";

function GithubIcon({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
      <path d="M9 18c-4.51 2-5-2-7-2" />
    </svg>
  );
}

function LinkedinIcon({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
      <rect x="2" y="9" width="4" height="12" />
      <circle cx="4" cy="4" r="2" />
    </svg>
  );
}

export default function ContactPage() {
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [contactSuccess, setContactSuccess] = useState(false);
  const [isSending, setIsSending] = useState(false);
  const [formState, setFormState] = useState({ name: "", email: "", message: "" });

  const copyEmailAddress = () => {
    navigator.clipboard.writeText("chaitanyajidigum@gmail.com");
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2000);
  };

  const handleContactSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formState.name || !formState.email || !formState.message) return;

    const accessKey = process.env.NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY || "YOUR_WEB3FORMS_ACCESS_KEY_HERE";

    // If using placeholder key, immediately redirect to mailto synchronously to prevent browser popup blockers.
    if (accessKey === "YOUR_WEB3FORMS_ACCESS_KEY_HERE" || !accessKey) {
      const subject = encodeURIComponent(`Contact Form: Message from ${formState.name}`);
      const body = encodeURIComponent(`Name: ${formState.name}\nEmail: ${formState.email}\n\nMessage:\n${formState.message}`);
      window.location.href = `mailto:chaitanyajidigum@gmail.com?subject=${subject}&body=${body}`;
      setContactSuccess(true);
      setFormState({ name: "", email: "", message: "" });
      setTimeout(() => setContactSuccess(false), 4000);
      return;
    }

    setIsSending(true);
    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          access_key: accessKey,
          name: formState.name,
          email: formState.email,
          message: formState.message,
        }),
      });

      const res = await response.json();
      if (res.success) {
        setContactSuccess(true);
        setFormState({ name: "", email: "", message: "" });
      } else {
        // Fallback to mailto redirect
        const subject = encodeURIComponent(`Contact Form: Message from ${formState.name}`);
        const body = encodeURIComponent(`Name: ${formState.name}\nEmail: ${formState.email}\n\nMessage:\n${formState.message}`);
        window.location.href = `mailto:chaitanyajidigum@gmail.com?subject=${subject}&body=${body}`;
        setContactSuccess(true);
        setFormState({ name: "", email: "", message: "" });
      }
    } catch (err) {
      console.error("Form submit error, falling back to mailto:", err);
      // Fallback to mailto redirect
      const subject = encodeURIComponent(`Contact Form: Message from ${formState.name}`);
      const body = encodeURIComponent(`Name: ${formState.name}\nEmail: ${formState.email}\n\nMessage:\n${formState.message}`);
      window.location.href = `mailto:chaitanyajidigum@gmail.com?subject=${subject}&body=${body}`;
      setContactSuccess(true);
      setFormState({ name: "", email: "", message: "" });
    } finally {
      setIsSending(false);
      setTimeout(() => setContactSuccess(false), 4000);
    }
  };

  return (
    <section className="py-20 md:py-28 w-full min-h-screen">
      <div className="mx-auto max-w-5xl px-5 sm:px-8 flex flex-col gap-12 animate-slide-up w-full">

        {/* ── Header ──────────────────────────────── */}
        <div className="flex flex-col gap-3 border-b border-white/5 pb-10">
          <span className="text-[10px] font-mono font-bold uppercase tracking-[0.2em] text-[#2E54FE]">Collaboration</span>
          <h1 className="text-4xl md:text-6xl font-black text-white tracking-tighter leading-none">
            Let&apos;s build<br className="hidden sm:block" /> something.
          </h1>
          <p className="text-sm text-[#cbd5e1]/55 max-w-md leading-relaxed mt-1">
            Open to freelance projects, contract work, and engineering collaborations. Get in touch via the form or directly.
          </p>
        </div>

        {/* ── Content ─────────────────────────────── */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">

          {/* Left: Info */}
          <div className="lg:col-span-5 flex flex-col gap-8">

            {/* Email row */}
            <div className="flex flex-col gap-3">
              <span className="text-[10px] font-mono font-bold uppercase tracking-[0.2em] text-[#cbd5e1]/35">Email</span>
              <div className="flex items-center gap-2 p-2 pl-4 rounded-lg border border-white/5 hover:border-[#2E54FE]/25 transition-colors">
                <Mail className="w-3.5 h-3.5 text-[#cbd5e1]/40 shrink-0" />
                <code className="text-xs font-mono text-white/80 select-all grow">chaitanyajidigum@gmail.com</code>
                <button
                  onClick={copyEmailAddress}
                  className="flex items-center justify-center p-1.5 rounded-md text-[#cbd5e1]/40 hover:text-[#2E54FE] hover:bg-[#2E54FE]/5 border border-white/5 transition-all active:scale-95 shrink-0 cursor-pointer"
                  title="Copy email"
                >
                  {copiedEmail ? (
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                  ) : (
                    <Copy className="w-3.5 h-3.5" />
                  )}
                </button>
              </div>
            </div>

            {/* Links */}
            <div className="flex flex-col gap-3">
              <span className="text-[10px] font-mono font-bold uppercase tracking-[0.2em] text-[#cbd5e1]/35">Profiles</span>
              <div className="flex flex-col gap-2">
                <a
                  href="https://github.com/ChaitanyaJidigum"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 p-3 rounded-lg border border-white/5 hover:border-[#2E54FE]/25 hover:text-[#2E54FE] text-[#cbd5e1]/60 transition-all group"
                >
                  <GithubIcon className="w-4 h-4 shrink-0" />
                  <span className="text-xs font-mono">github.com/ChaitanyaJidigum</span>
                </a>
                <a
                  href="https://www.linkedin.com/in/chaitanya-jidigum-082091268/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 p-3 rounded-lg border border-white/5 hover:border-[#2E54FE]/25 hover:text-[#2E54FE] text-[#cbd5e1]/60 transition-all"
                >
                  <LinkedinIcon className="w-4 h-4 shrink-0" />
                  <span className="text-xs font-mono">chaitanya-jidigum</span>
                </a>
              </div>
            </div>

            {/* Resume */}
            <a
              href="/resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-xs font-semibold text-[#cbd5e1]/50 hover:text-[#2E54FE] transition-colors w-fit border border-white/5 hover:border-[#2E54FE]/25 rounded-lg px-4 py-2.5"
            >
              <FileText className="w-3.5 h-3.5" />
              Download Resume (PDF)
            </a>

            {/* Word Clock */}
            <div className="mt-4 pt-4 border-t border-white/5 w-full">
              <WordClock />
            </div>
          </div>

          {/* Right: Form */}
          <div className="lg:col-span-7">
            <form
              onSubmit={handleContactSubmit}
              className="flex flex-col gap-5 p-6 md:p-8 rounded-xl border border-white/5 hover:border-[#2E54FE]/20 transition-colors duration-300"
            >
              <div className="flex flex-col gap-1">
                <h2 className="text-base font-bold text-white">Send a Message</h2>
                <p className="text-xs text-[#cbd5e1]/40">I typically respond within 24 hours.</p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="flex flex-col gap-2">
                  <label htmlFor="form-name" className="text-[10px] font-mono font-bold uppercase tracking-[0.15em] text-[#cbd5e1]/40">
                    Your Name
                  </label>
                  <input
                    id="form-name"
                    type="text"
                    required
                    value={formState.name}
                    onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                    placeholder="John Doe"
                    className="w-full rounded-lg border border-white/8 bg-transparent px-3.5 py-2.5 text-sm text-white placeholder:text-[#cbd5e1]/20 focus:border-[#2E54FE]/50 focus:outline-none focus:ring-1 focus:ring-[#2E54FE]/20 transition-all"
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <label htmlFor="form-email" className="text-[10px] font-mono font-bold uppercase tracking-[0.15em] text-[#cbd5e1]/40">
                    Email Address
                  </label>
                  <input
                    id="form-email"
                    type="email"
                    required
                    value={formState.email}
                    onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                    placeholder="john@example.com"
                    className="w-full rounded-lg border border-white/8 bg-transparent px-3.5 py-2.5 text-sm text-white placeholder:text-[#cbd5e1]/20 focus:border-[#2E54FE]/50 focus:outline-none focus:ring-1 focus:ring-[#2E54FE]/20 transition-all"
                  />
                </div>
              </div>

              <div className="flex flex-col gap-2">
                <label htmlFor="form-message" className="text-[10px] font-mono font-bold uppercase tracking-[0.15em] text-[#cbd5e1]/40">
                  Message
                </label>
                <textarea
                  id="form-message"
                  required
                  rows={5}
                  value={formState.message}
                  onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                  placeholder="Hi Chaitanya, I'd like to discuss..."
                  className="w-full rounded-lg border border-white/8 bg-transparent px-3.5 py-2.5 text-sm text-white placeholder:text-[#cbd5e1]/20 focus:border-[#2E54FE]/50 focus:outline-none focus:ring-1 focus:ring-[#2E54FE]/20 transition-all resize-none"
                />
              </div>

              <button
                type="submit"
                disabled={isSending}
                className="flex items-center justify-center gap-2 h-11 w-full rounded-lg bg-[#2E54FE] hover:bg-[#1d3dbd] text-white font-semibold text-sm transition-all active:scale-[0.98] cursor-pointer mt-1 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSending ? (
                  <span>Sending Message...</span>
                ) : contactSuccess ? (
                  <>
                    <CheckCircle2 className="w-4 h-4" />
                    <span>Message Sent!</span>
                  </>
                ) : (
                  <>
                    <Send className="w-4 h-4" />
                    <span>Send Message</span>
                  </>
                )}
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
