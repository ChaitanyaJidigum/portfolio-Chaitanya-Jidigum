"use client";

import React, { useState, useEffect, useRef } from "react";

/**
 * FooterScene: Tight, cute, interactive forest landscape inside the footer.
 * 
 * - STRICT BOUNDARY: Clamped entirely within footer container (overflow-hidden).
 * - DRAGON: Separate nested wrappers for horizontal flight (8.5s across 18% to 72%),
 *           vertical bobbing (2.2s), and visible wing flapping (0.38s).
 * - GROUND CREATURES: 4 cute creatures with noticeable, clamped cursor-follow:
 *     X movement: 8-15px, Y movement: 4-8px, lean: 1-3 deg.
 * - PEEKING INTERACTION: Bubba (behind Tree 3) & Mochi (behind Tree 6)
 *     tuck behind their trees and visibly PEEK OUT when approached or hovered!
 * - CLEAR IDLE ANIMATIONS: Independent keyframes (Bean, Bubba, Pip, Mochi).
 * - SUN / MOON: Dynamic based on user's browser local time (Sun by day, Moon + Stars by night).
 * - ZERO FLOWERS.
 */

// ── 1. Sun & Moon (Dynamic local browser time) ──
function CelestialBody({ isNight, className }: { isNight: boolean; className?: string }) {
  if (isNight) {
    return (
      <div className={className} aria-hidden="true">
        {/* Crescent Moon */}
        <div className="relative w-7 h-7 sm:w-8 sm:h-8 flex items-center justify-center">
          <svg viewBox="0 0 50 50" fill="none" className="w-full h-full drop-shadow-[0_0_12px_rgba(254,240,138,0.45)]">
            <path
              d="M 38 12 C 24 12 14 22 14 36 C 14 41 16 45 18 48 C 10 44 4 36 4 26 C 4 14 14 4 26 4 C 31 4 35 5 38 12 Z"
              fill="#fef08a"
            />
            {/* Cute sleepy moon face */}
            <circle cx="16" cy="24" r="1.5" fill="#ca8a04" opacity="0.6" />
            <path d="M 14 29 Q 17 31 19 29" stroke="#ca8a04" strokeWidth="0.8" strokeLinecap="round" opacity="0.6" />
          </svg>
        </div>
      </div>
    );
  }

  // Day: Warm Sun
  return (
    <div className={className} aria-hidden="true">
      <div className="relative w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-gradient-to-t from-amber-500/85 to-amber-300/95 shadow-[0_0_20px_rgba(245,158,11,0.3)] flex items-center justify-center">
        <div className="w-6 h-6 sm:w-7 sm:h-7 rounded-full bg-amber-200/95" />
      </div>
    </div>
  );
}

// ── 2. Twinkling Night Stars ──
function NightStars({ className }: { className?: string }) {
  return (
    <div className={className} aria-hidden="true">
      <span className="absolute left-[15%] top-1 text-[#fef08a] text-[8px] animate-star-twinkle-1 select-none pointer-events-none">
        ✦
      </span>
      <span className="absolute left-[45%] top-2 text-[#fef9c3] text-[7px] animate-star-twinkle-2 select-none pointer-events-none">
        ★
      </span>
      <span className="absolute left-[68%] top-1 text-[#fef08a] text-[8px] animate-star-twinkle-3 select-none pointer-events-none">
        ✦
      </span>
      <span className="absolute left-[88%] top-2 text-[#fef9c3] text-[6px] animate-star-twinkle-1 select-none pointer-events-none">
        ★
      </span>
    </div>
  );
}

