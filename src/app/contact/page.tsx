"use client";

import { useState } from "react";
import { Mail, FileText, CheckCircle2, Copy, Send } from "lucide-react";

export default function ContactPage() {
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [contactSuccess, setContactSuccess] = useState(false);
  const [formState, setFormState] = useState({ name: "", email: "", message: "" });

  const copyEmailAddress = () => {
    navigator.clipboard.writeText("chaitanyajidigum@gmail.com");
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2000);
  };

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formState.name || !formState.email || !formState.message) return;
    setContactSuccess(true);
    setFormState({ name: "", email: "", message: "" });
    setTimeout(() => setContactSuccess(false), 3000);
  };

  return (
    <section className="py-20 w-full min-h-screen bg-black flex flex-col items-center justify-center relative overflow-hidden">
      <div className="mx-auto max-w-7xl px-6 grid grid-cols-1 lg:grid-cols-12 gap-16 animate-slide-up w-full">
        {/* Info Column */}
        <div className="lg:col-span-5 flex flex-col justify-between gap-12">
          <div className="flex flex-col gap-6">
            <div className="flex flex-col gap-2">
              <span className="text-xs font-mono font-bold uppercase tracking-widest text-[#2E54FE]">[ COLLABORATION ]</span>
              <h1 className="text-4xl md:text-5xl font-extrabold text-white tracking-tight">Let&apos;s build something</h1>
            </div>
            <p className="text-sm text-[#cbd5e1]/80 leading-relaxed">
              If you have an upcoming project, a freelance contract opportunity, or want to discuss machine learning, automation pipelines, and engineering patterns, let&apos;s get in touch.
            </p>
          </div>

          {/* Interactive Direct Contact */}
          <div className="flex flex-col gap-4">
            <span className="text-xs font-mono font-semibold text-[#cbd5e1]/60 uppercase tracking-widest">Direct Contact</span>
            <div className="flex items-center gap-2 p-1.5 pl-4 rounded-xl border border-white/5 bg-[#0b0b0b] shadow-sm max-w-xs w-full">
              <Mail className="w-4 h-4 text-[#cbd5e1]/60 shrink-0" />
              <code className="text-xs font-mono text-white select-all grow text-left">chaitanyajidigum@gmail.com</code>
              <button 
                onClick={copyEmailAddress}
                className="flex items-center justify-center p-1.5 rounded-lg text-xs font-medium bg-black hover:bg-neutral-900 text-[#cbd5e1] border border-white/10 transition-all active:scale-95 shrink-0 cursor-pointer"
                title="Copy Email Address"
              >
                {copiedEmail ? (
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
                ) : (
                  <Copy className="w-3.5 h-3.5" />
                )}
              </button>
            </div>

            {/* Resume download */}
            <a 
              href="/resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-xs font-semibold text-[#cbd5e1]/75 hover:text-[#2E54FE] transition-colors w-fit mt-1"
            >
              <FileText className="w-4 h-4" />
              <span>Download Resume (PDF)</span>
            </a>
          </div>
        </div>

        {/* Direct Message Form */}
        <div className="lg:col-span-7">
          <form 
            onSubmit={handleContactSubmit}
            className="p-6 md:p-8 rounded-2xl border border-white/5 bg-[#0b0b0b] flex flex-col gap-5 hover:border-[#2E54FE]/20 transition-all duration-300"
          >
            <h3 className="text-lg font-bold text-white mb-1">Send a Message</h3>
            
            <div className="flex flex-col gap-1.5">
              <label htmlFor="form-name" className="text-xs font-mono font-semibold text-[#cbd5e1]/60 uppercase tracking-wider">Your Name</label>
              <input
                id="form-name"
                type="text"
                required
                value={formState.name}
                onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                placeholder="John Doe"
                className="w-full rounded-lg border border-white/10 bg-black px-4 py-2.5 text-sm text-white placeholder:text-[#cbd5e1]/30 focus:border-[#2E54FE] focus:outline-hidden focus:ring-1 focus:ring-[#2E54FE]/25 transition-all"
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <label htmlFor="form-email" className="text-xs font-mono font-semibold text-[#cbd5e1]/60 uppercase tracking-wider">Email Address</label>
              <input
                id="form-email"
                type="email"
                required
                value={formState.email}
                onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                placeholder="john@example.com"
                className="w-full rounded-lg border border-white/10 bg-black px-4 py-2.5 text-sm text-white placeholder:text-[#cbd5e1]/30 focus:border-[#2E54FE] focus:outline-hidden focus:ring-1 focus:ring-[#2E54FE]/25 transition-all"
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <label htmlFor="form-message" className="text-xs font-mono font-semibold text-[#cbd5e1]/60 uppercase tracking-wider">Message</label>
              <textarea
                id="form-message"
                required
                rows={4}
                value={formState.message}
                onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                placeholder="Hello, I would like to discuss..."
                className="w-full rounded-lg border border-white/10 bg-black px-4 py-2.5 text-sm text-white placeholder:text-[#cbd5e1]/30 focus:border-[#2E54FE] focus:outline-hidden focus:ring-1 focus:ring-[#2E54FE]/25 transition-all resize-none"
              />
            </div>

            <button 
              type="submit"
              className="flex items-center justify-center gap-2 h-11 w-full rounded-lg bg-[#2E54FE] hover:bg-[#1d3dbd] text-white font-semibold text-sm transition-all active:scale-98 glow-blue cursor-pointer"
            >
              {contactSuccess ? (
                <>
                  <CheckCircle2 className="w-4 h-4 text-white" />
                  <span>Message Sent Successfully!</span>
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
    </section>
  );
}
