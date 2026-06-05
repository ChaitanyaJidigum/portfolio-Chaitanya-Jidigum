"use client";

import React, { useState, useEffect, useCallback, useRef } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import dynamic from "next/dynamic";
import { ArrowUp, Mail, MapPin } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Lenis from "lenis";

// Dynamically import GhostCursor to avoid SSR issues with canvas/WebGL
const GhostCursor = dynamic(() => import("@/components/GhostCursor"), { ssr: false });

function GithubIcon({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
      <path d="M9 18c-4.51 2-5-2-7-2" />
    </svg>
  );
}

function LinkedinIcon({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
      <rect x="2" y="9" width="4" height="12" />
      <circle cx="4" cy="4" r="2" />
    </svg>
  );
}

interface ClientLayoutProps {
  children: React.ReactNode;
}

export default function ClientLayout({ children }: ClientLayoutProps) {
  const pathname = usePathname();
  const router = useRouter();
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [scrollPercent, setScrollPercent] = useState(0);
  
  // Transition Loader states
  const [showLoader, setShowLoader] = useState(true);

  // Lenis instance reference
  const lenisRef = useRef<Lenis | null>(null);

  // Splash screen timeout on initial mount
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowLoader(false);
    }, 1800);
    return () => clearTimeout(timer);
  }, []);

  // Initialize Lenis smooth scroll
  useEffect(() => {
    if (typeof window === "undefined") return;

    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // smooth exponential easing
      orientation: "vertical",
      gestureOrientation: "vertical",
      smoothWheel: true,
      wheelMultiplier: 1.0,
      touchMultiplier: 1.5,
    });

    lenisRef.current = lenis;

    let rafId: number;
    function raf(time: number) {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    }
    rafId = requestAnimationFrame(raf);

    // Sync scroll percentage and states with Lenis scroll events
    const handleLenisScroll = (e: { scroll: number }) => {
      setIsScrolled(e.scroll > 40);
      setShowScrollTop(e.scroll > 400);
      
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (docHeight > 0) {
        setScrollPercent(e.scroll / docHeight);
      } else {
        setScrollPercent(0);
      }
    };
    
    lenis.on("scroll", handleLenisScroll);

    return () => {
      lenis.destroy();
      cancelAnimationFrame(rafId);
    };
  }, []);

  // Reset Lenis scroll on pathname change
  useEffect(() => {
    if (lenisRef.current) {
      lenisRef.current.scrollTo(0, { immediate: true });
    }
  }, [pathname]);

  // Handle smooth scroll to hash on initial load or route transition
  useEffect(() => {
    if (typeof window !== "undefined" && lenisRef.current) {
      const hash = window.location.hash;
      if (hash) {
        // Wait a brief moment for loader fade and layout adjustments
        const timer = setTimeout(() => {
          const element = document.querySelector(hash) as HTMLElement | null;
          if (element && lenisRef.current) {
            lenisRef.current.scrollTo(element, { immediate: false, duration: 1.8 });
          }
        }, 400);
        return () => clearTimeout(timer);
      }
    }
  }, [pathname, showLoader]);

  // Custom navigation handler with transition
  const navigateWithTransition = useCallback((href: string) => {
    if (pathname === href) return;
    setShowLoader(true);
    setIsMobileMenuOpen(false);

    // Change route after loading logo animation plays
    const routeTimer = setTimeout(() => {
      router.push(href);
    }, 1200);

    // Fade loader out after page mounts
    const fadeTimer = setTimeout(() => {
      setShowLoader(false);
    }, 1900);

    return () => {
      clearTimeout(routeTimer);
      clearTimeout(fadeTimer);
    };
  }, [pathname, router]);

  // Global click interceptor to apply transition to internal links and smooth scroll hashes
  useEffect(() => {
    const handleGlobalClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const anchor = target.closest("a");

      if (anchor) {
        const href = anchor.getAttribute("href");
        const targetAttr = anchor.getAttribute("target");

        if (
          href && 
          href.startsWith("/") && 
          !href.startsWith("//") &&
          targetAttr !== "_blank" &&
          !anchor.hasAttribute("download")
        ) {
          const hrefPath = href.split("#")[0];
          const currentPath = pathname;

          if (hrefPath === currentPath) {
            // standard scroll for same-page anchors
            const hash = href.split("#")[1];
            if (hash && lenisRef.current) {
              const element = document.getElementById(hash);
              if (element) {
                e.preventDefault();
                lenisRef.current.scrollTo(element, { duration: 1.5 });
              }
            }
            return;
          }

          e.preventDefault();
          navigateWithTransition(href);
        }
      }
    };

    window.addEventListener("click", handleGlobalClick, { capture: true });
    return () => window.removeEventListener("click", handleGlobalClick, { capture: true });
  }, [pathname, navigateWithTransition]);

  // Mouse tracker for cursor spotlight glow effect
  useEffect(() => {
    let rafId: number;
    const updateMousePos = (e: MouseEvent) => {
      rafId = requestAnimationFrame(() => {
        setMousePos({ x: e.clientX, y: e.clientY });
      });
    };
    window.addEventListener("pointermove", updateMousePos, { passive: true });
    return () => {
      window.removeEventListener("pointermove", updateMousePos);
      cancelAnimationFrame(rafId);
    };
  }, []);



  const scrollToTop = () => {
    if (lenisRef.current) {
      lenisRef.current.scrollTo(0, { duration: 1.5 });
    } else {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    }
  };

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "About", href: "/about" },
    { name: "Projects", href: "/projects" },
    { name: "Experience", href: "/about#experience" },
    { name: "Skills", href: "/skills" },
    { name: "Contact", href: "/contact" },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-black text-[#cbd5e1] selection:bg-[#2E54FE]/20 selection:text-[#2E54FE] relative dot-grid-blue">
      {/* Lusion-Inspired Twisting C Loading Overlay */}
      <AnimatePresence>
        {showLoader && (
          <motion.div
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
            className="fixed inset-0 bg-black z-[9999] flex flex-col items-center justify-center gap-8 text-white select-none pointer-events-auto"
          >
            <div className="flex flex-col items-center gap-6">
              {/* Twisting C Drawing SVG */}
              <motion.svg 
                width="120" 
                height="120" 
                viewBox="0 0 100 100" 
                className="text-white relative"
                initial={{ rotate: -15, scale: 0.9 }}
                animate={{ rotate: 0, scale: 1 }}
                transition={{ duration: 1.1, ease: "easeOut" }}
                style={{ filter: "drop-shadow(0 0 20px rgba(46, 84, 254, 0.45))" }}
              >
                {/* Vertical bar (Step 01) */}
                <motion.path
                  d="M 35 25 L 35 75"
                  stroke="white"
                  strokeWidth={14}
                  strokeLinecap="square"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 0.4, ease: "easeInOut" }}
                />
                {/* Top bar (Step 02) */}
                <motion.path
                  d="M 35 25 L 65 25"
                  stroke="white"
                  strokeWidth={14}
                  strokeLinecap="square"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 0.4, ease: "easeInOut", delay: 0.4 }}
                />
                {/* Bottom bar (Step 03) */}
                <motion.path
                  d="M 35 75 L 65 75"
                  stroke="white"
                  strokeWidth={14}
                  strokeLinecap="square"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 0.4, ease: "easeInOut", delay: 0.6 }}
                />
              </motion.svg>

              {/* Text reveal (Step 09) */}
              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 1.0, ease: "easeOut" }}
                className="flex flex-col items-center gap-1.5 text-center tracking-[0.35em]"
              >
                <span className="text-sm font-black tracking-[0.45em] uppercase text-white">Chaitanya</span>
                <span className="text-[9px] font-mono text-[#2E54FE] uppercase tracking-[0.25em]">Engineer &bull; Developer</span>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      {/* 3D Smoky GhostCursor Backdrop Layer */}
      <GhostCursor
        trailLength={35}
        inertia={0.7}
        grainIntensity={0.03}
        bloomStrength={0.8}
        bloomRadius={2.5}
        brightness={2.5}
        color="#2E54FE"
        className="absolute inset-0 pointer-events-none"
        style={{ opacity: 0.65 }}
        zIndex={0}
      />
      
      {/* Dynamic Cursor Spotlight Effect */}
      <div 
        className="pointer-events-none fixed inset-0 z-30"
        style={{
          background: `radial-gradient(400px circle at ${mousePos.x}px ${mousePos.y}px, rgba(46, 84, 254, 0.12), transparent 80%)`
        }}
      />
      
      <div className="relative z-10 flex flex-col grow">
        {/* Sliding Persistent Header */}
        <motion.header 
          initial={{ y: -70, opacity: 0 }}
          animate={{ 
            y: isScrolled ? 12 : 0,
            opacity: 1,
            width: isScrolled ? "90%" : "100%",
            maxWidth: isScrolled ? "800px" : "100%",
            borderRadius: isScrolled ? "9999px" : "0px",
            borderColor: isScrolled ? "rgba(46, 84, 254, 0.3)" : "rgba(255, 255, 255, 0.05)",
            boxShadow: isScrolled ? "0 10px 30px rgba(0, 0, 0, 0.5), 0 0 15px rgba(46, 84, 254, 0.15)" : "none",
            borderTopWidth: isScrolled ? "1px" : "0px",
            borderLeftWidth: isScrolled ? "1px" : "0px",
            borderRightWidth: isScrolled ? "1px" : "0px",
            borderBottomWidth: "1px",
            borderStyle: "solid"
          }}
          transition={{ type: "spring", stiffness: 200, damping: 25 }}
          className="sticky top-0 z-50 mx-auto bg-black/85 backdrop-blur-md text-white overflow-hidden w-full"
        >
          {/* Visual Highlight Bar at the very top of Header (only when not scrolled) */}
          {!isScrolled && (
            <motion.div 
              layoutId="header-top-bar"
              className="absolute top-0 left-0 w-full h-[3px] bg-[#2E54FE]" 
            />
          )}
          
          <div className="mx-auto max-w-5xl px-5 sm:px-8 h-16 flex items-center justify-between">
            <div className="flex items-center gap-8 md:gap-12 lg:gap-16 h-full">
              <Link href="/" className="flex items-center gap-2.5 group">
                <div 
                  className="w-8 h-8 flex items-center justify-center text-white group-hover:scale-105 transition-transform duration-200"
                  style={{ filter: "drop-shadow(0 0 8px rgba(46, 84, 254, 0.45))" }}
                >
                  <svg viewBox="0 0 100 100" className="w-6 h-6 fill-white">
                    <path d="M 10 10 H 90 V 30 H 30 V 70 H 90 V 90 H 10 Z" />
                  </svg>
                </div>
                <span className="font-bold text-white tracking-tight group-hover:text-[#2E54FE] transition-colors whitespace-nowrap">Chaitanya Jidigum</span>
              </Link>

              {/* Desktop Nav Links with Sliding Active Underline */}
              <nav className="hidden md:flex items-center gap-4 lg:gap-6 text-xs lg:text-sm font-semibold relative h-full">
                {navLinks.map((link) => {
                  const isActive = pathname === link.href;
                  return (
                    <Link 
                      key={link.href} 
                      href={link.href} 
                      className={`relative py-1.5 transition-colors font-semibold ${
                        isActive 
                          ? "text-[#2E54FE]" 
                          : "text-[#cbd5e1]/70 hover:text-[#2E54FE]"
                      }`}
                    >
                      {link.name}
                      {isActive && (
                        <motion.div
                          layoutId="active-nav-underline"
                          className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#2E54FE]"
                          transition={{ type: "spring", stiffness: 380, damping: 30 }}
                        />
                      )}
                    </Link>
                  );
                })}
              </nav>
            </div>

            {/* Social Icons & CTA */}
            <div className="flex items-center gap-3">
              <a href="https://github.com/ChaitanyaJidigum" target="_blank" rel="noopener noreferrer" className="text-[#cbd5e1]/70 hover:text-[#2E54FE] transition-colors p-1.5" aria-label="GitHub">
                <GithubIcon className="w-4 h-4" />
              </a>
              <a href="https://www.linkedin.com/in/chaitanya-jidigum-082091268/" target="_blank" rel="noopener noreferrer" className="text-[#cbd5e1]/70 hover:text-[#2E54FE] transition-colors p-1.5" aria-label="LinkedIn">
                <LinkedinIcon className="w-4 h-4" />
              </a>
              {/* Divider */}
              <div className="hidden sm:block w-px h-4 bg-white/10 mx-4" />
              <Link 
                href="/contact" 
                className={`hidden sm:inline-flex h-9 items-center justify-center rounded-lg border px-4 text-xs font-semibold transition-all ${
                  pathname === "/contact"
                    ? "bg-[#2E54FE] border-[#2E54FE] text-white"
                    : "border-[#2E54FE] text-[#2E54FE] hover:bg-[#2E54FE] hover:text-white"
                }`}
              >
                Get in Touch
              </Link>

              {/* Mobile Menu Toggle Button */}
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="md:hidden p-2 text-[#cbd5e1]/70 hover:text-[#2E54FE] transition-colors focus:outline-hidden cursor-pointer"
                aria-label="Toggle Navigation Menu"
              >
                {isMobileMenuOpen ? (
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                ) : (
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                  </svg>
                )}
              </button>
            </div>
          </div>
        </motion.header>

        {/* Mobile Navigation Menu Panel */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              className="md:hidden border-b border-white/5 bg-black/95 backdrop-blur-lg overflow-hidden fixed left-0 w-full z-40 shadow-2xl"
              style={{ top: isScrolled ? "76px" : "64px" }}
            >
              <nav className="mx-auto max-w-5xl px-5 sm:px-8 flex flex-col py-5 gap-1 text-sm font-semibold">
                {navLinks.map((link) => {
                  const isActive = pathname === link.href;
                  return (
                    <Link
                      key={link.href}
                      href={link.href}
                      onClick={() => setIsMobileMenuOpen(false)}
                      className={`py-2 border-b border-white/5 last:border-0 transition-colors ${
                        isActive ? "text-[#2E54FE]" : "text-[#cbd5e1]/70 hover:text-[#2E54FE]"
                      }`}
                    >
                      {link.name}
                    </Link>
                  );
                })}
                <Link
                  href="/contact"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="mt-2 flex h-10 items-center justify-center rounded-lg bg-[#2E54FE] text-white text-xs font-semibold hover:bg-[#1d3dbd] transition-all"
                >
                  Get in Touch
                </Link>
              </nav>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Dynamic Page Content with Slide & Fade Page Transition */}
        <AnimatePresence mode="wait">
          <motion.main
            key={pathname}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col grow"
          >
            {children}
          </motion.main>
        </AnimatePresence>

        {/* Sliding Persistent Footer */}
        <motion.footer 
          initial={{ y: 70, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="border-t border-white/5 bg-black/90 backdrop-blur-sm text-[#cbd5e1]/40 relative z-10 w-full" 
          style={{ paddingBottom: 'max(1.5rem, env(safe-area-inset-bottom))' }}
        >
          {/* Upper row: Let's build something, contacts, social links */}
          <div className="mx-auto max-w-5xl px-5 sm:px-8 pt-12 pb-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-8 border-b border-white/5">
            {/* Left side: branding text */}
            <div className="flex flex-col gap-1 max-w-xs text-left">
              <h3 className="text-base font-bold text-white leading-tight">
                Let&apos;s build something <br />
                <span className="text-[#2E54FE]">amazing</span> together.
              </h3>
            </div>

            {/* Middle: contact info details */}
            <div className="flex flex-col sm:flex-row flex-wrap items-start sm:items-center gap-4 sm:gap-6 text-xs text-[#cbd5e1]/65 font-mono">
              <a href="mailto:chaitanyajidigum@gmail.com" className="flex items-center gap-2 hover:text-[#2E54FE] transition-colors">
                <Mail className="w-3.5 h-3.5" />
                <span>chaitanyajidigum@gmail.com</span>
              </a>
              <div className="flex items-center gap-2 text-[#cbd5e1]/45">
                <MapPin className="w-3.5 h-3.5" />
                <span>Hyderabad, India</span>
              </div>
            </div>

            {/* Right: Social icons inside rounded borders */}
            <div className="flex items-center gap-2.5">
              <a 
                href="https://github.com/ChaitanyaJidigum" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="w-9 h-9 rounded-lg border border-white/10 bg-white/[0.02] hover:border-[#2E54FE]/50 hover:text-[#2E54FE] flex items-center justify-center text-[#cbd5e1]/60 transition-all cursor-pointer"
                aria-label="GitHub"
              >
                <GithubIcon className="w-4 h-4" />
              </a>
              <a 
                href="https://www.linkedin.com/in/chaitanya-jidigum-082091268/" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="w-9 h-9 rounded-lg border border-white/10 bg-white/[0.02] hover:border-[#2E54FE]/50 hover:text-[#2E54FE] flex items-center justify-center text-[#cbd5e1]/60 transition-all cursor-pointer"
                aria-label="LinkedIn"
              >
                <LinkedinIcon className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Lower row: copyright */}
          <div className="mx-auto max-w-5xl px-5 sm:px-8 py-5 flex items-center justify-between text-[10px] font-mono text-[#cbd5e1]/30">
            <span>&copy; 2025 Chaitanya Jidigum. All rights reserved.</span>
            <span className="hidden sm:inline">Built with Next.js &amp; Framer Motion</span>
          </div>
        </motion.footer>

        {/* Scroll Rocket Progress Indicator */}
        <div className="fixed bottom-6 left-6 right-6 z-40 pointer-events-none select-none h-16 hidden sm:block">
          <div className="relative w-full h-full">
            <motion.div 
              className="absolute bottom-0 w-14 h-20 flex items-center justify-center overflow-visible"
              style={{ 
                left: `calc(${scrollPercent * 100}% - ${scrollPercent * 56}px)`,
                y: -Math.sin(scrollPercent * Math.PI) * 35,
                rotate: 90 + (scrollPercent - 0.5) * 30
              }}
            >
              <div className="relative flex flex-col items-center overflow-visible">
                  {/* SVG Animated Rocket */}
                  <svg viewBox="0 0 60 90" className="w-10 h-15 rocket-svg overflow-visible">
                    <defs>
                      {/* Gradients for a premium, 3D metallic blue rocket body */}
                      <linearGradient id="rocketBodyGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                        <stop offset="0%" stopColor="#3b82f6" />
                        <stop offset="50%" stopColor="#2E54FE" />
                        <stop offset="100%" stopColor="#1d4ed8" />
                      </linearGradient>
                      <linearGradient id="rocketWingGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                        <stop offset="0%" stopColor="#1e40af" />
                        <stop offset="100%" stopColor="#172554" />
                      </linearGradient>
                      <linearGradient id="flameOuterGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                        <stop offset="0%" stopColor="#2E54FE" stopOpacity="0.95" />
                        <stop offset="50%" stopColor="#38bdf8" stopOpacity="0.75" />
                        <stop offset="100%" stopColor="#38bdf8" stopOpacity="0" />
                      </linearGradient>
                      <linearGradient id="flameInnerGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                        <stop offset="0%" stopColor="#ffffff" stopOpacity="1" />
                        <stop offset="50%" stopColor="#60a5fa" stopOpacity="0.85" />
                        <stop offset="100%" stopColor="#2E54FE" stopOpacity="0" />
                      </linearGradient>
                    </defs>

                    {/* Fuel burning exhaust sparks */}
                    <circle className="spark spark-1" cx="30" cy="62" r="1.8" fill="#38bdf8" />
                    <circle className="spark spark-2" cx="26" cy="64" r="1.5" fill="#2E54FE" />
                    <circle className="spark spark-3" cx="34" cy="63" r="1.5" fill="#60a5fa" />
                    <circle className="spark spark-4" cx="28" cy="65" r="1.2" fill="#ffffff" />
                    <circle className="spark spark-5" cx="32" cy="64" r="1.2" fill="#38bdf8" />

                    {/* Pulsing engine flames */}
                    <path className="flame-outer" d="M22,60 Q30,85 38,60 Q30,65 22,60 Z" fill="url(#flameOuterGrad)" />
                    <path className="flame-inner" d="M25,60 Q30,75 35,60 Q30,63 25,60 Z" fill="url(#flameInnerGrad)" />

                    {/* Sleek Vector Rocket Body */}
                    {/* Engine Nozzle */}
                    <rect x="25" y="55" width="10" height="6" rx="1.5" fill="#475569" stroke="#0f172a" strokeWidth="1.5" />
                    
                    {/* Left Fin Wing */}
                    <path d="M18,40 L6,53 C6,53 10,54 18,50 Z" fill="url(#rocketWingGrad)" stroke="#0f172a" strokeWidth="1.5" strokeLinejoin="round" />
                    
                    {/* Right Fin Wing */}
                    <path d="M42,40 L54,53 C54,53 50,54 42,50 Z" fill="url(#rocketWingGrad)" stroke="#0f172a" strokeWidth="1.5" strokeLinejoin="round" />
                    
                    {/* Main Capsule Body */}
                    <path d="M30,8 C40,20 42,40 42,54 L18,54 C18,40 20,20 30,8 Z" fill="url(#rocketBodyGrad)" stroke="#0f172a" strokeWidth="1.8" />
                    
                    {/* Center Fin Wing */}
                    <path d="M28,42 L30,54 L32,42 Z" fill="url(#rocketWingGrad)" stroke="#0f172a" strokeWidth="1.2" />

                    {/* Cockpit Glowing Window */}
                    <circle cx="30" cy="28" r="6" fill="#0f172a" stroke="#0f172a" strokeWidth="2" />
                    <circle cx="30" cy="28" r="4.5" fill="#60a5fa" />
                    <circle cx="28.5" cy="26.5" r="1.5" fill="#ffffff" opacity="0.8" />
                  </svg>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Floating Scroll-to-Top Button */}
        {showScrollTop && (
          <button
            onClick={scrollToTop}
            className="fixed bottom-6 right-4 sm:right-6 z-50 flex h-10 w-10 items-center justify-center rounded-full bg-black/85 text-[#cbd5e1] border border-white/10 hover:border-[#2E54FE] hover:text-[#2E54FE] shadow-[0_0_15px_rgba(46,84,254,0.15)] transition-all duration-300 hover:scale-110 active:scale-95 animate-fade-in group cursor-pointer"
            aria-label="Scroll to Top"
          >
            <ArrowUp className="w-5 h-5 group-hover:-translate-y-0.5 transition-transform" />
          </button>
        )}
      </div>
    </div>
  );
}