// ── 3. Static Mountains (Background, zero cursor movement, 100% transparent base) ──
function Mountains({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 760 105"
      preserveAspectRatio="none"
      fill="none"
      className={className}
      aria-hidden="true"
    >
      {/* Mountain 1: Back Mountain (Left-Center) */}
      <path
        d="M 120 105 C 200 34 260 25 360 105 Z"
        fill="#090f1d"
        stroke="#1a243a"
        strokeWidth="1"
        opacity="0.9"
      />
      {/* Mountain 2: Front Mountain (Right-Center) */}
      <path
        d="M 330 105 C 420 20 490 30 600 105 Z"
        fill="#0d1527"
        stroke="#1e293b"
        strokeWidth="1"
      />

      {/* Subtle Curved Ground Line across center */}
      <path d="M 60 98 Q 380 94 700 98" stroke="rgba(16, 185, 129, 0.25)" strokeWidth="1.2" strokeLinecap="round" fill="none" />
      <path d="M 100 101 Q 380 98 660 101" stroke="rgba(255, 255, 255, 0.04)" strokeWidth="0.8" strokeLinecap="round" fill="none" />

      {/* Subtle ground pebbles */}
      <circle cx="150" cy="99" r="1.3" fill="#1e293b" opacity="0.7" />
      <circle cx="280" cy="97" r="1.5" fill="#1e293b" opacity="0.7" />
      <circle cx="460" cy="98" r="1.4" fill="#1e293b" opacity="0.7" />
      <circle cx="610" cy="99" r="1.3" fill="#334155" opacity="0.7" />
    </svg>
  );
}

// ── 4. Stylized Vector Forest Pine Trees ──
interface TreeProps {
  className?: string;
  style?: React.CSSProperties;
  colorVariant?: "deep" | "emerald" | "pine";
}

function ForestTree({ className, style, colorVariant = "emerald" }: TreeProps) {
  const colors = {
    deep: { top: "#064e3b", mid: "#043a2d", bot: "#022c22", stroke: "#065f46" },
    emerald: { top: "#047857", mid: "#065f46", bot: "#064e3b", stroke: "#059669" },
    pine: { top: "#0f393b", mid: "#0d2e30", bot: "#071c1d", stroke: "#134e4a" },
  }[colorVariant];

  return (
    <svg viewBox="0 0 50 85" fill="none" className={className} style={style} aria-hidden="true">
      {/* Trunk */}
      <rect x="22" y="70" width="6" height="15" rx="1.5" fill="#1c1917" />
      {/* Bottom Tier */}
      <polygon points="25,44 6,70 44,70" fill={colors.bot} stroke={colors.stroke} strokeWidth="0.8" />
      {/* Middle Tier */}
      <polygon points="25,26 11,50 39,50" fill={colors.mid} stroke={colors.stroke} strokeWidth="0.8" />
      {/* Top Tier */}
      <polygon points="25,6 16,30 34,30" fill={colors.top} stroke={colors.stroke} strokeWidth="0.8" />
    </svg>
  );
}

// ── 5. Flying Dragon Mascot with Continuous LEFT -> RIGHT Flight ──
function FlyingDragon() {
  return (
    <div className="relative w-11 h-9 sm:w-12 sm:h-10 select-none pointer-events-none" aria-hidden="true">
      <svg viewBox="0 0 68 50" fill="none" className="w-full h-full overflow-visible">
        {/* Left Wing (Back Wing: flapping actively) */}
        <g className="dragon-wings dragon-wing-back">
          <path
            d="M 28 20 C 18 6 8 12 5 22 C 13 22 22 22 28 20 Z"
            fill="#ea580c"
            stroke="#c2410c"
            strokeWidth="0.8"
          />
          <path d="M 12 15 L 24 20" stroke="#fef08a" strokeWidth="0.8" opacity="0.7" />
        </g>

        {/* Dragon Tail & Body */}
        <path d="M 20 28 Q 10 32 4 28 Q 12 24 20 26 Z" fill="#ea580c" />
        <circle cx="5" cy="28" r="2" fill="#fef08a" />
        <ellipse cx="28" cy="27" rx="12" ry="9" fill="#f97316" />
        <ellipse cx="29" cy="29" rx="8" ry="6" fill="#fef3c7" />

        {/* Head */}
        <circle cx="38" cy="20" r="8.5" fill="#f97316" />
        <polygon points="34,14 31,7 37,13" fill="#fef08a" />
        <polygon points="38,13 37,7 41,12" fill="#fef08a" />
        <circle cx="37" cy="24" r="1.8" fill="#f43f5e" opacity="0.35" />

        {/* Right Wing (Front Wing: flapping actively) */}
        <g className="dragon-wings dragon-wing-front">
          <path
            d="M 32 22 C 22 7 12 13 8 24 C 17 24 26 23 32 22 Z"
            fill="#fb923c"
            stroke="#ea580c"
            strokeWidth="0.8"
          />
          <path d="M 15 16 L 27 22" stroke="#fef08a" strokeWidth="0.8" opacity="0.8" />
        </g>

        {/* Eye */}
        <ellipse cx="39" cy="18" rx="2.8" ry="3.2" fill="#ffffff" />
        <circle cx="40" cy="18" r="1.8" fill="#0f172a" />
        <circle cx="39.2" cy="17.2" r="0.7" fill="#ffffff" />

        {/* Snout */}
        <ellipse cx="44" cy="22" rx="3.5" ry="3" fill="#fb923c" />
        <path d="M 43 23 Q 45 25 47 23" stroke="#9a3412" strokeWidth="0.8" strokeLinecap="round" />
      </svg>
    </div>
  );
}

