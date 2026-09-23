/**
 * Central Developer-OS Humor Configuration & Telemetry Manager
 * 
 * Target Balance: 80% professional portfolio, 20% discovered personality.
 * Strict cooldowns to prevent spam. No heavy dependencies.
 */

// In-memory cooldown registry to prevent spam across interactions
const cooldownMap = new Map<string, number>();

/**
 * Checks if a telemetry/humor event is allowed to fire based on key and cooldown.
 * @param key Unique identifier for the interaction
 * @param cooldownMs Minimum duration in milliseconds between triggers (default 20,000ms / 20s)
 */
export function canTriggerHumor(key: string, cooldownMs = 20000): boolean {
  if (typeof window === "undefined") return false;
  const now = Date.now();
  const lastFired = cooldownMap.get(key) || 0;
  if (now - lastFired < cooldownMs) {
    return false;
  }
  cooldownMap.set(key, now);
  return true;
}

/**
 * Force set a cooldown timestamp
 */
export function recordHumorTrigger(key: string): void {
  if (typeof window === "undefined") return;
  cooldownMap.set(key, Date.now());
}

export const HUMOR_CONFIG = {
  hero: {
    systemStatus: "SYSTEM ONLINE",
    detection: "Human developer detected.",
    orbInitial: "ORB ACQUIRED. +10 INTERNET POINTS",
    orbRepeated: "ORB DETECTED. Please do not touch the orb.",
  },
  navigation: {
    "/": "Navigating to root directory...",
    "/about": "Loading human documentation...",
    "/projects": "Searching deployed experiments...",
    "/experience": "Traversing chronological timeline...",
    "/skills": "Scanning installed capabilities...",
    "/console": "Developer terminal detected.",
    "/contact": "Opening communication channel...",
  } as Record<string, string>,
  about: {
    statusBadge: "DIAGNOSTIC: COMPLETE",
    scanSummary: "Curiosity: excessive · Bugs: classified · Confidence: questionable",
    expandedLore: [
      "Developer: confirmed",
      "Curiosity: excessive",
      "Sleep schedule: classified",
      "Bugs introduced: classified",
      "Production confidence: questionable",
    ],
  },
  projects: {
    card1Status: "SYS: OPERATIONAL",
    card2Status: "SOURCE: CONTAINED",
    hoverInspect1: "Scanning architecture... Surprisingly functional.",
    hoverInspect2: "Please don't break production.",
  },
  skills: {
    diagnosticTag: "STACK ANALYSIS COMPLETE",
    diagnosticSub: "Syntax appears intentional.",
    diagnosticsPool: [
      "Syntax appears intentional.",
      "Dependencies cooperating.",
      "Capability matrix nominal.",
      "Zero unhandled promises (currently).",
    ],
  },
  console: {
    welcomePrefix: "CONNECTION ESTABLISHED. Human operator detected.\n",
    scan: `ENVIRONMENT SCAN

  LIFEFORM       DETECTED
  BUGS           CLASSIFIED
  ORBS           1
  THREATS        NONE

> No suspicious activity detected.
> Probably.`,
    whoami: `IDENTITY

  USER        HUMAN
  ROLE        DEVELOPER
  STATUS      SOMEHOW OPERATIONAL

> Identity verification complete.`,
    status: `SYSTEM STATUS

  STATUS      STABLE
  BUGS        CLASSIFIED
  COFFEE      UNKNOWN
  REALITY     NOMINAL

> Everything appears to be under control.
> Probably.`,
    orb: `ORBITAL OBJECT DETECTED

  TYPE          UNKNOWN
  STATUS        WATCHING

> Please do not touch the orb.`,
    hello: `GREETING RECEIVED

> Hello, human.
> Your curiosity has been logged.`,
    sudo: `ACCESS REQUEST

> Nice try.
> Permission denied.`,
    coffee: `CAFFEINE DIAGNOSTICS

  DEPENDENCY    CONFIRMED
  LEVEL         QUESTIONABLE

> Additional coffee may be required.`,
    helpExtension: `Commands available.
Consequences unavailable.

CORE COMMANDS

  about      Bio and background
  skills     Tech stack and libraries
  projects   Portfolio highlights
  contact    Contact information
  clear      Reset terminal

DIAGNOSTICS & TELEMETRY

  scan       Scan the environment
  whoami     Identify the current operator
  status     System diagnostics
  coffee     Check caffeine dependency
  orb        Inspect the suspicious orb
  sudo       Attempt something questionable`,
  },
  contact: {
    focusTransmission: "INCOMING TRANSMISSION // Establishing communication channel...",
    transmittedSuccess: "MESSAGE TRANSMITTED. Developer has been notified. Probably.",
  },
  resume: {
    hoverTelemetry: "ACCESSING HUMAN RECORDS... Retrieving developer lore.",
  },
  footer: {
    statusLine: "SYSTEM STATUS: STABLE • BUGS: CLASSIFIED • REALITY: NOMINAL",
  },
  easterEggs: {
    logoAchievement: "UNAUTHORIZED INTERACTION DETECTED // Achievement Unlocked: CURIOUS ORGANISM",
  },
  notFound: {
    title: "404",
    status: "LOCATION NOT FOUND.",
    description: "Scanning nearby dimensions... Nothing detected. Not even an orb.",
    button: "RETURN TO BASE",
  },
};
