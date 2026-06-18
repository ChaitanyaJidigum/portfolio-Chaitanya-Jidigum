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
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isTouchDevice, setIsTouchDevice] = useState(false);

  const spotlightRef = useRef<HTMLDivElement>(null);
  const progressBarRef = useRef<HTMLDivElement>(null);
  
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

  // Detect touch device capability on mount
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsTouchDevice('ontouchstart' in window || navigator.maxTouchPoints > 0);
    }, 0);
    return () => clearTimeout(timer);
  }, []);

  // Initialize Lenis smooth scroll for non-touch screens
  useEffect(() => {
    if (typeof window === "undefined") return;

    if (window.history) {
      window.history.scrollRestoration = "manual";
    }

    const isTouch = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    if (isTouch) return;

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
      const nextScrolled = e.scroll > 40;
      setIsScrolled(prev => prev !== nextScrolled ? nextScrolled : prev);

      const nextShowScrollTop = e.scroll > 400;
      setShowScrollTop(prev => prev !== nextShowScrollTop ? nextShowScrollTop : prev);
      
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const pct = docHeight > 0 ? e.scroll / docHeight : 0;
      if (progressBarRef.current) {
        progressBarRef.current.style.transform = `scaleX(${pct})`;
      }
    };
    
    lenis.on("scroll", handleLenisScroll);

    return () => {
      lenis.destroy();
      cancelAnimationFrame(rafId);
      lenisRef.current = null;
    };
  }, []);

  // Set up native scroll listener fallback for touch screens
  useEffect(() => {
    if (typeof window === "undefined") return;

    const isTouch = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    if (!isTouch) return;

    const handleNativeScroll = () => {
      const scrollY = window.scrollY;
      const nextScrolled = scrollY > 40;
      setIsScrolled(prev => prev !== nextScrolled ? nextScrolled : prev);

      const nextShowScrollTop = scrollY > 400;
      setShowScrollTop(prev => prev !== nextShowScrollTop ? nextShowScrollTop : prev);

      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const pct = docHeight > 0 ? scrollY / docHeight : 0;
      if (progressBarRef.current) {
        progressBarRef.current.style.transform = `scaleX(${pct})`;
      }
    };

    window.addEventListener("scroll", handleNativeScroll, { passive: true });
    handleNativeScroll(); // Initial sync

    return () => {
      window.removeEventListener("scroll", handleNativeScroll);
    };
  }, []);

  // Reset Lenis scroll on pathname change
  useEffect(() => {
    window.scrollTo(0, 0);
    if (lenisRef.current) {
      lenisRef.current.scrollTo(0, { immediate: true });
    }
  }, [pathname]);

  // Handle smooth scroll to hash on initial load or route transition
  useEffect(() => {
    if (typeof window !== "undefined") {
      const hash = window.location.hash;
      if (hash) {
        // Wait a brief moment for loader fade and layout adjustments
        const timer = setTimeout(() => {
          const element = document.querySelector(hash) as HTMLElement | null;
          if (element) {
            if (lenisRef.current) {
              lenisRef.current.scrollTo(element, { immediate: false, duration: 1.8 });
            } else {
              element.scrollIntoView({ behavior: "smooth" });
            }
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
      window.scrollTo(0, 0);
      if (lenisRef.current) {
        lenisRef.current.scrollTo(0, { immediate: true });
      }
    }, 1200);

    // Fade loader out after page mounts
    const fadeTimer = setTimeout(() => {
      setShowLoader(false);
      window.scrollTo(0, 0);
      if (lenisRef.current) {
        lenisRef.current.scrollTo(0, { immediate: true });
      }
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
            if (hash) {
              const element = document.getElementById(hash);
              if (element) {
                e.preventDefault();
                if (lenisRef.current) {
                  lenisRef.current.scrollTo(element, { duration: 1.5 });
                } else {
                  element.scrollIntoView({ behavior: "smooth" });
                }
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
    if (typeof window === "undefined") return;

    const isTouch = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    if (isTouch) return;

    const updateMousePos = (e: MouseEvent) => {
      if (spotlightRef.current) {
        spotlightRef.current.style.background = `radial-gradient(400px circle at ${e.clientX}px ${e.clientY}px, rgba(46, 84, 254, 0.12), transparent 80%)`;
      }
    };
    window.addEventListener("pointermove", updateMousePos, { passive: true });
    return () => {
      window.removeEventListener("pointermove", updateMousePos);
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
    { name: "Experience", href: "/experience" },
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
      {!isTouchDevice && (
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
      )}
      
      {/* Dynamic Cursor Spotlight Effect */}
      {!isTouchDevice && (
        <div 
          ref={spotlightRef}
          className="pointer-events-none fixed inset-0 z-30"
          style={{
            background: `radial-gradient(400px circle at -9999px -9999px, rgba(46, 84, 254, 0.12), transparent 80%)`
          }}
        />
      )}
      
      <div className="relative z-10 flex flex-col grow">
        {/* Sliding Persistent Header */}
        <header 
          className={`sticky top-0 z-50 mx-auto text-white overflow-hidden transition-all duration-300 ease-in-out w-full border-b animate-header-enter ${
            isScrolled 
              ? "md:mt-3 md:w-[90%] md:max-w-[800px] md:rounded-full border-[#2E54FE]/30 bg-black/95 shadow-[0_10px_30px_rgba(0,0,0,0.5),0_0_15px_rgba(46,84,254,0.15)] md:translate-y-3" 
              : "w-full border-white/5 bg-black/85 backdrop-blur-md translate-y-0"
          }`}
        >
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
        </header>

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

        {/* Dynamic Page Content with Fade Page Transition */}
        <AnimatePresence mode="wait">
          <motion.main
            key={pathname}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
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

        {/* Minimalist Top Scroll Progress Bar */}
        <div 
          ref={progressBarRef}
          className="fixed top-0 left-0 right-0 h-[3px] bg-[#2E54FE] z-[9999] origin-left pointer-events-none transition-transform duration-75"
          style={{ transform: `scaleX(0)` }}
        />

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