// ── 6. The 4 Original Ground Creatures ──
interface CreatureProps {
  className?: string;
  style?: React.CSSProperties;
}

// Creature 1: Bean (Curious Green Long-neck Dino with Head Sprout - Open clearing)
function BeanDino({ className, style }: CreatureProps) {
  return (
    <svg viewBox="0 0 70 75" fill="none" className={className} style={style} aria-hidden="true">
      <path d="M 18 58 Q 9 55 6 49 Q 12 47 20 53 Z" fill="#059669" />
      <ellipse cx="32" cy="56" rx="16" ry="12" fill="#10b981" />
      <ellipse cx="34" cy="58" rx="11" ry="8" fill="#6ee7b7" />
      <ellipse cx="23" cy="67" rx="4.5" ry="2.5" fill="#059669" />
      <ellipse cx="40" cy="67" rx="4.5" ry="2.5" fill="#059669" />
      <path d="M 37 54 Q 41 36 44 24 Q 47 36 43 54 Z" fill="#10b981" />
      <circle cx="47" cy="21" r="10" fill="#10b981" />
      <ellipse cx="50" cy="24" rx="4.5" ry="3.5" fill="#6ee7b7" />
      <path d="M 47 11 Q 44 5 41 3 Q 47 4 47 11 Z" fill="#a7f3d0" />
      <path d="M 47 11 Q 50 4 54 5 Q 49 8 47 11 Z" fill="#34d399" />
      <circle cx="51" cy="25" r="2.2" fill="#f43f5e" opacity="0.32" />
      <ellipse cx="45" cy="18" rx="3.8" ry="4.5" fill="#ffffff" />
      {/* Pupil with Eye Tracking */}
      <g className="creature-eyes will-change-transform">
        <circle cx="45.5" cy="18.5" r="2.5" fill="#064e3b" />
        <circle cx="44.5" cy="17.2" r="0.9" fill="#ffffff" />
      </g>
      <path d="M 52 25 Q 50 27 47 26" stroke="#065f46" strokeWidth="1.1" strokeLinecap="round" />
    </svg>
  );
}

// Creature 2: Bubba (Chubby Blue Stego - PEEKS OUT from behind Tree 3!)
function BubbaDino({ className, style }: CreatureProps) {
  return (
    <svg viewBox="0 0 75 70" fill="none" className={className} style={style} aria-hidden="true">
      <polygon points="24,28 28,18 33,27" fill="#0284c7" />
      <polygon points="34,25 39,14 44,25" fill="#0284c7" />
      <polygon points="45,26 50,17 55,27" fill="#0284c7" />
      <path d="M 18 47 Q 10 45 7 39 Q 12 40 18 43 Z" fill="#0369a1" />
      <ellipse cx="40" cy="45" rx="20" ry="15" fill="#38bdf8" />
      <ellipse cx="42" cy="47" rx="14" ry="10" fill="#7dd3fc" />
      <ellipse cx="28" cy="59" rx="5" ry="3" fill="#0284c7" />
      <ellipse cx="50" cy="59" rx="5" ry="3" fill="#0284c7" />
      <circle cx="54" cy="38" r="10" fill="#38bdf8" />
      <circle cx="56" cy="43" r="2.2" fill="#f43f5e" opacity="0.32" />
      <ellipse cx="53" cy="35" rx="3.8" ry="4.2" fill="#ffffff" />
      {/* Pupil with Eye Tracking */}
      <g className="creature-eyes will-change-transform">
        <circle cx="53.5" cy="35.5" r="2.4" fill="#082f49" />
        <circle cx="52.5" cy="34.5" r="0.9" fill="#ffffff" />
      </g>
      <path d="M 59 42 Q 57 44 54 42" stroke="#075985" strokeWidth="1.1" strokeLinecap="round" />
    </svg>
  );
}

// Creature 3: Pip (Tiny Amber Horned Dino - Center grove clearing)
function PipDino({ className, style }: CreatureProps) {
  return (
    <svg viewBox="0 0 70 70" fill="none" className={className} style={style} aria-hidden="true">
      <path d="M 20 48 Q 11 48 7 42 Q 13 38 20 42 Z" fill="#ea580c" />
      <ellipse cx="34" cy="46" rx="16" ry="13" fill="#fb923c" />
      <ellipse cx="36" cy="48" rx="11" ry="8" fill="#fef3c7" />
      <ellipse cx="25" cy="58" rx="4.5" ry="2.8" fill="#ea580c" />
      <ellipse cx="43" cy="58" rx="4.5" ry="2.8" fill="#ea580c" />
      <polygon points="35,19 33,12 38,17" fill="#fef08a" />
      <polygon points="46,19 48,12 43,17" fill="#fef08a" />
      <circle cx="41" cy="27" r="11" fill="#fb923c" />
      <circle cx="46" cy="32" r="2.2" fill="#f43f5e" opacity="0.32" />
      <ellipse cx="40" cy="24" rx="3.8" ry="4.2" fill="#ffffff" />
      {/* Pupil with Eye Tracking */}
      <g className="creature-eyes will-change-transform">
        <circle cx="40.5" cy="24.5" r="2.4" fill="#431407" />
        <circle cx="39.5" cy="23.5" r="0.8" fill="#ffffff" />
      </g>
      <path d="M 45 32 Q 43 34 40 32" stroke="#9a3412" strokeWidth="1.1" strokeLinecap="round" />
      <polygon points="42,32 43.5,34 44.5,32" fill="#ffffff" />
    </svg>
  );
}

// Creature 4: Mochi (Sleepy Lavender Blob Dino - PEEKS OUT from behind Tree 6!)
function MochiDino({ className, style }: CreatureProps) {
  return (
    <svg viewBox="0 0 70 65" fill="none" className={className} style={style} aria-hidden="true">
      <path d="M 18 43 Q 10 40 8 36 Q 13 36 18 39 Z" fill="#6d28d9" />
      <circle cx="8" cy="36" r="2.2" fill="#c4b5fd" />
      <ellipse cx="36" cy="42" rx="18" ry="14" fill="#a78bfa" />
      <ellipse cx="37" cy="44" rx="12" ry="9" fill="#ddd6fe" />
      <ellipse cx="26" cy="55" rx="4.5" ry="2.8" fill="#6d28d9" />
      <ellipse cx="46" cy="55" rx="4.5" ry="2.8" fill="#6d28d9" />
      <circle cx="28" cy="27" r="2.2" fill="#7c3aed" />
      <circle cx="35" cy="26" r="2.2" fill="#7c3aed" />
      <circle cx="48" cy="34" r="9.5" fill="#a78bfa" />
      <circle cx="50" cy="39" r="2" fill="#f43f5e" opacity="0.35" />
      <ellipse cx="47" cy="31" rx="3.5" ry="4" fill="#ffffff" />
      {/* Pupil with Eye Tracking */}
      <g className="creature-eyes will-change-transform">
        <circle cx="47.5" cy="31.5" r="2.2" fill="#2e1065" />
        <circle cx="46.5" cy="30.5" r="0.8" fill="#ffffff" />
      </g>
      <path d="M 52 38 Q 50 40 47 38" stroke="#5b21b6" strokeWidth="1.1" strokeLinecap="round" />
    </svg>
  );
}

// ── Configuration for 4 Ground Creatures ──
interface CreatureConfig {
  id: number;
  name: string;
  Component: React.ComponentType<CreatureProps>;
  leftPercent: { desktop: number; tablet: number; mobile: number };
  width: number;
  height: number;
  idleClass: string;
  isPeeker?: boolean;
}

const GROUND_CREATURES: CreatureConfig[] = [
  {
    id: 1,
    name: "Bean",
    Component: BeanDino,
    leftPercent: { desktop: 20, tablet: 18, mobile: 16 },
    width: 36,
    height: 39,
    idleClass: "creature-idle-bean",
    isPeeker: false,
  },
  {
    id: 2,
    name: "Bubba",
    Component: BubbaDino,
    // Placed at 40% (right behind Tree 3 which is at 40%), so he peeks to the left
    leftPercent: { desktop: 40, tablet: 39, mobile: 40 },
    width: 38,
    height: 34,
    idleClass: "creature-idle-bubba",
    isPeeker: true,
  },
  {
    id: 3,
    name: "Pip",
    Component: PipDino,
    leftPercent: { desktop: 60, tablet: 59, mobile: 60 },
    width: 34,
    height: 34,
    idleClass: "creature-idle-pip",
    isPeeker: false,
  },
  {
    id: 4,
    name: "Mochi",
    Component: MochiDino,
    // Placed at 78% (right behind Tree 6 which is at 78%), so he peeks out
    leftPercent: { desktop: 78, tablet: 78, mobile: 80 },
    width: 34,
    height: 31,
    idleClass: "creature-idle-mochi",
    isPeeker: true,
  },
];

export default function FooterScene() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [viewport, setViewport] = useState<"desktop" | "tablet" | "mobile">("desktop");
  const [hoveredId, setHoveredId] = useState<number | null>(null);
  const [isNight, setIsNight] = useState(false);

  // Direct element refs for 60fps transform updates without re-renders
  const focusRefs = useRef<{ [id: number]: HTMLDivElement | null }>({});

  // Internal lerp physics state
  const currentOffsets = useRef<{
    [id: number]: { shiftX: number; shiftY: number; leanDeg: number; eyeX: number; eyeY: number; peekAmount: number };
  }>({
    1: { shiftX: 0, shiftY: 0, leanDeg: 0, eyeX: 0, eyeY: 0, peekAmount: 0 },
    2: { shiftX: 0, shiftY: 0, leanDeg: 0, eyeX: 0, eyeY: 0, peekAmount: 0 },
    3: { shiftX: 0, shiftY: 0, leanDeg: 0, eyeX: 0, eyeY: 0, peekAmount: 0 },
    4: { shiftX: 0, shiftY: 0, leanDeg: 0, eyeX: 0, eyeY: 0, peekAmount: 0 },
  });

  const targetOffsets = useRef<{
    [id: number]: { shiftX: number; shiftY: number; leanDeg: number; eyeX: number; eyeY: number; peekAmount: number };
  }>({
    1: { shiftX: 0, shiftY: 0, leanDeg: 0, eyeX: 0, eyeY: 0, peekAmount: 0 },
    2: { shiftX: 0, shiftY: 0, leanDeg: 0, eyeX: 0, eyeY: 0, peekAmount: 0 },
    3: { shiftX: 0, shiftY: 0, leanDeg: 0, eyeX: 0, eyeY: 0, peekAmount: 0 },
    4: { shiftX: 0, shiftY: 0, leanDeg: 0, eyeX: 0, eyeY: 0, peekAmount: 0 },
  });

  // Check local browser time for Sun/Moon and setup viewport listeners
  useEffect(() => {
    const hour = new Date().getHours();
    setIsNight(hour < 6 || hour >= 18);

    const checkViewport = () => {
      const w = window.innerWidth;
      if (w < 640) setViewport("mobile");
      else if (w < 1024) setViewport("tablet");
      else setViewport("desktop");
    };

    checkViewport();
    window.addEventListener("resize", checkViewport);

    return () => {
      window.removeEventListener("resize", checkViewport);
    };
  }, []);

  // Continuous rAF animation loop for spring-like smoothing (lerp)
  useEffect(() => {
    if (viewport === "mobile") return;

    let animFrameId: number;

    const tick = () => {
      const lerpFactor = 0.12;

      GROUND_CREATURES.forEach((c) => {
        const cur = currentOffsets.current[c.id];
        const tgt = targetOffsets.current[c.id];
        const el = focusRefs.current[c.id];
        if (!cur || !tgt || !el) return;

        cur.shiftX += (tgt.shiftX - cur.shiftX) * lerpFactor;
        cur.shiftY += (tgt.shiftY - cur.shiftY) * lerpFactor;
        cur.leanDeg += (tgt.leanDeg - cur.leanDeg) * lerpFactor;
        cur.eyeX += (tgt.eyeX - cur.eyeX) * lerpFactor;
        cur.eyeY += (tgt.eyeY - cur.eyeY) * lerpFactor;
        cur.peekAmount += (tgt.peekAmount - cur.peekAmount) * lerpFactor;

        // For peeking creatures: peekAmount slides them visibly out from behind the tree
        const peekerShiftX = c.isPeeker ? -cur.peekAmount * 14 : 0;
        const peekerShiftY = c.isPeeker ? -cur.peekAmount * 2.5 : 0;
        const peekerLean = c.isPeeker ? -cur.peekAmount * 2 : 0;

        const totalShiftX = (cur.shiftX + peekerShiftX).toFixed(2);
        const totalShiftY = (cur.shiftY + peekerShiftY).toFixed(2);
        const totalLean = (cur.leanDeg + peekerLean).toFixed(2);

        el.style.transform = `translate3d(${totalShiftX}px, ${totalShiftY}px, 0) rotate(${totalLean}deg)`;

        const eyeGroup = el.querySelector(".creature-eyes");
        if (eyeGroup) {
          (eyeGroup as SVGElement).style.transform = `translate3d(${cur.eyeX.toFixed(2)}px, ${cur.eyeY.toFixed(2)}px, 0)`;
        }
      });

      animFrameId = requestAnimationFrame(tick);
    };

    animFrameId = requestAnimationFrame(tick);

    return () => cancelAnimationFrame(animFrameId);
  }, [viewport]);

  // Pointer move handler across footer zone with strictly clamped movement
  useEffect(() => {
    if (viewport === "mobile") return;

    const handlePointerMove = (e: PointerEvent) => {
      if (e.pointerType === "touch") return;

      const container = containerRef.current;
      if (!container) return;

      const rect = container.getBoundingClientRect();
      if (rect.width <= 0) return;

      const distFromFooterTop = e.clientY - rect.top;
      if (distFromFooterTop < -200 || distFromFooterTop > rect.height + 300) {
        GROUND_CREATURES.forEach((c) => {
          targetOffsets.current[c.id] = { shiftX: 0, shiftY: 0, leanDeg: 0, eyeX: 0, eyeY: 0, peekAmount: 0 };
        });
        return;
      }

      const cursorX = e.clientX - rect.left;
      const cursorY = e.clientY - rect.top;

      GROUND_CREATURES.forEach((c) => {
        const leftPercent = c.leftPercent[viewport];
        const baseX = (leftPercent / 100) * rect.width;
        const baseY = rect.height - 14;

        const dx = cursorX - baseX;
        const dy = cursorY - baseY;
        const dist = Math.hypot(dx, dy);

        const proximity = Math.max(0.2, Math.min(1, 1 - dist / 400));

        const dirX = Math.sign(dx);
        const dirY = Math.sign(dy);
        const normalizedDistX = Math.min(1, Math.abs(dx) / 100);
        const normalizedDistY = Math.min(1, Math.abs(dy) / 60);

        // Clamped movement: maximum X ±8px, Y ±4px, rotation ±2°
        const shiftX = Math.max(-8, Math.min(8, dirX * normalizedDistX * (4 + proximity * 4)));
        const shiftY = Math.max(-4, Math.min(4, dirY * normalizedDistY * (1.5 + proximity * 2.5)));
        const leanDeg = Math.max(-2, Math.min(2, dirX * normalizedDistX * (0.8 + proximity * 1.2)));

        const eyeX = Math.max(-2.5, Math.min(2.5, dirX * normalizedDistX * 2.0));
        const eyeY = Math.max(-1.8, Math.min(1.8, dirY * normalizedDistY * 1.5));

        const peekProximity = Math.max(0, Math.min(1, 1 - dist / 260));
        const peekAmount = c.isPeeker ? Number(peekProximity.toFixed(2)) : 0;

        targetOffsets.current[c.id] = { shiftX, shiftY, leanDeg, eyeX, eyeY, peekAmount };
      });
    };

    const handlePointerLeave = () => {
      GROUND_CREATURES.forEach((c) => {
        targetOffsets.current[c.id] = { shiftX: 0, shiftY: 0, leanDeg: 0, eyeX: 0, eyeY: 0, peekAmount: 0 };
      });
      setHoveredId(null);
    };

    window.addEventListener("pointermove", handlePointerMove, { passive: true });
    window.addEventListener("blur", handlePointerLeave);

    return () => {
      window.removeEventListener("pointermove", handlePointerMove);
      window.removeEventListener("blur", handlePointerLeave);
    };
  }, [viewport]);

  return (
    <div
      ref={containerRef}
      aria-hidden="true"
      style={{
        background: "transparent",
        backgroundColor: "transparent",
        backgroundImage: "none",
      }}
      className="footer-scene relative w-[calc(100%-24px)] sm:w-[min(650px,calc(100%-28px))] lg:w-[min(760px,calc(100%-32px))] mx-auto h-[78px] sm:h-[92px] lg:h-[105px] mt-4 mb-3 overflow-hidden select-none pointer-events-none !bg-transparent"
    >
      {/* ── 1. Celestial Body: Sun (Day) or Crescent Moon (Night) based on local time ── */}
      <CelestialBody isNight={isNight} className="absolute left-[24%] sm:left-[26%] top-1.5 sm:top-2 z-0 pointer-events-none" />

      {/* ── 2. Night Stars (Only during night) ── */}
      {isNight && <NightStars className="absolute inset-x-0 top-0 h-8 z-0 pointer-events-none" />}

      {/* ── 3. Static Mountains (Background, zero cursor movement, 100% transparent base) ── */}
      <Mountains className="absolute bottom-0 left-0 right-0 w-full h-[60px] sm:h-[70px] lg:h-[80px] z-[1] pointer-events-none" />

      {/* ── 4. Background Trees (Layered depth behind dragon & creatures) ── */}
      <div className="absolute inset-x-0 bottom-0 h-full z-[2] pointer-events-none">
        {/* Tree 2 (Mid-ground behind Bean) */}
        <ForestTree
          className="absolute bottom-[5px] left-[27%] w-5 sm:w-7 h-auto origin-bottom"
          colorVariant="deep"
        />
        {/* Tree 4 (Center-right back between mountains) */}
        <ForestTree
          className="absolute bottom-[6px] left-[50%] w-4 sm:w-6 h-auto origin-bottom"
          colorVariant="pine"
        />
        {/* Tree 5 (Mid-ground beside Pip) */}
        <ForestTree
          className="absolute bottom-[5px] left-[68%] w-5 sm:w-7 h-auto origin-bottom"
          colorVariant="deep"
        />
      </div>

      {/* ── 5. Flying Dragon Mascot with Visible Continuous LEFT -> RIGHT Flight & Wings Flapping ── */}
      <div className="dragon-flight pointer-events-none z-[3]">
        <div className="dragon-bob">
          <div className="dragon-body">
            <FlyingDragon />
          </div>
        </div>
      </div>

      {/* ── 6. Ground Creatures Layer ── */}
      <div className="absolute inset-x-0 bottom-0 h-full z-[4] pointer-events-none">
        {GROUND_CREATURES.map((creature) => {
          const leftPos = creature.leftPercent[viewport];
          const isHovered = hoveredId === creature.id;

          return (
            /* Tier 1: character-position (Anchored on the ground curve) */
            <div
              key={creature.id}
              className="character-position absolute pointer-events-auto"
              style={{
                left: `${leftPos}%`,
                bottom: "4px",
                transform: "translateX(-50%)",
                transformOrigin: "bottom center",
              }}
            >
              {/* Tier 2: character-cursor-focus (Spring-like clamped lean & shift, plus peeking!) */}
              <div
                ref={(el) => {
                  focusRefs.current[creature.id] = el;
                }}
                className="character-cursor-focus will-change-transform"
                style={{ transformOrigin: "bottom center" }}
              >
                {/* Tier 3: character-idle-animation (Natural breathing / bobbing keyframe) */}
                <div className={`character-idle-animation ${creature.idleClass}`}>
                  {/* Tier 4: character-svg & hover reaction */}
                  <div
                    className={`character-hover cursor-pointer transition-all duration-300 ease-out ${
                      isHovered
                        ? "-translate-y-1.5 scale-[1.05] brightness-110 drop-shadow-[0_6px_14px_rgba(56,189,248,0.4)]"
                        : "drop-shadow-[0_2px_6px_rgba(0,0,0,0.5)]"
                    }`}
                    onMouseEnter={() => {
                      setHoveredId(creature.id);
                      if (creature.isPeeker) {
                        targetOffsets.current[creature.id].peekAmount = 1.0;
                      }
                    }}
                    onMouseLeave={() => setHoveredId(null)}
                  >
                    <creature.Component
                      className="w-auto overflow-visible origin-bottom"
                      style={{
                        width: `${viewport === "mobile" ? creature.width * 0.8 : creature.width}px`,
                        height: `${viewport === "mobile" ? creature.height * 0.8 : creature.height}px`,
                      }}
                    />
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* ── 7. Foreground Trees (Overlapping Bubba & Mochi for Peek-a-boo depth!) ── */}
      <div className="absolute inset-x-0 bottom-0 h-full z-[5] pointer-events-none">
        {/* Tree 1: Far-left foreground framing tree */}
        <ForestTree
          className="absolute bottom-[4px] left-[8%] w-6 sm:w-8 h-auto origin-bottom"
          colorVariant="emerald"
        />

        {/* Tree 3: The Peeking Tree (Directly in front of Bubba at 40%!) */}
        <ForestTree
          className="absolute bottom-[3px] left-[40%] w-7 sm:w-9 h-auto origin-bottom"
          colorVariant="emerald"
        />

        {/* Tree 6: The Hide-and-Seek Tree (Directly in front of Mochi at 78%!) */}
        <ForestTree
          className="absolute bottom-[3px] left-[78%] w-7 sm:w-9 h-auto origin-bottom"
          colorVariant="deep"
        />

        {/* Tree 7: Far-right foreground framing tree */}
        <ForestTree
          className="absolute bottom-[4px] left-[92%] w-6 sm:w-8 h-auto origin-bottom"
          colorVariant="emerald"
        />
      </div>

      {/* ── 8. Subtle Forest Ground Vegetation Tufts ── */}
      <div className="absolute inset-x-0 bottom-[3px] h-2.5 z-[6] pointer-events-none overflow-hidden flex justify-between px-8 opacity-60">
        <span className="text-[9px] text-emerald-900 select-none">𖥸</span>
        <span className="text-[8px] text-emerald-950 select-none hidden sm:inline">𖥸</span>
        <span className="text-[9px] text-emerald-900 select-none">𖥸</span>
        <span className="text-[8px] text-emerald-950 select-none hidden sm:inline">𖥸</span>
        <span className="text-[9px] text-emerald-900 select-none">𖥸</span>
      </div>
    </div>
  );
}
